import { query } from "../lib/db";

const privacyContent = {
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
};

const termsContent = {
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
};

async function run() {
  try {
    const existingPrivacy: any = await query("SELECT id FROM pages WHERE slug = ?", ["privacy-policy"]);
    if (!existingPrivacy || existingPrivacy.length === 0) {
      await query(
        "INSERT INTO pages (slug, title, subtitle, content_json, seo_title, seo_description, is_published) VALUES (?, ?, ?, ?, ?, ?, ?)",
        [
          "privacy-policy",
          "Privacy Policy",
          "Data protection, client confidentiality & tech pack safeguards",
          JSON.stringify(privacyContent),
          "Privacy Policy | Nisha Fashions Wear",
          "Review the privacy and confidentiality policies of Nisha Fashions Wear regarding international buyer data and tech pack protection.",
          true
        ]
      );
      console.log("SUCCESS: Inserted Privacy Policy");
    } else {
      console.log("INFO: Privacy Policy already exists");
    }

    const existingTerms: any = await query("SELECT id FROM pages WHERE slug = ?", ["terms-of-service"]);
    if (!existingTerms || existingTerms.length === 0) {
      await query(
        "INSERT INTO pages (slug, title, subtitle, content_json, seo_title, seo_description, is_published) VALUES (?, ?, ?, ?, ?, ?, ?)",
        [
          "terms-of-service",
          "Terms of Service",
          "Commercial terms, sampling rules, payment methods & export execution",
          JSON.stringify(termsContent),
          "Terms of Service & Commercial Conditions | Nisha Fashions Wear",
          "Read the commercial terms of service, payment methods, production tolerances, and international export policies of Nisha Fashions Wear.",
          true
        ]
      );
      console.log("SUCCESS: Inserted Terms of Service");
    } else {
      console.log("INFO: Terms of Service already exists");
    }

    const all: any = await query("SELECT id, slug, title FROM pages ORDER BY id ASC");
    console.log("Pages currently in DB:", all.map((p: any) => `${p.id}: ${p.slug} (${p.title})`));
    process.exit(0);
  } catch (err) {
    console.error("Migration error:", err);
    process.exit(1);
  }
}

run();
