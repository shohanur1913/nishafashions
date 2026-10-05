"use client";

import { site } from "@/lib/content/site";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export function About() {
  return (
    <section id="about" className="w-full py-10 sm:py-32 bg-background border-t border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="max-w-4xl mx-auto text-center space-y-8 sm:space-y-12"
        >
          <div className="space-y-4">
            <h2 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              Our Philosophy
            </h2>
            <h3 className="font-serif text-4xl sm:text-5xl md:text-6xl font-light text-foreground leading-tight tracking-tight">
              Beyond Manufacturing.
            </h3>
          </div>
          
          <div className="space-y-6 text-lg sm:text-xl text-muted-foreground font-light leading-relaxed">
            <p>
              At {site.name}, we are architects of the global apparel supply chain. 
              We do not own a single factory; instead, we own the standard.
            </p>
            <p>
              By decoupling factory ownership from production management, we eliminate conflict of interest. 
              We match your specific product requirements with the exact facility best equipped to handle it—
              vetting for capability, compliance, and capacity. 
            </p>
            <p className="text-foreground font-medium">
              The result is a supply chain built for resilience, precision, and uncompromised quality.
            </p>
          </div>

          <div className="pt-8">
            <Button variant="outline" size="lg" className="rounded-none border-foreground text-foreground hover:bg-foreground hover:text-background uppercase tracking-widest font-semibold text-xs h-14 px-8" asChild>
              <Link href="/about">Read Our Full Story</Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
