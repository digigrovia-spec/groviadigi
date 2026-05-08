import { memo } from "react";

const offers = [
  {
    n: "01",
    title: "Brand Sprint",
    timing: "2 weeks",
    body: "Positioning, name audit, identity direction and a one-page brand system you can ship against immediately.",
  },
  {
    n: "02",
    title: "Launch Engine",
    timing: "6 weeks",
    body: "Site, paid foundations, analytics and a 90-day content runway. Built to take a product from zero to traction.",
  },
  {
    n: "03",
    title: "Growth Partner",
    timing: "Quarterly",
    body: "Embedded studio. Strategy, design, media and content under one retainer measured against revenue, not hours.",
  },
];

const Work = memo(() => {
  return (
    <section id="work" className="bg-paper py-28 md:py-40">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        <div className="grid md:grid-cols-12 gap-10 mb-20 md:mb-28">
          <div className="md:col-span-3">
            <p className="font-mono-tag text-ink-muted reveal">[ 05 — Ways to work ]</p>
          </div>
          <div className="md:col-span-9 flex items-end justify-between gap-10">
            <h2 className="font-display text-5xl md:text-7xl leading-[0.85] text-teal reveal">
              Three doors.
              <span className="font-serif text-blue ml-3"> One studio.</span>
            </h2>
            <a href="#contact" className="hidden md:inline-flex items-center gap-2 font-mono-tag text-ink reveal group py-1 whitespace-nowrap border-b border-teal/20 hover:border-teal transition-colors">
              <span className="opacity-60">Start a conversation</span>
              <span className="text-xl transition-transform duration-500 group-hover:translate-x-1">→</span>
            </a>
          </div>
        </div>

        <div className="space-y-6 md:gap-8">
          {offers.map((o) => (
            <div key={o.n} className="reveal">
              <a
                href="#contact"
                className="group block bg-paper border border-ink/10 transition-[transform,background-color,box-shadow,border-color] duration-500 ease-out hover:bg-paper-deep dark:hover:bg-paper hover:scale-[1.01] hover:z-10 hover:shadow-2xl dark:hover:shadow-white/10 dark:hover:border-white/30 cursor-pointer gpu-layer"
              >
                <div className="grid md:grid-cols-12 gap-6 items-baseline px-6 md:px-12 py-10 md:py-14">
                  <span className="md:col-span-1 font-mono-tag text-ink-muted">{o.n}</span>
                  <h3 className="md:col-span-4 font-display text-3xl md:text-5xl text-teal leading-[0.85]">
                    {o.title}
                  </h3>
                  <p className="md:col-span-5 text-ink-soft text-base md:text-lg leading-relaxed max-w-xl font-sans">
                    {o.body}
                  </p>
                  <div className="md:col-span-2 flex md:justify-end items-center gap-3">
                    <span className="font-mono-tag text-ink-muted">{o.timing}</span>
                    <span className="text-blue transition-transform duration-500 group-hover:translate-x-1" aria-hidden>→</span>
                  </div>
                </div>
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
});

Work.displayName = "Work";

export default Work;
