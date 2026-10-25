"use client";

import Link from "next/link";
import NextImage, { StaticImageData } from "next/image";
import { ArrowUpRight, Shirt } from "lucide-react";

interface ProductCardProps {
  product: {
    id?: number | string;
    name: string;
    detail?: string;
    badge?: string;
    specs?: string;
    image_src?: string;
    image?: any;
  };
  categoryTitle: string;
  categorySlug?: string;
  moq?: string;
  leadTime?: string;
  fallbackImage: any;
}

export function EcommerceProductCard({
  product,
  categoryTitle,
  fallbackImage,
}: ProductCardProps) {
  const rawImg = product.image_src || product.image || fallbackImage;
  const imgSrc = typeof rawImg === "string" ? rawImg : rawImg?.src;
  const productHref = product.id ? `/products/${product.id}` : `/contact?inquiry=${encodeURIComponent(product.name)}`;

  return (
    <Link
      href={productHref}
      className="group flex flex-col rounded-2xl bg-card border border-border/70 hover:border-foreground/30 hover:shadow-md transition-all duration-300 overflow-hidden h-full cursor-pointer"
    >
      {/* Clean Product Image — No badges, no text overlay */}
      <div className="relative aspect-[4/3] w-full bg-muted/40 overflow-hidden">
        {imgSrc ? (
          <NextImage
            src={imgSrc}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className="object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-muted-foreground">
            <Shirt className="w-10 h-10 opacity-30" />
          </div>
        )}
      </div>

      {/* Clean Card Body (Matching Homepage Hot Deals Style) */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-3">
        <div className="space-y-1.5">
          {categoryTitle && (
            <p className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider">
              {categoryTitle}
            </p>
          )}

          <h3
            className="font-serif text-base sm:text-lg font-normal text-foreground tracking-tight group-hover:text-primary transition-colors line-clamp-1"
            title={product.name}
          >
            {product.name}
          </h3>

          {(product.specs || product.detail) && (
            <p className="text-xs text-muted-foreground line-clamp-2 font-light leading-relaxed">
              {product.specs || product.detail}
            </p>
          )}
        </div>

        {/* Card Footer: Category info & View Details with arrow */}
        <div className="pt-2 border-t border-border/50 flex items-center justify-between">
          <span className="text-xs text-muted-foreground font-light">
            Export Grade
          </span>

          <span className="inline-flex items-center gap-0.5 text-xs font-medium text-muted-foreground group-hover:text-foreground transition-colors">
            <span>Details</span>
            <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </span>
        </div>
      </div>
    </Link>
  );
}
