/**
 * Global business / contact settings.
 *
 * Mirrors the future `site_settings` table (see .agents/ARCHITECTURE.md §10.8).
 * This is the single source for company name, contact details and nav links —
 * never repeat these values inside components.
 */

const phoneE164 = "+8801715645766";

const whatsappMessage =
  "Hello, I am interested in sourcing apparel from Nisha Fashions Wear. I would like to discuss my requirements.";

export const site = {
  name: "Nisha Fashions Wear",
  shortName: "NFW",
  tagline: "Bangladesh Apparel Supplier & Sourcing Partner",
  categoriesLine: ["Knit", "Woven", "Denim", "Sweater"],
  footerRange: ["Knitwear", "Woven", "Denim", "Sweater", "Sportswear", "Outerwear"],
  experience: "20+ years of garment business experience",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.nishafashions.com",
  displayUrl: "www.nishafashions.com",
  email: "info@nishafashions.com",
  phone: {
    display: "+88 01715 645766",
    e164: phoneE164,
  },
  address: {
    lines: ["92, Moneswar Road,", "Zigatola, Dhaka-1209,", "Bangladesh"],
    street: "92, Moneswar Road, Zigatola",
    locality: "Dhaka",
    postalCode: "1209",
    countryCode: "BD",
  },
} as const;

export const links = {
  quote: "/#quote",
  whatsapp: `https://wa.me/${phoneE164.replace("+", "")}?text=${encodeURIComponent(whatsappMessage)}`,
  email: `mailto:${site.email}`,
  phone: `tel:${phoneE164}`,
  /** Pre-filled quote email used until the enquiry form (contact page) exists. */
  quoteEmail: `mailto:${site.email}?subject=${encodeURIComponent(
    "Quote request — Nisha Fashions Wear",
  )}&body=${encodeURIComponent(
    [
      "Hello NFW team,",
      "",
      "Please find our requirement below:",
      "",
      "Product:",
      "Quantity:",
      "Fabric / Composition:",
      "Size Range:",
      "Target Price:",
      "Delivery Requirement:",
      "",
      "Company / Country:",
    ].join("\n"),
  )}`,
} as const;

export type NavLink = { label: string; href: string };

/**
 * Primary navigation. Dedicated pages (/about, /products, …) are planned;
 * until they exist these resolve to homepage sections so no link is broken.
 */
export const mainNav: NavLink[] = [
  { label: "About", href: "/about" },
  { label: "Products", href: "/products" },
  { label: "Services", href: "/services" },
  { label: "Awards", href: "/awards" },
  { label: "Contact", href: "/contact" },
];

export const footerNav: NavLink[] = [
  { label: "About Us", href: "/about" },
  { label: "Products", href: "/products" },
  { label: "Services", href: "/services" },
  { label: "Awards & Certifications", href: "/awards" },
  { label: "Contact", href: "/contact" },
];
