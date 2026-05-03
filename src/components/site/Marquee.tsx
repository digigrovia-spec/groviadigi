import { memo } from "react";

const tools = [
  { name: "Canva", slug: "canva" },
  { name: "Photoshop", slug: "adobephotoshop" },
  { name: "Illustrator", slug: "adobeillustrator" },
  { name: "InDesign", slug: "adobeindesign" },
  { name: "Figma", slug: "figma" },
  { name: "DALL·E", slug: "openai" },
  { name: "SEMrush", slug: "semrush" },
  { name: "Analytics", slug: "googleanalytics" },
  { name: "Search Console", slug: "googlesearchconsole" },
  { name: "Google Ads", slug: "googleads" },
  { name: "Meta", slug: "meta" },
  { name: "LinkedIn", slug: "linkedin" },
  { name: "GTM", slug: "googletagmanager" },
  { name: "Looker", slug: "looker" },
  { name: "HubSpot", slug: "hubspot" },
  { name: "Zoho", slug: "zoho" },
  { name: "Mailchimp", slug: "mailchimp" },
  { name: "Brevo", slug: "brevo" },
  { name: "Hootsuite", slug: "hootsuite" },
  { name: "Buffer", slug: "buffer" },
  { name: "Notion", slug: "notion" },
  { name: "ClickUp", slug: "clickup" },
  { name: "Asana", slug: "asana" },
  { name: "Slack", slug: "slack" },
];

const getIconUrl = (slug: string) => {
  const removedSlugs = [
    "canva", "adobephotoshop", "adobeillustrator", "adobeindesign",
    "openai", "linkedin", "slack"
  ];
  const version = removedSlugs.includes(slug) ? "10.0.0" : "11.0.0";
  return `https://cdn.jsdelivr.net/npm/simple-icons@${version}/icons/${slug}.svg`;
};

const Marquee = memo(() => {
  const row = [...tools, ...tools];
  return (
    <div className="w-full pt-4 md:pt-8 pb-0">
      <div className="w-full text-center mb-4">
        <span className="font-mono uppercase tracking-[0.2em] text-xs md:text-sm text-teal/60 dark:text-white/50 font-medium">
          Partnered With
        </span>
      </div>
      <section aria-label="Toolstack" className="relative overflow-hidden border-y border-teal/18 dark:border-white/10 bg-paper py-6 md:py-8">
        <div className="marquee-track gap-12 md:gap-16 hover:[animation-play-state:paused]">
          {row.map((tool, i) => (
            <div key={i} className="group relative flex flex-col items-center justify-center cursor-pointer p-2">
              <div
                className="w-10 h-10 md:w-12 md:h-12 bg-teal dark:bg-white opacity-80 transition-all duration-300 group-hover:opacity-100 group-hover:scale-125"
                style={{
                  maskImage: `url(${getIconUrl(tool.slug)})`,
                  WebkitMaskImage: `url(${getIconUrl(tool.slug)})`,
                  maskSize: "contain",
                  WebkitMaskSize: "contain",
                  maskRepeat: "no-repeat",
                  WebkitMaskRepeat: "no-repeat",
                  maskPosition: "center",
                  WebkitMaskPosition: "center",
                }}
              />
              <span className="absolute -bottom-6 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-1 group-hover:translate-y-0 text-xs md:text-sm font-display text-teal dark:text-white uppercase tracking-widest whitespace-nowrap pointer-events-none">
                {tool.name}
              </span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
});

Marquee.displayName = "Marquee";

export default Marquee;

