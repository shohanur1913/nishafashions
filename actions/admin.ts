"use server";

import { revalidatePath } from "next/cache";
import { execute, query } from "@/lib/db";
import { getAdminUser, loginAdmin, logoutAdmin, updateAdminProfile } from "@/lib/auth";
import {
  getSmtpConfig,
  isSmtpConfigured,
  sendEmail,
  generateTestEmailHtml,
  generateBuyerReplyHtml,
} from "@/lib/mail";

// Check authentication guard
async function requireAdmin() {
  const admin = await getAdminUser();
  if (!admin) {
    throw new Error("Unauthorized access. Please log in.");
  }
  return admin;
}

// -------------------------------------------------------------
// AUTH ACTIONS
// -------------------------------------------------------------
export async function handleLogin(formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (!email || !password) {
    return { success: false, error: "Email and password are required." };
  }

  return await loginAdmin(email, password);
}

export async function handleLogout() {
  await logoutAdmin();
  return { success: true };
}

export async function handleUpdateProfile(formData: FormData) {
  const admin = await requireAdmin();
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const currentPassword = formData.get("currentPassword") as string;
  const newPassword = formData.get("newPassword") as string;

  const res = await updateAdminProfile(admin.id, {
    name,
    email,
    currentPassword,
    newPassword,
  });

  if (res.success) {
    revalidatePath("/admin");
  }
  return res;
}

// -------------------------------------------------------------
// PAGE ACTIONS (Content Management)
// -------------------------------------------------------------
export async function createPageAction(data: {
  title: string;
  slug: string;
  subtitle?: string;
  content_json?: string;
  seo_title?: string;
  seo_description?: string;
  is_published?: boolean;
}) {
  await requireAdmin();

  const cleanSlug = data.slug
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9-_]/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");

  if (!cleanSlug) {
    return { success: false, error: "Page URL slug is required." };
  }
  if (!data.title?.trim()) {
    return { success: false, error: "Page title is required." };
  }

  // Check uniqueness
  const existing: any = await query(`SELECT id FROM pages WHERE slug = ? LIMIT 1`, [cleanSlug]);
  if (existing && existing.length > 0) {
    return { success: false, error: `A page with URL slug "/${cleanSlug}" already exists.` };
  }

  // Default content template if none provided
  const initialContent = data.content_json || JSON.stringify({
    hero: {
      badge: "Overview",
      title: data.title,
      description: data.subtitle || "Page overview and corporate documentation.",
      backgroundImage: "/images/hero-apparel.png"
    },
    sections: [
      {
        id: "section-1",
        title: "1. Overview & Scope",
        content: "Provide the detailed narrative, specifications, or terms for this page here.",
        bullets: [
          "Key highlight point or policy detail",
          "Secondary operational standard or procedure"
        ]
      }
    ]
  }, null, 2);

  await execute(
    `INSERT INTO pages (slug, title, subtitle, content_json, seo_title, seo_description, is_published) 
     VALUES (?, ?, ?, ?, ?, ?, ?)`,
    [
      cleanSlug,
      data.title.trim(),
      data.subtitle || "",
      initialContent,
      data.seo_title || `${data.title.trim()} | Nisha Fashions Wear`,
      data.seo_description || data.subtitle || "",
      data.is_published !== false,
    ]
  );

  revalidatePath("/admin/pages");
  revalidatePath(`/${cleanSlug}`);

  return { success: true, slug: cleanSlug };
}

export async function deletePageAction(id: number) {
  await requireAdmin();

  // Protect system core pages
  const page: any = await query(`SELECT slug FROM pages WHERE id = ? LIMIT 1`, [id]);
  if (!page || page.length === 0) {
    return { success: false, error: "Page not found." };
  }

  if (page[0].slug === "home") {
    return { success: false, error: "The Homepage is a protected system core page and cannot be deleted." };
  }

  await execute(`DELETE FROM pages WHERE id = ?`, [id]);

  revalidatePath("/admin/pages");
  revalidatePath(`/${page[0].slug}`);

  return { success: true };
}

export async function bulkDeletePagesAction(ids: number[]) {
  await requireAdmin();

  if (!ids || ids.length === 0) {
    return { success: false, error: "No pages selected for deletion." };
  }

  // Filter out homepage
  const homeCheck: any = await query(`SELECT id FROM pages WHERE slug = 'home' LIMIT 1`);
  const homeId = homeCheck && homeCheck[0] ? homeCheck[0].id : null;
  const filteredIds = ids.filter((id) => id !== homeId);

  if (filteredIds.length === 0) {
    return { success: false, error: "Selected pages include protected system pages that cannot be deleted." };
  }

  const placeholders = filteredIds.map(() => "?").join(",");
  await execute(`DELETE FROM pages WHERE id IN (${placeholders})`, filteredIds);

  revalidatePath("/admin/pages");
  revalidatePath("/");

  return { success: true, deletedCount: filteredIds.length };
}

export async function bulkUpdatePagesStatusAction(ids: number[], is_published: boolean) {
  await requireAdmin();

  if (!ids || ids.length === 0) {
    return { success: false, error: "No pages selected." };
  }

  const placeholders = ids.map(() => "?").join(",");
  await execute(`UPDATE pages SET is_published = ? WHERE id IN (${placeholders})`, [is_published, ...ids]);

  revalidatePath("/admin/pages");
  revalidatePath("/");

  return { success: true };
}

export async function savePageAction(slug: string, data: {
  title: string;
  subtitle?: string;
  content_json: string;
  seo_title?: string;
  seo_description?: string;
  is_published?: boolean;
}) {
  await requireAdmin();

  await execute(
    `UPDATE pages 
     SET title = ?, subtitle = ?, content_json = ?, seo_title = ?, seo_description = ?, is_published = ? 
     WHERE slug = ?`,
    [
      data.title,
      data.subtitle || "",
      data.content_json,
      data.seo_title || "",
      data.seo_description || "",
      data.is_published !== false,
      slug,
    ]
  );

  // Revalidate frontend and admin
  revalidatePath("/");
  revalidatePath(`/${slug === "home" ? "" : slug}`);
  revalidatePath(`/admin/pages`);
  revalidatePath(`/admin/pages/${slug}`);

  return { success: true };
}

// -------------------------------------------------------------
// CATEGORY ACTIONS
// -------------------------------------------------------------
export async function saveCategoryAction(data: {
  id?: number;
  slug: string;
  title: string;
  badge?: string;
  description?: string;
  hero_intro?: string;
  long_description?: string;
  image_src?: string;
  image_alt?: string;
  lead_time?: string;
  moq?: string;
  production_capacity?: string;
  fabrics: string[];
  constructions: string[];
  finishes: string[];
  certifications: string[];
  is_published?: boolean;
}) {
  await requireAdmin();

  const fabricsJson = JSON.stringify(data.fabrics || []);
  const constructionsJson = JSON.stringify(data.constructions || []);
  const finishesJson = JSON.stringify(data.finishes || []);
  const certificationsJson = JSON.stringify(data.certifications || []);

  if (data.id) {
    // Update existing
    await execute(
      `UPDATE categories 
       SET slug = ?, title = ?, badge = ?, description = ?, hero_intro = ?, long_description = ?, 
           image_src = ?, image_alt = ?, lead_time = ?, moq = ?, production_capacity = ?, 
           fabrics_json = ?, constructions_json = ?, finishes_json = ?, certifications_json = ?, is_published = ?
       WHERE id = ?`,
      [
        data.slug,
        data.title,
        data.badge || "",
        data.description || "",
        data.hero_intro || "",
        data.long_description || "",
        data.image_src || "",
        data.image_alt || "",
        data.lead_time || "",
        data.moq || "",
        data.production_capacity || "",
        fabricsJson,
        constructionsJson,
        finishesJson,
        certificationsJson,
        data.is_published !== false,
        data.id,
      ]
    );
  } else {
    // Create new
    await execute(
      `INSERT INTO categories 
       (slug, title, badge, description, hero_intro, long_description, image_src, image_alt, lead_time, moq, production_capacity, fabrics_json, constructions_json, finishes_json, certifications_json, is_published) 
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        data.slug,
        data.title,
        data.badge || "",
        data.description || "",
        data.hero_intro || "",
        data.long_description || "",
        data.image_src || "",
        data.image_alt || "",
        data.lead_time || "",
        data.moq || "",
        data.production_capacity || "",
        fabricsJson,
        constructionsJson,
        finishesJson,
        certificationsJson,
        data.is_published !== false,
      ]
    );
  }

  revalidatePath("/");
  revalidatePath("/products");
  revalidatePath("/services");
  revalidatePath(`/categories/${data.slug}`);
  revalidatePath("/admin/categories");
  return { success: true };
}

export async function deleteCategoryAction(id: number) {
  await requireAdmin();

  // Find category slug
  const cat: any = await query(`SELECT slug FROM categories WHERE id = ?`, [id]);
  if (cat && cat[0]) {
    // Delete products associated with this category
    await execute(`DELETE FROM products WHERE category_slug = ?`, [cat[0].slug]);
  }

  await execute(`DELETE FROM categories WHERE id = ?`, [id]);

  revalidatePath("/");
  revalidatePath("/products");
  revalidatePath("/admin/categories");
  return { success: true };
}

// -------------------------------------------------------------
// PRODUCT ACTIONS
// -------------------------------------------------------------
export async function saveProductAction(data: {
  id?: number;
  category_slug: string;
  name: string;
  detail?: string;
  badge?: string;
  specs?: string;
  image_src?: string;
  is_featured?: boolean;
  is_hot_deal?: boolean;
  offer_price?: string;
  original_price?: string;
  deal_badge?: string;
  is_published?: boolean;
  sort_order?: number;
}) {
  await requireAdmin();

  if (data.id) {
    await execute(
      `UPDATE products 
       SET category_slug = ?, name = ?, detail = ?, badge = ?, specs = ?, image_src = ?, 
           is_featured = ?, is_hot_deal = ?, offer_price = ?, original_price = ?, deal_badge = ?, 
           is_published = ?, sort_order = ?
       WHERE id = ?`,
      [
        data.category_slug,
        data.name,
        data.detail || "",
        data.badge || "",
        data.specs || "",
        data.image_src || "",
        Boolean(data.is_featured),
        Boolean(data.is_hot_deal),
        data.offer_price || "",
        data.original_price || "",
        data.deal_badge || "",
        data.is_published !== false,
        data.sort_order || 0,
        data.id,
      ]
    );
  } else {
    await execute(
      `INSERT INTO products 
       (category_slug, name, detail, badge, specs, image_src, is_featured, is_hot_deal, offer_price, original_price, deal_badge, is_published, sort_order) 
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        data.category_slug,
        data.name,
        data.detail || "",
        data.badge || "",
        data.specs || "",
        data.image_src || "",
        Boolean(data.is_featured),
        Boolean(data.is_hot_deal),
        data.offer_price || "",
        data.original_price || "",
        data.deal_badge || "",
        data.is_published !== false,
        data.sort_order || 0,
      ]
    );
  }

  revalidatePath("/");
  revalidatePath(`/categories/${data.category_slug}`);
  revalidatePath("/admin/products");
  revalidatePath("/admin/hot-deals");
  return { success: true };
}

export async function toggleProductHotDealAction(id: number, is_hot_deal: boolean, offer_price?: string) {
  await requireAdmin();
  if (offer_price !== undefined) {
    await execute(`UPDATE products SET is_hot_deal = ?, offer_price = ? WHERE id = ?`, [Boolean(is_hot_deal), offer_price, id]);
  } else {
    await execute(`UPDATE products SET is_hot_deal = ? WHERE id = ?`, [Boolean(is_hot_deal), id]);
  }
  revalidatePath("/");
  revalidatePath("/admin/products");
  revalidatePath("/admin/hot-deals");
  return { success: true };
}

export async function bulkSetHotDealsAction(productIds: number[], is_hot_deal: boolean) {
  await requireAdmin();
  if (!productIds || productIds.length === 0) return { success: false, error: "No products selected" };
  const placeholders = productIds.map(() => "?").join(",");
  await execute(`UPDATE products SET is_hot_deal = ? WHERE id IN (${placeholders})`, [Boolean(is_hot_deal), ...productIds]);
  revalidatePath("/");
  revalidatePath("/admin/products");
  revalidatePath("/admin/hot-deals");
  return { success: true };
}

export async function deleteProductAction(id: number) {
  await requireAdmin();
  await execute(`DELETE FROM products WHERE id = ?`, [id]);
  revalidatePath("/");
  revalidatePath("/admin/products");
  revalidatePath("/admin/hot-deals");
  return { success: true };
}

// -------------------------------------------------------------
// ENQUIRY ACTIONS
// -------------------------------------------------------------
export async function updateEnquiryStatusAction(id: number, status: string) {
  await requireAdmin();
  await execute(`UPDATE enquiries SET status = ? WHERE id = ?`, [status, id]);
  revalidatePath("/admin");
  revalidatePath("/admin/enquiries");
  return { success: true };
}

export async function deleteEnquiryAction(id: number) {
  await requireAdmin();
  await execute(`DELETE FROM enquiries WHERE id = ?`, [id]);
  revalidatePath("/admin");
  revalidatePath("/admin/enquiries");
  return { success: true };
}

// -------------------------------------------------------------
// SITE SETTINGS ACTIONS
// -------------------------------------------------------------
export async function saveSiteSettingsAction(settings: Record<string, string>) {
  await requireAdmin();

  for (const [key, value] of Object.entries(settings)) {
    await execute(
      `INSERT INTO site_settings (setting_key, setting_value) VALUES (?, ?) 
       ON DUPLICATE KEY UPDATE setting_value = ?`,
      [key, value, value]
    );
  }

  revalidatePath("/", "layout");
  revalidatePath("/admin/settings");
  revalidatePath("/favicon.ico");
  return { success: true };
}

// -------------------------------------------------------------
// SMTP & MAIL ACTIONS
// -------------------------------------------------------------
export async function saveSmtpSettingsAction(smtpData: {
  host: string;
  port: number | string;
  secure: string;
  user: string;
  pass?: string;
  fromName: string;
  fromEmail: string;
}) {
  await requireAdmin();

  const settings: Record<string, string> = {
    smtp_host: smtpData.host || "",
    smtp_port: String(smtpData.port || 587),
    smtp_secure: smtpData.secure || "tls",
    smtp_user: smtpData.user || "",
    smtp_from_name: smtpData.fromName || "Nisha Fashions Wear",
    smtp_from_email: smtpData.fromEmail || smtpData.user || "info@nishafashions.com",
  };

  if (smtpData.pass !== undefined && smtpData.pass !== "") {
    settings.smtp_pass = smtpData.pass;
  }

  for (const [key, value] of Object.entries(settings)) {
    await execute(
      `INSERT INTO site_settings (setting_key, setting_value) VALUES (?, ?) 
       ON DUPLICATE KEY UPDATE setting_value = ?`,
      [key, value, value]
    );
  }

  revalidatePath("/admin/settings");
  revalidatePath("/admin/enquiries");
  return { success: true };
}

export async function sendTestEmailAction(testRecipient: string) {
  await requireAdmin();

  if (!testRecipient || !testRecipient.includes("@")) {
    return { success: false, error: "Please enter a valid recipient email address for testing." };
  }

  const config = await getSmtpConfig();
  if (!isSmtpConfigured(config)) {
    return {
      success: false,
      error: "SMTP server is not fully configured. Please configure Host, Port, Username and Password first.",
    };
  }

  const siteRows: any = await query(`SELECT setting_value FROM site_settings WHERE setting_key = 'site_name' LIMIT 1`);
  const siteName = (siteRows && siteRows[0]?.setting_value) || "Nisha Fashions Wear";

  const html = generateTestEmailHtml(siteName, testRecipient);
  const result = await sendEmail({
    to: testRecipient,
    subject: `[SMTP Verified] ${siteName} Mail Delivery Test`,
    html,
  });

  return result;
}

export async function getSmtpStatusAction() {
  await requireAdmin();
  const config = await getSmtpConfig();
  return {
    isConfigured: isSmtpConfigured(config),
    host: config.host,
    port: config.port,
    secure: config.secure ? "ssl" : "tls",
    user: config.user,
    fromName: config.fromName,
    fromEmail: config.fromEmail,
  };
}

export async function replyEnquiryEmailAction(params: {
  enquiryId: number;
  to: string;
  subject: string;
  message: string;
  newStatus?: string;
}) {
  const admin = await requireAdmin();

  if (!params.to || !params.to.includes("@")) {
    return { success: false, error: "Invalid recipient email address." };
  }

  if (!params.subject?.trim()) {
    return { success: false, error: "Subject line is required." };
  }

  if (!params.message?.trim()) {
    return { success: false, error: "Reply message body cannot be empty." };
  }

  const config = await getSmtpConfig();
  if (!isSmtpConfigured(config)) {
    return {
      success: false,
      error: "SMTP has not been configured yet. Please configure your SMTP credentials in Admin > Settings first.",
    };
  }

  // Fetch enquiry for original context
  const enqRows: any = await query(`SELECT * FROM enquiries WHERE id = ? LIMIT 1`, [params.enquiryId]);
  const originalEnquiry = enqRows && enqRows[0] ? enqRows[0] : null;

  const siteRows: any = await query(`SELECT setting_value FROM site_settings WHERE setting_key = 'site_name' LIMIT 1`);
  const companyName = (siteRows && siteRows[0]?.setting_value) || "Nisha Fashions Wear";

  const html = generateBuyerReplyHtml({
    buyerName: originalEnquiry?.name || "Buyer",
    replyMessage: params.message,
    senderName: admin.name || "Nisha Fashions Wear Merchandiser",
    companyName,
    originalSubject: originalEnquiry?.category ? `${originalEnquiry.category} RFQ` : undefined,
    originalMessage: originalEnquiry?.message || undefined,
  });

  const sendResult = await sendEmail({
    to: params.to,
    subject: params.subject,
    html,
  });

  if (!sendResult.success) {
    return {
      success: false,
      error: sendResult.error || "Failed to dispatch email reply via SMTP.",
    };
  }

  // Save reply log to database
  await execute(
    `INSERT INTO enquiry_replies (enquiry_id, to_email, subject, message, sender_name) VALUES (?, ?, ?, ?, ?)`,
    [params.enquiryId, params.to, params.subject, params.message, admin.name || "Admin"]
  );

  // Update enquiry status
  const nextStatus = params.newStatus || "quoted";
  await execute(`UPDATE enquiries SET status = ? WHERE id = ?`, [nextStatus, params.enquiryId]);

  revalidatePath("/admin");
  revalidatePath("/admin/enquiries");
  return { success: true, messageId: sendResult.messageId };
}

export async function getEnquiryRepliesAction(enquiryId: number) {
  await requireAdmin();
  const replies: any = await query(
    `SELECT * FROM enquiry_replies WHERE enquiry_id = ? ORDER BY sent_at DESC`,
    [enquiryId]
  );
  return replies || [];
}
