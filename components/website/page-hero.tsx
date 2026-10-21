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
      {/* Ambient Brand Color Glow Background */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-2xl h-44 bg-primary/20 blur-3xl rounded-full pointer-events-none" />
      <div className="absolute -bottom-10 right-10 w-48 h-48 bg-primary/10 blur-2xl rounded-full pointer-events-none" />

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
          glowColor="rgba(233, 77, 101, 0.4)"
        />
      </div>

      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl text-center space-y-3">
        {badge && (
          <div>
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-[11px] font-semibold uppercase tracking-[0.2em] bg-primary/15 text-primary border border-primary/30 shadow-2xs">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
              {badge}
            </span>
          </div>
        )}

        <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-light tracking-tight leading-tight text-white">
          {title}
        </h1>

        {description && (
          <p className="text-xs sm:text-sm text-zinc-300 font-normal max-w-xl mx-auto leading-relaxed">
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
