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
              <span className="absolute inset-0 rounded-full bg-[#E94D65]/40 blur-xl animate-pulse pointer-events-none" />

              <svg
                viewBox="0 0 24 24"
                fill="none"
                className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 drop-shadow-[0_0_20px_rgba(233,77,101,0.95)] animate-flame-wobble shrink-0"
              >
                {/* Outer Multi-Tongue Burning Flame */}
                <path
                  d="M12 1.5C10.5 4 8 7 8 11.5C8 12.5 8.2 13.5 8.5 14.2C7.8 13.3 7.2 12.1 7.2 10.8C7.2 9.5 7.6 8.2 8 7.2C5.5 9.2 4 12.3 4 15.8C4 20.2 7.6 23.5 12 23.5C16.4 23.5 20 20.2 20 15.8C20 12 18.2 8.5 15.5 6C15.8 7.5 15.5 9 14.8 10.2C14.2 11.2 13.3 12 12.2 12.5C12.8 10.5 12.8 8.2 12 6C11.5 4.5 11.8 3 12 1.5Z"
                  fill="url(#fireOuterLg)"
                />
                {/* Mid Licking Flame */}
                <path
                  d="M12 7.5C10.8 9.5 9.2 11.8 9.2 14.5C9.2 17.5 10.4 19.5 12 20.5C13.6 19.5 14.8 17.5 14.8 14.5C14.8 12.5 13.8 10.8 12.8 9.5C12.5 10.5 12 11.2 11.4 11.8C11.5 10.2 11.8 8.8 12 7.5Z"
                  fill="url(#fireMidLg)"
                />
                {/* Inner Glowing White-Yellow Core */}
                <path
                  d="M12 13C11.2 14.5 10.6 15.6 10.6 17C10.6 18.5 11.2 19.5 12 19.8C12.8 19.5 13.4 18.5 13.4 17C13.4 15.8 12.7 14.5 12 13Z"
                  fill="url(#fireCoreLg)"
                />
                <defs>
                  <linearGradient id="fireOuterLg" x1="12" y1="1.5" x2="12" y2="23.5" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#D42B49" />
                    <stop offset="0.35" stopColor="#E94D65" />
                    <stop offset="0.75" stopColor="#FF6B8B" />
                    <stop offset="1" stopColor="#FFAEC0" />
                  </linearGradient>
                  <linearGradient id="fireMidLg" x1="12" y1="7.5" x2="12" y2="20.5" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#FF4500" />
                    <stop offset="0.5" stopColor="#FF8C00" />
                    <stop offset="1" stopColor="#FFD700" />
                  </linearGradient>
                  <linearGradient id="fireCoreLg" x1="12" y1="13" x2="12" y2="19.8" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#FFF9C4" />
                    <stop offset="1" stopColor="#FFFFFF" />
                  </linearGradient>
                </defs>
              </svg>
            </span>

            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold sm:font-extrabold text-foreground tracking-tight leading-tight">
              <ThreeFireTitle text="Hot Deals." textClassName="text-3xl sm:text-4xl md:text-5xl font-bold sm:font-extrabold" />
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
