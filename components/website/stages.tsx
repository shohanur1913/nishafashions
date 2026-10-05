"use client";

import NextImage from "next/image";
import { images } from "@/lib/content/images";
import { motion } from "framer-motion";

export function Stages() {
  const stages = [
    {
      num: "01",
      title: "Yarn and knitting",
      description: "Mill production before cutting",
      // Reusing existing images as placeholders
      image: images.knit, 
    },
    {
      num: "02",
      title: "Fabric and shade",
      description: "Lab dips and shade bands approved",
      image: images.woven,
    },
    {
      num: "03",
      title: "Cutting",
      description: "Panels cut, bundled and issued",
      image: images.denim,
    },
    {
      num: "04",
      title: "Sewing floor",
      description: "Bulk production across allocated lines",
      image: images.sweater,
    },
    {
      num: "05",
      title: "Assembly",
      description: "Sewn to the approved sample",
      image: images.development,
    },
    {
      num: "06",
      title: "Embroidery",
      description: "Placement and sew-out approval",
      image: images.knit,
    },
    {
      num: "07",
      title: "Printing",
      description: "Strike-off through to bulk",
      image: images.woven,
    },
    {
      num: "08",
      title: "Trims and labels",
      description: "Buttons, labels and accessories",
      image: images.denim,
    },
    {
      num: "09",
      title: "Quality control",
      description: "Inline checks and final inspection",
      image: images.development,
    },
    {
      num: "10",
      title: "Packing",
      description: "Cartons marked, counted and staged",
      image: images.export,
    },
    {
      num: "11",
      title: "Despatch",
      description: "Ex-factory to the port",
      image: images.export,
    },
    {
      num: "12",
      title: "Shipment",
      description: "Documents issued on departure",
      image: images.hero,
    },
  ];

  return (
    <section id="process" className="w-full py-8 sm:py-16 bg-background border-t border-border/40 text-foreground">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-screen-2xl">
        <div className="flex flex-col items-center justify-center text-center mb-6 sm:mb-10 space-y-2 sm:space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <h2 className="text-[10px] sm:text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground mb-2 sm:mb-4">
              How We Work
            </h2>
          </motion.div>
          <motion.h3 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
            className="font-serif text-2xl sm:text-4xl md:text-5xl font-light tracking-tight"
          >
            Twelve stages, start to finish.
          </motion.h3>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-3.5 gap-y-5 sm:gap-x-6 sm:gap-y-8">
          {stages.map((stage, index) => (
            <motion.div
              key={stage.num}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: (index % 4) * 0.1, ease: "easeOut" }}
              className="flex flex-col group"
            >
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg sm:rounded-xl bg-muted mb-2.5 sm:mb-4 border border-border/40 shadow-xs sm:shadow-sm">
                <NextImage
                  src={stage.image.src}
                  alt={stage.title}
                  fill
                  className="object-cover object-center transition-all duration-700 group-hover:scale-105 opacity-90 group-hover:opacity-100 grayscale group-hover:grayscale-0"
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                />
              </div>
              
              <div className="flex flex-col px-0.5">
                <span className="text-[9px] sm:text-[10px] font-bold text-muted-foreground mb-0.5">
                  {stage.num}
                </span>
                <h4 className="text-xs sm:text-base font-semibold tracking-tight text-foreground mb-0.5 sm:mb-1">
                  {stage.title}
                </h4>
                <p className="text-[11px] sm:text-xs text-muted-foreground font-light leading-snug sm:leading-relaxed">
                  {stage.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
