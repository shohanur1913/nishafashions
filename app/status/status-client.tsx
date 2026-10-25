"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import { 
  CheckCircle2, 
  AlertTriangle, 
  XCircle, 
  RefreshCw, 
  Database, 
  Server, 
  HardDrive, 
  Mail, 
  ShieldCheck, 
  Clock, 
  Cpu, 
  ExternalLink,
  Code2,
  Globe,
  Terminal,
  Activity,
  ArrowLeft
} from "lucide-react";

interface HealthData {
  status: "operational" | "degraded";
  timestamp: string;
  serverTimeBst: string;
  runtime: {
    nodeVersion: string;
    environment: string;
    platform: string;
    uptimeSeconds: number;
  };
  database: {
    connected: boolean;
    latencyMs: number;
    host: string;
    port: number;
    database: string;
    tablesCount?: number;
    error?: string;
    code?: string;
  };
  storage: {
    path: string;
    writable: boolean;
    fileCount: number;
  };
  smtp: {
    configured: boolean;
  };
  memory: {
    rssMb: number;
    heapUsedMb: number;
    heapTotalMb: number;
  };
  branding: {
    infrastructurePartner: string;
    infrastructureUrl: string;
    leadDeveloper: string;
    developerRole: string;
  };
}

export function StatusClient({ initialData }: { initialData: HealthData }) {
  const [data, setData] = useState<HealthData>(initialData);
  const [isPending, startTransition] = useTransition();
  const [lastRefreshed, setLastRefreshed] = useState<string>(new Date().toLocaleTimeString());

  const handleRefresh = async () => {
    startTransition(async () => {
      try {
        const res = await fetch("/api/health", { cache: "no-store" });
        const json = await res.json();
        setData(json);
        setLastRefreshed(new Date().toLocaleTimeString());
      } catch (err) {
        console.error("Health refresh failed:", err);
      }
    });
  };

  const isAllGood = data.status === "operational" && data.database.connected;

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 font-sans selection:bg-red-500 selection:text-white">
      {/* Top Banner */}
      <div className="border-b border-zinc-800/80 bg-zinc-900/60 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link 
              href="/"
              className="flex items-center gap-2 text-zinc-400 hover:text-white text-xs font-medium transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Website</span>
            </Link>
            <span className="text-zinc-700">|</span>
            <div className="flex items-center gap-2">
              <Activity className="w-4 h-4 text-red-500 animate-pulse" />
              <span className="font-semibold text-sm tracking-tight text-white">
                Nisha Fashions Wear — System Health
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleRefresh}
              disabled={isPending}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-xs font-medium text-zinc-200 transition-colors disabled:opacity-50 cursor-pointer border border-zinc-700"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isPending ? "animate-spin" : ""}`} />
              <span>{isPending ? "Testing..." : "Refresh Status"}</span>
            </button>
            <Link
              href="/admin/login"
              className="text-xs font-medium px-3 py-1.5 rounded-lg bg-red-600 hover:bg-red-500 text-white transition-colors"
            >
              Admin Login
            </Link>
          </div>
        </div>
      </div>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-10 space-y-8">
        {/* Main Status Hero */}
        <div className={`p-6 sm:p-8 rounded-3xl border transition-all ${
          isAllGood 
            ? "bg-emerald-950/20 border-emerald-800/50 shadow-lg shadow-emerald-950/20" 
            : "bg-red-950/20 border-red-800/60 shadow-lg shadow-red-950/20"
        }`}>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-start gap-4">
              <div className={`p-3 rounded-2xl shrink-0 ${
                isAllGood ? "bg-emerald-500/10 text-emerald-400" : "bg-red-500/10 text-red-400"
              }`}>
                {isAllGood ? (
                  <CheckCircle2 className="w-8 h-8" />
                ) : (
                  <AlertTriangle className="w-8 h-8 animate-bounce" />
                )}
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
                    {isAllGood ? "All Systems Operational" : "Service Disruption / Degraded"}
                  </h1>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-semibold uppercase tracking-wider ${
                    isAllGood 
                      ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20" 
                      : "bg-red-500/10 text-red-400 border border-red-500/20"
                  }`}>
                    {isAllGood ? "Healthy" : "Attention Needed"}
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-zinc-400">
                  {isAllGood 
                    ? "Production services, database cluster, and serverless runtimes are running normally." 
                    : "The database connection could not be established. See diagnostic details below."
                  }
                </p>
              </div>
            </div>

            <div className="text-left sm:text-right shrink-0 border-t sm:border-t-0 border-zinc-800 pt-3 sm:pt-0">
              <span className="text-[11px] uppercase tracking-wider text-zinc-500 font-mono block">Last Checked</span>
              <span className="text-xs font-mono text-zinc-300 font-medium">{lastRefreshed}</span>
            </div>
          </div>
        </div>

        {/* ETIMEDOUT Specific Alert Box */}
        {!data.database.connected && data.database.code === "ETIMEDOUT" && (
          <div className="p-5 sm:p-6 rounded-2xl bg-amber-950/30 border border-amber-500/40 space-y-3">
            <div className="flex items-center gap-2.5 text-amber-400 font-semibold text-sm">
              <Terminal className="w-4 h-4" />
              <span>ETIMEDOUT Diagnostic & Action Plan:</span>
            </div>
            <p className="text-xs text-zinc-300 leading-relaxed">
              Your server attempted to connect to MySQL host <code className="px-1.5 py-0.5 rounded bg-zinc-900 border border-zinc-800 text-amber-300 font-mono font-bold">{data.database.host}:{data.database.port}</code>, but the connection timed out after 6 seconds.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              <div className="p-3 rounded-xl bg-zinc-900/80 border border-zinc-800 space-y-1">
                <span className="text-xs font-semibold text-white block">Step 1: Check cPanel Remote MySQL</span>
                <p className="text-[11px] text-zinc-400">
                  Open cPanel &gt; <strong>Remote MySQL</strong> &gt; Add Access Host: <code className="text-emerald-400 font-bold">%</code> (Wildcard).
                </p>
              </div>
              <div className="p-3 rounded-xl bg-zinc-900/80 border border-zinc-800 space-y-1">
                <span className="text-xs font-semibold text-white block">Step 2: Hosting Firewall (Port 3306)</span>
                <p className="text-[11px] text-zinc-400">
                  If port 3306 is blocked by your cPanel host firewall, ask your hosting support to open inbound port 3306 or use local hosting via <strong>Setup Node.js App</strong>.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Diagnostic Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {/* Database Health Card */}
          <div className="p-5 rounded-2xl bg-zinc-900/70 border border-zinc-800/80 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-red-500/10 text-red-400">
                  <Database className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-white">MySQL Database</h3>
                  <span className="text-[11px] text-zinc-400">Relational Database Engine</span>
                </div>
              </div>
              <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                data.database.connected 
                  ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20" 
                  : "bg-red-500/10 text-red-400 border border-red-500/20"
              }`}>
                {data.database.connected ? "Connected" : "Offline"}
              </span>
            </div>

            <div className="space-y-2 text-xs font-mono">
              <div className="flex justify-between py-1 border-b border-zinc-800/60">
                <span className="text-zinc-500 font-sans">Host</span>
                <span className="text-zinc-300 truncate max-w-[180px]">{data.database.host}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-zinc-800/60">
                <span className="text-zinc-500 font-sans">Port</span>
                <span className="text-zinc-300">{data.database.port}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-zinc-800/60">
                <span className="text-zinc-500 font-sans">Database</span>
                <span className="text-zinc-300">{data.database.database}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-zinc-800/60">
                <span className="text-zinc-500 font-sans">Ping Latency</span>
                <span className={data.database.latencyMs < 100 ? "text-emerald-400" : "text-amber-400"}>
                  {data.database.latencyMs}ms
                </span>
              </div>
              {data.database.tablesCount !== undefined && (
                <div className="flex justify-between py-1">
                  <span className="text-zinc-500 font-sans">Tables Count</span>
                  <span className="text-zinc-300">{data.database.tablesCount} tables</span>
                </div>
              )}
              {data.database.error && (
                <div className="p-2 rounded-lg bg-red-950/40 border border-red-800/40 text-[11px] text-red-300 break-all font-mono">
                  {data.database.error}
                </div>
              )}
            </div>
          </div>

          {/* Server Runtime Card */}
          <div className="p-5 rounded-2xl bg-zinc-900/70 border border-zinc-800/80 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-blue-500/10 text-blue-400">
                  <Server className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-white">Application Runtime</h3>
                  <span className="text-[11px] text-zinc-400">Next.js 16 + Node.js Engine</span>
                </div>
              </div>
              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                Online
              </span>
            </div>

            <div className="space-y-2 text-xs font-mono">
              <div className="flex justify-between py-1 border-b border-zinc-800/60">
                <span className="text-zinc-500 font-sans">Platform</span>
                <span className="text-zinc-300">{data.runtime.platform}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-zinc-800/60">
                <span className="text-zinc-500 font-sans">Node Version</span>
                <span className="text-zinc-300">{data.runtime.nodeVersion}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-zinc-800/60">
                <span className="text-zinc-500 font-sans">Environment</span>
                <span className="text-emerald-400 uppercase text-[11px] font-semibold">{data.runtime.environment}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-zinc-800/60">
                <span className="text-zinc-500 font-sans">Memory (Heap)</span>
                <span className="text-zinc-300">{data.memory.heapUsedMb} MB / {data.memory.heapTotalMb} MB</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-zinc-500 font-sans">Uptime</span>
                <span className="text-zinc-300">{Math.floor(data.runtime.uptimeSeconds / 60)} mins</span>
              </div>
            </div>
          </div>

          {/* Media & Storage Card */}
          <div className="p-5 rounded-2xl bg-zinc-900/70 border border-zinc-800/80 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-purple-500/10 text-purple-400">
                  <HardDrive className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-white">Media & Assets Storage</h3>
                  <span className="text-[11px] text-zinc-400">Uploads & Asset Delivery</span>
                </div>
              </div>
              <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                data.storage.writable
                  ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                  : "bg-amber-500/10 text-amber-400 border border-amber-500/20"
              }`}>
                {data.storage.writable ? "Writable" : "Read-Only"}
              </span>
            </div>

            <div className="space-y-2 text-xs font-mono">
              <div className="flex justify-between py-1 border-b border-zinc-800/60">
                <span className="text-zinc-500 font-sans">Target Directory</span>
                <span className="text-zinc-300">{data.storage.path}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-zinc-800/60">
                <span className="text-zinc-500 font-sans">Uploaded Files</span>
                <span className="text-zinc-300">{data.storage.fileCount} files</span>
              </div>
              <div className="flex justify-between py-1 border-b border-zinc-800/60">
                <span className="text-zinc-500 font-sans">Disk Status</span>
                <span className={data.storage.writable ? "text-emerald-400" : "text-amber-400"}>
                  {data.storage.writable ? "Local Storage Active" : "Ephemeral (Vercel)"}
                </span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-zinc-500 font-sans">SMTP Mailer</span>
                <span className={data.smtp.configured ? "text-emerald-400" : "text-zinc-500"}>
                  {data.smtp.configured ? "Configured" : "Default Mode"}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* System Time Card */}
        <div className="p-4 rounded-2xl bg-zinc-900/40 border border-zinc-800/60 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 text-zinc-400">
            <Clock className="w-4 h-4 text-red-400 shrink-0" />
            <span><strong>Server Time (BST):</strong> <span className="font-mono text-zinc-200">{data.serverTimeBst}</span></span>
          </div>
          <div className="text-zinc-500 font-mono text-[11px]">
            UTC: {data.timestamp}
          </div>
        </div>

        {/* Branding Section - Bangladesh Host & Niloy Developer */}
        <div className="pt-6 border-t border-zinc-800/80">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Bangladesh Host Card */}
            <div className="p-5 rounded-2xl bg-gradient-to-br from-zinc-900 to-zinc-900/60 border border-zinc-800 hover:border-zinc-700 transition-all space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
                  <span className="text-xs uppercase tracking-wider font-mono text-emerald-400 font-semibold">
                    Infrastructure &amp; Cloud Partner
                  </span>
                </div>
                <Globe className="w-4 h-4 text-zinc-500" />
              </div>
              <h4 className="text-base font-bold text-white tracking-tight">
                {data.branding.infrastructurePartner}
              </h4>
              <p className="text-xs text-zinc-400 leading-relaxed">
                High-performance enterprise cloud hosting, ultra-low latency NVMe storage, and DDoS-protected infrastructure serving Bangladesh &amp; global clients.
              </p>
              <div className="pt-2">
                <span className="inline-flex items-center gap-1.5 text-[11px] font-medium text-emerald-400 hover:text-emerald-300 transition-colors">
                  <span>99.9% Uptime SLA Guaranteed</span>
                </span>
              </div>
            </div>

            {/* Niloy Developer Card */}
            <div className="p-5 rounded-2xl bg-gradient-to-br from-zinc-900 to-zinc-900/60 border border-zinc-800 hover:border-zinc-700 transition-all space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Code2 className="w-4 h-4 text-red-400" />
                  <span className="text-xs uppercase tracking-wider font-mono text-red-400 font-semibold">
                    Lead Systems Engineer
                  </span>
                </div>
                <ShieldCheck className="w-4 h-4 text-zinc-500" />
              </div>
              <h4 className="text-base font-bold text-white tracking-tight">
                {data.branding.leadDeveloper}
              </h4>
              <p className="text-xs text-zinc-400 leading-relaxed">
                {data.branding.developerRole} — Architecting resilient enterprise web applications, real-time data synchronization, and automated high-throughput workflows.
              </p>
              <div className="pt-2">
                <span className="inline-flex items-center gap-1.5 text-[11px] font-medium text-red-400 hover:text-red-300 transition-colors">
                  <span>Full-Stack Architecture &amp; Security Hardened</span>
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer info */}
        <div className="text-center text-xs text-zinc-600 space-y-1">
          <p>© {new Date().getFullYear()} Nisha Fashions Wear. Monitored by Bangladesh Host &amp; Niloy.</p>
          <p className="text-[11px] text-zinc-700">Automated diagnostic probe refreshed every time this page is loaded.</p>
        </div>
      </main>
    </div>
  );
}
