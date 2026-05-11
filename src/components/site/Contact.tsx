"use client";

import { useState, memo } from "react";
import { toast } from "sonner";

const Contact = memo(() => {
  const [sending, setSending] = useState(false);
  const [industry, setIndustry] = useState("");

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
      className="bg-invert text-invert-fg py-28 md:py-40 relative overflow-hidden grain"
    >
      <div className="mx-auto max-w-[1400px] px-6 md:px-10 relative z-10">
        <div className="grid md:grid-cols-12 gap-10 mb-16">
          <div className="md:col-span-12">
            <p className="font-mono-tag text-invert-fg-muted reveal mb-8">[ 08 — Start ]</p>
            <h2 className="font-display text-5xl md:text-7xl leading-[0.85] text-teal reveal">
              <span className="block">Let&apos;s build something</span>
              <span className="font-serif text-white dark:text-white block mt-2 md:mt-4">extraordinary together.</span>
            </h2>
            <p className="mt-8 max-w-2xl text-invert-fg-soft text-lg md:text-xl leading-relaxed font-sans reveal">
              Whether you&apos;re launching your first campaign or rebuilding your entire 
              digital presence we&apos;re ready when you are. Send us a note. 
              We reply within 24 hours.
            </p>
          </div>
        </div>

        <div id="contact" className="reveal mt-16 scroll-mt-24">
          <div className="bg-invert-deep/40 border border-invert-fg/10 transition-[transform,box-shadow,border-color] duration-700 ease-out hover:shadow-2xl hover:shadow-invert-fg/10 hover:border-invert-fg/30 hover:scale-[1.01] interactive-cursor gpu-layer">
            <div className="grid md:grid-cols-12 gap-10 p-8 md:p-12 lg:p-16">
              <form onSubmit={onSubmit} className="md:col-span-7 space-y-8">
                <div className="grid md:grid-cols-2 gap-8">
                  <label className="block">
                    <span className="font-mono-tag text-invert-fg-muted">Your Name</span>
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
                    <span className="font-mono-tag text-invert-fg-muted">Phone / WhatsApp</span>
                    <input
                      required
                      name="phone"
                      type="tel"
                      className="mt-2 w-full bg-transparent border-b border-invert-fg/20 py-3 text-invert-fg placeholder:text-invert-fg/30 focus:border-bright outline-none transition-colors"
                      placeholder="+91..."
                    />
                  </label>
                  <label className="block">
                    <span className="font-mono-tag text-invert-fg-muted">Business / Brand Name</span>
                    <input
                      required
                      name="company"
                      type="text"
                      className="mt-2 w-full bg-transparent border-b border-invert-fg/20 py-3 text-invert-fg placeholder:text-invert-fg/30 focus:border-bright outline-none transition-colors"
                      placeholder="Your brand"
                    />
                  </label>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-8">
                    <label className="block">
                      <span className="font-mono-tag text-invert-fg-muted">Industry</span>
                      <select
                        name="industry"
                        onChange={(e) => setIndustry(e.target.value)}
                        className="mt-2 w-full bg-transparent border-b border-invert-fg/20 py-3 text-invert-fg focus:border-bright outline-none transition-colors appearance-none"
                      >
                        <option value="restaurants" className="bg-invert text-invert-fg">Restaurants & Food</option>
                        <option value="gyms" className="bg-invert text-invert-fg">Gyms & Fitness</option>
                        <option value="jewellery" className="bg-invert text-invert-fg">Jewellery & Lifestyle</option>
                        <option value="food-manufacturing" className="bg-invert text-invert-fg">Food Manufacturing</option>
                        <option value="travel" className="bg-invert text-invert-fg">Travel Agencies</option>
                        <option value="startup-sme" className="bg-invert text-invert-fg">Startup / SME</option>
                        <option value="other" className="bg-invert text-invert-fg">Other</option>
                      </select>
                    </label>

                    {industry === "other" && (
                      <label className="block animate-in fade-in slide-in-from-top-2 duration-500">
                        <span className="font-mono-tag text-invert-fg-muted">Please specify industry</span>
                        <input
                          required
                          name="other_industry"
                          type="text"
                          className="mt-2 w-full bg-transparent border-b border-invert-fg/20 py-3 text-invert-fg placeholder:text-invert-fg/30 focus:border-bright outline-none transition-colors"
                          placeholder="Your industry"
                        />
                      </label>
                    )}
                  </div>

                  <label className="block">
                    <span className="font-mono-tag text-invert-fg-muted">Monthly Budget</span>
                    <input
                      name="budget"
                      type="text"
                      className="mt-2 w-full bg-transparent border-b border-invert-fg/20 py-3 text-invert-fg placeholder:text-invert-fg/30 focus:border-bright outline-none transition-colors"
                      placeholder="e.g. ₹50k - ₹1L (Optional)"
                    />
                  </label>
                </div>

                <div className="space-y-4">
                  <span className="font-mono-tag text-invert-fg-muted block">Services Interested In</span>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {["Social Media", "Performance Marketing", "SEO", "GEO", "Email", "Lead Gen", "Web Dev", "AI & CRM"].map(s => (
                      <label key={s} className="flex items-center gap-2 cursor-pointer group">
                        <input type="checkbox" name="services" value={s} className="hidden peer" />
                        <div className="w-4 h-4 border border-invert-fg/20 peer-checked:bg-bright peer-checked:border-bright transition-all" />
                        <span className="text-sm text-invert-fg/60 group-hover:text-invert-fg transition-colors">{s}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <label className="block">
                  <span className="font-mono-tag text-invert-fg-muted">Tell us about your goals</span>
                  <textarea
                    required
                    name="brief"
                    rows={4}
                    className="mt-2 w-full bg-transparent border-b border-invert-fg/20 py-3 text-invert-fg placeholder:text-invert-fg/30 focus:border-bright outline-none resize-none transition-colors"
                    placeholder="Tell us what you&apos;re trying to move."
                  />
                </label>

                <button
                  type="submit"
                  disabled={sending}
                  className="inline-flex items-center gap-3 rounded-full px-8 py-4 transition-all duration-500 bg-bright text-white font-medium hover:opacity-90 disabled:opacity-60 text-lg"
                >
                  {sending ? "Sending…" : "Submit"}
                  <span aria-hidden>→</span>
                </button>
              </form>

              <aside className="md:col-span-4 md:col-start-9 space-y-10">
                <div>
                  <p className="font-mono-tag text-invert-fg-muted mb-3">Direct</p>
                  <a
                    href="mailto:Hello@groviadigi.in"
                    className="font-display text-base xs:text-lg sm:text-2xl md:text-3xl link-underline whitespace-nowrap"
                  >
                    Hello@groviadigi.in
                  </a>
                </div>
                <div>
                  <p className="font-mono-tag text-invert-fg-muted mb-3">Studio</p>
                  <p className="text-invert-fg-soft/80 leading-relaxed">
                    Rajasthan
                    <br />
                    Mon – Sat · 10:00 – 19:00 IST
                  </p>
                </div>
                <div>
                  <p className="font-mono-tag text-invert-fg-muted mb-3">WhatsApp</p>
                  <p className="text-invert-fg-soft/80 leading-relaxed font-display text-xl">
                    +91 93520 00935
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
