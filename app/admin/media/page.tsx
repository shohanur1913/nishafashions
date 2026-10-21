import { getAdminUser } from "@/lib/auth";
import { query } from "@/lib/db";
import { AdminHeader } from "@/components/admin/admin-header";
import { redirect } from "next/navigation";
import { MediaClient } from "./media-client";
import { AdminLayoutShell } from "@/components/admin/admin-layout-shell";

export default async function AdminMediaPage() {
  const admin = await getAdminUser();
  if (!admin) redirect("/admin/login");

  const media: any = await query(`SELECT * FROM media ORDER BY created_at DESC`);

  return (
    <AdminLayoutShell>
      <div className="flex-1 pb-16">
        <AdminHeader 
          title="Media Library" 
          subtitle="Upload product photography, factory banners and certification badges" 
        />

        <div className="p-4 sm:p-6 lg:p-8 w-full min-w-0 max-w-7xl mx-auto space-y-6">
          <MediaClient mediaItems={media} />
        </div>
      </div>
    </AdminLayoutShell>
  );
}
