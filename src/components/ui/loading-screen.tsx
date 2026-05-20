"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export const LoadingScreen = () => {
  const [isLoading, setIsLoading] = useState(true);

  const [isRendered, setIsRendered] = useState(true);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    
    const timer = setTimeout(() => {
      setIsLoading(false);
      document.body.style.overflow = "";
      window.scrollTo(0, 0);
    }, 3000);

    return () => {
      clearTimeout(timer);
      document.body.style.overflow = "";
    };
  }, []);

  if (!isRendered) return null;

  return (
    <motion.div
      key="loading-screen"
      className="fixed inset-0 z-[1000] flex items-center justify-center bg-paper"
      initial={{ opacity: 1, y: "0%", rotateX: 0, scale: 1, transformPerspective: 1000 }}
      animate={isLoading ? { opacity: 1, y: "0%", rotateX: 0, scale: 1 } : { opacity: 0, y: "-15%", rotateX: 10, scale: 0.95 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      style={{ pointerEvents: isLoading ? "auto" : "none" }}
      onAnimationComplete={() => {
        // If the exit animation completes, unmount the component
        if (!isLoading) {
          setIsRendered(false);
        }
      }}
    >
          <style>{`
            .liquid-text {
              background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='1000' viewBox='0 0 200 1000'%3E%3Cpath fill='%23004B49' d='M0,100 Q50,150 100,100 T200,100 L200,1000 L0,1000 Z'/%3E%3C/svg%3E");
              background-size: 200px 1000px;
              background-repeat: repeat-x;
              -webkit-background-clip: text;
              background-clip: text;
              color: transparent;
              animation: liquidFill 2.5s cubic-bezier(0.36, 0.45, 0.63, 0.53) forwards, liquidWave 1.2s linear infinite;
            }
            html.dark .liquid-text {
              background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='1000' viewBox='0 0 200 1000'%3E%3Cpath fill='%23FFD700' d='M0,100 Q50,150 100,100 T200,100 L200,1000 L0,1000 Z'/%3E%3C/svg%3E") !important;
            }
            @keyframes liquidWave {
              0% { background-position-x: 0px; }
              100% { background-position-x: 200px; }
            }
            @keyframes liquidFill {
              0% { background-position-y: 200px; }
              100% { background-position-y: -150px; }
            }
          `}</style>
          <div className="relative font-display text-5xl sm:text-7xl md:text-9xl font-black tracking-tighter select-none pb-[0.2em]">
            {/* The empty text base */}
            <div className="text-ink/10 text-center">Lamaira<br className="md:hidden"/>Travel</div>
            
            {/* The liquid text overlapping */}
            <div className="absolute top-0 left-0 w-full h-full liquid-text pointer-events-none text-center">
              Lamaira<br className="md:hidden"/>Travel
            </div>
          </div>
        </motion.div>
  );
};
