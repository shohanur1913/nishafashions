import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { categoriesCatalog, getCategoryBySlug } from "@/lib/content/categories";
import { ArrowLeft, Clock, PackageCheck, Factory, ShieldCheck, CheckCircle2 } from "lucide-react";
import { EcommerceProductCard } from "@/components/website/ecommerce-product-card";

interface PageProps {
  params: Promise<{ category: string }>;
}

export async function generateStaticParams() {
  return categoriesCatalog.map((cat) => ({
    category: cat.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { category } = await params;
  const categoryData = getCategoryBySlug(category);

  if (!categoryData) {
    return {
      title: "Category Not Found | Nisha Fashions Wear",
    };
  }

  return {
    title: `${categoryData.title} Manufacturing & Sourcing Bangladesh | Nisha Fashions Wear`,
    description: `${categoryData.title} apparel manufacturing capabilities in Bangladesh. ${categoryData.description}`,
  };
}

export default async function CategoryDetailPage({ params }: PageProps) {
  const { category } = await params;
  const categoryData = getCategoryBySlug(category);

  if (!categoryData) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-background text-foreground pb-12 sm:pb-16">
      {/* Compact Top Navigation Bar */}
      <section className="w-full border-b border-border/40 bg-zinc-50 dark:bg-zinc-950 pt-20 sm:pt-22 pb-2.5">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-screen-2xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
            {/* Breadcrumb / Back Link */}
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Link
                href="/#categories"
                className="inline-flex items-center gap-1 hover:text-foreground transition-colors font-medium text-foreground/80"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Capabilities</span>
              </Link>
              <span className="opacity-40">/</span>
              <span className="text-foreground font-semibold">{categoryData.title}</span>
            </div>

            {/* Compact Category Switcher Tabs */}
            <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5">
              {categoriesCatalog.map((cat) => {
                const isActive = cat.slug === categoryData.slug;
                return (
                  <Link
                    key={cat.slug}
                    href={`/categories/${cat.slug}`}
                    className={`px-3 py-1 text-xs font-medium rounded-full transition-all whitespace-nowrap border cursor-pointer ${
                      isActive
                        ? "bg-foreground text-background border-foreground shadow-2xs font-semibold"
                        : "bg-muted/50 text-muted-foreground border-border/60 hover:border-foreground/30 hover:bg-muted hover:text-foreground"
                    }`}
                  >
                    {cat.title}
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Compact Header & Category Summary */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-screen-2xl pt-4 sm:pt-6 pb-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-border/50 pb-4">
          <div className="space-y-1 max-w-3xl">
            <div className="flex items-center gap-2">
              <h1 className="font-serif text-2xl sm:text-3xl font-light text-foreground tracking-tight">
                {categoryData.title} Collection
              </h1>
              <span className="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full bg-muted text-muted-foreground border border-border/40">
                {categoryData.badge}
              </span>
            </div>
            <p className="text-xs sm:text-sm text-muted-foreground font-light leading-snug">
              {categoryData.heroIntro}
            </p>
          </div>

          {/* Compact Metrics Pill Row */}
          <div className="flex flex-wrap items-center gap-2 text-[11px] text-muted-foreground shrink-0">
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-muted/40 border border-border/50">
              <PackageCheck className="w-3.5 h-3.5 text-foreground/70" />
              <span>MOQ: <strong className="font-medium text-foreground">{categoryData.moq}</strong></span>
            </span>
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-muted/40 border border-border/50">
              <Clock className="w-3.5 h-3.5 text-foreground/70" />
              <span>Lead: <strong className="font-medium text-foreground">{categoryData.leadTime}</strong></span>
            </span>
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-muted/40 border border-border/50">
              <Factory className="w-3.5 h-3.5 text-foreground/70" />
              <span>Cap: <strong className="font-medium text-foreground">{categoryData.productionCapacity}</strong></span>
            </span>
          </div>
        </div>
      </section>

      {/* Compact Products Grid (E-commerce Style) */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-screen-2xl pt-2">
        <div className="flex items-center justify-between mb-3 text-xs text-muted-foreground">
          <span className="font-medium uppercase tracking-wider text-foreground/80">
            {categoryData.title} Products ({categoryData.products.length})
          </span>
          <span className="text-[11px]">Instant WhatsApp Inquiry & Costing</span>
        </div>

        {/* 5-column grid on desktop, compact cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4">
          {categoryData.products.map((prod, idx) => (
            <EcommerceProductCard
              key={idx}
              product={prod}
              categoryTitle={categoryData.title}
              fallbackImage={categoryData.image.src}
            />
          ))}
        </div>
      </section>

      {/* Compact Technical Specs Bar */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-screen-2xl mt-8">
        <div className="p-4 sm:p-5 rounded-xl bg-muted/30 border border-border/60">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            {/* Fabrics */}
            <div className="space-y-1.5">
              <span className="font-bold uppercase tracking-wider text-zinc-950 dark:text-white text-[11px] flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-accent" />
                <span>Fabrications</span>
              </span>
              <p className="text-zinc-900 dark:text-zinc-100 font-medium text-xs leading-relaxed">
                {categoryData.fabrics.join(" • ")}
              </p>
            </div>

            {/* Constructions */}
            <div className="space-y-1.5">
              <span className="font-bold uppercase tracking-wider text-zinc-950 dark:text-white text-[11px] flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-accent" />
                <span>Constructions & Weaves</span>
              </span>
              <p className="text-zinc-900 dark:text-zinc-100 font-medium text-xs leading-relaxed">
                {categoryData.constructions.join(" • ")}
              </p>
            </div>

            {/* Certifications */}
            <div className="space-y-1.5">
              <span className="font-bold uppercase tracking-wider text-zinc-950 dark:text-white text-[11px] flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-accent" />
                <span>Audits & Certifications</span>
              </span>
              <p className="text-zinc-900 dark:text-zinc-100 font-medium text-xs leading-relaxed">
                {categoryData.certifications.join(" • ")}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Compact Bottom Action Bar */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-screen-2xl mt-6">
        <div className="p-4 sm:p-6 rounded-2xl bg-zinc-900 text-white flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="space-y-0.5 text-center sm:text-left">
            <h3 className="font-serif text-lg sm:text-xl font-light">
              Need custom tech packs or private label sampling for {categoryData.title}?
            </h3>
            <p className="text-xs text-zinc-400 font-light">
              Email tech packs to info@nishafashions.com or nazib@nishafashions.com. Indicative FOB response within 48h.
            </p>
          </div>

          <div className="flex items-center gap-2.5 shrink-0">
            <a
              href={`https://wa.me/8801715645766?text=${encodeURIComponent(`Hello Nisha Fashions, I would like to inquire about ${categoryData.title} manufacturing capabilities.`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 rounded-xl bg-[#25D366] hover:bg-[#20ba5a] text-white text-xs font-semibold tracking-wide transition-all shadow-xs"
            >
              Chat on WhatsApp
            </a>
            <Link
              href="/contact"
              className="px-4 py-2 rounded-xl bg-white text-zinc-900 text-xs font-semibold hover:bg-zinc-100 transition-colors"
            >
              Contact Team
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
