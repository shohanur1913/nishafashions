"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Shirt, ArrowUpRight, Clock, ArrowRight } from "lucide-react";
import { HotDealProduct } from "@/lib/content-service";
import { ThreeFireTitle } from "./three-fire-title";

interface HotDealsSectionProps {
  deals: HotDealProduct[];
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

export function HotDealsSection({ deals }: HotDealsSectionProps) {
  if (!deals || deals.length === 0) {
    return null;
  }

  // Display top 4 deals on homepage
  const displayDeals = deals.slice(0, 4);

  return (
    <section className="relative w-full py-14 sm:py-20 lg:py-24 bg-background border-t border-border/40 overflow-hidden">
      {/* Ambient background fiery warm glow */}
      <div 
        aria-hidden="true" 
        className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 h-[28rem] w-[46rem] rounded-full bg-gradient-to-br from-orange-500/10 via-rose-500/10 to-transparent blur-3xl" 
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-screen-2xl relative z-10">
        {/* Section Header - Only Title and Explore Button (No extra text, no badges) */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 sm:mb-14">
          {/* Extra Large Burning Fire Title */}
          <div className="flex items-center gap-4 sm:gap-6">
            {/* Multi-layered animated burning torch flame in theme color */}
            <span className="relative inline-flex items-center justify-center shrink-0">
              <span className="absolute inset-0 rounded-full bg-[#E94D65]/40 blur-xl animate-pulse pointer-events-none" />
              
              <svg
                viewBox="0 0 24 24"
                fill="none"
                className="w-14 h-14 sm:w-20 sm:h-20 md:w-24 md:h-24 drop-shadow-[0_0_30px_rgba(233,77,101,0.95)] animate-flame-wobble shrink-0"
              >
                <path
                  d="M12 2C9.5 5 7 8 7 12C7 15.5 9.24 18.5 12 19.8C14.76 18.5 17 15.5 17 12C17 8 14.5 5 12 2Z"
                  fill="url(#fireOuterLg)"
                />
                <path
                  d="M12 5C10.5 7.5 8.5 10 8.5 13C8.5 15.8 10 17.8 12 18.8C14 17.8 15.5 15.8 15.5 13C15.5 10 13.5 7.5 12 5Z"
                  fill="url(#fireMidLg)"
                />
                <path
                  d="M12 9C11 10.5 10.2 12 10.2 13.8C10.2 15.5 11 16.8 12 17.3C13 16.8 13.8 15.5 13.8 13.8C13.8 12 13 10.5 12 9Z"
                  fill="#FFF0F3"
                />
                <path
                  d="M12 12C11.5 12.8 11.2 13.5 11.2 14.3C11.2 15.2 11.6 15.8 12 16.1C12.4 15.8 12.8 15.2 12.8 14.3C12.8 13.5 12.5 12.8 12 12Z"
                  fill="#FFFFFF"
                />
                <defs>
                  <linearGradient id="fireOuterLg" x1="12" y1="2" x2="12" y2="20" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#D42B49" />
                    <stop offset="0.4" stopColor="#E94D65" />
                    <stop offset="0.8" stopColor="#FF6B8B" />
                    <stop offset="1" stopColor="#FFAEC0" />
                  </linearGradient>
                  <linearGradient id="fireMidLg" x1="12" y1="5" x2="12" y2="19" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#E94D65" />
                    <stop offset="0.5" stopColor="#FF6B8B" />
                    <stop offset="1" stopColor="#FFD6DF" />
                  </linearGradient>
                </defs>
              </svg>
            </span>

            <h2 className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-black tracking-tight leading-none">
              <ThreeFireTitle text="Hot Deals." textClassName="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-black" />
            </h2>
          </div>

          {/* Action Button: Explore Hot Deals */}
          <Link
            href="/hot-deals"
            className="group inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-4 rounded-full bg-[#E94D65] hover:bg-[#d63d55] text-white font-semibold text-sm sm:text-base shadow-lg shadow-[#E94D65]/25 hover:shadow-xl hover:shadow-[#E94D65]/35 transition-all duration-300 shrink-0"
          >
            <span>Explore Hot Deals & Offers</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Hot Deals Products Grid - Clean, no extra badges or clutter */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {displayDeals.map((deal, idx) => {
            const dealImageSrc = typeof deal.image_src === "string" 
              ? deal.image_src 
              : typeof (deal.image_src as any)?.src === "string" 
                ? (deal.image_src as any).src 
                : "";

            const hours = deal.expires_in_hours || (30 + (idx * 12));

            return (
              <motion.div
                key={deal.id || idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.06 }}
                className="flex"
              >
                <Link
                  href={`/products/${deal.id}`}
                  className="group relative flex flex-col rounded-2xl bg-card border border-border/70 hover:border-[#E94D65]/50 hover:shadow-lg transition-all duration-300 overflow-hidden w-full"
                >
                  {/* Clean Product Image — No badges, no text overlay */}
                  <div className="relative aspect-[4/3] w-full bg-muted/40 overflow-hidden">
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
                  </div>

                  {/* Card Body */}
                  <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-3">
                    <div className="space-y-2">
                      {/* Live Ticking Countdown */}
                      <div className="flex items-center justify-end">
                        <DealCountdown hours={hours} offset={idx * 3} />
                      </div>

                      <h3 className="font-serif text-base sm:text-lg font-normal text-foreground tracking-tight group-hover:text-[#E94D65] transition-colors line-clamp-2">
                        {deal.name}
                      </h3>
                    </div>

                    {/* Price & View Deal Indicator */}
                    <div className="pt-3 border-t border-border/50 flex items-center justify-between">
                      <div className="flex items-baseline gap-2">
                        {deal.offer_price && (
                          <span className="text-base sm:text-lg font-bold text-foreground">
                            {deal.offer_price}
                          </span>
                        )}
                        {deal.original_price && (
                          <span className="text-xs text-muted-foreground line-through">
                            {deal.original_price}
                          </span>
                        )}
                      </div>

                      <span className="inline-flex items-center gap-0.5 text-xs font-semibold text-[#E94D65] group-hover:underline">
                        <span>View Deal</span>
                        <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
