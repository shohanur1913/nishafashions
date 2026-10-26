'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import * as d3 from 'd3';
import { feature } from 'topojson-client';
import type { Topology, GeometryCollection } from 'topojson-specification';
import type { GeoPermissibleObjects } from 'd3';

export interface GlobeWireframeProps {
  width?: number;
  height?: number;
  className?: string;
  strokeColor?: string;
  strokeWidth?: number;
  graticuleColor?: string;
  graticuleOpacity?: number;
  sphereOutlineColor?: string;
  sphereOutlineWidth?: number;
  autoRotate?: boolean;
  autoRotateSpeed?: number;
  rotateToLocation?: string | [number, number];
  rotateCities?: string[];
  rotationSpeed?: number;
  initialRotation?: [number, number];
  enableInteraction?: boolean;
  showGraticule?: boolean;
  countryFillColor?: string;
  countryHoverColor?: string;
  variant?: 'wireframe' | 'wireframesolid' | 'solid';
  scale?: number;
  backgroundColor?: string;
}

interface WorldAtlasTopology extends Topology {
  objects: {
    countries: GeometryCollection;
    land?: GeometryCollection;
  };
}

const cityCoordinates: Record<string, [number, number]> = {
  'san francisco': [37.7749, -122.4194],
  'new york': [40.7128, -74.006],
  london: [51.5074, -0.1278],
  tokyo: [35.6762, 139.6503],
  paris: [48.8566, 2.3522],
  moscow: [55.7558, 37.6176],
  dubai: [25.2048, 55.2708],
  singapore: [1.3521, 103.8198],
  sydney: [-33.8688, 151.2093],
  mumbai: [19.076, 72.8777],
  'los angeles': [34.0522, -118.2437],
  chicago: [41.8781, -87.6298],
  dhaka: [23.8103, 90.4125],
};

export default function GlobeWireframe({
  width: customWidth,
  height: customHeight,
  className = '',
  strokeColor,
  strokeWidth = 1,
  graticuleColor,
  graticuleOpacity = 0.15,
  sphereOutlineColor,
  sphereOutlineWidth = 1.5,
  autoRotate = true,
  autoRotateSpeed = 0.35,
  rotateToLocation,
  rotateCities = [],
  rotationSpeed = 3000,
  initialRotation = [0, -15],
  enableInteraction = true,
  showGraticule = false,
  countryFillColor,
  variant = 'solid',
  scale = 0.9,
  backgroundColor = 'transparent',
}: GlobeWireframeProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Use mutable refs for 60fps render loop — zero React state updates per frame!
  const rotationRef = useRef<[number, number]>([initialRotation[0], initialRotation[1]]);
  const isDraggingRef = useRef<boolean>(false);
  const lastMouseRef = useRef<[number, number]>([0, 0]);
  const isVisibleRef = useRef<boolean>(true);
  const animationFrameRef = useRef<number | null>(null);

  // Cached geographical data
  const landDataRef = useRef<GeoPermissibleObjects | null>(null);
  const graticuleDataRef = useRef<GeoPermissibleObjects | null>(null);
  const currentCityIndexRef = useRef<number>(0);

  // Load world data once (from local bundle with fallback to CDN)
  useEffect(() => {
    let isCancelled = false;

    const loadData = async () => {
      try {
        let response = await fetch('/data/world-110m.json');
        if (!response.ok) {
          response = await fetch('https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json');
        }
        const topology = (await response.json()) as WorldAtlasTopology;
        if (isCancelled) return;

        if (topology.objects.land) {
          landDataRef.current = feature(topology, topology.objects.land) as unknown as GeoPermissibleObjects;
        } else if (topology.objects.countries) {
          landDataRef.current = feature(topology, topology.objects.countries) as unknown as GeoPermissibleObjects;
        }
      } catch (err) {
        console.warn('World topology load failed, continuing with fallback outline', err);
      }
    };

    graticuleDataRef.current = d3.geoGraticule()() as unknown as GeoPermissibleObjects;
    loadData();

    return () => {
      isCancelled = true;
    };
  }, []);

  // Set rotation directly if rotateToLocation changes
  useEffect(() => {
    if (!rotateToLocation) return;
    if (typeof rotateToLocation === 'string') {
      const city = rotateToLocation.toLowerCase();
      const coords = cityCoordinates[city] || [0, 0];
      rotationRef.current = [-coords[1], -coords[0]];
    } else {
      rotationRef.current = [-rotateToLocation[1], -rotateToLocation[0]];
    }
  }, [rotateToLocation]);

  // Main Canvas Rendering Engine (Ultra-Optimized, 60fps buttery smooth)
  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let size = customWidth || container.clientWidth || 300;
    const dpr = Math.min(typeof window !== 'undefined' ? window.devicePixelRatio || 1 : 1, 2);

    const updateCanvasSize = () => {
      if (customWidth && customHeight) {
        size = Math.min(customWidth, customHeight);
      } else if (container) {
        size = container.clientWidth || 300;
      }

      canvas.width = Math.round(size * dpr);
      canvas.height = Math.round(size * dpr);
      canvas.style.width = `${size}px`;
      canvas.style.height = `${size}px`;
    };

    updateCanvasSize();

    // D3 Projection and Path Generator bound directly to the Canvas 2D context
    const projection = d3
      .geoOrthographic()
      .clipAngle(90)
      .precision(0.3);

    const path = d3.geoPath(projection, ctx);

    // City rotation cycler
    let cityTimer: NodeJS.Timeout | null = null;
    if (rotateCities.length > 0) {
      cityTimer = setInterval(() => {
        if (!isVisibleRef.current) return;
        currentCityIndexRef.current = (currentCityIndexRef.current + 1) % rotateCities.length;
        const city = rotateCities[currentCityIndexRef.current].toLowerCase();
        const coords = cityCoordinates[city];
        if (coords) {
          rotationRef.current = [-coords[1], -coords[0]];
        }
      }, rotationSpeed);
    }

    // High performance frame render
    const render = () => {
      if (!isVisibleRef.current) {
        animationFrameRef.current = requestAnimationFrame(render);
        return;
      }

      // Auto rotation update
      if (autoRotate && !isDraggingRef.current && rotateCities.length === 0) {
        rotationRef.current[0] = (rotationRef.current[0] + autoRotateSpeed) % 360;
      }

      const radius = (size / 2) * scale * 0.92;
      const center = size / 2;

      ctx.save();
      ctx.scale(dpr, dpr);
      ctx.clearRect(0, 0, size, size);

      projection
        .scale(radius)
        .translate([center, center])
        .rotate(rotationRef.current);

      // 1. Background Fill / Sphere
      if (backgroundColor && backgroundColor !== 'transparent') {
        ctx.beginPath();
        ctx.arc(center, center, radius, 0, Math.PI * 2);
        ctx.fillStyle = backgroundColor;
        ctx.fill();
      }

      // 2. Graticule Lines (Wireframe Latitude & Longitude)
      if (showGraticule && graticuleDataRef.current && graticuleOpacity > 0) {
        ctx.beginPath();
        path(graticuleDataRef.current);
        ctx.strokeStyle = graticuleColor || 'rgba(150, 150, 150, 0.2)';
        ctx.lineWidth = 0.75;
        ctx.globalAlpha = graticuleOpacity;
        ctx.stroke();
        ctx.globalAlpha = 1.0;
      }

      // 3. Land Masses & Countries (Drawn in a single lightning-fast GPU batch)
      if (landDataRef.current) {
        ctx.beginPath();
        path(landDataRef.current);

        if (variant === 'solid') {
          ctx.fillStyle = countryFillColor || 'rgba(120, 130, 145, 0.45)';
          ctx.fill();
        }

        ctx.strokeStyle = strokeColor || 'rgba(140, 150, 165, 0.7)';
        ctx.lineWidth = strokeWidth * 0.75;
        ctx.stroke();
      }

      // 4. Outer Sphere Border
      ctx.beginPath();
      ctx.arc(center, center, radius, 0, Math.PI * 2);
      ctx.strokeStyle = sphereOutlineColor || 'rgba(160, 175, 195, 0.5)';
      ctx.lineWidth = sphereOutlineWidth;
      ctx.stroke();

      ctx.restore();

      animationFrameRef.current = requestAnimationFrame(render);
    };

    animationFrameRef.current = requestAnimationFrame(render);

    // Resize Observer
    const resizeObserver = new ResizeObserver(() => {
      updateCanvasSize();
    });
    resizeObserver.observe(container);

    // Intersection Observer to completely halt animation when offscreen
    const intersectionObserver = new IntersectionObserver(
      ([entry]) => {
        isVisibleRef.current = entry.isIntersecting;
      },
      { threshold: 0.05 }
    );
    intersectionObserver.observe(container);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      if (cityTimer) {
        clearInterval(cityTimer);
      }
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
    };
  }, [
    customWidth,
    customHeight,
    autoRotate,
    autoRotateSpeed,
    scale,
    variant,
    strokeColor,
    strokeWidth,
    countryFillColor,
    sphereOutlineColor,
    sphereOutlineWidth,
    showGraticule,
    graticuleColor,
    graticuleOpacity,
    backgroundColor,
    rotateCities,
    rotationSpeed,
  ]);

  // Pointer / Touch Handlers for Smooth Interactive Rotation
  const handlePointerDown = (e: React.PointerEvent) => {
    if (!enableInteraction) return;
    isDraggingRef.current = true;
    lastMouseRef.current = [e.clientX, e.clientY];
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDraggingRef.current || !enableInteraction) return;
    const dx = e.clientX - lastMouseRef.current[0];
    const dy = e.clientY - lastMouseRef.current[1];

    const sensitivity = 0.35;
    rotationRef.current = [
      rotationRef.current[0] + dx * sensitivity,
      Math.max(-85, Math.min(85, rotationRef.current[1] - dy * sensitivity)),
    ];

    lastMouseRef.current = [e.clientX, e.clientY];
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    if (!enableInteraction) return;
    isDraggingRef.current = false;
    try {
      (e.target as HTMLElement).releasePointerCapture(e.pointerId);
    } catch {}
  };

  return (
    <div
      ref={containerRef}
      className={`relative flex items-center justify-center overflow-hidden select-none ${className}`}
    >
      <canvas
        ref={canvasRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        className="w-full h-full block cursor-grab active:cursor-grabbing touch-none will-change-transform"
      />
    </div>
  );
}
