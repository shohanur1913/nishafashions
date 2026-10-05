"use client";

import { motion } from "framer-motion";

export function TrustStrip() {
  const metrics = [
    { label: "Garments Shipped Annually", value: "2M+" },
    { label: "Quality Inspected", value: "100%" },
    { label: "Partner Factories", value: "15+" },
    { label: "Global Markets Served", value: "20+" },
  ];

  return (
    <section className="w-full border-b border-border bg-muted/30">
      <div className="container mx-auto px-4 py-8 sm:py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4 text-center divide-x-0 md:divide-x divide-border">
          {metrics.map((metric, index) => (
            <motion.div 
              key={index} 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1, ease: "easeOut" }}
              className="flex flex-col items-center justify-center space-y-2"
            >
              <span className="font-serif text-3xl sm:text-4xl font-medium tracking-tight text-foreground">
                {metric.value}
              </span>
              <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                {metric.label}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
