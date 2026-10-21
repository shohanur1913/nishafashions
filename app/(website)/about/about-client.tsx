"use client";

import { motion } from "framer-motion";
import NextImage from "next/image";
import { images } from "@/lib/content/images";
import { PageHero } from "@/components/website/page-hero";
import { openQuoteModal } from "@/components/website/quote-modal";
import { MessageCircle } from "lucide-react";
import { BankingPartner } from "@/components/website/banking-partner";

export function AboutClient() {
  const principles = [
    "To steadily continue to develop in line with market needs.",
    "To respond flexibly to the demands set by the textile industry.",
    "To supply low-cost articles of the highest quality.",
    "To make the customers satisfaction with Good Quality and Timely Shipment."
  ];

  return (
    <div className="min-h-screen bg-background text-foreground pb-24">
      {/* Universal Page Hero with Brand Accents */}
      <PageHero
        badge="Corporate Heritage & Sourcing Partner"
        title={<>Our <span className="text-primary">Story.</span></>}
        description="Nisha Fashions Wear is a dedicated apparel production management and sourcing partner, backed by over 20 years of garment business experience serving the Europe, Canada, and USA markets."
      >
        <button
          type="button"
          onClick={openQuoteModal}
          className="px-5 py-2 rounded-full bg-primary text-primary-foreground text-xs font-semibold hover:bg-primary/90 transition-colors uppercase tracking-wider cursor-pointer shadow-xs"
        >
          Request Quotation
        </button>
        <a
          href="https://wa.me/8801715645766?text=Hello%20Nisha%20Fashions,%20I%20would%20like%20to%20discuss%20apparel%20production%20requirements."
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-zinc-700 text-white text-xs font-medium hover:bg-zinc-800 transition-colors"
        >
          <MessageCircle className="w-3.5 h-3.5 text-[#25D366]" />
          <span>WhatsApp Us</span>
        </a>
      </PageHero>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-screen-xl mt-10 sm:mt-16 lg:mt-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 sm:gap-14 lg:gap-20">
          
          {/* Main Content Column */}
          <div className="lg:col-span-8 space-y-12 sm:space-y-16 lg:space-y-20">
            
            {/* Philosophy & Principles */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-primary flex items-center gap-1.5 mb-4 sm:mb-6">
                <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                Corporate Philosophy
              </h2>
              <p className="text-xl sm:text-2xl font-serif font-light leading-snug mb-6 sm:mb-8">
                From the very beginning, our corporate philosophy has been based on these four principles:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                {principles.map((principle, idx) => (
                  <div key={idx} className="flex flex-col space-y-2 p-5 sm:p-6 bg-muted/40 rounded-xl border border-border/50">
                    <span className="text-xs font-bold text-primary">0{idx + 1}</span>
                    <p className="text-xs sm:text-sm font-medium leading-relaxed">{principle}</p>
                  </div>
                ))}
              </div>
              <p className="mt-6 sm:mt-8 text-sm sm:text-base font-normal leading-relaxed sm:leading-7 text-foreground/80 max-w-2xl">
                We specialize in managing the production of Knitwear, Woven, Denim, and Sweater items. Through our trusted partner factory network, we ensure the highest quality manufacturing for all categories, from essential t-shirts and polo shirts to complex jackets, trousers, and sweaters.
              </p>
            </motion.section>

            {/* Mission, Goal, Objective */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              className="space-y-8 sm:space-y-12"
            >
              <div>
                <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-primary flex items-center gap-1.5 mb-3 sm:mb-4">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                  Our Mission
                </h2>
                <p className="text-base sm:text-lg md:text-xl font-normal leading-relaxed sm:leading-7 text-foreground/80 max-w-2xl">
                  Our mission is to deliver top-quality garments through a reliable production network that models fair business practices and strictly respects workers' rights.
                </p>
              </div>
              
              <div>
                <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-primary flex items-center gap-1.5 mb-3 sm:mb-4">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                  Our Goal
                </h2>
                <p className="text-base sm:text-lg md:text-xl font-normal leading-relaxed sm:leading-7 text-foreground/80 max-w-2xl">
                  To firmly establish Nisha Fashions Wear as a premier export partner capable of handling complete garment manufacturing packages. We provide multi-style options, rigorous quality control, and on-time delivery at competitive prices.
                </p>
              </div>

              <div>
                <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-primary flex items-center gap-1.5 mb-3 sm:mb-4">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                  Objective of the present plan
                </h2>
                <p className="text-base sm:text-lg md:text-xl font-normal leading-relaxed sm:leading-7 text-foreground/80 max-w-2xl">
                  Deliver scalable production capacity and timely shipments for international markets including Europe, Canada, and the U.S.
                </p>
              </div>
            </motion.section>

            {/* Environment & Quality */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              className="prose prose-zinc max-w-2xl prose-p:font-normal prose-p:leading-relaxed sm:prose-p:leading-7 prose-p:text-foreground/80"
            >
              <h3 className="font-serif text-xl sm:text-2xl font-light mb-3 sm:mb-4">Work place Environment</h3>
              <p>
                We ensure that our partner factories maintain a congenial work environment, increasing efficiency and motivating personnel to deliver their best.
              </p>
              <p>
                Our selected production facilities feature proper electrical installations, adequate ventilation, and generous spacing, ensuring comfortable and safe working conditions. Strict fire safety measures and hygienic amenities are always maintained across our production network.
              </p>
              <p>
                We enforce a strict zero-tolerance policy for underage labor. All personnel within our partner factories are compensated according to law with transparent employment contracts.
              </p>
              <p>
                Our partner facilities employ professional medical staff to attend to any health emergencies and ensure continuous worker well-being.
              </p>
            </motion.section>

          </div>

          {/* Sidebar Column */}
          <div className="lg:col-span-4 space-y-8 sm:space-y-12">
            
            {/* Image block */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative aspect-[4/3] sm:aspect-[3/4] w-full rounded-2xl overflow-hidden bg-muted/30 border border-border/50"
            >
              <NextImage
                src={images.development.src}
                alt="Nisha Fashions Wear apparel product development studio and garment sampling"
                fill
                className="object-cover grayscale"
                sizes="(max-width: 1024px) 100vw, 33vw"
              />
            </motion.div>

            {/* Human section */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="p-6 sm:p-8 bg-card rounded-2xl border border-border/60 shadow-2xs"
            >
              <h3 className="font-serif text-xl sm:text-2xl font-light mb-3 sm:mb-4">Human Resources</h3>
              <p className="text-xs sm:text-sm font-normal leading-relaxed sm:leading-7 text-foreground/80">
                Our trusted network of partner factories employs highly qualified personnel skilled in the creation of premium Knitwear, Woven, Denim, and Sweater garments. From specialized cutting departments to expert sewing teams, we coordinate with experienced professionals to ensure precise manufacturing and exceptional finishing.
              </p>
            </motion.div>

            {/* Quality section */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="p-6 sm:p-8 bg-card rounded-2xl border border-border/60 shadow-2xs"
            >
              <h3 className="font-serif text-xl sm:text-2xl font-light mb-3 sm:mb-4">Quality Policy</h3>
              <p className="text-xs sm:text-sm font-normal leading-relaxed sm:leading-7 text-foreground/80 mb-4 sm:mb-6">
                Every stage of our production management is driven by a commitment to uncompromised quality. We believe that each successful shipment should serve as a recommendation for future business.
              </p>
              <p className="text-xs sm:text-sm font-normal leading-relaxed sm:leading-7 text-foreground/80">
                Our dedicated sourcing and quality assurance teams provide fast, flexible, and responsive solutions tailored to our buyers' needs. By meticulously overseeing factory allocation, production, and final export, we ensure our clients receive exceptional products that make them more competitive in the global market.
              </p>
            </motion.div>

          </div>

        </div>

        {/* Official Banking Partner - Full Width Section */}
        <BankingPartner />
      </div>
    </div>
  );
}
