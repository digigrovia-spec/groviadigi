import { memo } from "react";

const services = [
  {
    n: "01",
    title: "Brand & Identity",
    body: "Positioning, naming, visual systems and verbal identity that signal premium without shouting.",
    items: ["Brand strategy", "Visual identity", "Messaging", "Guidelines"],
  },
  {
    n: "02",
    title: "Performance Marketing",
    body: "Paid media engineered around incrementality, not vanity. Meta, Google, LinkedIn, programmatic.",
    items: ["Paid social", "Paid search", "CRO", "Attribution"],
  },
  {
    n: "03",
    title: "Content & SEO",
    body: "Editorial-grade content built around search intent and long-term authority. We compound demand.",
    items: ["SEO strategy", "Editorial", "Technical SEO", "Link earning"],
  },
  {
    n: "04",
    title: "Web & Product",
    body: "Sites that do real work — fast, accessible, conversion-tuned. Built for growth, designed to last.",
    items: ["Design", "Development", "Optimization", "Analytics"],
  },
];

const Services = memo(() => {
  return (
    <section id="services" className="bg-paper py-28 md:py-40">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        <div className="grid md:grid-cols-12 gap-10 mb-20 md:mb-28">
          <div className="md:col-span-3">
            <p className="font-mono-tag text-ink-muted reveal">[ 02 — Services ]</p>
          </div>
          <div className="md:col-span-9">
            <h2 className="font-display text-5xl md:text-7xl text-teal reveal">
              Four disciplines.
              <span className="font-serif text-blue ml-3"> One system.</span>
            </h2>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8 md:gap-12">
          {services.map((s) => (
            <div key={s.n} className="reveal">
              <article
                className="group relative h-full bg-paper border border-ink/10 transition-[transform,background-color,box-shadow,border-color] duration-500 ease-out hover:bg-paper-deep dark:hover:bg-paper hover:scale-[1.03] hover:z-10 hover:shadow-2xl dark:hover:shadow-white/10 dark:hover:border-white/30 cursor-pointer interactive-cursor gpu-layer"
              >
                <div className="p-8 md:p-12">
                  <div className="flex items-baseline justify-between mb-10">
                    <span className="font-mono-tag text-ink-muted">{s.n}</span>
                    <span className="h-2 w-2 rounded-full bg-ink/20 group-hover:bg-bright transition-colors" />
                  </div>
                  <h3 className="font-display text-3xl md:text-4xl text-ink mb-4">{s.title}</h3>
                  <p className="text-ink-soft text-base md:text-lg leading-relaxed mb-8 max-w-md">{s.body}</p>
                  <ul className="flex flex-wrap gap-2">
                    {s.items.map((i) => (
                      <li
                        key={i}
                        className="font-mono-tag border border-ink/15 px-3 py-1 rounded-full text-ink-soft transition-all duration-300 hover:scale-110 hover:text-ink hover:border-ink cursor-pointer"
                      >
                        {i}
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
});

Services.displayName = "Services";

export default Services;
