"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import NextImage from "next/image";
import { 
  ArrowLeft, 
  ArrowRight, 
  CheckCircle2, 
  Clock, 
  Factory, 
  PackageCheck, 
  ShieldCheck, 
  Layers, 
  Shirt, 
  Sparkles,
  ArrowUpRight,
  ChevronRight,
  SlidersHorizontal,
  Info
} from "lucide-react";
import { WhatsAppIcon } from "@/components/icons/whatsapp-icon";
import { openQuoteModal } from "@/components/website/quote-modal";
import { 
  CategorySlug, 
  DemographicId, 
  DEMOGRAPHICS, 
  SUBCATEGORIES_BY_CATEGORY, 
  MASTER_APPAREL_PRODUCTS, 
  ApparelProductItem,
  SubcategoryMeta 
} from "@/lib/content/apparel-taxonomy";
import { CategoryData } from "@/lib/content/categories";

interface CategoryExplorerClientProps {
  categoryData: CategoryData;
  allCategories: CategoryData[];
}

export function CategoryExplorerClient({ categoryData, allCategories }: CategoryExplorerClientProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentCategorySlug = categoryData.slug as CategorySlug;

  // Read initial demographic and item from URL query params or default to "mens"
  const paramGender = searchParams.get("gender") as DemographicId | null;
  const paramItem = searchParams.get("item");

  const [activeDemographic, setActiveDemographic] = useState<DemographicId>(
    paramGender && DEMOGRAPHICS.some(d => d.id === paramGender) ? paramGender : "mens"
  );

  const availableSubcategories: SubcategoryMeta[] = useMemo(() => {
    const catMap = SUBCATEGORIES_BY_CATEGORY[currentCategorySlug] || SUBCATEGORIES_BY_CATEGORY.knit;
    return catMap[activeDemographic] || catMap.mens || [];
  }, [currentCategorySlug, activeDemographic]);

  const [activeSubcategory, setActiveSubcategory] = useState<string>(
    paramItem || "all"
  );

  // Sync state when URL params change
  useEffect(() => {
    if (paramGender && DEMOGRAPHICS.some(d => d.id === paramGender)) {
      setActiveDemographic(paramGender);
    }
    if (paramItem) {
      setActiveSubcategory(paramItem);
    } else {
      setActiveSubcategory("all");
    }
  }, [paramGender, paramItem]);

  // Update URL helper without full reload
  const updateUrl = (gender: DemographicId, item: string) => {
    const params = new URLSearchParams(window.location.search);
    params.set("gender", gender);
    if (item && item !== "all") {
      params.set("item", item);
    } else {
      params.delete("item");
    }
    const newUrl = `${window.location.pathname}?${params.toString()}`;
    window.history.pushState(null, "", newUrl);
  };

  const handleDemographicChange = (demoId: DemographicId) => {
    setActiveDemographic(demoId);
    setActiveSubcategory("all");
    updateUrl(demoId, "all");
  };

  const handleSubcategoryChange = (subId: string) => {
    setActiveSubcategory(subId);
    updateUrl(activeDemographic, subId);
  };

  // Filter products matching current category, demographic, and subcategory
  const filteredProducts = useMemo(() => {
    // 1. Get from master taxonomy
    let items = MASTER_APPAREL_PRODUCTS.filter(
      p => p.categorySlug === currentCategorySlug && p.demographic === activeDemographic
    );

    if (activeSubcategory !== "all") {
      items = items.filter(p => p.subcategoryId === activeSubcategory);
    }

    // 2. Fallback if no specific products matched or master list is light for this subcategory
    if (items.length === 0) {
      // Return general category products mapped with IDs
      return categoryData.products.map((p, idx) => {
        const fallbackId = categoryData.slug === 'woven' ? idx + 1
          : categoryData.slug === 'knit' ? idx + 9
          : categoryData.slug === 'denim' ? idx + 17
          : categoryData.slug === 'sweater' ? idx + 25
          : idx + 32;

        const subMeta = availableSubcategories.find(s => s.id === activeSubcategory);
        const resolvedSubName = subMeta ? subMeta.name : (activeSubcategory !== "all" ? activeSubcategory : categoryData.title);

        return {
          id: `cat-${categoryData.slug}-${idx}`,
          numericId: typeof p.id === 'number' ? p.id : fallbackId,
          slug: `product-${fallbackId}`,
          name: p.name,
          categorySlug: currentCategorySlug,
          categoryTitle: categoryData.title,
          demographic: activeDemographic,
          demographicLabel: DEMOGRAPHICS.find(d => d.id === activeDemographic)?.label || "Men's",
          subcategoryId: activeSubcategory,
          subcategoryName: resolvedSubName,
          badge: p.badge || "Export Quality",
          specs: p.specs || "Custom export specifications available on inquiry",
          fabricComposition: categoryData.fabrics?.[0] || "100% Combed Cotton",
          gsmOrWeight: "",
          moq: categoryData.moq || "1,000 pcs",
          priceRange: "Inquire for FOB Chittagong",
          leadTime: categoryData.leadTime || "45-60 Days",
          productionCapacity: categoryData.productionCapacity || "1,000,000 pcs / month",
          finishes: categoryData.finishes || [],
          certifications: categoryData.certifications || [],
          colors: ["White", "Black", "Navy", "Heather Grey"],
          packaging: "Standard export polybag & carton packaging",
          detail: p.detail,
          image_src: typeof p.image === 'string' ? p.image : (p.image as any)?.src || categoryData.image.src,
        };
      });
    }

    return items;
  }, [currentCategorySlug, activeDemographic, activeSubcategory, categoryData, availableSubcategories]);


  const activeDemoInfo = DEMOGRAPHICS.find(d => d.id === activeDemographic) || DEMOGRAPHICS[0];
  const activeSubMeta = availableSubcategories.find(s => s.id === activeSubcategory);

  return (
    <div className="min-h-screen bg-background text-foreground pb-16 sm:pb-24">
      {/* Top Header / Breadcrumb Bar */}
      <section className="w-full border-b border-border/40 bg-muted/20 py-2 sm:py-2.5">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-screen-2xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
            {/* Breadcrumb Hierarchy */}
            <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-muted-foreground flex-wrap">
              <Link
                href="/"
                className="hover:text-foreground transition-colors font-medium text-foreground/80"
              >
                Home
              </Link>
              <ChevronRight className="w-3 h-3 opacity-40 shrink-0" />
              <Link
                href="/products"
                className="hover:text-foreground transition-colors font-medium text-foreground/80"
              >
                Capabilities
              </Link>
              <ChevronRight className="w-3 h-3 opacity-40 shrink-0" />
              <span className="text-foreground font-semibold">
                {categoryData.title}
              </span>
              <ChevronRight className="w-3 h-3 opacity-40 shrink-0" />
              <span className="text-primary font-medium">
                {activeDemoInfo.label} ({activeDemoInfo.bengaliLabel})
              </span>
              {activeSubMeta && (
                <>
                  <ChevronRight className="w-3 h-3 opacity-40 shrink-0" />
                  <span className="text-foreground font-semibold">
                    {activeSubMeta.name}
                  </span>
                </>
              )}
            </nav>

            {/* Category Switcher Tabs (Order: Knit -> Woven -> Denim -> Sweater -> Various Items) */}
            <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5 max-w-full">
              {allCategories.map((cat) => {
                const isActive = cat.slug === categoryData.slug;
                return (
                  <Link
                    key={cat.slug}
                    href={`/categories/${cat.slug}`}
                    className={`px-3 py-1 text-xs font-medium rounded-full transition-all whitespace-nowrap border cursor-pointer ${
                      isActive
                        ? "bg-primary text-primary-foreground border-primary shadow-2xs font-semibold"
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

      {/* Category Hero / Overview Section */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-screen-2xl pt-5 sm:pt-7 pb-4">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-border/50 pb-5">
          <div className="space-y-1.5 max-w-3xl">
            <div className="flex items-center gap-2.5 flex-wrap">
              <h1 className="font-serif text-2xl sm:text-4xl font-light text-foreground tracking-tight">
                {categoryData.title} Sourcing &amp; Manufacturing
              </h1>
              <span className="text-[11px] font-semibold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20">
                {categoryData.badge}
              </span>
            </div>
            <p className="text-xs sm:text-sm text-muted-foreground font-light leading-relaxed">
              {categoryData.heroIntro}
            </p>
          </div>

          {/* Sourcing Metrics Row */}
          <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground shrink-0">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-card border border-border/70 shadow-2xs">
              <PackageCheck className="w-4 h-4 text-primary" />
              <span>MOQ: <strong className="font-medium text-foreground">{categoryData.moq}</strong></span>
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-card border border-border/70 shadow-2xs">
              <Clock className="w-4 h-4 text-primary" />
              <span>Lead: <strong className="font-medium text-foreground">{categoryData.leadTime}</strong></span>
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-card border border-border/70 shadow-2xs">
              <Factory className="w-4 h-4 text-primary" />
              <span>Monthly: <strong className="font-medium text-foreground">{categoryData.productionCapacity}</strong></span>
            </span>
          </div>
        </div>
      </section>

      {/* LEVEL 2: Buyer Demographic Division Selector (Men's - Women's - Boy's - Girl's - Kids) */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-screen-2xl pt-2 pb-4">
        <div className="p-4 sm:p-5 rounded-2xl bg-card border border-border/80 shadow-xs space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-border/40 pb-3">
            <div className="flex items-center gap-2">
              <SlidersHorizontal className="w-4 h-4 text-primary" />
              <h2 className="text-sm font-semibold uppercase tracking-wider text-foreground">
                Step 1: Select Buyer Division (Demographic)
              </h2>
            </div>
            <span className="text-[11px] text-muted-foreground">
              International buyer presentations segmented by demographic standards
            </span>
          </div>

          {/* Demographic Tab Buttons */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2 sm:gap-3">
            {DEMOGRAPHICS.map((demo) => {
              const isSelected = activeDemographic === demo.id;
              return (
                <button
                  key={demo.id}
                  type="button"
                  onClick={() => handleDemographicChange(demo.id)}
                  className={`flex flex-col items-start p-3 sm:p-3.5 rounded-xl text-left transition-all border cursor-pointer relative ${
                    isSelected
                      ? "bg-primary text-primary-foreground border-primary shadow-xs ring-2 ring-primary/20"
                      : "bg-muted/40 hover:bg-muted text-foreground border-border/60 hover:border-foreground/30"
                  }`}
                >
                  <div className="flex items-center justify-between w-full">
                    <span className="text-sm sm:text-base font-bold tracking-tight">
                      {demo.label}
                    </span>
                    <span className={`text-[10px] px-1.5 py-0.5 rounded-md font-mono ${
                      isSelected ? "bg-white/20 text-white" : "bg-muted text-muted-foreground"
                    }`}>
                      {demo.bengaliLabel}
                    </span>
                  </div>
                  <span className={`text-[11px] line-clamp-1 mt-1 ${
                    isSelected ? "text-white/80" : "text-muted-foreground"
                  }`}>
                    {demo.badge}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* LEVEL 3: Product Subcategory / Family Picker (T-Shirts, Polo Shirts, Tank Tops, Hoodies, etc.) */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-screen-2xl pt-2 pb-6">
        <div className="p-4 sm:p-5 rounded-2xl bg-muted/30 border border-border/70 space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-border/40 pb-2.5">
            <div className="flex items-center gap-2">
              <Shirt className="w-4 h-4 text-primary" />
              <h3 className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-foreground">
                Step 2: Choose {activeDemoInfo.label} Product Family
              </h3>
            </div>
            <span className="text-[11px] text-muted-foreground">
              Select specific garment category to inspect style variations
            </span>
          </div>

          {/* Subcategory Pills */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
            <button
              type="button"
              onClick={() => handleSubcategoryChange("all")}
              className={`px-3.5 py-1.5 text-xs font-medium rounded-xl whitespace-nowrap transition-all border cursor-pointer shrink-0 ${
                activeSubcategory === "all"
                  ? "bg-foreground text-background border-foreground font-semibold shadow-xs"
                  : "bg-card text-muted-foreground border-border/70 hover:border-foreground/40 hover:text-foreground"
              }`}
            >
              All {activeDemoInfo.label} Items
            </button>

            {availableSubcategories.map((sub) => {
              const isSelected = activeSubcategory === sub.id;
              return (
                <button
                  key={sub.id}
                  type="button"
                  onClick={() => handleSubcategoryChange(sub.id)}
                  className={`px-3.5 py-1.5 text-xs font-medium rounded-xl whitespace-nowrap transition-all border cursor-pointer shrink-0 inline-flex items-center gap-1.5 ${
                    isSelected
                      ? "bg-primary text-primary-foreground border-primary font-semibold shadow-xs"
                      : "bg-card text-muted-foreground border-border/70 hover:border-foreground/40 hover:text-foreground"
                  }`}
                >
                  <span>{sub.name}</span>
                  <span className={`text-[10px] px-1.5 py-0.2 rounded-md ${
                    isSelected ? "bg-white/20 text-white" : "bg-muted text-muted-foreground"
                  }`}>
                    {sub.bengaliName}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* LEVEL 4: Product Cuts / Style Variations Grid (V-Neck, Round Neck, Drop Shoulder, Cut & Sew, etc.) */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-screen-2xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4 pb-2 border-b border-border/40">
          <div>
            <h2 className="text-base sm:text-xl font-serif font-light text-foreground tracking-tight flex items-center gap-2">
              <span>{activeDemoInfo.label} {activeSubMeta ? activeSubMeta.name : "Collection"}</span>
              <span className="text-xs font-mono font-medium text-muted-foreground px-2 py-0.5 rounded-full bg-muted">
                {filteredProducts.length} export styles
              </span>
            </h2>
            <p className="text-xs text-muted-foreground">
              {activeSubMeta?.description || `Commercial ${categoryData.title} styles available for foreign private label manufacturing`}
            </p>
          </div>

          <div className="text-[11px] text-muted-foreground shrink-0">
            Click any style to view full tech pack, GSM, MOQ &amp; FOB quote
          </div>
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {filteredProducts.map((prod) => {
            const productHref = `/products/${prod.numericId || prod.id}`;
            return (

              <div
                key={prod.id}
                className="group flex flex-col rounded-2xl bg-card border border-border/70 hover:border-primary/40 hover:shadow-lg transition-all duration-300 overflow-hidden h-full"
              >
                {/* Product Image Preview with Hover Zoom */}
                <Link
                  href={productHref}
                  className="relative aspect-[4/3] w-full bg-muted/40 overflow-hidden block"
                >
                  {prod.image_src ? (
                    <NextImage
                      src={prod.image_src}
                      alt={prod.name}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      className="object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                      <Shirt className="w-10 h-10 opacity-30" />
                    </div>
                  )}

                  {/* Top Badges */}
                  <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between pointer-events-none">
                    <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider bg-background/90 text-foreground backdrop-blur-xs border border-border/60 shadow-2xs">
                      {prod.badge}
                    </span>
                    <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-semibold bg-primary/90 text-primary-foreground backdrop-blur-xs shadow-2xs">
                      {prod.demographicLabel}
                    </span>
                  </div>
                </Link>

                {/* Card Content & Commercial Details */}
                <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-3">
                  <div className="space-y-1.5">
                    <div className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider flex items-center justify-between">
                      <span>{prod.subcategoryName && prod.subcategoryName !== "all" && prod.subcategoryName !== "Core Collection" ? prod.subcategoryName : prod.categoryTitle}</span>
                      {prod.gsmOrWeight && prod.gsmOrWeight !== "Standard Export Weight" && (
                        <span className="font-mono text-primary font-semibold">{prod.gsmOrWeight}</span>
                      )}
                    </div>


                    <Link href={productHref}>
                      <h3 className="font-medium text-sm sm:text-base text-foreground leading-snug group-hover:text-primary transition-colors line-clamp-2">
                        {prod.name}
                      </h3>
                    </Link>

                    <p className="text-xs text-muted-foreground line-clamp-2 font-light leading-relaxed">
                      {prod.detail}
                    </p>
                  </div>

                  {/* Commercial Terms Strip */}
                  <div className="pt-2 border-t border-border/50 space-y-1.5 text-xs">
                    <div className="flex items-center justify-between text-muted-foreground text-[11px]">
                      <span>Indicative FOB:</span>
                      <strong className="text-foreground font-semibold font-mono">{prod.priceRange}</strong>
                    </div>
                    <div className="flex items-center justify-between text-muted-foreground text-[11px]">
                      <span>MOQ:</span>
                      <span className="text-foreground font-medium">{prod.moq}</span>
                    </div>
                    <div className="flex items-center justify-between text-muted-foreground text-[11px]">
                      <span>Production Lead:</span>
                      <span className="text-foreground font-medium">{prod.leadTime}</span>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="pt-2 flex items-center gap-2">
                    <Link
                      href={productHref}
                      className="flex-1 inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-foreground text-background text-xs font-semibold hover:bg-primary hover:text-primary-foreground transition-all group/btn"
                    >
                      <span>View Specifications</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 transition-transform" />
                    </Link>

                    <button
                      type="button"
                      onClick={() => openQuoteModal({
                        productName: prod.name,
                        category: prod.categoryTitle,
                        leadTime: prod.leadTime,
                        moq: prod.moq,
                        price: prod.priceRange,
                      })}
                      className="p-2 rounded-xl bg-muted hover:bg-muted/80 text-foreground transition-colors cursor-pointer"
                      title="Request FOB Quotation"
                      aria-label="Request FOB Quotation"
                    >
                      <ArrowUpRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Technical Fabrications & Certifications Audit Summary */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-screen-2xl mt-10">
        <div className="p-5 sm:p-6 rounded-2xl bg-muted/20 border border-border/70 space-y-4">
          <div className="flex items-center justify-between border-b border-border/50 pb-3">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-primary" />
              <h3 className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-foreground">
                Technical Specifications &amp; Factory Compliance for {categoryData.title}
              </h3>
            </div>
            <span className="text-xs text-muted-foreground font-mono">
              Accord / RSC &amp; OEKO-TEX Standard 100 Certified
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 text-xs">
            <div className="space-y-1.5">
              <span className="font-bold uppercase tracking-wider text-foreground text-[11px] flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-primary" />
                <span>Fabrications &amp; Blends</span>
              </span>
              <p className="text-muted-foreground leading-relaxed">
                {categoryData.fabrics.join(" • ")}
              </p>
            </div>

            <div className="space-y-1.5">
              <span className="font-bold uppercase tracking-wider text-foreground text-[11px] flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-primary" />
                <span>Constructions &amp; Knitting Gauges</span>
              </span>
              <p className="text-muted-foreground leading-relaxed">
                {categoryData.constructions.join(" • ")}
              </p>
            </div>

            <div className="space-y-1.5">
              <span className="font-bold uppercase tracking-wider text-foreground text-[11px] flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-primary" />
                <span>Audits &amp; Certifications</span>
              </span>
              <p className="text-muted-foreground leading-relaxed">
                {categoryData.certifications.join(" • ")}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Direct Merchandiser WhatsApp & Tech Pack Inquire CTA */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-screen-2xl mt-8">
        <div className="p-6 sm:p-8 rounded-2xl bg-zinc-900 text-white flex flex-col lg:flex-row items-center justify-between gap-5 border border-zinc-800">
          <div className="space-y-1 text-center lg:text-left">
            <h3 className="font-serif text-xl sm:text-2xl font-light">
              Send your Tech Pack for {categoryData.title} sampling &amp; FOB costing
            </h3>
            <p className="text-xs sm:text-sm text-zinc-400 font-light">
              Our merchandising team provides indicative FOB breakdown, fabric swatch options, and lab dip schedules within 48 hours.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 shrink-0">
            <a
              href={`https://wa.me/8801715645766?text=${encodeURIComponent(
                `Hello Nisha Fashions Wear, I am an apparel buyer interested in ${activeDemoInfo.label} ${activeSubMeta ? activeSubMeta.name : categoryData.title} manufacturing in Bangladesh. Could you please share sample timeline and quotation?`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#25D366] hover:bg-[#20ba5a] text-white text-xs sm:text-sm font-semibold tracking-wide transition-all shadow-xs"
            >
              <WhatsAppIcon className="w-4 h-4 shrink-0" fill="#ffffff" />
              <span>WhatsApp Merchandiser</span>
            </a>

            <button
              type="button"
              onClick={() => openQuoteModal({
                category: categoryData.title,
                productName: `${activeDemoInfo.label} ${activeSubMeta ? activeSubMeta.name : categoryData.title}`,
              })}
              className="px-5 py-2.5 rounded-xl bg-white text-zinc-900 text-xs sm:text-sm font-semibold hover:bg-zinc-100 transition-colors cursor-pointer"
            >
              Request FOB Quote
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
