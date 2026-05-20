"use client";

import { memo } from "react";
import { Instagram, Linkedin, Twitter } from "lucide-react";

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
            <p className="font-display text-5xl md:text-7xl leading-none">
              Lamaira<span className="italic font-light text-teal">Travel</span>
              <span className="text-bright">.</span>
            </p>
          </div>
          <div className="md:col-span-2">
            <p className="font-mono-tag text-invert-fg-muted mb-4">Explore</p>
            <ul className="space-y-2 text-invert-fg-soft/80">
              <li><a href="#services" onClick={(e) => handleScroll(e, "#services")} className="link-underline">Services</a></li>
              <li><a href="#packages" onClick={(e) => handleScroll(e, "#packages")} className="link-underline">Packages</a></li>
              <li><a href="#gallery" onClick={(e) => handleScroll(e, "#gallery")} className="link-underline">Gallery</a></li>
              <li><a href="#about" onClick={(e) => handleScroll(e, "#about")} className="link-underline">About Us</a></li>
            </ul>
          </div>
          <div className="md:col-span-2">
            <p className="font-mono-tag text-invert-fg-muted mb-4">Connect</p>
            <div className="flex gap-4 text-invert-fg-soft/80">
              <a href="#" aria-label="Instagram" className="hover:text-bright transition-colors">
                <Instagram size={20} strokeWidth={1.5} />
              </a>
              <a href="#" aria-label="LinkedIn" className="hover:text-bright transition-colors">
                <Linkedin size={20} strokeWidth={1.5} />
              </a>
              <a href="#" aria-label="Twitter" className="hover:text-bright transition-colors">
                <Twitter size={20} strokeWidth={1.5} />
              </a>
            </div>
          </div>
          <div className="md:col-span-2">
            <a href="#contact" onClick={(e) => handleScroll(e, "#contact")} className="font-mono-tag text-invert-fg-muted mb-4 block hover:text-teal transition-colors">Contact</a>
            <ul className="space-y-2 text-invert-fg-soft/80">
              <li className="whitespace-nowrap overflow-hidden text-ellipsis">salesfna@lamairatravel.com</li>
              <li>+232 78 676 849</li>
              <li>Accra, Ghana</li>
            </ul>
          </div>
        </div>

        <div className="mt-20 pt-8 border-t border-invert-fg/10 flex flex-col md:flex-row justify-between gap-4 font-mono-tag text-invert-fg-muted">
          <span>© {new Date().getFullYear()} Lamaira Travel · All rights reserved</span>
          <span>Your Trusted International Travel Partner</span>
        </div>
      </div>
    </footer>
  );
});

Footer.displayName = "Footer";

export default Footer;
