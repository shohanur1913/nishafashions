import { Metadata } from "next";
import { AwardsClient } from "./awards-client";

export const metadata: Metadata = {
  title: "Factory Compliance & Ethical Certifications",
  description: "Explore the international compliance, WRAP, BSCI, Accord, SEDEX, and ethical auditing certifications maintained across our Bangladesh apparel partner facilities.",
  alternates: {
    canonical: "/awards",
  },
  openGraph: {
    title: "Factory Compliance & Ethical Certifications | Nisha Fashions Wear",
    description: "International compliance, WRAP, BSCI, Accord, and ethical auditing certifications across our partner facilities in Bangladesh.",
    url: "https://www.nishafashions.com/awards",
  },
};

export default function AwardsPage() {
  return <AwardsClient />;
}
