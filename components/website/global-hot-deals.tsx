"use client";

import { usePathname } from "next/navigation";
import { HotDealsTeaser } from "@/components/website/hot-deals-teaser";
import { HotDealProduct } from "@/lib/content-service";

interface GlobalHotDealsProps {
  deals: HotDealProduct[];
}

export function GlobalHotDeals({ deals }: GlobalHotDealsProps) {
  const pathname = usePathname();
  // On homepage, Hot Deals teaser is rendered directly above "Connecting the World"
  // On /hot-deals page, full catalog is rendered directly
  if (pathname === "/" || pathname === "/hot-deals" || pathname.startsWith("/admin")) {
    return null;
  }
  return <HotDealsTeaser dealCount={deals?.length || 0} />;
}
