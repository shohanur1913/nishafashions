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
  id: number | string;
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
  stock_quantity?: string;
  expires_in_hours?: number;
}

export const FALLBACK_HOT_DEALS: HotDealProduct[] = [
  {
    id: "cat-knit-0",
    category_slug: "knit",
    category_title: "Knitwear • Export Stock Lot",
    name: "Export Stock Lot: 100% Combed Cotton Heavyweight Crewneck Tees (220 GSM)",
    detail: "Direct export surplus from an overseas cancelled production run. Bio-washed, pre-shrunk, soft hand-feel. Ready for immediate container loading or brand relabeling.",
    badge: "Export Stock Lot",
    specs: "220 GSM • 100% Combed Cotton Single Jersey • Size Ratio: S-XXL",
    image_src: "/images/category-knit.png",
    offer_price: "$2.35 / pc",
    original_price: "$4.20 / pc",
    deal_badge: "44% OFF • STOCK LOT",
    stock_quantity: "4,500 pcs ready",
    expires_in_hours: 36,
  },
  {
    id: "cat-knit-1",
    category_slug: "knit",
    category_title: "Knitwear • Special Offer",
    name: "Factory Clearance: Classic Pique Cotton Polo Shirts with Jacquard Rib Collar",
    detail: "High-grade 210 GSM 100% combed cotton pique knit with 2-button placket and reinforced tape split vents. Ideal for international promotional and uniform buyers.",
    badge: "Special Allocation",
    specs: "210 GSM 100% Combed Cotton Pique • Reactive Dyed • AQL 2.5",
    image_src: "/images/category-knit.png",
    offer_price: "$3.40 / pc",
    original_price: "$5.80 / pc",
    deal_badge: "41% OFF • SPECIAL OFFER",
    stock_quantity: "3,600 pcs ready",
    expires_in_hours: 48,
  },
  {
    id: "cat-knit-2",
    category_slug: "knit",
    category_title: "Knitwear • Stock Surplus",
    name: "Surplus Lot: Ribbed Athletic Tank Tops & Gym Singlets (180 GSM)",
    detail: "Fitted 2x2 rib knit tank tops with bound armholes and necklines. Enzyme washed for ultra-soft hand feel, ready for instant export packing.",
    badge: "Surplus Allocation",
    specs: "180 GSM 95% Cotton 5% Spandex 2x2 Rib • Preshrunk",
    image_src: "/images/category-knit.png",
    offer_price: "$1.85 / pc",
    original_price: "$3.20 / pc",
    deal_badge: "42% OFF • READY LOT",
    stock_quantity: "5,200 pcs ready",
    expires_in_hours: 30,
  },
  {
    id: "cat-woven-0",
    category_slug: "woven",
    category_title: "Woven • Factory Clearance",
    name: "Factory Clearance: Yarn-Dyed Oxford Weave Casual Button-Down Shirts",
    detail: "Finely woven long-sleeve oxford shirts with tailored collar, button cuffs, and single-needle tailoring for international retail departments.",
    badge: "Immediate Port Dispatch",
    specs: "100% Combed Cotton Oxford • Fused Interlining • AQL 2.5",
    image_src: "/images/category-woven.png",
    offer_price: "$3.95 / pc",
    original_price: "$6.50 / pc",
    deal_badge: "39% OFF • LIMITED TIME",
    stock_quantity: "3,200 pcs ready",
    expires_in_hours: 56,
  },
  {
    id: "cat-woven-1",
    category_slug: "woven",
    category_title: "Woven • Overrun Batch",
    name: "Overrun Allocation: Heavyweight Cotton Twill Utility Cargo Work Shirts",
    detail: "Dual flap chest pockets with button closures, double-needle felled side seams, and durable horn buttons. Pre-washed for comfortable commercial use.",
    badge: "Factory Overrun",
    specs: "100% Cotton 210 GSM Twill • Industrial Stitching",
    image_src: "/images/category-woven.png",
    offer_price: "$4.50 / pc",
    original_price: "$7.80 / pc",
    deal_badge: "42% OFF • OVERRUN",
    stock_quantity: "2,400 pcs ready",
    expires_in_hours: 60,
  },
  {
    id: "cat-denim-0",
    category_slug: "denim",
    category_title: "Denim • Cancelled Order Overrun",
    name: "Export Surplus: Classic 5-Pocket Indigo Denim Jeans (12.5oz)",
    detail: "Grade-A export quality with authentic vintage enzyme wash and antique brass rivets. 100% passed inline and final AQL 2.5 inspection.",
    badge: "Overrun Lot",
    specs: "12.5oz Ring Spun Comfort Stretch • Enzyme Rinse • YKK Zipper",
    image_src: "/images/category-denim.png",
    offer_price: "$5.80 / pc",
    original_price: "$9.60 / pc",
    deal_badge: "40% OFF • LIMITED TIME",
    stock_quantity: "2,800 pcs ready",
    expires_in_hours: 48,
  },
  {
    id: "cat-denim-1",
    category_slug: "denim",
    category_title: "Denim • Special Allocation",
    name: "Stock Lot: Enzyme Washed Classic Trucker Denim Jackets (13oz)",
    detail: "Heavy-duty 13oz cotton denim with antique shank buttons, dual chest flap pockets, and adjustable waist tabs. Export boxed and container ready.",
    badge: "Export Stock Lot",
    specs: "13oz 100% Cotton Rigid Indigo Denim • Heavy Stone Enzyme Wash",
    image_src: "/images/category-denim.png",
    offer_price: "$7.90 / pc",
    original_price: "$13.50 / pc",
    deal_badge: "41% OFF • STOCK LOT",
    stock_quantity: "1,600 pcs ready",
    expires_in_hours: 42,
  },
  {
    id: "cat-sweater-0",
    category_slug: "sweater",
    category_title: "Sweater • Overrun Batch",
    name: "Overrun Stock Lot: Heavyweight Loopback French Terry Hoodies (340 GSM)",
    detail: "Heavyweight street-fit hoodies featuring double-layered hood, kangaroo pocket, ribbed cuffs and flatlock reinforcement stitching.",
    badge: "Flash Allocation",
    specs: "340 GSM French Terry 80/20 CVC • Preshrunk • Export Grade",
    image_src: "/images/category-sweater.png",
    offer_price: "$5.90 / pc",
    original_price: "$9.80 / pc",
    deal_badge: "40% OFF • STOCK LOT",
    stock_quantity: "1,800 pcs ready",
    expires_in_hours: 24,
  },
  {
    id: "cat-sweater-1",
    category_slug: "sweater",
    category_title: "Sweater • Seasonal Clearance",
    name: "Factory Clearance: 12GG Fine-Gauge Cotton-Acrylic Pullover Crewneck Sweaters",
    detail: "Ultra-fine gauge flat knit sweater with 1x1 rib collar, hem, and cuffs. Smooth surface suitable for embroidery or brand labeling.",
    badge: "Seasonal Clearance",
    specs: "12 Gauge 60/40 Cotton Acrylic • Anti-Pilling Treatment",
    image_src: "/images/category-sweater.png",
    offer_price: "$4.95 / pc",
    original_price: "$8.40 / pc",
    deal_badge: "41% OFF • CLEARANCE",
    stock_quantity: "2,100 pcs ready",
    expires_in_hours: 72,
  },
];

/**
 * Fetch products currently marked as Hot Deals for the website
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
    if (products && products.length > 0) {
      return products;
    }
    return FALLBACK_HOT_DEALS;
  } catch (err) {
    console.warn("Error fetching hot deals from DB, using fallback:", err);
    return FALLBACK_HOT_DEALS;
  }
}

import { getApparelProductBySlugOrId, MASTER_APPAREL_PRODUCTS } from "@/lib/content/apparel-taxonomy";

/**
 * Safely extract a string URL from an image input (string, StaticImageData, or object with src)
 */
export function resolveImageString(img: any): string {
  if (!img) return "/images/category-knit.png";
  if (typeof img === "string") return img;
  if (typeof img.src === "string") return img.src;
  if (img.src && typeof img.src.src === "string") return img.src.src;
  return "/images/category-knit.png";
}

/**
 * Fetch a single product by ID or slug with category specifications (DB with Taxonomy Fallback)
 */
export async function getProductById(id: number | string) {
  // 1. Check if ID directly matches a Hot Deal in FALLBACK_HOT_DEALS
  const fallbackHotDeal = FALLBACK_HOT_DEALS.find((d) => String(d.id) === String(id));
  if (fallbackHotDeal) {
    const cat = categoriesCatalog.find((c) => c.slug.toLowerCase() === fallbackHotDeal.category_slug.toLowerCase());
    return {
      id: fallbackHotDeal.id,
      name: fallbackHotDeal.name,
      detail: fallbackHotDeal.detail || "Direct export surplus from an overseas cancelled production run. Bio-washed, pre-shrunk, soft hand-feel. Ready for immediate container loading or brand relabeling.",
      specs: fallbackHotDeal.specs,
      badge: fallbackHotDeal.badge || "Export Stock Lot",
      image_src: fallbackHotDeal.image_src,
      category_slug: fallbackHotDeal.category_slug,
      category_title: fallbackHotDeal.category_title,
      category_moq: "1,000 pcs (Stock Lot)",
      category_lead_time: "Immediate Dispatch (3-5 Days)",
      category_capacity: "Ready in Warehouse",
      offer_price: fallbackHotDeal.offer_price,
      original_price: fallbackHotDeal.original_price,
      deal_badge: fallbackHotDeal.deal_badge || "HOT DEAL",
      is_hot_deal: true,
      stock_quantity: fallbackHotDeal.stock_quantity,
      expires_in_hours: fallbackHotDeal.expires_in_hours || 48,
      fabrics: cat?.fabrics || ["100% Export Combed Cotton", "Bio-washed", "Pre-shrunk"],
      constructions: cat?.constructions || ["Single Jersey", "Curved Hem", "Reinforced Seams"],
      certifications: cat?.certifications || ["OEKO-TEX Standard 100", "BSCI Audited", "SEDEX"],
    };
  }

  // 2. Try DB lookup first
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
        is_hot_deal: Boolean(p.is_hot_deal),
        offer_price: p.offer_price || "",
        original_price: p.original_price || "",
        deal_badge: p.deal_badge || (p.is_hot_deal ? "HOT DEAL" : ""),
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
      priceRange: taxonomyProduct.priceRange,
      offer_price: "",
      original_price: "",
      is_hot_deal: false,
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
        image_src: resolveImageString((p.image as any)?.src || cat.image.src || cat.image),
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
          image_src: resolveImageString((p.image as any)?.src || cat.image.src || cat.image),
          category_slug: cat.slug,
          category_title: cat.title,
          category_moq: cat.moq,
          category_lead_time: cat.leadTime,
          category_capacity: cat.productionCapacity,
          priceRange: "Inquire for FOB Chittagong",
          offer_price: "",
          original_price: "",
          is_hot_deal: false,
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
 * Fetch related products from the same category (excludes hot deals)
 */
export async function getRelatedProducts(categorySlug: string, currentProductId: number | string, limit: number = 4) {
  try {
    const products: any = await query(`
      SELECT p.*, c.title as category_title 
      FROM products p 
      LEFT JOIN categories c ON p.category_slug = c.slug 
      WHERE p.category_slug = ? AND p.id != ? AND p.is_published = TRUE AND (p.is_hot_deal IS FALSE OR p.is_hot_deal = 0)
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
      priceRange: p.priceRange,
      offer_price: "",
      is_hot_deal: false,
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
      image_src: resolveImageString((p.image as any)?.src || cat.image.src || cat.image),
      category_slug: cat.slug,
      category_title: cat.title,
      offer_price: "Inquire for FOB",
    }));
}


