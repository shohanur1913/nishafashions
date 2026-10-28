"use client";

import { usePathname } from "next/navigation";
import { HotDealsSection } from "@/components/website/hot-deals-section";
import { HotDealProduct } from "@/lib/content-service";

interface GlobalHotDealsProps {
  deals: HotDealProduct[];
}

export function GlobalHotDeals({ deals }: GlobalHotDealsProps) {
  const pathname = usePathname();
  // On the homepage, Hot Deals is rendered directly above "Connecting the World"
  if (pathname === "/") {
    return null;
  }
  return <HotDealsSection deals={deals} />;
}
