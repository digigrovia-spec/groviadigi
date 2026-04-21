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
    body: "Embedded studio. Strategy, design, media and content under one retainer — measured against revenue, not hours.",
  },
];

const Work = () => {
  return (
    <section id="work" className="bg-paper py-28 md:py-40">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        <div className="grid md:grid-cols-12 gap-10 mb-20 md:mb-28">
          <div className="md:col-span-3">
            <p className="font-mono-tag text-ink-muted reveal">[ 04 — Ways to work ]</p>
          </div>
          <div className="md:col-span-9 flex items-end justify-between gap-10">
            <h2 className="font-display text-5xl md:text-7xl leading-[0.95] tracking-tight text-ink reveal">
              Three doors.
              <span className="italic font-light text-ink-soft"> One studio.</span>
            </h2>
            <a href="#contact" className="hidden md:inline-block font-mono-tag link-underline text-ink reveal">
              Start a conversation →
            </a>
          </div>
        </div>

        <div className="space-y-px bg-ink/10 border border-ink/10">
          {offers.map((o) => (
            <a
              key={o.n}
              href="#contact"
              className="group block bg-paper hover:bg-paper-deep transition-colors duration-500 reveal"
            >
              <div className="grid md:grid-cols-12 gap-6 items-baseline px-6 md:px-12 py-10 md:py-14">
                <span className="md:col-span-1 font-mono-tag text-ink-muted">{o.n}</span>
                <h3 className="md:col-span-4 font-display text-3xl md:text-5xl text-ink leading-[0.95]">
                  {o.title}
                </h3>
                <p className="md:col-span-5 text-ink-soft text-base md:text-lg leading-relaxed max-w-xl">
                  {o.body}
                </p>
                <div className="md:col-span-2 flex md:justify-end items-center gap-3">
                  <span className="font-mono-tag text-ink-muted">{o.timing}</span>
                  <span className="text-bright transition-transform duration-500 group-hover:translate-x-1" aria-hidden>→</span>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Work;
