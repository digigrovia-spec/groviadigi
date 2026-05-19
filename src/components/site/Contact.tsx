"use client";

import { useState, memo } from "react";
import { toast } from "sonner";

const Contact = memo(() => {
  const [sending, setSending] = useState(false);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSending(true);

    // Simple feedback for demonstration
    setTimeout(() => {
      setSending(false);
      (e.target as HTMLFormElement).reset();
      toast.success("Request received! We'll be in touch shortly.");
    }, 1500);
  };

  return (
    <section
      className="bg-invert text-invert-fg py-28 md:py-40 relative overflow-hidden grain"
    >
      <div className="mx-auto max-w-[1400px] px-6 md:px-10 relative z-10">
        <div className="grid md:grid-cols-12 gap-10 mb-16">
          <div className="md:col-span-12">
            <p className="font-mono-tag text-invert-fg-muted reveal mb-8">[ 08 — Contact ]</p>
            <h2 className="font-display text-5xl md:text-7xl leading-[0.85] text-teal reveal">
              <span className="block">Start your next</span>
              <span className="font-serif text-white dark:text-white block mt-2 md:mt-4">adventure today.</span>
            </h2>
            <p className="mt-8 max-w-2xl text-invert-fg-soft text-lg md:text-xl leading-relaxed font-sans reveal">
              Planning your dream vacation shouldn&apos;t be stressful. Send us a message,
              and our travel experts will handle the rest. We respond within 24 hours.
            </p>
          </div>
        </div>

        <div id="contact" className="reveal mt-16 scroll-mt-24">
          <div className="bg-invert-deep/40 border border-invert-fg/10 transition-[transform,box-shadow,border-color] duration-700 ease-out hover:shadow-2xl hover:shadow-invert-fg/10 hover:border-invert-fg/30 hover:scale-[1.01] interactive-cursor gpu-layer">
            <div className="grid md:grid-cols-12 gap-10 p-8 md:p-12 lg:p-16">
              <form onSubmit={onSubmit} className="md:col-span-7 space-y-8">
                <div className="grid md:grid-cols-2 gap-8">
                  <label className="block">
                    <span className="font-mono-tag text-invert-fg-muted">Full Name</span>
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
                      placeholder="you@email.com"
                    />
                  </label>
                </div>
                <div className="grid md:grid-cols-2 gap-8">
                  <label className="block">
                    <span className="font-mono-tag text-invert-fg-muted">Phone Number</span>
                    <input
                      required
                      name="phone"
                      type="tel"
                      className="mt-2 w-full bg-transparent border-b border-invert-fg/20 py-3 text-invert-fg placeholder:text-invert-fg/30 focus:border-bright outline-none transition-colors"
                      placeholder="+233..."
                    />
                  </label>
                  <label className="block">
                    <span className="font-mono-tag text-invert-fg-muted">Preferred Destination</span>
                    <input
                      required
                      name="destination"
                      type="text"
                      className="mt-2 w-full bg-transparent border-b border-invert-fg/20 py-3 text-invert-fg placeholder:text-invert-fg/30 focus:border-bright outline-none transition-colors"
                      placeholder="Where do you want to go?"
                    />
                  </label>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                  <label className="block">
                    <span className="font-mono-tag text-invert-fg-muted">Travel Type</span>
                    <select
                      name="type"
                      className="mt-2 w-full bg-transparent border-b border-invert-fg/20 py-3 text-invert-fg focus:border-bright outline-none transition-colors appearance-none"
                    >
                      <option value="safari" className="bg-invert text-invert-fg">Luxury Safari</option>
                      <option value="beach" className="bg-invert text-invert-fg">Beach Getaway</option>
                      <option value="city" className="bg-invert text-invert-fg">City Escape</option>
                      <option value="business" className="bg-invert text-invert-fg">Business Travel</option>
                      <option value="cruise" className="bg-invert text-invert-fg">Cruise Trip</option>
                      <option value="other" className="bg-invert text-invert-fg">Other</option>
                    </select>
                  </label>

                  <label className="block">
                    <span className="font-mono-tag text-invert-fg-muted">Number of Travelers</span>
                    <input
                      name="travelers"
                      type="number"
                      min="1"
                      className="mt-2 w-full bg-transparent border-b border-invert-fg/20 py-3 text-invert-fg focus:border-bright outline-none transition-colors"
                      placeholder="1"
                    />
                  </label>
                </div>

                <label className="block">
                  <span className="font-mono-tag text-invert-fg-muted">Special Requests / Notes</span>
                  <textarea
                    name="brief"
                    rows={4}
                    className="mt-2 w-full bg-transparent border-b border-invert-fg/20 py-3 text-invert-fg placeholder:text-invert-fg/30 focus:border-bright outline-none resize-none transition-colors"
                    placeholder="Tell us about your dream trip."
                  />
                </label>

                <button
                  type="submit"
                  disabled={sending}
                  className="inline-flex items-center gap-3 rounded-full px-8 py-4 transition-all duration-500 bg-bright text-white font-medium hover:opacity-90 disabled:opacity-60 text-lg"
                >
                  {sending ? "Sending…" : "Submit Booking Request"}
                  <span aria-hidden>→</span>
                </button>
              </form>

              <aside className="md:col-span-4 md:col-start-9 space-y-10">
                <div>
                  <p className="font-mono-tag text-invert-fg-muted mb-3">Email</p>
                  <a
                    href="mailto:salesfna@lamairatravel.com"
                    className="font-display text-base xs:text-lg sm:text-2xl md:text-3xl link-underline whitespace-nowrap"
                  >
                    salesfna@lamairatravel.com
                  </a>
                </div>
                <div>
                  <p className="font-mono-tag text-invert-fg-muted mb-3">Headquarters</p>
                  <p className="text-invert-fg-soft/80 leading-relaxed">
                    51A Wilkinson road,
                    <br />
                    Freetown, Sierra Leone
                    <br />
                    Accra, Ghana Office Coming Soon
                  </p>
                </div>
                <div>
                  <p className="font-mono-tag text-invert-fg-muted mb-3">Phone</p>
                  <p className="text-invert-fg-soft/80 leading-relaxed font-display text-xl">
                    +232 78 676 849
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
