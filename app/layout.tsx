import type { Metadata } from "next";
import { Inter, Newsreader } from "next/font/google";
import "./globals.css";
import { site } from "@/lib/content/site";
import { Analytics } from "@/components/analytics";

import { getSiteSettings } from "@/lib/content-service";

const fontSans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

const fontSerif = Newsreader({
  subsets: ["latin"],
  variable: "--font-serif",
  style: ["normal", "italic"],
});

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings();
  const favicon = settings.favicon_url || "/favicon.ico";
  const siteName = settings.site_name || "Nisha Fashions Wear";
  const tagline = settings.tagline || "Bangladesh Apparel Supplier & Sourcing Partner";

  return {
    metadataBase: new URL(site.url || "https://www.nishafashions.com"),
    title: {
      default: `${siteName} | ${tagline}`,
      template: `%s | ${siteName}`,
    },
    description: settings.experience 
      ? `Premier Bangladesh apparel manufacturer and supplier with ${settings.experience}.` 
      : "Premier Bangladesh apparel manufacturer, supplier and garment sourcing partner with 20+ years of export experience in Knitwear, Woven, Denim, and Sweaters for global brands.",
    keywords: [
      "Apparel manufacturer Bangladesh",
      "Bangladesh garment supplier",
      "Clothing sourcing Bangladesh",
      "Knitwear manufacturer Dhaka",
      "Woven shirts factory",
      "Denim jeans supplier Bangladesh",
      "Sweater production Dhaka",
      "FOB apparel manufacturing",
      "RMG exporter Bangladesh",
      siteName,
    ],
    authors: [{ name: siteName, url: "https://www.nishafashions.com" }],
    creator: siteName,
    publisher: siteName,
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    alternates: {
      canonical: "/",
    },
    icons: {
      icon: [
        {
          url: favicon,
        },
      ],
      shortcut: [favicon],
      apple: [favicon],
    },
    openGraph: {
      type: "website",
      locale: "en_US",
      url: "https://www.nishafashions.com",
      siteName,
      title: `${siteName} | Bangladesh Apparel Manufacturer & Supplier`,
      description: "Global apparel sourcing, ethical production management, and quality assurance in Bangladesh for Knit, Woven, Denim, and Sweaters.",
      images: [
        {
          url: settings.header_logo_url || "/images/hero-apparel.png",
          width: 1200,
          height: 630,
          alt: `${siteName} - Bangladesh Apparel Sourcing & Production`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${siteName} | Bangladesh Apparel Manufacturer`,
      description: "Apparel sourcing and production partner in Bangladesh serving European, US, and Canadian fashion brands.",
      images: [settings.header_logo_url || "/images/hero-apparel.png"],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    verification: {
      google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || undefined,
    },
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const settings = await getSiteSettings();
  const brandColor = settings.brand_color || settings.theme_color || site.brandColor || "#E94D65";
  const favicon = settings.favicon_url || "/favicon.ico";
  const faviconType = favicon.endsWith(".png")
    ? "image/png"
    : favicon.endsWith(".svg")
    ? "image/svg+xml"
    : favicon.endsWith(".jpg") || favicon.endsWith(".jpeg")
    ? "image/jpeg"
    : favicon.endsWith(".webp")
    ? "image/webp"
    : "image/x-icon";

  return (
    <html 
      lang="en" 
      className={`light ${fontSans.variable} ${fontSerif.variable} antialiased`}
      data-theme="light"
      style={{ colorScheme: "light" }}
    >
      <head>
        <link rel="icon" href={favicon} type={faviconType} />
        <link rel="shortcut icon" href={favicon} />
        <link rel="apple-touch-icon" href={favicon} />
        <style
          id="brand-theme-styles"
          dangerouslySetInnerHTML={{
            __html: `
              :root {
                --brand: ${brandColor};
                --primary: ${brandColor};
                --ring: ${brandColor};
                --accent: ${brandColor};
                --sidebar-primary: ${brandColor};
                --sidebar-ring: ${brandColor};
              }
              .dark {
                --brand: ${brandColor};
                --primary: ${brandColor};
                --ring: ${brandColor};
                --accent: ${brandColor};
                --sidebar-primary: ${brandColor};
                --sidebar-ring: ${brandColor};
              }
              ::selection {
                background: ${brandColor} !important;
                color: #ffffff !important;
              }
            `,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "Organization",
                  "@id": "https://www.nishafashions.com/#organization",
                  name: site.name,
                  alternateName: site.shortName,
                  url: site.url,
                  logo: {
                    "@type": "ImageObject",
                    "@id": "https://www.nishafashions.com/#logo",
                    url: `${site.url}/images/logo.jpg`,
                    caption: site.name,
                  },
                  image: `${site.url}/images/logo.jpg`,
                  description:
                    "Nisha Fashions Wear is a premier Bangladesh apparel manufacturer, supplier and sourcing partner for Knit, Woven, Denim, and Sweater garments.",
                  email: site.email,
                  telephone: site.phone.e164,
                  address: {
                    "@type": "PostalAddress",
                    streetAddress: site.address.street,
                    addressLocality: site.address.locality,
                    postalCode: site.address.postalCode,
                    addressCountry: site.address.countryCode,
                  },
                  sameAs: [
                    "https://www.linkedin.com/company/nisha-fashions-wear",
                  ],
                  contactPoint: [
                    {
                      "@type": "ContactPoint",
                      telephone: site.phone.e164,
                      contactType: "customer service",
                      areaServed: "Global",
                      availableLanguage: ["English", "Bengali"],
                    },
                  ],
                },
                {
                  "@type": "WebSite",
                  "@id": "https://www.nishafashions.com/#website",
                  url: site.url,
                  name: site.name,
                  description: site.tagline,
                  publisher: {
                    "@id": "https://www.nishafashions.com/#organization",
                  },
                  inLanguage: "en",
                },
              ],
            }),
          }}
        />
      </head>
      <body className="min-h-screen bg-background font-sans text-foreground">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
