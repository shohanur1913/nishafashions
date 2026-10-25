"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowRight, X } from "lucide-react";

export interface NoticeBarProps {
  settings?: Record<string, string>;
  positionFilter?: "top" | "bottom";
  previewMode?: boolean; // For admin panel live preview
}

export function NoticeBar({ settings, positionFilter, previewMode = false }: NoticeBarProps) {
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    if (!previewMode) {
      try {
        const isDismissed = sessionStorage.getItem("nfw_notice_dismissed");
        if (isDismissed === "true") {
          setDismissed(true);
        }
      } catch (e) {
        // Ignore sessionStorage errors
      }
    }
  }, [previewMode]);

  if (dismissed && !previewMode) return null;

  const isEnabled = settings?.notice_enabled === "true" || settings?.notice_enabled === "1";
  if (!isEnabled && !previewMode) return null;

  const text = settings?.notice_text || "🚧 Website Maintenance: We are currently upgrading our website. If you encounter any temporary issues, please bear with us.";
  if (!text.trim() && !previewMode) return null;

  const currentPosition = settings?.notice_position || "top";
  if (positionFilter && currentPosition !== positionFilter && !previewMode) {
    return null;
  }

  const mode = settings?.notice_mode || "auto";
  const isRolling = mode === "rolling" || (mode === "auto" && text.length > 55);

  const speed = settings?.notice_speed || "slow";
  let duration = "75s";
  if (speed === "slow") duration = "95s";
  if (speed === "normal") duration = "75s";
  if (speed === "fast") duration = "45s";

  const brandColor = settings?.brand_color || settings?.theme_color || "#E94D65";
  const variantStyles = "text-white font-medium shadow-xs";
  const linkStyles = "text-white underline decoration-white/70 hover:decoration-white font-semibold";

  const link = settings?.notice_link?.trim();
  const linkText = settings?.notice_link_text?.trim() || "Inquire Now";

  const handleDismiss = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDismissed(true);
    if (!previewMode) {
      try {
        sessionStorage.setItem("nfw_notice_dismissed", "true");
      } catch (err) {}
    }
  };

  const renderContent = (isDuplicate = false) => {
    return (
      <div 
        className="inline-flex items-center gap-2.5 text-xs sm:text-[13px] tracking-normal font-normal whitespace-nowrap px-4"
        aria-hidden={isDuplicate}
      >
        <span className="shrink-0">
          <span>{text}</span>
        </span>

        {link && (
          <Link
            href={link}
            className={`inline-flex items-center gap-1 font-semibold transition-all hover:translate-x-0.5 shrink-0 ${linkStyles}`}
          >
            <span>{linkText}</span>
            <ArrowRight className="w-3 h-3 shrink-0" />
          </Link>
        )}
      </div>
    );
  };

  return (
    <div
      role="region"
      aria-label="Announcement Notice"
      className={`relative w-full overflow-hidden transition-all duration-300 z-50 select-none ${variantStyles}`}
      style={{
        ["--notice-duration" as any]: duration,
        backgroundColor: brandColor,
      }}
    >
      <div className="relative mx-auto max-w-screen-2xl flex items-center h-8 sm:h-9">
        {isRolling ? (
          /* Rolling Marquee Ticker (Infinite loop) */
          <div className="w-full overflow-hidden flex items-center">
            <div className="animate-notice-ticker flex items-center pr-12">
              {renderContent(false)}
              <span className="mx-6 opacity-40 font-bold">•</span>
              {renderContent(true)}
              <span className="mx-6 opacity-40 font-bold">•</span>
              {renderContent(true)}
              <span className="mx-6 opacity-40 font-bold">•</span>
              {renderContent(true)}
            </div>
          </div>
        ) : (
          /* Static Centered Notice */
          <div className="w-full flex items-center justify-center text-center px-8 overflow-hidden">
            <div className="truncate max-w-full">
              {renderContent(false)}
            </div>
          </div>
        )}

        {/* Dismiss Button */}
        {!previewMode && (
          <button
            type="button"
            onClick={handleDismiss}
            className="absolute right-2 top-1/2 -translate-y-1/2 p-1 rounded-md text-white/80 hover:text-white hover:bg-white/15 transition-all cursor-pointer z-10"
            title="Dismiss notice"
            aria-label="Dismiss notice"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        )}
      </div>
    </div>
  );
}
