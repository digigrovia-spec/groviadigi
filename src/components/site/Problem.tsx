import { memo } from "react";

const Problem = memo(() => {
  return (
    <section className="bg-paper py-28 md:py-40 border-t border-ink/10">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        <div className="grid md:grid-cols-12 gap-10">
          <div className="md:col-span-3">
            <p className="font-mono-tag text-ink-muted reveal">[ 02 — The Problem ]</p>
          </div>
          <div className="md:col-span-9">
            <h2 className="font-display text-5xl md:text-7xl leading-[0.85] text-teal reveal">
              <span className="block">Your business deserves</span>
              <span className="font-serif text-blue dark:text-white block mt-2 md:mt-4">to be seen.</span>
            </h2>
            <div className="mt-12 grid md:grid-cols-2 gap-12">
              <p className="text-ink-soft text-lg md:text-xl leading-relaxed font-sans reveal">
                You&apos;re great at what you do running a restaurant, building a fitness
                community, crafting jewellery, growing a startup. But being great
                isn&apos;t enough anymore. If your customers can&apos;t find you online,
                they&apos;re finding your competitors instead.
              </p>
              <p className="text-ink-soft text-lg md:text-xl leading-relaxed font-sans reveal">
                That&apos;s where we come in. Grovia Digi builds digital presence
                that <strong>attracts the right audience, engages them with content
                  they actually care about, and converts them into paying customers</strong>
                month after month, predictably.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
});

Problem.displayName = "Problem";

export default Problem;
