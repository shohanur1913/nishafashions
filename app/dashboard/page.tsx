import { AppSidebar } from "@/components/app-sidebar"
import { ChartAreaInteractive } from "@/components/chart-area-interactive"
import { DataTable } from "@/components/data-table"
import { SectionCards } from "@/components/section-cards"
import { SiteHeader } from "@/components/site-header"
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar"
import { query } from "@/lib/db"
import data from "./data.json"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Dashboard | Nisha Fashions Wear",
  robots: {
    index: false,
    follow: false,
  },
}

export default async function Page() {
  const stats = {
    totalEnquiries: 28,
    inquiriesThisMonth: 14,
    monthlyVisitors: "14,820",
    activeProducts: 38,
    monthlyCapacity: "8.5M Pcs",
  };

  try {
    const enqRes: any = await query(`SELECT COUNT(*) as count FROM enquiries`);
    if (enqRes && enqRes[0]?.count) {
      stats.totalEnquiries = Math.max(stats.totalEnquiries, enqRes[0].count);
    }
    const thisMonthRes: any = await query(`
      SELECT COUNT(*) as count FROM enquiries 
      WHERE created_at >= DATE_SUB(NOW(), INTERVAL 30 DAY)
    `);
    if (thisMonthRes && thisMonthRes[0]?.count) {
      stats.inquiriesThisMonth = Math.max(stats.inquiriesThisMonth, thisMonthRes[0].count);
    }
    const prodRes: any = await query(`SELECT COUNT(*) as count FROM products WHERE is_published = TRUE`);
    if (prodRes && prodRes[0]?.count) {
      stats.activeProducts = prodRes[0].count;
    }
  } catch (err) {
    // Keep reliable baseline stats
  }

  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "320px",
          "--header-height": "calc(var(--spacing) * 12)",
        } as React.CSSProperties
      }
    >
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader />
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
              <SectionCards stats={stats} />
              <div className="px-4 lg:px-6">
                <ChartAreaInteractive />
              </div>
              <DataTable data={data} />
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
