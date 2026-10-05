import LogoLoop from "@/components/ui/logo-loop";

const partnerLogos = [
  {
    node: <span className="font-serif text-3xl sm:text-4xl tracking-widest font-bold">INDITEX</span>,
    title: "Inditex",
  },
  {
    node: <span className="font-sans text-3xl sm:text-4xl tracking-tighter font-black">H&M</span>,
    title: "H&M",
  },
  {
    node: <span className="font-serif text-3xl sm:text-4xl tracking-normal italic font-semibold">Mango</span>,
    title: "Mango",
  },
  {
    node: <span className="font-sans text-3xl sm:text-4xl tracking-widest font-light">PRIMARK</span>,
    title: "Primark",
  },
  {
    node: <span className="font-serif text-3xl sm:text-4xl tracking-tight font-bold">CELIO*</span>,
    title: "Celio",
  },
  {
    node: <span className="font-sans text-3xl sm:text-4xl tracking-[0.2em] font-medium">Bestseller</span>,
    title: "Bestseller",
  },
  {
    node: <span className="font-serif text-3xl sm:text-4xl tracking-wider font-light">M&S</span>,
    title: "Marks & Spencer",
  },
  {
    node: <span className="font-sans text-3xl sm:text-4xl tracking-tight font-black italic">PUMA</span>,
    title: "Puma",
  },
];

export function Partners() {
  return (
    <section className="w-full py-12 sm:py-16 bg-zinc-50 dark:bg-zinc-950 border-y border-border/40 overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <p className="text-center text-sm font-semibold uppercase tracking-widest text-muted-foreground">
          Trusted by global apparel brands
        </p>
      </div>
      
      <div className="w-full relative h-[80px] text-zinc-400 dark:text-zinc-600">
        <LogoLoop
          logos={partnerLogos}
          speed={40}
          direction="left"
          logoHeight={40}
          gap={100}
          hoverSpeed={10}
          scaleOnHover={false}
          fadeOut={true}
          fadeOutColor="var(--background)"
        />
      </div>
    </section>
  );
}
