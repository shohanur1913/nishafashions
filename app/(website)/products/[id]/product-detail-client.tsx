"use client";

import Link from "next/link";
import { 
  ChevronRight, 
  MessageCircle, 
  FileText, 
  CheckCircle2, 
  Shirt, 
  Clock, 
  Package, 
  Factory, 
  ShieldCheck, 
  ArrowUpRight 
} from "lucide-react";
import { openQuoteModal } from "@/components/website/quote-modal";
import { WhatsAppIcon } from "@/components/icons/whatsapp-icon";

interface ProductDetailClientProps {
  product: any;
  relatedProducts: any[];
}

export function ProductDetailClient({ product, relatedProducts }: ProductDetailClientProps) {
  const whatsappMsg = `Hello Nisha Fashions Wear, I am interested in sourcing "${product.name}" (${product.offer_price || "Inquiry Costing"}). Could you please share sample development timeline, minimum order quantity, and FOB price breakdown?`;
  const whatsappUrl = `https://wa.me/8801715645766?text=${encodeURIComponent(whatsappMsg)}`;

  // Function to render description with rich markdown/text formatting
  const renderRichDescription = (text: string) => {
    if (!text) return null;

    // Check if it's plain text or markdown with headings/lists
    const blocks = text.split(/\n\n+/);
    return (
      <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
        {blocks.map((block, idx) => {
          const trimmed = block.trim();
          if (!trimmed) return null;

          if (trimmed.startsWith("### ")) {
            return (
              <h4 key={idx} className="text-sm font-semibold text-foreground pt-2">
                {trimmed.replace("### ", "")}
              </h4>
            );
          }
          if (trimmed.startsWith("## ")) {
            return (
              <h3 key={idx} className="text-base font-semibold text-foreground pt-3">
                {trimmed.replace("## ", "")}
              </h3>
            );
          }
          if (trimmed.startsWith("# ")) {
            return (
              <h2 key={idx} className="text-lg font-bold text-foreground pt-4 pb-1 border-b border-border/50">
                {trimmed.replace("# ", "")}
              </h2>
            );
          }
          if (trimmed.startsWith("- ") || trimmed.startsWith("* ")) {
            const items = trimmed.split(/\n/).map((line) => line.replace(/^[-*]\s+/, ""));
            return (
              <ul key={idx} className="list-disc list-inside space-y-1.5 pl-1">
                {items.map((item, itemIdx) => (
                  <li key={itemIdx}>{item}</li>
                ))}
              </ul>
            );
          }
          if (trimmed.startsWith("1. ")) {
            const items = trimmed.split(/\n/).map((line) => line.replace(/^\d+\.\s+/, ""));
            return (
              <ol key={idx} className="list-decimal list-inside space-y-1.5 pl-1">
                {items.map((item, itemIdx) => (
                  <li key={itemIdx}>{item}</li>
                ))}
              </ol>
            );
          }

          return <p key={idx}>{trimmed}</p>;
        })}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-background text-foreground pb-20">
      {/* Breadcrumb Navigation Bar */}
      <section className="w-full border-b border-border/40 bg-muted/20 py-2 sm:py-2.5">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-screen-2xl">
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground flex-wrap">
            <Link href="/" className="hover:text-foreground transition-colors">
              Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5 opacity-40" />
            <Link href="/products" className="hover:text-foreground transition-colors">
              Products
            </Link>
            {product.category_slug && (
              <>
                <ChevronRight className="w-3.5 h-3.5 opacity-40" />
                <Link
                  href={`/categories/${product.category_slug}`}
                  className="hover:text-foreground transition-colors uppercase font-mono text-[11px]"
                >
                  {product.category_title || product.category_slug}
                </Link>
              </>
            )}
            <ChevronRight className="w-3.5 h-3.5 opacity-40" />
            <span className="text-foreground font-medium truncate max-w-xs">{product.name}</span>
          </div>
        </div>
      </section>

      {/* Main Product Showcase Section */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-screen-2xl mt-4 sm:mt-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-start">
          
          {/* Left Column: Product Photography */}
          <div className="lg:col-span-6 space-y-4">
            <div className="relative aspect-[4/3] sm:aspect-square w-full rounded-3xl bg-muted/30 border border-border/80 overflow-hidden shadow-xs flex items-center justify-center">
              {product.image_src ? (
                <img
                  src={product.image_src}
                  alt={product.name}
                  className="w-full h-full object-cover object-center"
                />
              ) : (
                <div className="flex flex-col items-center gap-2 text-muted-foreground/40">
                  <Shirt className="w-16 h-16 opacity-30" />
                  <span className="text-xs">Product Image Pending</span>
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Technical Details, Pricing & Sourcing Actions */}
          <div className="lg:col-span-6 space-y-6">
            
            {/* Title & Category Division */}
            <div className="space-y-2 border-b border-border/60 pb-5">
              {product.category_title && (
                <Link
                  href={`/categories/${product.category_slug}`}
                  className="text-xs font-semibold uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors inline-block"
                >
                  {product.category_title} Division
                </Link>
              )}

              <h1 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-normal text-foreground tracking-tight leading-tight">
                {product.name}
              </h1>

              {/* Price / Offer Display */}
              <div className="pt-2 flex items-baseline gap-3">
                {product.offer_price ? (
                  <>
                    <span className="text-2xl sm:text-3xl font-bold text-foreground">
                      {product.offer_price}
                    </span>
                    {product.original_price && (
                      <span className="text-sm sm:text-base text-muted-foreground line-through">
                        {product.original_price}
                      </span>
                    )}
                    <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                      Promotional FOB
                    </span>
                  </>
                ) : (
                  <span className="text-sm font-medium text-muted-foreground">
                    Custom FOB Costing Available upon Tech-Pack Submission
                  </span>
                )}
              </div>
            </div>

            {/* Quick Sourcing Metrics Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 p-4 rounded-2xl bg-muted/30 border border-border/70 text-xs">
              <div className="space-y-1">
                <span className="text-muted-foreground text-[11px] block">Factory MOQ</span>
                <span className="font-semibold text-foreground flex items-center gap-1">
                  <Package className="w-3.5 h-3.5 text-muted-foreground" />
                  <span>{product.category_moq || "1,500 pcs/style"}</span>
                </span>
              </div>

              <div className="space-y-1">
                <span className="text-muted-foreground text-[11px] block">Production Lead Time</span>
                <span className="font-semibold text-foreground flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-muted-foreground" />
                  <span>{product.category_lead_time || "45-60 Days"}</span>
                </span>
              </div>

              <div className="space-y-1">
                <span className="text-muted-foreground text-[11px] block">Sample Timeline</span>
                <span className="font-semibold text-foreground flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                  <span>7-10 Days Proto</span>
                </span>
              </div>
            </div>

            {/* Fabric & Material Specifications */}
            {product.specs && (
              <div className="space-y-2 p-4 rounded-2xl bg-card border border-border/70">
                <h4 className="text-xs font-semibold text-foreground uppercase tracking-wider">
                  Fabric &amp; Technical Specifications
                </h4>
                <p className="text-xs text-foreground/85 leading-relaxed font-mono">
                  {product.specs}
                </p>
              </div>
            )}

            {/* Product Manufacturing Details (Rich Text Rendered) */}
            {product.detail && (
              <div className="space-y-2.5">
                <h4 className="text-xs font-semibold text-foreground uppercase tracking-wider">
                  Product &amp; Seam Details
                </h4>
                {renderRichDescription(product.detail)}
              </div>
            )}

            {/* Direct Sourcing Actions */}
            <div className="pt-4 border-t border-border/60 space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-3 px-5 rounded-2xl bg-[#25D366] hover:bg-[#20ba5a] text-white text-xs font-semibold tracking-wide transition-all shadow-xs flex items-center justify-center gap-2 cursor-pointer"
                >
                  <WhatsAppIcon className="w-4 h-4" fill="#ffffff" />
                  <span>Inquire via WhatsApp</span>
                </a>

                <button
                  type="button"
                  onClick={openQuoteModal}
                  className="py-3 px-5 rounded-2xl bg-foreground text-background hover:bg-foreground/90 text-xs font-semibold uppercase tracking-wider transition-all shadow-xs flex items-center justify-center gap-2 cursor-pointer"
                >
                  <FileText className="w-4 h-4" />
                  <span>Request Full Quotation</span>
                </button>
              </div>

              <p className="text-[11px] text-muted-foreground text-center">
                Submit tech-packs to <strong className="text-foreground">info@nishafashions.com</strong> for indicative FOB response within 48 hours.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* Related Products from Same Manufacturing Division */}
      {relatedProducts.length > 0 && (
        <section className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-screen-2xl mt-20 pt-12 border-t border-border/40">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h3 className="font-serif text-xl sm:text-2xl font-light text-foreground tracking-tight">
                Related {product.category_title || "Apparel"} Products
              </h3>
              <p className="text-xs text-muted-foreground mt-0.5 font-light">
                Explore more styles manufactured in our {product.category_title || "specialized"} production units
              </p>
            </div>

            {product.category_slug && (
              <Link
                href={`/categories/${product.category_slug}`}
                className="text-xs font-medium text-muted-foreground hover:text-foreground flex items-center gap-1 transition-colors"
              >
                <span>View All</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            )}
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {relatedProducts.map((rel: any) => (
              <Link
                key={rel.id}
                href={`/products/${rel.id}`}
                className="group flex flex-col rounded-2xl bg-card border border-border/70 hover:border-foreground/30 hover:shadow-md transition-all overflow-hidden"
              >
                <div className="relative aspect-[4/3] w-full bg-muted/40 overflow-hidden">
                  {rel.image_src ? (
                    <img
                      src={rel.image_src}
                      alt={rel.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                      <Shirt className="w-8 h-8 opacity-30" />
                    </div>
                  )}
                </div>

                <div className="p-4 space-y-1">
                  <h4 className="font-serif text-sm font-normal text-foreground truncate group-hover:text-primary transition-colors">
                    {rel.name}
                  </h4>
                  {rel.offer_price ? (
                    <p className="text-xs font-semibold text-foreground">{rel.offer_price}</p>
                  ) : (
                    <p className="text-[11px] text-muted-foreground">FOB on Inquiry</p>
                  )}
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
