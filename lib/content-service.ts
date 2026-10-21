import { query } from "@/lib/db";
import { categoriesCatalog, CategoryData } from "@/lib/content/categories";
import { site as defaultSite, mainNav as defaultMainNav } from "@/lib/content/site";
import { initialCategories } from "@/lib/seed-data";

/**
 * Fetch all published categories with their products from MySQL (with static fallback)
 */
export async function getCategories(): Promise<CategoryData[]> {
  try {
    const dbCategories: any = await query(`
      SELECT * FROM categories 
      WHERE is_published = TRUE 
      ORDER BY sort_order ASC, id ASC
    `);

    if (!dbCategories || dbCategories.length === 0) {
      return categoriesCatalog;
    }

    const categoriesWithProducts: CategoryData[] = [];

    for (const cat of dbCategories) {
      const dbProducts: any = await query(
        `SELECT name, detail, badge, specs, image_src FROM products WHERE category_slug = ? AND is_published = TRUE ORDER BY sort_order ASC, id ASC`,
        [cat.slug]
      );

      const parsedFabrics = cat.fabrics_json ? JSON.parse(cat.fabrics_json) : [];
      const parsedConstructions = cat.constructions_json ? JSON.parse(cat.constructions_json) : [];
      const parsedFinishes = cat.finishes_json ? JSON.parse(cat.finishes_json) : [];
      const parsedCertifications = cat.certifications_json ? JSON.parse(cat.certifications_json) : [];

      // Find original image object fallback if available
      const origCat = categoriesCatalog.find((c) => c.slug === cat.slug);
      const fallbackImg = origCat ? origCat.image : { src: cat.image_src as any, alt: cat.image_alt || cat.title };

      categoriesWithProducts.push({
        title: cat.title,
        slug: cat.slug,
        badge: cat.badge || "",
        description: cat.description || "",
        heroIntro: cat.hero_intro || "",
        longDescription: cat.long_description || "",
        image: cat.image_src ? { src: cat.image_src as any, alt: cat.image_alt || cat.title } : fallbackImg,
        serviceHash: cat.service_hash || `category-${cat.slug}`,
        leadTime: cat.lead_time || "",
        moq: cat.moq || "",
        productionCapacity: cat.production_capacity || "",
        products: dbProducts || [],
        fabrics: parsedFabrics,
        constructions: parsedConstructions,
        finishes: parsedFinishes,
        certifications: parsedCertifications,
      });
    }

    return categoriesWithProducts;
  } catch (error) {
    console.warn("Using fallback categories due to database error:", error);
    return categoriesCatalog;
  }
}

/**
 * Fetch single category by slug
 */
export async function getCategory(slug: string): Promise<CategoryData | undefined> {
  const all = await getCategories();
  return all.find((c) => c.slug.toLowerCase() === slug.toLowerCase());
}

/**
 * Fetch page content from MySQL (with fallback)
 */
export async function getPageContent<T = any>(slug: string, defaultContent?: T): Promise<{
  title: string;
  subtitle?: string;
  content: T;
  seo_title?: string;
  seo_description?: string;
}> {
  try {
    const pages: any = await query(`SELECT * FROM pages WHERE slug = ? LIMIT 1`, [slug]);
    if (pages && pages[0]) {
      const p = pages[0];
      return {
        title: p.title,
        subtitle: p.subtitle,
        content: p.content_json ? JSON.parse(p.content_json) : defaultContent,
        seo_title: p.seo_title,
        seo_description: p.seo_description,
      };
    }
  } catch (err) {
    console.warn(`Error fetching page ${slug} from DB:`, err);
  }

  return {
    title: slug,
    content: defaultContent as T,
  };
}

/**
 * Fetch site settings from MySQL
 */
export async function getSiteSettings(): Promise<Record<string, string>> {
  try {
    const rows: any = await query(`SELECT setting_key, setting_value FROM site_settings`);
    if (rows && rows.length > 0) {
      const map: Record<string, string> = {};
      for (const r of rows) {
        map[r.setting_key] = r.setting_value;
      }
      return map;
    }
  } catch (err) {
    console.warn("Using default site settings:", err);
  }

  return {
    site_name: defaultSite.name,
    short_name: defaultSite.shortName,
    tagline: defaultSite.tagline,
    phone_display: defaultSite.phone.display,
    phone_e164: defaultSite.phone.e164,
    contact_email: defaultSite.email,
    brand_color: defaultSite.brandColor || "#E94D65",
    theme_color: defaultSite.themeColor || "#E94D65",
  };
}
