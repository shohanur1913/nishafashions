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

export const metadata: Metadata = {
  metadataBase: new URL(site.url || "https://www.nishafashions.com"),
  title: {
    default: "Nisha Fashions Wear | Bangladesh Apparel Manufacturer & Supplier",
    template: "%s | Nisha Fashions Wear",
  },
  description: "Premier Bangladesh apparel manufacturer, supplier and garment sourcing partner with 20+ years of export experience in Knitwear, Woven, Denim, and Sweaters for global brands.",
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
    "Nisha Fashions Wear"
  ],
  authors: [{ name: "Nisha Fashions Wear", url: "https://www.nishafashions.com" }],
  creator: "Nisha Fashions Wear",
  publisher: "Nisha Fashions Wear",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://www.nishafashions.com",
    siteName: "Nisha Fashions Wear",
    title: "Nisha Fashions Wear | Bangladesh Apparel Manufacturer & Supplier",
    description: "Global apparel sourcing, ethical production management, and quality assurance in Bangladesh for Knit, Woven, Denim, and Sweaters.",
    images: [
      {
        url: "/images/hero-apparel.png",
        width: 1200,
        height: 630,
        alt: "Nisha Fashions Wear - Bangladesh Apparel Sourcing & Production",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Nisha Fashions Wear | Bangladesh Apparel Manufacturer",
    description: "Apparel sourcing and production partner in Bangladesh serving European, US, and Canadian fashion brands.",
    images: ["/images/hero-apparel.png"],
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

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const settings = await getSiteSettings();
  const brandColor = settings.brand_color || settings.theme_color || site.brandColor || "#E94D65";

  return (
    <html 
      lang="en" 
      className={`light ${fontSans.variable} ${fontSerif.variable} antialiased`}
      data-theme="light"
      style={{ colorScheme: "light" }}
    >
      <head>
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
