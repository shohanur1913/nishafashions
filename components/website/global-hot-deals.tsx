"use client";

import { HotDealProduct } from "@/lib/content-service";

interface GlobalHotDealsProps {
  deals: HotDealProduct[];
}

export function GlobalHotDeals({ deals }: GlobalHotDealsProps) {
  // Hot Deals is rendered directly on homepage above Innovation, and has dedicated /hot-deals page
  return null;
}
