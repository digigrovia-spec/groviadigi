import Image from "next/image";
import heroRibbon from "@/assets/hero-ribbon.jpg";

const Hero = () => {
  return (
    <section id="top" className="relative overflow-hidden bg-paper grain pt-36 pb-24 md:pt-44 md:pb-32">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10 relative z-10">
        {/* Top meta line */}
        <div className="flex items-center justify-between font-mono-tag text-ink-muted mb-16 md:mb-24">
          <span>Index — 001</span>
          <span className="hidden md:inline">New studio · Founding cohort</span>
          <span>EST · 2026</span>
        </div>

        <h1 className="font-display text-ink leading-[0.92] tracking-tight text-[14vw] md:text-[15.5vw] lg:text-[14.2vw] xl:text-[13.6vw] w-full">
          <span className="block">Growth,</span>
          <span className="block italic font-light">
            beautifully<span className="text-bright">.</span>
          </span>
          <span className="block">engineered.</span>
        </h1>

        <div className="mt-16 md:mt-24 grid md:grid-cols-12 gap-10 items-end">
          <div className="md:col-span-5 md:col-start-1">
            <p className="font-mono-tag text-ink-muted mb-4">[ 01 — What we do ]</p>
            <p className="text-ink-soft text-lg md:text-xl leading-relaxed">
              Groviadigi is a new digital studio building brand systems and
              performance engines for founders who want growth without the
              agency theatre. Small by design. Hungry by default.
            </p>
          </div>

          <div className="md:col-span-4 md:col-start-9 flex flex-col gap-5">
            {/* Availability card — fills the empty space above the CTA */}
            <div className="border border-ink/15 rounded-sm p-5 bg-paper-deep/40 backdrop-blur-sm">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <span className="pulse-dot" aria-hidden />
                  <span className="font-mono-tag text-ink-soft">Founding clients · open</span>
                </div>
                <span className="font-mono-tag text-ink-muted">0 / 3</span>
              </div>
              <p className="font-display text-2xl text-ink leading-tight">
                Three founding partners <span className="italic font-light text-ink-soft">at studio rates</span> — for the work that builds our book.
              </p>
              <div className="mt-4 h-px w-full bg-ink/10 relative overflow-hidden">
                <span className="absolute inset-y-0 left-0 w-0 bg-bright" />
              </div>
            </div>

            <a href="#contact" className="pill-cta justify-between text-base">
              Start a project
              <span aria-hidden>→</span>
            </a>
            <a href="#work" className="pill-ghost justify-between text-base">
              See selected work
              <span aria-hidden>↓</span>
            </a>
          </div>
        </div>

        {/* Hero visual band */}
        <div className="relative mt-20 md:mt-28 aspect-[16/7] overflow-hidden rounded-sm">
          <Image
            src={heroRibbon}
            alt="Sculptural ribbon of light, the Groviadigi visual signature"
            width={1920}
            height={840}
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 flex items-end justify-between p-6 md:p-10 text-paper font-mono-tag">
            <span>FIG · 01 — KINETIC FORM</span>
            <span>SIGNAL / NOISE</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
