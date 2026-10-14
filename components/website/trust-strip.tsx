"use client";

import { motion } from "framer-motion";

export function TrustStrip() {
  return (
    <section className="w-full border-b border-border bg-muted/30">
      <div className="container mx-auto px-4 py-6 sm:py-8">
        <div className="flex flex-col items-center justify-center text-center space-y-3">
          <span className="font-serif text-2xl sm:text-3xl font-medium tracking-tight text-foreground max-w-3xl">
            A trusted Bangladesh clothing manufacturer and garment exporter Bangladesh serving international apparel brands.
          </span>
          <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            Precision Manufacturing · End-to-End Management · Uncompromised Quality
          </span>
        </div>
      </div>
    </section>
  );
}
