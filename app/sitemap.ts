import { MetadataRoute } from "next";
import { categoriesCatalog } from "@/lib/content/categories";
import { query } from "@/lib/db";
import { site } from "@/lib/content/site";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = (site.url || "https://www.nishafashions.com").replace(/\/+$/, "");

  // Static core routes
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/services`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/products`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/awards`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/privacy-policy`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${baseUrl}/terms-of-service`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
    },
  ];

  // Dynamic Category routes
  const categoryRoutes: MetadataRoute.Sitemap = categoriesCatalog.map((cat) => ({
    url: `${baseUrl}/categories/${cat.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.85,
  }));

  // Dynamic CMS custom pages
  let cmsRoutes: MetadataRoute.Sitemap = [];
  try {
    const pages: any = await query(
      "SELECT slug, updated_at FROM pages WHERE is_published = 1 AND is_active = 1"
    );
    if (Array.isArray(pages)) {
      cmsRoutes = pages
        .filter((p) => p.slug && !["home", "privacy-policy", "terms-of-service"].includes(p.slug))
        .map((p) => ({
          url: `${baseUrl}/${p.slug}`,
          lastModified: p.updated_at ? new Date(p.updated_at) : new Date(),
          changeFrequency: "monthly",
          priority: 0.6,
        }));
    }
  } catch {
    // Database fallback if table not yet initialized
  }

  return [...staticRoutes, ...categoryRoutes, ...cmsRoutes];
}
