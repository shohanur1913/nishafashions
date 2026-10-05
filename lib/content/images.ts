import type { StaticImageData } from "next/image";

import categoryDenim from "@/public/images/category-denim.png";
import categoryKnit from "@/public/images/category-knit.png";
import categorySweater from "@/public/images/category-sweater.png";
import categoryWoven from "@/public/images/category-woven.png";
import exportPacking from "@/public/images/export-packing.png";
import heroApparel from "@/public/images/hero-apparel.png";
import productDevelopment from "@/public/images/product-development.png";

/**
 * Website imagery registry.
 *
 * INTERIM ART DIRECTION: these are still-life placeholder photographs
 * (garments, fabric, packing — no people, no factory floors). Replace them with
 * real NFW photography by swapping the files in /public/images and updating
 * the alt text here. Components only reference these keys.
 */
export type SiteImage = { src: StaticImageData; alt: string };

export const images = {
  hero: {
    src: heroApparel,
    alt: "Folded knit t-shirts, a denim jacket, a cable-knit sweater and woven shirts on a worktable beside a fabric swatch book",
  },
  knit: {
    src: categoryKnit,
    alt: "Stack of folded knitwear: grey t-shirt, white pique polo, charcoal fleece hoodie and navy sweatshirt",
  },
  woven: {
    src: categoryWoven,
    alt: "Folded woven garments: white and light blue oxford shirts, khaki chinos and olive cargo trousers",
  },
  denim: {
    src: categoryDenim,
    alt: "Stack of folded denim jeans and a denim jacket beside light-wash denim shorts",
  },
  sweater: {
    src: categorySweater,
    alt: "Stack of folded knitted sweaters in cream, burgundy rib, charcoal and oatmeal cable knit",
  },
  development: {
    src: productDevelopment,
    alt: "Product development desk with fabric swatches, a t-shirt technical sketch, measuring tape and a sample t-shirt",
  },
  export: {
    src: exportPacking,
    alt: "Export cartons with folded garments packed in individual polybags",
  },
} satisfies Record<string, SiteImage>;
