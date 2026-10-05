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
              Nisha Fashions Wear, an owner-managed enterprise, has been producing textiles for Men’s, Women’s, Boy’s, Girl’s clothing for more than Twenty years for the Europe, Canada and USA market.
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
              <h2 className="text-[11px] font-semibold uppercase tracking-[0.2em] text-muted-foreground mb-6">
                Corporate Philosophy
              </h2>
              <p className="text-2xl font-serif font-light leading-snug mb-8">
                From the very beginning, our corporate philosophy has been based on these four principles:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {principles.map((principle, idx) => (
                  <div key={idx} className="flex flex-col space-y-2 p-6 bg-muted/30 rounded-lg border border-border/50">
                    <span className="text-[10px] font-bold text-muted-foreground">0{idx + 1}</span>
                    <p className="text-sm font-medium leading-relaxed">{principle}</p>
                  </div>
                ))}
              </div>
              <p className="mt-8 text-muted-foreground font-light leading-relaxed">
                We are specialized on Knit items as well as all sort of Traditional-Fashionable Garments of T-shirt, Tank-Top, Polo Shirt, Rugby Shirt with latest printing/Embroidery. Besides we are always exporting all kinds of Woven items Jacket, Trouser, Denim Pant, Swim shorts, Bermuda shorts etc, and also Sweater Items.
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
                <h2 className="text-[11px] font-semibold uppercase tracking-[0.2em] text-muted-foreground mb-4">
                  Our Mission
                </h2>
                <p className="text-xl font-light leading-relaxed">
                  Our mission is to produce Top-quality Garments that models fair business practices and respects workers rights.
                </p>
              </div>
              
              <div>
                <h2 className="text-[11px] font-semibold uppercase tracking-[0.2em] text-muted-foreground mb-4">
                  Our Goal
                </h2>
                <p className="text-xl font-light leading-relaxed">
                  Firmly established Nisha Fashions Wear as an exporter that is capable of handling any complete package of garments manufacturing. This production would include multi-style options, quality products and on-time delivery with competitive price.
                </p>
              </div>

              <div>
                <h2 className="text-[11px] font-semibold uppercase tracking-[0.2em] text-muted-foreground mb-4">
                  Objective of the present plan
                </h2>
                <p className="text-xl font-light leading-relaxed">
                  Implement the production capacity that 5,00,000 pieces of Garments per month in Europe, Canada and U.S.
                </p>
              </div>
            </motion.section>

            {/* Environment & Quality */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              className="prose prose-zinc dark:prose-invert max-w-none prose-p:font-light prose-p:leading-relaxed"
            >
              <h2 className="text-3xl font-serif font-light tracking-tight mb-6">Work place Environment</h2>
              <p>
                We believe that a congenial work environment increases efficiency and motivates employees to deliver their best.
              </p>
              <p>
                The use of Electrical installations, overhead lamps, forced duct ventilation and generous spacing between equipment makes the production floor comfortable to work in and aesthetically appealing. Routes to be used in emergencies along with fire safety equipment like fire hydrants and smoke and fire detectors ensure the safety of the workers. Faucets with safe drinking water and hygienic toilets are provided in adequate numbers and positioned for easy access of all workers. There are separately designated toilets for female and male workers.
              </p>
              <p>
                Workers who have not attained the legal age of majority are not hired in this factory. Workers in these factories are graded according to law. The grade and the salaries are clearly stated in the appointment letters.
              </p>
              <p>
                Doctors and professional paramedics are employed full time in order to attend to medical emergencies as well as general health complaints of workers.
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
              <p className="text-sm font-light text-muted-foreground leading-relaxed">
                Factory personnel are qualified in the creation of high-quality Garments using both Knit and Woven cloth, Beside we also export all kinds of Sweater. The cutting department employs personnel who have been trained with the precision necessary to size and cut material, some who have more than ten years experience in this field.
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
              <p className="text-sm font-light text-muted-foreground leading-relaxed mb-6">
                All our attitudes and actions must be recognized as an expression of quality. Each delivery should create a recommendation for further business.
              </p>
              <p className="text-sm font-light text-muted-foreground leading-relaxed">
                Each Business concentrates on activities where its skilled people can provide service-led solution to customer’s needs by being fast, flexible and responsive. We know exactly where we want to go, because our customers will show us the way. It is our job to bring them quality, through the resources. This will make them (and us) more competitive.
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
              <h3 className="text-[11px] font-semibold uppercase tracking-[0.2em] text-muted-foreground mb-4">
                Banking Partner
              </h3>
              <div className="text-sm font-light text-muted-foreground leading-relaxed space-y-1">
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
