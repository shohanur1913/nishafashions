import { getAdminUser } from "@/lib/auth";
import { query } from "@/lib/db";
import { AdminHeader } from "@/components/admin/admin-header";
import { redirect } from "next/navigation";
import { SettingsClient } from "./settings-client";
import { AdminLayoutShell } from "@/components/admin/admin-layout-shell";

export default async function AdminSettingsPage() {
  const admin = await getAdminUser();
  if (!admin) redirect("/admin/login");

  const rows: any = await query(`SELECT setting_key, setting_value FROM site_settings`);
  const settingsMap: Record<string, string> = {};
  for (const r of rows) {
    settingsMap[r.setting_key] = r.setting_value;
  }

  return (
    <AdminLayoutShell>
      <div className="flex-1 pb-16">
        <AdminHeader 
          title="Settings & Admin Profile" 
          subtitle="Manage business contact information, social handles and CMS security" 
        />

        <div className="p-4 sm:p-6 lg:p-8 w-full min-w-0 max-w-7xl mx-auto space-y-6">
          <SettingsClient settings={settingsMap} adminUser={admin} />
        </div>
      </div>
    </AdminLayoutShell>
  );
}
