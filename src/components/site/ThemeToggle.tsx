import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

const ThemeToggle = () => {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("theme");
    const prefers = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const isDark = stored ? stored === "dark" : prefers;
    setDark(isDark);
    document.documentElement.classList.toggle("dark", isDark);
  }, []);

  const toggle = () => {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem("theme", next ? "dark" : "light");
  };

  return (
    <button
      onClick={toggle}
      aria-label="Toggle theme"
      className="relative h-9 w-[68px] rounded-full border border-ink/20 bg-paper-deep transition-colors hover:border-ink/40 overflow-hidden"
    >
      {/* Track icons */}
      <span className="absolute inset-0 flex items-center justify-between px-2 text-ink-muted">
        <Sun className="h-3.5 w-3.5" strokeWidth={1.5} />
        <Moon className="h-3.5 w-3.5" strokeWidth={1.5} />
      </span>
      {/* Knob */}
      <span
        className={`absolute top-1/2 left-1 -translate-y-1/2 h-7 w-7 rounded-full bg-ink transition-transform duration-500 ease-out flex items-center justify-center ${
          dark ? "translate-x-[32px]" : "translate-x-0"
        }`}
      >
        {dark ? (
          <Moon className="h-3.5 w-3.5 text-bright" strokeWidth={2} />
        ) : (
          <Sun className="h-3.5 w-3.5 text-bright" strokeWidth={2} />
        )}
      </span>
    </button>
  );
};

export default ThemeToggle;
