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
  const textRef = useRef<HTMLSpanElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    const canvas = canvasRef.current;
    const container = containerRef.current;
    const textEl = textRef.current;
    if (!canvas || !container || !textEl) return;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        canvas,
        alpha: true,
        antialias: true,
        powerPreference: "high-performance",
      });
      renderer.setClearColor(0x000000, 0);
    } catch {
      return;
    }

    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 10);
    camera.position.z = 1;

    let canvasWidth = 300;
    let canvasHeight = 100;
    let textPixels: Array<{ x: number; y: number }> = [];

    // -----------------------------------------------------------------
    // Extract exact letter contours by rasterizing text onto offscreen 2D canvas
    // This guarantees particles emerge directly from each letter shape (no square box!)
    // -----------------------------------------------------------------
    const updateTextPixels = () => {
      if (!canvas || !textEl) return;
      const cRect = canvas.getBoundingClientRect();
      const tRect = textEl.getBoundingClientRect();

      canvasWidth = Math.max(cRect.width, 100);
      canvasHeight = Math.max(cRect.height, 50);

      renderer.setSize(canvasWidth, canvasHeight, false);
      camera.left = 0;
      camera.right = canvasWidth;
      camera.top = canvasHeight;
      camera.bottom = 0;
      camera.updateProjectionMatrix();

      // Create offscreen canvas with exact dimensions
      const offscreen = document.createElement("canvas");
      offscreen.width = Math.round(canvasWidth);
      offscreen.height = Math.round(canvasHeight);
      const ctx = offscreen.getContext("2d", { willReadFrequently: true });
      if (!ctx) return;

      const style = window.getComputedStyle(textEl);
      const fontSize = style.fontSize || "40px";
      const fontFamily = style.fontFamily || "serif";
      const fontWeight = style.fontWeight || "700";
      const fontStyle = style.fontStyle || "italic";

      ctx.clearRect(0, 0, offscreen.width, offscreen.height);
      ctx.font = `${fontStyle} ${fontWeight} ${fontSize} ${fontFamily}`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillStyle = "#ffffff";

      // Calculate center position of DOM text relative to the canvas
      const textCenterX = (tRect.left + tRect.width / 2) - cRect.left;
      const textCenterY = (tRect.top + tRect.height / 2) - cRect.top;

      ctx.fillText(text, textCenterX, textCenterY);

      // Scan for non-transparent pixels that belong to the letters
      const imgData = ctx.getImageData(0, 0, offscreen.width, offscreen.height);
      const data = imgData.data;
      const sampled: Array<{ x: number; y: number }> = [];

      // Step by 2 pixels for optimal performance and dense contour coverage
      const step = 2;
      for (let py = 0; py < offscreen.height; py += step) {
        for (let px = 0; px < offscreen.width; px += step) {
          const idx = (py * offscreen.width + px) * 4;
          if (data[idx + 3] > 120) {
            // Three.js orthographic coordinates has y=0 at bottom
            sampled.push({
              x: px,
              y: canvasHeight - py,
            });
          }
        }
      }

      textPixels = sampled;
    };

    updateTextPixels();

    // Re-sample when custom web fonts finish rendering
    if (document.fonts) {
      document.fonts.ready.then(() => {
        updateTextPixels();
      });
    }

    // ----------------------------------------------------
    // 1. FLAME PARTICLES (Licking out from the letter strokes)
    // ----------------------------------------------------
    const FLAME_COUNT = 150;
    const flameGeo = new THREE.BufferGeometry();
    const flamePos = new Float32Array(FLAME_COUNT * 3);
    const flameColor = new Float32Array(FLAME_COUNT * 3);
    const flameSize = new Float32Array(FLAME_COUNT);
    const flameAlpha = new Float32Array(FLAME_COUNT);

    const flameData: Array<{
      x: number;
      y: number;
      baseX: number;
      baseY: number;
      vx: number;
      vy: number;
      life: number;
      maxLife: number;
      size: number;
      seed: number;
    }> = [];

    const resetFlame = (idx: number, fullRandomProgress = false) => {
      // Pick a random pixel belonging strictly to a letter stroke
      let sx = canvasWidth / 2;
      let sy = canvasHeight / 2;

      if (textPixels.length > 0) {
        const pt = textPixels[Math.floor(Math.random() * textPixels.length)];
        sx = pt.x + (Math.random() - 0.5) * 3;
        sy = pt.y + (Math.random() - 0.5) * 2;
      }

      const maxLife = 0.55 + Math.random() * 0.45;
      const life = fullRandomProgress ? Math.random() * maxLife : 0;
      const progress = life / maxLife;

      const vy = 18 + Math.random() * 26;
      const vx = (Math.random() - 0.5) * 8;

      flameData[idx] = {
        x: sx + vx * life,
        y: sy + vy * life,
        baseX: sx,
        baseY: sy,
        vx,
        vy,
        life,
        maxLife,
        size: 4.5 + Math.random() * 6.5,
        seed: Math.random() * 500,
      };
    };

    for (let i = 0; i < FLAME_COUNT; i++) {
      resetFlame(i, true);
    }

    // ----------------------------------------------------
    // 2. SPARKS & EMBERS (Flying upward out of the letter glyphs)
    // ----------------------------------------------------
    const EMBER_COUNT = 55;
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

    const resetEmber = (idx: number, fullRandomProgress = false) => {
      let sx = canvasWidth / 2;
      let sy = canvasHeight / 2;

      if (textPixels.length > 0) {
        const pt = textPixels[Math.floor(Math.random() * textPixels.length)];
        sx = pt.x + (Math.random() - 0.5) * 4;
        sy = pt.y + Math.random() * 3;
      }

      const maxLife = 0.9 + Math.random() * 0.9;
      const life = fullRandomProgress ? Math.random() * maxLife : 0;

      emberData[idx] = {
        x: sx,
        y: sy + (life * 35),
        vx: (Math.random() - 0.5) * 14,
        vy: 32 + Math.random() * 40,
        life,
        maxLife,
        size: 1.8 + Math.random() * 2.5,
        wobbleSpeed: 2 + Math.random() * 3,
      };
    };

    for (let i = 0; i < EMBER_COUNT; i++) {
      resetEmber(i, true);
    }

    // ----------------------------------------------------
    // Custom Point Shaders for Soft Gaussian Fire Bloom
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
        gl_PointSize = aSize * 2.0;
        gl_Position = projectionMatrix * mvPosition;
      }
    `;

    const fireFragmentShader = `
      varying vec3 vColor;
      varying float vAlpha;

      void main() {
        vec2 coord = gl_PointCoord - vec2(0.5);
        float dist = length(coord);
        if (dist > 0.5) discard;

        float intensity = pow(1.0 - (dist * 2.0), 2.2);
        gl_FragColor = vec4(vColor * intensity, vAlpha * intensity);
      }
    `;

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

    // Color Transitions matching brand theme (#E94D65)
    const colorWhite = new THREE.Color("#FFFFFF");
    const colorLightPink = new THREE.Color("#FFB3C1");
    const colorThemeRose = new THREE.Color("#FF4D6D");
    const colorBrandPrimary = new THREE.Color("#E94D65");
    const tempColor = new THREE.Color();

    const getFlameColor = (progress: number, target: THREE.Color) => {
      if (progress < 0.25) {
        target.copy(colorWhite).lerp(colorLightPink, progress / 0.25);
      } else if (progress < 0.65) {
        target.copy(colorLightPink).lerp(colorThemeRose, (progress - 0.25) / 0.4);
      } else {
        target.copy(colorThemeRose).lerp(colorBrandPrimary, (progress - 0.65) / 0.35);
      }
    };

    // Mouse Interaction
    let mouseX = -9999;
    let mouseY = -9999;
    let isHovering = false;

    const handlePointerMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = canvasHeight - (e.clientY - rect.top);
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
    // Animation Render Loop
    // ----------------------------------------------------
    let animationFrameId: number;
    let lastTime = performance.now();
    let isVisible = true;

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

        // Rise upwards with slight sine flutter
        p.y += p.vy * delta;
        const flutter = Math.sin(tSec * 4 + p.seed) * 6 * (1 - progress * 0.4);
        p.x += (p.vx + flutter) * delta;

        // Interactive mouse wind
        if (isHovering) {
          const dx = p.x - mouseX;
          const dy = p.y - mouseY;
          const distSq = dx * dx + dy * dy;
          if (distSq < 4500 && distSq > 0) {
            const force = (1 - Math.sqrt(distSq) / 67) * 45;
            p.x += (dx / Math.sqrt(distSq)) * force * delta;
            p.y += 25 * delta;
          }
        }

        posAttr.setXYZ(i, p.x, p.y, 0);

        getFlameColor(progress, tempColor);
        colAttr.setXYZ(i, tempColor.r, tempColor.g, tempColor.b);

        // Natural flame shape: starts tight at letter stroke, expands slightly, then tapers
        const currentSize = p.size * (0.8 + Math.sin(progress * Math.PI) * 0.5);
        sizeAttr.setX(i, currentSize);

        // Alpha fades cleanly as it burns out
        const alpha = Math.sin(progress * Math.PI) * 0.45;
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
        ep.x += (ep.vx + Math.sin(tSec * ep.wobbleSpeed + i) * 8) * delta;

        if (isHovering) {
          const dx = ep.x - mouseX;
          const dy = ep.y - mouseY;
          const distSq = dx * dx + dy * dy;
          if (distSq < 5500 && distSq > 0) {
            const force = (1 - Math.sqrt(distSq) / 74) * 55;
            ep.x += (dx / Math.sqrt(distSq)) * force * delta;
            ep.y += 35 * delta;
          }
        }

        ePosAttr.setXYZ(i, ep.x, ep.y, 0);

        if (progress < 0.35) {
          tempColor.set("#FFF0F3");
        } else if (progress < 0.7) {
          tempColor.set("#FF758F");
        } else {
          tempColor.set("#E94D65");
        }

        const twinkle = 0.7 + Math.sin(tSec * 14 + i) * 0.3;
        eColAttr.setXYZ(i, tempColor.r * twinkle, tempColor.g * twinkle, tempColor.b * twinkle);

        eSizeAttr.setX(i, ep.size * (1 - progress * 0.35));
        eAlphaAttr.setX(i, (1 - progress) * 0.8 * twinkle);
      }

      ePosAttr.needsUpdate = true;
      eColAttr.needsUpdate = true;
      eSizeAttr.needsUpdate = true;
      eAlphaAttr.needsUpdate = true;

      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
      },
      { threshold: 0.05 }
    );
    observer.observe(container);

    const resizeObserver = new ResizeObserver(() => {
      updateTextPixels();
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
  }, [mounted, text]);

  return (
    <div
      ref={containerRef}
      className={`relative inline-flex items-center justify-center select-none overflow-visible ${className}`}
    >
      {/* 
        Three.js Fire Particle Canvas:
        Overlayed right over the letters with Additive Blending.
        Particles spawn strictly from letter strokes and lick upward organically (no square box!).
      */}
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className="pointer-events-none absolute -inset-x-8 -top-10 -bottom-4 z-20 h-[calc(100%+56px)] w-[calc(100%+64px)]"
      />

      {/* 
        Burning Title Text: 
        Rendered with bold serif typography and crisp molten flame styling.
      */}
      <span
        ref={textRef}
        className="relative z-10 burning-fire-text font-serif italic font-bold sm:font-extrabold tracking-tight"
      >
        {text}
      </span>
    </div>
  );
}
