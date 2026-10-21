import { getAdminUser } from "@/lib/auth";
import { query } from "@/lib/db";
import { notFound, redirect } from "next/navigation";
import { PageEditorClient } from "./page-editor-client";
import { AdminLayoutShell } from "@/components/admin/admin-layout-shell";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function AdminPageEditorPage({ params }: PageProps) {
  const admin = await getAdminUser();
  if (!admin) redirect("/admin/login");

  const { slug } = await params;

  const pages: any = await query(`SELECT * FROM pages WHERE slug = ? LIMIT 1`, [slug]);
  if (!pages || pages.length === 0) {
    notFound();
  }

  const page = pages[0];

  return (
    <AdminLayoutShell>
      <PageEditorClient page={page} />
    </AdminLayoutShell>
  );
}
