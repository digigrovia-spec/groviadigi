import { memo } from "react";

const industries = [
  { t: "Restaurants & Food", d: "Content that fills tables. Footfall that fills cash registers." },
  { t: "Gyms & Fitness", d: "Build a community, not just a follower count." },
  { t: "Jewellery & Lifestyle", d: "Storytelling worthy of timeless craftsmanship." },
  { t: "Food Manufacturers", d: "From factory floor to retail shelf we amplify the journey." },
  { t: "Travel Agencies", d: "Turn digital wanderers into confirmed bookings." },
  { t: "Startups & SMEs", d: "Build your brand from the ground up. Fast. Smart. Built to scale." },
];

const Studio = memo(() => {
  return (
    <section id="industries" className="bg-paper py-28 md:py-40 border-t border-ink/10">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        <div className="grid md:grid-cols-12 gap-10 mb-20 md:mb-28">
          <div className="md:col-span-3">
            <p className="font-mono-tag text-ink-muted reveal">[ 07 — Industries ]</p>
          </div>
          <div className="md:col-span-9">
            <h2 className="font-display text-5xl md:text-7xl leading-[0.85] text-ink dark:text-teal reveal">
              <span className="block">Built for Brands</span>
              <span className="font-serif text-blue dark:text-white block mt-2 md:mt-4">That Mean Business</span>
            </h2>
            <p className="mt-8 max-w-2xl text-ink-soft text-lg md:text-xl leading-relaxed font-sans reveal">
              We don&apos;t pretend to be experts in everything. We&apos;ve gone deep in six
              industries and we know what works in each.
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 md:gap-10">
          {industries.map((m) => (
            <div key={m.t} className="reveal">
              <div className="group bg-paper border border-ink/10 h-full transition-[transform,background-color,box-shadow,border-color] duration-500 ease-out hover:bg-paper-deep dark:hover:bg-paper hover:scale-[1.03] hover:z-10 hover:shadow-2xl dark:hover:shadow-white/10 dark:hover:border-white/30 cursor-pointer interactive-cursor gpu-layer">
                <div className="p-8 md:p-12">
                  <h3 className="font-display text-2xl md:text-3xl text-teal mb-4">{m.t}</h3>
                  <p className="text-ink-soft text-base leading-relaxed">{m.d}</p>
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
