import { memo } from "react";

const services = [
  {
    n: "01",
    title: "Social Media Marketing",
    body: "Platform-native content that stops the scroll and starts conversations. Reels, carousels, community management, and brand voice the full ecosystem.",
    items: ["Reels & Video", "Content Strategy", "Community Mgmt", "Brand Voice"],
  },
  {
    n: "02",
    title: "Performance Marketing",
    body: "High-ROI Meta, Google, and YouTube ads engineered around your sales targets, not vanity metrics. Every rupee tracked. Every click optimised.",
    items: ["Meta Ads", "Google Ads", "Conversion Ops", "ROI Tracking"],
  },
  {
    n: "03",
    title: "SEO Search Engine Optimisation",
    body: "Rank higher. Get found. Stay there. Technical audits, keyword strategy, and authority building that compounds month after month.",
    items: ["Technical Audit", "Keyword Strategy", "Local SEO", "Content Auth"],
  },
  {
    n: "04",
    title: "GEO Generative Engine Optimisation",
    body: "The future of search is here. We optimise your brand to appear in ChatGPT, Perplexity, and Google AI Overview answers.",
    items: ["AI Search Opt", "ChatGPT SEO", "LLM Citations", "Future Proof"],
  },
  {
    n: "05",
    title: "Email Marketing",
    body: "From cold outreach to nurture flows strategic email campaigns that turn strangers into subscribers and customers into advocates.",
    items: ["Cold Outreach", "Drip Campaigns", "Nurture Flows", "Newsletters"],
  },
  {
    n: "06",
    title: "Lead Generation",
    body: "End-to-end systems landing pages, lead magnets, and funnels that feed your sales pipeline with qualified prospects.",
    items: ["Sales Funnels", "Lead Magnets", "Landing Pages", "CRM Sync"],
  },
  {
    n: "07",
    title: "Website Development",
    body: "Lightning-fast, mobile-first websites built to perform. From simple business sites to full e-commerce platforms.",
    items: ["Next.js / React", "E-commerce", "Mobile-first", "Core Vitals"],
  },
  {
    n: "08",
    title: "AI & CRM Systems",
    body: "Zoho, HubSpot, and AI-enhanced workflows that auto-capture leads and segment audiences. Your sales machine, on autopilot.",
    items: ["Zoho / HubSpot", "Workflows", "Sales Auto", "AI Scoring"],
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
              Four disciplines. <span className="font-serif text-blue dark:text-white">One system.</span>
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
