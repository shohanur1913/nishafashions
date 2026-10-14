"use client";

import { useState, useEffect } from "react";
import { MapPin, Navigation, ExternalLink, Loader2 } from "lucide-react";

export function ContactMap() {
  const [isLoaded, setIsLoaded] = useState(false);
  const mapQuery = "92,+MONESWAR+ROAD,+ZIGATOLA,+DHAKA-1209,+BANGLADESH";
  const embedUrl = `https://maps.google.com/maps?q=${mapQuery}&t=&z=15&ie=UTF8&iwloc=&output=embed`;
  const directMapsUrl = `https://maps.google.com/?q=${mapQuery}`;
  const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${mapQuery}`;

  // Check if map was previously cached in this session
  useEffect(() => {
    try {
      if (sessionStorage.getItem("nfw_map_loaded") === "true") {
        setIsLoaded(true);
      }
    } catch {}
  }, []);

  const handleMapLoad = () => {
    setIsLoaded(true);
    try {
      sessionStorage.setItem("nfw_map_loaded", "true");
    } catch {}
  };

  return (
    <div className="relative w-full h-[420px] sm:h-[480px] bg-muted/60 overflow-hidden rounded-2xl border border-border/70 shadow-sm">
      {/* Preconnect to Google Maps CDNs */}
      <link rel="preconnect" href="https://maps.google.com" />
      <link rel="preconnect" href="https://maps.gstatic.com" crossOrigin="anonymous" />
      <link rel="dns-prefetch" href="https://maps.google.com" />

      {/* Skeleton Loader while map loads */}
      <div
        className={`absolute inset-0 z-10 flex flex-col items-center justify-center p-6 bg-muted/90 backdrop-blur-xs transition-opacity duration-500 pointer-events-none ${
          isLoaded ? "opacity-0" : "opacity-100"
        }`}
        aria-hidden={isLoaded}
      >
        {/* Animated grid simulation */}
        <div className="absolute inset-0 opacity-20 bg-[linear-gradient(to_right,#888_1px,transparent_1px),linear-gradient(to_bottom,#888_1px,transparent_1px)] bg-[size:40px_40px] animate-pulse" />

        {/* Central Pulse Radar & Location Pin */}
        <div className="relative flex flex-col items-center text-center space-y-4 max-w-sm z-10">
          <div className="relative flex items-center justify-center">
            {/* Pulsing ring */}
            <span className="absolute w-16 h-16 rounded-full bg-foreground/15 animate-ping" />
            <span className="absolute w-24 h-24 rounded-full bg-foreground/10 animate-pulse" />
            
            {/* Center Pin Icon */}
            <div className="relative w-12 h-12 rounded-full bg-foreground text-background flex items-center justify-center shadow-md">
              <MapPin className="w-6 h-6 animate-bounce" />
            </div>
          </div>

          <div className="space-y-1">
            <h4 className="font-serif text-lg font-normal text-foreground tracking-tight">
              Nisha Fashions Wear
            </h4>
            <p className="text-xs text-muted-foreground font-light leading-relaxed">
              92, Moneswar Road, Zigatola, Dhaka-1209, Bangladesh
            </p>
          </div>

          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-background/80 border border-border/60 text-xs text-muted-foreground shadow-2xs">
            <Loader2 className="w-3.5 h-3.5 animate-spin text-foreground" />
            <span>Loading interactive Google Map...</span>
          </div>
        </div>
      </div>

      {/* Google Maps iframe */}
      <iframe
        src={embedUrl}
        width="100%"
        height="100%"
        style={{ border: 0 }}
        allowFullScreen
        loading="eager"
        referrerPolicy="no-referrer-when-downgrade"
        onLoad={handleMapLoad}
        className={`absolute inset-0 w-full h-full transition-opacity duration-700 ${
          isLoaded ? "opacity-95 dark:opacity-85" : "opacity-0"
        } grayscale contrast-105 dark:invert dark:contrast-115`}
        title="Nisha Fashions Wear Registered Office Map"
      />

      {/* Floating Interactive Controls (Open in Google Maps / Directions) */}
      <div className="absolute top-4 right-4 z-20 flex flex-wrap items-center gap-2">
        <a
          href={directionsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-background/95 hover:bg-background text-foreground text-xs font-medium border border-border/70 shadow-xs backdrop-blur-md transition-all hover:shadow-md cursor-pointer active:scale-95"
        >
          <Navigation className="w-3.5 h-3.5 text-accent" />
          <span>Get Directions</span>
        </a>

        <a
          href={directMapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-background/95 hover:bg-background text-foreground text-xs font-medium border border-border/70 shadow-xs backdrop-blur-md transition-all hover:shadow-md cursor-pointer active:scale-95"
        >
          <span>Open Full Map</span>
          <ExternalLink className="w-3.5 h-3.5 opacity-60" />
        </a>
      </div>

      {/* Floating Bottom Office Badge */}
      <div className="absolute bottom-4 left-4 z-20 hidden sm:inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-background/95 border border-border/70 text-xs shadow-md backdrop-blur-md pointer-events-auto">
        <MapPin className="w-4 h-4 text-accent shrink-0" />
        <div className="text-[11px] leading-tight">
          <p className="font-semibold text-foreground">Registered Office</p>
          <p className="text-muted-foreground font-light">92 Moneswar Road, Zigatola, Dhaka</p>
        </div>
      </div>
    </div>
  );
}
