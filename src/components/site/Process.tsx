"use client";

import { useState, useEffect, memo, useCallback } from "react";

const steps = [
  { n: "01", t: "Plan", d: "Tell us your dream destination and preferences. We'll consult with you to understand exactly what you're looking for in your next journey." },
  { n: "02", t: "Curate", d: "Our travel experts design a personalized itinerary, selecting the best flights, accommodations, and experiences tailored just for you." },
  { n: "03", t: "Book", d: "Once you're happy with the plan, we handle all the bookings and paperwork, from visa assistance to insurance and local transport." },
  { n: "04", t: "Experience", d: "Travel with confidence. We provide 24/7 support throughout your trip, ensuring every moment of your adventure is perfect." },
];

const Process = memo(() => {
  const [activeStep, setActiveStep] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  // Auto-cycle the steps every 3 seconds
  useEffect(() => {
    if (isHovered) return;
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % steps.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [isHovered]);

  const handleMouseLeave = useCallback(() => setIsHovered(false), []);

  return (
    <section
      id="packages"
      className="bg-invert text-invert-fg py-28 md:py-40 relative overflow-hidden grain"
    >
      <div className="mx-auto max-w-[1400px] px-6 md:px-10 relative z-10">
        <div className="grid md:grid-cols-12 gap-10 mb-20 md:mb-28">
          <div className="md:col-span-3">
            <p className="font-mono-tag text-invert-fg-muted reveal">[ 04 — Journey ]</p>
          </div>
          <div className="md:col-span-9">
            <h2 className="font-display text-5xl md:text-7xl leading-[0.85] text-teal reveal">
              Your path to <span className="font-serif text-white dark:text-white">unforgettable memories.</span>
            </h2>
          </div>
        </div>

        <div className="relative">
          {/* Wire line — CSS-only */}
          <div className="absolute top-1/2 left-0 w-full h-px bg-invert-fg/10 -translate-y-1/2 hidden md:block z-0 overflow-hidden">
            <div
              className="absolute top-0 h-full bg-blue process-wire-pulse"
              style={{
                width: "8%",
                left: `${((activeStep + 0.5) / steps.length) * 100}%`,
                transform: "translateX(-50%)",
                transition: "left 1s cubic-bezier(0.22, 1, 0.36, 1)",
                boxShadow: "0 0 15px rgba(31,169,214,0.6)",
              }}
            />
          </div>
          <div className="absolute top-0 left-1/2 w-px h-full bg-invert-fg/10 -translate-x-1/2 md:hidden z-0 overflow-hidden">
            <div
              className="absolute left-0 w-full bg-blue"
              style={{
                height: "8%",
                top: `${((activeStep + 0.5) / steps.length) * 100}%`,
                transform: "translateY(-50%)",
                transition: "top 1s cubic-bezier(0.22, 1, 0.36, 1)",
                boxShadow: "0 0 15px rgba(31,169,214,0.6)",
              }}
            />
          </div>

          <ol
            className="grid md:grid-cols-4 gap-12 md:gap-10 relative z-10"
            onMouseLeave={handleMouseLeave}
          >
            {steps.map((s, idx) => (
              <li
                key={s.n}
                className="reveal"
                onMouseEnter={() => {
                  setActiveStep(idx);
                  setIsHovered(true);
                }}
              >
                <div
                  className="group border h-full cursor-pointer interactive-cursor"
                  style={{
                    transition: "transform 0.5s ease-out, border-color 0.5s ease-out, background-color 0.5s ease-out, box-shadow 0.5s ease-out",
                    transform: activeStep === idx ? "scale(1.06)" : "scale(1)",
                    borderColor: activeStep === idx ? "hsl(45 100% 50%)" : "hsl(42 27% 92% / 0.1)",
                    backgroundColor: activeStep === idx ? "hsl(205 24% 8%)" : "hsl(205 24% 10%)",
                    boxShadow: activeStep === idx ? "0 25px 50px -12px rgba(0,0,0,0.5)" : "none",
                    zIndex: activeStep === idx ? 20 : 10,
                  }}
                >
                  <div className="p-8 md:p-10">
                    <div className="flex items-center justify-between mb-12">
                      <span className="font-display text-blue text-5xl">{s.n}</span>
                      <span className="font-mono-tag text-invert-fg-muted">PHASE</span>
                    </div>
                    <h3 className="font-display text-3xl text-teal mb-3">{s.t}</h3>
                    <p className="text-invert-fg-soft/80 leading-relaxed font-sans">{s.d}</p>
                  </div>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
});

Process.displayName = "Process";

export default Process;
