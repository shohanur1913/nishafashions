"use client";

import Link from "next/link";
import { ExternalLink } from "lucide-react";

interface AdminHeaderProps {
  title?: string;
  subtitle?: string;
}

export function AdminHeader({ title, subtitle }: AdminHeaderProps) {
  return (
    <header className="min-h-14 py-2 border-b border-border/80 bg-background/95 backdrop-blur-xs px-4 sm:px-8 flex items-center justify-between sticky top-0 z-30 gap-3">
      <div className="min-w-0 flex-1">
        {title && <h1 className="text-sm sm:text-lg font-semibold text-foreground tracking-tight truncate">{title}</h1>}
        {subtitle && <p className="text-[11px] sm:text-xs text-muted-foreground line-clamp-1">{subtitle}</p>}
      </div>

      <div className="flex items-center gap-3">
        <Link
          href="/"
          target="_blank"
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border text-xs font-medium text-foreground hover:bg-muted transition-colors"
        >
          <span>View Site</span>
          <ExternalLink className="w-3.5 h-3.5 opacity-60" />
        </Link>
      </div>
    </header>
  );
}
