import { useState } from "react";
import { toast } from "sonner";

const Contact = () => {
  const [sending, setSending] = useState(false);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSending(true);
    setTimeout(() => {
      setSending(false);
      (e.target as HTMLFormElement).reset();
      toast.success("Brief received. We'll be in touch within 24h.");
    }, 900);
  };

  return (
    <section
      id="contact"
      className="bg-invert text-invert-fg py-28 md:py-40 relative overflow-hidden grain"
    >
      <div className="mx-auto max-w-[1400px] px-6 md:px-10 relative z-10">
        <div className="grid md:grid-cols-12 gap-10 mb-16">
          <div className="md:col-span-3">
            <p className="font-mono-tag text-invert-fg-muted reveal">[ 08 — Start ]</p>
          </div>
          <div className="md:col-span-9">
            <h2 className="font-display text-6xl md:text-8xl lg:text-9xl leading-[0.92] tracking-tight reveal">
              Let's build
              <br />
              <span className="italic font-light text-invert-fg-soft/70">something that</span>
              <br />
              compounds<span className="text-bright">.</span>
            </h2>
          </div>
        </div>

        <div className="grid md:grid-cols-12 gap-10 mt-16">
          <form onSubmit={onSubmit} className="md:col-span-7 md:col-start-1 space-y-8 reveal">
            <div className="grid md:grid-cols-2 gap-8">
              <label className="block">
                <span className="font-mono-tag text-invert-fg-muted">Name</span>
                <input
                  required
                  type="text"
                  className="mt-2 w-full bg-transparent border-b border-invert-fg/20 py-3 text-invert-fg placeholder:text-invert-fg/30 focus:border-bright outline-none transition-colors"
                  placeholder="Your name"
                />
              </label>
              <label className="block">
                <span className="font-mono-tag text-invert-fg-muted">Email</span>
                <input
                  required
                  type="email"
                  className="mt-2 w-full bg-transparent border-b border-invert-fg/20 py-3 text-invert-fg placeholder:text-invert-fg/30 focus:border-bright outline-none transition-colors"
                  placeholder="you@company.com"
                />
              </label>
            </div>
            <label className="block">
              <span className="font-mono-tag text-invert-fg-muted">Company</span>
              <input
                type="text"
                className="mt-2 w-full bg-transparent border-b border-invert-fg/20 py-3 text-invert-fg placeholder:text-invert-fg/30 focus:border-bright outline-none transition-colors"
                placeholder="Where you work"
              />
            </label>
            <label className="block">
              <span className="font-mono-tag text-invert-fg-muted">The brief</span>
              <textarea
                required
                rows={4}
                className="mt-2 w-full bg-transparent border-b border-invert-fg/20 py-3 text-invert-fg placeholder:text-invert-fg/30 focus:border-bright outline-none resize-none transition-colors"
                placeholder="Tell us what you're trying to move."
              />
            </label>

            <button
              type="submit"
              disabled={sending}
              className="inline-flex items-center gap-3 rounded-full px-6 py-3 transition-all duration-500 bg-bright text-bright-foreground font-medium hover:opacity-90 disabled:opacity-60"
            >
              {sending ? "Sending…" : "Send the brief"}
              <span aria-hidden>→</span>
            </button>
          </form>

          <aside className="md:col-span-4 md:col-start-9 space-y-10 reveal">
            <div>
              <p className="font-mono-tag text-invert-fg-muted mb-3">Direct</p>
              <a
                href="mailto:hello@groviadigi.com"
                className="font-display text-2xl md:text-3xl link-underline"
              >
                hello@groviadigi.com
              </a>
            </div>
            <div>
              <p className="font-mono-tag text-invert-fg-muted mb-3">Studio</p>
              <p className="text-invert-fg-soft/80 leading-relaxed">
                Ajmer, Rajasthan
                <br />
                Mon — Fri · 10:00 — 19:00 IST
              </p>
            </div>
            <div>
              <p className="font-mono-tag text-invert-fg-muted mb-3">Booking</p>
              <p className="text-invert-fg-soft/80 leading-relaxed">
                Open for founding clients.
                <br />
                Three partners at studio rates.
              </p>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
};

export default Contact;
