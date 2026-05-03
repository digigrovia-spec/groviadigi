import { useEffect } from "react";

export const useReveal = () => {
  useEffect(() => {
    const els = document.querySelectorAll<HTMLElement>(".reveal");

    // Use a single IntersectionObserver for all reveal elements
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            (e.target as HTMLElement).classList.add("in");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -60px 0px" }
    );

    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
};
