"use client";

import NextImage from "next/image";
import { Button } from "@/components/ui/button";
import { images } from "@/lib/content/images";
import { site } from "@/lib/content/site";
import Link from "next/link";
import { motion } from "framer-motion";

export function Hero() {
  return (
    <section className="relative min-h-[50vh] sm:min-h-[60vh] py-12 sm:py-20 lg:min-h-[500px] w-full flex items-center justify-center overflow-hidden bg-zinc-900">
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
          Precision in every stitch. <br className="hidden sm:block" />
          Scale in every shipment.
        </motion.h1>
        
        <motion.p 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          className="mt-4 sm:mt-6 text-lg sm:text-xl text-zinc-300 max-w-2xl mx-auto font-light"
        >
          We are the architects of your supply chain. {site.experience}.
        </motion.p>

        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
          className="mt-6 sm:mt-10 flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Button 
            size="lg" 
            variant="default" 
            className="rounded-none bg-white text-zinc-900 hover:bg-zinc-200 uppercase tracking-widest font-semibold text-xs h-14 px-8"
            asChild
          >
            <Link href="#capabilities">Explore Capabilities</Link>
          </Button>
          <Button 
            size="lg" 
            variant="outline" 
            className="rounded-none border-white text-white hover:bg-white hover:text-zinc-900 uppercase tracking-widest font-semibold text-xs h-14 px-8 bg-transparent"
            asChild
          >
            <Link href="/contact">Partner With Us</Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}

