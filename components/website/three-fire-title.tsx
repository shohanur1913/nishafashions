"use client";

import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";

interface ThreeFireTitleProps {
  text?: string;
  className?: string;
  textClassName?: string;
}

export function ThreeFireTitle({
  text = "Hot Deals.",
  className = "",
  textClassName = "",
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

    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 10);
    camera.position.z = 1;

    let canvasWidth = 260;
    let canvasHeight = 80;
    let textPixels: Array<{ x: number; y: number }> = [];

    // Flame aura behind the letters (boosted subtly for warmth)
    const FLAME_COUNT = 90;
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
      let sx = canvasWidth / 2;
      let sy = canvasHeight / 2;

      if (textPixels.length > 0) {
        const pt = textPixels[Math.floor(Math.random() * textPixels.length)];
        sx = pt.x + (Math.random() - 0.5) * 4;
        sy = pt.y + Math.random() * 2;
      }

      const maxLife = 0.6 + Math.random() * 0.5;
      const life = fullRandomProgress ? Math.random() * maxLife : 0;

      const vy = 20 + Math.random() * 26;
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
        size: 2.8 + Math.random() * 3.6,
        seed: Math.random() * 500,
      };
    };

    // Sparkling floating embers rising up from the letters
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
      colorIdx: number;
      wobbleSpeed: number;
    }> = [];

    const emberPalette = [
      new THREE.Color("#FFE494"), // Warm gold spark
      new THREE.Color("#FF9F1C"), // Intense orange ember
      new THREE.Color("#E94D65"), // Brand flame rose
      new THREE.Color("#FFFFFF"), // Hot white spark
    ];

    const resetEmber = (idx: number, fullRandomProgress = false) => {
      let sx = canvasWidth / 2;
      let sy = canvasHeight / 2;

      if (textPixels.length > 0) {
        const pt = textPixels[Math.floor(Math.random() * textPixels.length)];
        sx = pt.x + (Math.random() - 0.5) * 6;
        sy = pt.y + Math.random() * 4;
      }

      const maxLife = 0.8 + Math.random() * 0.9;
      const life = fullRandomProgress ? Math.random() * maxLife : 0;

      emberData[idx] = {
        x: sx,
        y: sy + (life * 30),
        vx: (Math.random() - 0.5) * 10,
        vy: 24 + Math.random() * 32,
        life,
        maxLife,
        size: 1.6 + Math.random() * 2.2,
        colorIdx: Math.floor(Math.random() * emberPalette.length),
        wobbleSpeed: 2 + Math.random() * 3,
      };
    };

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

      const offscreen = document.createElement("canvas");
      offscreen.width = Math.round(canvasWidth);
      offscreen.height = Math.round(canvasHeight);
      const ctx = offscreen.getContext("2d", { willReadFrequently: true });
      if (!ctx) return;

      const style = window.getComputedStyle(textEl);
      const fontSize = style.fontSize || "48px";
      const fontFamily = style.fontFamily || "serif";
      const fontWeight = style.fontWeight || "800";
      const fontStyle = style.fontStyle || "normal";

      ctx.clearRect(0, 0, offscreen.width, offscreen.height);
      ctx.font = `${fontStyle} ${fontWeight} ${fontSize} ${fontFamily}`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillStyle = "#ffffff";

      const textCenterX = (tRect.left + tRect.width / 2) - cRect.left;
      const textCenterY = (tRect.top + tRect.height / 2) - cRect.top;

      ctx.fillText(text, textCenterX, textCenterY);

      const imgData = ctx.getImageData(0, 0, offscreen.width, offscreen.height);
      const data = imgData.data;
      const sampled: Array<{ x: number; y: number }> = [];

      const step = 3;
      for (let py = 0; py < offscreen.height; py += step) {
        for (let px = 0; px < offscreen.width; px += step) {
          const idx = (py * offscreen.width + px) * 4;
          if (data[idx + 3] > 110) {
            sampled.push({
              x: px,
              y: canvasHeight - py,
            });
          }
        }
      }

      if (sampled.length > 0) {
        textPixels = sampled;
        for (let i = 0; i < FLAME_COUNT; i++) resetFlame(i, true);
        for (let i = 0; i < EMBER_COUNT; i++) resetEmber(i, true);
      }
    };

    for (let i = 0; i < FLAME_COUNT; i++) resetFlame(i, true);
    for (let i = 0; i < EMBER_COUNT; i++) resetEmber(i, true);

    updateTextPixels();

    if (document.fonts) {
      document.fonts.ready.then(() => {
        updateTextPixels();
      });
    }

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
        gl_PointSize = aSize * 1.8;
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

        float intensity = smoothstep(0.5, 0.05, dist);
        float core = smoothstep(0.2, 0.0, dist) * 0.4;
        vec3 col = mix(vColor, vec3(1.0, 0.98, 0.88), core);
        float alpha = min(1.0, (vAlpha * intensity * 1.3) + core);
        gl_FragColor = vec4(col, alpha);
      }
    `;

    const flameMat = new THREE.ShaderMaterial({
      vertexShader: fireVertexShader,
      fragmentShader: fireFragmentShader,
      transparent: true,
      blending: THREE.NormalBlending,
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
      blending: THREE.NormalBlending,
      depthWrite: false,
    });

    emberGeo.setAttribute("position", new THREE.BufferAttribute(emberPos, 3));
    emberGeo.setAttribute("aColor", new THREE.BufferAttribute(emberColor, 3));
    emberGeo.setAttribute("aSize", new THREE.BufferAttribute(emberSize, 1));
    emberGeo.setAttribute("aAlpha", new THREE.BufferAttribute(emberAlpha, 1));

    const emberPoints = new THREE.Points(emberGeo, emberMat);
    scene.add(emberPoints);

    const cWhiteHot = new THREE.Color("#FFF6CC");
    const cFlameCoral = new THREE.Color("#FF5E7E");
    const cFlameRose = new THREE.Color("#E94D65");
    const cFlameDeep = new THREE.Color("#C1121F");
    const tempColor = new THREE.Color();

    const getFlameColor = (progress: number, target: THREE.Color) => {
      if (progress < 0.3) {
        target.copy(cWhiteHot).lerp(cFlameCoral, progress / 0.3);
      } else if (progress < 0.7) {
        target.copy(cFlameCoral).lerp(cFlameRose, (progress - 0.3) / 0.4);
      } else {
        target.copy(cFlameRose).lerp(cFlameDeep, (progress - 0.7) / 0.3);
      }
    };

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

    let animationFrameId: number;
    let lastTime = performance.now();
    let isVisible = true;

    const render = (time: number) => {
      const delta = Math.min((time - lastTime) * 0.001, 0.05);
      lastTime = time;

      if (!isVisible) {
        animationFrameId = requestAnimationFrame(render);
        return;
      }

      const tSec = time * 0.001;

      // 1. Update Flames (Subtle warm glow behind text)
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

        p.y += p.vy * delta;
        const flutter = Math.sin(tSec * 3 + p.seed) * 4 * (1 - progress * 0.4);
        p.x += (p.vx + flutter) * delta;

        if (isHovering) {
          const dx = p.x - mouseX;
          const dy = p.y - mouseY;
          const distSq = dx * dx + dy * dy;
          if (distSq < 3600 && distSq > 0) {
            const force = (1 - Math.sqrt(distSq) / 60) * 35;
            p.x += (dx / Math.sqrt(distSq)) * force * delta;
            p.y += 18 * delta;
          }
        }

        posAttr.setXYZ(i, p.x, p.y, 0);

        getFlameColor(progress, tempColor);
        colAttr.setXYZ(i, tempColor.r, tempColor.g, tempColor.b);

        const currentSize = p.size * (0.85 + Math.sin(progress * Math.PI) * 0.4);
        sizeAttr.setX(i, currentSize);

        // Vibrant yet clean alpha so flame is nicely visible while text remains 100% readable
        const alpha = Math.sin(progress * Math.PI) * 0.52;
        alphaAttr.setX(i, alpha);
      }

      posAttr.needsUpdate = true;
      colAttr.needsUpdate = true;
      sizeAttr.needsUpdate = true;
      alphaAttr.needsUpdate = true;

      // 2. Update Embers (Sparks flying up)
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
        ep.x += (ep.vx + Math.sin(tSec * ep.wobbleSpeed + i) * 6) * delta;

        if (isHovering) {
          const dx = ep.x - mouseX;
          const dy = ep.y - mouseY;
          const distSq = dx * dx + dy * dy;
          if (distSq < 4500 && distSq > 0) {
            const force = (1 - Math.sqrt(distSq) / 67) * 45;
            ep.x += (dx / Math.sqrt(distSq)) * force * delta;
            ep.y += 25 * delta;
          }
        }

        ePosAttr.setXYZ(i, ep.x, ep.y, 0);

        const sparkColor = emberPalette[ep.colorIdx];
        const twinkle = 0.7 + Math.sin(tSec * 14 + i * 2) * 0.3;
        eColAttr.setXYZ(i, sparkColor.r * twinkle, sparkColor.g * twinkle, sparkColor.b * twinkle);

        eSizeAttr.setX(i, ep.size * (1 - progress * 0.35));
        eAlphaAttr.setX(i, (1 - progress) * 0.88 * twinkle);
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
        Placed BEHIND text (z-0) with pointer-events-none.
        Particles spawn as delicate halo and sparks rising upward without covering letters.
      */}
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className="pointer-events-none absolute -left-6 -right-6 -top-10 -bottom-2 z-0 w-[calc(100%+48px)] h-[calc(100%+48px)]"
      />

      {/* 
        Burning Title Text: 
        Rendered IN FRONT (z-20) with razor-sharp typography and fiery gradient.
        100% crystal-clear readability!
      */}
      <span
        ref={textRef}
        className={`relative z-20 burning-fire-text font-serif font-bold sm:font-extrabold tracking-tight select-text ${textClassName}`}
      >
        {text}
      </span>
    </div>
  );
}
