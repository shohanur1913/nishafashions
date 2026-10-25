import { getAdminUser } from "@/lib/auth";
import { redirect } from "next/navigation";
import { AdminHeader } from "@/components/admin/admin-header";
import { AdminLayoutShell } from "@/components/admin/admin-layout-shell";
import { LifeBuoy, Mail, Globe, MessageSquare } from "lucide-react";

export const metadata = {
  title: "Support | Nisha CMS",
};

export default async function AdminSupportPage() {
  const admin = await getAdminUser();
  if (!admin) redirect("/admin/login");

  return (
    <AdminLayoutShell>
      <div className="flex-1 pb-16">
        <AdminHeader 
          title="System Support" 
        />

        <div className="p-4 sm:p-6 lg:p-8 w-full min-w-0 max-w-4xl mx-auto space-y-6">
          <div className="p-6 sm:p-8 rounded-2xl bg-card border border-border shadow-xs space-y-6">
            <div className="flex items-center gap-3 border-b border-border pb-4">
              <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                <LifeBuoy className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-foreground">Support &amp; Assistance</h2>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-muted/30 border border-border space-y-2">
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-primary" />
                  <span className="text-xs font-semibold text-foreground">Email Support</span>
                </div>
                <a 
                  href="mailto:support@bangladeshhost.com" 
                  className="text-xs font-mono text-primary hover:underline block"
                >
                  support@bangladeshhost.com
                </a>
              </div>

              <div className="p-4 rounded-xl bg-muted/30 border border-border space-y-2">
                <div className="flex items-center gap-2">
                  <Globe className="w-4 h-4 text-primary" />
                  <span className="text-xs font-semibold text-foreground">Infrastructure Support</span>
                </div>
                <a 
                  href="https://bangladeshhost.com" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-xs font-mono text-primary hover:underline block"
                >
                  bangladeshhost.com
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayoutShell>
  );
}
