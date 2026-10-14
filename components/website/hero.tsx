"use client";

import NextImage from "next/image";
import { Button } from "@/components/ui/button";
import { images } from "@/lib/content/images";
import { site } from "@/lib/content/site";
import Link from "next/link";
import { motion } from "framer-motion";

export function Hero() {
  return (
    <section className="relative min-h-[45vh] sm:min-h-[55vh] py-8 sm:py-12 lg:min-h-[440px] w-full flex items-center justify-center overflow-hidden bg-zinc-900">
      {/* Background Image */}
      <motion.div 
        initial={{ scale: 1.05, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="absolute inset-0 w-full h-full"
      >
        <NextImage
          src={images.hero.src}
          alt={images.hero.alt}
          fill
          priority
          className="object-cover object-center opacity-60"
          sizes="100vw"
        />
        {/* Subtle gradient overlay to ensure text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/60" />
      </motion.div>

      {/* Content Container */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center">
        <motion.h1 
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light text-white tracking-tight max-w-4xl mx-auto leading-tight"
        >
          Bangladesh Apparel Manufacturer, <br className="hidden sm:block" />
          Supplier & Sourcing Partner
        </motion.h1>
        
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          className="mt-4 sm:mt-6 max-w-3xl mx-auto text-center space-y-4"
        >
          <p className="text-xl sm:text-2xl font-light text-white">
            Proven Experience. Modern Apparel Solutions.
          </p>
          <p className="text-lg md:text-xl font-normal leading-7 text-zinc-300">
            Nisha Fashions Wear manages flexible garment production through a trusted network of partner factories, supplying quality Knit, Woven, Denim and Sweater apparel for international buyers.
          </p>
        </motion.div>

        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
          className="mt-6 sm:mt-10 flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Button 
            size="lg" 
            variant="default" 
            className="rounded-full bg-white text-zinc-900 hover:bg-zinc-200 uppercase tracking-widest font-semibold text-xs h-14 px-8"
            asChild
          >
            <Link href="/contact">Get a Quote</Link>
          </Button>
          <Button 
            size="lg" 
            variant="outline" 
            className="rounded-full border-white text-white hover:bg-accent hover:border-accent hover:text-white uppercase tracking-widest font-semibold text-xs h-14 px-8 bg-transparent transition-colors"
            asChild
          >
            <a href="https://wa.me/8801715645766" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
              WhatsApp Us
            </a>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}

