"use client"

import { useEffect, useState, memo } from "react";
import ThemeToggle from "./ThemeToggle";
import { Magnetic } from "@/components/ui/magnetic";
import { Instagram, Linkedin, Dribbble } from "lucide-react";

const Behance = ({ size = 24, ...props }: { size?: number; [key: string]: unknown }) => (
  <svg
    width={size}
    height={size}
    {...props}
    viewBox="0 0 16 16"
    fill="currentColor"
  >
    <path d="M4.654 3c.461 0 .887.035 1.278.14.39.07.711.216.996.391s.497.426.641.747c.14.32.216.711.216 1.137 0 .496-.106.922-.356 1.242-.215.32-.566.606-.997.817.606.176 1.067.496 1.348.922s.461.957.461 1.563c0 .496-.105.922-.285 1.278a2.3 2.3 0 0 1-.782.887c-.32.215-.711.39-1.137.496a5.3 5.3 0 0 1-1.278.176L0 12.803V3zm-.285 3.978c.39 0 .71-.105.957-.285.246-.18.355-.497.355-.887 0-.216-.035-.426-.105-.567a1 1 0 0 0-.32-.355 1.8 1.8 0 0 0-.461-.176c-.176-.035-.356-.035-.567-.035H2.17v2.31c0-.005 2.2-.005 2.2-.005zm.105 4.193c.215 0 .426-.035.606-.07.176-.035.356-.106.496-.216s.25-.215.356-.39c.07-.176.14-.391.14-.641 0-.496-.14-.852-.426-1.102-.285-.215-.676-.32-1.137-.32H2.17v2.734h2.305zm6.858-.035q.428.427 1.278.426c.39 0 .746-.106 1.032-.286q.426-.32.53-.64h1.74c-.286.851-.712 1.457-1.278 1.848-.566.355-1.243.566-2.06.566a4.1 4.1 0 0 1-1.527-.285 2.8 2.8 0 0 1-1.137-.782 2.85 2.85 0 0 1-.712-1.172c-.175-.461-.25-.957-.25-1.528 0-.531.07-1.032.25-1.493.18-.46.426-.852.747-1.207.32-.32.711-.606 1.137-.782a4 4 0 0 1 1.493-.285c.606 0 1.137.105 1.598.355.46.25.817.532 1.102.958.285.39.496.851.641 1.348.07.496.105.996.07 1.563h-5.15c0 .58.21 1.11.496 1.396m2.24-3.732c-.25-.25-.642-.391-1.103-.391-.32 0-.566.07-.781.176s-.356.25-.496.39a.96.96 0 0 0-.25.497c-.036.175-.07.32-.07.46h3.196c-.07-.526-.25-.882-.497-1.132zm-3.127-3.728h3.978v.957h-3.978z" />
  </svg>
);

const Nav = memo(() => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          setScrolled(window.scrollY > 24);
          ticking = false;
        });
        ticking = true;
      }
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { href: "#services", label: "Services" },
    { href: "#packages", label: "Packages" },
    { href: "#gallery", label: "Gallery" },
    { href: "#about", label: "About Us" },
  ];

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetId = href.replace("#", "");
    const elem = document.getElementById(targetId);
    if (elem) {
      elem.scrollIntoView({
        behavior: "smooth",
      });
    }
  };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[padding,background-color,backdrop-filter] duration-500 transform-gpu will-change-[padding,background-color,backdrop-filter] gpu-layer ${scrolled ? "py-3 backdrop-blur-sm bg-paper/80 border-b border-ink/10" : "py-6 bg-transparent"
        }`}
    >
      <nav className="mx-auto flex max-w-[1400px] items-center justify-between px-6 md:px-10">
        <a
          href="#top"
          onClick={(e) => handleScroll(e, "#top")}
          className="flex items-center gap-2"
          aria-label="Lamaira Travel Home"
        >
          <span className="font-display text-2xl">
            <span className="text-teal">Lamaira</span> <span className="text-blue">Travel</span>
          </span>
        </a>

        <ul className="hidden md:flex items-center gap-10 font-mono-tag text-ink-soft">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                onClick={(e) => handleScroll(e, l.href)}
                className="link-underline hover:text-ink"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden md:flex items-center gap-4">
          <ThemeToggle />
          <Magnetic>
            <a
              href="#contact"
              onClick={(e) => handleScroll(e, "#contact")}
              className="pill-cta text-sm"
            >
              Book Now
              <span aria-hidden>→</span>
            </a>
          </Magnetic>
        </div>

        <button
          aria-label="Toggle Menu"
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((v) => !v)}
          className="md:hidden flex flex-col gap-1.5"
        >
          <span className={`h-px w-7 bg-ink transition-transform ${open ? "translate-y-1.5 rotate-45" : ""}`} aria-hidden="true" />
          <span className={`h-px w-7 bg-ink transition-transform ${open ? "-translate-y-1 -rotate-45" : ""}`} aria-hidden="true" />
        </button>
      </nav>

      {open && (
        <div id="mobile-menu" className="md:hidden border-t border-ink/10 bg-paper">
          <ul className="flex flex-col px-6 py-6 gap-4">
            {links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  onClick={(e) => {
                    setOpen(false);
                    handleScroll(e, l.href);
                  }}
                  className="font-display text-3xl text-ink"
                >
                  {l.label}
                </a>
              </li>
            ))}
            <li>
              <a
                href="#contact"
                onClick={(e) => {
                  setOpen(false);
                  handleScroll(e, "#contact");
                }}
                className="pill-cta mt-2"
              >
                Book Now <span>→</span>
              </a>
            </li>
          </ul>
          <div className="flex gap-6 px-6 py-8 border-t border-ink/5">
            <a href="#" aria-label="Instagram" className="text-ink-soft hover:text-teal transition-colors">
              <Instagram size={22} strokeWidth={1.5} />
            </a>
            <a href="#" aria-label="LinkedIn" className="text-ink-soft hover:text-teal transition-colors">
              <Linkedin size={22} strokeWidth={1.5} />
            </a>
            <a href="#" aria-label="Behance" className="text-ink-soft hover:text-teal transition-colors">
              <Behance size={22} strokeWidth={1.5} />
            </a>
            <a href="#" aria-label="Dribbble" className="text-ink-soft hover:text-teal transition-colors">
              <Dribbble size={22} strokeWidth={1.5} />
            </a>
          </div>
        </div>
      )}
    </header>
  );
});

Nav.displayName = "Nav";

export default Nav;
