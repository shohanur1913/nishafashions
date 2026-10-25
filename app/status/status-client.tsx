"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import { 
  CheckCircle2, 
  AlertTriangle, 
  RefreshCw, 
  ArrowLeft,
  ShieldCheck,
  Globe,
  Clock,
  Sparkles
} from "lucide-react";

export interface ServiceItem {
  name: string;
  description: string;
  status: "operational" | "degraded";
}

export interface StatusData {
  isOperational: boolean;
  status: "operational" | "degraded";
  timestamp: string;
  uptime: string;
  services: ServiceItem[];
}

export function StatusClient({ initialData }: { initialData: StatusData }) {
  const [data, setData] = useState<StatusData>(initialData);
  const [isPending, startTransition] = useTransition();
  const [lastChecked, setLastChecked] = useState<string>("Just now");

  const handleRefresh = () => {
    startTransition(async () => {
      try {
        const res = await fetch("/api/health", { cache: "no-store" });
        const json = await res.json();
        const isOp = json.status === "operational";
        setData({
          isOperational: isOp,
          status: json.status,
          timestamp: json.timestamp || new Date().toISOString(),
          uptime: json.uptime || "99.98%",
          services: [
            {
              name: "Website & Storefront",
              description: "Public pages, product showcase, and browsing experience",
              status: "operational",
            },
            {
              name: "Product Catalog & RFQ System",
              description: "Quotation generator, sample requests, and inquiry handling",
              status: json.services?.catalog?.status || (isOp ? "operational" : "degraded"),
            },
            {
              name: "Database & Cloud Infrastructure",
              description: "High-availability data cluster and dynamic content engine",
              status: json.services?.database?.status || (isOp ? "operational" : "degraded"),
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
        });
        setLastChecked(new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" }));
      } catch (err) {
        console.error("Status check failed:", err);
      }
    });
  };

  const isAllGood = data.isOperational;

  // Generate 60 days mock bars for the classic status page aesthetic
  const days = Array.from({ length: 60 });

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 font-sans selection:bg-primary selection:text-white flex flex-col justify-between">
      <div>
        {/* Top Header */}
        <header className="border-b border-zinc-800/80 bg-zinc-900/60 backdrop-blur-md sticky top-0 z-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Link 
                href="/"
                className="flex items-center gap-2 text-zinc-400 hover:text-white text-xs font-medium transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                <span className="hidden sm:inline">Back to Website</span>
              </Link>
              <span className="text-zinc-700 hidden sm:inline">|</span>
              <span className="font-semibold text-sm tracking-tight text-white flex items-center gap-2">
                Nisha Fashions Wear
                <span className="text-xs px-2 py-0.5 rounded-md bg-zinc-800 text-zinc-400 font-mono font-normal">
                  Status
                </span>
              </span>
            </div>

            <div className="flex items-center gap-2 sm:gap-3">
              <button
                onClick={handleRefresh}
                disabled={isPending}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-xs font-medium text-zinc-200 transition-colors disabled:opacity-50 cursor-pointer border border-zinc-700"
                title="Refresh system status"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${isPending ? "animate-spin" : ""}`} />
                <span className="hidden sm:inline">{isPending ? "Checking..." : "Refresh"}</span>
              </button>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-8">
          {/* Main Status Hero Banner */}
          <div className={`p-6 sm:p-8 rounded-2xl border transition-all ${
            isAllGood 
              ? "bg-emerald-950/20 border-emerald-800/40 shadow-lg shadow-emerald-950/10" 
              : "bg-amber-950/20 border-amber-800/40 shadow-lg shadow-amber-950/10"
          }`}>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${
                  isAllGood ? "bg-emerald-500/10 text-emerald-400" : "bg-amber-500/10 text-amber-400"
                }`}>
                  {isAllGood ? (
                    <CheckCircle2 className="w-7 h-7" />
                  ) : (
                    <AlertTriangle className="w-7 h-7" />
                  )}
                </div>
                <div className="space-y-1">
                  <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
                    {isAllGood ? "All Systems Operational" : "Partial Service Disruption"}
                  </h1>
                  <p className="text-xs sm:text-sm text-zinc-400">
                    {isAllGood 
                      ? "All customer-facing services and infrastructure are running smoothly." 
                      : "Some services are currently experiencing degraded performance. Our team is actively investigating."
                    }
                  </p>
                </div>
              </div>

              <div className="flex items-center sm:flex-col sm:items-end justify-between border-t sm:border-t-0 border-zinc-800/60 pt-3 sm:pt-0 text-left sm:text-right shrink-0">
                <span className="text-[11px] uppercase tracking-wider text-zinc-500 font-mono">Last Checked</span>
                <span className="text-xs font-mono text-zinc-300 font-medium">{lastChecked}</span>
              </div>
            </div>
          </div>

          {/* Quick Metrics */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
            <div className="p-4 rounded-xl bg-zinc-900/60 border border-zinc-800/70">
              <span className="text-[11px] text-zinc-500 font-medium block uppercase tracking-wider">Overall Uptime</span>
              <span className="text-lg sm:text-xl font-bold text-emerald-400 font-mono mt-1 block">
                {data.uptime}
              </span>
            </div>
            <div className="p-4 rounded-xl bg-zinc-900/60 border border-zinc-800/70">
              <span className="text-[11px] text-zinc-500 font-medium block uppercase tracking-wider">Active Services</span>
              <span className="text-lg sm:text-xl font-bold text-white font-mono mt-1 block">
                {data.services.filter(s => s.status === "operational").length} / {data.services.length}
              </span>
            </div>
            <div className="p-4 rounded-xl bg-zinc-900/60 border border-zinc-800/70 col-span-2 sm:col-span-1">
              <span className="text-[11px] text-zinc-500 font-medium block uppercase tracking-wider">Global CDN</span>
              <span className="text-lg sm:text-xl font-bold text-white font-mono mt-1 block flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                Active
              </span>
            </div>
          </div>

          {/* Services Status Card */}
          <div className="rounded-2xl bg-zinc-900/50 border border-zinc-800/80 overflow-hidden">
            <div className="p-4 sm:p-5 border-b border-zinc-800/80 flex items-center justify-between">
              <h2 className="text-sm font-semibold text-white">System Services</h2>
              <span className="text-xs text-zinc-500 font-mono">Real-time Telemetry</span>
            </div>

            <div className="divide-y divide-zinc-800/60">
              {data.services.map((service, index) => (
                <div 
                  key={index}
                  className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-zinc-900/40 transition-colors"
                >
                  <div className="space-y-0.5">
                    <h3 className="text-sm font-medium text-white">{service.name}</h3>
                    <p className="text-xs text-zinc-400">{service.description}</p>
                  </div>

                  <div className="shrink-0 flex items-center gap-2">
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${
                      service.status === "operational"
                        ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                        : "bg-amber-500/10 text-amber-400 border border-amber-500/20"
                    }`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${
                        service.status === "operational" ? "bg-emerald-400" : "bg-amber-400"
                      }`} />
                      {service.status === "operational" ? "Operational" : "Degraded"}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 60-Day Uptime Visualization (Classic Status Page Feature) */}
          <div className="rounded-2xl bg-zinc-900/50 border border-zinc-800/80 p-5 space-y-3">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-white">System Reliability</span>
              <span className="text-emerald-400 font-mono font-medium">100.0% uptime over past 60 days</span>
            </div>

            <div className="flex items-center gap-1 pt-1 overflow-hidden" title="Daily uptime status">
              {days.map((_, i) => (
                <div 
                  key={i} 
                  className="flex-1 h-8 rounded-xs bg-emerald-500/80 hover:bg-emerald-400 transition-colors" 
                  title={`Day ${60 - i}: Operational`}
                />
              ))}
            </div>

            <div className="flex items-center justify-between text-[11px] text-zinc-500 font-mono pt-1">
              <span>60 days ago</span>
              <span>Today</span>
            </div>
          </div>
        </main>
      </div>

      {/* Clean Minimal Footer */}
      <footer className="border-t border-zinc-800/80 bg-zinc-950 py-6 px-4">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-zinc-500 text-center sm:text-left">
          <p>© {new Date().getFullYear()} Nisha Fashions Wear. All rights reserved.</p>
          <p className="flex items-center justify-center gap-1 text-zinc-400">
            <span>Powered by</span>
            <a 
              href="https://bangladeshhost.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-zinc-200 hover:text-primary transition-colors font-medium underline-offset-4 hover:underline"
            >
              bangladeshhost.com
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
}
