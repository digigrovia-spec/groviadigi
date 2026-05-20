"use client";

import { memo } from "react";
import { Instagram, Linkedin, Dribbble } from "lucide-react";

const Behance = ({ size = 24, ...props }: any) => (
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

const Footer = memo(() => {
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
    <footer className="bg-invert text-invert-fg border-t border-invert-fg/10">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10 py-16">
        <div className="grid md:grid-cols-12 gap-10">
          <div className="md:col-span-6">
            <p className="font-display text-6xl md:text-8xl leading-none">
              Grovia<span className="italic font-light text-teal">digi</span>
              <span className="text-bright">.</span>
            </p>
          </div>
          <div className="md:col-span-2">
            <p className="font-mono-tag text-invert-fg-muted mb-4">Studio</p>
            <ul className="space-y-2 text-invert-fg-soft/80">
              <li><a href="#services" onClick={(e) => handleScroll(e, "#services")} className="link-underline">Services</a></li>
              <li><a href="#process" onClick={(e) => handleScroll(e, "#process")} className="link-underline">Process</a></li>
              <li><a href="#work" onClick={(e) => handleScroll(e, "#work")} className="link-underline">Work</a></li>
              <li><a href="#industries" onClick={(e) => handleScroll(e, "#industries")} className="link-underline">Industries</a></li>
            </ul>
          </div>
          <div className="md:col-span-2">
            <p className="font-mono-tag text-invert-fg-muted mb-4">Social</p>
            <div className="flex gap-4 text-invert-fg-soft/80">
              <a href="https://www.instagram.com/groviadigi" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="hover:text-bright transition-colors">
                <Instagram size={20} strokeWidth={1.5} />
              </a>
              <a href="#" aria-label="LinkedIn" className="hover:text-bright transition-colors">
                <Linkedin size={20} strokeWidth={1.5} />
              </a>
              <a href="#" aria-label="Behance" className="hover:text-bright transition-colors">
                <Behance size={20} strokeWidth={1.5} />
              </a>
              <a href="#" aria-label="Dribbble" className="hover:text-bright transition-colors">
                <Dribbble size={20} strokeWidth={1.5} />
              </a>
            </div>
          </div>
          <div className="md:col-span-2">
            <a href="#contact" onClick={(e) => handleScroll(e, "#contact")} className="font-mono-tag text-invert-fg-muted mb-4 block hover:text-teal transition-colors">Contact</a>
            <ul className="space-y-2 text-invert-fg-soft/80">
              <li className="whitespace-nowrap">Hello@groviadigi.in</li>
              <li>+91 93520 00935</li>
              <li>Rajasthan</li>
            </ul>
          </div>
        </div>

        <div className="mt-20 pt-8 border-t border-invert-fg/10 flex flex-col md:flex-row justify-between gap-4 font-mono-tag text-invert-fg-muted">
          <span>© {new Date().getFullYear()} Groviadigi · All rights reserved</span>
          <span>Crafted with intent · v1.0</span>
        </div>
      </div>
    </footer>
  );
});

Footer.displayName = "Footer";

export default Footer;
