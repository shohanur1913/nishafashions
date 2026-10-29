import { Metadata } from "next";
import { getHotDeals } from "@/lib/content-service";
import { HotDealsClient } from "./hot-deals-client";

export const metadata: Metadata = {
  title: "Hot Deals, Export Stock Lots & Special Factory Allocations | Nisha Fashions Wear",
  description: "Browse verified apparel hot deals, export stock lots, factory clearance allocations, and cancelled order surplus from Bangladesh with live countdowns and FOB pricing.",
  alternates: {
    canonical: "/hot-deals",
  },
  openGraph: {
    title: "Hot Deals & Special Factory Allocations | Nisha Fashions Wear",
    description: "Time-limited factory overruns and volume opportunities with verified wholesale FOB pricing.",
    url: "https://www.nishafashions.com/hot-deals",
  },
};

export default async function HotDealsPage() {
  const deals = await getHotDeals();

  return <HotDealsClient initialDeals={deals} />;
}
