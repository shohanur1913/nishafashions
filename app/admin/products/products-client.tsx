"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { saveProductAction, deleteProductAction } from "@/actions/admin";
import { Plus, Search, Edit3, Trash2, CheckCircle2, Star, Shirt, X, Save } from "lucide-react";

interface ProductsClientProps {
  initialProducts: any[];
  categories: { slug: string; title: string }[];
}

export function ProductsClient({ initialProducts, categories }: ProductsClientProps) {
  const router = useRouter();
  const [products, setProducts] = useState(initialProducts);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [search, setSearch] = useState("");

  // Modal / Drawer state for adding or editing
  const [modalOpen, setModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<any | null>(null);

  const [formData, setFormData] = useState({
    id: undefined as number | undefined,
    category_slug: categories[0]?.slug || "knit",
    name: "",
    detail: "",
    badge: "",
    specs: "",
    image_src: "",
    is_featured: false,
  });

  const [saving, setSaving] = useState(false);

  const openAddModal = () => {
    setEditingProduct(null);
    setFormData({
      id: undefined,
      category_slug: selectedCategory === "all" ? categories[0]?.slug || "knit" : selectedCategory,
      name: "",
      detail: "",
      badge: "Core Programme",
      specs: "",
      image_src: "",
      is_featured: false,
    });
    setModalOpen(true);
  };

  const openEditModal = (p: any) => {
    setEditingProduct(p);
    setFormData({
      id: p.id,
      category_slug: p.category_slug,
      name: p.name,
      detail: p.detail || "",
      badge: p.badge || "",
      specs: p.specs || "",
      image_src: p.image_src || "",
      is_featured: Boolean(p.is_featured),
    });
    setModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      const res = await saveProductAction(formData);
      if (res.success) {
        setModalOpen(false);
        router.refresh();
      } else {
        alert("Failed to save product.");
      }
    } catch (err: any) {
      alert("Error: " + err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: number, name: string) => {
    if (!confirm(`Are you sure you want to delete "${name}"?`)) return;
    try {
      await deleteProductAction(id);
      router.refresh();
    } catch (err: any) {
      alert("Error deleting product: " + err.message);
    }
  };

  const filtered = initialProducts.filter((p) => {
    const matchCat = selectedCategory === "all" || p.category_slug === selectedCategory;
    const matchSearch =
      search === "" ||
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      (p.detail && p.detail.toLowerCase().includes(search.toLowerCase())) ||
      (p.specs && p.specs.toLowerCase().includes(search.toLowerCase()));
    return matchCat && matchSearch;
  });

  return (
    <div className="space-y-6">
      {/* Top Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        {/* Search Input */}
        <div className="relative w-full sm:w-80">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search products by name, specs or detail..."
            className="w-full px-3.5 py-2.5 bg-background border border-border rounded-xl text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-foreground pl-9"
          />
          <Search className="w-4 h-4 text-muted-foreground absolute left-3 top-3" />
        </div>

        {/* Action Button */}
        <button
          onClick={openAddModal}
          className="px-4 py-2.5 rounded-xl bg-foreground text-background font-semibold text-xs uppercase tracking-wider hover:bg-foreground/90 transition-all flex items-center gap-2 shadow-xs cursor-pointer shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Product</span>
        </button>
      </div>

      {/* Category Filter Chips */}
      <div className="flex flex-wrap items-center gap-2">
        <button
          onClick={() => setSelectedCategory("all")}
          className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-colors cursor-pointer ${
            selectedCategory === "all"
              ? "bg-foreground text-background border-foreground font-semibold"
              : "bg-muted/40 text-muted-foreground border-border hover:bg-muted"
          }`}
        >
          All Categories ({initialProducts.length})
        </button>
        {categories.map((c) => {
          const count = initialProducts.filter((p) => p.category_slug === c.slug).length;
          return (
            <button
              key={c.slug}
              onClick={() => setSelectedCategory(c.slug)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-colors cursor-pointer ${
                selectedCategory === c.slug
                  ? "bg-foreground text-background border-foreground font-semibold"
                  : "bg-muted/40 text-muted-foreground border-border hover:bg-muted"
              }`}
            >
              {c.title} ({count})
            </button>
          );
        })}
      </div>

      {/* Products Table */}
      <div className="bg-card border border-border/70 rounded-2xl overflow-x-auto shadow-xs w-full">
        <table className="w-full text-left text-xs min-w-[700px]">
          <thead className="bg-muted/40 border-b border-border/60 text-muted-foreground uppercase text-[10px] font-semibold">
            <tr>
              <th className="py-3 px-4">Product Details</th>
              <th className="py-3 px-4">Category</th>
              <th className="py-3 px-4">Specifications</th>
              <th className="py-3 px-4">Badge</th>
              <th className="py-3 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border/40">
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={5} className="py-12 text-center text-xs text-muted-foreground">
                  No products found matching your search.
                </td>
              </tr>
            ) : (
              filtered.map((p) => (
                <tr key={p.id} className="hover:bg-muted/30 transition-colors">
                  <td className="py-3.5 px-4 max-w-sm">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-lg bg-muted/60 overflow-hidden shrink-0 border border-border/50">
                        {p.image_src ? (
                          <img src={p.image_src} alt={p.name} className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                            <Shirt className="w-4 h-4 opacity-40" />
                          </div>
                        )}
                      </div>

                      <div className="space-y-0.5">
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-foreground text-sm">{p.name}</span>
                          {p.is_featured && (
                            <span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-amber-500/10 text-amber-700 border border-amber-500/20">
                              Featured
                            </span>
                          )}
                        </div>
                        <p className="text-[11px] text-muted-foreground line-clamp-1 leading-relaxed">
                          {p.detail}
                        </p>
                      </div>
                    </div>
                  </td>

                  <td className="py-3.5 px-4">
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-semibold uppercase bg-muted text-muted-foreground font-mono">
                      {p.category_slug}
                    </span>
                  </td>

                  <td className="py-3.5 px-4 text-[11px] text-muted-foreground max-w-xs truncate">
                    {p.specs || "Standard fabric"}
                  </td>

                  <td className="py-3.5 px-4">
                    {p.badge ? (
                      <span className="text-[11px] text-foreground font-medium bg-muted/60 px-2 py-0.5 rounded">
                        {p.badge}
                      </span>
                    ) : (
                      <span className="text-[11px] text-muted-foreground">—</span>
                    )}
                  </td>

                  <td className="py-3.5 px-4 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <button
                        onClick={() => openEditModal(p)}
                        className="p-1.5 rounded-lg border border-border text-foreground hover:bg-muted transition-colors cursor-pointer"
                        title="Edit Product"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                      </button>

                      <button
                        onClick={() => handleDelete(p.id, p.name)}
                        className="p-1.5 rounded-lg border border-red-500/20 text-red-500 hover:bg-red-500/10 transition-colors cursor-pointer"
                        title="Delete Product"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Product Add / Edit Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="w-full max-w-xl bg-card border border-border rounded-3xl p-6 sm:p-8 shadow-2xl relative space-y-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-border/60 pb-3">
              <h3 className="text-lg font-semibold text-foreground tracking-tight">
                {editingProduct ? "Edit Product" : "Add New Product"}
              </h3>
              <button
                onClick={() => setModalOpen(false)}
                className="p-1.5 rounded-full hover:bg-muted text-muted-foreground hover:text-foreground cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-foreground block">Product Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Classic Pique Polo Shirt"
                    className="w-full px-3.5 py-2 bg-background border border-border rounded-xl text-xs text-foreground focus:outline-none focus:border-foreground"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-foreground block">Category *</label>
                  <select
                    value={formData.category_slug}
                    onChange={(e) => setFormData({ ...formData, category_slug: e.target.value })}
                    className="w-full px-3.5 py-2 bg-background border border-border rounded-xl text-xs text-foreground focus:outline-none focus:border-foreground"
                  >
                    {categories.map((c) => (
                      <option key={c.slug} value={c.slug}>
                        {c.title}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-foreground block">Badge / Pill</label>
                  <input
                    type="text"
                    value={formData.badge}
                    onChange={(e) => setFormData({ ...formData, badge: e.target.value })}
                    placeholder="e.g. High Volume / Core Base"
                    className="w-full px-3.5 py-2 bg-background border border-border rounded-xl text-xs text-foreground focus:outline-none focus:border-foreground"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-foreground block">Image URL / Path</label>
                  <input
                    type="text"
                    value={formData.image_src}
                    onChange={(e) => setFormData({ ...formData, image_src: e.target.value })}
                    placeholder="/images/category-knit.png"
                    className="w-full px-3.5 py-2 bg-background border border-border rounded-xl text-xs text-foreground font-mono focus:outline-none focus:border-foreground"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-medium text-foreground block">Fabric / Material Specifications</label>
                <input
                  type="text"
                  value={formData.specs}
                  onChange={(e) => setFormData({ ...formData, specs: e.target.value })}
                  placeholder="e.g. 200–240 GSM Honeycomb Pique, 100% Cotton"
                  className="w-full px-3.5 py-2 bg-background border border-border rounded-xl text-xs text-foreground focus:outline-none focus:border-foreground"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-medium text-foreground block">Manufacturing Details & Seams</label>
                <textarea
                  rows={3}
                  value={formData.detail}
                  onChange={(e) => setFormData({ ...formData, detail: e.target.value })}
                  placeholder="e.g. Flat-knit jacquard collars and cuffs, reinforced 3-button placket, side vents..."
                  className="w-full px-3.5 py-2 bg-background border border-border rounded-xl text-xs text-foreground focus:outline-none focus:border-foreground resize-none"
                />
              </div>

              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id="featuredCheck"
                  checked={formData.is_featured}
                  onChange={(e) => setFormData({ ...formData, is_featured: e.target.checked })}
                  className="rounded border-border"
                />
                <label htmlFor="featuredCheck" className="text-xs font-medium text-foreground cursor-pointer">
                  Featured Product (Highlight on division cards)
                </label>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-border/60">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-border text-xs font-medium hover:bg-muted"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={saving}
                  className="px-5 py-2 rounded-xl bg-foreground text-background font-semibold text-xs uppercase tracking-wider hover:bg-foreground/90 transition-all flex items-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>{saving ? "Saving..." : "Save Product"}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
