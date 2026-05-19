import { memo } from "react";

const services = [
  {
    n: "01",
    title: "Air Ticketing",
    body: "Best-in-class flight booking services to any destination worldwide. We ensure the most competitive rates and smooth itineraries for your journey.",
    items: ["Global Reach", "Best Rates", "Flexible Dates", "24/7 Support"],
  },
  {
    n: "02",
    title: "Visa Assistance",
    body: "Expert guidance through the complex visa application process. We simplify the paperwork so you can focus on your upcoming adventure.",
    items: ["Documentation", "Application Support", "Expert Advice", "Fast Track"],
  },
  {
    n: "03",
    title: "Travel Insurance",
    body: "Travel with peace of mind. Our comprehensive insurance packages cover health, luggage, and trip cancellations for total security.",
    items: ["Medical Cover", "Trip Cancellation", "Luggage Protection", "Global Support"],
  },
  {
    n: "04",
    title: "Hotel Booking",
    body: "From boutique hotels to luxury resorts, we find the perfect stay that fits your style and budget across the globe.",
    items: ["Luxury Resorts", "Boutique Stays", "Verified Reviews", "Exclusive Deals"],
  },
  {
    n: "05",
    title: "Holiday Packages",
    body: "Curated vacation trips designed for every kind of explorer. Adventure awaits in the world's most breathtaking destinations.",
    items: ["Family Trips", "Honeymoons", "Adventure Tours", "Cultural Stays"],
  },
  {
    n: "06",
    title: "Luxury Safaris",
    body: "Experience the wild like never before with our exclusive luxury safari packages, crafted to exceed every expectation in the African bush.",
    items: ["Game Drives", "Luxury Lodges", "Expert Guides", "Private Tours"],
  },
  {
    n: "07",
    title: "Car Rental",
    body: "Reliable and comfortable transportation at your destination. Choose from a wide fleet of vehicles to explore at your own pace.",
    items: ["SUV / Sedan", "Chauffeur Drive", "Global Partners", "Airport Pickup"],
  },
  {
    n: "08",
    title: "MICE Arrangements",
    body: "Professional management for Meetings, Incentives, Conferences, and Exhibitions. We handle the logistics so you can focus on the business.",
    items: ["Corporate Events", "Conference Logistics", "Team Building", "Incentive Travel"],
  },
];

const Services = memo(() => {
  return (
    <section id="services" className="bg-paper py-28 md:py-40">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        <div className="grid md:grid-cols-12 gap-10 mb-20 md:mb-28">
          <div className="md:col-span-3">
            <p className="font-mono-tag text-ink-muted reveal">[ 03 — Services ]</p>
          </div>
          <div className="md:col-span-9">
            <h2 className="font-display text-5xl md:text-7xl leading-[0.85] text-ink dark:text-teal reveal">
              World-class travel. <span className="font-serif text-blue dark:text-white">Seamlessly delivered.</span>
            </h2>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8 md:gap-12">
          {services.map((s) => (
            <div key={s.n} className="reveal">
              <article
                className="group relative h-full bg-paper border border-ink/10 transition-[transform,background-color,box-shadow,border-color] duration-500 ease-out hover:bg-paper-deep dark:hover:bg-paper hover:scale-[1.03] hover:z-10 hover:shadow-2xl dark:hover:shadow-white/10 dark:hover:border-white/30 cursor-pointer interactive-cursor gpu-layer"
              >
                <div className="p-8 md:p-12">
                  <div className="flex items-baseline justify-between mb-10">
                    <span className="font-mono-tag text-ink-muted">{s.n}</span>
                    <span className="h-2 w-2 rounded-full bg-ink/20 group-hover:bg-bright transition-colors" />
                  </div>
                  <h3 className="font-display text-3xl md:text-4xl text-teal mb-4">{s.title}</h3>
                  <p className="text-ink-soft text-base md:text-lg leading-relaxed mb-8 max-w-md">{s.body}</p>
                  <ul className="flex flex-wrap gap-2">
                    {s.items.map((i) => (
                      <li
                        key={i}
                        className="font-mono-tag border border-ink/15 px-3 py-1 rounded-full text-ink-soft transition-all duration-300 hover:scale-110 hover:text-ink hover:border-ink cursor-pointer"
                      >
                        {i}
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
});

Services.displayName = "Services";

export default Services;
