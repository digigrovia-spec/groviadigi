const Testimonials = () => {
  return (
    <section className="bg-paper py-28 md:py-40">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        <div className="grid md:grid-cols-12 gap-10 mb-20">
          <div className="md:col-span-3">
            <p className="font-mono-tag text-ink-muted reveal">[ 06 — A note from the founder ]</p>
          </div>
        </div>

        <figure className="max-w-5xl reveal">
          <blockquote className="font-display text-3xl md:text-5xl leading-[1.15] text-ink">
            <span className="text-bright">“</span>
            Most agencies sell you their past. We'd rather earn yours. If you're
            a founder who wants the work to actually move the number — and a
            partner who'll tell you the truth about what's working — there's a
            seat at the table. The case studies will write themselves.
            <span className="text-bright">”</span>
          </blockquote>
          <figcaption className="mt-8 font-mono-tag text-ink-muted">
            The Groviadigi team — Founding note, 2025
          </figcaption>
        </figure>
      </div>
    </section>
  );
};

export default Testimonials;
