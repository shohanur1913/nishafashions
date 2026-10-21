import nodemailer from "nodemailer";
import { query } from "@/lib/db";

export interface SmtpConfig {
  host: string;
  port: number;
  secure: boolean;
  user: string;
  pass: string;
  fromName: string;
  fromEmail: string;
}

/**
 * Fetch SMTP settings from site_settings table
 */
export async function getSmtpConfig(): Promise<SmtpConfig> {
  const rows: any = await query(
    `SELECT setting_key, setting_value FROM site_settings WHERE setting_key LIKE 'smtp_%'`
  );

  const map: Record<string, string> = {};
  for (const r of rows || []) {
    map[r.setting_key] = r.setting_value || "";
  }

  const port = parseInt(map["smtp_port"] || "587", 10) || 587;
  const secureSetting = (map["smtp_secure"] || "").toLowerCase();
  // Port 465 is typically SSL/true; 587 or 25 is TLS/STARTTLS/false
  const secure = secureSetting === "ssl" || secureSetting === "true" || port === 465;

  return {
    host: map["smtp_host"] || "",
    port,
    secure,
    user: map["smtp_user"] || "",
    pass: map["smtp_pass"] || "",
    fromName: map["smtp_from_name"] || "Nisha Fashions Wear",
    fromEmail: map["smtp_from_email"] || map["smtp_user"] || "info@nishafashions.com",
  };
}

/**
 * Check if minimal SMTP settings are filled
 */
export function isSmtpConfigured(config: SmtpConfig): boolean {
  return Boolean(config.host && config.host.trim() !== "" && config.user && config.user.trim() !== "" && config.pass);
}

/**
 * Create a configured Nodemailer transporter
 */
export function createMailTransporter(config: SmtpConfig) {
  if (!isSmtpConfigured(config)) {
    throw new Error("SMTP is not configured yet. Please complete SMTP settings first.");
  }

  return nodemailer.createTransport({
    host: config.host.trim(),
    port: config.port,
    secure: config.secure,
    auth: {
      user: config.user.trim(),
      pass: config.pass,
    },
    tls: {
      // Allow connection even if the cert is self-signed or has domain mismatch
      rejectUnauthorized: false,
    },
    connectionTimeout: 12000,
    greetingTimeout: 8000,
  });
}

/**
 * Send an email using configured SMTP
 */
export async function sendEmail({
  to,
  subject,
  html,
  text,
  replyTo,
}: {
  to: string;
  subject: string;
  html: string;
  text?: string;
  replyTo?: string;
}) {
  const config = await getSmtpConfig();
  if (!isSmtpConfigured(config)) {
    return {
      success: false,
      error: "SMTP server has not been configured. Please go to Admin > Settings to configure your SMTP host, port, user and password.",
    };
  }

  try {
    const transporter = createMailTransporter(config);
    const fromAddress = `"${config.fromName}" <${config.fromEmail}>`;

    const info = await transporter.sendMail({
      from: fromAddress,
      to,
      replyTo: replyTo || config.fromEmail,
      subject,
      text: text || html.replace(/<[^>]+>/g, " "),
      html,
    });

    return {
      success: true,
      messageId: info.messageId,
    };
  } catch (error: any) {
    console.error("Failed to send email via SMTP:", error);
    return {
      success: false,
      error: error.message || "Failed to deliver email through SMTP server.",
    };
  }
}

/**
 * Generate clean HTML email layout for Test Mail
 */
export function generateTestEmailHtml(siteName: string, recipientEmail: string): string {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>SMTP Verification - ${siteName}</title>
</head>
<body style="margin: 0; padding: 0; background-color: #f7f7f9; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #1e1e24; -webkit-font-smoothing: antialiased;">
  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color: #f7f7f9; padding: 40px 16px;">
    <tr>
      <td align="center">
        <table width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width: 580px; background-color: #ffffff; border-radius: 16px; border: 1px solid #e2e4e9; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.03);">
          <tr>
            <td style="padding: 32px 36px; background-color: #0f1115; color: #ffffff;">
              <span style="font-size: 11px; text-transform: uppercase; letter-spacing: 0.15em; font-weight: 700; color: #94a3b8; display: block; margin-bottom: 6px;">Nisha Fashions Wear</span>
              <h1 style="margin: 0; font-size: 22px; font-weight: 600; color: #ffffff; letter-spacing: -0.02em;">SMTP Email Service Connected</h1>
            </td>
          </tr>
          <tr>
            <td style="padding: 36px 36px 28px;">
              <div style="background-color: #ecfdf5; border: 1px solid #a7f3d0; border-radius: 12px; padding: 14px 18px; margin-bottom: 24px;">
                <p style="margin: 0; color: #065f46; font-size: 14px; font-weight: 600;">
                  ✓ Connection Successful!
                </p>
                <p style="margin: 4px 0 0; color: #047857; font-size: 13px;">
                  Your outbound SMTP server is properly authenticated and ready to dispatch buyer replies.
                </p>
              </div>

              <p style="font-size: 14px; line-height: 1.6; color: #374151; margin: 0 0 16px;">
                Hello Administrator,
              </p>
              <p style="font-size: 14px; line-height: 1.6; color: #374151; margin: 0 0 20px;">
                This test message confirms that your SMTP mail parameters configured in the <strong>${siteName}</strong> admin panel are working properly.
              </p>

              <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 10px; margin-bottom: 24px;">
                <tr>
                  <td style="padding: 14px 18px; font-size: 12px; color: #64748b; border-bottom: 1px solid #e2e8f0;">Recipient Address</td>
                  <td style="padding: 14px 18px; font-size: 13px; font-weight: 600; color: #0f172a; text-align: right; border-bottom: 1px solid #e2e8f0;">${recipientEmail}</td>
                </tr>
                <tr>
                  <td style="padding: 14px 18px; font-size: 12px; color: #64748b; border-bottom: 1px solid #e2e8f0;">Timestamp</td>
                  <td style="padding: 14px 18px; font-size: 13px; font-weight: 600; color: #0f172a; text-align: right; border-bottom: 1px solid #e2e8f0;">${new Date().toUTCString()}</td>
                </tr>
                <tr>
                  <td style="padding: 14px 18px; font-size: 12px; color: #64748b;">Outbound Protocol</td>
                  <td style="padding: 14px 18px; font-size: 13px; font-weight: 600; color: #0f172a; text-align: right;">SMTP / TLS Secure</td>
                </tr>
              </table>

              <p style="font-size: 13px; line-height: 1.5; color: #6b7280; margin: 0;">
                You can now reply directly to buyer enquiries and RFQ quotes from the <strong>Buyer Enquiries</strong> tab.
              </p>
            </td>
          </tr>
          <tr>
            <td style="padding: 20px 36px; background-color: #f9fafb; border-top: 1px solid #e5e7eb; font-size: 11px; color: #9ca3af; text-align: center;">
              Nisha Fashions Wear • 92, Moneswar Road, Zigatola, Dhaka-1209, Bangladesh • www.nishafashions.com
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `;
}

/**
 * Generate clean HTML email layout for Buyer Inquiry Reply
 */
export function generateBuyerReplyHtml({
  buyerName,
  replyMessage,
  senderName,
  companyName,
  originalSubject,
  originalMessage,
}: {
  buyerName: string;
  replyMessage: string;
  senderName: string;
  companyName: string;
  originalSubject?: string;
  originalMessage?: string;
}): string {
  const formattedReply = replyMessage
    .split("\n\n")
    .map((paragraph) => `<p style="margin: 0 0 16px; font-size: 14px; line-height: 1.6; color: #1f2937;">${paragraph.replace(/\n/g, "<br>")}</p>`)
    .join("");

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Response from ${companyName}</title>
</head>
<body style="margin: 0; padding: 0; background-color: #f7f7f9; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #1e1e24; -webkit-font-smoothing: antialiased;">
  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color: #f7f7f9; padding: 40px 16px;">
    <tr>
      <td align="center">
        <table width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width: 620px; background-color: #ffffff; border-radius: 16px; border: 1px solid #e2e4e9; overflow: hidden; box-shadow: 0 4px 14px rgba(0,0,0,0.03);">
          
          <!-- Header Banner -->
          <tr>
            <td style="padding: 32px 36px; background-color: #0b0f19; color: #ffffff;">
              <span style="font-size: 11px; text-transform: uppercase; letter-spacing: 0.15em; font-weight: 700; color: #94a3b8; display: block; margin-bottom: 6px;">
                Apparel Sourcing & Manufacturing Desk
              </span>
              <h1 style="margin: 0; font-size: 22px; font-weight: 600; color: #ffffff; letter-spacing: -0.02em;">
                ${companyName}
              </h1>
              <p style="margin: 4px 0 0; font-size: 12px; color: #94a3b8;">
                Dhaka, Bangladesh • Knit, Woven, Denim & Sweaters
              </p>
            </td>
          </tr>

          <!-- Main Reply Message -->
          <tr>
            <td style="padding: 36px 36px 28px;">
              <p style="margin: 0 0 16px; font-size: 15px; font-weight: 600; color: #111827;">
                Dear ${buyerName || "Buyer"},
              </p>

              ${formattedReply}

              <!-- Signature block -->
              <div style="margin-top: 32px; padding-top: 20px; border-top: 1px solid #e5e7eb;">
                <p style="margin: 0; font-size: 14px; font-weight: 600; color: #111827;">${senderName}</p>
                <p style="margin: 2px 0 0; font-size: 12px; color: #6b7280;">Merchandising & Production Management Desk</p>
                <p style="margin: 2px 0 0; font-size: 12px; font-weight: 500; color: #374151;">${companyName}</p>
                <p style="margin: 8px 0 0; font-size: 12px; color: #4b5563;">
                  Direct WhatsApp: <strong style="color: #111827;">+880 1715 645766</strong> • Web: <a href="https://www.nishafashions.com" style="color: #2563eb; text-decoration: none;">www.nishafashions.com</a>
                </p>
              </div>

              <!-- Original Enquiry Context Box -->
              ${originalMessage ? `
              <div style="margin-top: 32px; background-color: #f8fafc; border-left: 3px solid #cbd5e1; padding: 16px 20px; border-radius: 0 8px 8px 0;">
                <p style="margin: 0 0 6px; font-size: 11px; text-transform: uppercase; letter-spacing: 0.05em; font-weight: 700; color: #64748b;">
                  Original Buyer Inquiry:
                </p>
                <p style="margin: 0; font-size: 12px; line-height: 1.5; color: #475569; font-style: italic;">
                  "${originalMessage.replace(/\n/g, "<br>")}"
                </p>
              </div>
              ` : ""}

            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding: 20px 36px; background-color: #f9fafb; border-top: 1px solid #e5e7eb; font-size: 11px; color: #9ca3af; text-align: center; line-height: 1.5;">
              Nisha Fashions Wear • 92, Moneswar Road, Zigatola, Dhaka-1209, Bangladesh<br>
              Inquiries: info@nishafashions.com • Merchandising: nazib@nishafashions.com
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `;
}
