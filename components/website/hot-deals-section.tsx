"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Flame, Shirt, ArrowUpRight } from "lucide-react";
import { HotDealProduct } from "@/lib/content-service";

interface HotDealsSectionProps {
  deals: HotDealProduct[];
}

export function HotDealsSection({ deals }: HotDealsSectionProps) {
  if (!deals || deals.length === 0) {
    return null;
  }

  return (
    <section className="relative w-full py-14 sm:py-18 lg:py-20 bg-background border-t border-border/40 overflow-hidden">
      {/* Ambient background fiery warm glow */}
      <div 
        aria-hidden="true" 
        className="pointer-events-none absolute -top-24 left-1/4 h-96 w-96 rounded-full bg-gradient-to-br from-orange-500/10 via-rose-500/5 to-transparent blur-3xl" 
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-screen-2xl relative z-10">
        {/* Section Header */}
        <div className="max-w-2xl mb-10 sm:mb-12">
          {/* Flame Pill Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gradient-to-r from-orange-500/15 via-rose-500/15 to-amber-500/15 border border-orange-500/30 text-xs font-semibold uppercase tracking-wider text-orange-600 dark:text-orange-400 mb-3.5 shadow-[0_0_20px_rgba(249,115,22,0.2)]">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500"></span>
            </span>
            <span className="flex items-center gap-1.5">
              <Flame className="w-3.5 h-3.5 fill-orange-500 text-orange-500 animate-pulse" />
              <span>Limited Factory Allocations</span>
            </span>
          </div>

          {/* Animated Fire Title (Apparel deleted, fire animation added) */}
          <div className="relative inline-block">
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light text-foreground tracking-tight leading-tight flex items-center flex-wrap gap-x-3 gap-y-1">
              <span className="inline-flex items-center gap-2.5">
                {/* Multi-layered animated fire flame */}
                <span className="relative inline-flex items-center justify-center">
                  <span className="absolute inset-0 rounded-full bg-orange-500/30 blur-md animate-pulse pointer-events-none" />
                  
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 text-orange-500 drop-shadow-[0_0_18px_rgba(255,100,0,0.85)] animate-flame-wobble shrink-0"
                  >
                    {/* Outer Red-Orange Flame */}
                    <path
                      d="M12 2C9.5 5 7 8 7 12C7 15.5 9.24 18.5 12 19.8C14.76 18.5 17 15.5 17 12C17 8 14.5 5 12 2Z"
                      fill="url(#outerFlame)"
                    />
                    {/* Mid Golden-Orange Flame */}
                    <path
                      d="M12 6C10.5 8 9 10 9 13C9 15.5 10.3 17.5 12 18.5C13.7 17.5 15 15.5 15 13C15 10 13.5 8 12 6Z"
                      fill="url(#midFlame)"
                      className="animate-pulse"
                    />
                    {/* Inner Yellow Flame Core */}
                    <path
                      d="M12 10C11.2 11.2 10.5 12.5 10.5 14C10.5 15.5 11.2 16.8 12 17.2C12.8 16.8 13.5 15.5 13.5 14C13.5 12.5 12.8 11.2 12 10Z"
                      fill="#FFF59D"
                    />
                    <defs>
                      <linearGradient id="outerFlame" x1="12" y1="2" x2="12" y2="20" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#FF1744" />
                        <stop offset="0.6" stopColor="#FF5722" />
                        <stop offset="1" stopColor="#FF9100" />
                      </linearGradient>
                      <linearGradient id="midFlame" x1="12" y1="6" x2="12" y2="19" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#FF6D00" />
                        <stop offset="0.8" stopColor="#FFD600" />
                      </linearGradient>
                    </defs>
                  </svg>
                </span>

                <span className="font-light text-foreground">Hot</span>
              </span>

              {/* Animated Fiery "Deals." with floating spark motes */}
              <span className="relative inline-block">
                <span className="font-normal italic bg-gradient-to-r from-orange-500 via-amber-400 to-rose-600 bg-clip-text text-transparent bg-[length:200%_auto] animate-fire-gradient drop-shadow-[0_2px_12px_rgba(255,100,0,0.35)]">
                  Deals
                </span>
                <span className="text-rose-500 font-normal">.</span>

                {/* Floating Fiery Spark Particles */}
                <span className="absolute -top-1 -right-3 flex space-x-1 pointer-events-none">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-fire-particle-1 blur-[0.5px]" />
                  <span className="w-1 h-1 rounded-full bg-orange-500 animate-fire-particle-2 blur-[0.5px]" />
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-fire-particle-3 blur-[0.5px]" />
                </span>
              </span>
            </h2>
          </div>

          <p className="text-sm sm:text-base text-muted-foreground leading-relaxed mt-2.5 font-normal">
            Direct factory allocations and special volume pricing for export apparel production. Click any product to view complete technical specifications and costing details.
          </p>
        </div>

        {/* Hot Deals Grid — Clean, Clickable Cards Linking to Product View Page */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {deals.map((deal, idx) => {
            const dealImageSrc = typeof deal.image_src === "string" 
              ? deal.image_src 
              : typeof (deal.image_src as any)?.src === "string" 
                ? (deal.image_src as any).src 
                : "";

            return (
              <motion.div
                key={deal.id || idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.06 }}
              >
                <Link
                  href={`/products/${deal.id}`}
                  className="group flex flex-col rounded-2xl bg-card border border-border/70 hover:border-foreground/30 hover:shadow-md transition-all duration-300 overflow-hidden h-full"
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


                  {/* Clean Card Body */}
                  <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-3">
                    <div className="space-y-1.5">
                      {deal.category_title && (
                        <p className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider">
                          {deal.category_title}
                        </p>
                      )}

                      <h3 className="font-serif text-base sm:text-lg font-normal text-foreground tracking-tight group-hover:text-primary transition-colors line-clamp-1">
                        {deal.name}
                      </h3>

                      {deal.specs && (
                        <p className="text-xs text-muted-foreground line-clamp-1 font-light">
                          {deal.specs}
                        </p>
                      )}
                    </div>

                    {/* Price & Link Indicator */}
                    <div className="pt-2 border-t border-border/50 flex items-center justify-between">
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

                      <span className="inline-flex items-center gap-0.5 text-xs font-medium text-muted-foreground group-hover:text-foreground transition-colors">
                        <span>Details</span>
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
