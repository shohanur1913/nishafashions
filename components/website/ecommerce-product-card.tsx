"use client";

import NextImage, { StaticImageData } from "next/image";
import { openQuoteModal } from "@/components/website/quote-modal";
import { FileText } from "lucide-react";

interface ProductCardProps {
  product: {
    name: string;
    detail?: string;
    badge?: string;
    specs?: string;
    image?: StaticImageData | string;
  };
  categoryTitle: string;
  moq?: string;
  leadTime?: string;
  fallbackImage: StaticImageData;
}

export function EcommerceProductCard({
  product,
  categoryTitle,
  fallbackImage,
}: ProductCardProps) {
  const imgSrc = product.image || fallbackImage;

  // WhatsApp pre-filled message
  const whatsappMsg = `Hello Nisha Fashions Wear, I am interested in sourcing "${product.name}" under your ${categoryTitle} category. Could you please share the indicative FOB costing, MOQ details, and sample development timeline?`;
  const whatsappUrl = `https://wa.me/8801715645766?text=${encodeURIComponent(whatsappMsg)}`;

  return (
    <div className="group relative flex flex-col rounded-xl bg-card border border-border/70 hover:border-foreground/30 hover:shadow-lg transition-all duration-300 overflow-hidden">
      {/* Product Image */}
      <div className="relative aspect-square w-full overflow-hidden bg-muted/40">
        <NextImage
          src={typeof imgSrc === "string" ? imgSrc : imgSrc.src}
          alt={product.name}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
          className="object-cover object-center transition-transform duration-500 ease-out group-hover:scale-105"
        />

        {product.badge && (
          <span className="absolute top-2 left-2 px-2 py-0.5 rounded-md text-[10px] font-medium tracking-wide uppercase bg-background/90 text-foreground backdrop-blur-md shadow-2xs border border-border/40 pointer-events-none">
            {product.badge}
          </span>
        )}
      </div>

      {/* Card Body - Compact: Just Title & Buttons */}
      <div className="p-3 sm:p-3.5 flex flex-col justify-between gap-2.5">
        <h3 className="font-serif text-sm sm:text-base font-normal text-foreground tracking-tight leading-snug line-clamp-1 group-hover:text-foreground" title={product.name}>
          {product.name}
        </h3>

        {/* Action Buttons: WhatsApp & Quote/Inquire */}
        <div className="grid grid-cols-2 gap-1.5 pt-0.5">
          {/* WhatsApp Button */}
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-1 py-1.5 px-2 rounded-lg bg-[#25D366] hover:bg-[#20ba5a] text-white text-[11px] font-semibold tracking-tight transition-all shadow-2xs cursor-pointer active:scale-[0.97]"
            title="Chat on WhatsApp"
          >
            <svg
              className="w-3.5 h-3.5 fill-current shrink-0"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M17.472 14.382c-.301-.15-1.78-.878-2.056-.978-.276-.1-.477-.15-.678.15-.201.3-.778.978-.954 1.179-.176.2-.351.226-.653.075-.301-.15-1.272-.469-2.423-1.496-.895-.799-1.5-1.786-1.676-2.087-.176-.301-.019-.464.132-.614.136-.135.301-.351.452-.527.151-.176.201-.301.301-.502.101-.201.05-.377-.025-.527-.075-.15-.678-1.634-.929-2.237-.245-.588-.494-.508-.678-.518-.176-.009-.377-.01-.578-.01-.201 0-.527.075-.803.377s-1.054 1.029-1.054 2.51c0 1.481 1.079 2.91 1.23 3.111.151.201 2.124 3.243 5.145 4.549.718.311 1.279.497 1.716.636.722.23 1.378.197 1.897.12.578-.087 1.78-.728 2.031-1.431.251-.703.251-1.305.176-1.431-.075-.126-.276-.201-.577-.351zM12.004 21.996h-.002c-1.733 0-3.431-.462-4.921-1.336l-.353-.209-3.66.96.977-3.567-.23-.366a9.92 9.92 0 0 1-1.523-5.275c0-5.498 4.475-9.973 9.978-9.973 2.664 0 5.168 1.038 7.049 2.92a9.917 9.917 0 0 1 2.917 7.054c-.001 5.499-4.476 9.987-9.232 9.787z" />
            </svg>
            <span>WhatsApp</span>
          </a>

          {/* Inquire / Quote Button */}
          <button
            type="button"
            onClick={openQuoteModal}
            className="inline-flex items-center justify-center gap-1 py-1.5 px-2 rounded-lg bg-primary hover:bg-primary/90 text-primary-foreground text-[11px] font-semibold tracking-tight transition-all shadow-2xs cursor-pointer active:scale-[0.97]"
          >
            <FileText className="w-3 h-3 shrink-0" />
            <span>Quote</span>
          </button>
        </div>
      </div>
    </div>
  );
}
