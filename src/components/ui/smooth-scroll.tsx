"use client";

import { useEffect } from "react";

/**
 * Smooth scroll via Lenis — disabled on:
 * - Touch-primary devices (phones/tablets already have native momentum)
 * - Users who prefer reduced motion
 * - Low-end hardware (< 6 logical cores — Intel dual-core Macs included)
 */
export const SmoothScroll = () => {
  useEffect(() => {
    const isTouchPrimary = window.matchMedia("(pointer: coarse)").matches;
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    // Raise threshold to 6 — Intel dual/quad core Macs report 4 or less
    const isLowEnd = navigator.hardwareConcurrency <= 6;

    // Skip Lenis on lower-end devices to save an entire RAF loop
    if (isTouchPrimary || prefersReduced || isLowEnd) return;

    let lenis: InstanceType<typeof import("lenis").default> | null = null;
    let rafId: number;

    import("lenis").then((mod) => {
      const Lenis = mod.default;
      lenis = new Lenis({
        duration: 1.0,          // Slightly snappier — less perceived lag
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: "vertical",
        gestureOrientation: "vertical",
        smoothWheel: true,
        wheelMultiplier: 0.9,  // Slightly reduced to prevent over-shooting
        touchMultiplier: 2,
        infinite: false,
      });

      const raf = (time: number) => {
        lenis?.raf(time);
        rafId = requestAnimationFrame(raf);
      };
      rafId = requestAnimationFrame(raf);
    });

    return () => {
      cancelAnimationFrame(rafId);
      lenis?.destroy();
    };
  }, []);

  return null;
};
