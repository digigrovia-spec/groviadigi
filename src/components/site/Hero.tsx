"use client";

import { useRef, useCallback, useEffect, useState, memo } from "react";
import { Magnetic } from "@/components/ui/magnetic";

/**
 * Hero section using GPU-accelerated CSS transitions for parallax.
 * Achieves the exact same smooth visual effect as Framer Motion springs
 * but offloads the animation to the compositor thread for zero lag.
 */
const Hero = memo(() => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const [year, setYear] = useState("");
  const [parallaxEnabled, setParallaxEnabled] = useState(false);

  useEffect(() => {
    setYear(new Date().getFullYear().toString());
    const isTouchPrimary = window.matchMedia("(pointer: coarse)").matches;
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isLowEnd = navigator.hardwareConcurrency < 4;
    if (!isTouchPrimary && !prefersReduced && !isLowEnd) {
      setParallaxEnabled(true);
    }
  }, []);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!parallaxEnabled) return;
      // Using window dimensions avoids layout thrashing
      const xPct = (e.clientX / window.innerWidth) - 0.5;
      const yPct = (e.clientY / window.innerHeight) - 0.5;

      if (titleRef.current) {
        titleRef.current.style.transform = `translate3d(${xPct * -4}%, ${yPct * -4}%, 0)`;
      }
    },
    [parallaxEnabled]
  );

  const handleMouseLeave = useCallback(() => {
    if (titleRef.current) titleRef.current.style.transform = "translate3d(0, 0, 0)";
  }, []);

  return (
    <section
      ref={sectionRef}
      id="top"
      className="relative overflow-hidden bg-paper grain pt-24 pb-24 md:pt-32 md:pb-32"
      onMouseMove={parallaxEnabled ? handleMouseMove : undefined}
      onMouseLeave={parallaxEnabled ? handleMouseLeave : undefined}
    >
      <div className="mx-auto max-w-[1400px] px-6 md:px-10 relative z-10">
        {/* Top meta line */}
        <div className="flex items-center justify-between font-mono-tag text-ink-muted mb-16 md:mb-24">
          <span>Index — 001</span>
          <span className="hidden md:inline">New studio · Founding cohort</span>
          <span>EST · {year || "2026"}</span>
        </div>

        <h1
          ref={titleRef}
          className="font-display text-ink leading-[0.85] text-[14vw] md:text-[15.5vw] lg:text-[14.2vw] xl:text-[13.6vw] w-full"
          style={{
            willChange: parallaxEnabled ? "transform" : "auto",
            transition: "transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)",
          }}
        >
          <span className="block">Growth,</span>
          <span className="block font-serif">
            beautifully<span className="text-blue">.</span>
          </span>
          <span className="block">engineered.</span>
        </h1>

        <div className="mt-16 md:mt-24 grid md:grid-cols-12 gap-10 items-end">
          <div className="md:col-span-5 md:col-start-1">
            <p className="font-mono-tag text-ink-muted mb-4">[ 01 — What we do ]</p>
            <p className="text-ink-soft text-lg md:text-xl leading-relaxed font-sans">
              Groviadigi is a new digital studio building brand systems and
              performance engines for founders who want growth without the
              agency theatre. Small by design. Hungry by default.
            </p>
          </div>

          <div className="md:col-span-4 md:col-start-9 flex flex-col gap-5">
            {/* Availability card */}
            <div className="border border-ink/15 rounded-sm p-5 bg-paper-deep/40 backdrop-blur-sm">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <span className="pulse-dot" aria-hidden />
                  <span className="font-mono-tag text-ink-soft">Founding clients · open</span>
                </div>
                <span className="font-mono-tag text-ink-muted">0 / 3</span>
              </div>
              <p className="font-display text-2xl text-ink leading-[0.9]">
                Three founding partners <span className="font-serif text-teal">at studio rates</span> — for the work that builds our book.
              </p>
              <div className="mt-4 h-px w-full bg-ink/10 relative overflow-hidden">
                <span className="absolute inset-y-0 left-0 w-0 bg-blue" />
              </div>
            </div>

            <Magnetic>
              <a href="#contact" className="pill-cta justify-between text-base w-full">
                Start a project
                <span aria-hidden>→</span>
              </a>
            </Magnetic>
            <Magnetic>
              <a href="#work" className="pill-ghost justify-between text-base w-full">
                See selected work
                <span aria-hidden>↓</span>
              </a>
            </Magnetic>
          </div>
        </div>
      </div>
    </section>
  );
});

Hero.displayName = "Hero";

export default Hero;
