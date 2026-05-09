import { memo } from "react";

const Testimonials = memo(() => {
  return (
    <section className="bg-paper py-28 md:py-40">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        <div className="grid md:grid-cols-12 gap-10 mb-20">
          <div className="md:col-span-3">
            <p className="font-mono-tag text-ink-muted reveal">[ Note — Founder&apos;s Promise ]</p>
          </div>
        </div>

        <figure className="max-w-5xl reveal">
          <blockquote className="font-display text-3xl md:text-5xl leading-[1.15] text-ink">
            <span className="text-bright">“</span>
            We started Grovia Digi because we were tired of watching great Indian
            businesses lose to inferior competitors who simply &quot;got&quot; digital.
            You shouldn&apos;t have to. We&apos;ll work like our own business depends on
            yours because, in a way, it does.
            <span className="text-bright">”</span>
          </blockquote>
          <figcaption className="mt-8 font-mono-tag text-ink-muted">
            — Team Grovia Digi, 2026
          </figcaption>
        </figure>
      </div>
    </section>
  );
});

Testimonials.displayName = "Testimonials";

export default Testimonials;
