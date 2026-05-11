"use client";

import { useEffect, useRef } from "react";

// ─── Snowfall Config ──────────────────────────────────────────────────────────

const SNOW = {
  count: 120,
  minR: 1.2,
  maxR: 5.5,
  minSpeed: 0.4,
  maxSpeed: 1.2,
  swayAmp: 1.1,
  minOp: 0.40,
  maxOp: 0.85,
  windR: 220,
  windStr: 0.32,
  vxDamp: 0.93,
  vyBlend: 0.07,
  maxDPR: 2,
} as const;

// ─── Colors ───────────────────────────────────────────────────────────────────

function hslToRgb(h: number, s: number, l: number): readonly [number, number, number] {
  s /= 100; l /= 100;
  const k = (n: number) => (n + h / 30) % 12;
  const a = s * Math.min(l, 1 - l);
  const f = (n: number) => l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));
  return [Math.round(f(0) * 255), Math.round(f(8) * 255), Math.round(f(4) * 255)] as const;
}

type Rgb = readonly [number, number, number];

// Icy brand tones — visible on cream, feel like snow
const PALETTE: readonly Rgb[] = [
  hslToRgb(195, 65, 55),
  hslToRgb(195, 55, 62),
  hslToRgb(200, 50, 70),
  hslToRgb(195, 40, 78),
  hslToRgb(210, 30, 72),
];

function pick<T>(arr: readonly T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

// ─── Snowflake ────────────────────────────────────────────────────────────────

interface Snowflake {
  x: number; y: number;
  baseSpeed: number;
  vx: number; vy: number;
  r: number; rgb: Rgb;
  op: number;
  swayPhase: number;
  swaySpd: number;
}

function mkFlake(W: number, H: number, fromTop = false): Snowflake {
  const r = SNOW.minR + Math.random() * (SNOW.maxR - SNOW.minR);
  const t = (r - SNOW.minR) / (SNOW.maxR - SNOW.minR);
  const baseSpeed = SNOW.minSpeed + t * (SNOW.maxSpeed - SNOW.minSpeed);
  return {
    x: Math.random() * W,
    y: fromTop ? -(r + Math.random() * H * 0.3) : Math.random() * H,
    baseSpeed,
    vx: (Math.random() - 0.5) * 0.3,
    vy: baseSpeed,
    r, rgb: pick(PALETTE),
    op: SNOW.minOp + Math.random() * (SNOW.maxOp - SNOW.minOp),
    swayPhase: Math.random() * Math.PI * 2,
    swaySpd: 0.008 + Math.random() * 0.012,
  };
}

// ─── Component ────────────────────────────────────────────────────────────────

export function BackgroundCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const isCoarse = window.matchMedia("(pointer: coarse)").matches;

    let rafId = 0;
    let paused = false;
    let W = 0, H = 0, dpr = 1;
    let flakes: Snowflake[] = [];
    let mouseX = -9999, mouseY = -9999;
    let prevMouseX = -9999, prevMouseY = -9999;

    // ── Setup ─────────────────────────────────────────────────────────────────
    function resize() {
      dpr = Math.min(window.devicePixelRatio || 1, SNOW.maxDPR);
      W = window.innerWidth;
      H = window.innerHeight;
      canvas!.width  = Math.round(W * dpr);
      canvas!.height = Math.round(H * dpr);
      canvas!.style.width  = `${W}px`;
      canvas!.style.height = `${H}px`;
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function spawn() {
      flakes = Array.from({ length: SNOW.count }, () => mkFlake(W, H, false));
    }

    // ── Draw ──────────────────────────────────────────────────────────────────
    function draw() {
      ctx!.clearRect(0, 0, W, H);

      const mouseDX = mouseX - prevMouseX;
      const mouseDY = mouseY - prevMouseY;
      prevMouseX = mouseX;
      prevMouseY = mouseY;
      const hasWind = !isCoarse && (Math.abs(mouseDX) > 0.5 || Math.abs(mouseDY) > 0.5);

      for (const f of flakes) {
        // Mouse wind
        if (hasWind) {
          const dx = f.x - mouseX;
          const dy = f.y - mouseY;
          const dist2 = dx * dx + dy * dy;
          if (dist2 < SNOW.windR * SNOW.windR && dist2 > 0) {
            const dist = Math.sqrt(dist2);
            const strength = (1 - dist / SNOW.windR) * SNOW.windStr;
            f.vx += mouseDX * strength * 0.12;
            f.vy += mouseDY * strength * 0.08;
          }
        }

        // Damp & restore natural fall
        f.vx *= SNOW.vxDamp;
        f.vy  = f.vy * (1 - SNOW.vyBlend) + f.baseSpeed * SNOW.vyBlend;

        // Sway + move
        f.swayPhase += f.swaySpd;
        f.x += f.vx + Math.sin(f.swayPhase) * SNOW.swayAmp;
        f.y += f.vy;

        // Horizontal wrap
        if (f.x < -f.r) f.x = W + f.r;
        else if (f.x > W + f.r) f.x = -f.r;

        // Vertical reset
        if (f.y > H + f.r) {
          f.x = Math.random() * W;
          f.y = -f.r;
          f.vx = (Math.random() - 0.5) * 0.3;
          f.vy = f.baseSpeed;
          f.swayPhase = Math.random() * Math.PI * 2;
        }

        // Glow halo on larger flakes
        if (f.r >= 2.5) {
          const glow = ctx!.createRadialGradient(f.x, f.y, 0, f.x, f.y, f.r * 2.2);
          glow.addColorStop(0,   `rgba(${f.rgb[0]},${f.rgb[1]},${f.rgb[2]},${f.op.toFixed(3)})`);
          glow.addColorStop(0.4, `rgba(${f.rgb[0]},${f.rgb[1]},${f.rgb[2]},${(f.op * 0.5).toFixed(3)})`);
          glow.addColorStop(1,   `rgba(${f.rgb[0]},${f.rgb[1]},${f.rgb[2]},0)`);
          ctx!.beginPath();
          ctx!.arc(f.x, f.y, f.r * 2.2, 0, Math.PI * 2);
          ctx!.fillStyle = glow;
          ctx!.fill();
        }

        // Solid core
        ctx!.beginPath();
        ctx!.arc(f.x, f.y, f.r, 0, Math.PI * 2);
        ctx!.fillStyle = `rgba(${f.rgb[0]},${f.rgb[1]},${f.rgb[2]},${f.op.toFixed(3)})`;
        ctx!.fill();
      }
    }

    // ── Loop ──────────────────────────────────────────────────────────────────
    function loop() {
      if (!paused) draw();
      rafId = requestAnimationFrame(loop);
    }

    // ── Events ────────────────────────────────────────────────────────────────
    function onMouse(e: MouseEvent) { mouseX = e.clientX; mouseY = e.clientY; }
    function onVisibility() { paused = document.hidden; }
    function onResize() { resize(); spawn(); }

    resize();
    spawn();
    loop();

    if (!isCoarse) window.addEventListener("mousemove", onMouse, { passive: true });
    window.addEventListener("resize", onResize, { passive: true });
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      cancelAnimationFrame(rafId);
      if (!isCoarse) window.removeEventListener("mousemove", onMouse);
      window.removeEventListener("resize", onResize);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position: "fixed",
        inset: 0,
        width: "100%",
        height: "100%",
        zIndex: 1,
        pointerEvents: "none",
        // Multiply blends snow INTO the cream/ink section backgrounds
        // so flakes feel embedded in the surface rather than floating above it.
        mixBlendMode: "multiply",
      }}
    />
  );
}
