const principles = [
  {
    n: "01",
    t: "Outcomes over outputs",
    d: "We don't bill by the deck. Every engagement ships against a number you'd defend in a board meeting.",
  },
  {
    n: "02",
    t: "Founder in the room",
    d: "No account layer, no junior swap. The people who pitch are the people who build — start to ship.",
  },
  {
    n: "03",
    t: "Build to compound",
    d: "Brand, content and performance treated as one system. Each release makes the next one cheaper.",
  },
  {
    n: "04",
    t: "Honest reporting",
    d: "What worked, what didn't, what we're killing this week. No vanity dashboards.",
  },
];

const Results = () => {
  return (
    <section className="bg-paper-deep py-28 md:py-40 border-y border-ink/10">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        <div className="grid md:grid-cols-12 gap-10 mb-20">
          <div className="md:col-span-3">
            <p className="font-mono-tag text-ink-muted reveal">[ 05 — What we promise ]</p>
          </div>
          <div className="md:col-span-9">
            <h2 className="font-display text-5xl md:text-7xl leading-[0.95] tracking-tight text-ink reveal">
              No receipts yet.
              <span className="italic font-light text-ink-soft"> A standard, instead.</span>
            </h2>
            <p className="mt-8 max-w-2xl text-ink-soft text-lg md:text-xl leading-relaxed reveal">
              We're a new studio — which means we won't show you someone else's
              numbers and call them ours. Here's the bar we're holding ourselves
              to from day one.
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-px bg-ink/10 border border-ink/10">
          {principles.map((p) => (
            <article key={p.n} className="bg-paper p-8 md:p-12 reveal">
              <div className="flex items-baseline justify-between mb-10">
                <span className="font-mono-tag text-ink-muted">{p.n}</span>
                <span className="font-mono-tag text-bright">PRINCIPLE</span>
              </div>
              <h3 className="font-display text-3xl md:text-4xl text-ink mb-4">{p.t}</h3>
              <p className="text-ink-soft text-base md:text-lg leading-relaxed max-w-md">{p.d}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Results;
