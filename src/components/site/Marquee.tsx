const items = [
  "Strategy",
  "Brand systems",
  "Performance",
  "Content",
  "SEO",
  "Web",
  "Social",
  "Email",
  "Creative direction",
];

const Marquee = () => {
  const row = [...items, ...items];
  return (
    <section aria-label="Capabilities" className="relative overflow-hidden border-y border-ink/10 bg-paper py-6">
      <div className="marquee-track gap-12">
        {row.map((t, i) => (
          <span key={i} className="font-display text-3xl md:text-5xl text-ink/80 whitespace-nowrap flex items-center gap-12">
            {t}
            <span className="text-bright">●</span>
          </span>
        ))}
      </div>
    </section>
  );
};

export default Marquee;
