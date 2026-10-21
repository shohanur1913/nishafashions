"use client";

import { useState, useRef } from "react";
import { 
  Bold, 
  Italic, 
  Heading1, 
  Heading2, 
  Heading3, 
  List, 
  ListOrdered, 
  Quote, 
  Link as LinkIcon, 
  Image as ImageIcon, 
  Code, 
  Eye, 
  Edit3, 
  Columns, 
  Minus, 
  X,
  Check,
  ChevronDown
} from "lucide-react";

export const AVAILABLE_IMAGE_PRESETS = [
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

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  minHeight?: string;
  label?: string;
}

export function RichTextEditor({
  value,
  onChange,
  placeholder = "Write your page content here... Supports headings, lists, quotes, and images.",
  minHeight = "320px",
  label
}: RichTextEditorProps) {
  const [viewMode, setViewMode] = useState<"write" | "preview" | "split">("write");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Image Insert Modal State
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [imageAlt, setImageAlt] = useState("");
  const [imageCaption, setImageCaption] = useState("");
  const [showPresets, setShowPresets] = useState(false);

  // Link Insert Modal State
  const [isLinkModalOpen, setIsLinkModalOpen] = useState(false);
  const [linkUrl, setLinkUrl] = useState("");
  const [linkText, setLinkText] = useState("");

  // Helper to insert markdown text around or at selection
  const insertFormatting = (prefix: string, suffix: string = "", defaultText: string = "") => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = value.substring(start, end) || defaultText;
    const replacement = `${prefix}${selectedText}${suffix}`;

    const updated = value.substring(0, start) + replacement + value.substring(end);
    onChange(updated);

    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(
        start + prefix.length,
        start + prefix.length + selectedText.length
      );
    }, 10);
  };

  const insertLinePrefix = (prefix: string) => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const lineStart = value.lastIndexOf("\n", start - 1) + 1;
    const updated = value.substring(0, lineStart) + prefix + value.substring(lineStart);
    onChange(updated);

    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + prefix.length, start + prefix.length);
    }, 10);
  };

  const handleInsertImage = () => {
    if (!imageUrl.trim()) return;

    const alt = imageAlt.trim() || "Illustration";
    const caption = imageCaption.trim();
    let markup = `\n\n![${alt}](${imageUrl.trim()})\n`;
    if (caption) {
      markup += `*${caption}*\n\n`;
    } else {
      markup += "\n";
    }

    const textarea = textareaRef.current;
    if (textarea) {
      const start = textarea.selectionStart;
      const updated = value.substring(0, start) + markup + value.substring(start);
      onChange(updated);
    } else {
      onChange(value + markup);
    }

    setImageUrl("");
    setImageAlt("");
    setImageCaption("");
    setIsImageModalOpen(false);
    setShowPresets(false);
  };

  const handleInsertLink = () => {
    if (!linkUrl.trim()) return;
    const text = linkText.trim() || linkUrl.trim();
    insertFormatting(`[${text}](`, `)`, "");
    setLinkUrl("");
    setLinkText("");
    setIsLinkModalOpen(false);
  };

  // Simple Markdown Renderer for Preview
  const renderPreview = (content: string) => {
    if (!content.trim()) {
      return (
        <div className="text-muted-foreground italic text-xs py-12 text-center">
          No content written yet. Switch to Edit mode to start writing.
        </div>
      );
    }

    // Split by double line breaks to form paragraphs / blocks
    const lines = content.split("\n");
    const elements: React.ReactNode[] = [];

    let currentList: string[] = [];
    let isNumbered = false;

    const flushList = (key: number) => {
      if (currentList.length > 0) {
        if (isNumbered) {
          elements.push(
            <ol key={`ol-${key}`} className="list-decimal pl-5 space-y-1 my-3 text-xs sm:text-sm text-foreground/90">
              {currentList.map((item, idx) => (
                <li key={idx} dangerouslySetInnerHTML={{ __html: formatInline(item) }} />
              ))}
            </ol>
          );
        } else {
          elements.push(
            <ul key={`ul-${key}`} className="list-disc pl-5 space-y-1 my-3 text-xs sm:text-sm text-foreground/90">
              {currentList.map((item, idx) => (
                <li key={idx} dangerouslySetInnerHTML={{ __html: formatInline(item) }} />
              ))}
            </ul>
          );
        }
        currentList = [];
      }
    };

    const formatInline = (text: string) => {
      return text
        .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
        .replace(/\*(.*?)\*/g, "<em>$1</em>")
        .replace(/`([^`]+)`/g, "<code class='bg-muted px-1.5 py-0.5 rounded text-primary font-mono text-[11px]'>$1</code>")
        .replace(/\[([^\]]+)\]\(([^)]+)\)/g, "<a href='$2' target='_blank' rel='noopener noreferrer' class='text-primary hover:underline font-medium'>$1</a>");
    };

    lines.forEach((rawLine, index) => {
      const line = rawLine.trim();

      // Check for image: ![alt](url)
      const imgMatch = line.match(/^!\[(.*?)\]\((.*?)\)$/);
      if (imgMatch) {
        flushList(index);
        const alt = imgMatch[1];
        const src = imgMatch[2];
        elements.push(
          <figure key={`img-${index}`} className="my-5 rounded-xl overflow-hidden bg-muted/40 border border-border p-2">
            <img src={src} alt={alt} className="w-full h-auto max-h-96 object-cover rounded-lg mx-auto" />
            {alt && <figcaption className="text-center text-[11px] text-muted-foreground mt-2">{alt}</figcaption>}
          </figure>
        );
        return;
      }

      // Headings
      if (line.startsWith("### ")) {
        flushList(index);
        elements.push(
          <h3 key={index} className="text-base sm:text-lg font-semibold text-foreground mt-5 mb-2">
            {line.replace("### ", "")}
          </h3>
        );
        return;
      }

      if (line.startsWith("## ")) {
        flushList(index);
        elements.push(
          <h2 key={index} className="text-lg sm:text-xl font-semibold text-foreground mt-6 mb-2 border-b border-border/40 pb-1">
            {line.replace("## ", "")}
          </h2>
        );
        return;
      }

      if (line.startsWith("# ")) {
        flushList(index);
        elements.push(
          <h1 key={index} className="text-xl sm:text-2xl font-bold text-foreground mt-6 mb-3">
            {line.replace("# ", "")}
          </h1>
        );
        return;
      }

      // Blockquote
      if (line.startsWith("> ")) {
        flushList(index);
        elements.push(
          <blockquote key={index} className="border-l-4 border-primary pl-4 py-1 my-3 bg-primary/5 rounded-r-lg text-xs sm:text-sm text-foreground/80 italic">
            <span dangerouslySetInnerHTML={{ __html: formatInline(line.replace("> ", "")) }} />
          </blockquote>
        );
        return;
      }

      // Bullet List
      if (line.startsWith("- ") || line.startsWith("* ")) {
        if (isNumbered && currentList.length > 0) flushList(index);
        isNumbered = false;
        currentList.push(line.substring(2));
        return;
      }

      // Numbered List
      const numMatch = line.match(/^\d+\.\s+(.*)/);
      if (numMatch) {
        if (!isNumbered && currentList.length > 0) flushList(index);
        isNumbered = true;
        currentList.push(numMatch[1]);
        return;
      }

      // Divider
      if (line === "---" || line === "***") {
        flushList(index);
        elements.push(<hr key={index} className="my-5 border-border/60" />);
        return;
      }

      // Normal paragraph
      if (line.length > 0) {
        flushList(index);
        elements.push(
          <p 
            key={index} 
            className="text-xs sm:text-sm text-foreground/85 leading-relaxed my-2"
            dangerouslySetInnerHTML={{ __html: formatInline(line) }} 
          />
        );
      } else {
        flushList(index);
      }
    });

    flushList(9999);
    return elements;
  };

  return (
    <div className="space-y-2 w-full">
      {label && (
        <div className="flex items-center justify-between">
          <label className="text-xs font-semibold uppercase tracking-wider text-foreground block">
            {label}
          </label>
        </div>
      )}

      {/* Editor Main Container */}
      <div className="rounded-xl border border-border bg-card overflow-hidden shadow-xs">
        
        {/* Toolbar Header */}
        <div className="flex flex-wrap items-center justify-between gap-1 p-2 bg-muted/50 border-b border-border">
          
          {/* Format Action Buttons */}
          <div className="flex items-center flex-wrap gap-1">
            <button
              type="button"
              onClick={() => insertFormatting("**", "**", "Bold Text")}
              title="Bold (Ctrl+B)"
              className="p-1.5 rounded-lg hover:bg-muted text-foreground transition-colors cursor-pointer"
            >
              <Bold className="w-3.5 h-3.5" />
            </button>

            <button
              type="button"
              onClick={() => insertFormatting("*", "*", "Italic Text")}
              title="Italic (Ctrl+I)"
              className="p-1.5 rounded-lg hover:bg-muted text-foreground transition-colors cursor-pointer"
            >
              <Italic className="w-3.5 h-3.5" />
            </button>

            <div className="h-4 w-px bg-border/80 mx-1" />

            <button
              type="button"
              onClick={() => insertLinePrefix("# ")}
              title="Heading 1"
              className="p-1.5 rounded-lg hover:bg-muted text-foreground transition-colors cursor-pointer"
            >
              <Heading1 className="w-3.5 h-3.5" />
            </button>

            <button
              type="button"
              onClick={() => insertLinePrefix("## ")}
              title="Heading 2"
              className="p-1.5 rounded-lg hover:bg-muted text-foreground transition-colors cursor-pointer"
            >
              <Heading2 className="w-3.5 h-3.5" />
            </button>

            <button
              type="button"
              onClick={() => insertLinePrefix("### ")}
              title="Heading 3"
              className="p-1.5 rounded-lg hover:bg-muted text-foreground transition-colors cursor-pointer"
            >
              <Heading3 className="w-3.5 h-3.5" />
            </button>

            <div className="h-4 w-px bg-border/80 mx-1" />

            <button
              type="button"
              onClick={() => insertLinePrefix("- ")}
              title="Bullet List"
              className="p-1.5 rounded-lg hover:bg-muted text-foreground transition-colors cursor-pointer"
            >
              <List className="w-3.5 h-3.5" />
            </button>

            <button
              type="button"
              onClick={() => insertLinePrefix("1. ")}
              title="Numbered List"
              className="p-1.5 rounded-lg hover:bg-muted text-foreground transition-colors cursor-pointer"
            >
              <ListOrdered className="w-3.5 h-3.5" />
            </button>

            <button
              type="button"
              onClick={() => insertLinePrefix("> ")}
              title="Quote"
              className="p-1.5 rounded-lg hover:bg-muted text-foreground transition-colors cursor-pointer"
            >
              <Quote className="w-3.5 h-3.5" />
            </button>

            <button
              type="button"
              onClick={() => insertFormatting("`", "`", "code")}
              title="Inline Code"
              className="p-1.5 rounded-lg hover:bg-muted text-foreground transition-colors cursor-pointer"
            >
              <Code className="w-3.5 h-3.5" />
            </button>

            <button
              type="button"
              onClick={() => insertLinePrefix("---\n")}
              title="Horizontal Rule"
              className="p-1.5 rounded-lg hover:bg-muted text-foreground transition-colors cursor-pointer"
            >
              <Minus className="w-3.5 h-3.5" />
            </button>

            <div className="h-4 w-px bg-border/80 mx-1" />

            {/* Link Button */}
            <button
              type="button"
              onClick={() => setIsLinkModalOpen(true)}
              title="Insert Link"
              className="p-1.5 rounded-lg hover:bg-muted text-foreground transition-colors cursor-pointer"
            >
              <LinkIcon className="w-3.5 h-3.5" />
            </button>

            {/* Prominent Image Insert Button */}
            <button
              type="button"
              onClick={() => setIsImageModalOpen(true)}
              title="Insert Image"
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-primary/10 hover:bg-primary/20 text-primary text-xs font-semibold transition-colors cursor-pointer"
            >
              <ImageIcon className="w-3.5 h-3.5" />
              <span>Add Image</span>
            </button>
          </div>

          {/* View Mode Switcher */}
          <div className="flex items-center gap-1 bg-background border border-border/80 rounded-lg p-0.5 text-xs">
            <button
              type="button"
              onClick={() => setViewMode("write")}
              className={`px-2 py-1 rounded-md text-[11px] font-medium transition-colors cursor-pointer flex items-center gap-1 ${
                viewMode === "write" ? "bg-muted text-foreground font-semibold" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <Edit3 className="w-3 h-3" />
              <span>Edit</span>
            </button>
            <button
              type="button"
              onClick={() => setViewMode("preview")}
              className={`px-2 py-1 rounded-md text-[11px] font-medium transition-colors cursor-pointer flex items-center gap-1 ${
                viewMode === "preview" ? "bg-muted text-foreground font-semibold" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <Eye className="w-3 h-3" />
              <span>Preview</span>
            </button>
            <button
              type="button"
              onClick={() => setViewMode("split")}
              className={`px-2 py-1 rounded-md text-[11px] font-medium transition-colors cursor-pointer hidden md:flex items-center gap-1 ${
                viewMode === "split" ? "bg-muted text-foreground font-semibold" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <Columns className="w-3 h-3" />
              <span>Split</span>
            </button>
          </div>
        </div>

        {/* Editor Body Area */}
        <div className="relative">
          {viewMode === "write" && (
            <textarea
              ref={textareaRef}
              value={value}
              onChange={(e) => onChange(e.target.value)}
              placeholder={placeholder}
              style={{ minHeight }}
              className="w-full p-4 bg-background text-foreground text-xs sm:text-sm font-mono leading-relaxed outline-none resize-y placeholder:text-muted-foreground"
            />
          )}

          {viewMode === "preview" && (
            <div 
              style={{ minHeight }}
              className="w-full p-4 bg-background overflow-y-auto max-h-[600px]"
            >
              {renderPreview(value)}
            </div>
          )}

          {viewMode === "split" && (
            <div className="grid grid-cols-2 divide-x divide-border">
              <textarea
                ref={textareaRef}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder={placeholder}
                style={{ minHeight }}
                className="w-full p-4 bg-background text-foreground text-xs font-mono leading-relaxed outline-none resize-none placeholder:text-muted-foreground"
              />
              <div 
                style={{ minHeight }}
                className="w-full p-4 bg-muted/20 overflow-y-auto max-h-[600px]"
              >
                {renderPreview(value)}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Insert Image Modal */}
      {isImageModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4 animate-in fade-in duration-150">
          <div className="w-full max-w-lg bg-card border border-border rounded-2xl p-5 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-border pb-3">
              <div className="flex items-center gap-2">
                <ImageIcon className="w-4 h-4 text-primary" />
                <h3 className="text-sm font-semibold text-foreground">Insert Image</h3>
              </div>
              <button
                type="button"
                onClick={() => setIsImageModalOpen(false)}
                className="text-muted-foreground hover:text-foreground"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Preset Picker Dropdown Toggle */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-xs font-semibold text-foreground">Image Source URL *</label>
                <button
                  type="button"
                  onClick={() => setShowPresets(!showPresets)}
                  className="text-xs text-primary hover:underline flex items-center gap-1 font-medium cursor-pointer"
                >
                  <span>{showPresets ? "Hide Library" : "Select from Site Media Library"}</span>
                  <ChevronDown className={`w-3 h-3 transition-transform ${showPresets ? "rotate-180" : ""}`} />
                </button>
              </div>

              {showPresets && (
                <div className="p-2.5 rounded-xl bg-muted/50 border border-border/80 space-y-2 max-h-48 overflow-y-auto">
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {AVAILABLE_IMAGE_PRESETS.map((preset, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => {
                          setImageUrl(preset.src);
                          setImageAlt(preset.label);
                          setShowPresets(false);
                        }}
                        className={`p-1.5 rounded-lg border text-left cursor-pointer transition-all flex flex-col items-center gap-1 group ${
                          imageUrl === preset.src
                            ? "border-primary bg-primary/10 ring-1 ring-primary"
                            : "border-border/60 bg-background hover:border-primary/50"
                        }`}
                      >
                        <div className="w-full h-12 rounded overflow-hidden bg-muted relative">
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

              <input
                type="text"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                placeholder="/images/hero-apparel.png or https://example.com/photo.jpg"
                className="w-full px-3 py-2 bg-background border border-border rounded-xl text-xs font-mono text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary"
              />
            </div>

            {/* Alt Text and Caption */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-foreground">Alt Description</label>
                <input
                  type="text"
                  value={imageAlt}
                  onChange={(e) => setImageAlt(e.target.value)}
                  placeholder="e.g. Sewing line quality inspection"
                  className="w-full px-3 py-2 bg-background border border-border rounded-xl text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-semibold text-foreground">Caption (Optional)</label>
                <input
                  type="text"
                  value={imageCaption}
                  onChange={(e) => setImageCaption(e.target.value)}
                  placeholder="e.g. Fig 1.2: Modern assembly plant"
                  className="w-full px-3 py-2 bg-background border border-border rounded-xl text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary"
                />
              </div>
            </div>

            {/* Preview Image if URL is valid */}
            {imageUrl && (
              <div className="p-2 rounded-xl bg-muted/40 border border-border flex items-center gap-3">
                <img src={imageUrl} alt={imageAlt || "Preview"} className="w-16 h-12 object-cover rounded-lg border border-border" />
                <div className="text-xs">
                  <p className="font-medium text-foreground line-clamp-1">{imageAlt || "Image ready to insert"}</p>
                  <p className="font-mono text-[10px] text-muted-foreground line-clamp-1">{imageUrl}</p>
                </div>
              </div>
            )}

            <div className="pt-2 border-t border-border flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={() => setIsImageModalOpen(false)}
                className="px-4 py-2 rounded-xl border border-border text-xs font-medium hover:bg-muted transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleInsertImage}
                disabled={!imageUrl.trim()}
                className="px-4 py-2 rounded-xl bg-primary text-primary-foreground text-xs font-semibold hover:bg-primary/90 transition-colors disabled:opacity-40 cursor-pointer"
              >
                Insert Image into Content
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Insert Link Modal */}
      {isLinkModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4 animate-in fade-in duration-150">
          <div className="w-full max-w-md bg-card border border-border rounded-2xl p-5 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-border pb-3">
              <div className="flex items-center gap-2">
                <LinkIcon className="w-4 h-4 text-primary" />
                <h3 className="text-sm font-semibold text-foreground">Insert Link</h3>
              </div>
              <button
                type="button"
                onClick={() => setIsLinkModalOpen(false)}
                className="text-muted-foreground hover:text-foreground"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-foreground">Display Text</label>
                <input
                  type="text"
                  value={linkText}
                  onChange={(e) => setLinkText(e.target.value)}
                  placeholder="e.g. Quality Assurance Guidelines"
                  className="w-full px-3 py-2 bg-background border border-border rounded-xl text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-foreground">Target URL *</label>
                <input
                  type="text"
                  value={linkUrl}
                  onChange={(e) => setLinkUrl(e.target.value)}
                  placeholder="https://... or /services"
                  className="w-full px-3 py-2 bg-background border border-border rounded-xl text-xs font-mono text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary"
                />
              </div>
            </div>

            <div className="pt-2 border-t border-border flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={() => setIsLinkModalOpen(false)}
                className="px-4 py-2 rounded-xl border border-border text-xs font-medium hover:bg-muted transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleInsertLink}
                disabled={!linkUrl.trim()}
                className="px-4 py-2 rounded-xl bg-primary text-primary-foreground text-xs font-semibold hover:bg-primary/90 transition-colors disabled:opacity-40 cursor-pointer"
              >
                Insert Link
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

export default RichTextEditor;
