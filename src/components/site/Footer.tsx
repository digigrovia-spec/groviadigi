const Footer = () => {
  return (
    <footer className="bg-invert text-invert-fg border-t border-invert-fg/10">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10 py-16">
        <div className="grid md:grid-cols-12 gap-10">
          <div className="md:col-span-6">
            <p className="font-display text-6xl md:text-8xl leading-none">
              Grovia<span className="italic font-light text-invert-fg-soft/70">digi</span>
              <span className="text-bright">.</span>
            </p>
          </div>
          <div className="md:col-span-2">
            <p className="font-mono-tag text-invert-fg-muted mb-4">Studio</p>
            <ul className="space-y-2 text-invert-fg-soft/80">
              <li><a href="#work" className="link-underline">Work</a></li>
              <li><a href="#services" className="link-underline">Services</a></li>
              <li><a href="#process" className="link-underline">Process</a></li>
              <li><a href="#studio" className="link-underline">About</a></li>
            </ul>
          </div>
          <div className="md:col-span-2">
            <p className="font-mono-tag text-invert-fg-muted mb-4">Social</p>
            <ul className="space-y-2 text-invert-fg-soft/80">
              <li><a href="#" className="link-underline">Instagram</a></li>
              <li><a href="#" className="link-underline">LinkedIn</a></li>
              <li><a href="#" className="link-underline">Behance</a></li>
              <li><a href="#" className="link-underline">Dribbble</a></li>
            </ul>
          </div>
          <div className="md:col-span-2">
            <p className="font-mono-tag text-invert-fg-muted mb-4">Contact</p>
            <ul className="space-y-2 text-invert-fg-soft/80">
              <li>hello@groviadigi.com</li>
              <li>Rajasthan, IN</li>
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
};

export default Footer;
