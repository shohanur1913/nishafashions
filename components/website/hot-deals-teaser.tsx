"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Sparkles, Clock, Flame, ShieldCheck } from "lucide-react";
import { ThreeFireTitle } from "./three-fire-title";
import { openQuoteModal } from "./quote-modal";

interface HotDealsTeaserProps {
  dealCount?: number;
}

export function HotDealsTeaser({ dealCount = 4 }: HotDealsTeaserProps) {
  return (
    <section className="relative w-full py-12 sm:py-16 lg:py-20 bg-background border-t border-border/40 overflow-hidden">
      {/* Fiery ambient backlight */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 h-80 w-[42rem] rounded-full bg-gradient-to-br from-orange-500/10 via-rose-500/10 to-transparent blur-3xl"
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-screen-2xl relative z-10">
        <div className="relative mx-auto max-w-4xl rounded-3xl border border-border/80 bg-gradient-to-b from-card/90 via-card/50 to-background/90 p-8 sm:p-12 lg:p-14 text-center shadow-xl backdrop-blur-md overflow-hidden">
          {/* Subtle decorative top badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-rose-500/10 border border-[#E94D65]/25 text-[#E94D65] text-xs font-semibold tracking-wide uppercase mb-6">
            <Flame className="w-3.5 h-3.5 animate-pulse text-[#E94D65]" />
            <span>Limited Factory Allocations</span>
          </div>

          {/* Burning Title */}
          <div className="flex items-center justify-center flex-wrap gap-x-3.5 gap-y-1 mb-4">
            <span className="inline-flex items-center justify-center gap-3">
              {/* Torch flame icon */}
              <span className="relative inline-flex items-center justify-center shrink-0">
                <span className="absolute inset-0 rounded-full bg-[#E94D65]/35 blur-md animate-pulse pointer-events-none" />
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 drop-shadow-[0_0_18px_rgba(233,77,101,0.85)] animate-flame-wobble shrink-0"
                >
                  <path
                    d="M12 2C9.5 5 7 8 7 12C7 15.5 9.24 18.5 12 19.8C14.76 18.5 17 15.5 17 12C17 8 14.5 5 12 2Z"
                    fill="url(#teaserFireOuter)"
                  />
                  <path
                    d="M12 5C10.5 7.5 8.5 10 8.5 13C8.5 15.8 10 17.8 12 18.8C14 17.8 15.5 15.8 15.5 13C15.5 10 13.5 7.5 12 5Z"
                    fill="url(#teaserFireMid)"
                  />
                  <path
                    d="M12 9C11 10.5 10.2 12 10.2 13.8C10.2 15.5 11 16.8 12 17.3C13 16.8 13.8 15.5 13.8 13.8C13.8 12 13 10.5 12 9Z"
                    fill="#FFF0F3"
                  />
                  <defs>
                    <linearGradient id="teaserFireOuter" x1="12" y1="2" x2="12" y2="20" gradientUnits="userSpaceOnUse">
                      <stop stopColor="#D42B49" />
                      <stop offset="0.4" stopColor="#E94D65" />
                      <stop offset="0.8" stopColor="#FF6B8B" />
                      <stop offset="1" stopColor="#FFAEC0" />
                    </linearGradient>
                    <linearGradient id="teaserFireMid" x1="12" y1="5" x2="12" y2="19" gradientUnits="userSpaceOnUse">
                      <stop stopColor="#E94D65" />
                      <stop offset="0.5" stopColor="#FF6B8B" />
                      <stop offset="1" stopColor="#FFD6DF" />
                    </linearGradient>
                  </defs>
                </svg>
              </span>

              {/* 3D Particle Fire Title */}
              <ThreeFireTitle text="Hot Deals." />
            </span>
          </div>

          {/* Clean, high-level description without stock lot product cards */}
          <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed font-light mb-8">
            Access time-sensitive factory allocations, seasonal volume offers, and surplus opportunities with verified wholesale FOB pricing. Dedicated for international buyers looking for ready or fast-dispatch inventory.
          </p>

          {/* Feature Highlights Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-4 mb-8 text-xs sm:text-sm text-muted-foreground">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-muted/60 border border-border/70">
              <Clock className="w-3.5 h-3.5 text-[#E94D65]" />
              Time-Bound Offers
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-muted/60 border border-border/70">
              <Sparkles className="w-3.5 h-3.5 text-[#E94D65]" />
              Special Factory Pricing
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-muted/60 border border-border/70">
              <ShieldCheck className="w-3.5 h-3.5 text-[#E94D65]" />
              AQL 2.5 Export Quality
            </span>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 sm:gap-4">
            <Link
              href="/hot-deals"
              className="group inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-full bg-[#E94D65] hover:bg-[#d63d55] text-white font-medium text-sm sm:text-base shadow-lg shadow-[#E94D65]/20 hover:shadow-xl hover:shadow-[#E94D65]/30 transition-all duration-300 w-full sm:w-auto"
            >
              <span>Explore Hot Deals & Offers</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>

            <button
              onClick={() => openQuoteModal()}
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-muted/80 hover:bg-muted text-foreground border border-border font-medium text-sm sm:text-base transition-colors w-full sm:w-auto"
            >
              Request Direct Fresh Order
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
