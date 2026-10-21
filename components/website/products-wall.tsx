"use client";

import DriftWall from "@/components/ui/drift-wall";
import { images } from "@/lib/content/images";
import { motion } from "framer-motion";

export function ProductsWall() {
  const getSrc = (img: any) => (typeof img === "string" ? img : img.src);

  const baseItems = [
    { image: getSrc(images.knit.src), title: "Knitwear Essentials" },
    { image: getSrc(images.woven.src), title: "Woven Shirts" },
    { image: getSrc(images.denim.src), title: "Premium Denim" },
    { image: getSrc(images.sweater.src), title: "Heavy Sweaters" },
    { image: getSrc(images.hero.src), title: "Apparel Collection" },
    { image: getSrc(images.development.src), title: "Product Development" },
  ];

  // Repeat and mix the items to fill the drifting wall
  const items = Array.from({ length: 15 }, (_, i) => baseItems[i % baseItems.length]);

  return (
    <section className="w-full py-10 sm:py-14 lg:py-16 bg-background border-t border-border/40 overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-screen-2xl mb-8 sm:mb-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="space-y-3 sm:space-y-4"
        >
          <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-primary flex items-center justify-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-primary" />
            Our Gallery
          </h2>
          <h3 className="font-serif text-2xl sm:text-4xl md:text-5xl font-light text-foreground leading-tight max-w-2xl mx-auto tracking-tight">
            Featured <span className="text-primary italic">Products</span><span className="text-primary">.</span>
          </h3>
        </motion.div>
      </div>

      {/* Desktop / tablet — 3D drifting wall with full clarity */}
      <div className="hidden sm:block" style={{ height: 600, width: "100%", position: "relative" }}>
        <DriftWall
          items={items}
          columns={5}
          tileWidth={250}
          tileHeight={300}
          gap={24}
          tilt={12}
          turn={-8}
          perspective={1200}
          depth={120}
          speed={35}
          direction="up"
          variance={0.45}
          parallax={0.6}
          lift={64}
          fade={0.18}
          dim={1}
          overlayColor="transparent"
          radius={14}
          roll={0}
          pauseOnHover={true}
          grayscale={false}
        />
      </div>

      {/* Phone — flat 2-column wall with a centre divider, full brightness, edge-to-edge */}
      <div className="relative w-full sm:hidden" style={{ height: 480 }}>
        <DriftWall
          items={items}
          columns={2}
          fitWidth={true}
          tileHeight={220}
          gap={12}
          tilt={0}
          turn={0}
          roll={0}
          perspective={1200}
          depth={0}
          speed={22}
          direction="up"
          variance={0.3}
          parallax={0}
          lift={0}
          fade={0.3}
          dim={1}
          overlayColor="transparent"
          radius={12}
          pauseOnHover={false}
          grayscale={false}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 left-1/2 z-10 w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-foreground/25 to-transparent"
        />
      </div>
    </section>
  );
}
