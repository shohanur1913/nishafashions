"use client";

import NextImage from "next/image";
import { images } from "@/lib/content/images";
import { motion } from "framer-motion";
import HalftoneReveal from "@/components/ui/halftone-reveal";
import DotField from "@/components/ui/dot-field";

export function Compliance() {
  const certifications = [
    "BSCI",
    "SEDEX",
    "Oeko-Tex Standard 100",
    "Accord on Fire and Building Safety",
    "GOTS",
    "ISO 9001:2015"
  ];

  return (
    <section id="compliance" className="relative w-full py-10 sm:py-14 lg:py-16 bg-zinc-900 text-white overflow-hidden">
      
      {/* DotField Background */}
      <div className="absolute inset-0 z-0 opacity-40">
        <DotField
          dotRadius={1.5}
          dotSpacing={16}
          bulgeStrength={60}
          glowRadius={200}
          sparkle={true}
          waveAmplitude={0}
          cursorRadius={400}
          cursorForce={0.1}
          bulgeOnly={true}
          gradientFrom="#e4e4e7"
          gradientTo="#a1a1aa"
          glowColor="#18181b"
        />
      </div>

      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          
          {/* Content Side */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="space-y-8 order-2 lg:order-1"
          >
            <div className="space-y-4">
              <h2 className="text-xs font-semibold uppercase tracking-widest text-zinc-400">
                Ethics & Compliance
              </h2>
              <h3 className="font-serif text-3xl sm:text-4xl md:text-5xl font-light leading-tight">
                Uncompromising <br className="hidden sm:block" />
                Standards.
              </h3>
            </div>
            
            <p className="text-base font-normal leading-7 text-zinc-300 max-w-2xl">
              As a responsible Bangladesh garment manufacturer, we exclusively partner with factories that meet strict international compliance standards. 
              Ethical manufacturing and worker safety are non-negotiable baselines for every production run we manage as your apparel sourcing partner Bangladesh.
            </p>

            <div className="pt-8 border-t border-zinc-800">
              <h4 className="text-sm font-semibold uppercase tracking-widest text-zinc-500 mb-6">
                Partner Facility Certifications
              </h4>
              <ul className="grid grid-cols-2 gap-4">
                {certifications.map((cert, index) => (
                  <motion.li 
                    key={index} 
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.4, delay: index * 0.1, ease: "easeOut" }}
                    className="flex items-center text-base text-zinc-300"
                  >
                    <span className="w-1.5 h-1.5 bg-zinc-600 rounded-full mr-3" />
                    {cert}
                  </motion.li>
                ))}
              </ul>
            </div>
          </motion.div>

          {/* Image Side */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative aspect-video lg:aspect-square w-full overflow-hidden order-1 lg:order-2 bg-zinc-900 rounded-xl"
          >
            <HalftoneReveal
              src={typeof images.export.src === 'string' ? images.export.src : images.export.src.src}
              inkColor="#d4d4d8"
              paperColor="#18181b"
              mode="mono"
              dotDensity={90}
              angle={45}
              revealRadius={0.4}
              dotSize={1}
              shape="circle"
              contrast={1.15}
              invert={false}
              edge={0.8}
              follow={0.37}
              idleReveal={0}
              trigger="hover"
              borderRadius="12px"
            />
          </motion.div>

        </div>
      </div>
    </section>
  );
}
