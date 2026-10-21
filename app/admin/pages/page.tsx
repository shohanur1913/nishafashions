import { getAdminUser } from "@/lib/auth";
import { query } from "@/lib/db";
import { redirect } from "next/navigation";
import { AdminLayoutShell } from "@/components/admin/admin-layout-shell";
import { PagesListClient, PageItem } from "@/components/admin/pages-list-client";

export const metadata = {
  title: "Pages Manager | Nisha CMS",
  description: "Manage website pages, legal policies, and custom content blocks",
};

export default async function AdminPagesListPage() {
  const admin = await getAdminUser();
  if (!admin) redirect("/admin/login");

  const rawPages: any = await query(`
    SELECT id, slug, title, subtitle, seo_title, seo_description, is_published, updated_at 
    FROM pages 
    ORDER BY id ASC
  `);

  const pages: PageItem[] = (rawPages || []).map((p: any) => ({
    id: p.id,
    slug: p.slug,
    title: p.title,
    subtitle: p.subtitle || "",
    seo_title: p.seo_title || "",
    seo_description: p.seo_description || "",
    is_published: Boolean(p.is_published),
    updated_at: p.updated_at ? new Date(p.updated_at).toISOString() : "",
  }));

  return (
    <AdminLayoutShell>
      <div className="flex-1 pb-16">
        <PagesListClient initialPages={pages} />
      </div>
    </AdminLayoutShell>
  );
}
