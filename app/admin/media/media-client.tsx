"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Upload,
  Copy,
  Check,
  Loader2,
  Database,
  FolderOpen,
  Images,
  RefreshCw,
} from "lucide-react";

interface MediaItem {
  id: string | number;
  filename: string;
  file_url: string;
  mime_type: string;
  file_size: number;
  alt_text: string;
  source?: string;
  created_at: string | null;
}

interface AllMedia {
  db: MediaItem[];
  static: MediaItem[];
  orphaned: MediaItem[];
}

export function MediaClient({ mediaItems }: { mediaItems: any[] }) {
  const router = useRouter();
  const [copiedUrl, setCopiedUrl] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);

  // All-media state (from the combined API)
  const [allMedia, setAllMedia] = useState<AllMedia | null>(null);
  const [loadingAll, setLoadingAll] = useState(true);
  const [activeTab, setActiveTab] = useState<"all" | "uploaded" | "static">("all");

  const fetchAllMedia = async () => {
    setLoadingAll(true);
    try {
      const res = await fetch("/api/media/list");
      if (res.ok) {
        const data = await res.json();
        setAllMedia(data);
      }
    } catch {
      // fallback to mediaItems prop
    } finally {
      setLoadingAll(false);
    }
  };

  useEffect(() => {
    fetchAllMedia();
  }, []);

  const handleCopy = (url: string) => {
    navigator.clipboard.writeText(url);
    setCopiedUrl(url);
    setTimeout(() => setCopiedUrl(null), 2000);
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setUploadError(null);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (res.ok && data.success) {
        await fetchAllMedia();
        router.refresh();
      } else {
        setUploadError(data.error || "Upload failed");
      }
    } catch (err: any) {
      setUploadError(err.message || "Upload failed");
    } finally {
      setUploading(false);
      e.target.value = "";
    }
  };

  // Compute display items from tab
  const getDisplayItems = (): MediaItem[] => {
    if (!allMedia) return mediaItems;
    const combined = [...allMedia.db, ...allMedia.orphaned, ...allMedia.static];
    if (activeTab === "all") return combined;
    if (activeTab === "uploaded") return [...allMedia.db, ...allMedia.orphaned];
    if (activeTab === "static") return allMedia.static;
    return combined;
  };

  const displayItems = getDisplayItems();
  const dbCount = allMedia ? allMedia.db.length + allMedia.orphaned.length : 0;
  const staticCount = allMedia ? allMedia.static.length : 0;
  const totalCount = dbCount + staticCount;

  const tabs = [
    { id: "all" as const, label: "All Media", count: totalCount },
    { id: "uploaded" as const, label: "Uploaded", count: dbCount },
    { id: "static" as const, label: "Site Assets", count: staticCount },
  ];

  return (
    <div className="space-y-6">
      {/* Upload Dropzone */}
      <div className="p-8 rounded-3xl bg-card border-2 border-dashed border-border hover:border-foreground/40 transition-colors text-center space-y-3 relative">
        <input
          type="file"
          accept="image/jpeg,image/png,image/webp,image/avif,image/svg+xml"
          onChange={handleFileUpload}
          disabled={uploading}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed"
        />

        <div className="w-12 h-12 rounded-2xl bg-muted flex items-center justify-center mx-auto text-muted-foreground">
          {uploading ? (
            <Loader2 className="w-6 h-6 animate-spin" />
          ) : (
            <Upload className="w-6 h-6" />
          )}
        </div>

        <div>
          <h3 className="text-sm font-semibold text-foreground">
            {uploading ? "Uploading Image..." : "Upload New Image"}
          </h3>
          <p className="text-xs text-muted-foreground mt-1">
            Drop an image or click to browse — JPG, PNG, WebP, AVIF, SVG
          </p>
        </div>

        {uploadError && (
          <p className="text-xs text-red-500 font-medium">{uploadError}</p>
        )}
      </div>

      {/* Tabs + Refresh */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div className="flex items-center gap-1 bg-muted/40 p-1 rounded-xl border border-border/60">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                activeTab === tab.id
                  ? "bg-foreground text-background shadow-xs"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {tab.label}
              <span className={`ml-1.5 text-[10px] font-bold ${activeTab === tab.id ? "opacity-70" : "opacity-50"}`}>
                ({tab.count})
              </span>
            </button>
          ))}
        </div>

        <button
          onClick={fetchAllMedia}
          disabled={loadingAll}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-border text-xs text-muted-foreground hover:text-foreground hover:bg-muted transition-all cursor-pointer disabled:opacity-50"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${loadingAll ? "animate-spin" : ""}`} />
          Refresh
        </button>
      </div>

      {/* Gallery Grid */}
      {loadingAll ? (
        <div className="py-16 flex items-center justify-center gap-2 text-muted-foreground text-sm">
          <Loader2 className="w-5 h-5 animate-spin" />
          <span>Loading media library...</span>
        </div>
      ) : displayItems.length === 0 ? (
        <div className="p-12 text-center rounded-2xl bg-card border border-border/70 text-xs text-muted-foreground">
          No images found. Upload one above to get started.
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
          {displayItems.map((item) => {
            const isStatic = item.source === "static";
            return (
              <div
                key={String(item.id)}
                className="group rounded-2xl bg-card border border-border/70 overflow-hidden shadow-xs hover:border-foreground/30 hover:shadow-md transition-all flex flex-col"
              >
                {/* Thumbnail */}
                <div className="relative aspect-square w-full bg-muted/40 overflow-hidden">
                  <img
                    src={item.file_url}
                    alt={item.alt_text || item.filename}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  {/* Source badge */}
                  <div className="absolute top-1.5 left-1.5">
                    {isStatic ? (
                      <span className="px-1.5 py-0.5 rounded-md text-[9px] font-bold bg-blue-500/80 text-white backdrop-blur-sm flex items-center gap-0.5">
                        <FolderOpen className="w-2.5 h-2.5" />
                        Asset
                      </span>
                    ) : (
                      <span className="px-1.5 py-0.5 rounded-md text-[9px] font-bold bg-emerald-500/80 text-white backdrop-blur-sm flex items-center gap-0.5">
                        <Database className="w-2.5 h-2.5" />
                        Upload
                      </span>
                    )}
                  </div>
                </div>

                {/* Info + Copy */}
                <div className="p-2.5 space-y-1.5 flex-1 flex flex-col justify-between">
                  <div>
                    <p
                      className="text-[10px] font-medium text-foreground truncate leading-tight"
                      title={item.filename}
                    >
                      {item.filename}
                    </p>
                    {item.file_size > 0 && (
                      <p className="text-[9px] text-muted-foreground">
                        {(item.file_size / 1024).toFixed(1)} KB
                      </p>
                    )}
                  </div>

                  <button
                    onClick={() => handleCopy(item.file_url)}
                    className="w-full py-1.5 px-2 rounded-lg bg-muted hover:bg-foreground hover:text-background text-[10px] font-semibold transition-colors flex items-center justify-center gap-1 cursor-pointer"
                  >
                    {copiedUrl === item.file_url ? (
                      <>
                        <Check className="w-3 h-3 text-emerald-500" />
                        <span>Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3 h-3" />
                        <span>Copy URL</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
