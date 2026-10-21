import { getAdminUser } from "@/lib/auth";
import { query } from "@/lib/db";
import { AdminHeader } from "@/components/admin/admin-header";
import { redirect } from "next/navigation";
import { EnquiriesClient } from "./enquiries-client";
import { AdminLayoutShell } from "@/components/admin/admin-layout-shell";
import { getSmtpConfig, isSmtpConfigured } from "@/lib/mail";

export default async function AdminEnquiriesPage() {
  const admin = await getAdminUser();
  if (!admin) redirect("/admin/login");

  const enquiries: any = await query(`SELECT * FROM enquiries ORDER BY created_at DESC`);
  
  // Fetch past replies
  let replies: any[] = [];
  try {
    replies = await query(`SELECT * FROM enquiry_replies ORDER BY sent_at DESC`);
  } catch (e) {
    replies = [];
  }

  // Check SMTP status
  const smtpConfig = await getSmtpConfig();
  const smtpReady = isSmtpConfigured(smtpConfig);

  return (
    <AdminLayoutShell>
      <div className="flex-1 pb-16">
        <AdminHeader 
          title="Buyer Enquiries & RFQs" 
          subtitle="Review quotation submissions, tech pack requests and buyer messages" 
        />

        <div className="p-4 sm:p-6 lg:p-8 w-full min-w-0 max-w-7xl mx-auto space-y-6">
          <EnquiriesClient 
            initialEnquiries={enquiries} 
            initialReplies={replies}
            isSmtpConfigured={smtpReady}
            senderEmail={smtpConfig.fromEmail}
            senderName={smtpConfig.fromName}
          />
        </div>
      </div>
    </AdminLayoutShell>
  );
}
