"use client";

import NextImage from "next/image";
import Link from "next/link";
import { images } from "@/lib/content/images";
import { ArrowRight, MessageCircle } from "lucide-react";
import { openQuoteModal } from "@/components/website/quote-modal";
import { PageHero } from "@/components/website/page-hero";

export default function ProductsAndServicesPage() {
  const categories = [
    {
      num: "01",
      slug: "knit",
      title: "Knitwear",
      badge: "Core Volume",
      image: images.knit,
      products: "T-shirts, polos, hoodies, sweatshirts, joggers, activewear",
      moq: "2,000 pcs",
      leadTime: "45–60 Days",
    },
    {
      num: "02",
      slug: "woven",
      title: "Woven",
      badge: "Engineered Fit",
      image: images.woven,
      products: "Formal & casual shirts, chinos, cargo trousers, overshirts",
      moq: "1,500 pcs",
      leadTime: "60–90 Days",
    },
    {
      num: "03",
      slug: "denim",
      title: "Denim & Bottoms",
      badge: "Laser & Wash",
      image: images.denim,
      products: "5-pocket jeans, denim jackets, shirts, shorts, overalls",
      moq: "1,500 pcs",
      leadTime: "60–75 Days",
    },
    {
      num: "04",
      slug: "sweater",
      title: "Sweater",
      badge: "3GG to 14GG",
      image: images.sweater,
      products: "Crewnecks, cable knits, cardigans, turtlenecks, scarves",
      moq: "1,200 pcs",
      leadTime: "75–90 Days",
    },
    {
      num: "05",
      slug: "various-items",
      title: "Various & Workwear",
      badge: "Commercial",
      image: images.various,
      products: "Scrubs, uniforms, utility trousers, infant wear, tote bags",
      moq: "1,500 pcs",
      leadTime: "45–60 Days",
    },
  ];

  const services = [
    { step: "01", title: "Factory Sourcing", desc: "Allocating vetted units by product technicality, target price, and compliance." },
    { step: "02", title: "Pattern & Sampling", desc: "CAD 2D/3D grading, physical proto samples, and fit approvals before bulk." },
    { step: "03", title: "Fabric Procurement", desc: "Lab dips, strike-offs, yarn dyed checks, and custom trim approvals." },
    { step: "04", title: "Open-Book Costing", desc: "Itemized costing covering fabric yield, trims, CM, wash, and freight." },
    { step: "05", title: "TNA Merchandising", desc: "Weekly critical-path monitoring to maintain on-time milestone delivery." },
    { step: "06", title: "Inline & Final QA", desc: "On-site technical teams executing inline audits and AQL 2.5 final inspections." },
    { step: "07", title: "Social Compliance", desc: "Continuous facility auditing for BSCI, SEDEX, OEKO-TEX, and GOTS standards." },
    { step: "08", title: "Packing & Barcoding", desc: "Ratio packing, barcode verification, polybags, and GS1 carton marking." },
    { step: "09", title: "Export Logistics", desc: "Container stuffing supervision, sea/air booking, and customs documentation." },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground pb-12 sm:pb-16">
      {/* Compact Editorial Hero */}
      <PageHero
        badge="Capabilities & Scope"
        title="Products & Sourcing Services"
        description="Five manufacturing divisions and full end-to-end supply chain execution managed on the ground in Dhaka."
      >
        <button
          type="button"
          onClick={openQuoteModal}
          className="px-5 py-2 rounded-full bg-white text-zinc-900 text-xs font-semibold hover:bg-zinc-100 transition-colors uppercase tracking-wider cursor-pointer shadow-xs"
        >
          Request Quotation
        </button>
        <a
          href="https://wa.me/8801715645766?text=Hello%20Nisha%20Fashions,%20I%20would%20like%20to%20discuss%20apparel%20production%20services."
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-zinc-700 text-white text-xs font-medium hover:bg-zinc-800 transition-colors"
        >
          <MessageCircle className="w-3.5 h-3.5 text-[#25D366]" />
          <span>WhatsApp</span>
        </a>
      </PageHero>

      {/* 5 Divisions Grid: Premium Editorial Cards (5 per line on Desktop, 2 per line on Phone) */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-screen-2xl pt-8 sm:pt-10">
        <div className="flex items-center justify-between mb-4 border-b border-border/50 pb-2.5">
          <h2 className="text-xs font-semibold uppercase tracking-wider text-foreground">
            Five Manufacturing Divisions
          </h2>
          <span className="text-[11px] text-zinc-600 dark:text-zinc-400">Click card to explore products</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3.5 sm:gap-4">
          {categories.map((c) => (
            <Link
              key={c.num}
              href={`/categories/${c.slug}`}
              className="group flex flex-col rounded-2xl bg-card border border-border/80 hover:border-zinc-950 dark:hover:border-white shadow-xs hover:shadow-lg transition-all duration-300 overflow-hidden"
            >
              {/* Full-bleed Top Image */}
              <div className="relative aspect-square w-full overflow-hidden bg-muted/30">
                <NextImage
                  src={c.image.src}
                  alt={c.title}
                  fill
                  quality={95}
                  className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 opacity-70 group-hover:opacity-50 transition-opacity" />

                {/* Floating Top Badges */}
                <div className="absolute top-2.5 inset-x-2.5 flex items-center justify-between">
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-white/95 text-zinc-950 shadow-xs backdrop-blur-xs">
                    {c.num}
                  </span>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-black/65 text-white shadow-xs backdrop-blur-xs border border-white/10">
                    {c.badge}
                  </span>
                </div>

                {/* Bottom Meta on Image */}
                <div className="absolute bottom-2.5 inset-x-2.5 flex items-center justify-between text-[11px] text-white">
                  <span className="font-medium bg-black/60 px-2 py-0.5 rounded-md backdrop-blur-xs text-[10px]">
                    MOQ: <strong className="font-bold">{c.moq}</strong>
                  </span>
                  <span className="font-medium bg-black/60 px-2 py-0.5 rounded-md backdrop-blur-xs text-[10px] text-zinc-200">
                    {c.leadTime}
                  </span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-3 sm:p-3.5 flex-1 flex flex-col justify-between space-y-2.5">
                <div>
                  <h3 className="font-serif text-base sm:text-lg font-medium text-foreground tracking-tight group-hover:text-primary transition-colors">
                    {c.title}
                  </h3>

                  <p className="text-xs text-zinc-900 dark:text-zinc-100 font-normal line-clamp-2 leading-relaxed mt-1">
                    {c.products}
                  </p>
                </div>

                {/* Bottom Action */}
                <div className="pt-2 border-t border-border/50 flex items-center justify-between">
                  <span className="text-[11px] font-semibold text-foreground uppercase tracking-wider group-hover:text-primary transition-colors">
                    View Catalog
                  </span>
                  <div className="w-6 h-6 rounded-full bg-muted/60 group-hover:bg-foreground group-hover:text-background flex items-center justify-center transition-all">
                    <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Compact 9-Step Full Service Scope with 100% Dark Visible High-Contrast Text */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-screen-2xl mt-10 sm:mt-12">
        <div className="flex items-center justify-between mb-4 border-b border-border/50 pb-2.5">
          <h2 className="text-xs font-semibold uppercase tracking-wider text-foreground">
            Full-Service Scope (9 Operational Disciplines)
          </h2>
          <span className="text-[11px] text-zinc-600 dark:text-zinc-400">All inclusive under buying scope</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 sm:gap-3">
          {services.map((s, idx) => (
            <div
              key={idx}
              className="p-3.5 sm:p-4 rounded-2xl bg-card border border-border/70 hover:border-zinc-950/40 dark:hover:border-zinc-100/40 transition-colors flex items-start gap-3.5 shadow-2xs"
            >
              <div className="w-8 h-8 rounded-xl bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 flex items-center justify-center text-xs font-mono font-bold text-zinc-950 dark:text-zinc-100 shrink-0 mt-0.5">
                {s.step}
              </div>
              <div className="space-y-1">
                <h3 className="font-serif text-sm sm:text-base font-semibold text-zinc-950 dark:text-white tracking-tight">
                  {s.title}
                </h3>
                {/* Fixed text visibility: solid dark high-contrast text */}
                <p className="text-xs sm:text-[13px] text-zinc-900 dark:text-zinc-100 font-normal leading-relaxed">
                  {s.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Compact Bottom Call to Action */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-screen-2xl mt-8 sm:mt-10">
        <div className="p-4 sm:p-5 rounded-2xl bg-zinc-900 text-white flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="space-y-0.5 text-center sm:text-left">
            <h3 className="font-serif text-base sm:text-lg font-light">
              Ready to start sampling or request FOB costing?
            </h3>
            <p className="text-xs text-zinc-300 font-normal">
              Send tech packs to info@nishafashions.com. Indicative response within 48h.
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={openQuoteModal}
              className="px-4 py-2 rounded-xl bg-white text-zinc-900 text-xs font-semibold hover:bg-zinc-100 transition-colors cursor-pointer shadow-xs"
            >
              Request Quote
            </button>
            <Link
              href="/contact"
              className="px-4 py-2 rounded-xl border border-zinc-700 text-white text-xs font-medium hover:bg-zinc-800 transition-colors"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
