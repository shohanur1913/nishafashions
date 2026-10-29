"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import Link from "next/link";
import { ChevronDown, ArrowRight, MessageSquare } from "lucide-react";
import { WhatsAppIcon } from "@/components/icons/whatsapp-icon";
import { openQuoteModal } from "@/components/website/quote-modal";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export interface HeaderSimpleProps extends Omit<React.ComponentPropsWithoutRef<"header">, "children"> {
  logoImage?: string;
  logoText?: string;
  logoUrl?: string;
  logoSize?: number;
  activePage?: string;
  ctaShow?: boolean;
  ctaText?: string;
  ctaUrl?: string;
  ctaBackground?: string;
  ctaTextColor?: string;
  ctaRadius?: number;
  ctaFontSize?: number;
  ctaFontWeight?: number;
  ctaFontFamily?: string;
  backgroundColor?: string;
  borderColor?: string;
  showBorder?: boolean;
  borderRadius?: number;
  textColor?: string;
  navFontSize?: number;
  navGap?: number;
  horizontalPadding?: number;
  headerHeight?: number;
  desktopBreakpoint?: number;
  mobileBreakpoint?: number;
  menuBackground?: string;
  menuTextColor?: string;
  menuDividerColor?: string;
  hamburgerBackground?: string;
  isSticky?: boolean;
  fontFamily?: string;
}

const PANEL_SPRING = { type: "spring" as const, damping: 30, stiffness: 320, mass: 0.8 };

export function HeaderSimple({
  logoImage,
  logoText = "Brand",
  logoUrl = "/",
  logoSize = 48,
  activePage = "",
  ctaShow = true,
  ctaText = "Get a Quote",
  ctaUrl = "#",
  ctaBackground = "var(--brand, #E94D65)",
  ctaTextColor = "#ffffff",
  ctaRadius = 99,
  ctaFontSize = 14,
  ctaFontWeight = 600,
  ctaFontFamily = "",
  backgroundColor = "rgba(255, 255, 255, 0.8)",
  borderColor = "rgba(0,0,0,0.08)",
  showBorder = true,
  borderRadius = 0,
  textColor = "var(--foreground)",
  navFontSize = 13,
  navGap = 32,
  horizontalPadding = 32,
  headerHeight = 80,
  desktopBreakpoint = 1024,
  mobileBreakpoint = 540,
  menuBackground = "var(--background)",
  menuTextColor = "var(--foreground)",
  menuDividerColor = "rgba(0,0,0,0.08)",
  hamburgerBackground = "rgba(0,0,0,0.06)",
  isSticky = true,
  fontFamily = "inherit",
  className,
  style,
  ...props
}: HeaderSimpleProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const [hoveredNav, setHoveredNav] = React.useState<number | null>(null);
  const [mobileProductsOpen, setMobileProductsOpen] = React.useState(false);

  const wrapRef = React.useRef<HTMLElement>(null);
  const [containerWidth, setContainerWidth] = React.useState(1200);

  React.useLayoutEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    setContainerWidth(el.getBoundingClientRect().width);
    const ro = new ResizeObserver(([entry]) => setContainerWidth(entry.contentRect.width));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const isDesktop = containerWidth >= desktopBreakpoint;
  const isMobile = containerWidth < mobileBreakpoint;
  const isTablet = !isDesktop && !isMobile;

  const showInlineNav = isDesktop;
  const showInlineCTA = isDesktop || isTablet;
  const showHamburger = !isDesktop;

  const close = React.useCallback(() => {
    setIsOpen(false);
    setHoveredNav(null);
    setMobileProductsOpen(false);
  }, []);

  React.useEffect(() => {
    if (!isDesktop) return;
    const t = setTimeout(close, 0);
    return () => clearTimeout(t);
  }, [isDesktop, close]);

  const ctaButton = (
    <motion.button
      onClick={(e) => {
        e.preventDefault();
        close();
        openQuoteModal();
      }}
      whileHover={{ opacity: 0.88 }}
      whileTap={{ scale: 0.96 }}
      transition={{ duration: 0.15 }}
      className="inline-flex items-center rounded-full whitespace-nowrap select-none shadow-sm h-12 px-6"
      style={{ background: ctaBackground, color: ctaTextColor, borderRadius: ctaRadius, fontSize: ctaFontSize, fontWeight: ctaFontWeight, fontFamily: ctaFontFamily || "inherit", letterSpacing: -0.1 }}
    >
      {ctaText}
    </motion.button>
  );

  return (
    <header
      ref={wrapRef}
      className={cn("w-full transition-colors duration-300", isSticky ? "sticky top-0 z-40 backdrop-blur-xl supports-[backdrop-filter]:bg-background/95 bg-background/95 border-b border-border/60 shadow-xs" : "relative", className)}
      style={{ fontFamily, ...style }}
      {...props}
    >
      <div
        className="relative z-[2] box-border flex items-center justify-between overflow-visible mx-auto max-w-screen-2xl"
        style={{
          height: headerHeight,
          padding: isMobile ? "0 16px" : `0 ${horizontalPadding}px`,
          borderBottom: showBorder ? `1px solid var(--border)` : "none",
        }}
      >
        <Link href={logoUrl || "/"} onClick={close} className="flex shrink-0 items-center gap-2.5 no-underline">
          {logoImage ? <img src={logoImage} alt={logoText || ""} className="block w-auto" style={{ height: isMobile ? 38 : logoSize }} /> : (
            <span className="leading-none font-bold select-none" style={{ fontSize: isMobile ? 16 : 18, color: textColor, letterSpacing: -0.3 }}>
              {logoText}
            </span>
          )}
        </Link>

        {showInlineNav && (
          <nav className="absolute left-1/2 flex -translate-x-1/2 items-center text-sm font-semibold text-foreground" style={{ gap: navGap }}>
            <Link href="/" className="hover:text-accent transition-colors py-2">Home</Link>
            <Link href="/about" className="hover:text-accent transition-colors py-2">About</Link>
            
            <div className="relative group py-6 cursor-pointer">
              <div className="flex items-center gap-1.5 hover:text-accent transition-colors py-2">
                <span>Products</span> 
                <ChevronDown className="w-3.5 h-3.5 opacity-70 group-hover:rotate-180 transition-transform" />
              </div>
              
              <div className="absolute top-[65px] left-1/2 -translate-x-1/2 hidden group-hover:block w-max min-w-[240px] bg-background border border-border/80 shadow-2xl rounded-2xl p-3 z-50">
                <div className="text-[11px] font-bold text-muted-foreground px-2.5 py-1 tracking-widest uppercase whitespace-nowrap">
                  Apparel Categories
                </div>
                <div className="space-y-1 mt-1">
                  <Link
                    href="/categories/knit"
                    className="flex items-center justify-between gap-4 group/item px-3 py-2 rounded-xl hover:bg-muted/70 transition-colors whitespace-nowrap"
                  >
                    <span className="font-medium text-foreground group-hover/item:text-primary transition-colors text-sm">
                      Knitwear
                    </span>
                    <ArrowRight className="w-3.5 h-3.5 text-muted-foreground opacity-0 group-hover/item:opacity-100 group-hover/item:translate-x-0.5 transition-all" />
                  </Link>
                  <Link
                    href="/categories/woven"
                    className="flex items-center justify-between gap-4 group/item px-3 py-2 rounded-xl hover:bg-muted/70 transition-colors whitespace-nowrap"
                  >
                    <span className="font-medium text-foreground group-hover/item:text-primary transition-colors text-sm">
                      Woven
                    </span>
                    <ArrowRight className="w-3.5 h-3.5 text-muted-foreground opacity-0 group-hover/item:opacity-100 group-hover/item:translate-x-0.5 transition-all" />
                  </Link>
                  <Link
                    href="/categories/denim"
                    className="flex items-center justify-between gap-4 group/item px-3 py-2 rounded-xl hover:bg-muted/70 transition-colors whitespace-nowrap"
                  >
                    <span className="font-medium text-foreground group-hover/item:text-primary transition-colors text-sm">
                      Denim & Bottoms
                    </span>
                    <ArrowRight className="w-3.5 h-3.5 text-muted-foreground opacity-0 group-hover/item:opacity-100 group-hover/item:translate-x-0.5 transition-all" />
                  </Link>
                  <Link
                    href="/categories/sweater"
                    className="flex items-center justify-between gap-4 group/item px-3 py-2 rounded-xl hover:bg-muted/70 transition-colors whitespace-nowrap"
                  >
                    <span className="font-medium text-foreground group-hover/item:text-primary transition-colors text-sm">
                      Sweaters
                    </span>
                    <ArrowRight className="w-3.5 h-3.5 text-muted-foreground opacity-0 group-hover/item:opacity-100 group-hover/item:translate-x-0.5 transition-all" />
                  </Link>
                  <Link
                    href="/categories/various-items"
                    className="flex items-center justify-between gap-4 group/item px-3 py-2 rounded-xl hover:bg-muted/70 transition-colors whitespace-nowrap"
                  >
                    <span className="font-medium text-foreground group-hover/item:text-primary transition-colors text-sm">
                      Various Items & Workwear
                    </span>
                    <ArrowRight className="w-3.5 h-3.5 text-muted-foreground opacity-0 group-hover/item:opacity-100 group-hover/item:translate-x-0.5 transition-all" />
                  </Link>
                  <Link
                    href="/hot-deals"
                    className="flex items-center justify-between gap-4 group/item px-3 py-2 rounded-xl bg-rose-500/10 hover:bg-rose-500/15 border border-[#E94D65]/20 transition-colors whitespace-nowrap mt-1"
                  >
                    <span className="font-semibold text-[#E94D65] flex items-center gap-1.5 text-sm">
                      <span>🔥 Hot Deals & Offers</span>
                    </span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#E94D65] group-hover/item:translate-x-0.5 transition-transform" />
                  </Link>
                </div>
                <div className="mt-2 pt-2 border-t border-border/60 px-1">
                  <Link
                    href="/services"
                    className="flex items-center text-xs text-foreground font-semibold hover:text-primary transition-colors py-1 px-2 rounded-lg hover:bg-muted/50 whitespace-nowrap"
                  >
                    <span>View All Products & Services</span>
                    <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
                  </Link>
                </div>
              </div>
            </div>

            <Link href="/hot-deals" className="text-[#E94D65] hover:opacity-85 transition-opacity py-2 font-semibold">Hot Deals</Link>
            <Link href="/services" className="hover:text-accent transition-colors py-2">Services</Link>
            <Link href="/#process" className="hover:text-accent transition-colors py-2">How We Work</Link>
            <Link href="/contact" className="hover:text-accent transition-colors py-2">Contact</Link>
          </nav>
        )}

        <div className="flex shrink-0 items-center gap-3 sm:gap-5">
          {showInlineCTA && (
            <div className="flex items-center gap-3 sm:gap-5">
              <a href="https://wa.me/8801715645766" target="_blank" rel="noreferrer" className="flex items-center gap-2 text-emerald-600 hover:text-emerald-700 transition-colors" title="Chat on WhatsApp (+88 01715 645766)">
                <WhatsAppIcon className="w-5 h-5 sm:w-6 sm:h-6 shrink-0" fill="#25D366" />
                <span className="text-xs font-bold tracking-wide hidden xl:inline">+88 01715 645766</span>
              </a>
              {ctaShow && ctaText && ctaButton}
            </div>
          )}

          {showHamburger && (
            <motion.button
              onClick={() => setIsOpen((o) => !o)}
              whileTap={{ scale: 0.88 }}
              transition={{ duration: 0.12 }}
              aria-label={isOpen ? "Close menu" : "Open menu"}
              aria-expanded={isOpen}
              className="relative flex h-[42px] w-[42px] shrink-0 cursor-pointer items-center justify-center rounded-full border border-border/60 outline-none bg-muted/60 hover:bg-muted"
            >
              <motion.span
                animate={{ rotate: isOpen ? 45 : 0, y: isOpen ? 0 : -3.5 }}
                transition={{ type: "spring", damping: 22, stiffness: 300 }}
                className="absolute block h-[1.5px] w-[18px] rounded-[2px]"
                style={{ background: textColor }}
              />
              <motion.span
                animate={{ rotate: isOpen ? -45 : 0, y: isOpen ? 0 : 3.5 }}
                transition={{ type: "spring", damping: 22, stiffness: 300 }}
                className="absolute block h-[1.5px] w-[18px] rounded-[2px]"
                style={{ background: textColor }}
              />
            </motion.button>
          )}
        </div>
      </div>

      {showHamburger && (
        <motion.div
          initial={false}
          animate={{ height: isOpen ? "auto" : 0, marginTop: isOpen ? 0 : 0 }}
          transition={PANEL_SPRING}
          className="relative z-[1] overflow-hidden bg-background border-b border-border shadow-lg"
        >
          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="flex flex-col"
                style={{ padding: `16px ${horizontalPadding}px 24px` }}
              >
                <Link href="/" onClick={close} className="py-3 text-base font-semibold text-foreground hover:text-accent border-b border-border">Home</Link>
                <Link href="/about" onClick={close} className="py-3 text-base font-semibold text-foreground hover:text-accent border-b border-border">About</Link>
                
                {/* Products Accordion for Mobile */}
                <div className="border-b border-border py-3">
                  <button
                    onClick={() => setMobileProductsOpen((prev) => !prev)}
                    className="flex items-center justify-between w-full text-base font-semibold text-foreground hover:text-accent"
                  >
                    <span>Products</span>
                    <ChevronDown className={cn("w-4 h-4 transition-transform duration-200", mobileProductsOpen && "rotate-180")} />
                  </button>

                  <AnimatePresence>
                    {mobileProductsOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden flex flex-col gap-1.5 pt-2 pl-3 text-sm"
                      >
                        <Link href="/categories/knit" onClick={close} className="py-1.5 text-foreground hover:text-accent font-medium">
                          Knitwear
                        </Link>
                        <Link href="/categories/woven" onClick={close} className="py-1.5 text-foreground hover:text-accent font-medium">
                          Woven
                        </Link>
                        <Link href="/categories/denim" onClick={close} className="py-1.5 text-foreground hover:text-accent font-medium">
                          Denim & Bottoms
                        </Link>
                        <Link href="/categories/sweater" onClick={close} className="py-1.5 text-foreground hover:text-accent font-medium">
                          Sweaters
                        </Link>
                        <Link href="/categories/various-items" onClick={close} className="py-1.5 text-foreground hover:text-accent font-medium">
                          Various Items & Workwear
                        </Link>
                        <Link href="/services" onClick={close} className="pt-2 text-xs font-bold text-accent flex items-center">
                          View All Products & Services <ArrowRight className="w-3.5 h-3.5 ml-1" />
                        </Link>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <Link href="/hot-deals" onClick={close} className="py-3 text-base font-semibold text-[#E94D65] hover:opacity-85 border-b border-border flex items-center justify-between">
                  <span>🔥 Hot Deals & Offers</span>
                  <span className="px-2 py-0.5 rounded-full text-[10px] bg-rose-500/10 border border-[#E94D65]/25 text-[#E94D65] font-bold">LIMITED</span>
                </Link>
                <Link href="/services" onClick={close} className="py-3 text-base font-semibold text-foreground hover:text-accent border-b border-border">Services</Link>
                <Link href="/#process" onClick={close} className="py-3 text-base font-semibold text-foreground hover:text-accent border-b border-border">How We Work</Link>
                <Link href="/contact" onClick={close} className="py-3 text-base font-semibold text-foreground hover:text-accent border-b border-border mb-4">Contact</Link>

                <div className="flex flex-col gap-4 mt-2">
                  <a href="https://wa.me/8801715645766" className="flex items-center justify-center gap-2.5 text-emerald-600 py-2">
                    <WhatsAppIcon className="w-6 h-6 shrink-0" fill="#25D366" />
                    <span className="font-bold text-base">+88 01715 645766</span>
                  </a>
                  {ctaButton}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </header>
  );
}
