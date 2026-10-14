"use client";

import { motion } from "framer-motion";
import NextImage from "next/image";
import Link from "next/link";
import { images } from "@/lib/content/images";

export default function ProductsPage() {
  const products = [
    {
      title: "Woven",
      description: "Precision-crafted shirts, trousers, and outerwear.",
      image: images.woven,
      href: "/contact"
    },
    {
      title: "Knit",
      description: "Premium jersey, pique, and fleece essentials.",
      image: images.knit,
      href: "/contact"
    },
    {
      title: "Denim",
      description: "Innovative washes and rigid/stretch fabrications.",
      image: images.denim,
      href: "/contact"
    },
    {
      title: "Sweater",
      description: "Fine gauge to heavy cable-knit pullovers.",
      image: images.sweater,
      href: "/contact"
    },
    {
      title: "Hot Deals",
      description: "View our latest discounted production runs.",
      image: images.hero,
      href: "/contact"
    },
    {
      title: "Various Items",
      description: "Caps, gloves, leather goods, and accessories.",
      image: images.development,
      href: "/contact"
    }
  ];

  return (
    <div className="min-h-screen bg-background text-foreground pb-32">
      {/* Hero Section */}
      <section className="relative w-full pt-32 pb-20 overflow-hidden border-b border-border/40 bg-zinc-50 dark:bg-zinc-950">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground mb-4">
              Collections
            </h2>
            <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-light tracking-tight mb-6">
              Product Categories.
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground font-light leading-relaxed max-w-2xl mx-auto">
              Explore our extensive manufacturing capabilities across all major apparel categories.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Grid Layout (E-commerce Style) */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-screen-2xl mt-16 sm:mt-24">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
          {products.map((product, index) => (
            <motion.div
              key={product.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: (index % 3) * 0.1, ease: "easeOut" }}
              className="group flex flex-col"
            >
              <Link href={product.href} className="relative w-full aspect-[4/5] overflow-hidden bg-muted rounded-lg mb-6">
                <NextImage
                  src={product.image.src}
                  alt={product.title}
                  fill
                  className="object-cover object-center transition-transform duration-1000 group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500" />
              </Link>
              
              <div className="flex flex-col items-center text-center px-4">
                <h3 className="font-serif text-2xl font-light tracking-tight text-foreground mb-2">
                  {product.title}
                </h3>
                <p className="text-sm text-muted-foreground font-light mb-4">
                  {product.description}
                </p>
                <Link 
                  href={product.href}
                  className="text-xs font-semibold uppercase tracking-[0.15em] text-foreground border-b border-foreground/30 pb-0.5 hover:border-foreground transition-colors"
                >
                  Inquire Now
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
