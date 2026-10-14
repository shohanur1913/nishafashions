import type { StaticImageData } from "next/image";

import categoryDenim from "@/public/images/category-denim.png";
import categoryKnit from "@/public/images/category-knit.png";
import categorySweater from "@/public/images/category-sweater.png";
import categoryWoven from "@/public/images/category-woven.png";
import categoryVarious from "@/public/images/category-various.png";
import exportPacking from "@/public/images/export-packing.png";
import heroApparel from "@/public/images/hero-apparel.png";
import productDevelopment from "@/public/images/product-development.png";

import stageYarn from "@/public/images/stage-yarn.png";
import stageFabric from "@/public/images/stage-fabric.png";
import stageCutting from "@/public/images/stage-cutting.png";
import stageSewing from "@/public/images/stage-sewing.png";
import stageAssembly from "@/public/images/stage-assembly.png";
import stageEmbroidery from "@/public/images/stage-embroidery.png";
import stagePrinting from "@/public/images/stage-printing.png";
import stageTrims from "@/public/images/stage-trims.png";
import stageQc from "@/public/images/stage-qc.png";
import stagePacking from "@/public/images/stage-packing.png";
import stageDespatch from "@/public/images/stage-despatch.png";
import stageShipment from "@/public/images/stage-shipment.png";

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
  various: {
    src: categoryVarious,
    alt: "Various fashion accessories including a canvas tote bag, knitted cap, cotton socks, and a small woven handicraft",
  },
  development: {
    src: productDevelopment,
    alt: "Product development desk with fabric swatches, a t-shirt technical sketch, measuring tape and a sample t-shirt",
  },
  export: {
    src: exportPacking,
    alt: "Export cartons with folded garments packed in individual polybags",
  },
  stageYarn: { src: stageYarn, alt: "Premium cotton yarn cones in a high-end textile knitting mill" },
  stageFabric: { src: stageFabric, alt: "Folded premium cotton fabric rolls showing texture and shade bands" },
  stageCutting: { src: stageCutting, alt: "Precise electric fabric cutting machine cutting through layers of fabric" },
  stageSewing: { src: stageSewing, alt: "Modern industrial sewing machine sewing a premium seam" },
  stageAssembly: { src: stageAssembly, alt: "Worker's hands assembling a premium garment on a clean worktable" },
  stageEmbroidery: { src: stageEmbroidery, alt: "High-tech multi-head embroidery machine stitching a precise logo" },
  stagePrinting: { src: stagePrinting, alt: "Screen printing press applying premium graphics to a t-shirt panel" },
  stageTrims: { src: stageTrims, alt: "Neatly organized selection of premium apparel trims and woven labels" },
  stageQc: { src: stageQc, alt: "Measuring tape over a finished premium garment on an inspection table" },
  stagePacking: { src: stagePacking, alt: "Premium garments being packed into clean polybags and export cartons" },
  stageDespatch: { src: stageDespatch, alt: "Pallets of cleanly packed export cartons ready for dispatch" },
  stageShipment: { src: stageShipment, alt: "Modern cargo container representing international shipment" },
} satisfies Record<string, SiteImage>;
