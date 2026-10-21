import { Metadata } from "next";
import { AboutClient } from "./about-client";

export const metadata: Metadata = {
  title: "About Us & Garment Sourcing Heritage",
  description: "Nisha Fashions Wear is a dedicated apparel production management and sourcing partner, backed by over 20 years of garment business experience serving European, US, and Canadian markets.",
  alternates: {
    canonical: "/about",
  },
  openGraph: {
    title: "About Us | Nisha Fashions Wear Bangladesh",
    description: "20+ years of garment business experience in Knitwear, Woven, Denim and Sweaters. Sourcing and manufacturing partner for global apparel brands.",
    url: "https://www.nishafashions.com/about",
  },
};

export default function AboutPage() {
  return <AboutClient />;
}
