"use client";

import { useState, memo } from "react";
import { toast } from "sonner";

const Contact = memo(() => {
  const [sending, setSending] = useState(false);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSending(true);

    const formData = new FormData(e.currentTarget);
    // Add your Web3Forms Access Key here
    formData.append("access_key", "YOUR_ACCESS_KEY_HERE");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData
      });

      const data = await response.json();

      if (data.success) {
        setSending(false);
        (e.target as HTMLFormElement).reset();
        toast.success("Brief received! We'll be in touch within 24h.");
      } else {
        setSending(false);
        toast.error(data.message || "Something went wrong. Please try again.");
      }
    } catch (error) {
      setSending(false);
      toast.error("Failed to send. Please check your connection.");
    }
  };

  return (
    <section
      id="contact"
      className="bg-invert text-invert-fg py-28 md:py-40 relative overflow-hidden grain"
    >
      <div className="mx-auto max-w-[1400px] px-6 md:px-10 relative z-10">
        <div className="grid md:grid-cols-12 gap-10 mb-16">
          <div className="md:col-span-12">
            <p className="font-mono-tag text-invert-fg-muted reveal mb-8">[ 08 — Start ]</p>
            <h2 className="font-display text-5xl md:text-7xl leading-[0.85] text-teal reveal">
              Let's build something
              <span className="font-serif text-blue ml-3"> that compounds.</span>
            </h2>
          </div>
        </div>

        <div className="reveal mt-16">
          <div className="bg-invert-deep/40 border border-invert-fg/10 transition-[transform,box-shadow,border-color] duration-700 ease-out hover:shadow-2xl hover:shadow-invert-fg/10 hover:border-invert-fg/30 hover:scale-[1.01] interactive-cursor gpu-layer">
            <div className="grid md:grid-cols-12 gap-10 p-8 md:p-12 lg:p-16">
              <form onSubmit={onSubmit} className="md:col-span-7 space-y-8">
                <div className="grid md:grid-cols-2 gap-8">
                  <label className="block">
                    <span className="font-mono-tag text-invert-fg-muted">Name</span>
                    <input
                      required
                      name="name"
                      type="text"
                      className="mt-2 w-full bg-transparent border-b border-invert-fg/20 py-3 text-invert-fg placeholder:text-invert-fg/30 focus:border-bright outline-none transition-colors"
                      placeholder="Your name"
                    />
                  </label>
                  <label className="block">
                    <span className="font-mono-tag text-invert-fg-muted">Email</span>
                    <input
                      required
                      name="email"
                      type="email"
                      className="mt-2 w-full bg-transparent border-b border-invert-fg/20 py-3 text-invert-fg placeholder:text-invert-fg/30 focus:border-bright outline-none transition-colors"
                      placeholder="you@company.com"
                    />
                  </label>
                </div>
                <div className="grid md:grid-cols-2 gap-8">
                  <label className="block">
                    <span className="font-mono-tag text-invert-fg-muted">Company</span>
                    <input
                      name="company"
                      type="text"
                      className="mt-2 w-full bg-transparent border-b border-invert-fg/20 py-3 text-invert-fg placeholder:text-invert-fg/30 focus:border-bright outline-none transition-colors"
                      placeholder="Where you work"
                    />
                  </label>
                  <label className="block">
                    <span className="font-mono-tag text-invert-fg-muted">Designation</span>
                    <input
                      name="designation"
                      type="text"
                      className="mt-2 w-full bg-transparent border-b border-invert-fg/20 py-3 text-invert-fg placeholder:text-invert-fg/30 focus:border-bright outline-none transition-colors"
                      placeholder="Your role"
                    />
                  </label>
                </div>
                <label className="block">
                  <span className="font-mono-tag text-invert-fg-muted">The brief</span>
                  <textarea
                    required
                    name="brief"
                    rows={4}
                    className="mt-2 w-full bg-transparent border-b border-invert-fg/20 py-3 text-invert-fg placeholder:text-invert-fg/30 focus:border-bright outline-none resize-none transition-colors"
                    placeholder="Tell us what you're trying to move."
                  />
                </label>

                <button
                  type="submit"
                  disabled={sending}
                  className="inline-flex items-center gap-3 rounded-full px-6 py-3 transition-all duration-500 bg-bright text-white font-medium hover:opacity-90 disabled:opacity-60"
                >
                  {sending ? "Sending…" : "Send the brief"}
                  <span aria-hidden>→</span>
                </button>
              </form>

              <aside className="md:col-span-4 md:col-start-9 space-y-10">
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
        </div>
      </div>
    </section>
  );
});

Contact.displayName = "Contact";

export default Contact;
