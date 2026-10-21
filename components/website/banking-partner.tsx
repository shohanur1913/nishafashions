"use client";

import { useState } from "react";
import NextImage from "next/image";
import { motion } from "framer-motion";
import { 
  Building2, 
  ShieldCheck, 
  Copy, 
  Check, 
  MapPin, 
  Phone, 
  Printer, 
  Mail, 
  FileText,
  ExternalLink
} from "lucide-react";

export interface BankingDetails {
  bankName?: string;
  branch?: string;
  address?: string;
  swift?: string;
  tel?: string;
  fax?: string;
  email?: string;
  logoUrl?: string;
}

interface BankingPartnerProps {
  details?: BankingDetails;
  className?: string;
}

export function BankingPartner({ details, className }: BankingPartnerProps) {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const bankName = details?.bankName || "Premier Bank Ltd.";
  const branch = details?.branch || "Dhanmondi Branch";
  const address = details?.address || "House # 84 (1st Floor), Road # 7/A, Dhanmondi";
  const swift = details?.swift || "PRMRBDDH";
  const tel = details?.tel || "9143081, 8124746, 9145186";
  const fax = details?.fax || "+880-2-9112395";
  const email = details?.email || "prebank@bangla.net";
  const logoUrl = details?.logoUrl || "/images/premier-bank-logo.png";

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => {
      setCopiedKey((prev) => (prev === key ? null : prev));
    }, 2200);
  };

  const copyFullDetails = () => {
    const fullText = [
      `Official Banking Partner: ${bankName}`,
      `Branch: ${branch}`,
      `Address: ${address}, Dhaka, Bangladesh`,
      `SWIFT / BIC Code: ${swift}`,
      `Telephone: ${tel}`,
      `Fax: ${fax}`,
      `Email: ${email}`,
      `Beneficiary: Nisha Fashions Wear`,
      `Trade Purpose: Export Letter of Credit (L/C) & International Apparel Supply Contracts`,
    ].join("\n");
    copyToClipboard(fullText, "full");
  };

  return (
    <section className={`mt-16 sm:mt-24 pt-12 sm:pt-16 border-t border-border/60 ${className || ""}`}>
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="relative rounded-3xl bg-card border border-border/80 p-6 sm:p-10 lg:p-12 shadow-xs overflow-hidden"
      >
        {/* Ambient brand glow */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left Column: Entity & Brand Overview */}
          <div className="lg:col-span-5 space-y-6">
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold uppercase tracking-[0.2em] bg-primary/10 text-primary border border-primary/25">
                <Building2 className="w-3.5 h-3.5 text-primary" />
                Financial Governance
              </span>

              <span className="inline-flex items-center gap-1.5 text-xs font-medium text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>L/C &amp; Trade Verified</span>
              </span>
            </div>

            <div className="space-y-3">
              <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-light text-foreground tracking-tight">
                Official Banking <span className="text-primary italic">Partner</span>.
              </h2>
              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed font-normal">
                All international garment export contracts, commercial Letter of Credit (L/C) negotiations, inward foreign remittances, and trade financing for Nisha Fashions Wear are officially managed through Premier Bank Ltd.
              </p>
            </div>

            {/* Bank Card Presentation */}
            <div className="flex items-center gap-4 p-4 sm:p-5 rounded-2xl bg-muted/40 border border-border/60">
              <div className="bg-white px-4 py-2.5 rounded-xl border border-border/80 shadow-xs inline-flex items-center justify-center shrink-0">
                <NextImage
                  src={logoUrl}
                  alt={`${bankName} Official Logo`}
                  width={190}
                  height={42}
                  className="h-8 w-auto object-contain"
                  priority
                />
              </div>
              <div className="min-w-0">
                <h3 className="font-serif text-base sm:text-lg font-medium text-foreground truncate">
                  {bankName}
                </h3>
                <p className="text-xs sm:text-sm text-muted-foreground font-normal">
                  {branch} · Dhaka
                </p>
              </div>
            </div>

            {/* One-click Copy Full Bank Particulars Button */}
            <div>
              <button
                type="button"
                onClick={copyFullDetails}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 text-xs sm:text-sm font-semibold uppercase tracking-wider transition-all shadow-xs cursor-pointer active:scale-95"
              >
                {copiedKey === "full" ? (
                  <>
                    <Check className="w-4 h-4 text-primary-foreground" />
                    <span>Banking Particulars Copied!</span>
                  </>
                ) : (
                  <>
                    <FileText className="w-4 h-4" />
                    <span>Copy Full Details for L/C Draft</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Right Column: 2x2 Structured Financial Credential Grid */}
          <div className="lg:col-span-7 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              {/* Tile 1: SWIFT / BIC Code */}
              <div className="p-5 rounded-2xl bg-muted/30 border border-border/60 flex flex-col justify-between space-y-3 hover:border-border transition-colors">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    SWIFT / BIC Code
                  </span>
                  <button
                    type="button"
                    onClick={() => copyToClipboard(swift, "swift")}
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-background hover:bg-muted text-foreground text-xs font-medium border border-border/70 shadow-2xs transition-all active:scale-95 cursor-pointer"
                    title="Copy SWIFT code"
                  >
                    {copiedKey === "swift" ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                        <span className="text-emerald-600 dark:text-emerald-400 text-xs">Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5 text-muted-foreground" />
                        <span className="text-xs">Copy</span>
                      </>
                    )}
                  </button>
                </div>
                <div>
                  <span className="block text-2xl font-mono font-bold tracking-wider text-foreground">
                    {swift}
                  </span>
                  <p className="text-xs text-muted-foreground mt-1">
                    Authorized for SWIFT MT700 / MT103 wire settlements
                  </p>
                </div>
              </div>

              {/* Tile 2: Branch Address */}
              <div className="p-5 rounded-2xl bg-muted/30 border border-border/60 flex flex-col justify-between space-y-3 hover:border-border transition-colors">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-primary" />
                    Branch Location
                  </span>
                  <button
                    type="button"
                    onClick={() => copyToClipboard(`${address}, ${branch}`, "address")}
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-background hover:bg-muted text-foreground text-xs font-medium border border-border/70 shadow-2xs transition-all active:scale-95 cursor-pointer"
                    title="Copy address"
                  >
                    {copiedKey === "address" ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                        <span className="text-emerald-600 dark:text-emerald-400 text-xs">Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5 text-muted-foreground" />
                        <span className="text-xs">Copy</span>
                      </>
                    )}
                  </button>
                </div>
                <div>
                  <p className="text-sm sm:text-base font-medium text-foreground leading-snug">
                    {address}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {branch}, Dhaka, Bangladesh
                  </p>
                </div>
              </div>

              {/* Tile 3: Direct Phone & Fax */}
              <div className="p-5 rounded-2xl bg-muted/30 border border-border/60 flex flex-col justify-between space-y-3 hover:border-border transition-colors">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5 text-primary" />
                    Trade Desk Phone &amp; Fax
                  </span>
                </div>
                <div className="space-y-1">
                  <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm font-medium text-foreground">
                    <span className="text-xs text-muted-foreground font-normal">Tel:</span>
                    {tel.split(",").map((t, idx) => {
                      const cleanPhone = t.trim();
                      const dial = cleanPhone.startsWith("+") ? cleanPhone : `+8802${cleanPhone}`;
                      return (
                        <a
                          key={idx}
                          href={`tel:${dial}`}
                          className="hover:text-primary transition-colors underline-offset-2 hover:underline"
                        >
                          {cleanPhone}{idx < tel.split(",").length - 1 ? "," : ""}
                        </a>
                      );
                    })}
                  </div>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Printer className="w-3 h-3 text-muted-foreground shrink-0" />
                    <span>Fax: {fax}</span>
                  </div>
                </div>
              </div>

              {/* Tile 4: Official Email */}
              <div className="p-5 rounded-2xl bg-muted/30 border border-border/60 flex flex-col justify-between space-y-3 hover:border-border transition-colors">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
                    <Mail className="w-3.5 h-3.5 text-primary" />
                    Official Bank Email
                  </span>
                  <button
                    type="button"
                    onClick={() => copyToClipboard(email, "email")}
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-background hover:bg-muted text-foreground text-xs font-medium border border-border/70 shadow-2xs transition-all active:scale-95 cursor-pointer"
                    title="Copy email"
                  >
                    {copiedKey === "email" ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                        <span className="text-emerald-600 dark:text-emerald-400 text-xs">Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5 text-muted-foreground" />
                        <span className="text-xs">Copy</span>
                      </>
                    )}
                  </button>
                </div>
                <div>
                  <a
                    href={`mailto:${email}`}
                    className="text-sm sm:text-base font-medium text-foreground hover:text-primary transition-colors underline-offset-2 hover:underline truncate block"
                  >
                    {email}
                  </a>
                  <p className="text-xs text-muted-foreground mt-1">
                    Direct communications for international trade verification
                  </p>
                </div>
              </div>

            </div>

            {/* Bottom Compliance & Beneficiary Strip */}
            <div className="p-4 rounded-2xl bg-muted/40 border border-border/60 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs sm:text-sm text-muted-foreground">
              <div className="flex items-center gap-2 text-foreground font-medium">
                <ShieldCheck className="w-4 h-4 text-primary shrink-0" />
                <span>Beneficiary Account Name: <strong className="text-foreground font-semibold">Nisha Fashions Wear</strong></span>
              </div>
              <span className="text-xs text-muted-foreground font-normal">
                Central Bank Authorized Dealer · Foreign Exchange Regulation Compliant
              </span>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

export default BankingPartner;
