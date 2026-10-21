"use client";

import { motion } from "framer-motion";
import { ShieldCheck } from "lucide-react";

export function AwardsClient() {
  const awards = [
    "SCS Certificate",
    "Certificate of Compliance (WRAP)",
    "Wal-Mart Ethical Standard",
    "Walt Disney",
    "Sears",
    "Macys",
    "Target",
    "Tesco",
    "BSCI",
    "Workplace Conditions Assessment (WCA)",
    "Accord"
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
              Certifications & Awards.
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground font-light leading-relaxed max-w-2xl mx-auto">
              Our partner factories are awarded the highest international compliance and ethical standards. Quality and safety are the foundation of our manufacturing process.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Awards Grid */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-screen-xl mt-24">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {awards.map((award, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.05, ease: "easeOut" }}
              className="flex items-start p-6 bg-muted/20 border border-border/50 rounded-xl hover:bg-muted/40 transition-colors group"
            >
              <div className="mr-4 mt-0.5">
                <ShieldCheck className="w-5 h-5 text-muted-foreground group-hover:text-foreground transition-colors" />
              </div>
              <p className="text-sm font-medium leading-snug text-foreground/90 group-hover:text-foreground transition-colors">
                {award}
              </p>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
