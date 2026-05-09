import { memo } from "react";

const principles = [
  {
    n: "01",
    t: "Results-First, Always",
    d: "Vanity metrics don't pay the bills. Every campaign we run is tied directly to your revenue goals. If it doesn't move the needle, we don't do it.",
  },
  {
    n: "02",
    t: "AI-Augmented Execution",
    d: "We blend the speed of AI with the strategy of senior marketers. Smarter campaigns. Faster turnaround. Better outcomes.",
  },
  {
    n: "03",
    t: "Full-Service Under One Roof",
    d: "Strategy, creative, ads, SEO, web, automation all of it, one team. No more chasing freelancers or stitching together half-baked work.",
  },
  {
    n: "04",
    t: "Local Roots, National Reach",
    d: "Built in Rajasthan. Trusted across India. We understand the Indian market and still bring world-class digital execution.",
  },
];

const Results = memo(() => {
  return (
    <section className="bg-paper-deep py-28 md:py-40 border-y border-ink/10">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        <div className="grid md:grid-cols-12 gap-10 mb-20">
          <div className="md:col-span-3">
            <p className="font-mono-tag text-ink-muted mb-6 reveal">[ 06 — Why Grovia Digi ]</p>
          </div>
          <div className="md:col-span-9 mt-4 md:mt-0">
            <h2 className="font-display text-5xl md:text-7xl leading-[0.85] text-teal reveal">
              <span className="block">Why Brands Choose</span>
              <span className="block font-serif text-blue dark:text-white mt-2 md:mt-4">Grovia Digi</span>
            </h2>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8 md:gap-10">
          {principles.map((p) => (
            <div key={p.n} className="reveal">
              <article
                className="group relative h-full bg-paper border border-ink/10 transition-[transform,background-color,box-shadow,border-color] duration-500 ease-out hover:bg-paper-deep dark:hover:bg-paper hover:scale-[1.03] hover:z-10 hover:shadow-2xl dark:hover:shadow-white/10 dark:hover:border-white/30 cursor-pointer interactive-cursor gpu-layer"
              >
                <div className="p-8 md:p-12">
                  <div className="flex items-baseline justify-between mb-10">
                    <span className="font-mono-tag text-ink-muted">{p.n}</span>
                    <span className="font-mono-tag text-bright">PRINCIPLE</span>
                  </div>
                  <h3 className="font-display text-3xl md:text-4xl text-ink mb-4">{p.t}</h3>
                  <p className="text-ink-soft text-base md:text-lg leading-relaxed max-w-md">{p.d}</p>
                </div>
              </article>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
});

Results.displayName = "Results";

export default Results;
