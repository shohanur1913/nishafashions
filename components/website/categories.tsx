"use client";

import { useState } from "react";
import NextImage from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ChoiceChips, ChoiceChip } from "@/components/ui/choice-chips";
import { ArrowRight } from "lucide-react";
import { categoriesCatalog } from "@/lib/content/categories";

export function Categories() {
  const [activeFilter, setActiveFilter] = useState<string[]>(["all"]);

  return (
    <section id="categories" className="w-full py-10 sm:py-14 lg:py-16 bg-background border-t border-border/40">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-screen-2xl">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="flex flex-col items-center justify-center text-center mb-8 sm:mb-10 space-y-3 sm:space-y-4"
        >
          <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
            Product Capabilities
          </h2>
          <h3 className="font-serif text-2xl sm:text-4xl md:text-5xl font-light text-foreground leading-tight max-w-2xl tracking-tight">
            Specialized engineering for every category.
          </h3>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
          className="flex justify-center mb-6 sm:mb-10"
        >
          <ChoiceChips 
            multiple={false} 
            value={activeFilter} 
            onValueChange={(val) => {
              if (val.length === 0) setActiveFilter(["all"]);
              else setActiveFilter(val);
            }} 
            clearable={false}
            className="justify-center"
          >
            <ChoiceChip value="all" count={categoriesCatalog.length}>All</ChoiceChip>
            {categoriesCatalog.map(c => (
              <ChoiceChip key={c.slug} value={c.slug} count={1}>{c.title}</ChoiceChip>
            ))}
          </ChoiceChips>
        </motion.div>

        {/* 5 columns per line on desktop, square images, linking to /categories/[slug] */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-x-3 gap-y-6 sm:gap-4 lg:gap-6">
          {categoriesCatalog
            .filter((category) => activeFilter.includes("all") || activeFilter.includes(category.slug))
            .map((category, index) => (
            <motion.div
              key={category.slug}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.05, ease: "easeOut" }}
              className="flex flex-col group"
            >
              <Link 
                href={`/categories/${category.slug}`}
                className="relative block aspect-square w-full overflow-hidden bg-muted/30 mb-3 sm:mb-5 rounded-lg border border-border/40 group-hover:border-foreground/30 transition-colors shadow-sm"
              >
                <NextImage
                  src={category.image.src}
                  alt={category.image.alt}
                  fill
                  quality={95}
                  className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/15 transition-colors duration-300" />
              </Link>
              
              <div className="flex flex-col items-center text-center px-1 sm:px-2">
                <Link href={`/categories/${category.slug}`}>
                  <h4 className="font-serif text-lg sm:text-2xl text-foreground font-light tracking-tight mb-1 sm:mb-2 hover:text-foreground transition-colors">
                    {category.title}
                  </h4>
                </Link>
                <p className="text-xs sm:text-sm text-muted-foreground font-light leading-snug sm:leading-relaxed mb-2 sm:mb-4 line-clamp-2">
                  {category.description}
                </p>
                <Link 
                  href={`/categories/${category.slug}`}
                  className="text-xs font-semibold uppercase tracking-[0.15em] text-foreground border-b border-foreground/30 pb-0.5 hover:border-foreground transition-colors inline-flex items-center gap-1 group/btn"
                >
                  <span>View Range</span>
                  <ArrowRight className="w-3 h-3 opacity-60 group-hover/btn:translate-x-0.5 transition-transform" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
