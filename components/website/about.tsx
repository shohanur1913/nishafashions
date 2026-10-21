"use client";

import { site } from "@/lib/content/site";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export function About() {
  return (
    <section id="about" className="w-full py-4 sm:py-8 bg-background border-t border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="max-w-4xl mx-auto text-center space-y-8 sm:space-y-12"
        >
          <div className="space-y-4">
            <h2 className="text-xs font-semibold uppercase tracking-widest text-primary flex items-center justify-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-primary" />
              Our Philosophy
            </h2>
            <h3 className="font-serif text-4xl sm:text-5xl md:text-6xl font-light text-foreground leading-tight tracking-tight">
              Beyond <span className="text-primary italic">Manufacturing</span><span className="text-primary">.</span>
            </h3>
          </div>
          
          <div className="space-y-6 text-lg sm:text-xl text-muted-foreground font-light leading-relaxed">
            <p>
              At {site.name}, we operate as a Manufacturer, Production Management, Sourcing, and Export Partner. 
              Backed by {site.experience}, we receive orders under our company name and manage your complete production lifecycle.
            </p>
            <p>
              We execute orders through a trusted network of partner factories, carefully matching your specific product requirements with the facility best equipped to handle them—vetting for capability, compliance, and capacity.
            </p>
            <p className="text-foreground font-medium">
              By closely supervising sourcing, merchandising, quality control, and final export coordination, we ensure a supply chain built for resilience, precision, and uncompromised quality.
            </p>
          </div>

          <div className="pt-8">
            <Button variant="outline" size="lg" className="rounded-full border-primary text-primary hover:bg-primary hover:text-primary-foreground uppercase tracking-widest font-semibold text-xs h-14 px-8 transition-colors" asChild>
              <Link href="/about">Read Our Full Story</Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
