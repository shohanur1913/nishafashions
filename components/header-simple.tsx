"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import Link from "next/link";
import { ChevronDown, ArrowRight, MessageSquare } from "lucide-react";
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
  ctaBackground = "var(--foreground)",
  ctaTextColor = "var(--background)",
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
          padding: `0 ${horizontalPadding}px`,
          borderBottom: showBorder ? `1px solid var(--border)` : "none",
        }}
      >
        <Link href={logoUrl || "/"} onClick={close} className="flex shrink-0 items-center gap-2.5 no-underline">
          {logoImage ? <img src={logoImage} alt={logoText || ""} className="block w-auto" style={{ height: logoSize }} /> : (
            <span className="leading-none font-bold select-none" style={{ fontSize: 18, color: textColor, letterSpacing: -0.3 }}>
              {logoText}
            </span>
          )}
        </Link>

        {showInlineNav && (
          <nav className="absolute left-1/2 flex -translate-x-1/2 items-center text-sm font-semibold text-foreground" style={{ gap: navGap }}>
            <Link href="/" className="hover:text-primary transition-colors py-2">Home</Link>
            <Link href="/about" className="hover:text-primary transition-colors py-2">About</Link>
            
            <div className="relative group py-6 cursor-pointer">
              <div className="flex items-center gap-1.5 hover:text-primary transition-colors py-2">
                <span>Products</span> 
                <ChevronDown className="w-3.5 h-3.5 opacity-70 group-hover:rotate-180 transition-transform" />
              </div>
              
              <div className="absolute top-[65px] left-1/2 -translate-x-1/2 hidden group-hover:block w-[360px] bg-background border border-border shadow-2xl rounded-xl p-5 z-50">
                <div className="text-[11px] font-bold text-muted-foreground mb-4 tracking-widest uppercase">Apparel Categories</div>
                <div className="space-y-3.5">
                  <Link href="/services#knitwear" className="flex justify-between items-center group/item p-1.5 rounded-lg hover:bg-muted/50 transition-colors">
                    <span className="font-semibold text-foreground group-hover/item:text-primary transition-colors text-sm">Knitwear</span>
                    <span className="text-muted-foreground text-xs font-normal">T-Shirts, Hoodies, Polos</span>
                  </Link>
                  <Link href="/services#woven" className="flex justify-between items-center group/item p-1.5 rounded-lg hover:bg-muted/50 transition-colors">
                    <span className="font-semibold text-foreground group-hover/item:text-primary transition-colors text-sm">Woven</span>
                    <span className="text-muted-foreground text-xs font-normal">Shirts, Cargo, Jackets</span>
                  </Link>
                  <Link href="/services#denim" className="flex justify-between items-center group/item p-1.5 rounded-lg hover:bg-muted/50 transition-colors">
                    <span className="font-semibold text-foreground group-hover/item:text-primary transition-colors text-sm">Denim</span>
                    <span className="text-muted-foreground text-xs font-normal">Jeans, Truckers, Shorts</span>
                  </Link>
                  <Link href="/services#sweaters" className="flex justify-between items-center group/item p-1.5 rounded-lg hover:bg-muted/50 transition-colors">
                    <span className="font-semibold text-foreground group-hover/item:text-primary transition-colors text-sm">Sweaters</span>
                    <span className="text-muted-foreground text-xs font-normal text-right max-w-[130px] leading-tight">Men, Women, Kids (3-12GG)</span>
                  </Link>
                </div>
                <div className="mt-4 pt-3 border-t border-border">
                  <Link href="/services" className="flex items-center text-xs text-primary hover:text-primary/80 font-bold transition-colors">
                    View All Products & Services <ArrowRight className="w-3.5 h-3.5 ml-1" />
                  </Link>
                </div>
              </div>
            </div>

            <Link href="/services" className="hover:text-primary transition-colors py-2">Services</Link>
            <Link href="/#process" className="hover:text-primary transition-colors py-2">How We Work</Link>
            <Link href="/contact" className="hover:text-primary transition-colors py-2">Contact</Link>
          </nav>
        )}

        <div className="flex shrink-0 items-center gap-6">
          {showInlineCTA && (
            <div className="flex items-center gap-6">
              <a href="https://wa.me/8801715645766" target="_blank" rel="noreferrer" className="flex items-center gap-2 text-green-600 dark:text-green-500 hover:text-green-700 dark:hover:text-green-400 transition-colors">
                <MessageSquare className="w-4 h-4" />
                <span className="text-xs font-bold tracking-wide">+88 01715 645766</span>
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
              className="relative flex h-[42px] w-[42px] shrink-0 cursor-pointer items-center justify-center rounded-full border-none outline-none dark:bg-zinc-800 bg-zinc-100"
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
                <Link href="/" onClick={close} className="py-3 text-base font-semibold text-foreground hover:text-primary border-b border-border">Home</Link>
                <Link href="/about" onClick={close} className="py-3 text-base font-semibold text-foreground hover:text-primary border-b border-border">About</Link>
                
                {/* Products Accordion for Mobile */}
                <div className="border-b border-border py-3">
                  <button
                    onClick={() => setMobileProductsOpen((prev) => !prev)}
                    className="flex items-center justify-between w-full text-base font-semibold text-foreground hover:text-primary"
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
                        className="overflow-hidden flex flex-col gap-3 pt-3 pl-3 text-sm"
                      >
                        <Link href="/services#knitwear" onClick={close} className="flex justify-between items-center py-1 text-foreground hover:text-primary">
                          <span className="font-semibold">Knitwear</span>
                          <span className="text-muted-foreground text-xs font-normal">T-Shirts, Hoodies, Polos</span>
                        </Link>
                        <Link href="/services#woven" onClick={close} className="flex justify-between items-center py-1 text-foreground hover:text-primary">
                          <span className="font-semibold">Woven</span>
                          <span className="text-muted-foreground text-xs font-normal">Shirts, Cargo, Jackets</span>
                        </Link>
                        <Link href="/services#denim" onClick={close} className="flex justify-between items-center py-1 text-foreground hover:text-primary">
                          <span className="font-semibold">Denim</span>
                          <span className="text-muted-foreground text-xs font-normal">Jeans, Truckers, Shorts</span>
                        </Link>
                        <Link href="/services#sweaters" onClick={close} className="flex justify-between items-center py-1 text-foreground hover:text-primary">
                          <span className="font-semibold">Sweaters</span>
                          <span className="text-muted-foreground text-xs font-normal">Men, Women, Kids</span>
                        </Link>
                        <Link href="/services" onClick={close} className="pt-2 text-xs font-bold text-primary flex items-center">
                          View All Products & Services <ArrowRight className="w-3.5 h-3.5 ml-1" />
                        </Link>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <Link href="/services" onClick={close} className="py-3 text-base font-semibold text-foreground hover:text-primary border-b border-border">Services</Link>
                <Link href="/#process" onClick={close} className="py-3 text-base font-semibold text-foreground hover:text-primary border-b border-border">How We Work</Link>
                <Link href="/contact" onClick={close} className="py-3 text-base font-semibold text-foreground hover:text-primary border-b border-border mb-4">Contact</Link>

                <div className="flex flex-col gap-4 mt-2">
                  <a href="https://wa.me/8801715645766" className="flex items-center justify-center gap-2 text-green-600 dark:text-green-500 py-2">
                    <MessageSquare className="w-5 h-5" />
                    <span className="font-bold">+88 01715 645766</span>
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
