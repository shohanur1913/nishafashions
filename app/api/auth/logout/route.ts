import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST() {
  const cookieStore = await cookies();
  cookieStore.delete("admin_token");
  return NextResponse.json({ success: true, message: "Logged out successfully" });
}

export async function GET(request: Request) {
  const cookieStore = await cookies();
  cookieStore.delete("admin_token");
  const redirectBase = process.env.NEXT_PUBLIC_SITE_URL || request.url;
  return NextResponse.redirect(new URL("/admin/login", redirectBase));
}
