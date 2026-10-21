import { Metadata } from "next";
import { ProductsClient } from "./products-client";

export const metadata: Metadata = {
  title: "Apparel Products & Garment Manufacturing Catalog",
  description: "Browse Bangladesh apparel product lines: Knitwear, Woven shirts & pants, Denim jackets & jeans, Sweaters, and corporate workwear manufactured by Nisha Fashions Wear.",
  alternates: {
    canonical: "/products",
  },
  openGraph: {
    title: "Apparel Products & Garment Manufacturing Catalog | Nisha Fashions Wear",
    description: "Knitwear, Woven shirts, Denim jeans, Sweaters, and Accessories produced in Bangladesh for international fashion retailers.",
    url: "https://www.nishafashions.com/products",
  },
};

export default function ProductsPage() {
  return <ProductsClient />;
}
