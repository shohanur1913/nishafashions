import mysql from "mysql2/promise";
import bcrypt from "bcryptjs";
import { initialCategories } from "@/lib/seed-data";

// Create MySQL connection pool
const pool = mysql.createPool({
  host: process.env.DB_HOST || "127.0.0.1",
  port: Number(process.env.DB_PORT) || 3306,
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_NAME || "nishafashions",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

let isInitialized = false;

/**
 * Initialize database tables and seed with current website content
 */
export async function getDb() {
  if (!isInitialized) {
    await initAndSeedDb();
    isInitialized = true;
  }
  return pool;
}

export async function query<T = any>(sql: string, params: any[] = []): Promise<T> {
  const db = await getDb();
  const [rows] = await db.query(sql, params);
  return rows as T;
}

export async function execute(sql: string, params: any[] = []) {
  const db = await getDb();
  const [result] = await db.execute(sql, params);
  return result;
}

async function initAndSeedDb() {
  const conn = pool;

  // 1. Admin Users Table
  await conn.query(`
    CREATE TABLE IF NOT EXISTS admin_users (
      id INT AUTO_INCREMENT PRIMARY KEY,
      email VARCHAR(191) NOT NULL UNIQUE,
      password_hash VARCHAR(255) NOT NULL,
      name VARCHAR(191) NOT NULL DEFAULT 'Administrator',
      role VARCHAR(50) NOT NULL DEFAULT 'admin',
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
  `);

  // 2. Site Settings Table
  await conn.query(`
    CREATE TABLE IF NOT EXISTS site_settings (
      id INT AUTO_INCREMENT PRIMARY KEY,
      setting_key VARCHAR(191) NOT NULL UNIQUE,
      setting_value LONGTEXT,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
  `);

  // 3. Pages Table (WordPress-like page builder/editor)
  await conn.query(`
    CREATE TABLE IF NOT EXISTS pages (
      id INT AUTO_INCREMENT PRIMARY KEY,
      slug VARCHAR(191) NOT NULL UNIQUE,
      title VARCHAR(255) NOT NULL,
      subtitle VARCHAR(255) DEFAULT '',
      content_json LONGTEXT,
      seo_title VARCHAR(255) DEFAULT '',
      seo_description TEXT,
      is_published BOOLEAN DEFAULT TRUE,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
  `);

  // 4. Categories Table
  await conn.query(`
    CREATE TABLE IF NOT EXISTS categories (
      id INT AUTO_INCREMENT PRIMARY KEY,
      slug VARCHAR(191) NOT NULL UNIQUE,
      title VARCHAR(191) NOT NULL,
      badge VARCHAR(191) DEFAULT '',
      description TEXT,
      hero_intro TEXT,
      long_description LONGTEXT,
      image_src VARCHAR(500) DEFAULT '',
      image_alt VARCHAR(255) DEFAULT '',
      lead_time VARCHAR(100) DEFAULT '',
      moq VARCHAR(100) DEFAULT '',
      production_capacity VARCHAR(100) DEFAULT '',
      fabrics_json LONGTEXT,
      constructions_json LONGTEXT,
      finishes_json LONGTEXT,
      certifications_json LONGTEXT,
      sort_order INT DEFAULT 0,
      is_published BOOLEAN DEFAULT TRUE,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
  `);

  // 5. Products Table
  await conn.query(`
    CREATE TABLE IF NOT EXISTS products (
      id INT AUTO_INCREMENT PRIMARY KEY,
      category_slug VARCHAR(191) NOT NULL,
      name VARCHAR(255) NOT NULL,
      detail TEXT,
      badge VARCHAR(100) DEFAULT '',
      specs TEXT,
      image_src VARCHAR(500) DEFAULT '',
      is_featured BOOLEAN DEFAULT FALSE,
      is_hot_deal BOOLEAN DEFAULT FALSE,
      offer_price VARCHAR(100) DEFAULT '',
      original_price VARCHAR(100) DEFAULT '',
      deal_badge VARCHAR(100) DEFAULT '',
      is_published BOOLEAN DEFAULT TRUE,
      sort_order INT DEFAULT 0,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      INDEX idx_category (category_slug)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
  `);

  // Ensure new columns exist on existing databases
  try { await conn.query(`ALTER TABLE products ADD COLUMN is_hot_deal BOOLEAN DEFAULT FALSE`); } catch {}
  try { await conn.query(`ALTER TABLE products ADD COLUMN offer_price VARCHAR(100) DEFAULT ''`); } catch {}
  try { await conn.query(`ALTER TABLE products ADD COLUMN original_price VARCHAR(100) DEFAULT ''`); } catch {}
  try { await conn.query(`ALTER TABLE products ADD COLUMN deal_badge VARCHAR(100) DEFAULT ''`); } catch {}

  // 6. Enquiries Table (RFQs and Contact Messages)
  await conn.query(`
    CREATE TABLE IF NOT EXISTS enquiries (
      id INT AUTO_INCREMENT PRIMARY KEY,
      type VARCHAR(50) NOT NULL DEFAULT 'rfq',
      name VARCHAR(191) NOT NULL,
      company VARCHAR(191) DEFAULT '',
      email VARCHAR(191) NOT NULL,
      phone VARCHAR(100) DEFAULT '',
      country VARCHAR(100) DEFAULT '',
      category VARCHAR(100) DEFAULT '',
      quantity VARCHAR(100) DEFAULT '',
      message LONGTEXT,
      details_json LONGTEXT,
      status VARCHAR(50) NOT NULL DEFAULT 'new',
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      INDEX idx_status (status)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
  `);

  // 7. Media Library Table
  await conn.query(`
    CREATE TABLE IF NOT EXISTS media (
      id INT AUTO_INCREMENT PRIMARY KEY,
      filename VARCHAR(255) NOT NULL,
      file_path VARCHAR(500) NOT NULL,
      file_url VARCHAR(500) NOT NULL,
      mime_type VARCHAR(100) DEFAULT '',
      file_size INT DEFAULT 0,
      alt_text VARCHAR(255) DEFAULT '',
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
  `);

  // 8. Enquiry Email Replies Table
  await conn.query(`
    CREATE TABLE IF NOT EXISTS enquiry_replies (
      id INT AUTO_INCREMENT PRIMARY KEY,
      enquiry_id INT NOT NULL,
      to_email VARCHAR(191) NOT NULL,
      subject VARCHAR(255) NOT NULL,
      message LONGTEXT NOT NULL,
      sender_name VARCHAR(191) DEFAULT 'Admin',
      sent_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      INDEX idx_enquiry_id (enquiry_id)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
  `);

  // --- SEED INITIAL DATA IF EMPTY ---

  // A. Admin user seed
  const [adminUsers]: any = await conn.query(`SELECT COUNT(*) as count FROM admin_users`);
  if (adminUsers[0].count === 0) {
    const defaultEmail = process.env.ADMIN_DEFAULT_EMAIL || "admin@nishafashions.com";
    const defaultPassword = process.env.ADMIN_DEFAULT_PASSWORD || "admin123";
    const hash = await bcrypt.hash(defaultPassword, 10);
    await conn.query(
      `INSERT INTO admin_users (email, password_hash, name, role) VALUES (?, ?, ?, ?)`,
      [defaultEmail, hash, "Super Admin", "admin"]
    );
  }

  // B. Site settings seed
  const [settingsCount]: any = await conn.query(`SELECT COUNT(*) as count FROM site_settings`);
  if (settingsCount[0].count === 0) {
    const initialSettings: Record<string, string> = {
      site_name: "Nisha Fashions Wear",
      short_name: "NFW",
      tagline: "Bangladesh Apparel Supplier & Sourcing Partner",
      brand_color: "#E94D65",
      theme_color: "#E94D65",
      experience: "20+ years of garment business experience",
      site_url: "https://www.nishafashions.com",
      display_url: "www.nishafashions.com",
      contact_email: "info@nishafashions.com",
      phone_display: "+88 01715 645766",
      phone_e164: "+8801715645766",
      whatsapp: "+8801715645766",
      address_street: "92, Moneswar Road, Zigatola",
      address_locality: "Dhaka",
      address_postal: "1209",
      address_country: "BD",
      merchandiser_email: "nazib@nishafashions.com",
      alt_email: "nisha.fashions@gmail.com",
      main_nav_json: JSON.stringify([
        { label: "About", href: "/about" },
        { label: "Products", href: "/products" },
        { label: "Services", href: "/services" },
        { label: "Awards", href: "/awards" },
        { label: "Contact", href: "/contact" },
      ]),
      header_logo_url: "https://www.nishafashions.com/wp-content/uploads/2022/11/nfw_logo3.jpg",
      whatsapp_message: "Hello, I am interested in sourcing apparel from Nisha Fashions Wear. I would like to discuss my requirements.",
      notice_enabled: "true",
      notice_text: "🚧 Website Maintenance: We are currently upgrading our website. If you encounter any temporary issues, please bear with us.",
      notice_mode: "auto",
      notice_position: "top",
      notice_variant: "amber",
      notice_link: "/contact",
      notice_link_text: "Contact Support",
      notice_speed: "normal",
    };

    for (const [key, value] of Object.entries(initialSettings)) {
      await conn.query(`INSERT INTO site_settings (setting_key, setting_value) VALUES (?, ?)`, [key, value]);
    }
  }

  // C. Categories & Products seed
  const [categoriesCount]: any = await conn.query(`SELECT COUNT(*) as count FROM categories`);
  if (categoriesCount[0].count === 0) {
    let order = 0;
    for (const cat of initialCategories) {
      await conn.query(
        `INSERT INTO categories 
         (slug, title, badge, description, hero_intro, long_description, image_src, image_alt, lead_time, moq, production_capacity, fabrics_json, constructions_json, finishes_json, certifications_json, sort_order) 
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          cat.slug,
          cat.title,
          cat.badge,
          cat.description,
          cat.heroIntro,
          cat.longDescription,
          cat.imageSrc,
          cat.imageAlt,
          cat.leadTime,
          cat.moq,
          cat.productionCapacity,
          JSON.stringify(cat.fabrics),
          JSON.stringify(cat.constructions),
          JSON.stringify(cat.finishes),
          JSON.stringify(cat.certifications),
          order++,
        ]
      );

      // Seed products for this category
      let pOrder = 0;
      for (const prod of cat.products) {
        await conn.query(
          `INSERT INTO products 
           (category_slug, name, detail, badge, specs, image_src, is_featured, sort_order) 
           VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
          [
            cat.slug,
            prod.name,
            prod.detail,
            prod.badge || "",
            prod.specs || "",
            cat.imageSrc,
            pOrder < 2, // first 2 are featured
            pOrder++,
          ]
        );
      }
    }
  }

  // D. Pages seed (WordPress-like customizer content)
  const [pagesCount]: any = await conn.query(`SELECT COUNT(*) as count FROM pages`);
  if (pagesCount[0].count === 0) {
    // 1. Homepage
    const homeContent = {
      hero: {
        headline: "Bangladesh Apparel Manufacturer, Supplier & Sourcing Partner",
        subheadline: "Proven Experience. Modern Apparel Solutions.",
        description: "Nisha Fashions Wear manages flexible garment production through a trusted network of partner factories, supplying quality Knit, Woven, Denim and Sweater apparel for international buyers.",
        ctaQuoteText: "Get a Quote",
        ctaQuoteLink: "/contact",
        ctaWhatsappText: "WhatsApp Us",
        ctaWhatsappNumber: "+8801715645766",
        backgroundImage: "/images/hero-apparel.png",
      },
      aboutTeaser: {
        badge: "Our Philosophy",
        title: "Beyond Manufacturing.",
        leadText: "At Nisha Fashions Wear, we operate as a Manufacturer, Production Management, Sourcing, and Export Partner. Backed by 20+ years of garment business experience, we receive orders under our company name and manage your complete production lifecycle.",
        bodyText: "We execute orders through a trusted network of partner factories, carefully matching your specific product requirements with the facility best equipped to handle them—vetting for capability, compliance, and capacity.",
        highlightText: "By closely supervising sourcing, merchandising, quality control, and final export coordination, we ensure a supply chain built for resilience, precision, and uncompromised quality.",
        buttonText: "Read Our Full Story",
        buttonLink: "/about",
      },
      trustBadges: [
        { label: "20+ Years Experience", desc: "Apparel manufacturing & export expertise" },
        { label: "100% On-Time Delivery", desc: "Strict critical path milestone management" },
        { label: "AQL 2.5 Standard", desc: "Rigorous inline & final quality assurance" },
        { label: "Global Compliance", desc: "BSCI, WRAP, SEDEX, OEKO-TEX partner mills" },
      ],
      twelveStages: [
        { num: "01", title: "Yarn and knitting", description: "Mill production before cutting", image: "/images/stage-yarn.png" },
        { num: "02", title: "Fabric and shade", description: "Lab dips and shade bands approved", image: "/images/stage-fabric.png" },
        { num: "03", title: "Cutting", description: "Panels cut, bundled and issued", image: "/images/stage-cutting.png" },
        { num: "04", title: "Sewing floor", description: "Bulk production across allocated lines", image: "/images/stage-sewing.png" },
        { num: "05", title: "Assembly", description: "Sewn to the approved sample", image: "/images/stage-assembly.png" },
        { num: "06", title: "Embroidery", description: "Placement and sew-out approval", image: "/images/stage-embroidery.png" },
        { num: "07", title: "Printing", description: "Strike-off through to bulk", image: "/images/stage-printing.png" },
        { num: "08", title: "Trims and labels", description: "Buttons, labels and accessories", image: "/images/stage-trims.png" },
        { num: "09", title: "Quality control", description: "Inline checks and final inspection", image: "/images/stage-qc.png" },
        { num: "10", title: "Packing", description: "Cartons marked, counted and staged", image: "/images/stage-packing.png" },
        { num: "11", title: "Despatch", description: "Ex-factory to the port", image: "/images/stage-despatch.png" },
        { num: "12", title: "Shipment", description: "Documents issued on departure", image: "/images/stage-shipment.png" },
      ],
    };

    await conn.query(
      `INSERT INTO pages (slug, title, subtitle, content_json, seo_title, seo_description) VALUES (?, ?, ?, ?, ?, ?)`,
      [
        "home",
        "Homepage",
        "Front page sections, hero banners, stages & philosophy teaser",
        JSON.stringify(homeContent),
        "Bangladesh Apparel Manufacturer & Supplier | Nisha Fashions Wear",
        "Nisha Fashions Wear is a Bangladesh apparel manufacturer, supplier and sourcing partner for Knit, Woven, Denim and Sweater garments, serving international buyers.",
      ]
    );

    // 2. About page
    const aboutContent = {
      hero: {
        title: "Our Story.",
        description: "Nisha Fashions Wear is a dedicated apparel production management and sourcing partner, backed by over 20 years of garment business experience serving the Europe, Canada, and USA markets.",
      },
      philosophy: {
        badge: "Corporate Philosophy",
        lead: "From the very beginning, our corporate philosophy has been based on these four principles:",
        principles: [
          "To steadily continue to develop in line with market needs.",
          "To respond flexibly to the demands set by the textile industry.",
          "To supply low-cost articles of the highest quality.",
          "To make the customers satisfaction with Good Quality and Timely Shipment.",
        ],
        body: "We specialize in managing the production of Knitwear, Woven, Denim, and Sweater items. Through our trusted partner factory network, we ensure the highest quality manufacturing for all categories, from essential t-shirts and polo shirts to complex jackets, trousers, and sweaters.",
      },
      missionGoal: {
        mission: "Our mission is to deliver top-quality garments through a reliable production network that models fair business practices and strictly respects workers' rights.",
        goal: "To firmly establish Nisha Fashions Wear as a premier export partner capable of handling complete garment manufacturing packages. We provide multi-style options, rigorous quality control, and on-time delivery at competitive prices.",
        objective: "Deliver scalable production capacity and timely shipments for international markets including Europe, Canada, and the U.S.",
      },
      workplace: [
        "We ensure that our partner factories maintain a congenial work environment, increasing efficiency and motivating personnel to deliver their best.",
        "Our selected production facilities feature proper electrical installations, adequate ventilation, and generous spacing, ensuring comfortable and safe working conditions. Strict fire safety measures and hygienic amenities are always maintained across our production network.",
        "We enforce a strict zero-tolerance policy for underage labor. All personnel within our partner factories are compensated according to law with transparent employment contracts.",
        "Our partner facilities employ professional medical staff to attend to any health emergencies and ensure continuous worker well-being.",
      ],
      humanResources: "Our trusted network of partner factories employs highly qualified personnel skilled in the creation of premium Knitwear, Woven, Denim, and Sweater garments. From specialized cutting departments to expert sewing teams, we coordinate with experienced professionals to ensure precise manufacturing and exceptional finishing.",
      qualityPolicy: {
        para1: "Every stage of our production management is driven by a commitment to uncompromised quality. We believe that each successful shipment should serve as a recommendation for future business.",
        para2: "Our dedicated sourcing and quality assurance teams provide fast, flexible, and responsive solutions tailored to our buyers' needs. By meticulously overseeing factory allocation, production, and final export, we ensure our clients receive exceptional products that make them more competitive in the global market.",
      },
      bankingPartner: {
        bankName: "Premier Bank Ltd.",
        branch: "Dhanmondi Branch",
        address: "House # 84 (1st Floor), Road # 7/A",
        swift: "PRMRBDDH",
        tel: "9143081, 8124746, 9145186",
        fax: "+880-2-9112395",
        email: "prebank@bangla.net",
        logoUrl: "/images/premier-bank-logo.png",
      },
    };

    await conn.query(
      `INSERT INTO pages (slug, title, subtitle, content_json, seo_title, seo_description) VALUES (?, ?, ?, ?, ?, ?)`,
      [
        "about",
        "About Us",
        "Our story, corporate philosophy, workplace standards & banking details",
        JSON.stringify(aboutContent),
        "About Us | Bangladesh Apparel Production Management | Nisha Fashions Wear",
        "Learn about Nisha Fashions Wear, our 20+ years of garment sourcing experience, corporate philosophy, and strict quality control standards.",
      ]
    );

    // 3. Services page
    const servicesContent = {
      hero: {
        badge: "Services & Operations",
        title: "Products & Sourcing Services",
        description: "Five manufacturing divisions and full end-to-end supply chain execution managed on the ground in Dhaka.",
      },
      disciplines: [
        { step: "01", title: "Factory Sourcing", desc: "Allocating vetted units by product technicality, target price, and compliance." },
        { step: "02", title: "Pattern & Sampling", desc: "CAD 2D/3D grading, physical proto samples, and fit approvals before bulk." },
        { step: "03", title: "Fabric Procurement", desc: "Lab dips, strike-offs, yarn dyed checks, and custom trim approvals." },
        { step: "04", title: "Open-Book Costing", desc: "Itemized costing covering fabric yield, trims, CM, wash, and freight." },
        { step: "05", title: "TNA Merchandising", desc: "Weekly critical-path monitoring to maintain on-time milestone delivery." },
        { step: "06", title: "Inline & Final QA", desc: "On-site technical teams executing inline audits and AQL 2.5 final inspections." },
        { step: "07", title: "Social Compliance", desc: "Continuous facility auditing for BSCI, SEDEX, OEKO-TEX, and GOTS standards." },
        { step: "08", title: "Packing & Barcoding", desc: "Ratio packing, barcode verification, polybags, and GS1 carton marking." },
        { step: "09", title: "Export Logistics", desc: "Container stuffing supervision, sea/air booking, and customs documentation." },
      ],
    };

    await conn.query(
      `INSERT INTO pages (slug, title, subtitle, content_json, seo_title, seo_description) VALUES (?, ?, ?, ?, ?, ?)`,
      [
        "services",
        "Services & Disciplines",
        "Capabilities, 9 operational disciplines & sourcing scope",
        JSON.stringify(servicesContent),
        "Apparel Sourcing Services & Disciplines | Nisha Fashions Wear",
        "End-to-end apparel production management in Bangladesh: pattern grading, fabric procurement, inline inspections, and export logistics.",
      ]
    );

    // 4. Awards page
    const awardsContent = {
      hero: {
        title: "Certifications & Awards.",
        description: "Our partner factories are awarded the highest international compliance and ethical standards. Quality and safety are the foundation of our manufacturing process.",
      },
      awardsList: [
        "SCS Certificate",
        "Certificate of Compliance (WRAP)",
        "Wal-Mart Ethical Standard",
        "Walt Disney",
        "Sears",
        "Macys",
        "Target",
        "Tesco",
        "BSCI",
        "Workplace Conditions Assessment (WCA)",
        "Accord",
      ],
    };

    await conn.query(
      `INSERT INTO pages (slug, title, subtitle, content_json, seo_title, seo_description) VALUES (?, ?, ?, ?, ?, ?)`,
      [
        "awards",
        "Awards & Certifications",
        "Compliance certificates, ethical audit accreditations & buyer standards",
        JSON.stringify(awardsContent),
        "Certifications & Awards | Nisha Fashions Wear",
        "Explore international compliance certificates awarded to our partner facilities including BSCI, WRAP, SEDEX, and brand audits.",
      ]
    );

    // 5. Contact page
    const contactContent = {
      hero: {
        badge: "Direct Sourcing Desk",
        title: "Start your next production run with confidence.",
        description: "Direct communication with senior garment merchandisers in Dhaka. Indicative FOB costings and sampling schedules returned within 48 hours.",
      },
      inboxes: [
        { label: "General & RFQ Inquiries", email: "info@nishafashions.com" },
        { label: "Senior Merchandiser Desk", email: "nazib@nishafashions.com" },
        { label: "Alternative Desk", email: "nisha.fashions@gmail.com" },
      ],
      office: {
        address: "92, Moneswar Road, Zigatola, Dhaka-1209, Bangladesh.",
        description: "Our sampling studio, pattern block library, and merchandising headquarters are located here. International buyer visits arranged upon request.",
      },
    };

    await conn.query(
      `INSERT INTO pages (slug, title, subtitle, content_json, seo_title, seo_description) VALUES (?, ?, ?, ?, ?, ?)`,
      [
        "contact",
        "Contact & Sourcing Desk",
        "Direct email inboxes, WhatsApp support line & headquarters details",
        JSON.stringify(contactContent),
        "Contact Sourcing Desk | Nisha Fashions Wear",
        "Get in touch directly with our senior garment merchandisers in Dhaka for FOB costing, fabric development, and production booking.",
      ]
    );

    // 6. Privacy Policy
    await conn.query(
      `INSERT INTO pages (slug, title, subtitle, content_json, seo_title, seo_description, is_published) VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [
        "privacy-policy",
        "Privacy Policy",
        "Data protection, client confidentiality & tech pack safeguards",
        JSON.stringify({
          hero: {
            badge: "Legal & Compliance",
            title: "Privacy Policy",
            description: "How Nisha Fashions Wear collects, safeguards, and processes commercial buyer data, technical garment specs, and international communications.",
            backgroundImage: "/images/hero-apparel.png"
          },
          lastUpdated: "October 2026",
          sections: [
            {
              id: "intro",
              title: "1. Corporate Commitment & Data Controller",
              content: "Nisha Fashions Wear (\"NFW\", \"we\", \"us\", or \"our\"), operating as an apparel manufacturer, sourcing and production management entity headquartered at 92 Moneswar Road, Zigatola, Dhaka-1209, Bangladesh, is dedicated to protecting the commercial privacy and proprietary data of international apparel buyers, retail brands, and sourcing partners.",
              bullets: [
                "We handle commercial information with strict confidentiality under international business standards.",
                "Your proprietary technical specifications, tech packs, and brand artworks are never shared with unauthorized third parties.",
                "We comply with applicable global data protection principles including GDPR guidelines for European clients."
              ]
            },
            {
              id: "information-collected",
              title: "2. Information We Collect",
              content: "In our role as an apparel manufacturing and export partner, we collect necessary business-to-business information to provide accurate FOB costing, sample production, critical path tracking, and export delivery.",
              bullets: [
                "Buyer Contact Details: Name, corporate email address, telephone numbers, company name, website, and delivery jurisdictions.",
                "Technical Apparel Assets: Tech packs, specification sheets, CAD patterns, grading scales, bill of materials (BOM), lab dip targets, and artwork files.",
                "Commercial & Financial Information: Purchase order quantities, target FOB prices, Letter of Credit (L/C) issuing bank details, and shipping terms (Incoterms).",
                "Website Technical Data: Browser types, IP addresses, and anonymized analytics collected during visits to nishafashions.com."
              ]
            },
            {
              id: "tech-pack-nda",
              title: "3. Non-Disclosure & Tech Pack Protection",
              content: "We recognize that garment designs, proprietary fabric blends, and styling details constitute confidential intellectual property. All tech packs and sample prototypes submitted to Nisha Fashions Wear are governed by automatic non-disclosure protections.",
              bullets: [
                "Technical files are disclosed strictly to allocated partner factories under signed non-disclosure agreements solely for manufacturing execution.",
                "We never showcase your customized designs or branded production runs in public marketing without explicit written consent.",
                "Physical fit samples and leftover trim inventory are strictly controlled within our sampling studio."
              ]
            },
            {
              id: "use-of-data",
              title: "4. How We Utilize Your Information",
              content: "We process collected commercial data exclusively for legitimate apparel trade operations and customer service fulfillment.",
              bullets: [
                "Preparing 48-hour indicative and finalized FOB garment costings.",
                "Managing pattern grading, sampling revisions, and bulk production time-and-action (TNA) schedules.",
                "Coordinating raw material sourcing (yarn, fabric, trims, polybags, cartons) with verified supply partners.",
                "Executing customs documentation, bill of lading (B/L) processing, and international freight clearances."
              ]
            },
            {
              id: "data-security",
              title: "5. Data Retention & Infrastructure Security",
              content: "We maintain administrative, technical, and physical safeguards designed to protect commercial information against accidental destruction, unauthorized disclosure, or illicit access. Data is stored on secure servers with restricted personnel authorization.",
              bullets: [
                "Commercial records and purchase order documentation are retained as required by Bangladesh export law and international trade record-keeping standards.",
                "Digital assets are archived under encrypted cloud storage protocols.",
                "Clients may request the deletion or purging of non-essential correspondence upon contract conclusion."
              ]
            },
            {
              id: "contact-officer",
              title: "6. Contacting Our Data & Privacy Desk",
              content: "If you have questions regarding our privacy practices, technical data handling, or wish to execute a formal bilateral Non-Disclosure Agreement (NDA), please reach out directly to our management desk.",
              bullets: [
                "Official Email: info@nishafashions.com",
                "Headquarters: 92, Moneswar Road, Zigatola, Dhaka-1209, Bangladesh",
                "Direct Merchandising Hotline: +880 1715 645766"
              ]
            }
          ]
        }),
        "Privacy Policy | Nisha Fashions Wear",
        "Review the privacy and confidentiality policies of Nisha Fashions Wear regarding international buyer data and tech pack protection.",
        true
      ]
    );

    // 7. Terms of Service
    await conn.query(
      `INSERT INTO pages (slug, title, subtitle, content_json, seo_title, seo_description, is_published) VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [
        "terms-of-service",
        "Terms of Service",
        "Commercial terms, sampling rules, payment methods & export execution",
        JSON.stringify({
          hero: {
            badge: "Commercial Terms & Conditions",
            title: "Terms of Service",
            description: "Commercial governance, purchase orders, sampling workflows, quality control tolerances, and international export execution.",
            backgroundImage: "/images/hero-apparel.png"
          },
          lastUpdated: "October 2026",
          sections: [
            {
              id: "scope",
              title: "1. Scope & Acceptance of Commercial Terms",
              content: "These Terms of Service govern all business-to-business garment manufacturing, sourcing, sampling, and export services provided by Nisha Fashions Wear (\"NFW\") to international clothing brands, importers, wholesalers, and retail buyers.",
              bullets: [
                "Any quotation accepted, tech pack submitted, or Purchase Order (PO) issued confirms the buyer's agreement to these terms.",
                "Any tailored Master Sourcing Agreement or bespoke buyer contract executed in writing supersedes conflicting clauses herein."
              ]
            },
            {
              id: "quotations",
              title: "2. Inquiries & Price Quotations",
              content: "Indicative quotations are returned within 24–48 hours based on the buyer's initial tech pack, fabric specifications, order volume, and destination requirements.",
              bullets: [
                "Standard pricing is quoted in United States Dollars (USD) or Euros (EUR) on an FOB Chittagong basis unless CFR, CIF, or DDP terms are explicitly contracted.",
                "Quotations remain valid for 30 calendar days due to yarn, fabric, and raw material market fluctuations in Bangladesh.",
                "Final FOB costs are re-confirmed upon physical proto sample approval and consumption audit."
              ]
            },
            {
              id: "sampling",
              title: "3. Sampling & Technical Development",
              content: "Sampling is a critical phase in our end-to-end production management. We operate dedicated pattern blocks and sampling facilities to ensure perfect fit before committing fabric mills to bulk production.",
              bullets: [
                "Proto / Fit Samples: Developed within 7–12 business days following lab dip and tech pack approval.",
                "Sampling Fees: Initial proto development fees are credited against bulk production invoice upon confirmed PO.",
                "Courier & Express Freight: International courier charges (DHL / FedEx) for physical samples are borne by the buyer unless agreed otherwise."
              ]
            },
            {
              id: "payment-terms",
              title: "4. Purchase Orders & Payment Terms",
              content: "Production commences strictly upon receipt of formal commercial payment instruments through our authorized dealer bank account.",
              bullets: [
                "Primary Payment Method: 100% Irrevocable Letter of Credit (L/C) at sight confirmed by an international tier-1 bank.",
                "Alternative Payment Method: 30% to 50% Telegraphic Transfer (T/T) deposit with balance payable against Bill of Lading (B/L) copy upon final inspection.",
                "Official Banking Details: Premier Bank Ltd., Dhanmondi Branch, Dhaka (SWIFT: PRMRBDDH)."
              ]
            },
            {
              id: "quality-control",
              title: "5. Quality Assurance & Inspection Standards",
              content: "Nisha Fashions Wear enforces comprehensive quality management across 12 distinct production stages, from yarn arrival to final carton staging.",
              bullets: [
                "Bulk production is inspected in accordance with internationally recognized AQL 2.5 Major / 4.0 Minor statistical sampling standards.",
                "Buyers are welcome to appoint third-party inspection agencies (e.g., SGS, Bureau Veritas, Intertek, QIMA) prior to shipment departure.",
                "Color Fastness, shrinkage, and seam strength testing follow ISO and AATCC textile test methods."
              ]
            },
            {
              id: "shipping-delivery",
              title: "6. Shipping, Lead Times & Force Majeure",
              content: "Critical path milestone schedules (TNA) are provided upon PO sign-off and tracked on a weekly basis by dedicated merchandisers.",
              bullets: [
                "Production Lead Times: Typically 45–60 days for Knitwear, 60–90 days for Woven & Denim following lab dip approvals.",
                "Ex-Factory Delivery: Goods are considered ready upon issuance of the final Certificate of Inspection.",
                "Neither party shall be held liable for shipment delays resulting from Act of God, port blockades, natural disasters, or major governmental embargoes."
              ]
            },
            {
              id: "intellectual-property",
              title: "7. Intellectual Property & Design Exclusivity",
              content: "The buyer retains sole ownership of all trademarks, proprietary designs, brand labels, and artistic properties supplied to Nisha Fashions Wear. We commit never to replicate or distribute your designs to competing brands.",
              bullets: [
                "All labels, care instructions, and brand tags are safeguarded and verified for zero leakage.",
                "Leftover fabrics and scrap cut pieces are shredded or ethically recycled in accordance with zero-waste environmental protocols."
              ]
            }
          ]
        }),
        "Terms of Service & Commercial Conditions | Nisha Fashions Wear",
        "Read the commercial terms of service, payment methods, production tolerances, and international export policies of Nisha Fashions Wear.",
        true
      ]
    );
  }
}
