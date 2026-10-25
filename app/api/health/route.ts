import { NextResponse } from "next/server";
import { checkDatabaseHealth } from "@/lib/db";
import { getSmtpConfig, isSmtpConfigured } from "@/lib/mail";
import fs from "fs";
import path from "path";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET() {
  const dbHealth = await checkDatabaseHealth();
  let smtpConfigured = false;
  try {
    const config = await getSmtpConfig();
    smtpConfigured = isSmtpConfigured(config);
  } catch {
    smtpConfigured = false;
  }

  // Storage check
  const uploadsDir = path.join(process.cwd(), "public", "uploads");
  let storageWritable = false;
  let fileCount = 0;
  try {
    if (fs.existsSync(uploadsDir)) {
      const files = fs.readdirSync(uploadsDir);
      fileCount = files.length;
      const testFile = path.join(uploadsDir, ".health-test");
      fs.writeFileSync(testFile, "ok");
      fs.unlinkSync(testFile);
      storageWritable = true;
    }
  } catch {
    storageWritable = false;
  }

  const memory = process.memoryUsage();

  const healthData = {
    status: dbHealth.connected ? "operational" : "degraded",
    timestamp: new Date().toISOString(),
    serverTimeBst: new Date(Date.now() + 6 * 3600 * 1000).toISOString().replace("Z", " GMT+06:00"),
    runtime: {
      nodeVersion: process.version,
      environment: process.env.NODE_ENV || "production",
      platform: process.env.VERCEL ? "Vercel Serverless" : "Node.js Server",
      uptimeSeconds: Math.floor(process.uptime()),
    },
    database: dbHealth,
    storage: {
      path: "/public/uploads",
      writable: storageWritable,
      fileCount,
    },
    smtp: {
      configured: smtpConfigured,
    },
    memory: {
      rssMb: Number((memory.rss / (1024 * 1024)).toFixed(1)),
      heapUsedMb: Number((memory.heapUsed / (1024 * 1024)).toFixed(1)),
      heapTotalMb: Number((memory.heapTotal / (1024 * 1024)).toFixed(1)),
    },
    branding: {
      infrastructurePartner: "Bangladesh Host",
      infrastructureUrl: "https://bangladeshhost.com",
      leadDeveloper: "Niloy",
      developerRole: "Full-Stack Software Engineer & Solutions Architect",
    },
  };

  return NextResponse.json(healthData, {
    status: dbHealth.connected ? 200 : 503,
  });
}
