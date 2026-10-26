import { images, SiteImage } from "@/lib/content/images";

export interface CategoryProduct {
  id?: number | string;
  name: string;
  detail: string;
  badge?: string;
  specs?: string;
  image_src?: string;
  image?: SiteImage | string;
}

export interface CategoryData {
  title: string;
  slug: string;
  badge: string;
  description: string;
  heroIntro: string;
  longDescription: string;
  image: SiteImage;
  serviceHash: string;
  leadTime: string;
  moq: string;
  productionCapacity: string;
  products: CategoryProduct[];
  fabrics: string[];
  constructions: string[];
  finishes: string[];
  certifications: string[];
}

export const categoriesCatalog: CategoryData[] = [
  {
    title: "Knit",
    slug: "knit",
    badge: "Core Volume & Basics",
    description: "Premium jersey, pique, and fleece essentials.",
    heroIntro: "High-volume, vertically integrated knitwear manufacturing delivering exceptional softness, dimensional stability, and colorfastness.",
    longDescription:
      "As the cornerstone of Bangladesh's garment industry, our knitwear capabilities encompass fully integrated spinning, circular knitting, computer-controlled dyeing, and modern assembly. We achieve rigorous shrinkage control (under 5%) and consistent color matching under all retail light sources.",
    image: images.knit,
    serviceHash: "category-01",
    leadTime: "45-60 Days",
    moq: "2,000 pcs per color",
    productionCapacity: "3,500,000 pcs / month",
    products: [
      {
        name: "Classic Crewneck & V-Neck T-Shirts",
        detail: "Tubular and side-seam builds, 1×1 rib neck with twin-needle collar topstitch",
        badge: "Essential Base",
        specs: "140–200 GSM Single Jersey, 100% Combed Cotton & Organic BCI",
      },
      {
        name: "Heavyweight Boxy Tees",
        detail: "Thick bound 2.5cm rib collar, dropped shoulders, dense dry-hand vintage feel",
        badge: "Streetwear Trend",
        specs: "240–280 GSM Heavyweight Carded & Open-End Cotton",
      },
      {
        name: "Pique Polo Shirts",
        detail: "Flat-knit jacquard collars and cuffs, reinforced 3-button placket, side vents",
        badge: "Premium Casual",
        specs: "200–240 GSM Honeycomb Pique, 100% Cotton or CVC 60/40",
      },
      {
        name: "Pullover & Zip-Up Hoodies",
        detail: "Double-layered hood, kangaroo pocket, chunky herringbone drawcords, metal eyelets",
        badge: "Cold Weather",
        specs: "300–420 GSM Brushed Fleece or Unbrushed French Terry",
      },
      {
        name: "Sweatshirts & Crewnecks",
        detail: "V-insert neck detail, 2×2 rib cuffs and waistband with elastane recovery",
        badge: "Athletic Core",
        specs: "280–380 GSM Loopback French Terry & Fleece",
      },
      {
        name: "Joggers & Sweatpants",
        detail: "Elasticated ribbed waistband, concealed zipper pockets, custom branded tips",
        badge: "Loungewear",
        specs: "280–340 GSM Cotton/Poly Fleece with anti-pilling wash",
      },
      {
        name: "Leggings & Bike Shorts",
        detail: "High-rise seamless waistband, flatlock 4-needle stitching, squat-proof opacity",
        badge: "Activewear",
        specs: "220–260 GSM Cotton/Elastane (95/5, 92/8), Microfiber Poly/Spandex",
      },
      {
        name: "Tank Tops & Singlets",
        detail: "Self-fabric binding on neck and armholes, clean curved or straight hems",
        badge: "Summer Basics",
        specs: "150–180 GSM Rib 2×2 or Single Jersey, Combed Cotton",
      },
    ],
    fabrics: [
      "100% Combed Cotton",
      "Organic Cotton (GOTS Certified)",
      "BCI (Better Cotton Initiative)",
      "CVC (60/40, 80/20 Cotton/Poly)",
      "Modal & MicroModal",
      "TENCEL™ Lyocell",
      "Recycled Polyester (GRS)",
    ],
    constructions: ["Single Jersey", "Pique", "Interlock", "1×1 Rib", "2×2 Rib", "French Terry", "Loopback", "Brushed Fleece", "Waffle"],
    finishes: ["Bio-Polish / Silicone Softener", "Anti-Pilling Treatment", "Enzyme Wash", "Moisture Wicking", "Anti-Bacterial"],
    certifications: ["OEKO-TEX® Standard 100", "GOTS", "GRS", "BSCI", "Accord / RSC on Fire & Building Safety"],
  },
  {
    title: "Woven",
    slug: "woven",
    badge: "Tailored & Structured",
    description: "Precision-crafted shirts, trousers, and outerwear.",
    heroIntro: "Structured garments engineered for pattern precision, durability, and repeat-order fit consistency across global retail standards.",
    longDescription:
      "Our woven garment sourcing programmes run through dedicated manufacturing units equipped with CAD pattern grading, automated spreading, and precision cutting tables. From fine poplin business shirts to heavy canvas cargo utility wear, each piece undergoes stringent inline quality inspection and fusing testing.",
    image: images.woven,
    serviceHash: "category-02",
    leadTime: "60-90 Days",
    moq: "1,500 pcs per style / colorway",
    productionCapacity: "1,200,000 pcs / month",
    products: [
      {
        name: "Formal & Business Shirts",
        detail: "Single and double needle tailoring, fused interlining collars, French cuffs, taped seams",
        badge: "Core Programme",
        specs: "50s, 60s, 80s 2-ply cotton, Easy-iron & Wrinkle-free finishes",
      },
      {
        name: "Casual & Resort Shirts",
        detail: "Camp collars, oxford weaves, garment washed chambray, yarn-dyed checks and plaids",
        badge: "High Volume",
        specs: "100% Cotton, Linen, Cotton/Linen blends, Lyocell/Viscose",
      },
      {
        name: "Chinos & Casual Trousers",
        detail: "Clean front & pleat tailoring, curtain waistband, coin pocket detail, peached finish",
        badge: "Repeat Orders",
        specs: "Twill 240–320 GSM, Stretch Cotton/Elastane 98/2",
      },
      {
        name: "Cargo Pants & Utility Shorts",
        detail: "Articulated knees, gusset crotch, bellow cargo pockets, heavy-duty bar-tacks",
        badge: "Workwear/Streetwear",
        specs: "Ripstop, Canvas, Military-grade Cotton Twill",
      },
      {
        name: "Women's Blouses & Tunics",
        detail: "Concealed plackets, delicate pintucks, mother-of-pearl buttons, fluid drape",
        badge: "Fashion Range",
        specs: "TENCEL™, Rayon, Viscose, Modal, Light Cotton Voile",
      },
      {
        name: "Structured Dresses & Skirts",
        detail: "Shirred elasticated panels, bias cuts, lined skirts, matching fabric belts",
        badge: "Seasonal",
        specs: "Poplin, Seersucker, Dobby, Printed Viscose",
      },
      {
        name: "Overshirts & Shackets",
        detail: "Heavy chest patch pockets, custom horn/metal snaps, clean unlined interior seams",
        badge: "Autumn/Winter",
        specs: "Heavy Canvas, Brushed Cotton Flannel, Wool Blends",
      },
      {
        name: "Light Outerwear & Windbreakers",
        detail: "Storm flaps, water-repellent coating, mesh lining, internal security pockets",
        badge: "Outerwear",
        specs: "Coated Cotton Canvas, Nylon/Cotton, DWR Finishes",
      },
    ],
    fabrics: [
      "100% Combed Cotton",
      "Cotton / Elastane Stretch",
      "100% Pure Linen",
      "Linen / Cotton Blends",
      "TENCEL™ & Lyocell",
      "Rayon / Viscose",
      "Recycled Polyester Blends (GRS)",
    ],
    constructions: ["Poplin", "Oxford", "Twill", "Chambray", "Dobby", "Canvas", "Ripstop", "Corduroy", "Seersucker", "Flannel"],
    finishes: ["Peach Skin", "Enzyme Soft Wash", "Wrinkle-Resistant", "Easy Care", "Garment Dye", "Water-Repellent (DWR)"],
    certifications: ["OEKO-TEX® Standard 100", "BSCI", "WRAP", "SEDEX", "ISO 9001:2015"],
  },
  {
    title: "Denim",
    slug: "denim",
    badge: "Specialized Washes & Fits",
    description: "Innovative washes and rigid/stretch fabrications.",
    heroIntro: "Sustainable laundry engineering combined with robust 5-pocket denim tailoring for international retail brands.",
    longDescription:
      "We partner with environmentally progressive denim mills and laundries in Bangladesh equipped with Jeanologia laser etching, ozone fading chambers, and closed-loop water treatment. From raw selvedge rigid aesthetics to super-stretch comfort jeggings, every wash recipe is digitally archived for exact batch consistency.",
    image: images.denim,
    serviceHash: "category-04",
    leadTime: "60-75 Days",
    moq: "1,500 pcs per wash / style",
    productionCapacity: "900,000 pcs / month",
    products: [
      {
        name: "Men's 5-Pocket Classic Jeans",
        detail: "Straight, Slim, Tapered, and Relaxed fits; chain-stitch waistband and hem",
        badge: "Core Essential",
        specs: "11.5–13.5 oz Rigid & Comfort Stretch (99/1, 98/2 Cotton/Elastane)",
      },
      {
        name: "Women's Skinny & Flare Jeans",
        detail: "Contoured high-rise waistband, hold-and-sculpt recovery denim, clean back pockets",
        badge: "High Stretch",
        specs: "9.5–11.5 oz Super Stretch & Power Stretch (up to 45% elongation)",
      },
      {
        name: "Wide-Leg & Carpenter Denim",
        detail: "Hammer loop, utility ruler pocket, contrast triple-needle chain stitching",
        badge: "Street Trend",
        specs: "12–14 oz 100% Rigid Cotton Denim, Open-End & Ring Spun",
      },
      {
        name: "Denim Trucker Jackets",
        detail: "Button flap chest pockets, waist adjuster tabs, embossed shank buttons",
        badge: "Outerwear Staple",
        specs: "12.5–14 oz Denim, Vintage tint, stone wash & raw indigo",
      },
      {
        name: "Western & Denim Overshirts",
        detail: "Pointed western yokes, pearl snap fasteners, curved hemline",
        badge: "Shirting",
        specs: "6.5–8.5 oz Lightweight Denim & Indigo Chambray",
      },
      {
        name: "Denim Shorts & Cut-Offs",
        detail: "Frayed raw hem, hand sanding, laser whiskers, 3D whiskering at thighs",
        badge: "Summer Line",
        specs: "10–12 oz Comfort Stretch Denim with enzyme wash",
      },
      {
        name: "Denim Skirts & Pinafores",
        detail: "Front slit or button-down front, shank closures, copper rivets",
        badge: "Womenswear",
        specs: "11–13 oz Medium Shade Indigo Denim",
      },
      {
        name: "Dungarees & Overalls",
        detail: "Adjustable buckle straps, central bib pocket with division, reinforced seat",
        badge: "Utility Wear",
        specs: "11.5–13 oz Durable Cotton Denim",
      },
    ],
    fabrics: [
      "100% Cotton Rigid Denim",
      "Comfort Stretch (98/2 Cotton/Elastane)",
      "High & Super Stretch Denim",
      "Cotton / Hemp Blended Denim",
      "Recycled Cotton Denim (GRS)",
      "T400 / Dual-Core Performance Denim",
    ],
    constructions: ["3/1 Right Hand Twill", "Left Hand Twill", "Broken Twill", "Crosshatch Weave", "Bull Denim"],
    finishes: ["Raw / Rinse", "Stone Wash", "Enzyme Soft Wash", "Laser Whiskering & Fading", "Ozone Eco-Bleach", "Hand Distress & Repair", "Tinting & Overdye"],
    certifications: ["BSCI", "OEKO-TEX® Standard 100", "ZDHC Level 3 Aligned", "SEDEX"],
  },
  {
    title: "Sweater",
    slug: "sweater",
    badge: "Flat-Knit: 3GG to 14GG",
    description: "Fine gauge to heavy cable-knit pullovers and cardigans.",
    heroIntro: "From ultra-fine 14GG summer merino to heavy 3GG winter cable knits on state-of-the-art computerised flat-knitting machines.",
    longDescription:
      "Sweater production requires meticulous planning of yarn dyeing, knitting, and panel-by-panel linking. Our partner facilities operate Shima Seiki and Stoll computerised flat-knitting machines capable of intricate jacquards, structure cables, intarsia, and fully fashioned clean linked edges.",
    image: images.sweater,
    serviceHash: "category-03",
    leadTime: "75-90 Days",
    moq: "1,200 pcs per style",
    productionCapacity: "650,000 pcs / month",
    products: [
      {
        name: "Crewneck & V-Neck Pullovers",
        detail: "Fully fashioned armholes, tubular linked neck trim, 1×1 rib cuffs and hem",
        badge: "Classic Wardrobe",
        specs: "12GG & 14GG Fine Gauge, 100% Combed Cotton, Cotton/Acrylic 50/50",
      },
      {
        name: "Chunky Cable-Knit Sweaters",
        detail: "Traditional Aran and rope cable structures, ribbed crew neckline, heavy warm hand",
        badge: "Winter Warmth",
        specs: "3GG & 5GG Chunky Knit, Lambswool Blend, Acrylic Wool-touch",
      },
      {
        name: "Button-Through Cardigans",
        detail: "Engineered rib placket, horn or tortoiseshell buttons, welt front pockets",
        badge: "Layering Essential",
        specs: "7GG & 9GG Mid-weight, Cotton/Viscose or Wool Blend",
      },
      {
        name: "Quarter-Zip & Full-Zip Sweaters",
        detail: "Nylon coil or antique metal zipper, funnel collar, ribbed side panels",
        badge: "Smart Casual",
        specs: "7GG & 12GG Ottoman & Rib Structures",
      },
      {
        name: "Rollneck & Turtleneck Sweaters",
        detail: "Foldover ribbed collar with gentle neck recovery, tailored shoulder line",
        badge: "Sleek Layer",
        specs: "12GG Fine Gauge Merino Wool blend or Cotton",
      },
      {
        name: "Sleeveless Knitted Vests",
        detail: "Preppy deep V-neck, contrast tipping bands at collar and armhole hems",
        badge: "Modern Trend",
        specs: "7GG & 12GG 100% Cotton Knitted Vest",
      },
      {
        name: "Knitted Beanies & Winter Scarves",
        detail: "Matching winter set capability, ribbed foldover cuff, jacquard pattern options",
        badge: "Accessories",
        specs: "5GG & 7GG Acrylic, Wool, and Recycled Poly yarns",
      },
    ],
    fabrics: [
      "100% Combed Cotton",
      "Cotton / Acrylic (50/50, 60/40)",
      "100% Acrylic (Cashmere-like Hand)",
      "Lambswool / Nylon Blends",
      "Merino Wool Blends (RWS on request)",
      "Recycled Acrylic & Poly Yarns",
    ],
    constructions: ["3GG", "5GG", "7GG", "9GG", "12GG", "14GG", "Cable", "Intarsia", "Jacquard", "Pointelle", "Links-Links", "Milano Rib"],
    finishes: ["Soft Wool Wash", "Silicone Hand Enhancer", "Anti-Pilling Finish", "Hand Linking"],
    certifications: ["BSCI", "SMETA / SEDEX", "OEKO-TEX® Standard 100", "Responsible Wool Standard (RWS)"],
  },
  {
    title: "Various Items",
    slug: "various-items",
    badge: "Accessories & Diversified",
    description: "Caps, berets, socks, gloves, bags, handicrafts, and home textiles.",
    heroIntro: "Diverse apparel accessory programmes, headwear, bags, socks, and specialized promotional merchandise.",
    longDescription:
      "Beyond core apparel, our dedicated accessory supply units provide headwear, footwear accessories, and eco-friendly tote packaging. These programmes are structured to ship alongside your primary garment shipments, saving consolidated freight costs and maintaining unified brand trims.",
    image: images.various,
    serviceHash: "category-05",
    leadTime: "45-60 Days",
    moq: "1,500 pcs per style",
    productionCapacity: "1,500,000 pcs / month",
    products: [
      {
        name: "6-Panel Baseball Caps & Dad Hats",
        detail: "Structured or unstructured crowns, pre-curved visor, 3D puff embroidery, brass strap buckle",
        badge: "Headwear Essential",
        specs: "100% Cotton Chino Twill, Heavy Brushed Cotton, 280–320 GSM",
      },
      {
        name: "Bucket Hats & Sun Hats",
        detail: "Stitched brim, interior cotton sweatband, embroidered ventilation eyelets",
        badge: "Summer Range",
        specs: "Cotton Canvas, Ripstop, Washed Twill",
      },
      {
        name: "Crew & Athletic Cushion Socks",
        detail: "Jacquard logo knitting, arch support compression ribbing, cushioned terry sole",
        badge: "Everyday Core",
        specs: "Combed Cotton / Polyamide / Elastane (80/17/3)",
      },
      {
        name: "Canvas Tote & Shopping Bags",
        detail: "Reinforced cross-stitched handles, internal zippered pocket, screen or digital print",
        badge: "Eco Packaging",
        specs: "8 oz, 10 oz, 12 oz Natural Cotton Canvas & Jute Blends",
      },
      {
        name: "Aprons & Kitchen Workwear",
        detail: "Adjustable neck straps, divided center kangaroo pocket, reinforced utility loops",
        badge: "Hospitality & Retail",
        specs: "Heavy Cotton Canvas, Poly/Cotton Twill 240–300 GSM",
      },
      {
        name: "Winter Gloves & Touchscreen Mittens",
        detail: "Conductive yarn on index and thumb fingertips, ribbed elastic wrist cuff",
        badge: "Cold Accessories",
        specs: "Knitted Acrylic, Fleece lined, Wool blends",
      },
      {
        name: "Traditional Jute & Handicraft Goods",
        detail: "Hand-braided natural fiber baskets, table runners, and artisanal eco-packaging",
        badge: "Heritage Crafts",
        specs: "100% Natural Golden Jute, Seagrass, Handloom Cotton",
      },
    ],
    fabrics: [
      "Heavy Cotton Canvas (8 oz - 16 oz)",
      "Chino & Brushed Cotton Twill",
      "Combed Cotton Hosiery Yarn",
      "Natural Eco Jute & Hessian",
      "Polar Fleece & Microfleece",
    ],
    constructions: ["Woven Canvas", "Circular Sock Knit (144N / 168N / 200N)", "6-Panel Headwear Assembly", "Handcrafted Weaving"],
    finishes: ["Screen Printing", "3D Puff Embroidery", "Heat Transfer", "Water Repellent Coating"],
    certifications: ["OEKO-TEX® Standard 100", "BSCI", "SEDEX"],
  },
];

export function getCategoryBySlug(slug: string): CategoryData | undefined {
  return categoriesCatalog.find((c) => c.slug.toLowerCase() === slug.toLowerCase());
}
