import { useEffect, useState } from "react";
import ThemeToggle from "./ThemeToggle";

const Nav = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { href: "#work", label: "Work" },
    { href: "#services", label: "Services" },
    { href: "#process", label: "Process" },
    { href: "#studio", label: "Studio" },
  ];

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled ? "py-3 backdrop-blur-md bg-paper/70 border-b border-ink/10" : "py-6 bg-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-[1400px] items-center justify-between px-6 md:px-10">
        <a href="#top" className="flex items-center gap-2">
          <span className="font-display text-2xl font-medium tracking-tight text-ink">
            Groviadigi
          </span>
          <span className="pulse-dot" aria-hidden />
        </a>

        <ul className="hidden md:flex items-center gap-10 font-mono-tag text-ink-soft">
          {links.map((l) => (
            <li key={l.href}>
              <a href={l.href} className="link-underline hover:text-ink">
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden md:flex items-center gap-4">
          <ThemeToggle />
          <a href="#contact" className="pill-cta text-sm">
            Start a project
            <span aria-hidden>→</span>
          </a>
        </div>

        <button
          aria-label="Menu"
          onClick={() => setOpen((v) => !v)}
          className="md:hidden flex flex-col gap-1.5"
        >
          <span className={`h-px w-7 bg-ink transition-transform ${open ? "translate-y-1.5 rotate-45" : ""}`} />
          <span className={`h-px w-7 bg-ink transition-transform ${open ? "-translate-y-1 -rotate-45" : ""}`} />
        </button>
      </nav>

      {open && (
        <div className="md:hidden border-t border-ink/10 bg-paper">
          <ul className="flex flex-col px-6 py-6 gap-4">
            {links.map((l) => (
              <li key={l.href}>
                <a href={l.href} onClick={() => setOpen(false)} className="font-display text-3xl text-ink">
                  {l.label}
                </a>
              </li>
            ))}
            <li>
              <a href="#contact" onClick={() => setOpen(false)} className="pill-cta mt-2">
                Start a project <span>→</span>
              </a>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
};

export default Nav;
