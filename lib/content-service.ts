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
        `SELECT id, name, detail, badge, specs, image_src FROM products WHERE category_slug = ? AND is_published = TRUE ORDER BY sort_order ASC, id ASC`,
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
    notice_enabled: "true",
    notice_text: "🚧 Website Maintenance: We are currently upgrading our website. If you encounter any temporary issues, please bear with us.",
    notice_mode: "auto",
    notice_position: "top",
    notice_variant: "primary",
    notice_speed: "slow",
    notice_link: "/contact",
    notice_link_text: "Contact Support",
  };
}

export interface HotDealProduct {
  id: number;
  category_slug: string;
  category_title?: string;
  name: string;
  detail?: string;
  badge?: string;
  specs?: string;
  image_src?: string;
  offer_price: string;
  original_price?: string;
  deal_badge?: string;
  is_featured?: boolean;
}

/**
 * Fetch products currently marked as Hot Deals for the homepage
 */
export async function getHotDeals(): Promise<HotDealProduct[]> {
  try {
    const products: any = await query(`
      SELECT p.*, c.title as category_title 
      FROM products p 
      LEFT JOIN categories c ON p.category_slug = c.slug 
      WHERE p.is_hot_deal = TRUE AND p.is_published = TRUE 
      ORDER BY p.sort_order ASC, p.id DESC
    `);
    return products || [];
  } catch (err) {
    console.warn("Error fetching hot deals from DB:", err);
    return [];
  }
}

import { getApparelProductBySlugOrId, MASTER_APPAREL_PRODUCTS } from "@/lib/content/apparel-taxonomy";

/**
 * Fetch a single product by ID or slug with category specifications (DB with Taxonomy Fallback)
 */
export async function getProductById(id: number | string) {
  // 1. Try DB lookup first
  try {
    const isNum = !isNaN(Number(id));
    const products: any = await query(`
      SELECT p.*, c.title as category_title, c.slug as category_slug, 
             c.moq as category_moq, c.lead_time as category_lead_time, 
             c.production_capacity as category_capacity,
             c.fabrics_json, c.constructions_json, c.certifications_json
      FROM products p 
      LEFT JOIN categories c ON p.category_slug = c.slug 
      WHERE ${isNum ? "p.id = ?" : "p.id = ? OR p.name LIKE ?"} AND p.is_published = TRUE 
      LIMIT 1
    `, isNum ? [Number(id)] : [id, `%${id}%`]);

    if (products && products.length > 0) {
      const p = products[0];
      return {
        ...p,
        fabrics: p.fabrics_json ? JSON.parse(p.fabrics_json) : [],
        constructions: p.constructions_json ? JSON.parse(p.constructions_json) : [],
        certifications: p.certifications_json ? JSON.parse(p.certifications_json) : [],
      };
    }
  } catch (err) {
    console.warn(`Database query failed for product ${id}, falling back to static catalog:`, err);
  }

  // 2. Try Master Apparel Taxonomy Lookup (String ID, slug, or numeric ID)
  const taxonomyProduct = getApparelProductBySlugOrId(id);
  if (taxonomyProduct) {
    return {
      id: taxonomyProduct.numericId || taxonomyProduct.id,
      slug: taxonomyProduct.slug,
      name: taxonomyProduct.name,
      detail: taxonomyProduct.detail,
      specs: taxonomyProduct.specs,
      badge: taxonomyProduct.badge,
      image_src: taxonomyProduct.image_src,
      category_slug: taxonomyProduct.categorySlug,
      category_title: taxonomyProduct.categoryTitle,
      category_moq: taxonomyProduct.moq,
      category_lead_time: taxonomyProduct.leadTime,
      category_capacity: taxonomyProduct.productionCapacity,
      offer_price: taxonomyProduct.priceRange,
      original_price: "",
      demographic: taxonomyProduct.demographic,
      demographicLabel: taxonomyProduct.demographicLabel,
      subcategoryId: taxonomyProduct.subcategoryId,
      subcategoryName: taxonomyProduct.subcategoryName,
      colors: taxonomyProduct.colors,
      packaging: taxonomyProduct.packaging,
      fabrics: [taxonomyProduct.fabricComposition, taxonomyProduct.gsmOrWeight, ...(taxonomyProduct.finishes || [])],
      constructions: [taxonomyProduct.gaugeOrWeave, taxonomyProduct.yarnCount].filter(Boolean),
      certifications: taxonomyProduct.certifications,
    };
  }

  // 3. Match 'cat-{slug}-{index}' IDs (e.g. cat-knit-0)
  const catMatch = String(id).match(/^cat-([a-z0-9-]+)-(\d+)$/i);
  if (catMatch) {
    const [, catSlug, indexStr] = catMatch;
    const cat = categoriesCatalog.find(c => c.slug.toLowerCase() === catSlug.toLowerCase());
    const idx = parseInt(indexStr, 10);
    if (cat && cat.products && cat.products[idx]) {
      const p = cat.products[idx];
      const fallbackId = cat.slug === 'woven' ? idx + 1
        : cat.slug === 'knit' ? idx + 9
        : cat.slug === 'denim' ? idx + 17
        : cat.slug === 'sweater' ? idx + 25
        : idx + 32;

      return {
        id: id,
        numericId: fallbackId,
        slug: `product-${fallbackId}`,
        name: p.name,
        detail: p.detail,
        specs: p.specs,
        badge: p.badge || "Export Quality",
        image_src: (p.image as any)?.src || cat.image.src,
        category_slug: cat.slug,
        category_title: cat.title,
        category_moq: cat.moq,
        category_lead_time: cat.leadTime,
        category_capacity: cat.productionCapacity,
        offer_price: "Inquire for FOB Chittagong",
        original_price: "",
        fabrics: cat.fabrics,
        constructions: cat.constructions,
        certifications: cat.certifications,
      };
    }
  }

  // 4. Fallback: Search in default categoriesCatalog by id, fallbackId, or name
  for (const cat of categoriesCatalog) {
    for (let i = 0; i < cat.products.length; i++) {
      const p = cat.products[i];
      const fallbackId = cat.slug === 'woven' ? i + 1
        : cat.slug === 'knit' ? i + 9
        : cat.slug === 'denim' ? i + 17
        : cat.slug === 'sweater' ? i + 25
        : i + 32;
      const catCompositeId = `cat-${cat.slug}-${i}`;
      
      if (
        String(p.id) === String(id) || 
        String(fallbackId) === String(id) ||
        catCompositeId === String(id) ||
        p.name.toLowerCase() === String(id).toLowerCase()
      ) {
        return {
          id: p.id ?? fallbackId,
          numericId: fallbackId,
          slug: `product-${fallbackId}`,
          name: p.name,
          detail: p.detail,
          specs: p.specs,
          badge: p.badge || "Export Quality",
          image_src: (p.image as any)?.src || cat.image.src,
          category_slug: cat.slug,
          category_title: cat.title,
          category_moq: cat.moq,
          category_lead_time: cat.leadTime,
          category_capacity: cat.productionCapacity,
          offer_price: "Inquire for FOB Chittagong",
          original_price: "",
          fabrics: cat.fabrics,
          constructions: cat.constructions,
          certifications: cat.certifications,
        };
      }
    }
  }

  return null;
}


/**
 * Fetch related products from the same category
 */
export async function getRelatedProducts(categorySlug: string, currentProductId: number | string, limit: number = 4) {
  try {
    const products: any = await query(`
      SELECT p.*, c.title as category_title 
      FROM products p 
      LEFT JOIN categories c ON p.category_slug = c.slug 
      WHERE p.category_slug = ? AND p.id != ? AND p.is_published = TRUE 
      ORDER BY p.sort_order ASC, p.id DESC 
      LIMIT ?
    `, [categorySlug, currentProductId, limit]);
    
    if (products && products.length > 0) return products;
  } catch (err) {
    console.warn("Error fetching related products from DB:", err);
  }

  // Static fallback related products
  const relatedInTaxonomy = MASTER_APPAREL_PRODUCTS.filter(
    (p) => p.categorySlug === categorySlug && String(p.numericId) !== String(currentProductId) && p.id !== String(currentProductId)
  ).slice(0, limit);

  if (relatedInTaxonomy.length > 0) {
    return relatedInTaxonomy.map((p) => ({
      id: p.numericId,
      name: p.name,
      detail: p.detail,
      specs: p.specs,
      badge: p.badge,
      image_src: p.image_src,
      category_slug: p.categorySlug,
      category_title: p.categoryTitle,
      offer_price: p.priceRange,
    }));
  }

  const cat = categoriesCatalog.find((c) => c.slug === categorySlug);
  if (!cat) return [];

  return cat.products
    .filter((p) => String(p.id) !== String(currentProductId))
    .slice(0, limit)
    .map((p, idx) => ({
      id: p.id ?? (idx + 100),
      name: p.name,
      detail: p.detail,
      specs: p.specs,
      badge: p.badge,
      image_src: (p.image as any)?.src || cat.image.src,
      category_slug: cat.slug,
      category_title: cat.title,
      offer_price: "Inquire for FOB",
    }));
}

