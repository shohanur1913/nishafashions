import { getAdminUser } from "@/lib/auth";
import { query } from "@/lib/db";
import { notFound, redirect } from "next/navigation";
import { CategoryEditorClient } from "./category-editor-client";
import { AdminLayoutShell } from "@/components/admin/admin-layout-shell";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function AdminCategoryDetailPage({ params }: PageProps) {
  const admin = await getAdminUser();
  if (!admin) redirect("/admin/login");

  const { slug } = await params;

  if (slug === "new") {
    return (
      <AdminLayoutShell>
        <CategoryEditorClient isNew={true} />
      </AdminLayoutShell>
    );
  }

  const categories: any = await query(`SELECT * FROM categories WHERE slug = ? LIMIT 1`, [slug]);
  if (!categories || categories.length === 0) {
    notFound();
  }

  return (
    <AdminLayoutShell>
      <CategoryEditorClient category={categories[0]} isNew={false} />
    </AdminLayoutShell>
  );
}
