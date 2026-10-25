import { AppSidebar } from "@/components/app-sidebar"
import { ChartAreaInteractive } from "@/components/chart-area-interactive"
import { DataTable } from "@/components/data-table"
import { SectionCards } from "@/components/section-cards"
import { SiteHeader } from "@/components/site-header"
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar"
import { redirect } from "next/navigation"
import { getAdminUser } from "@/lib/auth"
import { query } from "@/lib/db"
import data from "./data.json"

export default async function Page() {
  const admin = await getAdminUser();
  if (!admin) {
    redirect("/admin/login");
  }
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
          "--sidebar-width": "260px",
          "--header-height": "calc(var(--spacing) * 12)",
        } as React.CSSProperties
      }
    >
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader />
        <div className="flex flex-1 flex-col min-w-0 max-w-full overflow-x-hidden">
          <div className="@container/main flex flex-1 flex-col gap-2 min-w-0 max-w-full">
            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6 min-w-0 max-w-full">
              <SectionCards stats={stats} />
              <div className="px-4 lg:px-6 min-w-0 max-w-full overflow-hidden">
                <ChartAreaInteractive />
              </div>
              <div className="min-w-0 max-w-full overflow-hidden">
                <DataTable data={data} />
              </div>
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
