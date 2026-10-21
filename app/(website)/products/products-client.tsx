"use client";

import { motion } from "framer-motion";
import NextImage from "next/image";
import Link from "next/link";
import { images } from "@/lib/content/images";

export function ProductsClient() {
  const products = [
    {
      title: "Woven",
      description: "Precision-crafted formal and casual shirts, chinos, cargo trousers, and utility wear.",
      image: images.woven,
      href: "/categories/woven"
    },
    {
      title: "Knit",
      description: "Premium cotton single jersey, honeycomb pique polos, heavy fleeces, and athletic joggers.",
      image: images.knit,
      href: "/categories/knit"
    },
    {
      title: "Denim",
      description: "5-pocket jeans, denim trucker jackets, laser whisker washings, and stretch fabrications.",
      image: images.denim,
      href: "/categories/denim"
    },
    {
      title: "Sweater",
      description: "Fine gauge 14GG summer knits to heavy 3GG cable-knit pullovers and cardigans.",
      image: images.sweater,
      href: "/categories/sweater"
    },
    {
      title: "Various & Accessories",
      description: "Headwear, 6-panel caps, cushion athletic socks, eco canvas totes, and infant wear.",
      image: images.various,
      href: "/categories/various-items"
    },
    {
      title: "Production Sourcing & RFQ",
      description: "Request customized sample development, open-book FOB costing, and factory allocation.",
      image: images.hero,
      href: "/contact"
    }
  ];

  return (
    <div className="min-h-screen bg-background text-foreground pb-32">
      {/* Hero Section */}
      <section className="relative w-full pt-28 pb-16 overflow-hidden border-b border-border/40 bg-zinc-50 dark:bg-zinc-950">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="mb-3">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-[0.2em] bg-primary/10 text-primary border border-primary/20">
                Manufacturing Collections
              </span>
            </div>
            <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-light tracking-tight mb-4">
              Garment Sourcing &amp; Products.
            </h1>
            <p className="text-base sm:text-lg text-muted-foreground font-light leading-relaxed max-w-2xl mx-auto">
              Explore our comprehensive apparel production capabilities across Knitwear, Woven, Denim, Sweaters, and Accessories in Bangladesh.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Grid Layout (E-commerce Style) */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-screen-2xl mt-12 sm:mt-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
          {products.map((product, index) => (
            <motion.div
              key={product.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: (index % 3) * 0.1, ease: "easeOut" }}
              className="group flex flex-col"
            >
              <Link href={product.href} className="relative w-full aspect-[4/5] overflow-hidden bg-muted rounded-2xl mb-4 border border-border/60 shadow-xs">
                <NextImage
                  src={product.image.src}
                  alt={`${product.title} apparel manufacturing Bangladesh - Nisha Fashions Wear`}
                  fill
                  className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
              </Link>
              
              <div className="flex flex-col items-center text-center px-4 space-y-2">
                <h2 className="font-serif text-xl sm:text-2xl font-light tracking-tight text-foreground group-hover:text-primary transition-colors">
                  <Link href={product.href}>
                    {product.title}
                  </Link>
                </h2>
                <p className="text-xs sm:text-sm text-muted-foreground font-normal leading-relaxed">
                  {product.description}
                </p>
                <Link 
                  href={product.href}
                  className="text-xs font-semibold uppercase tracking-[0.15em] text-foreground border-b border-foreground/30 pb-0.5 hover:border-primary hover:text-primary transition-colors inline-block mt-2"
                >
                  Explore Catalog &rarr;
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
