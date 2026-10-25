"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import {
  saveProductAction,
  toggleProductHotDealAction,
  bulkSetHotDealsAction,
  deleteProductAction,
} from "@/actions/admin";
import {
  Plus,
  Search,
  Edit3,
  Trash2,
  Shirt,
  X,
  Save,
  Upload,
  ImageIcon,
  Loader2,
  RefreshCw,
  Flame,
  Check,
  Tag,
  ArrowRight,
  Percent,
  CheckCircle2,
  Layers,
} from "lucide-react";
import { RichTextEditor } from "@/components/admin/rich-text-editor";

interface HotDealsClientProps {
  initialProducts: any[];
  categories: { slug: string; title: string }[];
}

export function HotDealsClient({ initialProducts, categories }: HotDealsClientProps) {
  const router = useRouter();
  const [products, setProducts] = useState(initialProducts);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  // Modals
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [selectModalOpen, setSelectModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<any | null>(null);

  // Quick price editing state
  const [editingPriceId, setEditingPriceId] = useState<number | null>(null);
  const [tempOfferPrice, setTempOfferPrice] = useState("");

  // Select existing modal state
  const [selectSearch, setSelectSearch] = useState("");
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [bulkOfferPrice, setBulkOfferPrice] = useState("");
  const [bulkSaving, setBulkSaving] = useState(false);

  // Product form data (default hot deal enabled!)
  const [formData, setFormData] = useState({
    id: undefined as number | undefined,
    category_slug: categories[0]?.slug || "knit",
    name: "",
    detail: "",
    badge: "Limited Offer",
    specs: "",
    image_src: "",
    is_featured: false,
    is_hot_deal: true,
    offer_price: "",
    original_price: "",
    deal_badge: "HOT DEAL",
  });

  const [saving, setSaving] = useState(false);
  const [togglingId, setTogglingId] = useState<number | null>(null);

  // Image upload state
  const [imageUploading, setImageUploading] = useState(false);
  const [imageUploadError, setImageUploadError] = useState<string | null>(null);
  const [imagePreview, setImagePreview] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const activeHotDeals = products.filter((p) => Boolean(p.is_hot_deal));
  const availableProducts = products.filter((p) => !p.is_hot_deal);

  const openCreateModal = () => {
    setEditingProduct(null);
    setFormData({
      id: undefined,
      category_slug: categories[0]?.slug || "knit",
      name: "",
      detail: "",
      badge: "Promotional Batch",
      specs: "",
      image_src: "",
      is_featured: false,
      is_hot_deal: true,
      offer_price: "$4.50 / pc",
      original_price: "$6.00 / pc",
      deal_badge: "25% OFF",
    });
    setImagePreview("");
    setImageUploadError(null);
    setCreateModalOpen(true);
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
    setCreateModalOpen(true);
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

  const handleSaveProduct = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.image_src) {
      setImageUploadError("Product image is required. Please upload an image.");
      return;
    }

    setSaving(true);
    try {
      const res = await saveProductAction(formData);
      if (res.success) {
        setCreateModalOpen(false);
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

  const handleRemoveDeal = async (productId: number) => {
    if (!confirm("Remove this product from Hot Deals?")) return;
    setTogglingId(productId);
    try {
      await toggleProductHotDealAction(productId, false);
      setProducts((prev) =>
        prev.map((p) => (p.id === productId ? { ...p, is_hot_deal: false } : p))
      );
      router.refresh();
    } catch (err: any) {
      alert("Error: " + err.message);
    } finally {
      setTogglingId(null);
    }
  };

  const handleSaveInlinePrice = async (productId: number) => {
    try {
      await toggleProductHotDealAction(productId, true, tempOfferPrice);
      setProducts((prev) =>
        prev.map((p) => (p.id === productId ? { ...p, offer_price: tempOfferPrice } : p))
      );
      setEditingPriceId(null);
      router.refresh();
    } catch (err: any) {
      alert("Failed to update offer price: " + err.message);
    }
  };

  const handleQuickAddExisting = async (productId: number, price?: string) => {
    setTogglingId(productId);
    try {
      await toggleProductHotDealAction(productId, true, price || "Special Offer");
      setProducts((prev) =>
        prev.map((p) =>
          p.id === productId ? { ...p, is_hot_deal: true, offer_price: price || p.offer_price || "Special Offer" } : p
        )
      );
      router.refresh();
    } catch (err: any) {
      alert("Error: " + err.message);
    } finally {
      setTogglingId(null);
    }
  };

  const handleBulkAddExisting = async () => {
    if (selectedIds.length === 0) return;
    setBulkSaving(true);
    try {
      await bulkSetHotDealsAction(selectedIds, true);
      setProducts((prev) =>
        prev.map((p) =>
          selectedIds.includes(p.id)
            ? { ...p, is_hot_deal: true, offer_price: bulkOfferPrice || p.offer_price || "Special Offer" }
            : p
        )
      );
      setSelectedIds([]);
      setBulkOfferPrice("");
      setSelectModalOpen(false);
      router.refresh();
    } catch (err: any) {
      alert("Error: " + err.message);
    } finally {
      setBulkSaving(false);
    }
  };

  const filteredDeals = activeHotDeals.filter((p) => {
    const matchCat = selectedCategory === "all" || p.category_slug === selectedCategory;
    const matchSearch =
      search === "" ||
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      (p.detail && p.detail.toLowerCase().includes(search.toLowerCase())) ||
      (p.offer_price && p.offer_price.toLowerCase().includes(search.toLowerCase()));
    return matchCat && matchSearch;
  });

  const filteredAvailable = availableProducts.filter((p) => {
    return (
      selectSearch === "" ||
      p.name.toLowerCase().includes(selectSearch.toLowerCase()) ||
      p.category_slug.toLowerCase().includes(selectSearch.toLowerCase())
    );
  });

  return (
    <div className="space-y-6">
      {/* Top Banner Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-5 rounded-2xl bg-card border border-border/70 flex items-center justify-between shadow-xs">
          <div>
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
              Active Hot Deals
            </p>
            <h3 className="text-2xl font-bold text-foreground mt-1 flex items-center gap-2">
              <span>{activeHotDeals.length}</span>
              <span className="text-xs px-2 py-0.5 rounded-full bg-rose-500/10 text-rose-600 font-semibold border border-rose-500/20">
                Live
              </span>
            </h3>
          </div>
          <div className="w-11 h-11 rounded-xl bg-rose-500/10 text-rose-500 flex items-center justify-center">
            <Flame className="w-6 h-6 fill-rose-500/20" />
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-card border border-border/70 flex items-center justify-between shadow-xs">
          <div>
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
              Regular Catalog Products
            </p>
            <h3 className="text-2xl font-bold text-foreground mt-1">
              {availableProducts.length}
            </h3>
          </div>
          <div className="w-11 h-11 rounded-xl bg-muted flex items-center justify-center text-muted-foreground">
            <Shirt className="w-5 h-5" />
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-card border border-border/70 flex items-center justify-between shadow-xs">
          <div>
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
              Homepage Status
            </p>
            <p className="text-sm font-semibold text-foreground mt-1 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Section Live on Homepage</span>
            </p>
          </div>
          <div className="w-11 h-11 rounded-xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center">
            <CheckCircle2 className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Action Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        {/* Search Input */}
        <div className="relative w-full sm:w-80">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search hot deals by name or price..."
            className="w-full px-3.5 py-2.5 bg-background border border-border rounded-xl text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-foreground pl-9"
          />
          <Search className="w-4 h-4 text-muted-foreground absolute left-3 top-3" />
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-2.5">
          <button
            onClick={() => setSelectModalOpen(true)}
            className="px-4 py-2.5 rounded-xl border border-border bg-card hover:bg-muted text-foreground font-semibold text-xs uppercase tracking-wider transition-all flex items-center gap-2 shadow-2xs cursor-pointer"
          >
            <Layers className="w-4 h-4 text-primary" />
            <span>Select Existing Products ({availableProducts.length})</span>
          </button>

          <button
            onClick={openCreateModal}
            className="px-4 py-2.5 rounded-xl bg-foreground text-background font-semibold text-xs uppercase tracking-wider hover:bg-foreground/90 transition-all flex items-center gap-2 shadow-xs cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Create Hot Deal Product</span>
          </button>
        </div>
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
          All Deals ({activeHotDeals.length})
        </button>
        {categories.map((c) => {
          const count = activeHotDeals.filter((p) => p.category_slug === c.slug).length;
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

      {/* Deals Table */}
      <div className="bg-card border border-border/70 rounded-2xl overflow-x-auto shadow-xs w-full">
        <table className="w-full text-left text-xs min-w-[750px]">
          <thead className="bg-muted/40 border-b border-border/60 text-muted-foreground uppercase text-[10px] font-semibold">
            <tr>
              <th className="py-3 px-4">Deal Product</th>
              <th className="py-3 px-4">Category</th>
              <th className="py-3 px-4">Offer Price</th>
              <th className="py-3 px-4">Regular Price</th>
              <th className="py-3 px-4">Deal Badge</th>
              <th className="py-3 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border/40">
            {filteredDeals.length === 0 ? (
              <tr>
                <td colSpan={6} className="py-16 text-center text-xs text-muted-foreground space-y-3">
                  <div className="w-12 h-12 rounded-2xl bg-muted/60 flex items-center justify-center mx-auto text-muted-foreground">
                    <Flame className="w-6 h-6 opacity-40" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground text-sm">No Active Hot Deals</p>
                    <p className="text-muted-foreground text-xs mt-1">
                      Click &ldquo;Select Existing Products&rdquo; to add products or create a new deal.
                    </p>
                  </div>
                </td>
              </tr>
            ) : (
              filteredDeals.map((p) => (
                <tr key={p.id} className="hover:bg-muted/30 transition-colors">
                  <td className="py-3.5 px-4 max-w-sm">
                    <div className="flex items-start gap-3">
                      <div className="w-12 h-12 rounded-xl bg-muted/60 overflow-hidden shrink-0 border border-border/50 relative">
                        {p.image_src ? (
                          <img src={p.image_src} alt={p.name} className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                            <Shirt className="w-5 h-5 opacity-40" />
                          </div>
                        )}
                        <span className="absolute top-0.5 right-0.5 w-2 h-2 rounded-full bg-rose-500" />
                      </div>

                      <div className="space-y-0.5">
                        <span className="font-semibold text-foreground text-sm block">{p.name}</span>
                        <p className="text-[11px] text-muted-foreground line-clamp-1">
                          {p.specs || p.detail || "Promotional apparel lot"}
                        </p>
                      </div>
                    </div>
                  </td>

                  <td className="py-3.5 px-4">
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-semibold uppercase bg-muted text-muted-foreground font-mono">
                      {p.category_slug}
                    </span>
                  </td>

                  {/* Offer Price with inline editing */}
                  <td className="py-3.5 px-4">
                    {editingPriceId === p.id ? (
                      <div className="flex items-center gap-1.5">
                        <input
                          type="text"
                          value={tempOfferPrice}
                          onChange={(e) => setTempOfferPrice(e.target.value)}
                          placeholder="$4.50 / pc"
                          className="w-28 px-2 py-1 bg-background border border-rose-500 rounded-lg text-xs font-semibold text-rose-600 focus:outline-none"
                          autoFocus
                        />
                        <button
                          onClick={() => handleSaveInlinePrice(p.id)}
                          className="p-1 rounded-md bg-rose-500 text-white hover:bg-rose-600 cursor-pointer"
                        >
                          <Check className="w-3 h-3" />
                        </button>
                        <button
                          onClick={() => setEditingPriceId(null)}
                          className="p-1 rounded-md bg-muted text-muted-foreground hover:bg-muted/80 cursor-pointer"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => {
                          setEditingPriceId(p.id);
                          setTempOfferPrice(p.offer_price || "");
                        }}
                        className="group flex items-center gap-1 text-left cursor-pointer"
                        title="Click to edit offer price"
                      >
                        <span className="text-sm font-bold text-rose-600 dark:text-rose-400">
                          {p.offer_price || "Set Price"}
                        </span>
                        <Edit3 className="w-3 h-3 opacity-0 group-hover:opacity-60 text-muted-foreground transition-opacity" />
                      </button>
                    )}
                  </td>

                  {/* Regular Price */}
                  <td className="py-3.5 px-4">
                    {p.original_price ? (
                      <span className="text-xs text-muted-foreground line-through">
                        {p.original_price}
                      </span>
                    ) : (
                      <span className="text-xs text-muted-foreground/60">—</span>
                    )}
                  </td>

                  {/* Deal Badge */}
                  <td className="py-3.5 px-4">
                    {p.deal_badge ? (
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-rose-500/15 text-rose-600 dark:text-rose-400 border border-rose-500/25">
                        <Tag className="w-2.5 h-2.5" />
                        {p.deal_badge}
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold bg-rose-500/10 text-rose-600">
                        HOT DEAL
                      </span>
                    )}
                  </td>

                  {/* Actions */}
                  <td className="py-3.5 px-4 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <button
                        onClick={() => openEditModal(p)}
                        className="p-1.5 rounded-lg border border-border text-foreground hover:bg-muted transition-colors cursor-pointer"
                        title="Edit Full Product"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                      </button>

                      <button
                        onClick={() => handleRemoveDeal(p.id)}
                        disabled={togglingId === p.id}
                        className="px-2.5 py-1.5 rounded-lg border border-border text-xs text-muted-foreground hover:text-rose-600 hover:border-rose-500/30 hover:bg-rose-500/10 transition-colors cursor-pointer"
                        title="Remove from Hot Deals"
                      >
                        Remove Deal
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Modal: Select From Existing Products */}
      {selectModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="w-full max-w-2xl bg-card border border-border rounded-3xl p-6 sm:p-8 shadow-2xl relative space-y-6 max-h-[90vh] flex flex-col">
            <div className="flex items-center justify-between border-b border-border/60 pb-3">
              <div>
                <h3 className="text-lg font-semibold text-foreground tracking-tight">
                  Select Existing Products for Hot Deals
                </h3>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Pick products from your catalog to showcase in the Hot Deals homepage section
                </p>
              </div>
              <button
                onClick={() => setSelectModalOpen(false)}
                className="p-1.5 rounded-full hover:bg-muted text-muted-foreground hover:text-foreground cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Search + Bulk Action */}
            <div className="space-y-3">
              <div className="relative">
                <input
                  type="text"
                  value={selectSearch}
                  onChange={(e) => setSelectSearch(e.target.value)}
                  placeholder="Filter available products..."
                  className="w-full px-3.5 py-2 bg-background border border-border rounded-xl text-xs text-foreground pl-9 focus:outline-none focus:border-foreground"
                />
                <Search className="w-4 h-4 text-muted-foreground absolute left-3 top-2.5" />
              </div>

              {selectedIds.length > 0 && (
                <div className="p-3 rounded-xl bg-muted/60 border border-border/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="text-xs">
                    <strong className="text-foreground">{selectedIds.length}</strong> products selected
                  </div>
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      value={bulkOfferPrice}
                      onChange={(e) => setBulkOfferPrice(e.target.value)}
                      placeholder="Offer Price (e.g. $4.50 / pc)"
                      className="px-3 py-1.5 bg-background border border-border rounded-lg text-xs text-foreground font-semibold"
                    />
                    <button
                      onClick={handleBulkAddExisting}
                      disabled={bulkSaving}
                      className="px-3 py-1.5 rounded-lg bg-foreground text-background font-semibold text-xs hover:bg-foreground/90 transition-all cursor-pointer disabled:opacity-50"
                    >
                      {bulkSaving ? "Adding..." : "Add to Hot Deals"}
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Available Products List */}
            <div className="flex-1 overflow-y-auto divide-y divide-border/40 border border-border/60 rounded-2xl max-h-96">
              {filteredAvailable.length === 0 ? (
                <div className="p-8 text-center text-xs text-muted-foreground">
                  No other products available to add. All products may already be in Hot Deals.
                </div>
              ) : (
                filteredAvailable.map((p) => {
                  const isChecked = selectedIds.includes(p.id);
                  return (
                    <div
                      key={p.id}
                      className="p-3 flex items-center justify-between gap-3 hover:bg-muted/30 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setSelectedIds((prev) => [...prev, p.id]);
                            } else {
                              setSelectedIds((prev) => prev.filter((id) => id !== p.id));
                            }
                          }}
                          className="rounded border-border accent-foreground cursor-pointer"
                        />

                        <div className="w-10 h-10 rounded-lg bg-muted overflow-hidden shrink-0 border border-border/50">
                          {p.image_src ? (
                            <img src={p.image_src} alt={p.name} className="w-full h-full object-cover" />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                              <Shirt className="w-4 h-4 opacity-40" />
                            </div>
                          )}
                        </div>

                        <div>
                          <p className="text-xs font-semibold text-foreground">{p.name}</p>
                          <p className="text-[10px] text-muted-foreground uppercase font-mono">
                            {p.category_slug} • {p.specs || "Standard"}
                          </p>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => handleQuickAddExisting(p.id)}
                        disabled={togglingId === p.id}
                        className="px-3 py-1 rounded-lg border border-border hover:bg-foreground hover:text-background text-xs font-medium transition-all cursor-pointer shrink-0 disabled:opacity-50"
                      >
                        {togglingId === p.id ? "Adding..." : "+ Add Deal"}
                      </button>
                    </div>
                  );
                })
              )}
            </div>

            <div className="flex justify-end pt-2 border-t border-border/60">
              <button
                type="button"
                onClick={() => setSelectModalOpen(false)}
                className="px-4 py-2 rounded-xl border border-border text-xs font-medium hover:bg-muted"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal: Create or Edit Product with Hot Deal Enabled */}
      {createModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="w-full max-w-xl bg-card border border-border rounded-3xl p-6 sm:p-8 shadow-2xl relative space-y-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-border/60 pb-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-rose-500/10 text-rose-500 flex items-center justify-center">
                  <Flame className="w-4 h-4 fill-rose-500/20" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground tracking-tight">
                    {editingProduct ? "Edit Hot Deal Product" : "Create Hot Deal Product"}
                  </h3>
                </div>
              </div>
              <button
                onClick={() => setCreateModalOpen(false)}
                className="p-1.5 rounded-full hover:bg-muted text-muted-foreground hover:text-foreground cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveProduct} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-foreground block">Product Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. 100% Cotton Pique Polo Lot"
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

                <div className="flex items-start gap-4">
                  <div className="w-24 h-24 rounded-xl border-2 border-dashed border-border bg-muted/40 overflow-hidden shrink-0 flex items-center justify-center">
                    {imageUploading ? (
                      <Loader2 className="w-6 h-6 text-muted-foreground animate-spin" />
                    ) : imagePreview ? (
                      <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                    ) : (
                      <ImageIcon className="w-7 h-7 text-muted-foreground/40" />
                    )}
                  </div>

                  <div className="flex-1 space-y-2">
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/jpeg,image/png,image/webp,image/avif,image/svg+xml"
                      onChange={handleFileInputChange}
                      disabled={imageUploading}
                      className="hidden"
                      id="hotdeal-image-upload"
                    />

                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      disabled={imageUploading}
                      className="w-full px-3.5 py-2.5 rounded-xl border-2 border-dashed border-border hover:border-foreground/40 bg-background hover:bg-muted/30 text-xs font-medium text-muted-foreground hover:text-foreground transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
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

                    {imageUploadError && (
                      <p className="text-[11px] text-red-500 font-medium px-1">{imageUploadError}</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Offer Pricing Row */}
              <div className="p-3.5 rounded-2xl bg-rose-500/5 border border-rose-500/20 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-rose-600 dark:text-rose-400 flex items-center gap-1.5">
                    <Flame className="w-3.5 h-3.5 fill-rose-500" />
                    <span>Special Offer Pricing</span>
                  </span>
                  <span className="text-[10px] text-muted-foreground">Displayed on Homepage</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="space-y-1">
                    <label className="text-[11px] font-medium text-foreground block">Offer Price *</label>
                    <input
                      type="text"
                      required
                      value={formData.offer_price}
                      onChange={(e) => setFormData({ ...formData, offer_price: e.target.value })}
                      placeholder="e.g. $4.50 / pc"
                      className="w-full px-3 py-1.5 bg-background border border-rose-500/50 rounded-xl text-xs text-foreground font-bold text-rose-600 focus:outline-none focus:border-rose-500"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] font-medium text-muted-foreground block">Original Price</label>
                    <input
                      type="text"
                      value={formData.original_price}
                      onChange={(e) => setFormData({ ...formData, original_price: e.target.value })}
                      placeholder="e.g. $6.00 / pc"
                      className="w-full px-3 py-1.5 bg-background border border-border rounded-xl text-xs text-muted-foreground focus:outline-none focus:border-foreground"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] font-medium text-muted-foreground block">Deal Badge</label>
                    <input
                      type="text"
                      value={formData.deal_badge}
                      onChange={(e) => setFormData({ ...formData, deal_badge: e.target.value })}
                      placeholder="e.g. 25% OFF"
                      className="w-full px-3 py-1.5 bg-background border border-border rounded-xl text-xs text-foreground focus:outline-none focus:border-foreground"
                    />
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
                    placeholder="e.g. Core Base"
                    className="w-full px-3.5 py-2 bg-background border border-border rounded-xl text-xs text-foreground focus:outline-none focus:border-foreground"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-foreground block">Fabric / Specs</label>
                  <input
                    type="text"
                    value={formData.specs}
                    onChange={(e) => setFormData({ ...formData, specs: e.target.value })}
                    placeholder="e.g. 220 GSM Honeycomb Pique"
                    className="w-full px-3.5 py-2 bg-background border border-border rounded-xl text-xs text-foreground focus:outline-none focus:border-foreground"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-medium text-foreground block">
                  Manufacturing Details &amp; Specifications (Rich Text)
                </label>
                <RichTextEditor
                  value={formData.detail}
                  onChange={(val) => setFormData({ ...formData, detail: val })}
                  placeholder="e.g. Available for immediate production batch with custom tags, private labeling, packing specifications..."
                  minHeight="160px"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-border/60">
                <button
                  type="button"
                  onClick={() => setCreateModalOpen(false)}
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
                  <span>{saving ? "Saving..." : "Save Hot Deal Product"}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
