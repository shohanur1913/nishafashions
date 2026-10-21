import { NextRequest, NextResponse } from "next/server";
import { loginAdmin } from "@/lib/auth";
import { checkRateLimit, rateLimitResponse } from "@/lib/rate-limit";

export async function POST(req: NextRequest) {
  // Rate limit: max 5 login attempts per 15 minutes per IP
  const rateLimit = checkRateLimit(req, { limit: 5, windowMs: 15 * 60 * 1000 });
  if (rateLimit.isRateLimited) {
    return rateLimitResponse(rateLimit.reset);
  }

  try {
    const { email, password } = await req.json();
    if (!email || !password) {
      return NextResponse.json({ error: "Email and password are required" }, { status: 400 });
    }

    const result = await loginAdmin(email, password);
    if (!result.success) {
      return NextResponse.json({ error: result.error }, { status: 401 });
    }

    return NextResponse.json({ success: true, user: result.user });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "An unexpected error occurred." }, { status: 500 });
  }
}
