"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  Layers, 
  Shirt, 
  FileText, 
  Inbox, 
  Image as ImageIcon, 
  Settings, 
  ExternalLink, 
  LogOut,
  ChevronRight
} from "lucide-react";
import { handleLogout } from "@/actions/admin";

interface AdminSidebarProps {
  user: { name: string; email: string; role: string };
  newEnquiriesCount?: number;
}

export function AdminSidebar({ user, newEnquiriesCount = 0 }: AdminSidebarProps) {
  const pathname = usePathname();

  const navigation = [
    { name: "Dashboard", href: "/admin", icon: LayoutDashboard, exact: true },
    { name: "Pages", href: "/admin/pages", icon: FileText, exact: false },
    { name: "Categories", href: "/admin/categories", icon: Layers, exact: false },
    { name: "Products Catalog", href: "/admin/products", icon: Shirt, exact: false },
    { name: "Enquiries & RFQs", href: "/admin/enquiries", icon: Inbox, badge: newEnquiriesCount, exact: false },
    { name: "Media Library", href: "/admin/media", icon: ImageIcon, exact: false },
    { name: "Site Settings", href: "/admin/settings", icon: Settings, exact: false },
  ];

  return (
    <aside className="w-64 bg-zinc-950 text-zinc-300 flex flex-col shrink-0 border-r border-zinc-800 min-h-screen">
      {/* Brand Header */}
      <div className="h-16 flex items-center justify-between px-6 border-b border-zinc-800/80 bg-zinc-950">
        <Link href="/admin" className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-white text-zinc-950 font-bold flex items-center justify-center text-sm shadow-sm">
            N
          </div>
          <div>
            <span className="font-semibold text-white text-sm tracking-tight block leading-tight">
              Nisha CMS
            </span>
            <span className="text-[10px] text-zinc-400 font-mono block">
              Enterprise Edition
            </span>
          </div>
        </Link>
      </div>

      {/* Navigation */}
      <div className="flex-1 py-6 px-3 space-y-1 overflow-y-auto">
        <div className="px-3 pb-2 text-[10px] font-bold text-zinc-300 uppercase tracking-widest">
          Content & Catalog
        </div>

        {navigation.map((item) => {
          const isActive = item.exact 
            ? pathname === item.href 
            : pathname.startsWith(item.href);

          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-medium transition-all group ${
                isActive
                  ? "bg-white text-zinc-950 font-semibold shadow-xs"
                  : "text-zinc-400 hover:text-white hover:bg-zinc-900"
              }`}
            >
              <div className="flex items-center gap-3">
                <item.icon className={`w-4 h-4 transition-colors ${
                  isActive ? "text-zinc-950" : "text-zinc-400 group-hover:text-white"
                }`} />
                <span>{item.name}</span>
              </div>

              {item.badge !== undefined && item.badge > 0 && (
                <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                  isActive ? "bg-zinc-950 text-white" : "bg-emerald-500 text-white animate-pulse"
                }`}>
                  {item.badge}
                </span>
              )}
            </Link>
          );
        })}

        <div className="pt-6 px-3 pb-2 text-[10px] font-bold text-zinc-300 uppercase tracking-widest">
          Website Quick Link
        </div>

        <Link
          href="/"
          target="_blank"
          className="flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-medium text-zinc-400 hover:text-white hover:bg-zinc-900 transition-all group"
        >
          <div className="flex items-center gap-3">
            <ExternalLink className="w-4 h-4 text-zinc-400 group-hover:text-white" />
            <span>View Live Website</span>
          </div>
          <ChevronRight className="w-3.5 h-3.5 opacity-40 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" />
        </Link>
      </div>

      {/* User Profile Footer */}
      <div className="p-3 border-t border-zinc-800/80 bg-zinc-950/50">
        <div className="p-3 rounded-xl bg-zinc-900/60 border border-zinc-800/50 flex items-center justify-between">
          <div className="overflow-hidden mr-2">
            <p className="text-xs font-semibold text-white truncate">{user.name}</p>
            <p className="text-[10px] text-zinc-400 truncate">{user.email}</p>
          </div>

          <button
            onClick={() => handleLogout()}
            className="p-1.5 rounded-lg text-zinc-400 hover:text-red-400 hover:bg-red-500/10 transition-colors cursor-pointer"
            title="Log out"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </aside>
  );
}
