import { getAdminUser } from "@/lib/auth";
import { query } from "@/lib/db";
import { AdminHeader } from "@/components/admin/admin-header";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Layers, Plus, Edit3, Trash2, ExternalLink, ArrowRight, Package } from "lucide-react";
import NextImage from "next/image";
import { AdminLayoutShell } from "@/components/admin/admin-layout-shell";

export default async function AdminCategoriesPage() {
  const admin = await getAdminUser();
  if (!admin) redirect("/admin/login");

  const categories: any = await query(`
    SELECT c.*, COUNT(p.id) as products_count 
    FROM categories c 
    LEFT JOIN products p ON c.slug = p.category_slug 
    GROUP BY c.id 
    ORDER BY c.sort_order ASC, c.id ASC
  `);

  return (
    <AdminLayoutShell>
      <div className="flex-1 pb-16">
      <AdminHeader 
        title="Apparel Categories" 
        subtitle="Manage product divisions, technical specifications, MOQ, lead times and fabrications" 
      />

      <div className="p-4 sm:p-6 lg:p-8 w-full min-w-0 max-w-7xl mx-auto space-y-6">
        
        {/* Top Actions */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl sm:text-2xl font-semibold text-foreground tracking-tight">
              All Manufacturing Divisions ({categories.length})
            </h2>
          </div>

          <Link
            href="/admin/categories/new"
            className="px-4 py-2.5 rounded-xl bg-foreground text-background font-semibold text-xs uppercase tracking-wider hover:bg-foreground/90 transition-all flex items-center gap-2 shadow-xs shrink-0 self-start sm:self-auto"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Category</span>
          </Link>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {categories.map((cat: any) => (
            <div
              key={cat.id}
              className="rounded-2xl bg-card border border-border/70 overflow-hidden shadow-xs flex flex-col justify-between group hover:border-foreground/30 transition-all"
            >
              <div>
                {/* Image Banner */}
                <div className="relative aspect-[16/9] w-full bg-muted/40 overflow-hidden border-b border-border/50">
                  {cat.image_src ? (
                    <img
                      src={cat.image_src}
                      alt={cat.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                      <Layers className="w-8 h-8 opacity-40" />
                    </div>
                  )}

                  <div className="absolute top-3 left-3">
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-semibold bg-black/70 text-white backdrop-blur-xs">
                      {cat.badge || "Division"}
                    </span>
                  </div>

                  <div className="absolute top-3 right-3">
                    <span className="px-2 py-1 rounded-lg text-[10px] font-mono bg-white/90 text-zinc-950 font-bold shadow-xs">
                      {cat.products_count} Products
                    </span>
                  </div>
                </div>

                {/* Body */}
                <div className="p-5 space-y-3">
                  <div>
                    <h3 className="text-base sm:text-lg font-semibold text-foreground tracking-tight">
                      {cat.title}
                    </h3>
                    <p className="text-xs text-muted-foreground font-mono mt-0.5">
                      /categories/{cat.slug}
                    </p>
                  </div>

                  <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
                    {cat.description || cat.hero_intro}
                  </p>

                  <div className="grid grid-cols-2 gap-2 text-[11px] pt-2 border-t border-border/50">
                    <div className="text-muted-foreground">
                      MOQ: <strong className="text-foreground">{cat.moq || "N/A"}</strong>
                    </div>
                    <div className="text-muted-foreground">
                      Lead: <strong className="text-foreground">{cat.lead_time || "N/A"}</strong>
                    </div>
                  </div>
                </div>
              </div>

              {/* Footer Actions */}
              <div className="p-4 bg-muted/30 border-t border-border/50 flex items-center justify-between">
                <Link
                  href={`/categories/${cat.slug}`}
                  target="_blank"
                  className="inline-flex items-center gap-1 text-[11px] font-medium text-muted-foreground hover:text-foreground transition-colors"
                >
                  <span>Preview Page</span>
                  <ExternalLink className="w-3 h-3" />
                </Link>

                <div className="flex items-center gap-2">
                  <Link
                    href={`/admin/categories/${cat.slug}`}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-foreground text-background font-semibold text-xs hover:bg-foreground/90 transition-colors"
                  >
                    <Edit3 className="w-3 h-3" />
                    <span>Edit Category</span>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  </AdminLayoutShell>
  );
}
