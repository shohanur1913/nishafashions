"use client";

import Link from "next/link";
import { HotDealProduct } from "@/lib/content-service";
import { ThreeFireTitle } from "./three-fire-title";
import { ArrowRight } from "lucide-react";

interface HotDealsSectionProps {
  deals?: HotDealProduct[];
}

export function HotDealsSection({ deals }: HotDealsSectionProps) {
  return (
    <section className="relative w-full py-8 sm:py-12 lg:py-12 bg-background border-t border-border/40 overflow-hidden">
      {/* Ambient background fiery warm glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 h-[28rem] w-[46rem] rounded-full bg-gradient-to-br from-orange-500/10 via-rose-500/10 to-transparent blur-3xl"
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-screen-2xl relative z-10">
        {/* Section Header - Only Title and Explore Button */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          {/* Burning Fire Title matching other section headers */}
          <div className="flex items-center gap-3 sm:gap-4">
            {/* Animated burning torch flame in theme color */}
            <span className="relative inline-flex items-center justify-center shrink-0">
              <span className="absolute inset-0 rounded-full bg-[#E94D65]/40 blur-lg animate-pulse pointer-events-none" />

              <svg
                viewBox="0 0 24 24"
                fill="none"
                className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 drop-shadow-[0_0_20px_rgba(233,77,101,0.9)] animate-flame-wobble shrink-0"
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

            <h2 className="font-serif text-2xl sm:text-4xl md:text-5xl font-light text-foreground tracking-tight leading-tight">
              <ThreeFireTitle text="Hot Deals." textClassName="text-2xl sm:text-4xl md:text-5xl font-light" />
            </h2>
          </div>

          {/* Action Button: Explore Hot Deals */}
          <Link
            href="/hot-deals"
            className="group inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3 sm:py-3.5 rounded-full bg-[#E94D65] hover:bg-[#d63d55] text-white font-medium text-sm sm:text-base shadow-lg shadow-[#E94D65]/25 hover:shadow-xl hover:shadow-[#E94D65]/35 transition-all duration-300 shrink-0"
          >
            <span>Explore Hot Deals & Offers</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>


      </div>
    </section>
  );
}
