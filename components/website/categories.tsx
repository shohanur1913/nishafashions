"use client";

import { useState, useEffect } from "react";
import NextImage from "next/image";
import Link from "next/link";
import { images } from "@/lib/content/images";
import { motion, AnimatePresence } from "framer-motion";
import { ChoiceChips, ChoiceChip } from "@/components/ui/choice-chips";
import { X, ArrowRight, CheckCircle2, Layers, Clock, ShieldCheck } from "lucide-react";
import { openQuoteModal } from "@/components/website/quote-modal";

interface CategoryItem {
  title: string;
  slug: string;
  badge: string;
  description: string;
  longDescription: string;
  image: (typeof images)["woven"];
  serviceHash: string;
  leadTime: string;
  products: { name: string; detail: string }[];
  fabrics: string[];
  certifications: string[];
}

export function Categories() {
  const [activeFilter, setActiveFilter] = useState<string[]>(["all"]);
  const [selectedCategory, setSelectedCategory] = useState<CategoryItem | null>(null);

  const categoriesData: CategoryItem[] = [
    {
      title: "Woven",
      slug: "woven",
      badge: "Tailored & Structured",
      description: "Precision-crafted shirts, trousers, and outerwear.",
      longDescription: "Structured garments where pattern engineering, drape, and fit consistency are decisive. Produced in specialized units with dedicated sample rooms and retained block patterns.",
      image: images.woven,
      serviceHash: "category-02",
      leadTime: "60-90 Days",
      products: [
        { name: "Formal & Casual Shirts", detail: "Poplin, Oxford, Chambray, Twill, Linen" },
        { name: "Chinos & Trousers", detail: "Stretch Twill, Canvas, Corduroy, Peached Finish" },
        { name: "Cargo Pants & Shorts", detail: "Ripstop, Heavy Twill, Multi-pocket Detailing" },
        { name: "Blouses & Tunics", detail: "Viscose, Rayon, TENCEL™, Poly-Cotton Blends" },
        { name: "Structured Dresses & Skirts", detail: "Yarn-dyed checks, clean felled seams, prints" },
        { name: "Overshirts & Light Jackets", detail: "Heavy Canvas, Flannel, Water-repellent" },
      ],
      fabrics: ["100% Cotton", "Cotton / Elastane", "Linen & Blends", "TENCEL™", "Recycled Poly"],
      certifications: ["OEKO-TEX® 100", "BSCI", "WRAP", "ISO 9001"],
    },
    {
      title: "Knit",
      slug: "knit",
      badge: "Core Volume & Basics",
      description: "Premium jersey, pique, and fleece essentials.",
      longDescription: "Our largest volume category. Most programmes run through vertically integrated units with on-site knitting, dyeing, cutting, and sewing for superior shade and handfeel consistency.",
      image: images.knit,
      serviceHash: "category-01",
      leadTime: "45-60 Days",
      products: [
        { name: "Crewneck & V-Neck T-Shirts", detail: "Single Jersey, Slub, Combed Organic Cotton" },
        { name: "Pique Polo Shirts", detail: "Classic Pique, Jacquard Rib Collars, Enzyme Wash" },
        { name: "Hoodies & Sweatshirts", detail: "French Terry, Heavy Brushed Fleece, Loopback" },
        { name: "Joggers & Track Pants", detail: "Heavyweight Fleece, Ribbed Cuffs, Custom Drawstrings" },
        { name: "Leggings & Bike Shorts", detail: "Cotton / Elastane Interlock, High Recovery Stretch" },
        { name: "Activewear & Performance Sets", detail: "Moisture Wicking, Poly / Spandex, Anti-odor" },
      ],
      fabrics: ["Organic Cotton (GOTS)", "BCI Cotton", "Modal / TENCEL™", "Cotton / Poly", "Recycled Poly (GRS)"],
      certifications: ["OEKO-TEX® 100", "GOTS", "GRS", "BSCI"],
    },
    {
      title: "Denim",
      slug: "denim",
      badge: "Specialized Washes & Fits",
      description: "Innovative washes and rigid/stretch fabrications.",
      longDescription: "Advanced wash engineering developed in partner laundries featuring laser, ozone, and low-water enzyme processes with documented reproducible wash recipes.",
      image: images.denim,
      serviceHash: "category-04",
      leadTime: "60-75 Days",
      products: [
        { name: "5-Pocket Classic Jeans", detail: "Slim, Straight, Relaxed, Wide-leg Fits" },
        { name: "Denim Jackets & Truckers", detail: "Rigid & Comfort Stretch, Custom Rivets & Shanks" },
        { name: "Denim Shirts & Overshirts", detail: "Lightweight 4.5oz - 7.5oz Denim & Chambray" },
        { name: "Denim Shorts & Skirts", detail: "Raw Cut, Distressed, Clean Finished Hems" },
        { name: "Dungarees & Overalls", detail: "Heavy Utility Denim, Contrast Stitching" },
        { name: "Non-Denim Garment Washed Bottoms", detail: "Over-dyed Twill, Enzyme Washed Chinos" },
      ],
      fabrics: ["Rigid Cotton", "Comfort Stretch", "Power Stretch", "Hemp Blends", "Recycled Cotton"],
      certifications: ["BSCI", "OEKO-TEX® 100", "ZDHC Aligned"],
    },
    {
      title: "Sweater",
      slug: "sweater",
      badge: "Flat-Knit: 3GG to 14GG",
      description: "Fine gauge to heavy cable-knit pullovers and cardigans.",
      longDescription: "Flat-knit production spanning fine 14GG merino blends to heavy 3GG chunky cables, produced on computerized multi-gauge flat-knit machinery.",
      image: images.sweater,
      serviceHash: "category-03",
      leadTime: "75-90 Days",
      products: [
        { name: "Crewneck & V-Neck Pullovers", detail: "7GG - 12GG, Computerized Flat-Knit" },
        { name: "Cardigans & Zip-Throughs", detail: "Fine & Chunky Gauges, Horn & Metal Buttons" },
        { name: "Cable-Knit & Aran Sweaters", detail: "3GG - 5GG Chunky Cable, Intricate Patterns" },
        { name: "Rollneck & Turtleneck Tops", detail: "Fine Gauge Merino, Cashmere-touch Acrylic" },
        { name: "Knitted Vests & Sleeveless", detail: "Preppy & Modern Layering Knitwear" },
        { name: "Knitted Beanies & Scarves", detail: "Jacquard, Ribbed, Matching Winter Accessories" },
      ],
      fabrics: ["100% Cotton", "Cotton / Acrylic", "Lambswool Blends", "Merino Blends", "Recycled Yarns"],
      certifications: ["BSCI", "SMETA", "OEKO-TEX® 100"],
    },
    {
      title: "Various Items",
      slug: "various-items",
      badge: "Accessories & Diversified",
      description: "Caps, berets, socks, gloves, bags, handicrafts, and home textiles.",
      longDescription: "Comprehensive accessory manufacturing complementing main apparel programmes, supporting multi-product collections and brand merchandising.",
      image: images.various,
      serviceHash: "category-05",
      leadTime: "45-60 Days",
      products: [
        { name: "Caps & Beanies", detail: "6-Panel Baseball Caps, Bucket Hats, Knitted Beanies" },
        { name: "Cotton & Athletic Socks", detail: "Crew, Ankle, Cushion Sole, Jacquard Logos" },
        { name: "Canvas Tote & Duffle Bags", detail: "Heavy Cotton Canvas, Jute, Screen Printed" },
        { name: "Gloves & Winter Accessories", detail: "Knitted Touchscreen Gloves, Mittens, Scarves" },
        { name: "Aprons & Kitchen Textiles", detail: "Twill, Canvas, Custom Leather Straps" },
        { name: "Handicrafts & Jute Goods", detail: "Traditional Artisanal Weaving, Eco-friendly" },
      ],
      fabrics: ["Cotton Canvas", "Heavy Twill", "Combed Cotton", "Natural Jute", "Polar Fleece"],
      certifications: ["OEKO-TEX® 100", "BSCI", "SEDEX"],
    },
  ];

  // Prevent body scroll when modal is active
  useEffect(() => {
    if (selectedCategory) {
      document.body.style.overflow = "hidden";
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") setSelectedCategory(null);
      };
      window.addEventListener("keydown", handleKeyDown);
      return () => {
        document.body.style.overflow = "unset";
        window.removeEventListener("keydown", handleKeyDown);
      };
    } else {
      document.body.style.overflow = "unset";
    }
  }, [selectedCategory]);

  return (
    <section id="categories" className="w-full py-10 sm:py-14 lg:py-16 bg-background border-t border-border/40">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-screen-2xl">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="flex flex-col items-center justify-center text-center mb-8 sm:mb-10 space-y-3 sm:space-y-4"
        >
          <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
            Product Capabilities
          </h2>
          <h3 className="font-serif text-2xl sm:text-4xl md:text-5xl font-light text-foreground leading-tight max-w-2xl tracking-tight">
            Specialized engineering for every category.
          </h3>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
          className="flex justify-center mb-6 sm:mb-10"
        >
          <ChoiceChips 
            multiple={false} 
            value={activeFilter} 
            onValueChange={(val) => {
              if (val.length === 0) setActiveFilter(["all"]);
              else setActiveFilter(val);
            }} 
            clearable={false}
            className="justify-center"
          >
            <ChoiceChip value="all" count={categoriesData.length}>All</ChoiceChip>
            {categoriesData.map(c => (
              <ChoiceChip key={c.slug} value={c.slug} count={1}>{c.title}</ChoiceChip>
            ))}
          </ChoiceChips>
        </motion.div>

        {/* 5 columns per line on desktop, square images */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-x-3 gap-y-6 sm:gap-4 lg:gap-6">
          {categoriesData
            .filter((category) => activeFilter.includes("all") || activeFilter.includes(category.slug))
            .map((category, index) => (
            <motion.div
              key={category.slug}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.05, ease: "easeOut" }}
              className="flex flex-col group cursor-pointer"
              onClick={() => setSelectedCategory(category)}
            >
              <div 
                className="relative block aspect-square w-full overflow-hidden bg-muted/30 mb-3 sm:mb-5 rounded-lg border border-border/40 group-hover:border-foreground/30 transition-colors shadow-sm"
              >
                <NextImage
                  src={category.image.src}
                  alt={category.image.alt}
                  fill
                  quality={95}
                  className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/15 transition-colors duration-300" />
              </div>
              
              <div className="flex flex-col items-center text-center px-1 sm:px-2">
                <h4 className="font-serif text-lg sm:text-2xl text-foreground font-light tracking-tight mb-1 sm:mb-2 group-hover:text-foreground transition-colors">
                  {category.title}
                </h4>
                <p className="text-xs sm:text-sm text-muted-foreground font-light leading-snug sm:leading-relaxed mb-2 sm:mb-4 line-clamp-2">
                  {category.description}
                </p>
                <button 
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedCategory(category);
                  }}
                  className="text-xs font-semibold uppercase tracking-[0.15em] text-foreground border-b border-foreground/30 pb-0.5 hover:border-foreground transition-colors inline-flex items-center gap-1 cursor-pointer"
                >
                  <span>View Range</span>
                  <ArrowRight className="w-3 h-3 opacity-60 group-hover:translate-x-0.5 transition-transform" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Category Products Modal */}
      <AnimatePresence>
        {selectedCategory && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedCategory(null)}
              className="fixed inset-0 bg-background/80 backdrop-blur-md"
            />

            {/* Modal Dialog */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", duration: 0.45, bounce: 0 }}
              className="relative w-full max-w-4xl bg-card text-card-foreground border border-border shadow-2xl rounded-2xl overflow-hidden z-10 flex flex-col max-h-[90vh]"
            >
              {/* Category Quick Selector Tabs */}
              <div className="flex items-center justify-between border-b border-border px-4 sm:px-6 py-3 bg-muted/40">
                <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5">
                  {categoriesData.map((cat) => (
                    <button
                      key={cat.slug}
                      onClick={() => setSelectedCategory(cat)}
                      className={`px-3 py-1 text-xs font-medium rounded-full transition-colors whitespace-nowrap cursor-pointer ${
                        selectedCategory.slug === cat.slug
                          ? "bg-foreground text-background shadow-xs"
                          : "text-muted-foreground hover:text-foreground hover:bg-muted"
                      }`}
                    >
                      {cat.title}
                    </button>
                  ))}
                </div>

                <button
                  onClick={() => setSelectedCategory(null)}
                  className="p-1.5 rounded-full hover:bg-muted text-muted-foreground hover:text-foreground transition-colors shrink-0 cursor-pointer ml-2"
                  aria-label="Close dialog"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Scrollable Content */}
              <div className="overflow-y-auto p-4 sm:p-6 lg:p-8 space-y-6 sm:space-y-8">
                {/* Header & Overview */}
                <div className="grid grid-cols-1 sm:grid-cols-12 gap-5 sm:gap-6 items-center">
                  <div className="relative aspect-square w-28 sm:w-full sm:col-span-4 rounded-xl overflow-hidden bg-muted border border-border/60 shrink-0 mx-auto sm:mx-0">
                    <NextImage
                      src={selectedCategory.image.src}
                      alt={selectedCategory.image.alt}
                      fill
                      className="object-cover"
                      sizes="(max-width: 640px) 120px, 240px"
                    />
                  </div>

                  <div className="sm:col-span-8 space-y-2.5 text-center sm:text-left">
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-medium tracking-wide uppercase bg-muted text-muted-foreground">
                      <Layers className="w-3 h-3" />
                      <span>{selectedCategory.badge}</span>
                    </div>

                    <h3 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-light text-foreground tracking-tight">
                      {selectedCategory.title} Product Range
                    </h3>

                    <p className="text-sm text-muted-foreground font-light leading-relaxed">
                      {selectedCategory.longDescription}
                    </p>

                    <div className="flex flex-wrap items-center gap-3 pt-1 text-xs text-muted-foreground justify-center sm:justify-start">
                      <span className="inline-flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-foreground/70" />
                        <span>Lead Time: <strong className="font-medium text-foreground">{selectedCategory.leadTime}</strong></span>
                      </span>
                      <span className="opacity-40">•</span>
                      <span className="inline-flex items-center gap-1">
                        <ShieldCheck className="w-3.5 h-3.5 text-foreground/70" />
                        <span>Certified Partner Units</span>
                      </span>
                    </div>
                  </div>
                </div>

                {/* Products Grid */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between border-b border-border pb-2">
                    <h4 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                      Available Products & Constructions
                    </h4>
                    <span className="text-xs text-muted-foreground">
                      {selectedCategory.products.length} Products
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3 pt-1">
                    {selectedCategory.products.map((prod, idx) => (
                      <div
                        key={idx}
                        className="p-3.5 rounded-xl bg-muted/30 hover:bg-muted/60 border border-border/50 transition-colors flex items-start gap-3"
                      >
                        <CheckCircle2 className="w-4 h-4 text-foreground/70 mt-0.5 shrink-0" />
                        <div className="space-y-0.5">
                          <p className="text-sm font-medium text-foreground tracking-tight">
                            {prod.name}
                          </p>
                          <p className="text-xs text-muted-foreground font-light">
                            {prod.detail}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Fabrics & Certifications */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-border/60">
                  <div className="space-y-2">
                    <h5 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      Key Fabrications
                    </h5>
                    <div className="flex flex-wrap gap-1.5">
                      {selectedCategory.fabrics.map((fabric, i) => (
                        <span key={i} className="text-xs px-2.5 py-1 rounded-md bg-muted/60 text-foreground/80 font-light">
                          {fabric}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h5 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      Facility Certifications
                    </h5>
                    <div className="flex flex-wrap gap-1.5">
                      {selectedCategory.certifications.map((cert, i) => (
                        <span key={i} className="text-xs px-2.5 py-1 rounded-md bg-muted/60 text-foreground/80 font-light">
                          {cert}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Footer Actions */}
              <div className="border-t border-border px-4 sm:px-6 py-4 bg-muted/30 flex flex-col sm:flex-row items-center justify-between gap-3">
                <Link
                  href={`/services#${selectedCategory.serviceHash}`}
                  onClick={() => setSelectedCategory(null)}
                  className="text-xs text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-1.5 order-2 sm:order-1"
                >
                  <span>View Full Technical Specs & Machinery</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>

                <div className="flex items-center gap-2.5 w-full sm:w-auto order-1 sm:order-2">
                  <button
                    type="button"
                    onClick={() => setSelectedCategory(null)}
                    className="flex-1 sm:flex-initial px-4 py-2 rounded-full border border-border text-xs font-medium hover:bg-muted transition-colors cursor-pointer"
                  >
                    Close
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedCategory(null);
                      openQuoteModal();
                    }}
                    className="flex-1 sm:flex-initial px-5 py-2 rounded-full bg-foreground text-background text-xs font-semibold hover:bg-foreground/90 transition-colors uppercase tracking-wider cursor-pointer shadow-sm"
                  >
                    Request Quote for {selectedCategory.title}
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
