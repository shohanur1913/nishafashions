"use client";

import { useState } from "react";
import NextImage from "next/image";
import Link from "next/link";
import { site } from "@/lib/content/site";
import { images } from "@/lib/content/images";
import { motion } from "framer-motion";
import { ChoiceChips, ChoiceChip } from "@/components/ui/choice-chips";

export function Categories() {
  const [activeFilter, setActiveFilter] = useState<string[]>(["all"]);

  const categoriesData = [
    {
      title: "Woven",
      slug: "woven",
      description: "Precision-crafted shirts, trousers, and outerwear.",
      image: images.woven,
    },
    {
      title: "Knit",
      slug: "knit",
      description: "Premium jersey, pique, and fleece essentials.",
      image: images.knit,
    },
    {
      title: "Denim",
      slug: "denim",
      description: "Innovative washes and rigid/stretch fabrications.",
      image: images.denim,
    },
    {
      title: "Sweater",
      slug: "sweater",
      description: "Fine gauge to heavy cable-knit pullovers and cardigans.",
      image: images.sweater,
    },
  ];

  return (
    <section id="categories" className="w-full py-8 sm:py-16 bg-background border-t border-border/40">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="flex flex-col items-center justify-center text-center mb-6 sm:mb-12 space-y-2 sm:space-y-4"
        >
          <h2 className="text-[11px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
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
            <ChoiceChip value="all" count={categoriesData.length}>All</ChoiceChip>
            {categoriesData.map(c => (
              <ChoiceChip key={c.slug} value={c.slug} count={1}>{c.title}</ChoiceChip>
            ))}
          </ChoiceChips>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-3 gap-y-6 sm:gap-6 lg:gap-8">
          {categoriesData
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
                href={`/#${category.slug}`}
                className="relative block aspect-[3/4] w-full overflow-hidden bg-muted/30 mb-3 sm:mb-6 rounded-md"
              >
                <NextImage
                  src={category.image.src}
                  alt={category.image.alt}
                  fill
                  quality={95}
                  className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 1024px) 50vw, 25vw"
                />
              </Link>
              
              <div className="flex flex-col items-center text-center px-1 sm:px-2">
                <h4 className="font-serif text-lg sm:text-2xl text-foreground font-light tracking-tight mb-1 sm:mb-2">
                  {category.title}
                </h4>
                <p className="text-[11px] sm:text-sm text-muted-foreground font-light leading-snug sm:leading-relaxed mb-2 sm:mb-4">
                  {category.description}
                </p>
                <Link 
                  href={`/#${category.slug}`}
                  className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.15em] text-foreground border-b border-foreground/30 pb-0.5 hover:border-foreground transition-colors"
                >
                  View Range
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
