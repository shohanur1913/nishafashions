"use client";

import NextImage from "next/image";
import { Button } from "@/components/ui/button";
import { images } from "@/lib/content/images";
import { site } from "@/lib/content/site";
import Link from "next/link";
import { motion } from "framer-motion";
import { WhatsAppIcon } from "@/components/icons/whatsapp-icon";

export interface HeroData {
  headline?: string;
  subheadline?: string;
  description?: string;
  ctaQuoteText?: string;
  ctaQuoteLink?: string;
  ctaWhatsappText?: string;
  ctaWhatsappNumber?: string;
  backgroundImage?: string;
}

function renderHeadline(headline: React.ReactNode) {
  if (typeof headline !== "string") return headline;

  if (headline.includes("<span")) {
    return <span dangerouslySetInnerHTML={{ __html: headline }} />;
  }

  if (headline.includes("Supplier & Sourcing Partner")) {
    const parts = headline.split("Supplier & Sourcing Partner");
    return (
      <>
        {parts[0]}
        <br className="hidden sm:block" />
        Supplier &amp;{" "}
        <span className="text-primary italic font-serif">Sourcing Partner</span>
        <span className="text-primary">.</span>
        {parts[1]}
      </>
    );
  }

  const words = headline.trim().split(" ");
  if (words.length > 3) {
    const main = words.slice(0, -2).join(" ");
    const accent = words.slice(-2).join(" ");
    return (
      <>
        {main}{" "}
        <span className="text-primary italic font-serif">{accent}</span>
      </>
    );
  }

  return headline;
}

export function Hero({ initialHero }: { initialHero?: HeroData }) {
  const rawHeadline = initialHero?.headline || (
    <>
      Bangladesh Apparel Manufacturer, <br className="hidden sm:block" />
      Supplier &amp;{" "}
      <span className="text-primary italic font-serif">Sourcing Partner</span>
      <span className="text-primary">.</span>
    </>
  );
  const headline = renderHeadline(rawHeadline);
  const subheadline = initialHero?.subheadline || "Proven Experience. Modern Apparel Solutions.";
  const description = initialHero?.description || "Nisha Fashions Wear manages flexible garment production through a trusted network of partner factories, supplying quality Knit, Woven, Denim and Sweater apparel for international buyers.";
  const renderDescription = (text: string) => {
    const parts = text.split(/(Nisha Fashions Wear)/i);
    return (
      <>
        {parts.map((part, i) =>
          part.toLowerCase() === "nisha fashions wear" ? (
            <span
              key={i}
              className="font-bold text-white text-lg sm:text-2xl tracking-tight inline drop-shadow-xs"
            >
              {part}
            </span>
          ) : (
            part
          )
        )}
      </>
    );
  };

  const quoteText = initialHero?.ctaQuoteText || "Get a Quote";
  const quoteLink = initialHero?.ctaQuoteLink || "/contact";
  const whatsappText = initialHero?.ctaWhatsappText || "WhatsApp Us";
  const bgSrc = initialHero?.backgroundImage || images.hero.src;

  return (
    <section className="relative min-h-[45vh] sm:min-h-[55vh] py-10 sm:py-14 lg:min-h-[460px] w-full flex items-center justify-center overflow-hidden bg-zinc-900">
      {/* Background Image */}
      <motion.div 
        initial={{ scale: 1.05, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="absolute inset-0 w-full h-full"
      >
        <NextImage
          src={bgSrc}
          alt={images.hero.alt}
          fill
          priority
          className="object-cover object-center opacity-55"
          sizes="100vw"
        />
        {/* Subtle gradient overlay to ensure text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/70" />
      </motion.div>

      {/* Ambient Brand Color Glow Background */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-80 bg-primary/20 blur-3xl rounded-full pointer-events-none z-[1]" />
      <div className="absolute -bottom-10 right-10 w-72 h-72 bg-primary/15 blur-3xl rounded-full pointer-events-none z-[1]" />

      {/* Content Container */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center">
        {/* Brand Pill Badge */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }}
          className="mb-3 sm:mb-4"
        >
          <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-[11px] font-semibold uppercase tracking-[0.2em] bg-white/10 text-white border border-white/20 shadow-xs backdrop-blur-md">
            <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
            Apparel Manufacturing &amp; Export Partner
          </span>
        </motion.div>

        <motion.h1 
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="font-serif text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-light text-white tracking-tight max-w-4xl mx-auto leading-tight"
        >
          {headline}
        </motion.h1>
        
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          className="mt-4 sm:mt-6 max-w-3xl mx-auto text-center space-y-3 sm:space-y-4"
        >
          <p className="text-lg sm:text-2xl font-light text-white">
            {subheadline}
          </p>
          <p className="text-base sm:text-xl font-normal leading-relaxed sm:leading-7 text-zinc-300">
            {renderDescription(description)}
          </p>
        </motion.div>

        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
          className="mt-6 sm:mt-10 flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center w-full sm:w-auto max-w-md sm:max-w-none"
        >
          <Button 
            size="lg" 
            variant="default" 
            className="rounded-full bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg shadow-primary/25 border border-primary/40 uppercase tracking-widest font-semibold text-xs h-14 px-8 w-full sm:w-auto transition-all active:scale-[0.98]"
            asChild
          >
            <Link href={quoteLink}>{quoteText}</Link>
          </Button>
          <Button 
            size="lg" 
            variant="outline" 
            className="rounded-full border border-white/20 text-white hover:bg-primary/10 hover:border-primary/50 hover:text-white uppercase tracking-widest font-semibold text-xs h-14 px-8 bg-black/25 backdrop-blur-md transition-all w-full sm:w-auto active:scale-[0.98]"
            asChild
          >
            <a href="https://wa.me/8801715645766" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2">
              <WhatsAppIcon className="w-5 h-5 shrink-0" fill="#25D366" />
              {whatsappText}
            </a>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}

