"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Upload, Copy, Check, Image as ImageIcon, Trash2 } from "lucide-react";

interface MediaClientProps {
  mediaItems: any[];
}

export function MediaClient({ mediaItems }: MediaClientProps) {
  const router = useRouter();
  const [copiedUrl, setCopiedUrl] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);

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
          <Upload className={`w-6 h-6 ${uploading ? "animate-bounce" : ""}`} />
        </div>

        <div>
          <h3 className="text-sm font-semibold text-foreground">
            {uploading ? "Uploading Image..." : "Upload New Website Image"}
          </h3>
        </div>

        {uploadError && (
          <p className="text-xs text-red-500 font-medium">{uploadError}</p>
        )}
      </div>

      {/* Gallery */}
      <div className="space-y-3">
        <h3 className="text-base font-semibold text-foreground">
          Uploaded Media Files ({mediaItems.length})
        </h3>

        {mediaItems.length === 0 ? (
          <div className="p-12 text-center rounded-2xl bg-card border border-border/70 text-xs text-muted-foreground">
            No custom media uploaded yet. Use the upload box above to upload new images.
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {mediaItems.map((item) => (
              <div
                key={item.id}
                className="group rounded-2xl bg-card border border-border/70 overflow-hidden shadow-xs hover:border-foreground/30 transition-all flex flex-col justify-between"
              >
                <div className="relative aspect-square w-full bg-muted/40 overflow-hidden">
                  <img
                    src={item.file_url}
                    alt={item.alt_text || item.filename}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>

                <div className="p-3 space-y-2">
                  <p className="text-[11px] font-medium text-foreground truncate" title={item.filename}>
                    {item.filename}
                  </p>
                  <p className="text-[10px] text-muted-foreground">
                    {(item.file_size / 1024).toFixed(1)} KB
                  </p>

                  <button
                    onClick={() => handleCopy(item.file_url)}
                    className="w-full py-1.5 px-2 rounded-lg bg-muted hover:bg-foreground hover:text-background text-[11px] font-semibold transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
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
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
