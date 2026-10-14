"use client";

import { motion } from "framer-motion";
import NextImage from "next/image";
import Link from "next/link";
import { images } from "@/lib/content/images";
import { CheckCircle2, ArrowRight } from "lucide-react";
import { openQuoteModal } from "@/components/website/quote-modal";

export default function ProductsAndServicesPage() {
  const categories = [
    {
      num: "01",
      title: "Knitwear",
      intro: "Our largest category, and the strongest part of the Bangladesh base. Most knit programmes run through vertically integrated units with knitting, dyeing, cutting and sewing on one site, which shortens lead times and holds shade consistency.",
      image: images.knit,
      details: {
        "Products": "T-shirts, polo shirts, hoodies, sweatshirts, joggers, leggings, tank tops, jersey dresses, pyjama and lounge sets, base layers, activewear",
        "Constructions": "Single jersey, pique, interlock, 1×1 and 2×2 rib, French terry, loopback, brushed fleece, waffle, slub, melange",
        "Fibres": "Combed and carded cotton, organic cotton (GOTS), BCI cotton, cotton/elastane, polyester, recycled polyester (GRS), viscose, modal, TENCEL™, cotton/poly blends",
        "Weights": "Light jersey through to heavy brushed fleece",
        "Decoration": "Screen, pigment, discharge, water-based, puff, HD and foil print; all-over print; embroidery; appliqué; heat transfer; woven and printed labels"
      },
      atAGlance: {
        "Quantities & timing": "Confirmed per programme",
        "Typical certifications": "OEKO-TEX® 100, GOTS, GRS, BSCI"
      }
    },
    {
      num: "02",
      title: "Woven",
      intro: "Structured product in which pattern engineering and fit consistency are decisive. Our woven units operate dedicated sample rooms and retain graded blocks between seasons, so repeat orders match the original approved fit.",
      image: images.woven,
      details: {
        "Products": "Formal and casual shirts, blouses, dresses, skirts, trousers, chinos, shorts, cargos, jumpsuits, light outerwear, overshirts",
        "Constructions": "Poplin, twill, oxford, chambray, dobby, seersucker, canvas, ripstop, corduroy, flannel, linen weave, satin",
        "Fibres": "Cotton, cotton/elastane, linen and linen blends, viscose, rayon, polyester, poly/cotton, TENCEL™, recycled polyester (GRS)",
        "Finishes": "Peach, enzyme, easy-care, wrinkle-resistant, water-repellent, garment dye, garment wash, yarn-dyed checks and stripes",
        "Detailing": "Engineered plackets, matched checks, taped seams, felled seams, embroidery, pintucks, pleating, printed and woven trims"
      },
      atAGlance: {
        "Quantities & timing": "Confirmed per programme",
        "Typical certifications": "OEKO-TEX® 100, BSCI, WRAP, ISO 9001"
      }
    },
    {
      num: "03",
      title: "Sweater",
      intro: "Flat-knit production from heavy 3GG constructions to fine 14GG merino. Sweater lead times are frequently underestimated, as yarn dyeing and linking are time-intensive. We plan sweater calendars accordingly.",
      image: images.sweater,
      details: {
        "Products": "Crew and V-neck pullovers, cardigans, zip-throughs, roll and funnel necks, vests, knitted dresses, scarves, beanies, knitted accessories",
        "Gauges": "3GG, 5GG, 7GG, 9GG, 12GG, 14GG, computerised flat-knit and semi-automatic machines",
        "Techniques": "Jacquard, intarsia, cable, links-links, pointelle, rib structures, fully fashioned panels, hand linking, tipping and contrast trims",
        "Yarns": "Acrylic, cotton, cotton/acrylic, wool, lambswool, merino, mohair blends, alpaca blends, chenille, recycled polyester and recycled acrylic",
        "Note": "Yarn-dyed and multi-colour jacquard programmes take longer to plan. Book yarn early for autumn and winter ranges."
      },
      atAGlance: {
        "Quantities & timing": "Confirmed per programme",
        "Typical certifications": "BSCI, SMETA, OEKO-TEX® 100, RWS on request"
      }
    },
    {
      num: "04",
      title: "Denim & Bottoms",
      intro: "Wash development is central to denim. We develop recipes with partner laundries operating laser, ozone and enzyme processes, which reduces water and pumice consumption and provides a documented, repeatable recipe for reorders.",
      image: images.denim,
      details: {
        "Products": "Five-pocket jeans, jeggings, wide-leg and straight fits, denim jackets and shirts, skirts, shorts, dungarees, non-denim bottoms",
        "Fabrics": "Rigid denim, stretch and super-stretch, comfort stretch, black and coated denim across the usual weight range, recycled cotton denim, hemp blends",
        "Wash & finish": "Rinse, stone, enzyme, bleach, tint, over-dye, acid, laser whisker and 3D crease, ozone fading, hand sand, destruction and repair, resin",
        "Sustainability": "Laser and ozone finishing to reduce water and chemistry; wash recipes documented and reproducible across reorders",
        "Detailing": "Custom rivets, shank buttons, leather and jacron patches, chain-stitch hems, contrast bar-tacks, embroidery"
      },
      atAGlance: {
        "Quantities & timing": "Confirmed per programme",
        "Typical certifications": "BSCI, ZDHC-aligned laundry, OEKO-TEX® 100"
      }
    },
    {
      num: "05",
      title: "Uniforms & Workwear",
      intro: "Uniform programmes require consistent sizing across multiple years, fabric suitable for industrial laundering, and dependable replenishment. We retain approved size sets and fabric lots between drops so later reorders match the original delivery.",
      image: images.development,
      details: {
        "Sectors": "Corporate and office, hotel and hospitality, restaurant and kitchen, healthcare and medical scrubs, industrial and manufacturing, school, security, aviation, retail",
        "Products": "Shirts and blouses, polos, trousers, tunics, scrubs, chef wear, aprons, coveralls, boiler suits, hi-vis vests and jackets, lab coats, waistcoats",
        "Fabrics": "Poly/cotton 65/35 and 80/20, twill, gabardine, ripstop, stretch performance, antimicrobial and soil-release finishes, hi-vis fluorescent with retro-reflective tape",
        "Programme features": "Locked size specs, retained fabric lots, name and logo personalisation, size-run packing, drop-ship by location, annual replenishment calendars",
        "Standards": "EN ISO 20471 hi-vis and EN ISO 13688 general requirements available on request through certified partner units"
      },
      atAGlance: {
        "Quantities & timing": "Confirmed per programme"
      }
    },
    {
      num: "06",
      title: "Kidswear",
      intro: "Children’s apparel is subject to the strictest safety regulations in the industry. Every kidswear programme is developed against the destination market’s requirements from the outset, rather than verified only at final inspection.",
      image: images.hero,
      details: {
        "Range": "Newborn and infant bodysuits, sleepsuits, toddler sets, boys’ and girls’ tops and bottoms, dresses, outerwear, sleepwear, school uniform.",
        "Safety standards": "EN 14682 cords and drawstrings, EN 71-3 migration limits, CPSIA lead and phthalates, 16 CFR 1615/1616 sleepwear flammability, nickel release, small-parts pull testing.",
        "Testing": "Third-party testing through SGS, Intertek, Bureau Veritas or TUV, arranged and tracked by us, with reports issued before shipment."
      },
      atAGlance: {
        "Quantities & timing": "Confirmed per programme",
        "Typical certifications": "BSCI, OEKO-TEX® 100, GOTS"
      }
    }
  ];

  const services = [
    { title: "Factory Sourcing", desc: "We identify and allocate the best-fit manufacturing facilities based on your specific product requirements, volume, target price, and compliance standards." },
    { title: "Product Development", desc: "From tech pack creation and pattern making to sample development and fit correction, we manage the entire prototyping process." },
    { title: "Fabric & Trim Sourcing", desc: "We source high-quality local and imported materials, managing lab dips, hand looms, strike-offs, and trim approvals against your standards." },
    { title: "Costing", desc: "We provide transparent, open-book cost breakdowns covering fabric, trims, CM, wash, testing, and freight, ensuring you receive competitive pricing." },
    { title: "Merchandising", desc: "Our dedicated merchandising team oversees time-and-action (TNA) calendars, providing proactive updates to ensure every milestone is met." },
    { title: "Quality Assurance", desc: "We deploy on-the-ground technical teams for rigorous inline checks and final AQL inspections to guarantee uncompromised quality." },
    { title: "Compliance", desc: "We actively monitor factory certifications and ethical standards, ensuring all partner units meet the strict requirements of your destination markets." },
    { title: "Packing", desc: "We oversee all packing and presentation requirements, including ratio assortments, barcode ticketing, and GS1 carton marking for retail-ready delivery." },
    { title: "Shipping", desc: "We manage end-to-end export logistics, freight booking, container stuffing supervision, and full documentation to ensure seamless delivery." }
  ];

  return (
    <div className="min-h-screen bg-background text-foreground pb-24">
      {/* Hero Section */}
      <section className="relative w-full pt-20 pb-12 overflow-hidden border-b border-border/40 bg-zinc-50 dark:bg-zinc-950">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl font-light tracking-tight mb-8">
              Products and services.
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground font-light leading-relaxed max-w-3xl mx-auto mb-10">
              Six categories, one sourcing team. Each section below sets out the constructions, fabrics and finishes we run regularly.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={openQuoteModal}
                className="inline-flex items-center justify-center h-12 px-8 rounded-full bg-foreground text-background font-semibold text-sm hover:bg-foreground/90 transition-colors uppercase tracking-wider"
              >
                Request a quotation
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Visual Product Grid (E-commerce Style) */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-screen-2xl mt-10 sm:mt-16">
        <div className="mb-8 text-center">
          <h2 className="font-serif text-3xl sm:text-4xl font-light tracking-tight">Our Core Categories</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-10">
          {categories.map((category, index) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: (index % 3) * 0.1, ease: "easeOut" }}
              className="group flex flex-col cursor-pointer"
              onClick={() => {
                document.getElementById(`category-${category.num}`)?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              <div className="relative w-full aspect-[4/5] overflow-hidden bg-muted rounded-lg mb-6">
                <NextImage
                  src={category.image.src}
                  alt={category.title}
                  fill
                  className="object-cover object-center transition-transform duration-1000 group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500" />
              </div>
              
              <div className="flex flex-col items-center text-center px-4">
                <h3 className="font-serif text-2xl font-light tracking-tight text-foreground mb-2">
                  {category.title}
                </h3>
                <span className="text-xs font-semibold uppercase tracking-[0.15em] text-foreground border-b border-foreground/30 pb-0.5 group-hover:border-foreground transition-colors">
                  View Details
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Detailed Categories Content */}
      <section className="w-full py-12 sm:py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-screen-xl">
          <div className="space-y-16">
            {categories.map((category, index) => (
              <motion.div
                id={`category-${category.num}`}
                key={category.num}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center"
              >
                {/* Text Content */}
                <div className="lg:col-span-6 space-y-6">
                  <div>
                    <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground mb-4">
                      Category {category.num}
                    </h2>
                    <h3 className="font-serif text-4xl sm:text-5xl font-light tracking-tight mb-6">
                      {category.title}
                    </h3>
                    <p className="text-base font-normal leading-7 text-foreground/80 max-w-2xl">
                      {category.intro}
                    </p>
                  </div>

                  <div className="space-y-6 pt-6 border-t border-border/40">
                    {Object.entries(category.details).map(([key, value]) => (
                      <div key={key}>
                        <h4 className="text-sm font-semibold tracking-wide text-foreground mb-2">{key}</h4>
                        <p className="text-base font-normal leading-7 text-foreground/80">{value}</p>
                      </div>
                    ))}
                  </div>

                  <div className="p-8 bg-muted/30 rounded-xl space-y-4">
                    <h4 className="text-sm font-semibold tracking-wide uppercase">{category.title} at a glance</h4>
                    <ul className="space-y-3">
                      {Object.entries(category.atAGlance).map(([key, value]) => (
                        <li key={key} className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-4 text-sm">
                          <span className="font-medium min-w-[160px] text-foreground">{key}</span>
                          <span className="text-muted-foreground font-light">{value}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="pt-4">
                      <Link href="/contact" className="inline-flex items-center text-sm font-semibold uppercase tracking-widest hover:text-accent transition-colors border-b border-foreground/30 hover:border-accent pb-0.5">
                        Quote a {category.title.toLowerCase()} programme <ArrowRight className="ml-2 w-4 h-4" />
                      </Link>
                    </div>
                  </div>
                </div>

                {/* Image */}
                <div className="lg:col-span-6">
                  <div className="sticky top-32">
                    <div className="relative w-full aspect-[3/4] sm:aspect-square lg:aspect-[4/5] rounded-2xl overflow-hidden bg-muted">
                      <NextImage
                        src={category.image.src}
                        alt={category.title}
                        fill
                        className="object-cover object-center grayscale hover:grayscale-0 transition-all duration-1000"
                        sizes="(max-width: 1024px) 100vw, 50vw"
                      />
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Full Service Sourcing */}
      <section className="w-full py-12 sm:py-16 bg-zinc-50 dark:bg-zinc-950 border-t border-border/40">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-screen-xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mb-10"
          >
            <h2 className="font-serif text-4xl sm:text-5xl font-light tracking-tight mb-4">
              Full-service sourcing
            </h2>
            <p className="text-xl text-muted-foreground font-light leading-relaxed">
              Services included in our scope. All covered by our buying commission, not billed separately.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
            {services.map((service, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: idx * 0.05 }}
                className="space-y-4"
              >
                <div className="w-10 h-10 rounded-full bg-background border border-border flex items-center justify-center mb-4">
                  <CheckCircle2 className="w-5 h-5 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-semibold tracking-tight">{service.title}</h3>
                <p className="text-base font-normal leading-7 text-foreground/80">
                  {service.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Next Step CTA */}
      <section className="w-full py-12 sm:py-16 bg-background border-t border-border/40">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
              Next Step
            </h2>
            <h3 className="font-serif text-4xl sm:text-5xl font-light tracking-tight">
              Request a quotation for your next programme.
            </h3>
            <p className="text-lg text-muted-foreground font-light leading-relaxed">
              Send your styles, quantities and target price. We will come back with an indicative quotation and a proposed development calendar.
            </p>
            <div className="pt-8 flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button 
                onClick={openQuoteModal}
                className="inline-flex items-center justify-center h-14 px-8 rounded-full bg-foreground text-background font-semibold text-sm hover:bg-foreground/90 transition-colors uppercase tracking-wider w-full sm:w-auto"
              >
                Request a Quotation
              </button>
            </div>
            <p className="text-xs text-muted-foreground font-medium uppercase tracking-widest pt-4">
              No obligation · All designs treated as confidential
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
