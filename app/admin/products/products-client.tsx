"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { saveProductAction, deleteProductAction, toggleProductHotDealAction } from "@/actions/admin";
import {
  Plus,
  Search,
  Edit3,
  Trash2,
  Star,
  Shirt,
  X,
  Save,
  Upload,
  ImageIcon,
  Loader2,
  RefreshCw,
  Flame,
} from "lucide-react";
import { RichTextEditor } from "@/components/admin/rich-text-editor";

interface ProductsClientProps {
  initialProducts: any[];
  categories: { slug: string; title: string }[];
}

export function ProductsClient({ initialProducts, categories }: ProductsClientProps) {
  const router = useRouter();
  const [products, setProducts] = useState(initialProducts);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [search, setSearch] = useState("");

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
    is_hot_deal: false,
    offer_price: "",
    original_price: "",
    deal_badge: "",
  });

  const [saving, setSaving] = useState(false);
  const [togglingId, setTogglingId] = useState<number | null>(null);

  // Image upload state
  const [imageUploading, setImageUploading] = useState(false);
  const [imageUploadError, setImageUploadError] = useState<string | null>(null);
  const [imagePreview, setImagePreview] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement>(null);

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
      is_hot_deal: false,
      offer_price: "",
      original_price: "",
      deal_badge: "HOT DEAL",
    });
    setImagePreview("");
    setImageUploadError(null);
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
      is_hot_deal: Boolean(p.is_hot_deal),
      offer_price: p.offer_price || "",
      original_price: p.original_price || "",
      deal_badge: p.deal_badge || "",
    });
    setImagePreview(p.image_src || "");
    setImageUploadError(null);
    setModalOpen(true);
  };

  const handleToggleHotDeal = async (productId: number, newStatus: boolean) => {
    setTogglingId(productId);
    try {
      await toggleProductHotDealAction(productId, newStatus);
      setProducts((prev) =>
        prev.map((p) => (p.id === productId ? { ...p, is_hot_deal: newStatus } : p))
      );
      router.refresh();
    } catch (err: any) {
      alert("Failed to update Hot Deal status: " + err.message);
    } finally {
      setTogglingId(null);
    }
  };

  const handleImageUpload = async (file: File) => {
    setImageUploading(true);
    setImageUploadError(null);

    const fd = new FormData();
    fd.append("file", file);

    try {
      const res = await fetch("/api/upload", { method: "POST", body: fd });
      const data = await res.json();
      if (res.ok && data.success) {
        setFormData((prev) => ({ ...prev, image_src: data.url }));
        setImagePreview(data.url);
      } else {
        setImageUploadError(data.error || "Upload failed");
      }
    } catch (err: any) {
      setImageUploadError(err.message || "Upload failed");
    } finally {
      setImageUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleImageUpload(file);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.image_src) {
      setImageUploadError("Product image is required. Please upload an image.");
      return;
    }

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
              <th className="py-3 px-4">Price (FOB)</th>
              <th className="py-3 px-4">Badge</th>
              <th className="py-3 px-4 text-center">Hot Deal</th>
              <th className="py-3 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border/40">
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={7} className="py-12 text-center text-xs text-muted-foreground">
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
                    {p.offer_price ? (
                      <span className="font-semibold text-foreground font-mono text-xs">
                        {p.offer_price}
                      </span>
                    ) : (
                      <span className="text-muted-foreground font-mono text-[11px]">Quote / RFQ</span>
                    )}
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

                  <td className="py-3.5 px-4 text-center">
                    <button
                      type="button"
                      onClick={() => handleToggleHotDeal(p.id, !p.is_hot_deal)}
                      disabled={togglingId === p.id}
                      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold transition-all cursor-pointer ${
                        p.is_hot_deal
                          ? "bg-rose-500/15 text-rose-600 dark:text-rose-400 border border-rose-500/30 hover:bg-rose-500/25 shadow-2xs"
                          : "bg-muted text-muted-foreground border border-border/60 hover:bg-muted/80 opacity-60 hover:opacity-100"
                      }`}
                      title={p.is_hot_deal ? "Hot Deal enabled. Click to disable." : "Click to enable as Hot Deal"}
                    >
                      <Flame className={`w-3.5 h-3.5 ${p.is_hot_deal ? "text-rose-500 fill-rose-500" : "opacity-40"}`} />
                      <span>{p.is_hot_deal ? (p.offer_price ? `${p.offer_price}` : "Deal On") : "Deal Off"}</span>
                    </button>
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

              {/* Product Image Upload — Required */}
              <div className="space-y-2">
                <label className="text-xs font-medium text-foreground block">
                  Product Image <span className="text-red-500">*</span>
                </label>

                {/* Preview + Upload zone */}
                <div className="flex items-start gap-4">
                  {/* Image Preview */}
                  <div className="w-24 h-24 rounded-xl border-2 border-dashed border-border bg-muted/40 overflow-hidden shrink-0 flex items-center justify-center">
                    {imageUploading ? (
                      <Loader2 className="w-6 h-6 text-muted-foreground animate-spin" />
                    ) : imagePreview ? (
                      <img
                        src={imagePreview}
                        alt="Preview"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <ImageIcon className="w-7 h-7 text-muted-foreground/40" />
                    )}
                  </div>

                  {/* Upload controls */}
                  <div className="flex-1 space-y-2">
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/jpeg,image/png,image/webp,image/avif,image/svg+xml"
                      onChange={handleFileInputChange}
                      disabled={imageUploading}
                      className="hidden"
                      id="product-image-upload"
                    />

                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      disabled={imageUploading}
                      className="w-full px-3.5 py-2.5 rounded-xl border-2 border-dashed border-border hover:border-foreground/40 bg-background hover:bg-muted/30 text-xs font-medium text-muted-foreground hover:text-foreground transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {imageUploading ? (
                        <>
                          <Loader2 className="w-3.5 h-3.5 animate-spin" />
                          <span>Uploading...</span>
                        </>
                      ) : imagePreview ? (
                        <>
                          <RefreshCw className="w-3.5 h-3.5" />
                          <span>Replace Image</span>
                        </>
                      ) : (
                        <>
                          <Upload className="w-3.5 h-3.5" />
                          <span>Upload Product Image</span>
                        </>
                      )}
                    </button>

                    {imagePreview && !imageUploading && (
                      <p className="text-[10px] text-muted-foreground font-mono truncate px-1">
                        {formData.image_src}
                      </p>
                    )}

                    {!imagePreview && !imageUploading && (
                      <p className="text-[10px] text-muted-foreground px-1">
                        Accepted: JPG, PNG, WebP, AVIF, SVG
                      </p>
                    )}

                    {imageUploadError && (
                      <p className="text-[11px] text-red-500 font-medium px-1">{imageUploadError}</p>
                    )}
                  </div>
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
                  <label className="text-xs font-medium text-foreground block">Fabric / Material Specifications</label>
                  <input
                    type="text"
                    value={formData.specs}
                    onChange={(e) => setFormData({ ...formData, specs: e.target.value })}
                    placeholder="e.g. 200–240 GSM Honeycomb Pique, 100% Cotton"
                    className="w-full px-3.5 py-2 bg-background border border-border rounded-xl text-xs text-foreground focus:outline-none focus:border-foreground"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-medium text-foreground block">
                  Product Description &amp; Specifications (Rich Text)
                </label>
                <RichTextEditor
                  value={formData.detail}
                  onChange={(val) => setFormData({ ...formData, detail: val })}
                  placeholder="Write detailed garment construction, fabrications, collar/cuff seams, packing ratios..."
                  minHeight="160px"
                />
              </div>

              {/* Product Pricing & Costing (FOB) */}
              <div className="p-4 rounded-2xl bg-muted/40 border border-border/70 space-y-3.5">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-semibold text-foreground flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-500" />
                    <span>Product Pricing &amp; Costing (FOB Chittagong)</span>
                  </label>
                  <span className="text-[11px] text-muted-foreground font-mono">Dynamic Price Control</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-[11px] font-medium text-foreground block">
                      FOB Price / Offer Price *
                    </label>
                    <input
                      type="text"
                      value={formData.offer_price}
                      onChange={(e) => setFormData({ ...formData, offer_price: e.target.value })}
                      placeholder="e.g. $4.20 / pc or $3.80 - $5.50 / pc"
                      className="w-full px-3.5 py-2 bg-background border border-border rounded-xl text-xs text-foreground font-semibold focus:outline-none focus:border-foreground"
                    />
                    <span className="text-[10px] text-muted-foreground block">
                      Displayed on catalog cards &amp; product detail page
                    </span>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] font-medium text-muted-foreground block">
                      Original / Regular Price (Strikethrough)
                    </label>
                    <input
                      type="text"
                      value={formData.original_price}
                      onChange={(e) => setFormData({ ...formData, original_price: e.target.value })}
                      placeholder="e.g. $5.80 / pc"
                      className="w-full px-3.5 py-2 bg-background border border-border rounded-xl text-xs text-muted-foreground focus:outline-none focus:border-foreground"
                    />
                    <span className="text-[10px] text-muted-foreground block">
                      Optional MSRP or pre-discount benchmark
                    </span>
                  </div>
                </div>

                {/* Hot Deal / Stock Lot Offer Toggle */}
                <div className="pt-2 border-t border-border/50 space-y-2.5">
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id="hotDealCheck"
                      checked={formData.is_hot_deal}
                      onChange={(e) => setFormData({ ...formData, is_hot_deal: e.target.checked })}
                      className="rounded border-border accent-rose-500 cursor-pointer"
                    />
                    <label htmlFor="hotDealCheck" className="text-xs font-semibold text-foreground flex items-center gap-1.5 cursor-pointer">
                      <Flame className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
                      <span>Promote in Global &ldquo;Hot Deals&rdquo; Section (Across All Pages)</span>
                    </label>
                  </div>

                  {formData.is_hot_deal && (
                    <div className="pt-1">
                      <label className="text-[11px] font-medium text-muted-foreground block mb-1">
                        Promotional Badge / Stock Lot Tag
                      </label>
                      <input
                        type="text"
                        value={formData.deal_badge}
                        onChange={(e) => setFormData({ ...formData, deal_badge: e.target.value })}
                        placeholder="e.g. HOT DEAL, 40% OFF, EXPORT STOCK LOT, CANCELLED ORDER"
                        className="w-full sm:w-2/3 px-3 py-1.5 bg-background border border-border rounded-xl text-xs text-foreground focus:outline-none focus:border-rose-500"
                      />
                    </div>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-2 pt-1">
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
                  disabled={saving || imageUploading}
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
