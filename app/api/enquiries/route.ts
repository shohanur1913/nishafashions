import { NextRequest, NextResponse } from "next/server";
import { execute, query } from "@/lib/db";
import { getAdminUser } from "@/lib/auth";
import { checkRateLimit, rateLimitResponse } from "@/lib/rate-limit";

export async function POST(req: NextRequest) {
  // Rate limit: max 10 RFQ submissions per 10 minutes per IP
  const rateLimit = checkRateLimit(req, { limit: 10, windowMs: 10 * 60 * 1000 });
  if (rateLimit.isRateLimited) {
    return rateLimitResponse(rateLimit.reset);
  }

  try {
    const data = await req.json();

    const type = data.type || "rfq";
    const name = data.name || "Valued Buyer";
    const company = data.company || "";
    const email = data.email || "";
    const phone = data.phone || "";
    const country = data.country || "";
    const category = data.category || "";
    const quantity = data.quantity || "";
    const message = data.message || "";
    const details = data.details ? JSON.stringify(data.details) : null;

    if (!email) {
      return NextResponse.json({ error: "Email is required." }, { status: 400 });
    }

    const result: any = await execute(
      `INSERT INTO enquiries (type, name, company, email, phone, country, category, quantity, message, details_json, status) 
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'new')`,
      [type, name, company, email, phone, country, category, quantity, message, details]
    );

    return NextResponse.json({ success: true, id: result.insertId });
  } catch (error: any) {
    console.error("Enquiry submission error:", error);
    return NextResponse.json({ error: error.message || "Failed to submit enquiry" }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  try {
    const admin = await getAdminUser();
    if (!admin) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const status = searchParams.get("status");

    let sql = `SELECT * FROM enquiries ORDER BY created_at DESC`;
    let params: any[] = [];

    if (status && status !== "all") {
      sql = `SELECT * FROM enquiries WHERE status = ? ORDER BY created_at DESC`;
      params = [status];
    }

    const enquiries = await query(sql, params);
    return NextResponse.json({ success: true, enquiries });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
