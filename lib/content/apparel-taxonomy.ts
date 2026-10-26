/**
 * Comprehensive Multi-Tier Apparel Taxonomy & Catalog for Nisha Fashions Wear
 * Architecture:
 * Level 1: Category (Knit -> Woven -> Denim -> Sweater -> Various Items)
 * Level 2: Demographic / Gender (Men's -> Women's -> Boy's -> Girl's -> Kids & Baby)
 * Level 3: Product Subcategory / Family (T-Shirts, Polo Shirts, Tank Tops, Hoodies, etc.)
 * Level 4: Product Cuts / Styles (V-Neck, Round Neck, Drop Shoulder, Cut & Sew, etc.)
 * Level 5: Commercial Technical Spec Sheet (MOQ, Price, Lead Time, Fabric, GSM, Capacity)
 */

export type CategorySlug = "knit" | "woven" | "denim" | "sweater" | "various-items";
export type DemographicId = "mens" | "womens" | "boys" | "girls" | "kids";

export interface DemographicInfo {
  id: DemographicId;
  label: string;
  bengaliLabel: string;
  badge: string;
  description: string;
}

export const DEMOGRAPHICS: DemographicInfo[] = [
  {
    id: "mens",
    label: "Men's",
    bengaliLabel: "ম্যান্স",
    badge: "Core Buyer Division",
    description: "Export-grade menswear engineered for fit consistency, durability, and commercial volume.",
  },
  {
    id: "womens",
    label: "Women's",
    bengaliLabel: "উইমেন্স",
    badge: "Fashion & Contemporary",
    description: "Trend-driven silhouettes, refined drape, premium stretch fabrics, and ethical finishing.",
  },
  {
    id: "boys",
    label: "Boy's",
    bengaliLabel: "বয়েজ",
    badge: "Youth & Active",
    description: "High-durability everyday apparel with anti-pilling and colorfast properties.",
  },
  {
    id: "girls",
    label: "Girl's",
    bengaliLabel: "গার্লস",
    badge: "Soft Comfort & Style",
    description: "Breathable natural fibers, soft seam constructions, and cheerful colorways.",
  },
  {
    id: "kids",
    label: "Kids & Baby",
    bengaliLabel: "কিডস ও বেবি",
    badge: "Safety Certified (OEKO-TEX)",
    description: "Nickel-free snaps, organic cotton, non-toxic dyes, and stringent safety compliance.",
  },
];

export interface SubcategoryMeta {
  id: string;
  slug: string;
  name: string;
  bengaliName: string;
  description: string;
  icon?: string;
}

export interface ApparelProductItem {
  id: string; // unique string id e.g. "knit-mens-v-neck-t-shirt"
  numericId: number;
  slug: string;
  name: string;
  categorySlug: CategorySlug;
  categoryTitle: string;
  demographic: DemographicId;
  demographicLabel: string;
  subcategoryId: string;
  subcategoryName: string;
  badge: string;
  specs: string;
  fabricComposition: string;
  gsmOrWeight: string;
  gaugeOrWeave?: string;
  yarnCount?: string;
  moq: string;
  priceRange: string;
  leadTime: string;
  productionCapacity: string;
  finishes: string[];
  certifications: string[];
  colors: string[];
  packaging: string;
  detail: string;
  image_src: string;
  is_featured?: boolean;
}

// -----------------------------------------------------------------------------------------
// Subcategories Definition per Category & Demographic
// -----------------------------------------------------------------------------------------

export const SUBCATEGORIES_BY_CATEGORY: Record<CategorySlug, Record<DemographicId, SubcategoryMeta[]>> = {
  knit: {
    mens: [
      { id: "t-shirts", slug: "t-shirts", name: "T-Shirts", bengaliName: "টিশার্ট", description: "Crew, V-neck, drop shoulder, heavyweight & cut & sew tees" },
      { id: "polo-shirts", slug: "polo-shirts", name: "Polo Shirts", bengaliName: "পোলো শার্ট", description: "Pique, jersey, and engineered collar polos" },
      { id: "tank-tops", slug: "tank-tops", name: "Tank Tops & Singlets", bengaliName: "টেংক টপ", description: "Athletic tanks, ribbed singlets and summer muscle tees" },
      { id: "sweatshirts", slug: "sweatshirts", name: "Sweatshirts", bengaliName: "সুইট শার্ট", description: "Loopback French terry and fleece crewneck pullovers" },
      { id: "hoodies", slug: "hoodies", name: "Hoodies", bengaliName: "হুডি", description: "Kangaroo pocket pullovers and full-zip heavy hoodies" },
      { id: "fleece-jackets", slug: "fleece-jackets", name: "Fleece Jackets", bengaliName: "ফিলিস জ্যাকেট", description: "Polar fleece, microfleece, and quarter-zip outerwear" },
      { id: "pajamas", slug: "pajamas", name: "Pajamas & Sleepwear", bengaliName: "পাজামা", description: "Single jersey lounge pants, sleep tees and sets" },
      { id: "joggers", slug: "joggers", name: "Joggers & Sweatpants", bengaliName: "জগারস", description: "Tapered cuffed fleece pants and utility cargo joggers" },
    ],
    womens: [
      { id: "t-shirts", slug: "t-shirts", name: "T-Shirts & Tops", bengaliName: "টিশার্ট ও টপস", description: "Fitted tees, relaxed baby tees, and fashion silhouettes" },
      { id: "crop-tops", slug: "crop-tops", name: "Crop Tops & Singlets", bengaliName: "ক্রপ টপ", description: "Ribbed crop tops, racerback singlets and camisoles" },
      { id: "polo-shirts", slug: "polo-shirts", name: "Polo Shirts", bengaliName: "পোলো শার্ট", description: "Slim-fit pique and stretch cotton casual polos" },
      { id: "hoodies", slug: "hoodies", name: "Hoodies & Sweats", bengaliName: "হুডি ও সোয়েটশার্ট", description: "Cropped hoodies, oversized fleece pullovers and crewnecks" },
      { id: "leggings", slug: "leggings", name: "Leggings & Bike Shorts", bengaliName: "লেগিংস ও শর্টস", description: "Squat-proof stretch cotton/spandex athletic bottoms" },
      { id: "joggers", slug: "joggers", name: "Joggers & Loungewear", bengaliName: "জগারস", description: "Wide-leg knit pants, cuffed joggers and lounge bottoms" },
      { id: "pajamas", slug: "pajamas", name: "Pajama Sets", bengaliName: "নাইটওয়্যার ও পাজামা", description: "Breathable jersey sleep sets and modal nightshirts" },
    ],
    boys: [
      { id: "t-shirts", slug: "t-shirts", name: "Graphic & Plain Tees", bengaliName: "টিশার্ট", description: "Durable crewneck t-shirts with high-density print" },
      { id: "polo-shirts", slug: "polo-shirts", name: "Polo Shirts", bengaliName: "পোলো শার্ট", description: "Casual and school pique knit polos" },
      { id: "hoodies", slug: "hoodies", name: "Hoodies & Sweatshirts", bengaliName: "হুডি", description: "Warm brushed fleece pullovers and zip jackets" },
      { id: "joggers", slug: "joggers", name: "Fleece Joggers", bengaliName: "জগারস", description: "Reinforced knee ribbed fleece sweatpants" },
      { id: "pajamas", slug: "pajamas", name: "Sleepwear Sets", bengaliName: "পাজামা", description: "Cozy 100% cotton print sleep sets" },
    ],
    girls: [
      { id: "t-shirts", slug: "t-shirts", name: "Tees & Tunics", bengaliName: "টিশার্ট ও টিউনিকে", description: "Soft cotton jersey tops with delicate detailing" },
      { id: "leggings", slug: "leggings", name: "Stretch Leggings", bengaliName: "লেগিংস", description: "High-recovery cotton/elastane everyday tights" },
      { id: "hoodies", slug: "hoodies", name: "Hoodies & Sweaters", bengaliName: "হুডি", description: "Pastel and brushed fleece pullovers" },
      { id: "pajamas", slug: "pajamas", name: "Pajama Sets", bengaliName: "পাজামা", description: "Soft rib and jersey overnight sets" },
    ],
    kids: [
      { id: "rompers", slug: "rompers", name: "Bodysuits & Rompers", bengaliName: "বডিস্যুট ও রম্পার", description: "Envelope neck and bottom snap organic cotton babywear" },
      { id: "sleepsuits", slug: "sleepsuits", name: "Baby Sleepsuits", bengaliName: "বেবি স্লিপস্যুট", description: "Footed and zippered organic cotton sleepsuits" },
      { id: "t-shirts", slug: "t-shirts", name: "Baby T-Shirts & Sets", bengaliName: "বেবি টিশার্ট সেট", description: "Two-piece soft knit sets for toddlers" },
    ],
  },
  woven: {
    mens: [
      { id: "formal-shirts", slug: "formal-shirts", name: "Formal & Dress Shirts", bengaliName: "ফরমাল শার্ট", description: "High-count poplin, twill, French cuffs and fused collars" },
      { id: "casual-shirts", slug: "casual-shirts", name: "Casual Oxford Shirts", bengaliName: "ক্যাজুয়াল শার্ট", description: "Camp collars, chambray, washed linen, and yarn-dyed checks" },
      { id: "chinos", slug: "chinos", name: "Chinos & Trousers", bengaliName: "চিনো ও ট্রাউজার্স", description: "Tailored stretch twill trousers with clean curtain waistband" },
      { id: "cargo-pants", slug: "cargo-pants", name: "Cargo & Utility Pants", bengaliName: "কার্গো প্যান্ট", description: "Articulated knees, canvas ripstop, and heavy-duty bar-tacks" },
      { id: "overshirts", slug: "overshirts", name: "Overshirts & Shackets", bengaliName: "ওভারশার্ট ও জ্যাকেট", description: "Heavyweight canvas and brushed flannel utility shirts" },
    ],
    womens: [
      { id: "blouses", slug: "blouses", name: "Blouses & Tunics", bengaliName: "ব্লাউজ ও টিউনিকে", description: "Fluid viscose, modal, TENCEL™ and cotton voile shirts" },
      { id: "dresses", slug: "dresses", name: "Structured Dresses", bengaliName: "ড্রেস ও স্কার্ট", description: "Woven poplin, seersucker, and linen daytime dresses" },
      { id: "trousers", slug: "trousers", name: "Chinos & Wide-Leg Pants", bengaliName: "ট্রাউজার্স", description: "High-rise tailored trousers and linen summer pants" },
    ],
    boys: [
      { id: "shirts", slug: "shirts", name: "Woven Shirts", bengaliName: "শার্ট", description: "Smart casual check and solid oxford button-downs" },
      { id: "pants", slug: "pants", name: "Chino Pants & Shorts", bengaliName: "প্যান্ট ও শর্টস", description: "Adjustable waistband cotton twill bottoms" },
    ],
    girls: [
      { id: "dresses", slug: "dresses", name: "Woven Dresses", bengaliName: "ড্রেস", description: "Cotton seersucker and printed poplin dresses" },
      { id: "blouses", slug: "blouses", name: "Tops & Blouses", bengaliName: "টপস", description: "Ruffle collar and delicate woven shirts" },
    ],
    kids: [
      { id: "dungarees", slug: "dungarees", name: "Baby Dungarees", bengaliName: "ডাঙ্গারিস", description: "Lined cotton twill and corduroy baby dungarees" },
    ],
  },
  denim: {
    mens: [
      { id: "jeans", slug: "jeans", name: "5-Pocket Jeans", bengaliName: "জিন্স প্যান্ট", description: "Regular, slim, straight, and tapered denim jeans" },
      { id: "jackets", slug: "jackets", name: "Denim Trucker Jackets", bengaliName: "ডেনিম জ্যাকেট", description: "Vintage wash, enzyme rinse, and classic shank jackets" },
      { id: "shorts", slug: "shorts", name: "Denim Shorts", bengaliName: "ডেনিম শর্টস", description: "Frayed hems, laser whiskers, and comfort stretch bermudas" },
      { id: "shirts", slug: "shirts", name: "Western Denim Shirts", bengaliName: "ডেনিম শার্ট", description: "Pearl snap lightweight chambray and indigo shirts" },
    ],
    womens: [
      { id: "jeans", slug: "jeans", name: "Skinny & Flare Jeans", bengaliName: "জিন্স প্যান্ট", description: "High-rise skinny, mom fit, and wide-leg flare denim" },
      { id: "jackets", slug: "jackets", name: "Denim Jackets & Shackets", bengaliName: "ডেনিম জ্যাকেট", description: "Oversized, cropped, and distressed wash trucker jackets" },
      { id: "skirts", slug: "skirts", name: "Denim Skirts & Pinafores", bengaliName: "ডেনিম স্কার্ট", description: "Button-front A-line and midi slit denim skirts" },
    ],
    boys: [
      { id: "jeans", slug: "jeans", name: "Regular & Slim Jeans", bengaliName: "জিন্স", description: "Comfort stretch with interior adjustable waistbands" },
      { id: "jackets", slug: "jackets", name: "Denim Jackets", bengaliName: "জ্যাকেট", description: "Sturdy indigo jackets with chest flap pockets" },
    ],
    girls: [
      { id: "jeans", slug: "jeans", name: "Fashion Denim Jeans", bengaliName: "জিন্স", description: "High-stretch denim with embroidery and soft washes" },
      { id: "pinafores", slug: "pinafores", name: "Denim Pinafores", bengaliName: "পিনাফোর", description: "Layering denim dresses with metal buckle adjusters" },
    ],
    kids: [
      { id: "overalls", slug: "overalls", name: "Baby Denim Overalls", bengaliName: "বেবি ওভারল", description: "Ultra-soft washed baby dungarees with crotch snaps" },
    ],
  },
  sweater: {
    mens: [
      { id: "pullovers", slug: "pullovers", name: "Crewneck & V-Neck Pullovers", bengaliName: "প্যুলওভার সোয়েটার", description: "12GG/14GG fine gauge combed cotton and wool pullovers" },
      { id: "cable-knits", slug: "cable-knits", name: "Chunky Cable-Knit Sweaters", bengaliName: "কেবল-নিট সোয়েটার", description: "3GG/5GG heavy Aran cable and structure knit sweaters" },
      { id: "cardigans", slug: "cardigans", name: "Button Cardigans", bengaliName: "কার্ডিগান", description: "Engineered rib placket button-down casual cardigans" },
      { id: "quarter-zips", slug: "quarter-zips", name: "Quarter-Zip Sweaters", bengaliName: "কোয়ার্টার-জিপ সোয়েটার", description: "Stand collar sweaters with nylon coil or antique metal zips" },
      { id: "turtlenecks", slug: "turtlenecks", name: "Turtlenecks & Rollnecks", bengaliName: "টার্টলনেক সোয়েটার", description: "Fine gauge layering sweaters with shape-recovery collars" },
    ],
    womens: [
      { id: "pullovers", slug: "pullovers", name: "Fine Knit Pullovers", bengaliName: "প্যুলওভার", description: "Soft cotton/viscose and cashmere-touch lightweight knits" },
      { id: "cable-knits", slug: "cable-knits", name: "Chunky Oversized Sweaters", bengaliName: "চাঙ্কি সোয়েটার", description: "Drop shoulder warm winter cable knits and ribbed textures" },
      { id: "cardigans", slug: "cardigans", name: "Longline Cardigans", bengaliName: "লং কার্ডিগান", description: "Open front duster cardigans with patch pockets" },
    ],
    boys: [
      { id: "pullovers", slug: "pullovers", name: "School & Casual Sweaters", bengaliName: "সোয়েটার", description: "Durable anti-pilling crewneck and V-neck school sweaters" },
    ],
    girls: [
      { id: "cardigans", slug: "cardigans", name: "Button Cardigans", bengaliName: "কার্ডিগান", description: "Fine gauge pastel and pointelle knit cardigans" },
    ],
    kids: [
      { id: "baby-knits", slug: "baby-knits", name: "Baby Knitted Sets", bengaliName: "বেবি নিট সেট", description: "Ultra-soft cotton yarn cardigans and hooded rompers" },
    ],
  },
  "various-items": {
    mens: [
      { id: "caps", slug: "caps", name: "Caps & Headwear", bengaliName: "ক্যাপ ও হ্যাট", description: "6-panel baseball caps, dad hats, and bucket hats" },
      { id: "socks", slug: "socks", name: "Socks & Footwear Accessories", bengaliName: "মোজাসমূহ", description: "Combed cotton cushion athletic socks and business crew socks" },
      { id: "bags", slug: "bags", name: "Canvas Totes & Bags", bengaliName: "ক্যানভাস ব্যাগ", description: "Heavy canvas shopping totes, drawstring bags, and travel pouches" },
      { id: "workwear", slug: "workwear", name: "Workwear & Uniforms", bengaliName: "ওয়ার্কওয়্যার ও এপ্রন", description: "Heavy twill kitchen aprons, barista wear, and work accessories" },
    ],
    womens: [
      { id: "caps", slug: "caps", name: "Caps & Sun Hats", bengaliName: "হ্যাট ও ক্যাপ", description: "Washed chino caps, wide-brim sun hats, and bucket hats" },
      { id: "socks", slug: "socks", name: "Ankle & Crew Socks", bengaliName: "মোজা", description: "Fine combed cotton socks with silicone heel-grip" },
      { id: "bags", slug: "bags", name: "Eco Totes & Shoppers", bengaliName: "ইকো টোট ব্যাগ", description: "Screen-printed organic cotton canvas bags and jute shoppers" },
    ],
    boys: [
      { id: "caps", slug: "caps", name: "Youth Caps", bengaliName: "ক্যাপ", description: "Adjustable velcro and snapback youth baseball caps" },
      { id: "socks", slug: "socks", name: "Athletic Socks", bengaliName: "মোজা", description: "Ribbed athletic crew socks with arch support" },
    ],
    girls: [
      { id: "caps", slug: "caps", name: "Sun Hats & Caps", bengaliName: "হ্যাট ও ক্যাপ", description: "Cotton bucket hats and embroidered fashion caps" },
      { id: "socks", slug: "socks", name: "Ankle Socks", bengaliName: "মোজা", description: "Soft combed cotton pastel socks" },
    ],
    kids: [
      { id: "booties", slug: "booties", name: "Baby Booties & Caps", bengaliName: "বেবি ক্যাপ ও বুটিজ", description: "Soft knit cotton newborn caps and non-slip socks" },
    ],
  },
};

// -----------------------------------------------------------------------------------------
// Master Product Catalog with Commercial & Technical Export Specifications
// -----------------------------------------------------------------------------------------

export const MASTER_APPAREL_PRODUCTS: ApparelProductItem[] = [
  // -------------------------------------------------------------------
  // KNIT -> MEN'S -> T-SHIRTS (Exact user specified styles!)
  // -------------------------------------------------------------------
  {
    id: "knit-mens-v-neck-t-shirt",
    numericId: 101,
    slug: "mens-v-neck-t-shirt",
    name: "Men's V-Neck Single Jersey T-Shirt",
    categorySlug: "knit",
    categoryTitle: "Knitwear",
    demographic: "mens",
    demographicLabel: "Men's",
    subcategoryId: "t-shirts",
    subcategoryName: "T-Shirts",
    badge: "Export Core",
    specs: "160–180 GSM Single Jersey, 100% Combed Cotton, Mitered V-Neck Collar",
    fabricComposition: "100% Combed Ring-Spun Cotton (Organic BCI or GOTS certified available)",
    gsmOrWeight: "160 – 180 GSM",
    gaugeOrWeave: "28GG / 24GG Circular Single Jersey",
    yarnCount: "30s/1 or 26s/1 Combed Compact Yarn",
    moq: "1,000 pcs per color / 2,000 pcs per style",
    priceRange: "$2.15 – $2.90 / pc (FOB Chittagong)",
    leadTime: "45–60 Days",
    productionCapacity: "3,500,000 pcs / month",
    finishes: ["Bio-Polish Enzyme Wash", "Silicone Softener", "Anti-Pilling Treatment", "Shrinkage Control (<4%)"],
    certifications: ["OEKO-TEX® Standard 100", "BCI", "GOTS", "BSCI", "SEDEX"],
    colors: ["Optic White", "Pitch Black", "Navy Blue", "Heather Grey", "Olive Green", "Charcoal"],
    packaging: "1 pc/polybag, 48 pcs/export carton (custom barcoding & buyer packing supported)",
    detail: "Precision-engineered men's V-neck t-shirt featuring a tailored mitered neckband that stays flat through multiple industrial washes. Double-needle sleeve and bottom hems with reinforced shoulder-to-shoulder neck tape.",
    image_src: "/images/category-knit.png",
    is_featured: true,
  },
  {
    id: "knit-mens-crew-neck-t-shirt",
    numericId: 102,
    slug: "mens-crew-neck-t-shirt",
    name: "Men's Classic Crew Neck Round T-Shirt",
    categorySlug: "knit",
    categoryTitle: "Knitwear",
    demographic: "mens",
    demographicLabel: "Men's",
    subcategoryId: "t-shirts",
    subcategoryName: "T-Shirts",
    badge: "High Volume Staple",
    specs: "150–190 GSM 100% Cotton, 1x1 Lycra Rib Collar, Side Seam Construction",
    fabricComposition: "100% Combed Cotton / CVC 60/40 blends",
    gsmOrWeight: "150 – 190 GSM",
    gaugeOrWeave: "28GG Single Jersey",
    yarnCount: "30s/1 Combed Ring-Spun",
    moq: "1,500 pcs per color",
    priceRange: "$1.95 – $2.65 / pc (FOB Chittagong)",
    leadTime: "45–60 Days",
    productionCapacity: "3,500,000 pcs / month",
    finishes: ["Reactive Dyeing", "Silicone Wash", "Colorfastness Grade 4+"],
    certifications: ["OEKO-TEX® Standard 100", "WRAP", "BSCI"],
    colors: ["White", "Black", "Royal Blue", "Burgundy", "Heather Grey", "Forest Green"],
    packaging: "Flat packed or folded on hanger, export master cartons",
    detail: "The workhorse staple of international private label collections. Tubular or side-seamed body options, 1x1 rib collar containing 5% Lycra for excellent stretch recovery, clean finish shoulder taping.",
    image_src: "/images/category-knit.png",
    is_featured: true,
  },
  {
    id: "knit-mens-drop-shoulder-t-shirt",
    numericId: 103,
    slug: "mens-drop-shoulder-t-shirt",
    name: "Heavyweight Drop Shoulder Oversized T-Shirt",
    categorySlug: "knit",
    categoryTitle: "Knitwear",
    demographic: "mens",
    demographicLabel: "Men's",
    subcategoryId: "t-shirts",
    subcategoryName: "T-Shirts",
    badge: "Streetwear Trend (240 GSM)",
    specs: "220–260 GSM Heavyweight Jersey, Dropped Armholes, 2.5cm Thick Rib Collar",
    fabricComposition: "100% Heavy Combed Open-End / Carded Cotton",
    gsmOrWeight: "220 – 260 GSM (Heavyweight)",
    gaugeOrWeave: "20GG Dense Single Jersey",
    yarnCount: "16s/1 or 20s/1 Dry-Hand Cotton",
    moq: "1,000 pcs per color",
    priceRange: "$2.95 – $3.85 / pc (FOB Chittagong)",
    leadTime: "45–60 Days",
    productionCapacity: "3,500,000 pcs / month",
    finishes: ["Pre-Shrunk Carbonized Finish", "Vintage Garment Wash", "Dense Dry-Touch"],
    certifications: ["OEKO-TEX® Standard 100", "BCI", "BSCI"],
    colors: ["Washed Charcoal", "Vintage White", "Sage Dust", "Mocha Brown", "Faded Black"],
    packaging: "Individual bio-polybag, 36 pcs/export carton",
    detail: "Engineered specifically for premium streetwear and urban boutique brands. Features relaxed dropped shoulders, wide boxy body proportions, and a chunky 2.5cm wide bound neck rib with double topstitching.",
    image_src: "/images/category-knit.png",
    is_featured: true,
  },
  {
    id: "knit-mens-cut-sew-t-shirt",
    numericId: 104,
    slug: "mens-cut-sew-t-shirt",
    name: "Men's Cut & Sew Colorblock T-Shirt",
    categorySlug: "knit",
    categoryTitle: "Knitwear",
    demographic: "mens",
    demographicLabel: "Men's",
    subcategoryId: "t-shirts",
    subcategoryName: "T-Shirts",
    badge: "Engineered Panels",
    specs: "180 GSM Multi-Panel Cut & Sew, Flatlock Seam Detail, Contrast Rib",
    fabricComposition: "100% Combed Cotton, Dual Dye Matching",
    gsmOrWeight: "180 GSM",
    gaugeOrWeave: "24GG Single Jersey",
    yarnCount: "26s/1 Combed",
    moq: "1,200 pcs per style",
    priceRange: "$2.75 – $3.50 / pc (FOB Chittagong)",
    leadTime: "50–65 Days",
    productionCapacity: "3,500,000 pcs / month",
    finishes: ["Reactive Panel Dyeing", "Soft Handle Finish", "Color Bleed Prevention"],
    certifications: ["OEKO-TEX® Standard 100", "BSCI"],
    colors: ["Navy/White/Burgundy", "Black/Grey/Teal", "White/Sage/Khaki"],
    packaging: "Polybag with barcode sticker, 40 pcs/carton",
    detail: "Precision-aligned horizontal or angular cut-and-sew panels engineered with clean flatlock seams that eliminate bulk against the skin. Exact colorfast matching across adjacent color blocks.",
    image_src: "/images/category-knit.png",
  },
  {
    id: "knit-mens-henley-t-shirt",
    numericId: 105,
    slug: "mens-henley-t-shirt",
    name: "Men's 3-Button Placket Henley Tee",
    categorySlug: "knit",
    categoryTitle: "Knitwear",
    demographic: "mens",
    demographicLabel: "Men's",
    subcategoryId: "t-shirts",
    subcategoryName: "T-Shirts",
    badge: "Smart Casual",
    specs: "190 GSM Slub Jersey, Woven Collar Placket Facing, Faux Horn Buttons",
    fabricComposition: "100% Slub Cotton or Cotton/Modal",
    gsmOrWeight: "180 – 200 GSM",
    gaugeOrWeave: "24GG Slub Jersey",
    yarnCount: "24s/1 Slub Yarn",
    moq: "1,200 pcs per color",
    priceRange: "$2.85 – $3.60 / pc (FOB Chittagong)",
    leadTime: "50–60 Days",
    productionCapacity: "3,500,000 pcs / month",
    finishes: ["Enzyme Wash", "Soft Wash"],
    certifications: ["OEKO-TEX® Standard 100", "BSCI"],
    colors: ["Heather Navy", "Charcoal Melange", "Off-White", "Washed Olive"],
    packaging: "Standard export polybag packaging",
    detail: "Distinguished by an authentic textured slub jersey fabrication and a clean woven interlined 3-button placket. Versatile for both base layering and standalone smart casual wear.",
    image_src: "/images/category-knit.png",
  },
  {
    id: "knit-mens-pocket-t-shirt",
    numericId: 106,
    slug: "mens-pocket-t-shirt",
    name: "Men's Chest Pocket Single Jersey Tee",
    categorySlug: "knit",
    categoryTitle: "Knitwear",
    demographic: "mens",
    demographicLabel: "Men's",
    subcategoryId: "t-shirts",
    subcategoryName: "T-Shirts",
    badge: "Core Programme",
    specs: "170 GSM Jersey, Hemmed Spade Chest Pocket, Reinforced Corners",
    fabricComposition: "100% Combed BCI Cotton",
    gsmOrWeight: "170 GSM",
    gaugeOrWeave: "24GG Single Jersey",
    yarnCount: "26s/1 Ring-Spun",
    moq: "1,000 pcs per color",
    priceRange: "$2.25 – $2.85 / pc (FOB Chittagong)",
    leadTime: "45–60 Days",
    productionCapacity: "3,500,000 pcs / month",
    finishes: ["Bio-polish", "Garment Soft Wash"],
    certifications: ["OEKO-TEX® Standard 100", "WRAP"],
    colors: ["White", "Black", "Charcoal", "Indigo", "Khaki"],
    packaging: "Individual polybag packaging",
    detail: "A timeless wardrobe piece featuring a precision-aligned spade chest pocket with reinforced bar-tack stitching at high-stress top corners. Retains shape after repeated laundry cycles.",
    image_src: "/images/category-knit.png",
  },

  // -------------------------------------------------------------------
  // KNIT -> MEN'S -> POLO SHIRTS
  // -------------------------------------------------------------------
  {
    id: "knit-mens-pique-polo",
    numericId: 107,
    slug: "mens-pique-polo-shirt",
    name: "Men's Classic Pique Cotton Polo Shirt",
    categorySlug: "knit",
    categoryTitle: "Knitwear",
    demographic: "mens",
    demographicLabel: "Men's",
    subcategoryId: "polo-shirts",
    subcategoryName: "Polo Shirts",
    badge: "Bestseller Export",
    specs: "210–230 GSM Honeycomb Pique, Flat-Knit Jacquard Collar, 3-Button Placket",
    fabricComposition: "100% Combed Cotton or CVC 60/40 Honeycomb Pique",
    gsmOrWeight: "210 – 230 GSM",
    gaugeOrWeave: "Honeycomb Pique Knit",
    yarnCount: "24s/1 or 30s/2 Combed Cotton",
    moq: "1,200 pcs per color",
    priceRange: "$3.40 – $4.50 / pc (FOB Chittagong)",
    leadTime: "50–65 Days",
    productionCapacity: "3,500,000 pcs / month",
    finishes: ["Pre-Shrunk Mercerized Softener", "Anti-Curl Collar Finish"],
    certifications: ["OEKO-TEX® Standard 100", "WRAP", "BSCI"],
    colors: ["Navy Blue", "Pure White", "Jet Black", "Burgundy", "Emerald Green", "Royal Heather"],
    packaging: "Individual polybag with cardboard collar support, 36 pcs/carton",
    detail: "Our signature export polo shirt. Features heavy flat-knit jacquard collars that resist curling, cross-stitched mother-of-pearl effect buttons, fused interlining placket, and taped split side vents.",
    image_src: "/images/category-knit.png",
    is_featured: true,
  },
  {
    id: "knit-mens-jersey-polo",
    numericId: 108,
    slug: "mens-jersey-polo-shirt",
    name: "Men's Smooth Jersey Luxury Polo",
    categorySlug: "knit",
    categoryTitle: "Knitwear",
    demographic: "mens",
    demographicLabel: "Men's",
    subcategoryId: "polo-shirts",
    subcategoryName: "Polo Shirts",
    badge: "Executive Touch",
    specs: "190 GSM Mercerized Smooth Jersey, Self-Fabric Collar, Concealed Placket",
    fabricComposition: "100% Long-Staple Combed Cotton (Silicone Finished)",
    gsmOrWeight: "190 GSM",
    gaugeOrWeave: "28GG Fine Jersey",
    yarnCount: "40s/2 Double Ply",
    moq: "1,000 pcs per color",
    priceRange: "$3.95 – $5.20 / pc (FOB Chittagong)",
    leadTime: "50–65 Days",
    productionCapacity: "3,500,000 pcs / month",
    finishes: ["Double Mercerization", "Silicone Softening"],
    certifications: ["OEKO-TEX® Standard 100", "BSCI"],
    colors: ["Black", "White", "Navy", "Silver Grey", "Dusty Cedar"],
    packaging: "Tissue-wrapped polybag, 30 pcs/carton",
    detail: "Sophisticated smooth finish polo crafted from double-mercerized fine yarn. Self-fabric tailored collar with built-in stays and a concealed snap button placket.",
    image_src: "/images/category-knit.png",
  },

  // -------------------------------------------------------------------
  // KNIT -> MEN'S -> TANK TOPS & SINGLETS
  // -------------------------------------------------------------------
  {
    id: "knit-mens-athletic-tank",
    numericId: 109,
    slug: "mens-athletic-tank-top",
    name: "Men's Athletic Muscle Tank Top",
    categorySlug: "knit",
    categoryTitle: "Knitwear",
    demographic: "mens",
    demographicLabel: "Men's",
    subcategoryId: "tank-tops",
    subcategoryName: "Tank Tops & Singlets",
    badge: "Gym & Active",
    specs: "160 GSM Single Jersey / 2x2 Rib Binding, Deep Cut Armholes",
    fabricComposition: "95% Combed Cotton, 5% Elastane or 100% Cotton",
    gsmOrWeight: "160 GSM",
    gaugeOrWeave: "28GG Jersey",
    yarnCount: "30s/1 with 20D Spandex",
    moq: "1,200 pcs per color",
    priceRange: "$1.85 – $2.45 / pc (FOB Chittagong)",
    leadTime: "45–55 Days",
    productionCapacity: "3,500,000 pcs / month",
    finishes: ["Moisture Management", "Anti-Bacterial Wash"],
    certifications: ["OEKO-TEX® Standard 100", "BSCI"],
    colors: ["Black", "Heather Grey", "White", "Army Green", "Red"],
    packaging: "Individual polybag, 60 pcs/carton",
    detail: "Designed for athletic training and active lifestyles. Features reinforced self-fabric neck and armhole binding, side-seamed drape, and curved drop-tail hem.",
    image_src: "/images/category-knit.png",
  },
  {
    id: "knit-mens-ribbed-singlet",
    numericId: 110,
    slug: "mens-ribbed-singlet",
    name: "Men's 2x2 Rib Cotton Underwear Singlet",
    categorySlug: "knit",
    categoryTitle: "Knitwear",
    demographic: "mens",
    demographicLabel: "Men's",
    subcategoryId: "tank-tops",
    subcategoryName: "Tank Tops & Singlets",
    badge: "High Volume Basic",
    specs: "180 GSM 2x2 Rib Knit, Tubular Seamless Body, Soft Stretch",
    fabricComposition: "100% Combed Cotton",
    gsmOrWeight: "180 GSM",
    gaugeOrWeave: "2x2 Rib Knit",
    yarnCount: "28s/1 Combed",
    moq: "3,000 pcs per color",
    priceRange: "$1.45 – $1.95 / pc (FOB Chittagong)",
    leadTime: "40–50 Days",
    productionCapacity: "3,500,000 pcs / month",
    finishes: ["Bleached Pure White", "Reactive Dyeing"],
    certifications: ["OEKO-TEX® Standard 100", "WRAP"],
    colors: ["Pure White", "Heather Grey", "Black", "Navy"],
    packaging: "Multipack 3-in-1 pack or individual polybag",
    detail: "Classic rib knit underwear singlet with seamless tubular knitting. Contours closely to the body while ensuring maximum airflow and absorbency.",
    image_src: "/images/category-knit.png",
  },

  // -------------------------------------------------------------------
  // KNIT -> MEN'S -> SWEATSHIRTS
  // -------------------------------------------------------------------
  {
    id: "knit-mens-crewneck-sweatshirt",
    numericId: 111,
    slug: "mens-crewneck-sweatshirt",
    name: "Men's French Terry Crewneck Sweatshirt",
    categorySlug: "knit",
    categoryTitle: "Knitwear",
    demographic: "mens",
    demographicLabel: "Men's",
    subcategoryId: "sweatshirts",
    subcategoryName: "Sweatshirts",
    badge: "Cold Season Staple",
    specs: "300–340 GSM Loopback French Terry, V-Notch Collar, 2x2 Rib Trim",
    fabricComposition: "80% Combed Cotton, 20% Polyester (Loopback French Terry)",
    gsmOrWeight: "300 – 340 GSM",
    gaugeOrWeave: "3-Thread Loopback Fleece",
    yarnCount: "32s/1 + 10s/1 Cotton",
    moq: "1,000 pcs per color",
    priceRange: "$5.20 – $6.80 / pc (FOB Chittagong)",
    leadTime: "50–65 Days",
    productionCapacity: "3,500,000 pcs / month",
    finishes: ["Pre-Shrunk Carbonized", "Anti-Pill Wash"],
    certifications: ["OEKO-TEX® Standard 100", "BSCI", "SEDEX"],
    colors: ["Heather Grey", "Charcoal Melange", "Navy Blue", "Pitch Black", "Forest Green"],
    packaging: "Folded in polybag with silica gel, 24 pcs/carton",
    detail: "Heavyweight premium cotton-rich French terry sweatshirt. Classic triangular rib V-insert at neck, coverstitched armhole and side seams, elastane-infused rib cuffs and waistband for zero stretch-out.",
    image_src: "/images/category-knit.png",
    is_featured: true,
  },

  // -------------------------------------------------------------------
  // KNIT -> MEN'S -> HOODIES
  // -------------------------------------------------------------------
  {
    id: "knit-mens-pullover-hoodie",
    numericId: 112,
    slug: "mens-pullover-fleece-hoodie",
    name: "Men's Brushed Fleece Pullover Hoodie",
    categorySlug: "knit",
    categoryTitle: "Knitwear",
    demographic: "mens",
    demographicLabel: "Men's",
    subcategoryId: "hoodies",
    subcategoryName: "Hoodies",
    badge: "Core Volume Outerwear",
    specs: "320–360 GSM Brushed Inside Fleece, Double-Layer Hood, Kangaroo Pocket",
    fabricComposition: "70% Cotton, 30% Polyester Brushed Heavy Fleece",
    gsmOrWeight: "320 – 360 GSM",
    gaugeOrWeave: "3-End Heavy Brushed Fleece",
    yarnCount: "30s + 10s Cotton Poly",
    moq: "1,000 pcs per color",
    priceRange: "$6.50 – $8.20 / pc (FOB Chittagong)",
    leadTime: "50–65 Days",
    productionCapacity: "3,500,000 pcs / month",
    finishes: ["Brushed Polar Softness", "Anti-Pilling Treatment", "Shrinkage Stabilized"],
    certifications: ["OEKO-TEX® Standard 100", "WRAP", "BSCI"],
    colors: ["Black", "Heather Grey", "Burgundy", "Navy", "Sage", "Camel"],
    packaging: "Individual polybag, 20 pcs/carton",
    detail: "High-density thermal pullover hoodie with plush brushed interior fleece. Double-ply structured hood with metal eyelets and custom dipped drawcords, reinforced bar-tacked kangaroo pocket corners.",
    image_src: "/images/category-knit.png",
    is_featured: true,
  },
  {
    id: "knit-mens-zip-hoodie",
    numericId: 113,
    slug: "mens-full-zip-hoodie",
    name: "Men's Full-Zip Heavyweight Fleece Hoodie",
    categorySlug: "knit",
    categoryTitle: "Knitwear",
    demographic: "mens",
    demographicLabel: "Men's",
    subcategoryId: "hoodies",
    subcategoryName: "Hoodies",
    badge: "Heavy Zipper Detail",
    specs: "340 GSM Brushed Fleece, YKK Metal Zipper, Split Kangaroo Pocket",
    fabricComposition: "75% Cotton, 25% Polyester",
    gsmOrWeight: "340 GSM",
    gaugeOrWeave: "3-Thread Fleece",
    yarnCount: "30s/1 + 10s/1",
    moq: "1,000 pcs per color",
    priceRange: "$7.20 – $8.95 / pc (FOB Chittagong)",
    leadTime: "55–70 Days",
    productionCapacity: "3,500,000 pcs / month",
    finishes: ["Anti-Pilling", "Enzyme Soft Finish"],
    certifications: ["OEKO-TEX® Standard 100", "BSCI"],
    colors: ["Black", "Charcoal Melange", "Navy", "Oatmeal"],
    packaging: "Individual polybag, 18 pcs/carton",
    detail: "Full-zip hoodie engineered with concealed YKK metal or coil zipper tape allowing uninterrupted front chest embroidery or screen printing. Thick ribbed waistband and cuffs.",
    image_src: "/images/category-knit.png",
  },

  // -------------------------------------------------------------------
  // KNIT -> MEN'S -> FLEECE JACKETS
  // -------------------------------------------------------------------
  {
    id: "knit-mens-polar-fleece-jacket",
    numericId: 114,
    slug: "mens-polar-fleece-jacket",
    name: "Men's Full-Zip Polar Fleece Jacket",
    categorySlug: "knit",
    categoryTitle: "Knitwear",
    demographic: "mens",
    demographicLabel: "Men's",
    subcategoryId: "fleece-jackets",
    subcategoryName: "Fleece Jackets",
    badge: "Winter Warmth",
    specs: "260–300 GSM Micro-Polar Fleece, Stand Collar, Zipper Hand Pockets",
    fabricComposition: "100% Recycled Polyester (GRS) Polar Fleece",
    gsmOrWeight: "260 – 300 GSM",
    gaugeOrWeave: "Double-Sided Brushed Polar Fleece",
    yarnCount: "Micro-Denier Poly Filaments",
    moq: "1,200 pcs per style",
    priceRange: "$5.80 – $7.50 / pc (FOB Chittagong)",
    leadTime: "50–65 Days",
    productionCapacity: "3,500,000 pcs / month",
    finishes: ["Two-Side Brushed Two-Side Anti-Pill", "Quick Dry"],
    certifications: ["GRS (Global Recycled Standard)", "OEKO-TEX® Standard 100", "BSCI"],
    colors: ["Black", "Navy Blue", "Dark Charcoal", "Forest Green"],
    packaging: "1 pc/polybag, 24 pcs/carton",
    detail: "Thermal insulation layer made from recycled microfiber polar fleece. Stand-up draft barrier collar, full front reverse coil zipper, zip side security pockets and elastic bound cuffs.",
    image_src: "/images/category-knit.png",
    is_featured: true,
  },

  // -------------------------------------------------------------------
  // KNIT -> MEN'S -> PAJAMAS & SLEEPWEAR
  // -------------------------------------------------------------------
  {
    id: "knit-mens-pajama-set",
    numericId: 115,
    slug: "mens-cotton-pajama-set",
    name: "Men's 100% Cotton Jersey Pajama Sleep Set",
    categorySlug: "knit",
    categoryTitle: "Knitwear",
    demographic: "mens",
    demographicLabel: "Men's",
    subcategoryId: "pajamas",
    subcategoryName: "Pajamas & Sleepwear",
    badge: "Breathable Sleep",
    specs: "160 GSM Single Jersey, Elastic Drawstring Waist Pants, Short Sleeve Tee",
    fabricComposition: "100% Combed Cotton Single Jersey (Skin Soft)",
    gsmOrWeight: "160 GSM",
    gaugeOrWeave: "28GG Circular Single Jersey",
    yarnCount: "32s/1 Combed Cotton",
    moq: "1,500 sets per color/print",
    priceRange: "$4.60 – $5.95 / set (FOB Chittagong)",
    leadTime: "45–60 Days",
    productionCapacity: "3,500,000 pcs / month",
    finishes: ["Zero Formaldehyde Softener", "Ultra-Soft Peach Finish"],
    certifications: ["OEKO-TEX® Standard 100", "BSCI"],
    colors: ["Navy/Grey Plaid", "Black/Stripe", "Charcoal/Teal", "Blue Heather"],
    packaging: "Set folded with ribbon band or hanger packaging",
    detail: "Two-piece premium loungewear and sleep set. Relaxed fit crewneck tee paired with full-length or cropped jersey pants with wide elastic waistband, internal cotton drawcord, and deep side pockets.",
    image_src: "/images/category-knit.png",
    is_featured: true,
  },

  // -------------------------------------------------------------------
  // KNIT -> MEN'S -> JOGGERS & SWEATPANTS
  // -------------------------------------------------------------------
  {
    id: "knit-mens-cuffed-joggers",
    numericId: 116,
    slug: "mens-cuffed-fleece-joggers",
    name: "Men's Cuffed Heavyweight Fleece Joggers",
    categorySlug: "knit",
    categoryTitle: "Knitwear",
    demographic: "mens",
    demographicLabel: "Men's",
    subcategoryId: "joggers",
    subcategoryName: "Joggers & Sweatpants",
    badge: "Athleisure Core",
    specs: "300–340 GSM Brushed Fleece, Ribbed Ankle Cuffs, Concealed Zip Pockets",
    fabricComposition: "80% Cotton, 20% Polyester Brushed Fleece",
    gsmOrWeight: "300 – 340 GSM",
    gaugeOrWeave: "3-Thread Loop & Brush",
    yarnCount: "30s + 10s Cotton Poly",
    moq: "1,200 pcs per color",
    priceRange: "$5.40 – $6.90 / pc (FOB Chittagong)",
    leadTime: "50–65 Days",
    productionCapacity: "3,500,000 pcs / month",
    finishes: ["Anti-Pill Wash", "Soft Silicone Finish"],
    certifications: ["OEKO-TEX® Standard 100", "BSCI"],
    colors: ["Black", "Heather Grey", "Navy", "Charcoal", "Olive"],
    packaging: "Individual polybag, 24 pcs/carton",
    detail: "Modern tapered silhouette with ergonomic knee darting. Ribbed waistband with heavy tubular drawcords and branded metal tips, concealed zip side pockets, and snug 2x2 rib ankle cuffs.",
    image_src: "/images/category-knit.png",
    is_featured: true,
  },

  // -------------------------------------------------------------------
  // WOVEN -> MEN'S EXAMPLES
  // -------------------------------------------------------------------
  {
    id: "woven-mens-formal-shirt",
    numericId: 201,
    slug: "mens-formal-business-shirt",
    name: "Men's Formal Poplin Business Shirt",
    categorySlug: "woven",
    categoryTitle: "Woven Garments",
    demographic: "mens",
    demographicLabel: "Men's",
    subcategoryId: "formal-shirts",
    subcategoryName: "Formal & Dress Shirts",
    badge: "Tailored Precision",
    specs: "120 GSM Fine Cotton Poplin, Fused Collar & Cuffs, Easy-Iron Finish",
    fabricComposition: "100% 2-Ply Combed Egyptian Cotton (80s/2 or 100s/2)",
    gsmOrWeight: "115 – 125 GSM",
    gaugeOrWeave: "Fine Plain Poplin Weave",
    yarnCount: "80s/2 x 80s/2 Compact",
    moq: "1,200 pcs per style",
    priceRange: "$4.95 – $6.80 / pc (FOB Chittagong)",
    leadTime: "60–75 Days",
    productionCapacity: "1,200,000 pcs / month",
    finishes: ["Liquid Ammonia Easy-Care", "Wrinkle-Free Rating 3.5+"],
    certifications: ["OEKO-TEX® Standard 100", "BSCI", "SEDEX"],
    colors: ["Crisp White", "Light Sky Blue", "Pink Fil-a-Fil", "French Blue", "Lavender"],
    packaging: "Stand-up collar stand packaging with butterfly, 24 pcs/carton",
    detail: "Engineered for international corporate formal collections. Features single-needle tailoring, taped side and armhole seams to prevent puckering, removable collar stays, and cross-stitched mother-of-pearl effect buttons.",
    image_src: "/images/category-woven.png",
    is_featured: true,
  },
  {
    id: "woven-mens-chinos",
    numericId: 202,
    slug: "mens-stretch-chino-trousers",
    name: "Men's Stretch Cotton Chino Trousers",
    categorySlug: "woven",
    categoryTitle: "Woven Garments",
    demographic: "mens",
    demographicLabel: "Men's",
    subcategoryId: "chinos",
    subcategoryName: "Chinos & Trousers",
    badge: "Core Programme",
    specs: "260–280 GSM Cotton Twill, 98% Cotton 2% Elastane, Peached Soft Wash",
    fabricComposition: "98% Combed Cotton, 2% Spandex Stretch Twill",
    gsmOrWeight: "260 – 280 GSM",
    gaugeOrWeave: "3/1 Right Hand Twill",
    yarnCount: "16s x 16s + 70D",
    moq: "1,500 pcs per color",
    priceRange: "$6.20 – $7.90 / pc (FOB Chittagong)",
    leadTime: "60–75 Days",
    productionCapacity: "1,200,000 pcs / month",
    finishes: ["Peach Skin Emerized", "Garment Enzyme Wash"],
    certifications: ["OEKO-TEX® Standard 100", "BSCI"],
    colors: ["British Khaki", "Navy", "Charcoal Grey", "Olive Green", "Black", "Stone"],
    packaging: "Flat packed or on hanger, 20 pcs/carton",
    detail: "Versatile smart chino trousers featuring an engineered curtain waistband, front slant pockets, double-welt buttoned back pockets, and heavy YKK metal zipper fly with interior anchor button.",
    image_src: "/images/category-woven.png",
    is_featured: true,
  },
  {
    id: "woven-mens-cargo-pants",
    numericId: 203,
    slug: "mens-canvas-cargo-pants",
    name: "Men's Ripstop Canvas Utility Cargo Pants",
    categorySlug: "woven",
    categoryTitle: "Woven Garments",
    demographic: "mens",
    demographicLabel: "Men's",
    subcategoryId: "cargo-pants",
    subcategoryName: "Cargo & Utility Pants",
    badge: "Workwear / Streetwear",
    specs: "290 GSM Heavy Cotton Canvas Ripstop, Accordion Cargo Pockets, Bar-Tacked",
    fabricComposition: "100% Heavy Duty Cotton Ripstop Canvas",
    gsmOrWeight: "290 GSM",
    gaugeOrWeave: "Cross-Hatch Ripstop Weave",
    yarnCount: "12s x 10s Heavy Ring-Spun",
    moq: "1,500 pcs per color",
    priceRange: "$7.50 – $9.20 / pc (FOB Chittagong)",
    leadTime: "65–80 Days",
    productionCapacity: "1,200,000 pcs / month",
    finishes: ["Heavy Stone & Enzyme Wash", "DWR Water Repellent Optional"],
    certifications: ["OEKO-TEX® Standard 100", "BSCI"],
    colors: ["Army Olive", "Washed Black", "Desert Tan", "Dark Charcoal"],
    packaging: "Individual polybag, 18 pcs/carton",
    detail: "Rugged utility cargo pants with 6-pocket functional architecture. Reinforced seat and knee articulation darts, bellows cargo pockets with hidden snap flap closures, and bottom hem drawcords.",
    image_src: "/images/category-woven.png",
  },

  // -------------------------------------------------------------------
  // DENIM -> MEN'S EXAMPLES
  // -------------------------------------------------------------------
  {
    id: "denim-mens-5-pocket-jeans",
    numericId: 301,
    slug: "mens-5-pocket-denim-jeans",
    name: "Men's 5-Pocket Regular Straight Denim Jeans",
    categorySlug: "denim",
    categoryTitle: "Denim Apparel",
    demographic: "mens",
    demographicLabel: "Men's",
    subcategoryId: "jeans",
    subcategoryName: "5-Pocket Jeans",
    badge: "Export Pillar",
    specs: "12.5 oz Ring-Spun Cotton Denim, Comfort Stretch 99/1, Medium Enzyme Stone Wash",
    fabricComposition: "99% Cotton, 1% Elastane Ring-Spun Indigo Denim",
    gsmOrWeight: "12.5 oz (approx 420 GSM)",
    gaugeOrWeave: "3/1 Right Hand Twill",
    yarnCount: "10s Ring Spun Indigo x 12s Poly/Elastane",
    moq: "1,500 pcs per wash",
    priceRange: "$6.80 – $8.50 / pc (FOB Chittagong)",
    leadTime: "60–75 Days",
    productionCapacity: "900,000 pcs / month",
    finishes: ["Enzyme Stone Wash", "Laser Whiskering (Jeanologia)", "Local Hand Scraping", "Ozone Eco-Fading"],
    certifications: ["ZDHC Level 3", "OEKO-TEX® Standard 100", "BSCI"],
    colors: ["Classic Medium Indigo", "Dark Rinse", "Vintage Light Wash", "Stay Black"],
    packaging: "Folded with back pocket flasher and waist tag, 20 pcs/carton",
    detail: "Engineered in closed-loop sustainable denim laundries. Heavy-duty 5-pocket architecture, copper rivets at stress points, chain-stitched waistband and hem, and genuine leather back waist patch.",
    image_src: "/images/category-denim.png",
    is_featured: true,
  },
  {
    id: "denim-mens-trucker-jacket",
    numericId: 302,
    slug: "mens-denim-trucker-jacket",
    name: "Men's Vintage Wash Denim Trucker Jacket",
    categorySlug: "denim",
    categoryTitle: "Denim Apparel",
    demographic: "mens",
    demographicLabel: "Men's",
    subcategoryId: "jackets",
    subcategoryName: "Denim Trucker Jackets",
    badge: "Outerwear Staple",
    specs: "13.5 oz Rigid Indigo Denim, Point Collar, Shank Button Closures, Welt Pockets",
    fabricComposition: "100% Rigid Heavy Cotton Denim",
    gsmOrWeight: "13.5 oz",
    gaugeOrWeave: "3/1 RHT Denim",
    yarnCount: "8s x 9s Open End Cotton",
    moq: "1,000 pcs per wash",
    priceRange: "$9.80 – $12.50 / pc (FOB Chittagong)",
    leadTime: "65–80 Days",
    productionCapacity: "900,000 pcs / month",
    finishes: ["Vintage Tinting & Stone Wash", "Laser Grinding on Cuffs and Collar"],
    certifications: ["OEKO-TEX® Standard 100", "BSCI"],
    colors: ["Washed Vintage Blue", "Raw Indigo", "Distressed Black"],
    packaging: "Flat packed or on heavy hanger, 15 pcs/carton",
    detail: "Classic heritage trucker silhouette with double chest flap pockets, waist adjuster tabs, twin needle flat-felled structural seams, and custom embossed antique brass shank buttons.",
    image_src: "/images/category-denim.png",
    is_featured: true,
  },

  // -------------------------------------------------------------------
  // SWEATER -> MEN'S EXAMPLES
  // -------------------------------------------------------------------
  {
    id: "sweater-mens-crewneck-pullover",
    numericId: 401,
    slug: "mens-12gg-crewneck-sweater",
    name: "Men's 12GG Fine Gauge Cotton Pullover",
    categorySlug: "sweater",
    categoryTitle: "Sweaters (3GG–14GG)",
    demographic: "mens",
    demographicLabel: "Men's",
    subcategoryId: "pullovers",
    subcategoryName: "Crewneck & V-Neck Pullovers",
    badge: "Fine Flat Knit (12GG)",
    specs: "12GG Shima Seiki Flat Knit, 100% Combed Cotton, Fully Fashioned Linking",
    fabricComposition: "100% Long-Staple Combed Cotton Sweater Yarn",
    gsmOrWeight: "12 Gauge (Fine Weight)",
    gaugeOrWeave: "12GG Computerized Flat Knitting",
    yarnCount: "2/32s Combed Cotton",
    moq: "1,200 pcs per style",
    priceRange: "$5.90 – $7.50 / pc (FOB Chittagong)",
    leadTime: "75–90 Days",
    productionCapacity: "650,000 pcs / month",
    finishes: ["Soft Wool Touch Wash", "Anti-Pilling Finish"],
    certifications: ["OEKO-TEX® Standard 100", "BSCI", "SEDEX"],
    colors: ["Heather Charcoal", "Dark Navy", "Burgundy Melange", "Oatmeal", "Black"],
    packaging: "Individual polybag with tissue insert, 24 pcs/carton",
    detail: "Knitted on modern Shima Seiki multi-gauge computer flat knitting machinery. Fully fashioned linked armhole and neck panels with no raw overlocked interior seams for maximum luxury comfort.",
    image_src: "/images/category-sweater.png",
    is_featured: true,
  },
  {
    id: "sweater-mens-cable-knit",
    numericId: 402,
    slug: "mens-5gg-cable-knit-sweater",
    name: "Men's 5GG Chunky Cable-Knit Sweater",
    categorySlug: "sweater",
    categoryTitle: "Sweaters (3GG–14GG)",
    demographic: "mens",
    demographicLabel: "Men's",
    subcategoryId: "cable-knits",
    subcategoryName: "Chunky Cable-Knit Sweaters",
    badge: "Heavy Gauge (5GG)",
    specs: "5GG Heavy Cable Structure, Acrylic/Wool Touch Yarn, Chunky Ribbed Neck",
    fabricComposition: "80% Acrylic, 20% Wool or 100% Heavy Combed Cotton",
    gsmOrWeight: "5 Gauge (Heavy Winter)",
    gaugeOrWeave: "5GG Cable Structure Knit",
    yarnCount: "2/16s or 3/16s Heavy Sweater Yarn",
    moq: "1,200 pcs per style",
    priceRange: "$7.80 – $9.80 / pc (FOB Chittagong)",
    leadTime: "75–90 Days",
    productionCapacity: "650,000 pcs / month",
    finishes: ["Fulling & Softening Wash"],
    certifications: ["OEKO-TEX® Standard 100", "BSCI"],
    colors: ["Cream Oatmeal", "Charcoal Melange", "Forest Green", "Rich Camel"],
    packaging: "Heavy polybag packaging, 16 pcs/carton",
    detail: "Traditional Aran cable rope structures blended with modern thermal bulk. Features chunky 2x2 ribbing at neck, cuffs, and hem to insulate warmth during harsh winter retail seasons.",
    image_src: "/images/category-sweater.png",
    is_featured: true,
  },

  // -------------------------------------------------------------------
  // VARIOUS ITEMS -> MEN'S EXAMPLES
  // -------------------------------------------------------------------
  {
    id: "various-mens-baseball-cap",
    numericId: 501,
    slug: "mens-6-panel-baseball-cap",
    name: "Classic 6-Panel Chino Twill Baseball Cap",
    categorySlug: "various-items",
    categoryTitle: "Various Items",
    demographic: "mens",
    demographicLabel: "Men's",
    subcategoryId: "caps",
    subcategoryName: "Caps & Headwear",
    badge: "Headwear Essential",
    specs: "280 GSM Heavy Brushed Cotton Twill, Pre-Curved Visor, Brass Buckle",
    fabricComposition: "100% Heavy Brushed Cotton Chino Twill",
    gsmOrWeight: "280 GSM",
    gaugeOrWeave: "Structured Woven Twill",
    moq: "1,500 pcs per color",
    priceRange: "$1.40 – $1.95 / pc (FOB Chittagong)",
    leadTime: "45–60 Days",
    productionCapacity: "1,500,000 pcs / month",
    finishes: ["Garment Washed", "3D Puff Embroidery Ready"],
    certifications: ["OEKO-TEX® Standard 100", "BSCI"],
    colors: ["Black", "Khaki", "Navy", "Forest Green", "Burgundy", "White"],
    packaging: "Packed 25 pcs per inner box, 150 pcs per export master carton",
    detail: "Heavy-duty 6-panel structured cap with embroidered ventilation eyelets, internal cotton sweatband, and antique brass strap buckle closure with grommet tuck-in.",
    image_src: "/images/category-various.png",
    is_featured: true,
  },
  {
    id: "various-mens-athletic-socks",
    numericId: 502,
    slug: "mens-cushion-athletic-crew-socks",
    name: "Men's Terry Cushion Athletic Crew Socks (3-Pack)",
    categorySlug: "various-items",
    categoryTitle: "Various Items",
    demographic: "mens",
    demographicLabel: "Men's",
    subcategoryId: "socks",
    subcategoryName: "Socks & Footwear Accessories",
    badge: "Volume Staple",
    specs: "168N Circular Knit, Terry Cushion Sole, Arch Support Compression Band",
    fabricComposition: "80% Combed Cotton, 17% Polyamide, 3% Elastane",
    gsmOrWeight: "Heavy Cushion Weight",
    gaugeOrWeave: "168 Needle Circular Knitting",
    moq: "3,000 pairs / packs",
    priceRange: "$0.65 – $0.95 / pair (FOB Chittagong)",
    leadTime: "40–55 Days",
    productionCapacity: "1,500,000 pcs / month",
    finishes: ["Silicone Anti-Slip", "Anti-Odor Bio-Wash"],
    certifications: ["OEKO-TEX® Standard 100", "WRAP"],
    colors: ["Triple White", "Triple Black", "White with Black Stripes", "Heather Grey"],
    packaging: "Card header with hook or 3-pair band wrap",
    detail: "Reinforced heel and toe padding for extended durability. Elasticated mid-foot arch compression ribbing keeps sock firmly in place during athletic and work wear.",
    image_src: "/images/category-various.png",
  },
  {
    id: "various-canvas-tote-bag",
    numericId: 503,
    slug: "heavy-cotton-canvas-tote-bag",
    name: "Heavy 12 oz Cotton Canvas Shopping Tote Bag",
    categorySlug: "various-items",
    categoryTitle: "Various Items",
    demographic: "mens",
    demographicLabel: "Men's",
    subcategoryId: "bags",
    subcategoryName: "Canvas Totes & Bags",
    badge: "Eco Packaging",
    specs: "12 oz Heavy Unbleached Cotton Duck Canvas, Reinforced Cross-Stitch Handles",
    fabricComposition: "100% Natural Raw Cotton Canvas",
    gsmOrWeight: "12 oz (approx 400 GSM)",
    gaugeOrWeave: "Heavy Plain Canvas Weave",
    moq: "2,000 pcs",
    priceRange: "$1.15 – $1.65 / pc (FOB Chittagong)",
    leadTime: "40–50 Days",
    productionCapacity: "1,500,000 pcs / month",
    finishes: ["Azo-Free Screen Print Ready", "Water-Resistant Coating Optional"],
    certifications: ["GOTS Certified Cotton", "OEKO-TEX® Standard 100"],
    colors: ["Natural Raw Ecru", "Pitch Black", "Navy", "Forest Green"],
    packaging: "Bulk flat packed 100 pcs per export carton",
    detail: "Sustainable eco-friendly retail shopping bag. Features deep gusset bottom, cross-stitched webbed handles that easily carry 15+ kg loads, and optional internal zipper security pocket.",
    image_src: "/images/category-various.png",
  },
];

// Helper functions for easy querying
export function getProductsByCategory(categorySlug: CategorySlug): ApparelProductItem[] {
  return MASTER_APPAREL_PRODUCTS.filter((p) => p.categorySlug === categorySlug);
}

export function getProductsByDemographic(categorySlug: CategorySlug, demographic: DemographicId): ApparelProductItem[] {
  return MASTER_APPAREL_PRODUCTS.filter(
    (p) => p.categorySlug === categorySlug && p.demographic === demographic
  );
}

export function getProductsBySubcategory(
  categorySlug: CategorySlug,
  demographic: DemographicId,
  subcategoryId: string
): ApparelProductItem[] {
  return MASTER_APPAREL_PRODUCTS.filter(
    (p) =>
      p.categorySlug === categorySlug &&
      p.demographic === demographic &&
      p.subcategoryId === subcategoryId
  );
}

export function getApparelProductBySlugOrId(idOrSlug: string | number): ApparelProductItem | undefined {
  const queryStr = String(idOrSlug).toLowerCase().trim();
  return MASTER_APPAREL_PRODUCTS.find(
    (p) =>
      String(p.numericId) === queryStr ||
      p.id.toLowerCase() === queryStr ||
      p.slug.toLowerCase() === queryStr
  );
}
