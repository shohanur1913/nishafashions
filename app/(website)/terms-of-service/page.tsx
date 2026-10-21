import { Metadata } from "next";
import { getPageContent } from "@/lib/content-service";
import { PageHero } from "@/components/website/page-hero";
import { ShieldCheck, FileCheck, CheckCircle2, Mail, ArrowRight, Building2 } from "lucide-react";
import Link from "next/link";

export async function generateMetadata(): Promise<Metadata> {
  const page = await getPageContent("terms-of-service");
  return {
    title: page.seo_title || "Terms of Service | Nisha Fashions Wear",
    description: page.seo_description || "Read the commercial terms of service, payment methods, production tolerances, and international export policies of Nisha Fashions Wear.",
    alternates: {
      canonical: "/terms-of-service",
    },
  };
}

export default async function TermsOfServicePage() {
  const page = await getPageContent("terms-of-service");
  const content = page.content || {};
  const hero = content.hero || {};
  const sections = content.sections || [];
  const lastUpdated = content.lastUpdated || "October 2026";

  return (
    <div className="min-h-screen bg-background text-foreground pb-20">
      {/* Universal Page Hero */}
      <PageHero
        badge={hero.badge || "Commercial Terms & Governance"}
        title={hero.title ? <>{hero.title.replace("Service", "")}<span className="text-primary italic">Service</span>.</> : <>Terms of <span className="text-primary italic">Service</span>.</>}
        description={hero.description || "Commercial governance, purchase orders, sampling workflows, quality control tolerances, and international export execution."}
      >
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-white/10 text-zinc-300 border border-white/15 backdrop-blur-md">
          <FileCheck className="w-3.5 h-3.5 text-primary" />
          <span>Last Updated: {lastUpdated}</span>
        </span>
      </PageHero>

      {/* Main Container */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl mt-12 sm:mt-16">
        
        {/* Quick Summary Pill Bar */}
        <div className="p-4 sm:p-5 rounded-2xl bg-muted/40 border border-border/70 mb-10 sm:mb-14 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <p className="font-semibold text-xs sm:text-sm text-foreground">
                International Apparel Export &amp; Trade Assurance
              </p>
              <p className="text-[11px] sm:text-xs text-muted-foreground">
                AQL 2.5 QA standards, Irrevocable L/C at sight, and transparent FOB cost breakdowns.
              </p>
            </div>
          </div>
          <Link
            href="/contact"
            className="px-4 py-2 rounded-full bg-primary text-primary-foreground text-xs font-semibold hover:bg-primary/90 transition-all shrink-0"
          >
            Request Quotation
          </Link>
        </div>

        {/* Content Sections */}
        <div className="space-y-10 sm:space-y-14">
          {sections.map((section: any, idx: number) => (
            <article 
              key={section.id || idx}
              className="p-6 sm:p-8 rounded-3xl bg-card border border-border/70 shadow-xs space-y-4 transition-all hover:border-border"
            >
              <h2 className="font-serif text-xl sm:text-2xl font-light text-foreground tracking-tight flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-primary shrink-0" />
                <span>{section.title}</span>
              </h2>

              {section.content && (
                <p className="text-sm sm:text-base text-foreground/80 leading-relaxed font-normal">
                  {section.content}
                </p>
              )}

              {section.bullets && section.bullets.length > 0 && (
                <ul className="space-y-2.5 pt-2">
                  {section.bullets.map((bullet: string, bIdx: number) => (
                    <li key={bIdx} className="flex items-start gap-3 text-xs sm:text-sm text-muted-foreground leading-relaxed">
                      <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              )}
            </article>
          ))}
        </div>

        {/* Banking Reference Card */}
        <div className="mt-12 sm:mt-16 p-6 sm:p-8 rounded-3xl bg-muted/40 border border-border/70 text-center space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mx-auto">
            <Building2 className="w-6 h-6" />
          </div>
          <div className="space-y-1">
            <h3 className="font-serif text-xl font-normal text-foreground">
              Official Commercial Banking &amp; L/C Dealer
            </h3>
            <p className="text-xs sm:text-sm text-muted-foreground max-w-lg mx-auto">
              All commercial Letter of Credit (L/C) documents and export contracts are executed through Premier Bank Ltd., Dhanmondi Branch, Dhaka (SWIFT: PRMRBDDH).
            </p>
          </div>
          <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/about"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-foreground text-background text-xs font-semibold hover:bg-foreground/90 transition-colors"
            >
              <span>View Full Banking Details</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-border text-foreground hover:bg-muted text-xs font-semibold transition-colors"
            >
              <span>Contact Merchandising Desk</span>
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}
