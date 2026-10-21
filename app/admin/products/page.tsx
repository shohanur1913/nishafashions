import { getAdminUser } from "@/lib/auth";
import { query } from "@/lib/db";
import { AdminHeader } from "@/components/admin/admin-header";
import { redirect } from "next/navigation";
import { ProductsClient } from "./products-client";
import { AdminLayoutShell } from "@/components/admin/admin-layout-shell";

export default async function AdminProductsPage() {
  const admin = await getAdminUser();
  if (!admin) redirect("/admin/login");

  const categories: any = await query(`SELECT slug, title FROM categories ORDER BY sort_order ASC, id ASC`);
  const products: any = await query(`SELECT * FROM products ORDER BY id DESC`);

  return (
    <AdminLayoutShell>
      <div className="flex-1 pb-16">
        <AdminHeader 
          title="Products Catalog" 
          subtitle="Manage product items, fabric specs, manufacturing details and division mapping" 
        />

        <div className="p-4 sm:p-6 lg:p-8 w-full min-w-0 max-w-7xl mx-auto space-y-6">
          <ProductsClient 
            initialProducts={products} 
            categories={categories} 
          />
        </div>
      </div>
    </AdminLayoutShell>
  );
}
