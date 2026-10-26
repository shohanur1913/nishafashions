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

    let width = 260;
    let height = 70;

    const updateSize = () => {
      if (!canvas || !renderer) return;
      const rect = canvas.getBoundingClientRect();
      width = Math.max(rect.width, 100);
      height = Math.max(rect.height, 40);

      renderer.setSize(width, height, false);
      camera.left = 0;
      camera.right = width;
      camera.top = height;
      camera.bottom = 0;
      camera.updateProjectionMatrix();
    };

    updateSize();

    // ----------------------------------------------------
    // 1. SUBTLE DANCING FLAMES (Around text edges & baseline)
    // Delicate, translucent flame tongues that don't block text
    // ----------------------------------------------------
    const FLAME_COUNT = 85;
    const flameGeo = new THREE.BufferGeometry();
    const flamePos = new Float32Array(FLAME_COUNT * 3);
    const flameColor = new Float32Array(FLAME_COUNT * 3);
    const flameSize = new Float32Array(FLAME_COUNT);
    const flameAlpha = new Float32Array(FLAME_COUNT);

    const flameData: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      life: number;
      maxLife: number;
      size: number;
      seed: number;
    }> = [];

    const resetFlame = (idx: number, fullRandomY = false) => {
      const x = Math.random() * (width * 0.94) + width * 0.03;
      const maxLife = 0.9 + Math.random() * 0.8;
      const life = fullRandomY ? Math.random() * maxLife : 0;
      // Start near the baseline of the text
      const y = fullRandomY ? (life / maxLife) * (height * 0.7) : Math.random() * (height * 0.25);

      flameData[idx] = {
        x,
        y,
        vx: (Math.random() - 0.5) * 8,
        vy: 16 + Math.random() * 24,
        life,
        maxLife,
        size: 5 + Math.random() * 7, // Small, delicate flame size
        seed: Math.random() * 500,
      };
    };

    for (let i = 0; i < FLAME_COUNT; i++) {
      resetFlame(i, true);
    }

    // ----------------------------------------------------
    // 2. SPARKLING EMBERS (Tiny floating fiery specks)
    // ----------------------------------------------------
    const EMBER_COUNT = 65;
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
      const maxLife = 1.1 + Math.random() * 1.4;
      const life = fullRandomY ? Math.random() * maxLife : 0;
      const y = fullRandomY ? (life / maxLife) * height : Math.random() * (height * 0.4);

      emberData[idx] = {
        x,
        y,
        vx: (Math.random() - 0.5) * 16,
        vy: 28 + Math.random() * 42,
        life,
        maxLife,
        size: 1.8 + Math.random() * 2.8, // Tiny sharp sparks
        wobbleSpeed: 2 + Math.random() * 3,
      };
    };

    for (let i = 0; i < EMBER_COUNT; i++) {
      resetEmber(i, true);
    }

    // ----------------------------------------------------
    // GLSL Shaders for Soft Gaussian Glow Points
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

        // Smooth circular falloff with hot center
        float intensity = pow(1.0 - (dist * 2.0), 2.0);
        gl_FragColor = vec4(vColor, intensity * vAlpha);
      }
    `;

    // Flame Material with controlled translucency
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

    // Colors
    const colorWhite = new THREE.Color("#FFF8E7");
    const colorGold = new THREE.Color("#FFB703");
    const colorOrange = new THREE.Color("#FB8500");
    const colorRed = new THREE.Color("#D90429");
    const tempColor = new THREE.Color();

    const getFlameColor = (progress: number, target: THREE.Color) => {
      if (progress < 0.25) {
        target.copy(colorWhite).lerp(colorGold, progress / 0.25);
      } else if (progress < 0.65) {
        target.copy(colorGold).lerp(colorOrange, (progress - 0.25) / 0.4);
      } else {
        target.copy(colorOrange).lerp(colorRed, (progress - 0.65) / 0.35);
      }
    };

    // ----------------------------------------------------
    // Mouse Interactive Wind
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
    // Animation Loop
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

      // 1. Update Flames (Subtle dancing flame tongues)
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
        const turbulence = Math.sin(tSec * 3.5 + p.seed) * 8 * (1 - progress * 0.5);
        p.x += (p.vx + turbulence) * delta;

        // Mouse interaction
        if (isHovering) {
          const dx = p.x - mouseX;
          const dy = p.y - mouseY;
          const distSq = dx * dx + dy * dy;
          if (distSq < 5000 && distSq > 0) {
            const force = (1 - Math.sqrt(distSq) / 70) * 50;
            p.x += (dx / Math.sqrt(distSq)) * force * delta;
            p.y += 30 * delta;
          }
        }

        posAttr.setXYZ(i, p.x, p.y, 0);

        getFlameColor(progress, tempColor);
        colAttr.setXYZ(i, tempColor.r, tempColor.g, tempColor.b);

        // Controlled subtle size: does not blow out
        const currentSize = p.size * (0.8 + Math.sin(progress * Math.PI) * 0.5);
        sizeAttr.setX(i, currentSize);

        // Gentle translucent alpha (max ~0.35) so text remains 100% visible
        const alpha = Math.sin(progress * Math.PI) * 0.35;
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
        ep.x += (ep.vx + Math.sin(tSec * ep.wobbleSpeed + i) * 10) * delta;

        if (isHovering) {
          const dx = ep.x - mouseX;
          const dy = ep.y - mouseY;
          const distSq = dx * dx + dy * dy;
          if (distSq < 6400 && distSq > 0) {
            const force = (1 - Math.sqrt(distSq) / 80) * 60;
            ep.x += (dx / Math.sqrt(distSq)) * force * delta;
            ep.y += 40 * delta;
          }
        }

        ePosAttr.setXYZ(i, ep.x, ep.y, 0);

        // Ember spark colors
        if (progress < 0.35) {
          tempColor.set("#FFF59D"); // Yellow spark
        } else if (progress < 0.7) {
          tempColor.set("#FF9100"); // Orange spark
        } else {
          tempColor.set("#FF3D00"); // Red ember
        }

        const twinkle = 0.7 + Math.sin(tSec * 12 + i) * 0.3;
        eColAttr.setXYZ(i, tempColor.r * twinkle, tempColor.g * twinkle, tempColor.b * twinkle);

        eSizeAttr.setX(i, ep.size * (1 - progress * 0.4));
        eAlphaAttr.setX(i, (1 - progress) * 0.75 * twinkle);
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
      className={`relative inline-flex items-center select-none overflow-visible ${className}`}
    >
      {/* 
        Three.js Fire Particle Canvas: 
        Placed behind the text (z-0) with pointer-events-none.
        Gives a gorgeous glowing halo and rising sparks without obscuring the text!
      */}
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className="pointer-events-none absolute -inset-x-3 -top-6 -bottom-2 z-0 h-[calc(100%+32px)] w-[calc(100%+24px)]"
      />

      {/* 
        Burning Title Text: 
        Rendered IN FRONT (z-20) with razor-sharp typography and burning molten gradient.
        Crystal clear readability!
      */}
      <span className="relative z-20 burning-fire-text font-serif italic font-bold sm:font-extrabold tracking-tight">
        {text}
      </span>
    </div>
  );
}
