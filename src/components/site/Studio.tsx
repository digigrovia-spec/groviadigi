import { memo } from "react";

const Studio = memo(() => {
  return (
    <section id="studio" className="bg-paper py-28 md:py-40 border-t border-ink/10">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        <div className="grid md:grid-cols-12 gap-10 mb-20 md:mb-28">
          <div className="md:col-span-3">
            <p className="font-mono-tag text-ink-muted reveal">[ 07 — Studio ]</p>
          </div>
          <div className="md:col-span-9">
            <h2 className="font-display text-5xl md:text-7xl text-teal reveal">
              Founder-led.
              <span className="font-serif text-blue ml-3"> Built this year.</span>
            </h2>
            <p className="mt-8 max-w-2xl text-ink-soft text-lg md:text-xl leading-relaxed font-sans reveal">
              Groviadigi is a young studio out of Rajasthan, started by people who
              got tired of watching good brands get diluted by big-agency
              process. No account managers. No layers. The person you meet on
              the call is the person who does the work.
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 md:gap-10">
          {[
            { k: "Founded", v: "2026" },
            { k: "Based", v: "Rajasthan · India" },
            { k: "Team", v: "Small by design" },
          ].map((m) => (
            <div key={m.k} className="reveal">
              <div className="group bg-paper border border-ink/10 h-full transition-[transform,background-color,box-shadow,border-color] duration-500 ease-out hover:bg-paper-deep dark:hover:bg-paper hover:scale-[1.03] hover:z-10 hover:shadow-2xl dark:hover:shadow-white/10 dark:hover:border-white/30 cursor-pointer interactive-cursor gpu-layer">
                <div className="p-8 md:p-12">
                  <p className="font-mono-tag text-ink-muted mb-4">{m.k}</p>
                  <p className="font-display text-3xl md:text-4xl text-ink">{m.v}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
});

Studio.displayName = "Studio";

export default Studio;
