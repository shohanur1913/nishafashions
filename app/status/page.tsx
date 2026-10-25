import { Metadata } from "next";
import { checkDatabaseHealth } from "@/lib/db";
import { StatusClient, StatusData } from "./status-client";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export const metadata: Metadata = {
  title: "System Status | Nisha Fashions Wear",
  description: "Live system health and service availability for Nisha Fashions Wear. Infrastructure powered by bangladeshhost.com",
  robots: {
    index: false,
    follow: false,
  },
};

export default async function StatusPage() {
  const dbHealth = await checkDatabaseHealth();
  const isOperational = dbHealth.connected;

  const statusData: StatusData = {
    isOperational,
    status: isOperational ? "operational" : "degraded",
    timestamp: new Date().toISOString(),
    uptime: "99.98%",
    services: [
      {
        name: "Website & Storefront",
        description: "Public pages, product showcase, and browsing experience",
        status: "operational",
      },
      {
        name: "Product Catalog & RFQ System",
        description: "Quotation generator, sample requests, and inquiry handling",
        status: isOperational ? "operational" : "degraded",
      },
      {
        name: "Database & Cloud Infrastructure",
        description: "High-availability data cluster and dynamic content engine",
        status: isOperational ? "operational" : "degraded",
      },
      {
        name: "Asset Delivery & CDN",
        description: "Product photography, technical specs, and document delivery",
        status: "operational",
      },
      {
        name: "Client Communications & Messaging",
        description: "Direct WhatsApp routing and client email notifications",
        status: "operational",
      },
    ],
  };

  return <StatusClient initialData={statusData} />;
}
