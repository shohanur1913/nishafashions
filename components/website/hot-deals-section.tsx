"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Shirt, ArrowUpRight } from "lucide-react";
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
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-screen-2xl">
        {/* Section Header */}
        <div className="max-w-2xl mb-10 sm:mb-12">
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light text-foreground tracking-tight leading-tight">
            Hot Apparel <span className="text-primary italic">Deals</span>
            <span className="text-primary">.</span>
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground leading-relaxed mt-2.5 font-normal">
            Direct factory allocations and special volume pricing for export apparel production. Click any product to view complete technical specifications and costing details.
          </p>
        </div>

        {/* Hot Deals Grid — Clean, Clickable Cards Linking to Product View Page */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {deals.map((deal, idx) => {
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
                    {deal.image_src ? (
                      <img
                        src={deal.image_src}
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
