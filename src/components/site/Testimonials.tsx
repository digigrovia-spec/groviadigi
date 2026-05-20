import { memo } from "react";

const testimonials = [
  {
    name: "Maria Doe",
    role: "Traveller",
    quote: "Lamaira made our family vacation to the Maldives unforgettable. The air ticketing and hotel booking process was so smooth!",
  },
  {
    name: "Andrew Simon",
    role: "Business Traveller",
    quote: "Lamaira’s visa services and travel insurance gave me peace of mind during my business trip to Dubai. Exceptional service!",
  },
  {
    name: "Alex Jordan",
    role: "Traveller",
    quote: "The holiday package to Thailand was perfectly planned by Lamaira. Everything from flights to activities was spot-on.",
  },
  {
    name: "Sophia Lee",
    role: "Traveller",
    quote: "Lamaira’s hotel booking service found us the perfect stay in Bali, and their travel insurance ensured we were covered.",
  },
];

const Testimonials = memo(() => {
  return (
    <section id="testimonials" className="bg-paper py-28 md:py-40 border-t border-ink/5">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        <div className="grid md:grid-cols-12 gap-10 mb-20 md:mb-28">
          <div className="md:col-span-3">
            <p className="font-mono-tag text-ink-muted reveal">[ 06 — Testimonials ]</p>
          </div>
          <div className="md:col-span-9">
            <h2 className="font-display text-5xl md:text-7xl leading-[0.85] text-ink dark:text-teal reveal">
              Words from our <span className="font-serif text-blue dark:text-white">happy clients.</span>
            </h2>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8 md:gap-12">
          {testimonials.map((t, i) => (
            <div key={i} className="reveal">
              <figure className="h-full border border-ink/10 p-8 md:p-12 bg-paper-deep/30">
                <blockquote className="text-xl md:text-2xl text-ink leading-relaxed font-sans mb-8">
                   &quot;{t.quote}&quot;
                </blockquote>
                <figcaption className="flex items-center gap-4">
                  <div className="h-10 w-10 rounded-full bg-blue/20" />
                  <div>
                    <p className="font-display text-lg text-teal">{t.name}</p>
                    <p className="font-mono-tag text-xs text-ink-muted">{t.role}</p>
                  </div>
                </figcaption>
              </figure>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
});

Testimonials.displayName = "Testimonials";

export default Testimonials;
