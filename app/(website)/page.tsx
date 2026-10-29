import { Metadata } from "next";
import dynamic from "next/dynamic";

export const metadata: Metadata = {
  title: {
    absolute: "Bangladesh Apparel Manufacturer, Supplier & Sourcing Partner | Nisha Fashions Wear",
  },
  description: "Nisha Fashions Wear is a premier Bangladesh apparel manufacturer, supplier and garment sourcing partner with 20+ years of export experience in Knit, Woven, Denim, and Sweaters.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Bangladesh Apparel Manufacturer, Supplier & Sourcing Partner | Nisha Fashions Wear",
    description: "Premier Bangladesh apparel manufacturer and garment sourcing partner serving international retail brands.",
    url: "https://www.nishafashions.com",
  },
};

import { Hero } from "@/components/website/hero";
import { TrustStrip } from "@/components/website/trust-strip";
import { Partners } from "@/components/website/partners";
import { Stages } from "@/components/website/stages";
import { Categories } from "@/components/website/categories";
import { About } from "@/components/website/about";
import { HotDealsSection } from "@/components/website/hot-deals-section";

// Dynamically import heavy WebGL/Canvas/Animation components to optimize load time
const ProductsWall = dynamic(() => import("@/components/website/products-wall").then(m => m.ProductsWall));
const Compliance = dynamic(() => import("@/components/website/compliance").then(m => m.Compliance));
const GlobeWireframeDemo = dynamic(() => import("@/components/website/globe-wireframe-demo"));

import { getCategories, getPageContent, getHotDeals } from "@/lib/content-service";

export default async function Homepage() {
  const [categories, hotDeals, homeData] = await Promise.all([
    getCategories(),
    getHotDeals(),
    getPageContent("home"),
  ]);
  const heroContent = homeData?.content?.hero;

  return (
    <>
      <Hero initialHero={heroContent} />
      <TrustStrip />
      <Partners />
      <Stages />
      <Categories initialCatalog={categories} />
      <ProductsWall />
      <About />
      <Compliance />
      <HotDealsSection deals={hotDeals} />
      <GlobeWireframeDemo />
    </>
  );
}
