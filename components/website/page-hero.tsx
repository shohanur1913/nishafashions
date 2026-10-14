"use client";

import * as React from "react";
import DotField from "@/components/ui/dot-field";
import { cn } from "@/lib/utils";

export interface PageHeroProps {
  badge?: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
}

export function PageHero({
  badge,
  title,
  description,
  children,
  className,
}: PageHeroProps) {
  return (
    <section
      className={cn(
        "relative w-full border-b border-border/40 bg-zinc-900 text-white py-10 sm:py-12 overflow-hidden",
        className
      )}
    >
      {/* Background DotField Particle Effect */}
      <div className="absolute inset-0 z-0 opacity-45 pointer-events-none">
        <DotField
          dotRadius={1.5}
          dotSpacing={18}
          bulgeStrength={50}
          glowRadius={220}
          sparkle={true}
          waveAmplitude={0}
          cursorRadius={400}
          cursorForce={0.1}
          bulgeOnly={true}
          gradientFrom="#e4e4e7"
          gradientTo="#a1a1aa"
          glowColor="#18181b"
        />
      </div>

      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl text-center space-y-2.5">
        {badge && (
          <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-zinc-400 block">
            {badge}
          </span>
        )}

        <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-light tracking-tight leading-tight">
          {title}
        </h1>

        {description && (
          <p className="text-xs sm:text-sm text-zinc-200 font-normal max-w-xl mx-auto leading-relaxed">
            {description}
          </p>
        )}

        {children && (
          <div className="pt-2 flex flex-wrap items-center justify-center gap-2.5">
            {children}
          </div>
        )}
      </div>
    </section>
  );
}

export default PageHero;
