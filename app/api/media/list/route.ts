import { NextResponse } from "next/server";
import { getAdminUser } from "@/lib/auth";
import { query } from "@/lib/db";
import { readdir } from "fs/promises";
import path from "path";

export async function GET() {
  try {
    const admin = await getAdminUser();
    if (!admin) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Get DB-uploaded media
    const dbMedia: any = await query(`SELECT * FROM media ORDER BY created_at DESC`);

    // Scan /public/images/ for static site images
    const imagesDir = path.join(process.cwd(), "public", "images");
    let staticImages: any[] = [];
    try {
      const files = await readdir(imagesDir);
      const imageExts = [".jpg", ".jpeg", ".png", ".webp", ".avif", ".svg", ".gif"];
      staticImages = files
        .filter((f) => imageExts.includes(path.extname(f).toLowerCase()))
        .map((f) => ({
          id: `static-${f}`,
          filename: f,
          file_url: `/images/${f}`,
          file_path: path.join(imagesDir, f),
          mime_type: getMime(f),
          file_size: 0,
          alt_text: f.replace(/\.[^.]+$/, "").replace(/[-_]/g, " "),
          source: "static",
          created_at: null,
        }));
    } catch {
      // images dir not found, skip
    }

    // Scan /public/uploads/ for previously uploaded files not in DB
    const uploadsDir = path.join(process.cwd(), "public", "uploads");
    let orphanedUploads: any[] = [];
    try {
      const files = await readdir(uploadsDir);
      const imageExts = [".jpg", ".jpeg", ".png", ".webp", ".avif", ".svg", ".gif"];
      const dbUrls = new Set((dbMedia || []).map((m: any) => m.file_url));
      orphanedUploads = files
        .filter((f) => {
          const ext = path.extname(f).toLowerCase();
          return imageExts.includes(ext) && !dbUrls.has(`/uploads/${f}`);
        })
        .map((f) => ({
          id: `orphan-${f}`,
          filename: f,
          file_url: `/uploads/${f}`,
          file_path: path.join(uploadsDir, f),
          mime_type: getMime(f),
          file_size: 0,
          alt_text: f.replace(/\.[^.]+$/, "").replace(/[-_]/g, " "),
          source: "upload",
          created_at: null,
        }));
    } catch {
      // uploads dir not found, skip
    }

    return NextResponse.json({
      success: true,
      db: dbMedia || [],
      static: staticImages,
      orphaned: orphanedUploads,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

function getMime(filename: string): string {
  const ext = path.extname(filename).toLowerCase();
  const map: Record<string, string> = {
    ".jpg": "image/jpeg",
    ".jpeg": "image/jpeg",
    ".png": "image/png",
    ".webp": "image/webp",
    ".avif": "image/avif",
    ".svg": "image/svg+xml",
    ".gif": "image/gif",
  };
  return map[ext] || "image/jpeg";
}
