import { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { categoriesCatalog } from "@/lib/content/categories";
import { getCategory, getCategories } from "@/lib/content-service";
import { CategoryExplorerClient } from "@/components/website/category-explorer-client";

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
  const categoryData = await getCategory(category);

  if (!categoryData) {
    return {
      title: "Category Not Found | Nisha Fashions Wear",
    };
  }

  return {
    title: `${categoryData.title} Manufacturing & Sourcing in Bangladesh | Nisha Fashions Wear`,
    description: `${categoryData.title} apparel manufacturing capabilities in Bangladesh. Specialized OEM/ODM for ${categoryData.title} products. ${categoryData.heroIntro}`,
    alternates: {
      canonical: `/categories/${categoryData.slug}`,
    },
    openGraph: {
      title: `${categoryData.title} Manufacturing & Sourcing Bangladesh | Nisha Fashions Wear`,
      description: `${categoryData.title} apparel manufacturing capabilities in Bangladesh. ${categoryData.heroIntro}`,
      url: `https://www.nishafashions.com/categories/${categoryData.slug}`,
    },
  };
}

export default async function CategoryDetailPage({ params }: PageProps) {
  const { category } = await params;
  const categoryData = await getCategory(category);
  const allCategories = await getCategories();

  if (!categoryData) {
    notFound();
  }

  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-background">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-primary border-r-transparent align-[-0.125em]" />
        </div>
      }
    >
      <CategoryExplorerClient
        categoryData={categoryData}
        allCategories={allCategories}
      />
    </Suspense>
  );
}

