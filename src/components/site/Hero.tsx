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
      className="relative overflow-hidden bg-transparent grain pt-24 pb-12 md:pt-32 md:pb-16"
      onMouseMove={parallaxEnabled ? handleMouseMove : undefined}
      onMouseLeave={parallaxEnabled ? handleMouseLeave : undefined}
    >
      <div className="mx-auto max-w-[1400px] px-6 md:px-10 relative z-10">
        {/* Top meta line */}
        <div className="flex items-center justify-between font-mono-tag text-ink-muted mb-16 md:mb-24">
          <span>Index — 001</span>
          <span className="hidden md:inline">Marketing That Doesn&apos;t Just Look Good. It Grow Businesses.</span>
          <span>EST · 2026</span>
        </div>

        <h1
          ref={titleRef}
          className="font-display text-ink dark:text-teal leading-[0.85] text-[12vw] md:text-[13vw] lg:text-[12vw] xl:text-[11.5vw] w-full"
          style={{
            willChange: parallaxEnabled ? "transform" : "auto",
            transition: "transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)",
          }}
        >
          <span className="block text-white mb-2 md:mb-4">Marketing</span>
          <span className="block font-serif mb-2 md:mb-4">
            <span className="text-blue">that grows</span>
          </span>
          <span className="block text-white">Businesses.</span>
        </h1>

        <div className="mt-16 md:mt-24 grid md:grid-cols-12 gap-10 items-end">
          <div className="md:col-span-6 md:col-start-1">
            <p className="font-mono-tag text-ink-muted mb-4">[ 01 — Who we are ]</p>
            <p className="text-ink-soft text-lg md:text-xl leading-relaxed font-sans">
              We&apos;re a digital marketing agency built in Rajasthan for ambitious Indian brands.
              From restaurants and jewellery houses to startups and SMEs we run the strategy,
              creative, ads, SEO, and AI systems that fill your pipeline and keep it full.
            </p>
          </div>

          <div className="md:col-span-4 md:col-start-9 flex flex-col gap-5">
            <Magnetic>
              <a href="#contact" className="pill-cta justify-between text-base w-full">
                Book a Free Strategy Call
                <span aria-hidden>→</span>
              </a>
            </Magnetic>
            <Magnetic>
              <a href="#services" className="pill-ghost justify-between text-base w-full">
                See What We Do
                <span aria-hidden>↓</span>
              </a>
            </Magnetic>
          </div>
        </div>

        {/* Trust Strip */}
        <div className="mt-24 pt-8 border-t border-ink/10">
          <p className="font-mono-tag text-ink-muted text-center tracking-widest uppercase text-xs md:text-sm">
            Built in Rajasthan · Trusted across India · AI-Augmented · Results-Obsessed · Est. 2026
          </p>
        </div>
      </div>
    </section>
  );
});

Hero.displayName = "Hero";

export default Hero;
