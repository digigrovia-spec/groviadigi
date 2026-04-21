const steps = [
  { n: "I", t: "Listen", d: "We start with the business — not the brief. Audits, interviews, market truth." },
  { n: "II", t: "Frame", d: "We define the one move that matters this quarter and the system around it." },
  { n: "III", t: "Make", d: "Cross-discipline pods ship work weekly — strategy, design, media, content in one room." },
  { n: "IV", t: "Compound", d: "We measure what moves the P&L, kill what doesn't, and reinvest in what does." },
];

const Process = () => {
  return (
    <section
      id="process"
      className="bg-invert text-invert-fg py-28 md:py-40 relative overflow-hidden grain"
    >
      <div className="mx-auto max-w-[1400px] px-6 md:px-10 relative z-10">
        <div className="grid md:grid-cols-12 gap-10 mb-20 md:mb-28">
          <div className="md:col-span-3">
            <p className="font-mono-tag text-invert-fg-muted reveal">[ 03 — Process ]</p>
          </div>
          <div className="md:col-span-9">
            <h2 className="font-display text-5xl md:text-7xl leading-[0.95] tracking-tight reveal">
              A method, not
              <span className="italic font-light text-invert-fg-soft/70"> a pitch deck.</span>
            </h2>
          </div>
        </div>

        <ol className="grid md:grid-cols-4 gap-px bg-invert-fg/10 border border-invert-fg/10">
          {steps.map((s) => (
            <li key={s.n} className="bg-invert p-8 md:p-10 reveal">
              <div className="flex items-center justify-between mb-12">
                <span className="font-display text-bright text-5xl">{s.n}</span>
                <span className="font-mono-tag text-invert-fg-muted">STEP</span>
              </div>
              <h3 className="font-display text-3xl mb-3">{s.t}</h3>
              <p className="text-invert-fg-soft/80 leading-relaxed">{s.d}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
};

export default Process;
