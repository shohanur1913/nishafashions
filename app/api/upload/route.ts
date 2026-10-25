import { NextRequest, NextResponse } from "next/server";
import { getAdminUser } from "@/lib/auth";
import { execute } from "@/lib/db";
import { writeFile, mkdir } from "fs/promises";
import path from "path";
import { put } from "@vercel/blob";

export async function POST(req: NextRequest) {
  try {
    const admin = await getAdminUser();
    if (!admin) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const formData = await req.formData();
    const file = formData.get("file") as File | null;
    const altText = (formData.get("altText") as string) || "";

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    const allowedMime = ["image/jpeg", "image/png", "image/webp", "image/avif", "image/svg+xml"];
    if (!allowedMime.includes(file.type)) {
      return NextResponse.json({ error: "Unsupported image format. Please upload JPG, PNG, WebP, AVIF or SVG." }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const safeName = file.name.replace(/[^a-zA-Z0-9.-]/g, "_");
    const uniqueFileName = `${Date.now()}-${safeName}`;

    let publicUrl = "";
    let storagePath = "";

    // 1. If Vercel Blob token is configured, upload directly to Vercel Fast Object Storage
    if (process.env.BLOB_READ_WRITE_TOKEN) {
      try {
        const blob = await put(`uploads/${uniqueFileName}`, file, {
          access: "public",
        });
        publicUrl = blob.url;
        storagePath = blob.pathname;
      } catch (blobErr) {
        console.warn("Vercel Blob upload failed, attempting local/fallback upload:", blobErr);
      }
    }

    // 2. Try writing to local filesystem (development or VPS)
    if (!publicUrl) {
      try {
        const uploadDir = path.join(process.cwd(), "public", "uploads");
        await mkdir(uploadDir, { recursive: true });
        const filePath = path.join(uploadDir, uniqueFileName);
        await writeFile(filePath, buffer);
        publicUrl = `/uploads/${uniqueFileName}`;
        storagePath = filePath;
      } catch (fsErr: any) {
        // 3. Fallback for Vercel Serverless read-only filesystem (EROFS)
        if (fsErr.code === "EROFS" || fsErr.message?.includes("read-only")) {
          const base64Data = buffer.toString("base64");
          publicUrl = `data:${file.type};base64,${base64Data}`;
          storagePath = "base64-data-uri";
        } else {
          throw fsErr;
        }
      }
    }

    const res: any = await execute(
      `INSERT INTO media (filename, file_path, file_url, mime_type, file_size, alt_text) VALUES (?, ?, ?, ?, ?, ?)`,
      [uniqueFileName, storagePath, publicUrl, file.type, file.size, altText || file.name]
    );

    return NextResponse.json({
      success: true,
      id: res.insertId,
      url: publicUrl,
      filename: uniqueFileName,
      size: file.size,
      mimeType: file.type,
    });
  } catch (error: any) {
    console.error("Upload error:", error);
    return NextResponse.json({ error: error.message || "Failed to upload file" }, { status: 500 });
  }
}
