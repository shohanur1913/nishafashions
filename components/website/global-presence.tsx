"use client";

import { WorldMap } from "@/components/shadcnmaps/maps/world";
import { motion } from "framer-motion";

export function GlobalPresence() {
  const regions = [
    {
      id: "BD",
      className: "fill-zinc-400",
      tooltipContent: (
        <div className="text-xs">
          <strong>Bangladesh</strong>
          <p className="text-muted-foreground mt-1">Primary Operations & Manufacturing Hub</p>
        </div>
      ),
    },
    {
      id: "GB",
      className: "fill-zinc-400",
      tooltipContent: "United Kingdom (Key Market)",
    },
    {
      id: "US",
      className: "fill-zinc-400",
      tooltipContent: "United States (Key Market)",
    },
    {
      id: "CA",
      className: "fill-zinc-400",
      tooltipContent: "Canada (Key Market)",
    },
    {
      id: "AU",
      className: "fill-zinc-400",
      tooltipContent: "Australia (Key Market)",
    },
    {
      id: "DE",
      className: "fill-zinc-400",
      tooltipContent: "Germany (Key Market)",
    },
    {
      id: "FR",
      className: "fill-zinc-400",
      tooltipContent: "France (Key Market)",
    },
    {
      id: "IT",
      className: "fill-zinc-400",
      tooltipContent: "Italy (Key Market)",
    },
  ];

  return (
    <section className="w-full py-8 sm:py-24 bg-background border-t border-border/40 overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-screen-2xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center">
          
          {/* Content Left */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className="lg:col-span-4 space-y-6 text-center lg:text-left"
          >
            <div className="space-y-4">
              <h2 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                Global Network
              </h2>
              <h3 className="font-serif text-4xl sm:text-5xl font-light text-foreground leading-tight tracking-tight">
                Delivering Worldwide.
              </h3>
            </div>
            <p className="text-lg text-muted-foreground font-light max-w-md mx-auto lg:mx-0 leading-relaxed">
              From our core operations in Bangladesh, we engineer supply chains and deliver premium apparel solutions to over 20 global markets across North America, Europe, and Oceania.
            </p>
          </motion.div>

          {/* Map Right */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-8 w-full"
          >
            <div 
              className="w-full aspect-[5/3] lg:aspect-[2/1] relative overflow-hidden flex items-center justify-center"
              style={{
                "--map-region": "var(--foreground)",
                "--map-region-hover": "var(--foreground)",
                "--map-region-stroke": "var(--background)",
                "--map-region-stroke-hover": "var(--background)"
              } as React.CSSProperties}
            >
              <WorldMap 
                regions={regions}
                showLabels={false}
                className="w-full h-full"
              />
            </div>
          </motion.div>
          
        </div>
      </div>
    </section>
  );
}
