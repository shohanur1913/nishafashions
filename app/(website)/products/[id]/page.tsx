import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProductById, getRelatedProducts } from "@/lib/content-service";
import { ProductDetailClient } from "./product-detail-client";

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const product = await getProductById(id);

  if (!product) {
    return {
      title: "Product Not Found | Nisha Fashions Wear",
    };
  }

  const title = `${product.name} | Bangladesh Apparel Manufacturer & Supplier`;
  const description = product.specs || product.detail || `${product.name} apparel manufacturing in Bangladesh by Nisha Fashions Wear.`;

  const rawImg = product.image_src;
  const imageUrl = typeof rawImg === "string" 
    ? rawImg 
    : typeof rawImg?.src === "string" 
      ? rawImg.src 
      : "";

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: imageUrl ? [{ url: imageUrl }] : undefined,
    },
  };
}


export default async function ProductDetailPage({ params }: PageProps) {
  const { id } = await params;
  const product = await getProductById(id);

  if (!product) {
    notFound();
  }

  const related = await getRelatedProducts(product.category_slug, product.id, 4);

  return (
    <ProductDetailClient 
      product={product} 
      relatedProducts={related} 
    />
  );
}
