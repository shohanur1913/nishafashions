"use client";

import NextImage from "next/image";
import { images } from "@/lib/content/images";
import { CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";

export function Process() {
  const steps = [
    {
      title: "Design & Sourcing",
      description: "Collaborative translation of your vision into technical specs, backed by extensive fabric and trim sourcing networks.",
    },
    {
      title: "Sample Development",
      description: "Rapid prototyping and iterative refinement to perfect fit, construction, and aesthetic details.",
    },
    {
      title: "Production Planning",
      description: "Rigorous factory allocation, capacity scheduling, and timeline management for on-time delivery.",
    },
    {
      title: "Quality Assurance",
      description: "Multi-stage inline and final AQL inspections conducted by our on-the-ground technical teams.",
    },
    {
      title: "Global Logistics",
      description: "End-to-end export management, carton packing, and freight coordination directly to your distribution centers.",
    },
  ];

  return (
    <section id="process" className="w-full py-4 sm:py-8 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-16 lg:gap-24 items-center">
          
          {/* Image Side */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative aspect-[4/5] w-full overflow-hidden bg-muted"
          >
            <NextImage
              src={images.development.src}
              alt={images.development.alt}
              fill
              className="object-cover object-center grayscale hover:grayscale-0 transition-all duration-700"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </motion.div>

          {/* Content Side */}
          <div className="flex flex-col space-y-8 sm:space-y-12">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <h2 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-4">
                Our Process
              </h2>
              <h3 className="font-serif text-3xl sm:text-4xl md:text-5xl font-light text-foreground leading-tight">
                From Concept <br />
                to Container.
              </h3>
              <p className="mt-6 text-lg text-muted-foreground font-light max-w-lg">
                We manage the entire supply chain complexity so you can focus on building your brand. Our disciplined approach guarantees consistency at scale.
              </p>
            </motion.div>

            <div className="space-y-8">
              {steps.map((step, index) => (
                <motion.div 
                  key={index} 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: index * 0.1, ease: "easeOut" }}
                  className="flex items-start"
                >
                  <div className="flex-shrink-0 mt-1">
                    <CheckCircle2 className="w-5 h-5 text-accent" />
                  </div>
                  <div className="ml-4">
                    <h4 className="text-base font-semibold text-foreground tracking-wide">
                      {step.title}
                    </h4>
                    <p className="mt-1 text-sm text-muted-foreground leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
