"use client";

import { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import { 
  Shirt, 
  ArrowUpRight, 
  Clock, 
  Sparkles, 
  PackageCheck, 
  ShieldCheck, 
  ChevronRight, 
  Flame, 
  Filter,
  CheckCircle2,
  Layers
} from "lucide-react";
import { WhatsAppIcon } from "@/components/icons/whatsapp-icon";
import { openQuoteModal } from "@/components/website/quote-modal";
import { HotDealProduct } from "@/lib/content-service";
import { ThreeFireTitle } from "@/components/website/three-fire-title";

interface HotDealsClientProps {
  initialDeals: HotDealProduct[];
}

function DealCountdown({ hours = 36, offset = 0 }: { hours?: number; offset?: number }) {
  const [timeLeft, setTimeLeft] = useState<{
    hours: string;
    minutes: string;
    seconds: string;
  }>({ hours: "24", minutes: "00", seconds: "00" });

  useEffect(() => {
    const calculateTime = () => {
      const now = new Date();
      const cycleMs = (hours * 3600 + offset * 600) * 1000;
      const epoch = now.getTime();
      const remainingMs = cycleMs - (epoch % cycleMs);
      const totalSec = Math.max(0, Math.floor(remainingMs / 1000));
      const h = Math.floor(totalSec / 3600);
      const m = Math.floor((totalSec % 3600) / 60);
      const s = totalSec % 60;
      setTimeLeft({
        hours: String(h).padStart(2, "0"),
        minutes: String(m).padStart(2, "0"),
        seconds: String(s).padStart(2, "0"),
      });
    };
    calculateTime();
    const interval = setInterval(calculateTime, 1000);
    return () => clearInterval(interval);
  }, [hours, offset]);

  return (
    <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-rose-500/10 border border-[#E94D65]/30 text-[#E94D65] text-[11px] font-mono font-medium tracking-tight">
      <Clock className="w-3 h-3 animate-pulse shrink-0" />
      <span className="text-[10px] font-sans font-medium uppercase tracking-wider opacity-75">Ends:</span>
      <span>{timeLeft.hours}h {timeLeft.minutes}m {timeLeft.seconds}s</span>
    </div>
  );
}

const CATEGORY_TABS = [
  { id: "all", label: "All Hot Deals" },
  { id: "knit", label: "Knitwear" },
  { id: "woven", label: "Woven" },
  { id: "denim", label: "Denim & Bottoms" },
  { id: "sweater", label: "Sweaters & Hoodies" },
  { id: "stock-lot", label: "Stock Lots & Overruns" },
];

export function HotDealsClient({ initialDeals }: HotDealsClientProps) {
  const [activeTab, setActiveTab] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const filteredDeals = useMemo(() => {
    return initialDeals.filter((deal) => {
      // Tab filter
      if (activeTab === "stock-lot") {
        const text = `${deal.deal_badge || ""} ${deal.badge || ""} ${deal.name || ""}`.toLowerCase();
        if (!text.includes("stock lot") && !text.includes("overrun") && !text.includes("surplus") && !text.includes("clearance")) {
          return false;
        }
      } else if (activeTab !== "all") {
        if (deal.category_slug !== activeTab) {
          return false;
        }
      }

      // Search filter
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = deal.name.toLowerCase().includes(q);
        const matchesSpecs = (deal.specs || "").toLowerCase().includes(q);
        const matchesCat = (deal.category_title || "").toLowerCase().includes(q);
        if (!matchesName && !matchesSpecs && !matchesCat) return false;
      }

      return true;
    });
  }, [initialDeals, activeTab, searchQuery]);

  return (
    <div className="min-h-screen bg-background text-foreground pb-20">
      {/* 1. Breadcrumbs */}
      <div className="border-b border-border/40 bg-muted/20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-screen-2xl py-3.5">
          <nav className="flex items-center gap-2 text-xs text-muted-foreground">
            <Link href="/" className="hover:text-foreground transition-colors">
              Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-foreground font-medium">Hot Deals & Special Allocations</span>
          </nav>
        </div>
      </div>

      {/* 2. Hero Header */}
      <section className="relative pt-10 sm:pt-14 pb-10 bg-gradient-to-b from-muted/30 to-background border-b border-border/40 overflow-hidden">
        {/* Ambient flame glow */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-20 left-1/2 -translate-x-1/2 h-80 w-[48rem] rounded-full bg-gradient-to-br from-orange-500/10 via-rose-500/10 to-transparent blur-3xl"
        />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-screen-2xl relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-rose-500/10 border border-[#E94D65]/25 text-[#E94D65] text-xs font-semibold tracking-wide uppercase mb-4">
            <Flame className="w-3.5 h-3.5 animate-pulse text-[#E94D65]" />
            <span>Time-Limited Factory Deals</span>
          </div>

          <div className="flex items-center justify-center flex-wrap gap-x-3.5 gap-y-1 mb-4">
            <span className="inline-flex items-center justify-center gap-3">
              <span className="relative inline-flex items-center justify-center shrink-0">
                <span className="absolute inset-0 rounded-full bg-[#E94D65]/40 blur-xl animate-pulse pointer-events-none" />
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  className="w-9 h-9 sm:w-11 sm:h-11 lg:w-12 lg:h-12 drop-shadow-[0_0_20px_rgba(233,77,101,0.95)] animate-flame-wobble shrink-0"
                >
                  <path
                    d="M12 1.5C10.5 4 8 7 8 11.5C8 12.5 8.2 13.5 8.5 14.2C7.8 13.3 7.2 12.1 7.2 10.8C7.2 9.5 7.6 8.2 8 7.2C5.5 9.2 4 12.3 4 15.8C4 20.2 7.6 23.5 12 23.5C16.4 23.5 20 20.2 20 15.8C20 12 18.2 8.5 15.5 6C15.8 7.5 15.5 9 14.8 10.2C14.2 11.2 13.3 12 12.2 12.5C12.8 10.5 12.8 8.2 12 6C11.5 4.5 11.8 3 12 1.5Z"
                    fill="url(#dealsFireOuter)"
                  />
                  <path
                    d="M12 7.5C10.8 9.5 9.2 11.8 9.2 14.5C9.2 17.5 10.4 19.5 12 20.5C13.6 19.5 14.8 17.5 14.8 14.5C14.8 12.5 13.8 10.8 12.8 9.5C12.5 10.5 12 11.2 11.4 11.8C11.5 10.2 11.8 8.8 12 7.5Z"
                    fill="url(#dealsFireMid)"
                  />
                  <path
                    d="M12 13C11.2 14.5 10.6 15.6 10.6 17C10.6 18.5 11.2 19.5 12 19.8C12.8 19.5 13.4 18.5 13.4 17C13.4 15.8 12.7 14.5 12 13Z"
                    fill="url(#dealsFireCore)"
                  />
                  <defs>
                    <linearGradient id="dealsFireOuter" x1="12" y1="1.5" x2="12" y2="23.5" gradientUnits="userSpaceOnUse">
                      <stop stopColor="#D42B49" />
                      <stop offset="0.35" stopColor="#E94D65" />
                      <stop offset="0.75" stopColor="#FF6B8B" />
                      <stop offset="1" stopColor="#FFAEC0" />
                    </linearGradient>
                    <linearGradient id="dealsFireMid" x1="12" y1="7.5" x2="12" y2="20.5" gradientUnits="userSpaceOnUse">
                      <stop stopColor="#FF4500" />
                      <stop offset="0.5" stopColor="#FF8C00" />
                      <stop offset="1" stopColor="#FFD700" />
                    </linearGradient>
                    <linearGradient id="dealsFireCore" x1="12" y1="13" x2="12" y2="19.8" gradientUnits="userSpaceOnUse">
                      <stop stopColor="#FFF9C4" />
                      <stop offset="1" stopColor="#FFFFFF" />
                    </linearGradient>
                  </defs>
                </svg>
              </span>
              <ThreeFireTitle text="Hot Deals." textClassName="text-3xl sm:text-4xl lg:text-5xl font-bold sm:font-extrabold" />
            </span>
          </div>

          <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed font-light">
            Verified export stock lots, cancelled order overruns, and factory-direct volume allocations. All items are inspected under AQL 2.5 standards and ready for immediate ocean freight or air shipment.
          </p>

          {/* Quick Quality Strip */}
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6 mt-6 text-xs sm:text-sm text-muted-foreground">
            <span className="inline-flex items-center gap-1.5 font-medium text-foreground">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              100% Export Grade
            </span>
            <span className="inline-flex items-center gap-1.5 font-medium text-foreground">
              <ShieldCheck className="w-4 h-4 text-[#E94D65]" />
              AQL 2.5 Inspection Passed
            </span>
            <span className="inline-flex items-center gap-1.5 font-medium text-foreground">
              <PackageCheck className="w-4 h-4 text-primary" />
              Ready Warehouse Packing
            </span>
          </div>
        </div>
      </section>

      {/* 3. Category Filter Tabs & Search Bar */}
      <section className="sticky top-20 z-30 bg-background/95 backdrop-blur-md border-b border-border/60 py-3 shadow-xs">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-screen-2xl flex flex-col md:flex-row items-center justify-between gap-3">
          {/* Scrollable Tabs */}
          <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto w-full md:w-auto pb-1 md:pb-0 scrollbar-none">
            {CATEGORY_TABS.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-medium transition-all whitespace-nowrap ${
                    isActive
                      ? "bg-[#E94D65] text-white shadow-xs font-semibold"
                      : "bg-muted/60 text-muted-foreground hover:bg-muted hover:text-foreground"
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>

          {/* Search Input */}
          <div className="w-full md:w-72 relative">
            <input
              type="text"
              placeholder="Search deals by style or spec..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-3.5 py-1.5 rounded-full text-xs sm:text-sm bg-muted/50 border border-border/70 focus:outline-none focus:border-[#E94D65] text-foreground placeholder:text-muted-foreground/70"
            />
          </div>
        </div>
      </section>

      {/* 4. Products Catalog Grid */}
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-screen-2xl pt-8 sm:pt-10">
        <div className="flex items-center justify-between mb-6 pb-2 border-b border-border/40">
          <h2 className="text-lg sm:text-xl font-serif text-foreground font-normal tracking-tight">
            <span>Available Deals</span>
            <span className="ml-2 text-xs font-mono font-medium text-muted-foreground px-2 py-0.5 rounded-full bg-muted">
              {filteredDeals.length} active allocations
            </span>
          </h2>
        </div>

        {filteredDeals.length === 0 ? (
          <div className="py-20 text-center rounded-2xl border border-dashed border-border p-8">
            <p className="text-muted-foreground text-sm">No special allocations match your filter criteria.</p>
            <button
              onClick={() => {
                setActiveTab("all");
                setSearchQuery("");
              }}
              className="mt-4 px-4 py-2 rounded-full bg-primary text-primary-foreground text-xs font-medium"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 sm:gap-6">
            {filteredDeals.map((deal, idx) => {
              const dealImageSrc =
                typeof deal.image_src === "string"
                  ? deal.image_src
                  : typeof (deal.image_src as any)?.src === "string"
                  ? (deal.image_src as any).src
                  : "";

              const badgeText = deal.deal_badge || deal.badge || "HOT DEAL";
              const hours = deal.expires_in_hours || 36 + idx * 8;
              const productHref = `/products/${deal.id}`;

              return (
                <div
                  key={deal.id || idx}
                  className="group relative flex flex-col rounded-2xl bg-card border border-border/70 hover:border-[#E94D65]/50 hover:shadow-xl transition-all duration-300 overflow-hidden"
                >
                  {/* Clean Product Image Preview — NO image overlay badges */}
                  <Link
                    href={productHref}
                    className="relative aspect-[4/3] w-full bg-muted/40 overflow-hidden block"
                  >
                    {dealImageSrc ? (
                      <img
                        src={dealImageSrc}
                        alt={deal.name}
                        className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                        <Shirt className="w-10 h-10 opacity-30" />
                      </div>
                    )}
                  </Link>

                  {/* Card Content & Details */}
                  <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-3.5">
                    <div className="space-y-2.5">
                      {/* Deal Badge & Live Ticking Countdown */}
                      <div className="flex items-center justify-between gap-2 flex-wrap">
                        <span className="px-2 py-0.5 rounded-md bg-[#E94D65]/10 border border-[#E94D65]/25 text-[#E94D65] text-[10px] font-bold tracking-wider uppercase">
                          {badgeText}
                        </span>
                        <DealCountdown hours={hours} offset={idx * 3} />
                      </div>

                      {/* Product Title */}
                      <Link href={productHref}>
                        <h3 className="font-serif text-base sm:text-lg font-normal text-foreground tracking-tight leading-snug group-hover:text-[#E94D65] transition-colors line-clamp-2">
                          {deal.name}
                        </h3>
                      </Link>

                      {/* Technical Specs */}
                      {deal.specs && (
                        <p className="text-xs text-muted-foreground line-clamp-2 font-light leading-relaxed">
                          {deal.specs}
                        </p>
                      )}

                      {/* Lot Quantity Available */}
                      {deal.stock_quantity && (
                        <div className="inline-flex items-center gap-1.5 text-[11px] font-medium text-muted-foreground">
                          <PackageCheck className="w-3.5 h-3.5 text-[#E94D65]" />
                          <span>{deal.stock_quantity}</span>
                        </div>
                      )}
                    </div>

                    {/* Price Strip & Actions */}
                    <div className="pt-3 border-t border-border/50 space-y-3">
                      <div className="flex items-baseline justify-between">
                        <div>
                          <div className="text-[10px] text-muted-foreground font-medium uppercase tracking-wider">
                            Special Offer Price:
                          </div>
                          <div className="flex items-baseline gap-2">
                            {deal.offer_price && (
                              <span className="text-lg font-bold text-foreground">
                                {deal.offer_price}
                              </span>
                            )}
                            {deal.original_price && (
                              <span className="text-xs text-muted-foreground line-through">
                                {deal.original_price}
                              </span>
                            )}
                          </div>
                        </div>

                        <a
                          href={`https://wa.me/8801715645766?text=${encodeURIComponent(
                            `Hi Nisha Fashions, I am interested in Hot Deal: ${deal.name} (${deal.offer_price}). Please share lot pack and dispatch terms.`
                          )}`}
                          target="_blank"
                          rel="noreferrer"
                          className="p-2 rounded-full bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-600 transition-colors"
                          title="Instant WhatsApp Inquiry"
                        >
                          <WhatsAppIcon className="w-4 h-4" fill="#25D366" />
                        </a>
                      </div>

                      <div className="grid grid-cols-2 gap-2 pt-1">
                        <Link
                          href={productHref}
                          className="inline-flex items-center justify-center gap-1 px-3 py-2 rounded-lg bg-muted/80 hover:bg-muted text-foreground text-xs font-medium transition-colors"
                        >
                          <span>Tech Pack</span>
                          <ArrowUpRight className="w-3 h-3" />
                        </Link>

                        <button
                          onClick={() => openQuoteModal(deal.name)}
                          className="inline-flex items-center justify-center gap-1 px-3 py-2 rounded-lg bg-[#E94D65] hover:bg-[#d63d55] text-white text-xs font-semibold shadow-xs transition-colors"
                        >
                          <span>Quick RFQ</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>

      {/* 5. Custom Direct Fresh Order Sourcing Banner */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-screen-2xl mt-16 sm:mt-20">
        <div className="rounded-3xl border border-border/80 bg-gradient-to-r from-card via-background to-card p-6 sm:p-10 lg:p-12 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 max-w-xl text-center md:text-left">
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-primary">
              <Layers className="w-3.5 h-3.5" />
              <span>Need Direct Fresh Manufacturing?</span>
            </div>
            <h3 className="font-serif text-2xl sm:text-3xl font-light tracking-tight text-foreground">
              Looking for Fresh Custom OEM/ODM Production?
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed font-light">
              We specialize in direct fresh orders from scratch: custom fabric dyeing, private labels, tech pack developments, and customized GSM for international brands across Europe, USA & Canada.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
            <button
              onClick={() => openQuoteModal()}
              className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3.5 rounded-full bg-primary hover:bg-primary/90 text-primary-foreground font-medium text-sm transition-colors shadow-sm"
            >
              Request Fresh Order Quote
            </button>
            <a
              href="https://wa.me/8801715645766"
              target="_blank"
              rel="noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-medium text-sm transition-colors shadow-sm"
            >
              <WhatsAppIcon className="w-4 h-4" fill="#ffffff" />
              <span>Chat on WhatsApp</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
