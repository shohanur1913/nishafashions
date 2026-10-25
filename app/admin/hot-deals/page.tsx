import { getAdminUser } from "@/lib/auth";
import { query } from "@/lib/db";
import { AdminHeader } from "@/components/admin/admin-header";
import { redirect } from "next/navigation";
import { HotDealsClient } from "./hot-deals-client";
import { AdminLayoutShell } from "@/components/admin/admin-layout-shell";

export default async function AdminHotDealsPage() {
  const admin = await getAdminUser();
  if (!admin) redirect("/admin/login");

  // Fetch all products with category details
  const products: any = await query(`
    SELECT p.*, c.title as category_title 
    FROM products p 
    LEFT JOIN categories c ON p.category_slug = c.slug 
    ORDER BY p.is_hot_deal DESC, p.sort_order ASC, p.id DESC
  `);

  // Fetch categories for product creation
  const categories: any = await query(`
    SELECT slug, title FROM categories ORDER BY sort_order ASC, id ASC
  `);

  return (
    <AdminLayoutShell>
      <div className="flex-1 pb-16">
        <AdminHeader 
          title="Hot Deals & Special Offers" 
          subtitle="Manage promotional apparel programmes, special offer pricing, clearance runs, and batch discounts" 
        />

        <div className="p-4 sm:p-6 lg:p-8 w-full min-w-0 max-w-7xl mx-auto space-y-6">
          <HotDealsClient 
            initialProducts={products || []} 
            categories={categories || []} 
          />
        </div>
      </div>
    </AdminLayoutShell>
  );
}
