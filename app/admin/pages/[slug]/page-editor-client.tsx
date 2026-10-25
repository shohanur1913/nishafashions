"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { savePageAction } from "@/actions/admin";
import { 
  ArrowLeft, 
  Save, 
  CheckCircle2, 
  AlertCircle, 
  ExternalLink, 
  Image as ImageIcon, 
  Plus, 
  Trash2, 
  Eye, 
  Check, 
  X, 
  Layers, 
  Globe, 
  Code2, 
  FileText,
  ChevronDown,
  ChevronUp
} from "lucide-react";
import Link from "next/link";
import { RichTextEditor } from "@/components/admin/rich-text-editor";

const AVAILABLE_IMAGE_PRESETS = [
  { label: "Hero Apparel (Production)", src: "/images/hero-apparel.png" },
  { label: "Product Development", src: "/images/product-development.png" },
  { label: "Export Packing & Staging", src: "/images/export-packing.png" },
  { label: "Denim Division", src: "/images/category-denim.png" },
  { label: "Knitwear Division", src: "/images/category-knit.png" },
  { label: "Woven Division", src: "/images/category-woven.png" },
  { label: "Sweater Division", src: "/images/category-sweater.png" },
  { label: "Stage: Cutting Floor", src: "/images/stage-cutting.png" },
  { label: "Stage: Sewing Lines", src: "/images/stage-sewing.png" },
  { label: "Stage: Fabric & Shade", src: "/images/stage-fabric.png" },
  { label: "Stage: Quality Control (QC)", src: "/images/stage-qc.png" },
  { label: "Stage: Assembly Floor", src: "/images/stage-assembly.png" },
  { label: "Stage: Packing & Ratio Cartons", src: "/images/stage-packing.png" },
  { label: "Stage: Despatch & Port Logistics", src: "/images/stage-despatch.png" },
  { label: "Stage: Embroidery Unit", src: "/images/stage-embroidery.png" },
  { label: "Stage: Printing & Screen Work", src: "/images/stage-printing.png" },
  { label: "Stage: Yarn & Knitting Mills", src: "/images/stage-yarn.png" },
  { label: "Stage: Trims, Badges & Labels", src: "/images/stage-trims.png" },
  { label: "Premier Bank Official Logo", src: "/images/premier-bank-logo.png" },
  { label: "Nisha Fashions Corporate Logo", src: "/images/logo.jpg" },
];

interface ImagePickerFieldProps {
  label: string;
  value: string;
  onChange: (val: string) => void;
  altValue?: string;
  onAltChange?: (val: string) => void;
  description?: string;
}

function ImagePickerField({ label, value, onChange, altValue, onAltChange, description }: ImagePickerFieldProps) {
  const [showPresets, setShowPresets] = useState(false);

  return (
    <div className="space-y-2 p-3.5 rounded-xl bg-background border border-border/80">
      <div className="flex items-center justify-between">
        <label className="text-xs font-semibold uppercase tracking-wider text-foreground flex items-center gap-1.5">
          <ImageIcon className="w-3.5 h-3.5 text-primary" />
          <span>{label}</span>
        </label>
        <button
          type="button"
          onClick={() => setShowPresets(!showPresets)}
          className="text-[11px] font-medium text-primary hover:underline cursor-pointer flex items-center gap-1"
        >
          <span>{showPresets ? "Close Presets" : "Choose from Library"}</span>
          <ChevronDown className={`w-3 h-3 transition-transform ${showPresets ? "rotate-180" : ""}`} />
        </button>
      </div>

      {description && (
        <p className="text-[11px] text-muted-foreground">{description}</p>
      )}

      {/* Preset Picker Dropdown Grid */}
      {showPresets && (
        <div className="p-3 rounded-xl bg-muted/40 border border-border/60 space-y-2 animate-in fade-in duration-150">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 max-h-48 overflow-y-auto p-1">
            {AVAILABLE_IMAGE_PRESETS.map((preset, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => {
                  onChange(preset.src);
                  setShowPresets(false);
                }}
                className={`p-1.5 rounded-lg border text-left cursor-pointer transition-all flex flex-col items-center gap-1 group ${
                  value === preset.src
                    ? "border-primary bg-primary/10 ring-1 ring-primary"
                    : "border-border/60 bg-background hover:border-primary/50"
                }`}
              >
                <div className="w-full h-14 rounded overflow-hidden bg-muted relative">
                  <img src={preset.src} alt={preset.label} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                </div>
                <span className="text-[10px] font-medium text-foreground line-clamp-1 text-center w-full">
                  {preset.label}
                </span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Image Preview & URL Input */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
        {value ? (
          <div className="relative w-20 h-14 rounded-lg overflow-hidden bg-muted border border-border shrink-0 group">
            <img src={value} alt="Preview" className="w-full h-full object-cover" />
            <button
              type="button"
              onClick={() => onChange("")}
              className="absolute inset-0 bg-black/60 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
              title="Remove image"
            >
              <X className="w-4 h-4 text-red-400" />
            </button>
          </div>
        ) : (
          <div className="w-20 h-14 rounded-lg bg-muted/40 border border-dashed border-border flex flex-col items-center justify-center text-muted-foreground shrink-0">
            <ImageIcon className="w-4 h-4 opacity-40" />
            <span className="text-[9px] mt-0.5">No image</span>
          </div>
        )}

        <div className="flex-1 w-full space-y-1.5">
          <input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="Image path or URL (e.g. /images/hero-apparel.png)"
            className="w-full px-3 py-1.5 bg-background border border-border rounded-lg text-xs font-mono text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary"
          />
          {onAltChange && (
            <input
              type="text"
              value={altValue || ""}
              onChange={(e) => onAltChange(e.target.value)}
              placeholder="Image ALT description (for SEO & accessibility)"
              className="w-full px-3 py-1 bg-background border border-border/70 rounded-lg text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary"
            />
          )}
        </div>
      </div>
    </div>
  );
}

interface PageEditorClientProps {
  page: {
    id: number;
    slug: string;
    title: string;
    subtitle: string;
    content_json: string;
    seo_title: string;
    seo_description: string;
    is_published: boolean;
  };
}

export function PageEditorClient({ page }: PageEditorClientProps) {
  const router = useRouter();
  const [title, setTitle] = useState(page.title);
  const [subtitle, setSubtitle] = useState(page.subtitle || "");
  const [seoTitle, setSeoTitle] = useState(page.seo_title || "");
  const [seoDescription, setSeoDescription] = useState(page.seo_description || "");
  const [isPublished, setIsPublished] = useState(page.is_published !== false);
  const [showRawJson, setShowRawJson] = useState(false);

  // Parse content JSON into state
  const [content, setContent] = useState<any>(() => {
    try {
      return JSON.parse(page.content_json || "{}");
    } catch {
      return {};
    }
  });

  const [saving, setSaving] = useState(false);
  const [statusMsg, setStatusMsg] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setStatusMsg(null);

    try {
      const res = await savePageAction(page.slug, {
        title,
        subtitle,
        content_json: JSON.stringify(content, null, 2),
        seo_title: seoTitle,
        seo_description: seoDescription,
        is_published: isPublished,
      });

      if (res.success) {
        setStatusMsg({ type: "success", text: "Page content saved and published to live website!" });
        router.refresh();
      } else {
        setStatusMsg({ type: "error", text: "Failed to save page." });
      }
    } catch (err: any) {
      setStatusMsg({ type: "error", text: err.message || "An error occurred while saving." });
    } finally {
      setSaving(false);
    }
  };

  // Helper to update deeply nested fields in content
  const updateContent = (path: string[], value: any) => {
    setContent((prev: any) => {
      const copy = JSON.parse(JSON.stringify(prev));
      let curr = copy;
      for (let i = 0; i < path.length - 1; i++) {
        if (!curr[path[i]]) curr[path[i]] = {};
        curr = curr[path[i]];
      }
      curr[path[path.length - 1]] = value;
      return copy;
    });
  };

  return (
    <form onSubmit={handleSave} className="p-4 sm:p-6 lg:p-8 w-full min-w-0 max-w-5xl mx-auto space-y-8">
      {/* Top Action Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border/80 pb-6">
        <div className="flex items-center gap-3">
          <Link
            href="/admin/pages"
            className="p-2 rounded-xl border border-border hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl sm:text-2xl font-semibold text-foreground tracking-tight">
                Editing: {page.title}
              </h2>
              <span className="text-[11px] font-mono uppercase bg-muted px-2.5 py-0.5 rounded-full text-muted-foreground font-semibold">
                /{page.slug === "home" ? "" : page.slug}
              </span>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2 sm:gap-3 shrink-0">
          {/* Status Toggle Switch */}
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-card border border-border text-xs">
            <span className="text-muted-foreground text-[11px] font-medium">Status:</span>
            <button
              type="button"
              onClick={() => setIsPublished(!isPublished)}
              className={`px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase cursor-pointer transition-colors ${
                isPublished 
                  ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30" 
                  : "bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/30"
              }`}
            >
              {isPublished ? "Published" : "Draft"}
            </button>
          </div>

          <Link
            href={`/${page.slug === "home" ? "" : page.slug}`}
            target="_blank"
            className="px-3.5 py-2 rounded-xl border border-border text-xs font-medium text-foreground hover:bg-muted transition-colors flex items-center gap-1.5"
          >
            <span>View Live</span>
            <ExternalLink className="w-3.5 h-3.5 opacity-60" />
          </Link>

          <button
            type="submit"
            disabled={saving}
            className="px-5 py-2 rounded-xl bg-primary text-primary-foreground font-semibold text-xs uppercase tracking-wider hover:bg-primary/90 transition-all flex items-center gap-2 shadow-xs cursor-pointer disabled:opacity-50 active:scale-95"
          >
            <Save className="w-3.5 h-3.5" />
            <span>{saving ? "Saving..." : "Save Changes"}</span>
          </button>
        </div>
      </div>

      {/* Status Alert */}
      {statusMsg && (
        <div className={`p-4 rounded-xl flex items-center gap-3 text-xs ${
          statusMsg.type === "success" 
            ? "bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400"
            : "bg-destructive/10 border border-destructive/20 text-destructive"
        }`}>
          {statusMsg.type === "success" ? <CheckCircle2 className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
          <span>{statusMsg.text}</span>
        </div>
      )}

      {/* Main Form Sections */}
      <div className="space-y-8">
        
        {/* Basic Page Meta */}
        <div className="p-6 rounded-2xl bg-card border border-border/70 space-y-4 shadow-xs">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
            <FileText className="w-3.5 h-3.5 text-primary" />
            <span>General Page Attributes</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-foreground block">Admin Page Title</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-3.5 py-2 bg-background border border-border rounded-xl text-xs text-foreground focus:outline-none focus:border-primary transition-colors"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-medium text-foreground block">Page Subtitle / Tagline</label>
              <input
                type="text"
                value={subtitle}
                onChange={(e) => setSubtitle(e.target.value)}
                className="w-full px-3.5 py-2 bg-background border border-border rounded-xl text-xs text-foreground focus:outline-none focus:border-primary transition-colors"
              />
            </div>
          </div>
        </div>

        {/* Hero Banner & Background Image Controls */}
        <div className="p-6 rounded-2xl bg-card border border-border/70 space-y-4 shadow-xs">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
            <ImageIcon className="w-3.5 h-3.5 text-primary" />
            <span>Hero Banner &amp; Visual Settings</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-foreground block">Hero Badge Text</label>
              <input
                type="text"
                value={content.hero?.badge || ""}
                onChange={(e) => updateContent(["hero", "badge"], e.target.value)}
                placeholder="e.g. Legal & Compliance"
                className="w-full px-3.5 py-2 bg-background border border-border rounded-xl text-xs text-foreground focus:outline-none focus:border-primary"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-medium text-foreground block">Hero Title</label>
              <input
                type="text"
                value={content.hero?.title || content.hero?.headline || ""}
                onChange={(e) => {
                  if (page.slug === "home") {
                    updateContent(["hero", "headline"], e.target.value);
                  } else {
                    updateContent(["hero", "title"], e.target.value);
                  }
                }}
                placeholder="Main header headline"
                className="w-full px-3.5 py-2 bg-background border border-border rounded-xl text-xs text-foreground focus:outline-none focus:border-primary"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-medium text-foreground block">Hero Description Paragraph</label>
            <textarea
              rows={2}
              value={content.hero?.description || content.hero?.subheadline || ""}
              onChange={(e) => updateContent(["hero", "description"], e.target.value)}
              placeholder="Header descriptive text explaining the purpose of this page..."
              className="w-full px-3.5 py-2 bg-background border border-border rounded-xl text-xs text-foreground focus:outline-none focus:border-primary resize-none"
            />
          </div>

          {/* Hero Background Image Picker */}
          <ImagePickerField
            label="Hero / Page Header Background Image"
            value={content.hero?.backgroundImage || ""}
            onChange={(val) => updateContent(["hero", "backgroundImage"], val)}
          />
        </div>

        {/* Rich Content & Images Editor */}
        <div className="p-6 rounded-2xl bg-card border border-border/70 space-y-4 shadow-xs">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
            <FileText className="w-3.5 h-3.5 text-primary" />
            <span>Page Content &amp; Media</span>
          </h3>
          <RichTextEditor
            value={content.richBody || content.body || ""}
            onChange={(val) => updateContent(["richBody"], val)}
            placeholder="Write full formatted page body here... Use 'Add Image' to embed photos directly into the text."
            minHeight="350px"
          />
        </div>

        {/* 1. SECTIONS BUILDER (For Privacy Policy, Terms of Service, and Custom Pages) */}
        {content.sections && Array.isArray(content.sections) && (
          <div className="p-6 rounded-2xl bg-card border border-border/70 space-y-6 shadow-xs">
            <div className="flex items-center justify-between border-b border-border/60 pb-3">
              <div>
                <h3 className="text-base font-semibold text-foreground flex items-center gap-2">
                  <Layers className="w-4 h-4 text-primary" />
                  <span>Structured Editorial Sections ({content.sections.length})</span>
                </h3>
              </div>

              <button
                type="button"
                onClick={() => {
                  const newSection = {
                    id: `section-${content.sections.length + 1}`,
                    title: `${content.sections.length + 1}. New Policy Section`,
                    content: "Enter the detailed terms, guidelines, or operational specifications for this section.",
                    bullets: ["Key requirement or policy statement"]
                  };
                  updateContent(["sections"], [...content.sections, newSection]);
                }}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-primary text-primary-foreground text-xs font-semibold hover:bg-primary/90 transition-all cursor-pointer shadow-xs"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Section</span>
              </button>
            </div>

            <div className="space-y-6">
              {content.sections.map((sec: any, sIdx: number) => (
                <div key={sec.id || sIdx} className="p-5 rounded-2xl bg-muted/30 border border-border/70 space-y-4 relative group">
                  <div className="flex items-center justify-between gap-3 border-b border-border/50 pb-2.5">
                    <div className="flex items-center gap-2 w-full">
                      <span className="w-6 h-6 rounded-lg bg-foreground text-background font-mono text-[10px] font-bold flex items-center justify-center shrink-0">
                        {sIdx + 1}
                      </span>
                      <input
                        type="text"
                        value={sec.title || ""}
                        onChange={(e) => {
                          const list = [...content.sections];
                          list[sIdx].title = e.target.value;
                          updateContent(["sections"], list);
                        }}
                        placeholder="Section Heading"
                        className="w-full px-3 py-1 bg-background border border-border rounded-lg text-xs sm:text-sm font-semibold text-foreground focus:outline-none focus:border-primary"
                      />
                    </div>

                    <button
                      type="button"
                      onClick={() => {
                        if (confirm(`Delete section "${sec.title}"?`)) {
                          const list = content.sections.filter((_: any, i: number) => i !== sIdx);
                          updateContent(["sections"], list);
                        }
                      }}
                      className="text-muted-foreground hover:text-destructive p-1 rounded-lg transition-colors cursor-pointer shrink-0"
                      title="Delete section"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Section Content */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-foreground block">Section Body Paragraph</label>
                    <textarea
                      rows={3}
                      value={sec.content || ""}
                      onChange={(e) => {
                        const list = [...content.sections];
                        list[sIdx].content = e.target.value;
                        updateContent(["sections"], list);
                      }}
                      placeholder="Detailed narrative or terms paragraph..."
                      className="w-full px-3.5 py-2 bg-background border border-border rounded-xl text-xs sm:text-sm text-foreground focus:outline-none focus:border-primary resize-y"
                    />
                  </div>

                  {/* Optional Section Image */}
                  <ImagePickerField
                    label={`Section ${sIdx + 1} Featured Image (Optional)`}
                    value={sec.image || ""}
                    onChange={(val) => {
                      const list = [...content.sections];
                      list[sIdx].image = val;
                      updateContent(["sections"], list);
                    }}
                    description="Include a technical diagram, factory shot, or certificate preview inside this section."
                  />

                  {/* Bullets List */}
                  <div className="space-y-2 pt-1">
                    <div className="flex items-center justify-between">
                      <label className="text-xs font-medium text-foreground block">
                        Key Bullet Highlights ({sec.bullets?.length || 0})
                      </label>
                      <button
                        type="button"
                        onClick={() => {
                          const list = [...content.sections];
                          if (!list[sIdx].bullets) list[sIdx].bullets = [];
                          list[sIdx].bullets.push("New policy highlight");
                          updateContent(["sections"], list);
                        }}
                        className="text-[11px] text-primary hover:underline font-semibold cursor-pointer"
                      >
                        + Add Bullet
                      </button>
                    </div>

                    {sec.bullets && sec.bullets.map((bullet: string, bIdx: number) => (
                      <div key={bIdx} className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                        <input
                          type="text"
                          value={bullet}
                          onChange={(e) => {
                            const list = [...content.sections];
                            list[sIdx].bullets[bIdx] = e.target.value;
                            updateContent(["sections"], list);
                          }}
                          className="w-full px-3 py-1.5 bg-background border border-border rounded-lg text-xs text-foreground focus:outline-none focus:border-primary"
                        />
                        <button
                          type="button"
                          onClick={() => {
                            const list = [...content.sections];
                            list[sIdx].bullets = list[sIdx].bullets.filter((_: any, i: number) => i !== bIdx);
                            updateContent(["sections"], list);
                          }}
                          className="text-muted-foreground hover:text-destructive p-1 cursor-pointer"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 2. HOMEPAGE SPECIFIC SECTIONS */}
        {page.slug === "home" && (
          <>
            {/* About Teaser */}
            {content.aboutTeaser && (
              <div className="p-6 rounded-2xl bg-card border border-border/70 space-y-4 shadow-xs">
                <h3 className="font-semibold text-foreground border-b border-border/50 pb-2">
                  Homepage Philosophy Teaser
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-foreground block">Teaser Badge</label>
                    <input
                      type="text"
                      value={content.aboutTeaser.badge || ""}
                      onChange={(e) => updateContent(["aboutTeaser", "badge"], e.target.value)}
                      className="w-full px-3.5 py-2 bg-background border border-border rounded-xl text-xs text-foreground"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-foreground block">Teaser Title</label>
                    <input
                      type="text"
                      value={content.aboutTeaser.title || ""}
                      onChange={(e) => updateContent(["aboutTeaser", "title"], e.target.value)}
                      className="w-full px-3.5 py-2 bg-background border border-border rounded-xl text-xs text-foreground"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-foreground block">Lead Text</label>
                  <textarea
                    rows={2}
                    value={content.aboutTeaser.leadText || ""}
                    onChange={(e) => updateContent(["aboutTeaser", "leadText"], e.target.value)}
                    className="w-full px-3.5 py-2 bg-background border border-border rounded-xl text-xs text-foreground resize-none"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-foreground block">Body Paragraph</label>
                  <textarea
                    rows={3}
                    value={content.aboutTeaser.bodyText || ""}
                    onChange={(e) => updateContent(["aboutTeaser", "bodyText"], e.target.value)}
                    className="w-full px-3.5 py-2 bg-background border border-border rounded-xl text-xs text-foreground resize-none"
                  />
                </div>
              </div>
            )}

            {/* 12 Manufacturing Stages */}
            {content.twelveStages && (
              <div className="p-6 rounded-2xl bg-card border border-border/70 space-y-4 shadow-xs">
                <h3 className="font-semibold text-foreground border-b border-border/50 pb-2">
                  12 Manufacturing &amp; Quality Control Stages
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {content.twelveStages.map((stage: any, idx: number) => (
                    <div key={idx} className="p-4 rounded-xl bg-muted/40 border border-border/50 space-y-3">
                      <div className="flex items-center gap-2">
                        <span className="w-6 h-6 rounded-lg bg-foreground text-background text-[10px] font-mono font-bold flex items-center justify-center shrink-0">
                          {stage.num}
                        </span>
                        <input
                          type="text"
                          value={stage.title}
                          onChange={(e) => {
                            const newStages = [...content.twelveStages];
                            newStages[idx].title = e.target.value;
                            updateContent(["twelveStages"], newStages);
                          }}
                          className="w-full px-3 py-1 bg-background border border-border rounded-lg text-xs font-semibold text-foreground"
                        />
                      </div>

                      <textarea
                        rows={2}
                        value={stage.description}
                        onChange={(e) => {
                          const newStages = [...content.twelveStages];
                          newStages[idx].description = e.target.value;
                          updateContent(["twelveStages"], newStages);
                        }}
                        className="w-full px-3 py-1.5 bg-background border border-border rounded-lg text-xs text-foreground resize-none"
                      />

                      <ImagePickerField
                        label={`Stage ${stage.num} Photo`}
                        value={stage.image || ""}
                        onChange={(val) => {
                          const newStages = [...content.twelveStages];
                          newStages[idx].image = val;
                          updateContent(["twelveStages"], newStages);
                        }}
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </>
        )}

        {/* 3. ABOUT PAGE SPECIFIC SECTIONS */}
        {page.slug === "about" && (
          <>
            {/* Banking Partner */}
            {content.bankingPartner && (
              <div className="p-6 rounded-2xl bg-card border border-border/70 space-y-4 shadow-xs">
                <h3 className="font-semibold text-foreground border-b border-border/50 pb-2">
                  Official Banking Details
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-foreground block">Bank Name</label>
                    <input
                      type="text"
                      value={content.bankingPartner.bankName || ""}
                      onChange={(e) => updateContent(["bankingPartner", "bankName"], e.target.value)}
                      className="w-full px-3.5 py-2 bg-background border border-border rounded-xl text-xs text-foreground"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-foreground block">Branch</label>
                    <input
                      type="text"
                      value={content.bankingPartner.branch || ""}
                      onChange={(e) => updateContent(["bankingPartner", "branch"], e.target.value)}
                      className="w-full px-3.5 py-2 bg-background border border-border rounded-xl text-xs text-foreground"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-foreground block">Swift Code</label>
                    <input
                      type="text"
                      value={content.bankingPartner.swift || ""}
                      onChange={(e) => updateContent(["bankingPartner", "swift"], e.target.value)}
                      className="w-full px-3.5 py-2 bg-background border border-border rounded-xl text-xs text-foreground font-mono"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-foreground block">Branch Address</label>
                    <input
                      type="text"
                      value={content.bankingPartner.address || ""}
                      onChange={(e) => updateContent(["bankingPartner", "address"], e.target.value)}
                      className="w-full px-3.5 py-2 bg-background border border-border rounded-xl text-xs text-foreground"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-foreground block">Telephone</label>
                    <input
                      type="text"
                      value={content.bankingPartner.tel || ""}
                      onChange={(e) => updateContent(["bankingPartner", "tel"], e.target.value)}
                      className="w-full px-3.5 py-2 bg-background border border-border rounded-xl text-xs text-foreground"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-foreground block">Fax</label>
                    <input
                      type="text"
                      value={content.bankingPartner.fax || ""}
                      onChange={(e) => updateContent(["bankingPartner", "fax"], e.target.value)}
                      className="w-full px-3.5 py-2 bg-background border border-border rounded-xl text-xs text-foreground"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-foreground block">Official Email</label>
                    <input
                      type="text"
                      value={content.bankingPartner.email || ""}
                      onChange={(e) => updateContent(["bankingPartner", "email"], e.target.value)}
                      className="w-full px-3.5 py-2 bg-background border border-border rounded-xl text-xs text-foreground"
                    />
                  </div>
                </div>

                <ImagePickerField
                  label="Official Bank Logo"
                  value={content.bankingPartner.logoUrl || ""}
                  onChange={(val) => updateContent(["bankingPartner", "logoUrl"], val)}
                />
              </div>
            )}
          </>
        )}

        {/* 4. SERVICES PAGE SPECIFIC SECTIONS */}
        {page.slug === "services" && content.disciplines && (
          <div className="p-6 rounded-2xl bg-card border border-border/70 space-y-4 shadow-xs">
            <h3 className="font-semibold text-foreground border-b border-border/50 pb-2">
              9 Operational Disciplines (Full Service Scope)
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {content.disciplines.map((d: any, idx: number) => (
                <div key={idx} className="p-4 rounded-xl bg-muted/40 border border-border/50 space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-lg bg-foreground text-background text-[10px] font-mono font-bold flex items-center justify-center shrink-0">
                      {d.step}
                    </span>
                    <input
                      type="text"
                      value={d.title}
                      onChange={(e) => {
                        const newDisciplines = [...content.disciplines];
                        newDisciplines[idx].title = e.target.value;
                        updateContent(["disciplines"], newDisciplines);
                      }}
                      className="w-full px-3 py-1 bg-background border border-border rounded-lg text-xs font-semibold text-foreground"
                    />
                  </div>
                  <textarea
                    rows={2}
                    value={d.desc}
                    onChange={(e) => {
                      const newDisciplines = [...content.disciplines];
                      newDisciplines[idx].desc = e.target.value;
                      updateContent(["disciplines"], newDisciplines);
                    }}
                    className="w-full px-3 py-1.5 bg-background border border-border rounded-lg text-xs text-foreground resize-none"
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 5. AWARDS PAGE SPECIFIC SECTIONS */}
        {page.slug === "awards" && content.awardsList && (
          <div className="p-6 rounded-2xl bg-card border border-border/70 space-y-4 shadow-xs">
            <div className="flex items-center justify-between border-b border-border/50 pb-2">
              <h3 className="font-semibold text-foreground">
                Certifications &amp; Compliance Standards List
              </h3>
              <button
                type="button"
                onClick={() => {
                  updateContent(["awardsList"], [...content.awardsList, "New Certification"]);
                }}
                className="text-xs font-semibold text-foreground hover:underline cursor-pointer"
              >
                + Add Certification
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {content.awardsList.map((award: string, idx: number) => (
                <div key={idx} className="flex items-center gap-2">
                  <input
                    type="text"
                    value={award}
                    onChange={(e) => {
                      const list = [...content.awardsList];
                      list[idx] = e.target.value;
                      updateContent(["awardsList"], list);
                    }}
                    className="w-full px-3.5 py-2 bg-background border border-border rounded-xl text-xs text-foreground"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      const list = content.awardsList.filter((_: any, i: number) => i !== idx);
                      updateContent(["awardsList"], list);
                    }}
                    className="text-red-500 hover:text-red-600 px-2 py-1 text-xs cursor-pointer"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 6. CONTACT PAGE SPECIFIC SECTIONS */}
        {page.slug === "contact" && content.inboxes && (
          <div className="p-6 rounded-2xl bg-card border border-border/70 space-y-4 shadow-xs">
            <h3 className="font-semibold text-foreground border-b border-border/50 pb-2">
              Direct Merchandising Email Inboxes
            </h3>

            <div className="space-y-3">
              {content.inboxes.map((inbox: any, idx: number) => (
                <div key={idx} className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <input
                    type="text"
                    value={inbox.label}
                    onChange={(e) => {
                      const list = [...content.inboxes];
                      list[idx].label = e.target.value;
                      updateContent(["inboxes"], list);
                    }}
                    placeholder="Inbox Label"
                    className="px-3.5 py-2 bg-background border border-border rounded-xl text-xs text-foreground"
                  />
                  <input
                    type="email"
                    value={inbox.email}
                    onChange={(e) => {
                      const list = [...content.inboxes];
                      list[idx].email = e.target.value;
                      updateContent(["inboxes"], list);
                    }}
                    placeholder="email@example.com"
                    className="px-3.5 py-2 bg-background border border-border rounded-xl text-xs text-foreground"
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* SEO Metadata Box with Google Preview */}
        <div className="p-6 rounded-2xl bg-card border border-border/70 space-y-4 shadow-xs">
          <div className="border-b border-border/50 pb-2">
            <h3 className="font-semibold text-foreground flex items-center gap-2">
              <Globe className="w-4 h-4 text-primary" />
              <span>Search Engine Optimization (SEO) &amp; Social Previews</span>
            </h3>
          </div>

          <div className="space-y-4">
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="text-xs font-medium text-foreground block">Meta SEO Title</label>
                <span className={`text-[10px] ${seoTitle.length > 60 ? "text-amber-500" : "text-muted-foreground"}`}>
                  {seoTitle.length} / 60 characters
                </span>
              </div>
              <input
                type="text"
                value={seoTitle}
                onChange={(e) => setSeoTitle(e.target.value)}
                placeholder="Page Title | Nisha Fashions Wear"
                className="w-full px-3.5 py-2 bg-background border border-border rounded-xl text-xs text-foreground focus:outline-none focus:border-primary"
              />
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="text-xs font-medium text-foreground block">Meta Description</label>
                <span className={`text-[10px] ${seoDescription.length > 160 ? "text-amber-500" : "text-muted-foreground"}`}>
                  {seoDescription.length} / 160 characters
                </span>
              </div>
              <textarea
                rows={3}
                value={seoDescription}
                onChange={(e) => setSeoDescription(e.target.value)}
                placeholder="Short summary for search engines (approx 150-160 characters)..."
                className="w-full px-3.5 py-2 bg-background border border-border rounded-xl text-xs text-foreground focus:outline-none focus:border-primary resize-none"
              />
            </div>

            {/* Live Search Snippet Mockup */}
            <div className="p-4 rounded-xl bg-muted/40 border border-border/60 space-y-1">
              <span className="text-[10px] uppercase font-bold text-muted-foreground tracking-wider block">
                Google Search Result Preview:
              </span>
              <p className="text-blue-600 dark:text-blue-400 font-medium text-sm hover:underline cursor-pointer truncate">
                {seoTitle || `${title} | Nisha Fashions Wear`}
              </p>
              <p className="text-emerald-700 dark:text-emerald-500 text-[11px] font-mono truncate">
                https://nishafashions.com/{page.slug === "home" ? "" : page.slug}
              </p>
              <p className="text-xs text-muted-foreground line-clamp-2">
                {seoDescription || subtitle || "Discover apparel manufacturing and sourcing capabilities at Nisha Fashions Wear."}
              </p>
            </div>
          </div>
        </div>

        {/* Advanced JSON View Accordion */}
        <div className="p-4 rounded-xl bg-card border border-border/60">
          <button
            type="button"
            onClick={() => setShowRawJson(!showRawJson)}
            className="flex items-center justify-between w-full text-xs font-medium text-muted-foreground hover:text-foreground cursor-pointer"
          >
            <div className="flex items-center gap-2">
              <Code2 className="w-3.5 h-3.5 text-primary" />
              <span>Advanced: Raw JSON Configuration</span>
            </div>
            {showRawJson ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>

          {showRawJson && (
            <div className="mt-3 pt-3 border-t border-border/50 space-y-2">
              <p className="text-[11px] text-muted-foreground">
                Direct view of the underlying page structure stored in database.
              </p>
              <pre className="p-3 bg-muted/70 rounded-xl text-[11px] font-mono text-foreground overflow-x-auto max-h-60">
                {JSON.stringify(content, null, 2)}
              </pre>
            </div>
          )}
        </div>

        {/* Bottom Save Bar */}
        <div className="flex items-center justify-end gap-3 pt-4 border-t border-border/80">
          <button
            type="submit"
            disabled={saving}
            className="px-6 py-3 rounded-xl bg-primary text-primary-foreground font-semibold text-xs uppercase tracking-wider hover:bg-primary/90 transition-all flex items-center gap-2 shadow-xs cursor-pointer disabled:opacity-50 active:scale-95"
          >
            <Save className="w-4 h-4" />
            <span>{saving ? "Saving Changes..." : "Save & Update Live Page"}</span>
          </button>
        </div>

      </div>
    </form>
  );
}

export default PageEditorClient;
