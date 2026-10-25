import { NextRequest, NextResponse } from "next/server";
import { getAdminUser } from "@/lib/auth";
import { execute } from "@/lib/db";
import { writeFile, mkdir } from "fs/promises";
import path from "path";
import { put } from "@vercel/blob";
import sharp from "sharp";

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

    const originalBuffer = Buffer.from(await file.arrayBuffer());

    // Automatically convert bitmap images (JPG, PNG, AVIF) to optimized WebP for reduced storage
    let processedBuffer: Buffer = originalBuffer;
    let finalMimeType = file.type;
    let extension = path.extname(file.name) || ".jpg";
    const baseName = path.basename(file.name, extension).replace(/[^a-zA-Z0-9_-]/g, "_") || "image";

    if (file.type !== "image/svg+xml") {
      try {
        processedBuffer = await sharp(originalBuffer)
          .webp({ quality: 82, effort: 4 })
          .toBuffer();
        finalMimeType = "image/webp";
        extension = ".webp";
      } catch (sharpErr) {
        console.warn("Sharp WebP optimization skipped, using original format:", sharpErr);
        processedBuffer = originalBuffer;
      }
    }

    const uniqueFileName = `${Date.now()}-${baseName}${extension}`;

    let publicUrl = "";
    let storagePath = "";

    // 1. If Vercel Blob token is configured, upload directly to Vercel Fast Object Storage
    if (process.env.BLOB_READ_WRITE_TOKEN) {
      try {
        const blob = await put(`uploads/${uniqueFileName}`, processedBuffer, {
          access: "public",
          contentType: finalMimeType,
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
        await writeFile(filePath, processedBuffer);
        publicUrl = `/uploads/${uniqueFileName}`;
        storagePath = filePath;
      } catch (fsErr: any) {
        // 3. Fallback for Vercel Serverless read-only filesystem (EROFS)
        if (fsErr.code === "EROFS" || fsErr.message?.includes("read-only")) {
          const base64Data = processedBuffer.toString("base64");
          publicUrl = `data:${finalMimeType};base64,${base64Data}`;
          storagePath = "base64-data-uri";
        } else {
          throw fsErr;
        }
      }
    }

    const res: any = await execute(
      `INSERT INTO media (filename, file_path, file_url, mime_type, file_size, alt_text) VALUES (?, ?, ?, ?, ?, ?)`,
      [uniqueFileName, storagePath, publicUrl, finalMimeType, processedBuffer.length, altText || file.name]
    );

    return NextResponse.json({
      success: true,
      id: res.insertId,
      url: publicUrl,
      filename: uniqueFileName,
      size: processedBuffer.length,
      mimeType: finalMimeType,
      originalSize: originalBuffer.length,
      savedBytes: Math.max(0, originalBuffer.length - processedBuffer.length),
    });
  } catch (error: any) {
    console.error("Upload error:", error);
    return NextResponse.json({ error: error.message || "Failed to upload file" }, { status: 500 });
  }
}
