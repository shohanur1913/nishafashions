"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { saveCategoryAction, deleteCategoryAction } from "@/actions/admin";
import { ArrowLeft, Save, Trash2, CheckCircle2, AlertCircle, ExternalLink, Image as ImageIcon, Upload, Loader2, RefreshCw } from "lucide-react";
import Link from "next/link";

interface CategoryEditorClientProps {
  category?: any;
  isNew?: boolean;
}

export function CategoryEditorClient({ category, isNew = false }: CategoryEditorClientProps) {
  const router = useRouter();

  const [title, setTitle] = useState(category?.title || "");
  const [slug, setSlug] = useState(category?.slug || "");
  const [badge, setBadge] = useState(category?.badge || "");
  const [description, setDescription] = useState(category?.description || "");
  const [heroIntro, setHeroIntro] = useState(category?.hero_intro || "");
  const [longDescription, setLongDescription] = useState(category?.long_description || "");
  const [imageSrc, setImageSrc] = useState(category?.image_src || "");
  const [imageAlt, setImageAlt] = useState(category?.image_alt || "");
  const [leadTime, setLeadTime] = useState(category?.lead_time || "");
  const [moq, setMoq] = useState(category?.moq || "");
  const [productionCapacity, setProductionCapacity] = useState(category?.production_capacity || "");

  // Arrays
  const [fabrics, setFabrics] = useState<string>(
    category?.fabrics_json ? JSON.parse(category.fabrics_json).join("\n") : ""
  );
  const [constructions, setConstructions] = useState<string>(
    category?.constructions_json ? JSON.parse(category.constructions_json).join("\n") : ""
  );
  const [finishes, setFinishes] = useState<string>(
    category?.finishes_json ? JSON.parse(category.finishes_json).join("\n") : ""
  );
  const [certifications, setCertifications] = useState<string>(
    category?.certifications_json ? JSON.parse(category.certifications_json).join("\n") : ""
  );

  const [saving, setSaving] = useState(false);
  const [statusMsg, setStatusMsg] = useState<{ type: "success" | "error"; text: string } | null>(null);

  // Image upload state
  const [imageUploading, setImageUploading] = useState(false);
  const [imageUploadError, setImageUploadError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = async (file: File) => {
    setImageUploading(true);
    setImageUploadError(null);

    const fd = new FormData();
    fd.append("file", file);
    if (imageAlt) {
      fd.append("altText", imageAlt);
    }

    try {
      const res = await fetch("/api/upload", { method: "POST", body: fd });
      const data = await res.json();
      if (res.ok && data.success) {
        setImageSrc(data.url);
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

  const handleTitleChange = (val: string) => {
    setTitle(val);
    if (isNew && !slug) {
      setSlug(val.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, ""));
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setStatusMsg(null);

    const parseList = (str: string) =>
      str
        .split("\n")
        .map((s) => s.trim())
        .filter(Boolean);

    try {
      const res = await saveCategoryAction({
        id: category?.id,
        slug: slug.trim().toLowerCase(),
        title,
        badge,
        description,
        hero_intro: heroIntro,
        long_description: longDescription,
        image_src: imageSrc,
        image_alt: imageAlt,
        lead_time: leadTime,
        moq,
        production_capacity: productionCapacity,
        fabrics: parseList(fabrics),
        constructions: parseList(constructions),
        finishes: parseList(finishes),
        certifications: parseList(certifications),
        is_published: true,
      });

      if (res.success) {
        setStatusMsg({ type: "success", text: "Category saved successfully!" });
        if (isNew) {
          router.push(`/admin/categories/${slug}`);
        } else {
          router.refresh();
        }
      } else {
        setStatusMsg({ type: "error", text: "Failed to save category." });
      }
    } catch (err: any) {
      setStatusMsg({ type: "error", text: err.message || "An error occurred." });
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!category?.id) return;
    if (!confirm(`Are you sure you want to delete "${category.title}"? All its products will also be deleted.`)) {
      return;
    }

    try {
      await deleteCategoryAction(category.id);
      router.push("/admin/categories");
    } catch (err: any) {
      alert("Failed to delete category: " + err.message);
    }
  };

  return (
    <form onSubmit={handleSave} className="p-4 sm:p-6 lg:p-8 w-full min-w-0 max-w-5xl mx-auto space-y-8">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border/80 pb-6">
        <div className="flex items-center gap-3">
          <Link
            href="/admin/categories"
            className="p-2 rounded-xl border border-border hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div>
            <h2 className="text-xl sm:text-2xl font-semibold text-foreground tracking-tight">
              {isNew ? "Add New Category" : `Edit Category: ${category.title}`}
            </h2>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2 sm:gap-3 shrink-0">
          {!isNew && (
            <>
              <Link
                href={`/categories/${category.slug}`}
                target="_blank"
                className="px-3.5 py-2 rounded-xl border border-border text-xs font-medium text-foreground hover:bg-muted transition-colors flex items-center gap-1.5"
              >
                <span>View Live Page</span>
                <ExternalLink className="w-3.5 h-3.5 opacity-60" />
              </Link>

              <button
                type="button"
                onClick={handleDelete}
                className="p-2 rounded-xl border border-red-500/20 text-red-500 hover:bg-red-500/10 transition-colors cursor-pointer"
                title="Delete Category"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </>
          )}

          <button
            type="submit"
            disabled={saving}
            className="px-5 py-2 rounded-xl bg-foreground text-background font-semibold text-xs uppercase tracking-wider hover:bg-foreground/90 transition-all flex items-center gap-2 shadow-xs cursor-pointer disabled:opacity-50"
          >
            <Save className="w-3.5 h-3.5" />
            <span>{saving ? "Saving..." : isNew ? "Create Category" : "Save Changes"}</span>
          </button>
        </div>
      </div>

      {/* Status Alert */}
      {statusMsg && (
        <div className={`p-4 rounded-xl flex items-center gap-3 text-xs ${
          statusMsg.type === "success" 
            ? "bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400"
            : "bg-red-500/10 border border-red-500/20 text-red-500"
        }`}>
          {statusMsg.type === "success" ? <CheckCircle2 className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
          <span>{statusMsg.text}</span>
        </div>
      )}

      {/* Main Fields */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Core Info */}
        <div className="lg:col-span-8 space-y-6">
          
          <div className="p-6 rounded-2xl bg-card border border-border/70 space-y-4 shadow-xs">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Core Identity
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-foreground block">Category Title *</label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => handleTitleChange(e.target.value)}
                  placeholder="e.g. Denim"
                  className="w-full px-3.5 py-2 bg-background border border-border rounded-xl text-xs text-foreground focus:outline-none focus:border-foreground"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-medium text-foreground block">URL Slug *</label>
                <input
                  type="text"
                  required
                  value={slug}
                  onChange={(e) => setSlug(e.target.value)}
                  placeholder="e.g. denim"
                  className="w-full px-3.5 py-2 bg-background border border-border rounded-xl text-xs text-foreground font-mono focus:outline-none focus:border-foreground"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-medium text-foreground block">Badge / Tagline</label>
              <input
                type="text"
                value={badge}
                onChange={(e) => setBadge(e.target.value)}
                placeholder="e.g. Specialized Washes & Fits"
                className="w-full px-3.5 py-2 bg-background border border-border rounded-xl text-xs text-foreground focus:outline-none focus:border-foreground"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-medium text-foreground block">Short Description</label>
              <input
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Brief 1-line summary for cards..."
                className="w-full px-3.5 py-2 bg-background border border-border rounded-xl text-xs text-foreground focus:outline-none focus:border-foreground"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-medium text-foreground block">Hero Intro Description</label>
              <textarea
                rows={2}
                value={heroIntro}
                onChange={(e) => setHeroIntro(e.target.value)}
                placeholder="Introduction displayed at the top of /categories/[slug]..."
                className="w-full px-3.5 py-2 bg-background border border-border rounded-xl text-xs text-foreground focus:outline-none focus:border-foreground resize-none"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-medium text-foreground block">Detailed Manufacturing Overview</label>
              <textarea
                rows={4}
                value={longDescription}
                onChange={(e) => setLongDescription(e.target.value)}
                placeholder="Detailed description of factory units, CAD tables, equipment and inspection..."
                className="w-full px-3.5 py-2 bg-background border border-border rounded-xl text-xs text-foreground focus:outline-none focus:border-foreground resize-none"
              />
            </div>
          </div>

          {/* Technical Specifications Lists */}
          <div className="p-6 rounded-2xl bg-card border border-border/70 space-y-4 shadow-xs">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Technical Specifications (One item per line)
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-foreground block">Available Fabrics / Yarns</label>
                <textarea
                  rows={4}
                  value={fabrics}
                  onChange={(e) => setFabrics(e.target.value)}
                  placeholder="100% Combed Cotton&#10;Organic Cotton (GOTS)&#10;TENCEL™ Lyocell"
                  className="w-full px-3.5 py-2 bg-background border border-border rounded-xl text-xs text-foreground focus:outline-none focus:border-foreground font-mono"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-medium text-foreground block">Constructions & Weaves</label>
                <textarea
                  rows={4}
                  value={constructions}
                  onChange={(e) => setConstructions(e.target.value)}
                  placeholder="Poplin&#10;Oxford&#10;Twill&#10;Canvas"
                  className="w-full px-3.5 py-2 bg-background border border-border rounded-xl text-xs text-foreground focus:outline-none focus:border-foreground font-mono"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-medium text-foreground block">Finishes & Treatments</label>
                <textarea
                  rows={4}
                  value={finishes}
                  onChange={(e) => setFinishes(e.target.value)}
                  placeholder="Peach Skin&#10;Enzyme Soft Wash&#10;Wrinkle-Resistant"
                  className="w-full px-3.5 py-2 bg-background border border-border rounded-xl text-xs text-foreground focus:outline-none focus:border-foreground font-mono"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-medium text-foreground block">Audits & Certifications</label>
                <textarea
                  rows={4}
                  value={certifications}
                  onChange={(e) => setCertifications(e.target.value)}
                  placeholder="OEKO-TEX® Standard 100&#10;BSCI&#10;WRAP&#10;SEDEX"
                  className="w-full px-3.5 py-2 bg-background border border-border rounded-xl text-xs text-foreground focus:outline-none focus:border-foreground font-mono"
                />
              </div>
            </div>
          </div>

        </div>

        {/* Right Column: Metrics & Imagery */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Operational Metrics */}
          <div className="p-6 rounded-2xl bg-card border border-border/70 space-y-4 shadow-xs">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Production Capabilities
            </h3>

            <div className="space-y-3">
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-foreground block">Minimum Order Quantity (MOQ)</label>
                <input
                  type="text"
                  value={moq}
                  onChange={(e) => setMoq(e.target.value)}
                  placeholder="e.g. 1,500 pcs per style"
                  className="w-full px-3.5 py-2 bg-background border border-border rounded-xl text-xs text-foreground"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-medium text-foreground block">Production Lead Time</label>
                <input
                  type="text"
                  value={leadTime}
                  onChange={(e) => setLeadTime(e.target.value)}
                  placeholder="e.g. 60-90 Days"
                  className="w-full px-3.5 py-2 bg-background border border-border rounded-xl text-xs text-foreground"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-medium text-foreground block">Monthly Production Capacity</label>
                <input
                  type="text"
                  value={productionCapacity}
                  onChange={(e) => setProductionCapacity(e.target.value)}
                  placeholder="e.g. 1,200,000 pcs / month"
                  className="w-full px-3.5 py-2 bg-background border border-border rounded-xl text-xs text-foreground"
                />
              </div>
            </div>
          </div>

          {/* Featured Image */}
          <div className="p-6 rounded-2xl bg-card border border-border/70 space-y-4 shadow-xs">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Category Photograph
              </h3>
              {imageSrc && (
                <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" />
                  Image Set
                </span>
              )}
            </div>

            {/* Preview Box */}
            <div className="relative aspect-[16/10] w-full rounded-xl overflow-hidden bg-muted/40 border-2 border-dashed border-border flex items-center justify-center">
              {imageUploading ? (
                <div className="flex flex-col items-center gap-2 text-muted-foreground">
                  <Loader2 className="w-7 h-7 animate-spin text-primary" />
                  <span className="text-xs font-medium">Uploading image...</span>
                </div>
              ) : imageSrc ? (
                <img src={imageSrc} alt={imageAlt || title} className="w-full h-full object-cover" />
              ) : (
                <div className="flex flex-col items-center gap-1.5 text-muted-foreground/60 p-4 text-center">
                  <ImageIcon className="w-8 h-8 opacity-40" />
                  <span className="text-xs">No image selected</span>
                </div>
              )}
            </div>

            {/* Upload Button & File Input */}
            <div className="space-y-3">
              <input
                ref={fileInputRef}
                type="file"
                accept="image/jpeg,image/png,image/webp,image/avif,image/svg+xml"
                onChange={handleFileInputChange}
                disabled={imageUploading}
                className="hidden"
                id="category-image-upload"
              />

              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                disabled={imageUploading}
                className="w-full py-2.5 px-3 rounded-xl border-2 border-dashed border-border hover:border-foreground/40 bg-background hover:bg-muted/30 text-xs font-semibold text-foreground transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed shadow-2xs"
              >
                {imageUploading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Uploading Image...</span>
                  </>
                ) : imageSrc ? (
                  <>
                    <RefreshCw className="w-4 h-4" />
                    <span>Replace Category Image</span>
                  </>
                ) : (
                  <>
                    <Upload className="w-4 h-4" />
                    <span>Upload Category Image</span>
                  </>
                )}
              </button>

              {imageUploadError && (
                <p className="text-xs text-red-500 font-medium px-1">{imageUploadError}</p>
              )}

              {/* Direct Path Input (Optional/Advanced) */}
              <div className="space-y-1.5 pt-1">
                <label className="text-[11px] font-medium text-muted-foreground block">
                  Image Path / URL (Auto-filled on upload)
                </label>
                <input
                  type="text"
                  value={imageSrc}
                  onChange={(e) => setImageSrc(e.target.value)}
                  placeholder="/images/category-woven.png"
                  className="w-full px-3 py-1.5 bg-background border border-border rounded-xl text-xs text-foreground font-mono"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[11px] font-medium text-muted-foreground block">
                  Image Alt Text (SEO & Accessibility)
                </label>
                <input
                  type="text"
                  value={imageAlt}
                  onChange={(e) => setImageAlt(e.target.value)}
                  placeholder="e.g. Bangladesh Woven Garments Factory Production"
                  className="w-full px-3 py-1.5 bg-background border border-border rounded-xl text-xs text-foreground"
                />
              </div>
            </div>
          </div>

        </div>

      </div>
    </form>
  );
}
