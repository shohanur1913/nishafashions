"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { 
  Building, 
  Mail, 
  Lock, 
  Server, 
  Send, 
  Save, 
  CheckCircle2, 
  AlertCircle, 
  ShieldCheck, 
  Loader2,
  Upload,
  Image as ImageIcon,
  Globe,
  RefreshCw,
  X,
  Megaphone
} from "lucide-react";
import { 
  saveSiteSettingsAction, 
  saveSmtpSettingsAction, 
  sendTestEmailAction, 
  handleUpdateProfile 
} from "@/actions/admin";
import { NoticeBar } from "@/components/website/notice-bar";

interface SettingsClientProps {
  settings: Record<string, string>;
  adminUser: { id: number; name: string; email: string; role: string };
}

export function SettingsClient({ settings, adminUser }: SettingsClientProps) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<"general" | "notice" | "mail" | "security">("general");

  // Notice Bar state
  const [noticeData, setNoticeData] = useState({
    notice_enabled: settings.notice_enabled ?? "true",
    notice_text: settings.notice_text ?? "🚧 Website Maintenance: We are currently upgrading our website. If you encounter any temporary issues, please bear with us.",
    notice_mode: settings.notice_mode ?? "auto",
    notice_position: settings.notice_position ?? "top",
    notice_variant: settings.notice_variant ?? "amber",
    notice_speed: settings.notice_speed ?? "normal",
    notice_link: settings.notice_link ?? "/contact",
    notice_link_text: settings.notice_link_text ?? "Contact Support",
  });
  const [savingNotice, setSavingNotice] = useState(false);

  const handleSaveNotice = async (e: React.FormEvent) => {
    e.preventDefault();
    setSavingNotice(true);
    setStatusMsg(null);

    try {
      const res = await saveSiteSettingsAction(noticeData);
      if (res.success) {
        setStatusMsg({ type: "success", text: "Notice bar settings saved successfully." });
        router.refresh();
      } else {
        setStatusMsg({ type: "error", text: "Failed to save notice bar settings." });
      }
    } catch (err: any) {
      setStatusMsg({ type: "error", text: err.message || "An error occurred." });
    } finally {
      setSavingNotice(false);
    }
  };

  // Logo & Favicon upload state
  const [logoUploading, setLogoUploading] = useState(false);
  const [faviconUploading, setFaviconUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const logoInputRef = useRef<HTMLInputElement>(null);
  const faviconInputRef = useRef<HTMLInputElement>(null);

  // General Settings state
  const [formData, setFormData] = useState<Record<string, string>>({
    site_name: settings.site_name || "Nisha Fashions Wear",
    short_name: settings.short_name || "NFW",
    header_logo_url: settings.header_logo_url || "/images/logo.jpg",
    favicon_url: settings.favicon_url || "/favicon.ico",
    brand_color: settings.brand_color || settings.theme_color || "#E94D65",
    theme_color: settings.theme_color || settings.brand_color || "#E94D65",
    tagline: settings.tagline || "Bangladesh Apparel Supplier & Sourcing Partner",
    experience: settings.experience || "20+ years of garment business experience",
    contact_email: settings.contact_email || "info@nishafashions.com",
    merchandiser_email: settings.merchandiser_email || "nazib@nishafashions.com",
    alt_email: settings.alt_email || "nisha.fashions@gmail.com",
    phone_display: settings.phone_display || "+88 01715 645766",
    phone_e164: settings.phone_e164 || "+8801715645766",
    whatsapp: settings.whatsapp || "+8801715645766",
    address_street: settings.address_street || "92, Moneswar Road, Zigatola",
    address_locality: settings.address_locality || "Dhaka",
    address_postal: settings.address_postal || "1209",
    address_country: settings.address_country || "BD",
  });

  const handleFileUpload = async (file: File, type: "logo" | "favicon") => {
    if (type === "logo") setLogoUploading(true);
    if (type === "favicon") setFaviconUploading(true);
    setUploadError(null);

    const fd = new FormData();
    fd.append("file", file);
    fd.append("altText", type === "logo" ? "Company Logo" : "Favicon Icon");

    try {
      const res = await fetch("/api/upload", { method: "POST", body: fd });
      const data = await res.json();
      if (res.ok && data.success) {
        if (type === "logo") {
          setFormData((prev) => ({ ...prev, header_logo_url: data.url }));
          setStatusMsg({
            type: "success",
            text: "Company logo uploaded! Click 'Save Changes' below to apply to the website.",
          });
        } else {
          setFormData((prev) => ({ ...prev, favicon_url: data.url }));
          setStatusMsg({
            type: "success",
            text: "Favicon uploaded! Click 'Save Changes' below to apply to the website.",
          });
        }
      } else {
        setUploadError(data.error || "Upload failed");
      }
    } catch (err: any) {
      setUploadError(err.message || "Upload failed");
    } finally {
      if (type === "logo") setLogoUploading(false);
      if (type === "favicon") setFaviconUploading(false);
    }
  };

  const handleBrandColorChange = (newColor: string) => {
    setFormData((prev) => ({
      ...prev,
      brand_color: newColor,
      theme_color: newColor,
    }));
  };

  // SMTP Settings state
  const [smtpData, setSmtpData] = useState({
    host: settings.smtp_host || "",
    port: settings.smtp_port || "587",
    secure: settings.smtp_secure || "tls",
    user: settings.smtp_user || "",
    pass: settings.smtp_pass || "",
    fromName: settings.smtp_from_name || settings.site_name || "Nisha Fashions Wear",
    fromEmail: settings.smtp_from_email || settings.contact_email || "info@nishafashions.com",
  });

  const isSmtpReady = Boolean(smtpData.host && smtpData.user && smtpData.pass);

  // Test Mail state
  const [testRecipient, setTestRecipient] = useState(adminUser.email || "");
  const [sendingTest, setSendingTest] = useState(false);
  const [testResult, setTestResult] = useState<{ success: boolean; message: string } | null>(null);

  // Admin security state
  const [adminName, setAdminName] = useState(adminUser.name);
  const [adminEmail, setAdminEmail] = useState(adminUser.email);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const [savingSettings, setSavingSettings] = useState(false);
  const [savingSmtp, setSavingSmtp] = useState(false);
  const [savingProfile, setSavingProfile] = useState(false);
  const [statusMsg, setStatusMsg] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    setSavingSettings(true);
    setStatusMsg(null);

    try {
      const res = await saveSiteSettingsAction(formData);
      if (res.success) {
        setStatusMsg({ type: "success", text: "Settings saved successfully." });
        router.refresh();
      } else {
        setStatusMsg({ type: "error", text: "Failed to save settings." });
      }
    } catch (err: any) {
      setStatusMsg({ type: "error", text: err.message || "An error occurred." });
    } finally {
      setSavingSettings(false);
    }
  };

  const handleSaveSmtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setSavingSmtp(true);
    setStatusMsg(null);

    try {
      const res = await saveSmtpSettingsAction(smtpData);
      if (res.success) {
        setStatusMsg({ type: "success", text: "SMTP configuration saved." });
        router.refresh();
      } else {
        setStatusMsg({ type: "error", text: "Failed to save SMTP settings." });
      }
    } catch (err: any) {
      setStatusMsg({ type: "error", text: err.message || "An error occurred." });
    } finally {
      setSavingSmtp(false);
    }
  };

  const handleSendTestMail = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!testRecipient) {
      alert("Please enter a recipient email address.");
      return;
    }

    setSendingTest(true);
    setTestResult(null);

    try {
      const res = await sendTestEmailAction(testRecipient);
      if (res.success) {
        setTestResult({
          success: true,
          message: `Verification message sent to ${testRecipient}.`,
        });
      } else {
        setTestResult({
          success: false,
          message: res.error || "Authentication failed. Verify host, port, username, and password.",
        });
      }
    } catch (err: any) {
      setTestResult({
        success: false,
        message: err.message || "Failed to initiate SMTP test.",
      });
    } finally {
      setSendingTest(false);
    }
  };

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setSavingProfile(true);
    setStatusMsg(null);

    const fData = new FormData();
    fData.append("name", adminName);
    fData.append("email", adminEmail);
    if (newPassword) {
      fData.append("currentPassword", currentPassword);
      fData.append("newPassword", newPassword);
    }

    try {
      const res = await handleUpdateProfile(fData);
      if (res.success) {
        setStatusMsg({ type: "success", text: "Credentials updated successfully." });
        setCurrentPassword("");
        setNewPassword("");
        router.refresh();
      } else {
        setStatusMsg({ type: "error", text: res.error || "Failed to update profile." });
      }
    } catch (err: any) {
      setStatusMsg({ type: "error", text: err.message || "An error occurred." });
    } finally {
      setSavingProfile(false);
    }
  };

  return (
    <div className="space-y-6 w-full min-w-0 max-w-4xl mx-auto">
      
      {/* Tab Navigation */}
      <div className="flex flex-wrap items-center gap-2 p-1.5 rounded-2xl bg-muted/40 border border-border/60">
        <button
          type="button"
          onClick={() => { setActiveTab("general"); setStatusMsg(null); }}
          className={`px-4 py-2 rounded-xl text-xs font-semibold cursor-pointer transition-all flex items-center gap-2 ${
            activeTab === "general"
              ? "bg-card text-foreground shadow-xs border border-border/80"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          <Building className="w-4 h-4 text-primary" />
          <span>General Settings</span>
        </button>

        <button
          type="button"
          onClick={() => { setActiveTab("mail"); setStatusMsg(null); }}
          className={`px-4 py-2 rounded-xl text-xs font-semibold cursor-pointer transition-all flex items-center gap-2 ${
            activeTab === "mail"
              ? "bg-card text-foreground shadow-xs border border-border/80"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          <Mail className="w-4 h-4 text-primary" />
          <span>SMTP Server</span>
          <span className={`w-2 h-2 rounded-full ${isSmtpReady ? "bg-emerald-500" : "bg-amber-400"}`} />
        </button>

        <button
          type="button"
          onClick={() => { setActiveTab("notice"); setStatusMsg(null); }}
          className={`px-4 py-2 rounded-xl text-xs font-semibold cursor-pointer transition-all flex items-center gap-2 ${
            activeTab === "notice"
              ? "bg-card text-foreground shadow-xs border border-border/80"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          <Megaphone className="w-4 h-4 text-primary" />
          <span>Notice Bar</span>
          <span className={`w-2 h-2 rounded-full ${noticeData.notice_enabled === "true" || noticeData.notice_enabled === "1" ? "bg-emerald-500" : "bg-zinc-400"}`} />
        </button>

        <button
          type="button"
          onClick={() => { setActiveTab("security"); setStatusMsg(null); }}
          className={`px-4 py-2 rounded-xl text-xs font-semibold cursor-pointer transition-all flex items-center gap-2 ${
            activeTab === "security"
              ? "bg-card text-foreground shadow-xs border border-border/80"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          <Lock className="w-4 h-4 text-muted-foreground" />
          <span>Security</span>
        </button>
      </div>

      {/* Global Status Notification */}
      {statusMsg && (
        <div className={`p-4 rounded-xl flex items-center gap-3 text-xs ${
          statusMsg.type === "success" 
            ? "bg-emerald-500/10 border border-emerald-500/20 text-emerald-700 dark:text-emerald-400" 
            : "bg-red-500/10 border border-red-500/20 text-red-600 dark:text-red-400"
        }`}>
          {statusMsg.type === "success" ? <CheckCircle2 className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
          <span>{statusMsg.text}</span>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 1. GENERAL BUSINESS INFO TAB (DEFAULT) */}
      {/* ========================================================================= */}
      {activeTab === "general" && (
        <form onSubmit={handleSaveSettings} className="p-5 sm:p-7 rounded-3xl bg-card border border-border/80 shadow-xs space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border/60 pb-3">
            <div className="flex items-center gap-2.5">
              <Building className="w-5 h-5 text-foreground shrink-0" />
              <h3 className="text-base sm:text-lg font-semibold text-foreground tracking-tight">
                General Business Settings
              </h3>
            </div>

            <button
              type="submit"
              disabled={savingSettings}
              className="px-4 py-2 rounded-xl bg-foreground text-background font-semibold text-xs uppercase tracking-wider hover:bg-foreground/90 transition-all flex items-center gap-2 cursor-pointer disabled:opacity-50 shrink-0 self-start sm:self-auto"
            >
              <Save className="w-3.5 h-3.5" />
              <span>{savingSettings ? "Saving..." : "Save Settings"}</span>
            </button>
          </div>

          {/* Brand Identity: Website Logo & Favicon Upload */}
          <div className="p-5 rounded-2xl bg-muted/30 border border-border/80 space-y-4">
            <div>
              <h4 className="text-sm font-semibold text-foreground tracking-tight flex items-center gap-2">
                <ImageIcon className="w-4 h-4 text-primary" />
                <span>Brand Identity: Logo &amp; Favicon</span>
              </h4>
              <p className="text-xs text-muted-foreground mt-0.5">
                Upload your official company logo for the header/footer and browser favicon
              </p>
            </div>

            {uploadError && (
              <p className="text-xs text-red-500 font-medium">{uploadError}</p>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-2">
              {/* Header Logo */}
              <div className="space-y-3">
                <label className="text-xs font-semibold text-foreground block">
                  Website Header Logo
                </label>

                <div className="flex items-center gap-3">
                  <div className="w-24 h-16 rounded-xl border border-border bg-white dark:bg-zinc-900 p-2 flex items-center justify-center shrink-0 overflow-hidden shadow-2xs">
                    {logoUploading ? (
                      <Loader2 className="w-5 h-5 animate-spin text-primary" />
                    ) : formData.header_logo_url ? (
                      <img
                        src={formData.header_logo_url}
                        alt="Header Logo Preview"
                        className="max-h-full max-w-full object-contain"
                      />
                    ) : (
                      <ImageIcon className="w-6 h-6 text-muted-foreground/40" />
                    )}
                  </div>

                  <div className="space-y-1.5 flex-1">
                    <input
                      ref={logoInputRef}
                      type="file"
                      accept="image/jpeg,image/png,image/webp,image/svg+xml"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) handleFileUpload(file, "logo");
                        e.target.value = "";
                      }}
                      className="hidden"
                    />

                    <button
                      type="button"
                      onClick={() => logoInputRef.current?.click()}
                      disabled={logoUploading}
                      className="w-full py-1.5 px-3 rounded-lg border border-border hover:bg-muted text-xs font-medium text-foreground transition-all flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-50"
                    >
                      {logoUploading ? (
                        <>
                          <Loader2 className="w-3.5 h-3.5 animate-spin" />
                          <span>Uploading...</span>
                        </>
                      ) : (
                        <>
                          <Upload className="w-3.5 h-3.5" />
                          <span>Upload Logo</span>
                        </>
                      )}
                    </button>

                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, header_logo_url: "/images/logo.jpg" })}
                      className="text-[10px] text-muted-foreground hover:text-foreground underline block"
                    >
                      Reset to default
                    </button>
                  </div>
                </div>

                <input
                  type="text"
                  value={formData.header_logo_url}
                  onChange={(e) => setFormData({ ...formData, header_logo_url: e.target.value })}
                  placeholder="/images/logo.jpg or https://..."
                  className="w-full px-3 py-1.5 bg-background border border-border rounded-xl text-xs font-mono text-foreground focus:outline-none focus:border-foreground"
                />
              </div>

              {/* Favicon */}
              <div className="space-y-3">
                <label className="text-xs font-semibold text-foreground block">
                  Browser Tab Favicon (.ico, .png, .svg)
                </label>

                <div className="flex items-center gap-3">
                  <div className="w-16 h-16 rounded-xl border border-border bg-white dark:bg-zinc-900 p-2 flex items-center justify-center shrink-0 overflow-hidden shadow-2xs">
                    {faviconUploading ? (
                      <Loader2 className="w-5 h-5 animate-spin text-primary" />
                    ) : formData.favicon_url ? (
                      <img
                        src={formData.favicon_url}
                        alt="Favicon Preview"
                        className="w-8 h-8 object-contain"
                      />
                    ) : (
                      <Globe className="w-6 h-6 text-muted-foreground/40" />
                    )}
                  </div>

                  <div className="space-y-1.5 flex-1">
                    <input
                      ref={faviconInputRef}
                      type="file"
                      accept="image/x-icon,image/png,image/svg+xml,image/jpeg"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) handleFileUpload(file, "favicon");
                        e.target.value = "";
                      }}
                      className="hidden"
                    />

                    <button
                      type="button"
                      onClick={() => faviconInputRef.current?.click()}
                      disabled={faviconUploading}
                      className="w-full py-1.5 px-3 rounded-lg border border-border hover:bg-muted text-xs font-medium text-foreground transition-all flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-50"
                    >
                      {faviconUploading ? (
                        <>
                          <Loader2 className="w-3.5 h-3.5 animate-spin" />
                          <span>Uploading...</span>
                        </>
                      ) : (
                        <>
                          <Upload className="w-3.5 h-3.5" />
                          <span>Upload Favicon</span>
                        </>
                      )}
                    </button>

                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, favicon_url: "/favicon.ico" })}
                      className="text-[10px] text-muted-foreground hover:text-foreground underline block"
                    >
                      Reset to default
                    </button>
                  </div>
                </div>

                <input
                  type="text"
                  value={formData.favicon_url}
                  onChange={(e) => setFormData({ ...formData, favicon_url: e.target.value })}
                  placeholder="/favicon.ico or https://..."
                  className="w-full px-3 py-1.5 bg-background border border-border rounded-xl text-xs font-mono text-foreground focus:outline-none focus:border-foreground"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-foreground block">Company Legal Name</label>
              <input
                type="text"
                value={formData.site_name}
                onChange={(e) => setFormData({ ...formData, site_name: e.target.value })}
                className="w-full px-3.5 py-2 bg-background border border-border rounded-xl text-xs text-foreground focus:outline-none focus:border-foreground"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-medium text-foreground block">Short Abbreviation</label>
              <input
                type="text"
                value={formData.short_name}
                onChange={(e) => setFormData({ ...formData, short_name: e.target.value })}
                className="w-full px-3.5 py-2 bg-background border border-border rounded-xl text-xs text-foreground focus:outline-none focus:border-foreground"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Direct Brand / Theme Color Control (Simple & Clear) */}
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-foreground flex items-center justify-between">
                <span>Brand &amp; Theme Color</span>
                <span className="text-[10px] text-muted-foreground font-mono">{formData.brand_color || "#E94D65"}</span>
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={formData.brand_color || "#E94D65"}
                  onChange={(e) => handleBrandColorChange(e.target.value.toUpperCase())}
                  className="w-9 h-9 rounded-xl border border-border cursor-pointer bg-transparent p-0.5 shrink-0"
                />
                <input
                  type="text"
                  maxLength={7}
                  value={formData.brand_color || "#E94D65"}
                  onChange={(e) => handleBrandColorChange(e.target.value.toUpperCase())}
                  className="flex-1 px-3.5 py-2 bg-background border border-border rounded-xl text-xs font-mono font-semibold text-foreground uppercase"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-medium text-foreground block">Experience Badge</label>
              <input
                type="text"
                value={formData.experience}
                onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                className="w-full px-3.5 py-2 bg-background border border-border rounded-xl text-xs text-foreground focus:outline-none focus:border-foreground"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-medium text-foreground block">Tagline</label>
            <input
              type="text"
              value={formData.tagline}
              onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
              className="w-full px-3.5 py-2 bg-background border border-border rounded-xl text-xs text-foreground focus:outline-none focus:border-foreground"
            />
          </div>

          {/* Communication inboxes */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-foreground block">Primary RFQ Email</label>
              <input
                type="email"
                value={formData.contact_email}
                onChange={(e) => setFormData({ ...formData, contact_email: e.target.value })}
                className="w-full px-3.5 py-2 bg-background border border-border rounded-xl text-xs text-foreground"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-medium text-foreground block">Merchandiser Desk Email</label>
              <input
                type="email"
                value={formData.merchandiser_email}
                onChange={(e) => setFormData({ ...formData, merchandiser_email: e.target.value })}
                className="w-full px-3.5 py-2 bg-background border border-border rounded-xl text-xs text-foreground"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-medium text-foreground block">Alternative Email</label>
              <input
                type="email"
                value={formData.alt_email}
                onChange={(e) => setFormData({ ...formData, alt_email: e.target.value })}
                className="w-full px-3.5 py-2 bg-background border border-border rounded-xl text-xs text-foreground"
              />
            </div>
          </div>

          {/* Phones & WhatsApp */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-foreground block">Display Phone</label>
              <input
                type="text"
                value={formData.phone_display}
                onChange={(e) => setFormData({ ...formData, phone_display: e.target.value })}
                className="w-full px-3.5 py-2 bg-background border border-border rounded-xl text-xs text-foreground"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-medium text-foreground block">WhatsApp Number</label>
              <input
                type="text"
                value={formData.whatsapp}
                onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                className="w-full px-3.5 py-2 bg-background border border-border rounded-xl text-xs text-foreground font-mono"
              />
            </div>
          </div>

          {/* Address */}
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-foreground block">Registered Office Street Address</label>
            <input
              type="text"
              value={formData.address_street}
              onChange={(e) => setFormData({ ...formData, address_street: e.target.value })}
              className="w-full px-3.5 py-2 bg-background border border-border rounded-xl text-xs text-foreground"
            />
          </div>
        </form>
      )}

      {/* ========================================================================= */}
      {/* 2. SMTP SERVER TAB (CLEAN, NO PRESETS, NO HELPER DESCRIPTIONS) */}
      {/* ========================================================================= */}
      {activeTab === "mail" && (
        <div className="space-y-6">
          <form onSubmit={handleSaveSmtp} className="p-5 sm:p-7 rounded-3xl bg-card border border-border/80 shadow-xs space-y-6">
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border/60 pb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                  <Server className="w-5 h-5" />
                </div>
                <div className="flex items-center gap-2">
                  <h3 className="text-base sm:text-lg font-semibold text-foreground tracking-tight">
                    Outbound SMTP Server Setup
                  </h3>
                  <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                    isSmtpReady
                      ? "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-500/20"
                      : "bg-amber-500/10 text-amber-700 dark:text-amber-400 border border-amber-500/20"
                  }`}>
                    {isSmtpReady ? "Configured" : "Action Needed"}
                  </span>
                </div>
              </div>

              <button
                type="submit"
                disabled={savingSmtp}
                className="px-4 py-2.5 rounded-xl bg-foreground text-background font-semibold text-xs uppercase tracking-wider hover:bg-foreground/90 transition-all flex items-center gap-2 cursor-pointer disabled:opacity-50 shrink-0 self-start sm:self-auto shadow-xs"
              >
                <Save className="w-3.5 h-3.5" />
                <span>{savingSmtp ? "Saving..." : "Save SMTP Settings"}</span>
              </button>
            </div>

            {/* Server Connection Inputs */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="sm:col-span-2 space-y-1.5">
                <label className="text-xs font-medium text-foreground block">
                  SMTP Host Server <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="mail.nishafashions.com"
                  value={smtpData.host}
                  onChange={(e) => setSmtpData({ ...smtpData, host: e.target.value })}
                  className="w-full px-3.5 py-2 bg-background border border-border rounded-xl text-xs text-foreground focus:outline-none focus:border-foreground font-mono"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-medium text-foreground block">
                  Port Number <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  required
                  placeholder="587"
                  value={smtpData.port}
                  onChange={(e) => setSmtpData({ ...smtpData, port: e.target.value })}
                  className="w-full px-3.5 py-2 bg-background border border-border rounded-xl text-xs text-foreground focus:outline-none focus:border-foreground font-mono"
                />
              </div>
            </div>

            {/* Encryption & Security Protocol (Clean: No verbose descriptions) */}
            <div className="space-y-2">
              <label className="text-xs font-medium text-foreground block">
                Security Protocol
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <label
                  onClick={() => setSmtpData({ ...smtpData, secure: "tls" })}
                  className={`p-3 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                    smtpData.secure === "tls"
                      ? "bg-foreground/5 border-foreground text-foreground font-semibold"
                      : "bg-background border-border text-muted-foreground hover:border-foreground/40"
                  }`}
                >
                  <span className="text-xs">STARTTLS (Port 587)</span>
                  <input
                    type="radio"
                    name="smtp_secure"
                    checked={smtpData.secure === "tls"}
                    onChange={() => {}}
                    className="accent-foreground"
                  />
                </label>

                <label
                  onClick={() => setSmtpData({ ...smtpData, secure: "ssl" })}
                  className={`p-3 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                    smtpData.secure === "ssl"
                      ? "bg-foreground/5 border-foreground text-foreground font-semibold"
                      : "bg-background border-border text-muted-foreground hover:border-foreground/40"
                  }`}
                >
                  <span className="text-xs">SSL / TLS (Port 465)</span>
                  <input
                    type="radio"
                    name="smtp_secure"
                    checked={smtpData.secure === "ssl"}
                    onChange={() => {}}
                    className="accent-foreground"
                  />
                </label>
              </div>
            </div>

            {/* Authentication Credentials */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-foreground block">
                  SMTP Username / Email <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="info@nishafashions.com"
                  value={smtpData.user}
                  onChange={(e) => setSmtpData({ ...smtpData, user: e.target.value })}
                  className="w-full px-3.5 py-2 bg-background border border-border rounded-xl text-xs text-foreground focus:outline-none focus:border-foreground font-mono"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-medium text-foreground block">
                  SMTP Password <span className="text-red-500">*</span>
                </label>
                <input
                  type="password"
                  placeholder={smtpData.pass ? "••••••••" : "Password"}
                  value={smtpData.pass}
                  onChange={(e) => setSmtpData({ ...smtpData, pass: e.target.value })}
                  className="w-full px-3.5 py-2 bg-background border border-border rounded-xl text-xs text-foreground focus:outline-none focus:border-foreground font-mono"
                />
              </div>
            </div>

            {/* Outbound Sender Details */}
            <div className="p-4 rounded-2xl bg-muted/30 border border-border/50 space-y-4">
              <h4 className="text-xs font-semibold text-foreground uppercase tracking-wider flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-primary" />
                <span>Outbound Sender Details</span>
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-foreground block">Sender Display Name</label>
                  <input
                    type="text"
                    placeholder="Nisha Fashions Wear"
                    value={smtpData.fromName}
                    onChange={(e) => setSmtpData({ ...smtpData, fromName: e.target.value })}
                    className="w-full px-3.5 py-2 bg-background border border-border rounded-xl text-xs text-foreground focus:outline-none focus:border-foreground"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-foreground block">From Email Address</label>
                  <input
                    type="email"
                    placeholder="info@nishafashions.com"
                    value={smtpData.fromEmail}
                    onChange={(e) => setSmtpData({ ...smtpData, fromEmail: e.target.value })}
                    className="w-full px-3.5 py-2 bg-background border border-border rounded-xl text-xs text-foreground focus:outline-none focus:border-foreground"
                  />
                </div>
              </div>
            </div>

          </form>

          {/* Test Email Card */}
          <div className="p-5 sm:p-7 rounded-3xl bg-card border border-border/80 shadow-xs space-y-4">
            <div className="flex items-center gap-2.5 border-b border-border/60 pb-3">
              <Send className="w-5 h-5 text-primary" />
              <h3 className="text-base sm:text-lg font-semibold text-foreground tracking-tight">
                Verify &amp; Send Test Email
              </h3>
            </div>

            <form onSubmit={handleSendTestMail} className="flex flex-col sm:flex-row items-center gap-3">
              <input
                type="email"
                required
                placeholder="Recipient email address"
                value={testRecipient}
                onChange={(e) => setTestRecipient(e.target.value)}
                className="w-full sm:flex-1 px-3.5 py-2.5 bg-background border border-border rounded-xl text-xs text-foreground focus:outline-none focus:border-foreground font-mono"
              />
              <button
                type="submit"
                disabled={sendingTest}
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-foreground text-background font-semibold text-xs uppercase tracking-wider hover:bg-foreground/90 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 shrink-0"
              >
                {sendingTest ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-3.5 h-3.5" />}
                <span>{sendingTest ? "Testing..." : "Send Test Email"}</span>
              </button>
            </form>

            {testResult && (
              <div className={`p-4 rounded-xl flex items-start gap-2.5 text-xs animate-in fade-in duration-150 ${
                testResult.success
                  ? "bg-emerald-500/10 border border-emerald-500/20 text-emerald-700 dark:text-emerald-400"
                  : "bg-red-500/10 border border-red-500/20 text-red-600 dark:text-red-400"
              }`}>
                {testResult.success ? <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" /> : <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />}
                <span>{testResult.message}</span>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 3. ADMIN SECURITY & PASSWORD TAB */}
      {/* ========================================================================= */}
      {activeTab === "security" && (
        <form onSubmit={handleSaveProfile} className="p-5 sm:p-7 rounded-3xl bg-card border border-border/80 shadow-xs space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border/60 pb-3">
            <div className="flex items-center gap-2.5">
              <Lock className="w-5 h-5 text-foreground shrink-0" />
              <h3 className="text-base sm:text-lg font-semibold text-foreground tracking-tight">
                Admin Authentication &amp; Password
              </h3>
            </div>

            <button
              type="submit"
              disabled={savingProfile}
              className="px-4 py-2 rounded-xl bg-foreground text-background font-semibold text-xs uppercase tracking-wider hover:bg-foreground/90 transition-all flex items-center gap-2 cursor-pointer disabled:opacity-50 shrink-0 self-start sm:self-auto"
            >
              <Save className="w-3.5 h-3.5" />
              <span>{savingProfile ? "Updating..." : "Update Credentials"}</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-foreground block">Admin Full Name</label>
              <input
                type="text"
                value={adminName}
                onChange={(e) => setAdminName(e.target.value)}
                className="w-full px-3.5 py-2 bg-background border border-border rounded-xl text-xs text-foreground focus:outline-none focus:border-foreground"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-medium text-foreground block">Admin Login Email</label>
              <input
                type="email"
                value={adminEmail}
                onChange={(e) => setAdminEmail(e.target.value)}
                className="w-full px-3.5 py-2 bg-background border border-border rounded-xl text-xs text-foreground focus:outline-none focus:border-foreground"
              />
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-muted/40 border border-border/50 space-y-3">
            <h4 className="text-xs font-semibold text-foreground uppercase tracking-wider">
              Change Password
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-foreground block">Current Password</label>
                <input
                  type="password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  placeholder="Current password"
                  className="w-full px-3.5 py-2 bg-background border border-border rounded-xl text-xs text-foreground"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-medium text-foreground block">New Password</label>
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="New password"
                  className="w-full px-3.5 py-2 bg-background border border-border rounded-xl text-xs text-foreground"
                />
              </div>
            </div>
          </div>
        </form>
      )}

      {/* ========================================================================= */}
      {/* NOTICE BAR SETTINGS TAB */}
      {/* ========================================================================= */}
      {activeTab === "notice" && (
        <form onSubmit={handleSaveNotice} className="p-5 sm:p-7 rounded-3xl bg-card border border-border/80 shadow-xs space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border/60 pb-3">
            <div className="flex items-center gap-2.5">
              <Megaphone className="w-5 h-5 text-primary" />
              <div>
                <h3 className="text-base font-bold text-foreground">Header Notice Bar</h3>
                <p className="text-xs text-muted-foreground">
                  Configure an announcement or ticker notice bar above or below the website header.
                </p>
              </div>
            </div>

            <button
              type="submit"
              disabled={savingNotice}
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-primary-foreground font-semibold text-xs shadow-xs hover:bg-primary/90 transition-all disabled:opacity-50 cursor-pointer self-start sm:self-auto shrink-0"
            >
              {savingNotice ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Save className="w-3.5 h-3.5" />}
              <span>{savingNotice ? "Saving..." : "Save Notice Settings"}</span>
            </button>
          </div>

          {/* Live Preview Card */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
                <span>Live Interactive Preview</span>
                <span className="px-1.5 py-0.5 rounded text-[10px] bg-primary/10 text-primary font-medium">Realtime</span>
              </label>
              <span className="text-[11px] font-medium text-muted-foreground">
                {noticeData.notice_enabled === "true" || noticeData.notice_enabled === "1" ? "🟢 Active on site" : "⚪ Disabled"}
              </span>
            </div>

            <div className="p-3 bg-muted/30 border border-border/80 rounded-2xl overflow-hidden space-y-2">
              <div className="text-[11px] font-medium text-muted-foreground flex items-center justify-between px-1">
                <span>Placement: <strong className="text-foreground capitalize">{noticeData.notice_position === "top" ? "Top of Header" : "Below Header"}</strong></span>
                <span>Mode: <strong className="text-foreground capitalize">{noticeData.notice_mode}</strong></span>
              </div>
              <div className="rounded-xl overflow-hidden border border-border shadow-xs">
                <NoticeBar settings={noticeData} previewMode={true} />
              </div>
              <p className="text-[11px] text-muted-foreground italic px-1">
                * Hovering over the notice automatically pauses the ticker for comfortable reading.
              </p>
            </div>
          </div>

          {/* Controls Grid */}
          <div className="space-y-4 pt-2">
            {/* Enable / Disable Toggle */}
            <div className="flex items-center justify-between p-4 rounded-2xl bg-muted/20 border border-border/60">
              <div>
                <label className="text-xs font-semibold text-foreground block">
                  Enable Notice Bar
                </label>
                <p className="text-[11px] text-muted-foreground">
                  Toggle to show or hide the notice banner on the live website.
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={noticeData.notice_enabled === "true" || noticeData.notice_enabled === "1"}
                  onChange={(e) => setNoticeData(prev => ({ ...prev, notice_enabled: e.target.checked ? "true" : "false" }))}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-muted peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
              </label>
            </div>

            {/* Notice Text */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="text-xs font-medium text-foreground block">
                  Notice Message <span className="text-red-500">*</span>
                </label>
                <span className="text-[11px] text-muted-foreground">
                  {noticeData.notice_text.length} characters
                </span>
              </div>
              <textarea
                rows={3}
                value={noticeData.notice_text}
                onChange={(e) => setNoticeData(prev => ({ ...prev, notice_text: e.target.value }))}
                placeholder="Write your notice or announcement here..."
                className="w-full px-3.5 py-2.5 bg-background border border-border rounded-xl text-xs text-foreground focus:outline-none focus:border-foreground transition-all resize-y"
              />
              <p className="text-[11px] text-muted-foreground">
                In &apos;Auto&apos; mode, messages of 55 characters or fewer stay static and centered, while longer messages scroll continuously.
              </p>
            </div>

            {/* Mode & Position & Theme Variant Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {/* Display Mode */}
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-foreground block">
                  Display Mode
                </label>
                <select
                  value={noticeData.notice_mode}
                  onChange={(e) => setNoticeData(prev => ({ ...prev, notice_mode: e.target.value }))}
                  className="w-full px-3.5 py-2 bg-background border border-border rounded-xl text-xs text-foreground focus:outline-none focus:border-foreground"
                >
                  <option value="auto">Auto (Static for short text, Rolling for long text)</option>
                  <option value="rolling">Rolling / Ticker (Continuous marquee animation)</option>
                  <option value="static">Static (Fixed centered text, no scrolling)</option>
                </select>
              </div>

              {/* Position */}
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-foreground block">
                  Position
                </label>
                <select
                  value={noticeData.notice_position}
                  onChange={(e) => setNoticeData(prev => ({ ...prev, notice_position: e.target.value }))}
                  className="w-full px-3.5 py-2 bg-background border border-border rounded-xl text-xs text-foreground focus:outline-none focus:border-foreground"
                >
                  <option value="top">Header Top (Above navigation)</option>
                  <option value="bottom">Below Header (Under navigation)</option>
                </select>
              </div>

              {/* Theme Variant */}
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-foreground block">
                  Color Theme
                </label>
                <select
                  value={noticeData.notice_variant}
                  onChange={(e) => setNoticeData(prev => ({ ...prev, notice_variant: e.target.value }))}
                  className="w-full px-3.5 py-2 bg-background border border-border rounded-xl text-xs text-foreground focus:outline-none focus:border-foreground"
                >
                  <option value="primary">Brand Theme Color (Website Primary)</option>
                  <option value="dark">Dark Slate (Clean Black)</option>
                  <option value="amber">Amber / Alert (High-Visibility Warning)</option>
                  <option value="emerald">Emerald Green (Success / Bookings)</option>
                </select>
              </div>
            </div>

            {/* Speed & Optional Link Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {/* Scroll Speed */}
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-foreground block">
                  Scroll Speed
                </label>
                <select
                  value={noticeData.notice_speed}
                  onChange={(e) => setNoticeData(prev => ({ ...prev, notice_speed: e.target.value }))}
                  disabled={noticeData.notice_mode === "static"}
                  className="w-full px-3.5 py-2 bg-background border border-border rounded-xl text-xs text-foreground focus:outline-none focus:border-foreground disabled:opacity-50"
                >
                  <option value="slow">Slow (42s)</option>
                  <option value="normal">Normal (28s - Default)</option>
                  <option value="fast">Fast (18s)</option>
                </select>
              </div>

              {/* Optional Link URL */}
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-foreground block">
                  Action Link URL (Optional)
                </label>
                <input
                  type="text"
                  value={noticeData.notice_link}
                  onChange={(e) => setNoticeData(prev => ({ ...prev, notice_link: e.target.value }))}
                  placeholder="/contact or https://..."
                  className="w-full px-3.5 py-2 bg-background border border-border rounded-xl text-xs text-foreground focus:outline-none focus:border-foreground"
                />
              </div>

              {/* Action Link Text */}
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-foreground block">
                  Button Text
                </label>
                <input
                  type="text"
                  value={noticeData.notice_link_text}
                  onChange={(e) => setNoticeData(prev => ({ ...prev, notice_link_text: e.target.value }))}
                  placeholder="e.g. Contact Support"
                  className="w-full px-3.5 py-2 bg-background border border-border rounded-xl text-xs text-foreground focus:outline-none focus:border-foreground"
                />
              </div>
            </div>
          </div>
        </form>
      )}

    </div>
  );
}

export default SettingsClient;
