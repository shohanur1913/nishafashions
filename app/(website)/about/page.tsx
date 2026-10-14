"use client";

import { motion } from "framer-motion";
import NextImage from "next/image";
import { images } from "@/lib/content/images";

export default function AboutPage() {
  const principles = [
    "To steadily continue to develop in line with market needs.",
    "To respond flexibly to the demands set by the textile industry.",
    "To supply low-cost articles of the highest quality.",
    "To make the customers satisfaction with Good Quality and Timely Shipment."
  ];

  return (
    <div className="min-h-screen bg-background text-foreground pb-24">
      {/* Hero Section */}
      <section className="relative w-full pt-20 pb-12 overflow-hidden border-b border-border/40">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light tracking-tight mb-6">
              Our Story.
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground font-light leading-relaxed max-w-2xl mx-auto">
              Nisha Fashions Wear is a dedicated apparel production management and sourcing partner, backed by over 20 years of garment business experience serving the Europe, Canada, and USA markets.
            </p>
          </motion.div>
        </div>
      </section>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-screen-xl mt-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
          
          {/* Main Content Column */}
          <div className="lg:col-span-8 space-y-24">
            
            {/* Philosophy & Principles */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground mb-6">
                Corporate Philosophy
              </h2>
              <p className="text-2xl font-serif font-light leading-snug mb-8">
                From the very beginning, our corporate philosophy has been based on these four principles:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {principles.map((principle, idx) => (
                  <div key={idx} className="flex flex-col space-y-2 p-6 bg-muted/30 rounded-lg border border-border/50">
                    <span className="text-xs font-bold text-muted-foreground">0{idx + 1}</span>
                    <p className="text-sm font-medium leading-relaxed">{principle}</p>
                  </div>
                ))}
              </div>
              <p className="mt-8 text-base font-normal leading-7 text-foreground/80 max-w-2xl">
                We specialize in managing the production of Knitwear, Woven, Denim, and Sweater items. Through our trusted partner factory network, we ensure the highest quality manufacturing for all categories, from essential t-shirts and polo shirts to complex jackets, trousers, and sweaters.
              </p>
            </motion.section>

            {/* Mission, Goal, Objective */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              className="space-y-12"
            >
              <div>
                <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground mb-4">
                  Our Mission
                </h2>
                <p className="text-lg md:text-xl font-normal leading-7 text-foreground/80 max-w-2xl">
                  Our mission is to deliver top-quality garments through a reliable production network that models fair business practices and strictly respects workers' rights.
                </p>
              </div>
              
              <div>
                <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground mb-4">
                  Our Goal
                </h2>
                <p className="text-lg md:text-xl font-normal leading-7 text-foreground/80 max-w-2xl">
                  To firmly establish Nisha Fashions Wear as a premier export partner capable of handling complete garment manufacturing packages. We provide multi-style options, rigorous quality control, and on-time delivery at competitive prices.
                </p>
              </div>

              <div>
                <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground mb-4">
                  Objective of the present plan
                </h2>
                <p className="text-lg md:text-xl font-normal leading-7 text-foreground/80 max-w-2xl">
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
              className="prose prose-zinc dark:prose-invert max-w-2xl prose-p:font-normal prose-p:leading-7 prose-p:text-foreground/80"
            >
              <h3 className="font-serif text-2xl font-light mb-4">Work place Environment</h3>
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
          <div className="lg:col-span-4 space-y-12">
            
            {/* Image block */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative aspect-[3/4] w-full rounded-xl overflow-hidden bg-muted/30"
            >
              <NextImage
                src={images.development.src}
                alt="Factory personnel"
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
              className="p-8 bg-zinc-50 dark:bg-zinc-900 rounded-xl"
            >
              <h3 className="font-serif text-2xl font-light mb-4">Human Resources</h3>
              <p className="text-base font-normal leading-7 text-foreground/80">
                Our trusted network of partner factories employs highly qualified personnel skilled in the creation of premium Knitwear, Woven, Denim, and Sweater garments. From specialized cutting departments to expert sewing teams, we coordinate with experienced professionals to ensure precise manufacturing and exceptional finishing.
              </p>
            </motion.div>

            {/* Quality section */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="p-8 bg-zinc-50 dark:bg-zinc-900 rounded-xl"
            >
              <h3 className="font-serif text-2xl font-light mb-4">Quality Policy</h3>
              <p className="text-base font-normal leading-7 text-foreground/80 mb-6">
                Every stage of our production management is driven by a commitment to uncompromised quality. We believe that each successful shipment should serve as a recommendation for future business.
              </p>
              <p className="text-base font-normal leading-7 text-foreground/80">
                Our dedicated sourcing and quality assurance teams provide fast, flexible, and responsive solutions tailored to our buyers' needs. By meticulously overseeing factory allocation, production, and final export, we ensure our clients receive exceptional products that make them more competitive in the global market.
              </p>
            </motion.div>

            {/* Bank details */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="pt-8 border-t border-border/40"
            >
              <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground mb-4">
                Banking Partner
              </h3>
              <div className="text-base text-muted-foreground leading-relaxed space-y-1">
                <p className="font-medium text-foreground">Premier Bank Ltd.</p>
                <p>Dhanmondi Branch</p>
                <p>House # 84 (1st Floor), Road # 7/A</p>
                <p className="pt-2">Swift: <span className="font-medium">PRMRBDDH</span></p>
                <p>Tel: 9143081, 8124746, 9145186</p>
                <p>Fax: +880-2-9112395</p>
                <p>Email: prebank@bangla.net</p>
              </div>
            </motion.div>

          </div>

        </div>
      </div>
    </div>
  );
}
