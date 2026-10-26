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
          {/* Animated Fire Title - Full burning effect across entire "Hot Deals." */}
          <div className="relative inline-block">
            {/* Ambient heat aura behind the burning title */}
            <div 
              aria-hidden="true"
              className="absolute -inset-x-8 -inset-y-4 bg-gradient-to-r from-orange-600/25 via-amber-500/30 to-red-600/25 blur-2xl rounded-full pointer-events-none opacity-90 animate-pulse"
            />

            <h2 className="relative font-serif text-3xl sm:text-4xl lg:text-5xl tracking-tight leading-tight flex items-center flex-wrap gap-x-3.5 gap-y-1">
              <span className="inline-flex items-center gap-3">
                {/* Multi-layered animated burning torch flame */}
                <span className="relative inline-flex items-center justify-center shrink-0">
                  <span className="absolute inset-0 rounded-full bg-orange-500/40 blur-md animate-pulse pointer-events-none" />
                  
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 drop-shadow-[0_0_20px_rgba(255,87,34,0.95)] animate-flame-wobble shrink-0"
                  >
                    {/* Outer Red-Orange Flame */}
                    <path
                      d="M12 2C9.5 5 7 8 7 12C7 15.5 9.24 18.5 12 19.8C14.76 18.5 17 15.5 17 12C17 8 14.5 5 12 2Z"
                      fill="url(#fireOuter)"
                    />
                    {/* Mid Golden-Orange Flame */}
                    <path
                      d="M12 5C10.5 7.5 8.5 10 8.5 13C8.5 15.8 10 17.8 12 18.8C14 17.8 15.5 15.8 15.5 13C15.5 10 13.5 7.5 12 5Z"
                      fill="url(#fireMid)"
                    />
                    {/* Inner Yellow Core */}
                    <path
                      d="M12 9C11 10.5 10.2 12 10.2 13.8C10.2 15.5 11 16.8 12 17.3C13 16.8 13.8 15.5 13.8 13.8C13.8 12 13 10.5 12 9Z"
                      fill="#FFF59D"
                    />
                    {/* White Core Heat Center */}
                    <path
                      d="M12 12C11.5 12.8 11.2 13.5 11.2 14.3C11.2 15.2 11.6 15.8 12 16.1C12.4 15.8 12.8 15.2 12.8 14.3C12.8 13.5 12.5 12.8 12 12Z"
                      fill="#FFFFFF"
                    />
                    <defs>
                      <linearGradient id="fireOuter" x1="12" y1="2" x2="12" y2="20" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#D90429" />
                        <stop offset="0.4" stopColor="#FF4500" />
                        <stop offset="0.8" stopColor="#FF8C00" />
                        <stop offset="1" stopColor="#FFD000" />
                      </linearGradient>
                      <linearGradient id="fireMid" x1="12" y1="5" x2="12" y2="19" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#FF3D00" />
                        <stop offset="0.5" stopColor="#FF9100" />
                        <stop offset="1" stopColor="#FFEA00" />
                      </linearGradient>
                    </defs>
                  </svg>
                </span>

                {/* The entire "Hot Deals." burns with fire! */}
                <span className="burning-fire-text font-serif italic font-normal tracking-tight">
                  Hot Deals.
                </span>
              </span>

              {/* Multiple Rising Fire Embers / Sparks drifting upward */}
              <div aria-hidden="true" className="absolute -top-3 left-10 right-0 h-10 pointer-events-none overflow-visible">
                <span className="absolute left-[18%] bottom-1 w-1.5 h-1.5 rounded-full bg-amber-300 animate-ember-1 blur-[0.3px]" />
                <span className="absolute left-[38%] bottom-2 w-1 h-1 rounded-full bg-orange-400 animate-ember-2 blur-[0.2px]" />
                <span className="absolute left-[58%] bottom-1 w-1.5 h-1.5 rounded-full bg-yellow-300 animate-ember-3 blur-[0.3px]" />
                <span className="absolute left-[78%] bottom-2 w-1 h-1 rounded-full bg-rose-400 animate-ember-1 blur-[0.2px]" style={{ animationDelay: '0.8s' }} />
                <span className="absolute left-[92%] bottom-1 w-1.5 h-1.5 rounded-full bg-amber-400 animate-ember-2 blur-[0.3px]" style={{ animationDelay: '1.4s' }} />
              </div>
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
