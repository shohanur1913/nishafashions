import { Metadata } from "next";
import dynamic from "next/dynamic";

export const metadata: Metadata = {
  title: "Bangladesh Apparel Manufacturer & Supplier | Nisha Fashions Wear",
  description: "Nisha Fashions Wear is a Bangladesh apparel manufacturer, supplier and sourcing partner for Knit, Woven, Denim and Sweater garments, serving international buyers.",
};
import { Hero } from "@/components/website/hero";
import { TrustStrip } from "@/components/website/trust-strip";
import { Partners } from "@/components/website/partners";
import { Stages } from "@/components/website/stages";
import { Categories } from "@/components/website/categories";
import { About } from "@/components/website/about";

// Dynamically import heavy WebGL/Canvas/Animation components to optimize load time
const ProductsWall = dynamic(() => import("@/components/website/products-wall").then(m => m.ProductsWall));
const Compliance = dynamic(() => import("@/components/website/compliance").then(m => m.Compliance));
const GlobeWireframeDemo = dynamic(() => import("@/components/website/globe-wireframe-demo"));

export default function Homepage() {
  return (
    <>
      <Hero />
      <TrustStrip />
      <Partners />
      <Stages />
      <Categories />
      <ProductsWall />
      <About />
      <Compliance />
      <GlobeWireframeDemo />
    </>
  );
}
