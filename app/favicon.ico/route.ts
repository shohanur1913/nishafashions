import { NextResponse } from "next/server";
import { getSiteSettings } from "@/lib/content-service";
import fs from "fs";
import path from "path";

export const dynamic = "force-dynamic";
export const revalidate = 0;

function getMimeType(filePath: string): string {
  const ext = path.extname(filePath).toLowerCase();
  switch (ext) {
    case ".png":
      return "image/png";
    case ".svg":
      return "image/svg+xml";
    case ".webp":
      return "image/webp";
    case ".jpg":
    case ".jpeg":
      return "image/jpeg";
    case ".ico":
    default:
      return "image/x-icon";
  }
}

export async function GET(request: Request) {
  try {
    const settings = await getSiteSettings();
    const faviconUrl = settings.favicon_url;

    if (faviconUrl && faviconUrl !== "/favicon.ico") {
      // Local upload file
      if (faviconUrl.startsWith("/uploads/") || faviconUrl.startsWith("/")) {
        const cleanedPath = faviconUrl.startsWith("/") ? faviconUrl.slice(1) : faviconUrl;
        const filePath = path.join(process.cwd(), "public", cleanedPath);

        if (fs.existsSync(filePath)) {
          const fileBuffer = fs.readFileSync(filePath);
          const mime = getMimeType(filePath);

          return new Response(fileBuffer, {
            status: 200,
            headers: {
              "Content-Type": mime,
              "Cache-Control": "public, max-age=60, stale-while-revalidate=300",
            },
          });
        }
      }

      // External URL
      if (faviconUrl.startsWith("http://") || faviconUrl.startsWith("https://")) {
        return NextResponse.redirect(new URL(faviconUrl), { status: 307 });
      }
    }
  } catch (err) {
    console.error("Error serving dynamic favicon:", err);
  }

  // Fallback to static public/favicon.ico
  const fallbackPath = path.join(process.cwd(), "public", "favicon.ico");
  if (fs.existsSync(fallbackPath)) {
    const fileBuffer = fs.readFileSync(fallbackPath);
    return new Response(fileBuffer, {
      status: 200,
      headers: {
        "Content-Type": "image/x-icon",
        "Cache-Control": "public, max-age=3600",
      },
    });
  }

  return new Response(null, { status: 404 });
}
