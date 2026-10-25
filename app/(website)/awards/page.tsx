import { Metadata } from "next";
import { AwardsClient } from "./awards-client";
import { getPageContent } from "@/lib/content-service";

export async function generateMetadata(): Promise<Metadata> {
  const page = await getPageContent("awards");
  return {
    title: page?.seo_title || "Factory Compliance & Ethical Certifications",
    description:
      page?.seo_description ||
      "Explore the international compliance, WRAP, BSCI, Accord, SEDEX, and ethical auditing certifications maintained across our Bangladesh apparel partner facilities.",
    alternates: {
      canonical: "/awards",
    },
    openGraph: {
      title: page?.seo_title || "Factory Compliance & Ethical Certifications | Nisha Fashions Wear",
      description:
        page?.seo_description ||
        "International compliance, WRAP, BSCI, Accord, and ethical auditing certifications across our partner facilities in Bangladesh.",
      url: "https://www.nishafashions.com/awards",
    },
  };
}

export default async function AwardsPage() {
  const pageData = await getPageContent("awards");
  return <AwardsClient initialData={pageData} />;
}
