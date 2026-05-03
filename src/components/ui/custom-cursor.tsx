"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Custom cursor — fully CSS/DOM-driven.
 * No Framer Motion springs here; we write directly to element.style.transform
 * so the browser compositor handles all movement on the GPU thread without
 * triggering React re-renders on every mousemove.
 */
export const CustomCursor = () => {
  const [isCapable, setIsCapable] = useState(false);
  const outerRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);

  // Spring state — runs entirely outside React's render cycle
  const pos = useRef({ x: -100, y: -100 });
  const spring = useRef({ x: -100, y: -100 });
  const rafId = useRef<number>(0);
  const isHovered = useRef(false);

  useEffect(() => {
    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    if (!isTouch) setIsCapable(true);
  }, []);

  useEffect(() => {
    if (!isCapable) return;

    const STIFFNESS = 0.18; // spring lerp factor — lower = smoother/laggier

    const tick = () => {
      // Lerp the outer ring toward the real cursor position
      spring.current.x += (pos.current.x - spring.current.x) * STIFFNESS;
      spring.current.y += (pos.current.y - spring.current.y) * STIFFNESS;

      if (outerRef.current) {
        outerRef.current.style.transform = `translate3d(${spring.current.x - 16}px, ${spring.current.y - 16}px, 0)`;
      }
      // Inner dot follows exactly — no lag
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${pos.current.x - 3}px, ${pos.current.y - 3}px, 0)`;
      }
      rafId.current = requestAnimationFrame(tick);
    };

    rafId.current = requestAnimationFrame(tick);

    const onMouseMove = (e: MouseEvent) => {
      pos.current.x = e.clientX;
      pos.current.y = e.clientY;
    };

    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const interactive = target.closest(
        'a, button, input, textarea, label, select, [role="button"], .interactive-cursor'
      );
      const hovered = !!interactive;
      if (hovered === isHovered.current) return; // skip if no change
      isHovered.current = hovered;
      if (outerRef.current) {
        outerRef.current.style.width = hovered ? "56px" : "32px";
        outerRef.current.style.height = hovered ? "56px" : "32px";
        outerRef.current.style.marginLeft = hovered ? "-12px" : "0";
        outerRef.current.style.marginTop = hovered ? "-12px" : "0";
        outerRef.current.style.background = hovered ? "hsl(var(--primary) / 0.1)" : "transparent";
        outerRef.current.style.borderColor = hovered ? "hsl(var(--primary) / 0.6)" : "hsl(var(--primary) / 0.3)";
      }
      if (dotRef.current) {
        dotRef.current.style.opacity = hovered ? "0" : "1";
      }
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    window.addEventListener("mouseover", onMouseOver, { passive: true });

    return () => {
      cancelAnimationFrame(rafId.current);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseover", onMouseOver);
    };
  }, [isCapable]);

  if (!isCapable) return null;

  return (
    <>
      {/* Outer Atmosphere */}
      <div
        ref={outerRef}
        aria-hidden="true"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: 32,
          height: 32,
          border: "1.5px solid hsl(var(--primary) / 0.3)",
          borderRadius: "999px",
          pointerEvents: "none",
          zIndex: 9999,
          willChange: "transform",
          transition: "width 0.4s cubic-bezier(0.23, 1, 0.32, 1), height 0.4s cubic-bezier(0.23, 1, 0.32, 1), background 0.4s ease, border-color 0.4s ease, margin 0.4s cubic-bezier(0.23, 1, 0.32, 1)",
        }}
        className="hidden md:block"
      />
      {/* Inner Dot */}
      <div
        ref={dotRef}
        aria-hidden="true"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: 6,
          height: 6,
          background: "hsl(var(--primary))",
          borderRadius: "999px",
          pointerEvents: "none",
          zIndex: 9999,
          willChange: "transform",
          transition: "opacity 0.2s ease, transform 0.2s ease",
        }}
        className="hidden md:block"
      />
    </>
  );
};
