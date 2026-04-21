const Studio = () => {
  return (
    <section id="studio" className="bg-paper py-28 md:py-40 border-t border-ink/10">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        <div className="grid md:grid-cols-12 gap-10 mb-20 md:mb-28">
          <div className="md:col-span-3">
            <p className="font-mono-tag text-ink-muted reveal">[ 07 — Studio ]</p>
          </div>
          <div className="md:col-span-9">
            <h2 className="font-display text-5xl md:text-7xl leading-[0.95] tracking-tight text-ink reveal">
              Founder-led.
              <span className="italic font-light text-ink-soft"> Built this year.</span>
            </h2>
             <p className="mt-8 max-w-2xl text-ink-soft text-lg md:text-xl leading-relaxed reveal">
               Groviadigi is a young studio out of Rajasthan, started by people who
               got tired of watching good brands get diluted by big-agency
               process. No account managers. No layers. The person you meet on
               the call is the person who does the work.
             </p>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-px bg-ink/10 border border-ink/10">
          {[
            { k: "Founded", v: "2026" },
            { k: "Based", v: "Rajasthan · India" },
            { k: "Team", v: "Small by design" },
          ].map((m) => (
            <div key={m.k} className="bg-paper p-8 md:p-12 reveal">
              <p className="font-mono-tag text-ink-muted mb-4">{m.k}</p>
              <p className="font-display text-3xl md:text-4xl text-ink">{m.v}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Studio;
