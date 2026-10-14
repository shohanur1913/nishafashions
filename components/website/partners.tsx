import LogoLoop from "@/components/ui/logo-loop";

const partnerLogos = [
  {
    node: <span className="font-serif text-2xl sm:text-3xl tracking-wide font-light whitespace-nowrap"><span className="text-xs uppercase font-sans tracking-widest opacity-60 mr-2">Canada</span>RD International, Walmart & Sears</span>,
    title: "Canada — RD International, Walmart & Sears",
  },
  {
    node: <span className="font-serif text-2xl sm:text-3xl tracking-wide font-light whitespace-nowrap"><span className="text-xs uppercase font-sans tracking-widest opacity-60 mr-2">Greece</span>Sprider <span className="text-sm font-sans tracking-normal opacity-50 italic">(now closed)</span></span>,
    title: "Greece — Sprider",
  },
  {
    node: <span className="font-serif text-2xl sm:text-3xl tracking-wide font-light whitespace-nowrap"><span className="text-xs uppercase font-sans tracking-widest opacity-60 mr-2">Greece</span>Koumatzidis Konstantinos Pvt.</span>,
    title: "Greece — Koumatzidis Konstantinos Pvt.",
  },
  {
    node: <span className="font-serif text-2xl sm:text-3xl tracking-wide font-light whitespace-nowrap"><span className="text-xs uppercase font-sans tracking-widest opacity-60 mr-2">Italy</span>Sipec</span>,
    title: "Italy — Sipec",
  },
  {
    node: <span className="font-serif text-2xl sm:text-3xl tracking-wide font-light whitespace-nowrap"><span className="text-xs uppercase font-sans tracking-widest opacity-60 mr-2">Italy</span>Comintex</span>,
    title: "Italy — Comintex",
  },
  {
    node: <span className="font-serif text-2xl sm:text-3xl tracking-wide font-light whitespace-nowrap"><span className="text-xs uppercase font-sans tracking-widest opacity-60 mr-2">USA</span>Blitzz</span>,
    title: "USA — Blitzz",
  },
  {
    node: <span className="font-serif text-2xl sm:text-3xl tracking-wide font-light whitespace-nowrap"><span className="text-xs uppercase font-sans tracking-widest opacity-60 mr-2">Manchester</span>Little Giant Ltd.</span>,
    title: "Manchester — Little Giant Ltd.",
  }
];

export function Partners() {
  return (
    <section className="w-full py-8 sm:py-10 bg-zinc-50 dark:bg-zinc-950 border-y border-border/40 overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 mb-4 sm:mb-6">
        <p className="text-center text-sm font-semibold uppercase tracking-widest text-muted-foreground">
          Selected Buyer Experience
        </p>
      </div>

      <div className="w-full relative h-[60px] sm:h-[80px] text-zinc-600 dark:text-zinc-400">
        <LogoLoop
          logos={partnerLogos}
          speed={30}
          direction="left"
          logoHeight={40}
          gap={80}
          hoverSpeed={10}
          scaleOnHover={false}
          fadeOut={true}
          fadeOutColor="var(--background)"
        />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 mt-4 sm:mt-6">
        <p className="text-center text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground/60">
          References available upon request
        </p>
      </div>
    </section>
  );
}
