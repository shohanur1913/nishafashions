"use client";

import { motion } from "framer-motion";
import { BadgeCheck } from "lucide-react";
import { PageHero } from "@/components/website/page-hero";
import { openQuoteModal } from "@/components/website/quote-modal";
import { WhatsAppIcon } from "@/components/icons/whatsapp-icon";

interface AwardsClientProps {
  initialData?: {
    title?: string;
    subtitle?: string;
    content?: {
      awardsList?: string[];
    };
  };
}

export function AwardsClient({ initialData }: AwardsClientProps) {
  const fallbackAwards = [
    "SCS Certificate",
    "Certificate of Compliance (WRAP)",
    "Wal-Mart Ethical Standard",
    "Walt Disney",
    "Sears",
    "Macys",
    "Target",
    "Tesco",
    "BSCI",
    "Workplace Conditions Assessment (WCA)",
    "Accord"
  ];

  const awards = initialData?.content?.awardsList && initialData.content.awardsList.length > 0
    ? initialData.content.awardsList
    : fallbackAwards;

  return (
    <div className="min-h-screen bg-background text-foreground pb-24">
      {/* Universal Page Hero */}
      <PageHero
        title={<>Certifications & <span className="text-primary">Awards.</span></>}
        description={
          initialData?.subtitle ||
          "Our partner factories are awarded the highest international compliance and ethical standards. Quality and safety are the foundation of our manufacturing process."
        }
      >
        <button
          type="button"
          onClick={openQuoteModal}
          className="px-5 py-2 rounded-full bg-primary text-primary-foreground text-xs font-semibold hover:bg-primary/90 transition-colors uppercase tracking-wider cursor-pointer shadow-xs"
        >
          Request Quotation
        </button>
        <a
          href="https://wa.me/8801715645766?text=Hello%20Nisha%20Fashions,%20I%20would%20like%20to%20discuss%20factory%20certifications%20and%20compliance."
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-zinc-700 text-white text-xs font-medium hover:bg-zinc-800 transition-colors"
        >
          <WhatsAppIcon className="w-3.5 h-3.5" fill="#25D366" />
          <span>WhatsApp Us</span>
        </a>
      </PageHero>

      {/* Awards Grid */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-screen-xl mt-10 sm:mt-14 lg:mt-16">
        <div className="flex items-center justify-between mb-6 border-b border-border/50 pb-3">
          <div className="flex items-center gap-2">
            <BadgeCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            <h2 className="text-xs font-semibold uppercase tracking-wider text-foreground">
              Audited Compliance & Accreditations
            </h2>
          </div>
          <span className="text-[11px] text-muted-foreground">{awards.length} Verified Standards</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5">
          {awards.map((award, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.35, delay: index * 0.03, ease: "easeOut" }}
              className="flex items-center p-5 bg-card border border-border/70 rounded-2xl hover:border-primary/40 hover:shadow-md transition-all duration-300 group"
            >
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mr-3.5 shrink-0 group-hover:bg-emerald-500 group-hover:text-white transition-all duration-300">
                <BadgeCheck className="w-5 h-5 text-emerald-600 dark:text-emerald-400 group-hover:text-white transition-colors" />
              </div>
              <p className="text-sm font-medium leading-snug text-foreground/90 group-hover:text-foreground transition-colors">
                {award}
              </p>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
