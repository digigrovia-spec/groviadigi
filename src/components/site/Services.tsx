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

const Services = () => {
  return (
    <section id="services" className="bg-paper py-28 md:py-40">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        <div className="grid md:grid-cols-12 gap-10 mb-20 md:mb-28">
          <div className="md:col-span-3">
            <p className="font-mono-tag text-ink-muted reveal">[ 02 — Services ]</p>
          </div>
          <div className="md:col-span-9">
            <h2 className="font-display text-5xl md:text-7xl leading-[0.95] tracking-tight text-ink reveal">
              Four disciplines.
              <span className="italic font-light text-ink-soft"> One system.</span>
            </h2>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-px bg-ink/10 border border-ink/10">
          {services.map((s) => (
            <article
              key={s.n}
              className="group relative bg-paper p-8 md:p-12 transition-colors duration-500 hover:bg-paper-deep reveal"
            >
              <div className="flex items-baseline justify-between mb-10">
                <span className="font-mono-tag text-ink-muted">{s.n}</span>
                <span className="h-2 w-2 rounded-full bg-ink/20 group-hover:bg-bright transition-colors" />
              </div>
              <h3 className="font-display text-3xl md:text-4xl text-ink mb-4">{s.title}</h3>
              <p className="text-ink-soft text-base md:text-lg leading-relaxed mb-8 max-w-md">{s.body}</p>
              <ul className="flex flex-wrap gap-2">
                {s.items.map((i) => (
                  <li key={i} className="font-mono-tag border border-ink/15 px-3 py-1 rounded-full text-ink-soft">
                    {i}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
