"use client";

import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";

interface ThreeFireTitleProps {
  text?: string;
  className?: string;
}

export function ThreeFireTitle({
  text = "Hot Deals.",
  className = "",
}: ThreeFireTitleProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    // Check WebGL support
    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        canvas,
        alpha: true,
        antialias: true,
        powerPreference: "high-performance",
      });
    } catch {
      // Fallback gracefully if WebGL fails
      return;
    }

    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 10);
    camera.position.z = 1;

    let width = container.clientWidth || 320;
    let height = container.clientHeight || 80;

    const updateSize = () => {
      if (!container || !renderer) return;
      width = container.clientWidth;
      height = container.clientHeight;
      if (width <= 0 || height <= 0) return;

      renderer.setSize(width, height, false);
      camera.left = 0;
      camera.right = width;
      camera.top = height;
      camera.bottom = 0;
      camera.updateProjectionMatrix();
    };

    updateSize();

    // ----------------------------------------------------
    // 1. FLAME PARTICLES (Licking Fire Tongue System)
    // ----------------------------------------------------
    const FLAME_COUNT = 450;
    const flameGeo = new THREE.BufferGeometry();
    const flamePos = new Float32Array(FLAME_COUNT * 3);
    const flameColor = new Float32Array(FLAME_COUNT * 3);
    const flameSize = new Float32Array(FLAME_COUNT);
    const flameAlpha = new Float32Array(FLAME_COUNT);

    // Particle state tracking
    const flameData: Array<{
      x: number;
      y: number;
      baseX: number;
      vx: number;
      vy: number;
      life: number;
      maxLife: number;
      size: number;
      seed: number;
    }> = [];

    const resetFlame = (idx: number, fullRandomY = false) => {
      // Spawn flames distributed across the width of the text
      const x = Math.random() * (width * 0.96) + width * 0.02;
      const maxLife = 0.8 + Math.random() * 0.9;
      const life = fullRandomY ? Math.random() * maxLife : 0;
      const y = fullRandomY ? (life / maxLife) * (height * 0.85) : Math.random() * 6;

      flameData[idx] = {
        x,
        y,
        baseX: x,
        vx: (Math.random() - 0.5) * 12,
        vy: 28 + Math.random() * 45,
        life,
        maxLife,
        size: 14 + Math.random() * 22,
        seed: Math.random() * 1000,
      };
    };

    for (let i = 0; i < FLAME_COUNT; i++) {
      resetFlame(i, true);
    }

    // ----------------------------------------------------
    // 2. EMBER SPARKS SYSTEM (Fast flying sparks)
    // ----------------------------------------------------
    const EMBER_COUNT = 160;
    const emberGeo = new THREE.BufferGeometry();
    const emberPos = new Float32Array(EMBER_COUNT * 3);
    const emberColor = new Float32Array(EMBER_COUNT * 3);
    const emberSize = new Float32Array(EMBER_COUNT);
    const emberAlpha = new Float32Array(EMBER_COUNT);

    const emberData: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      life: number;
      maxLife: number;
      size: number;
      wobbleSpeed: number;
    }> = [];

    const resetEmber = (idx: number, fullRandomY = false) => {
      const x = Math.random() * width;
      const maxLife = 1.2 + Math.random() * 1.5;
      const life = fullRandomY ? Math.random() * maxLife : 0;
      const y = fullRandomY ? (life / maxLife) * (height * 1.4) : Math.random() * 8;

      emberData[idx] = {
        x,
        y,
        vx: (Math.random() - 0.5) * 25,
        vy: 45 + Math.random() * 65,
        life,
        maxLife,
        size: 3 + Math.random() * 5,
        wobbleSpeed: 2 + Math.random() * 4,
      };
    };

    for (let i = 0; i < EMBER_COUNT; i++) {
      resetEmber(i, true);
    }

    // ----------------------------------------------------
    // Custom Point Shader for Ultra-Crisp Fire Rendering
    // ----------------------------------------------------
    const fireVertexShader = `
      attribute float aSize;
      attribute float aAlpha;
      attribute vec3 aColor;
      varying vec3 vColor;
      varying float vAlpha;

      void main() {
        vColor = aColor;
        vAlpha = aAlpha;
        vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
        gl_PointSize = aSize;
        gl_Position = projectionMatrix * mvPosition;
      }
    `;

    const fireFragmentShader = `
      varying vec3 vColor;
      varying float vAlpha;

      void main() {
        // Create soft circular radial glow with hot center
        vec2 coord = gl_PointCoord - vec2(0.5);
        float dist = length(coord);
        if (dist > 0.5) discard;

        // Quadratic falloff for smooth fiery bloom
        float intensity = pow(1.0 - (dist * 2.0), 1.8);
        gl_FragColor = vec4(vColor * intensity, vAlpha * intensity);
      }
    `;

    // Flame Material
    const flameMat = new THREE.ShaderMaterial({
      vertexShader: fireVertexShader,
      fragmentShader: fireFragmentShader,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    flameGeo.setAttribute("position", new THREE.BufferAttribute(flamePos, 3));
    flameGeo.setAttribute("aColor", new THREE.BufferAttribute(flameColor, 3));
    flameGeo.setAttribute("aSize", new THREE.BufferAttribute(flameSize, 1));
    flameGeo.setAttribute("aAlpha", new THREE.BufferAttribute(flameAlpha, 1));

    const flamePoints = new THREE.Points(flameGeo, flameMat);
    scene.add(flamePoints);

    // Ember Material
    const emberMat = new THREE.ShaderMaterial({
      vertexShader: fireVertexShader,
      fragmentShader: fireFragmentShader,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    emberGeo.setAttribute("position", new THREE.BufferAttribute(emberPos, 3));
    emberGeo.setAttribute("aColor", new THREE.BufferAttribute(emberColor, 3));
    emberGeo.setAttribute("aSize", new THREE.BufferAttribute(emberSize, 1));
    emberGeo.setAttribute("aAlpha", new THREE.BufferAttribute(emberAlpha, 1));

    const emberPoints = new THREE.Points(emberGeo, emberMat);
    scene.add(emberPoints);

    // ----------------------------------------------------
    // Color Palette Transition for Fire
    // ----------------------------------------------------
    const colorWhite = new THREE.Color("#FFFFFF");
    const colorYellow = new THREE.Color("#FFDE59");
    const colorOrange = new THREE.Color("#FF6700");
    const colorRed = new THREE.Color("#CC1100");
    const colorDark = new THREE.Color("#440000");

    const getFlameColor = (progress: number, target: THREE.Color) => {
      if (progress < 0.2) {
        target.copy(colorWhite).lerp(colorYellow, progress / 0.2);
      } else if (progress < 0.5) {
        target.copy(colorYellow).lerp(colorOrange, (progress - 0.2) / 0.3);
      } else if (progress < 0.8) {
        target.copy(colorOrange).lerp(colorRed, (progress - 0.5) / 0.3);
      } else {
        target.copy(colorRed).lerp(colorDark, (progress - 0.8) / 0.2);
      }
    };

    // ----------------------------------------------------
    // Mouse Interactive Wind Physics
    // ----------------------------------------------------
    let mouseX = -9999;
    let mouseY = -9999;
    let isHovering = false;

    const handlePointerMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = height - (e.clientY - rect.top);
      isHovering = true;
    };

    const handlePointerLeave = () => {
      isHovering = false;
      mouseX = -9999;
      mouseY = -9999;
    };

    container.addEventListener("mousemove", handlePointerMove);
    container.addEventListener("mouseleave", handlePointerLeave);

    // ----------------------------------------------------
    // Animation Loop with Visibility Observer
    // ----------------------------------------------------
    let animationFrameId: number;
    let lastTime = performance.now();
    let isVisible = true;
    const tempColor = new THREE.Color();

    const render = (time: number) => {
      const delta = Math.min((time - lastTime) / 1000, 0.05);
      lastTime = time;

      if (!isVisible) {
        animationFrameId = requestAnimationFrame(render);
        return;
      }

      const tSec = time * 0.001;

      // 1. Update Flames
      const posAttr = flameGeo.getAttribute("position") as THREE.BufferAttribute;
      const colAttr = flameGeo.getAttribute("aColor") as THREE.BufferAttribute;
      const sizeAttr = flameGeo.getAttribute("aSize") as THREE.BufferAttribute;
      const alphaAttr = flameGeo.getAttribute("aAlpha") as THREE.BufferAttribute;

      for (let i = 0; i < FLAME_COUNT; i++) {
        const p = flameData[i];
        p.life += delta;

        if (p.life >= p.maxLife) {
          resetFlame(i, false);
          continue;
        }

        const progress = p.life / p.maxLife;

        // Upward movement + dynamic turbulence
        p.y += p.vy * delta;
        const turbulence = Math.sin(tSec * 4 + p.seed) * 14 * (1 - progress * 0.5);
        p.x += (p.vx + turbulence) * delta;

        // Interactive mouse wind
        if (isHovering) {
          const dx = p.x - mouseX;
          const dy = p.y - mouseY;
          const distSq = dx * dx + dy * dy;
          if (distSq < 7000 && distSq > 0) {
            const force = (1 - Math.sqrt(distSq) / 84) * 80;
            p.x += (dx / Math.sqrt(distSq)) * force * delta;
            p.y += Math.abs(dy / Math.sqrt(distSq)) * force * delta * 0.8;
          }
        }

        posAttr.setXYZ(i, p.x, p.y, 0);

        getFlameColor(progress, tempColor);
        colAttr.setXYZ(i, tempColor.r, tempColor.g, tempColor.b);

        // Size grows initially with heat expansion, then shrinks to smoke tip
        const currentSize = p.size * (1 + Math.sin(progress * Math.PI) * 0.8);
        sizeAttr.setX(i, currentSize);

        // Alpha fades as it burns out
        const alpha = Math.sin(progress * Math.PI) * 0.95;
        alphaAttr.setX(i, alpha);
      }

      posAttr.needsUpdate = true;
      colAttr.needsUpdate = true;
      sizeAttr.needsUpdate = true;
      alphaAttr.needsUpdate = true;

      // 2. Update Embers
      const ePosAttr = emberGeo.getAttribute("position") as THREE.BufferAttribute;
      const eColAttr = emberGeo.getAttribute("aColor") as THREE.BufferAttribute;
      const eSizeAttr = emberGeo.getAttribute("aSize") as THREE.BufferAttribute;
      const eAlphaAttr = emberGeo.getAttribute("aAlpha") as THREE.BufferAttribute;

      for (let i = 0; i < EMBER_COUNT; i++) {
        const ep = emberData[i];
        ep.life += delta;

        if (ep.life >= ep.maxLife) {
          resetEmber(i, false);
          continue;
        }

        const progress = ep.life / ep.maxLife;

        ep.y += ep.vy * delta;
        ep.x += (ep.vx + Math.sin(tSec * ep.wobbleSpeed + i) * 16) * delta;

        // Mouse interaction for embers
        if (isHovering) {
          const dx = ep.x - mouseX;
          const dy = ep.y - mouseY;
          const distSq = dx * dx + dy * dy;
          if (distSq < 10000 && distSq > 0) {
            const force = (1 - Math.sqrt(distSq) / 100) * 120;
            ep.x += (dx / Math.sqrt(distSq)) * force * delta;
            ep.y += 60 * delta;
          }
        }

        ePosAttr.setXYZ(i, ep.x, ep.y, 0);

        // Ember colors: sparkling golden to ruby red
        if (progress < 0.4) {
          tempColor.set("#FFF176"); // Bright spark
        } else if (progress < 0.7) {
          tempColor.set("#FF9100"); // Orange spark
        } else {
          tempColor.set("#FF1744"); // Glowing ruby ember
        }

        // Twinkle flicker
        const twinkle = 0.6 + Math.sin(tSec * 15 + i * 2) * 0.4;
        eColAttr.setXYZ(i, tempColor.r * twinkle, tempColor.g * twinkle, tempColor.b * twinkle);

        eSizeAttr.setX(i, ep.size * (1 - progress * 0.5));
        eAlphaAttr.setX(i, (1 - progress) * twinkle);
      }

      ePosAttr.needsUpdate = true;
      eColAttr.needsUpdate = true;
      eSizeAttr.needsUpdate = true;
      eAlphaAttr.needsUpdate = true;

      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    // Visibility observer to save battery / GPU when offscreen
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
      },
      { threshold: 0.05 }
    );
    observer.observe(container);

    // Resize observer
    const resizeObserver = new ResizeObserver(() => {
      updateSize();
    });
    resizeObserver.observe(container);

    return () => {
      cancelAnimationFrame(animationFrameId);
      observer.disconnect();
      resizeObserver.disconnect();
      container.removeEventListener("mousemove", handlePointerMove);
      container.removeEventListener("mouseleave", handlePointerLeave);

      flameGeo.dispose();
      flameMat.dispose();
      emberGeo.dispose();
      emberMat.dispose();
      renderer.dispose();
    };
  }, [mounted]);

  return (
    <div
      ref={containerRef}
      className={`relative inline-block select-none overflow-visible ${className}`}
    >
      {/* Three.js Fire Particle Canvas Overlay */}
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className="pointer-events-none absolute -inset-x-6 -inset-top-12 -inset-bottom-4 z-20 h-[calc(100%+64px)] w-[calc(100%+48px)]"
      />

      {/* Burning Molten Text Layer */}
      <span className="relative z-10 burning-fire-text font-serif italic font-normal tracking-tight">
        {text}
      </span>
    </div>
  );
}
