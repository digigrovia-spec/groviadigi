"use client";

import { useRef, ReactNode, useCallback, useEffect, useState } from "react";

/**
 * Magnetic hover effect — CSS transform + native requestAnimationFrame.
 * No Framer Motion dependency here; avoids importing the spring system
 * just for a simple translate effect on buttons.
 */
export const Magnetic = ({ children }: { children: ReactNode }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);
  const targetX = useRef(0);
  const targetY = useRef(0);
  const currentX = useRef(0);
  const currentY = useRef(0);
  const rafId = useRef<number>(0);
  const active = useRef(false);

  useEffect(() => {
    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    if (!isTouch) setEnabled(true);
  }, []);

  const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

  const animate = useCallback(() => {
    currentX.current = lerp(currentX.current, targetX.current, 0.18);
    currentY.current = lerp(currentY.current, targetY.current, 0.18);

    if (ref.current) {
      ref.current.style.transform = `translate3d(${currentX.current}px, ${currentY.current}px, 0)`;
    }

    // Stop animating when close enough
    const dx = Math.abs(currentX.current - targetX.current);
    const dy = Math.abs(currentY.current - targetY.current);
    if (dx > 0.05 || dy > 0.05) {
      rafId.current = requestAnimationFrame(animate);
    } else {
      active.current = false;
    }
  }, []);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!ref.current || !enabled) return;
    const rect = ref.current.getBoundingClientRect();
    targetX.current = (e.clientX - (rect.left + rect.width / 2)) * 0.3;
    targetY.current = (e.clientY - (rect.top + rect.height / 2)) * 0.3;
    if (!active.current) {
      active.current = true;
      rafId.current = requestAnimationFrame(animate);
    }
  }, [enabled, animate]);

  const handleMouseLeave = useCallback(() => {
    targetX.current = 0;
    targetY.current = 0;
    if (!active.current) {
      active.current = true;
      rafId.current = requestAnimationFrame(animate);
    }
  }, [animate]);

  useEffect(() => {
    return () => cancelAnimationFrame(rafId.current);
  }, []);

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ display: "inline-block" }}
    >
      {children}
    </div>
  );
};
