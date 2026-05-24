import type { Metadata } from "next";
import Script from "next/script";
import Link from "next/link";
import dynamic from "next/dynamic";

const BlogNav = dynamic(() => import("@/components/site/BlogNav"), { ssr: true });
const Footer = dynamic(() => import("@/components/site/Footer"), { ssr: true });

export const metadata: Metadata = {
  title: "Blog — Digital Marketing Insights | Grovia Digi",
  description:
    "Expert insights on SEO, GEO, social media marketing, performance ads and AI-driven growth strategies from the Grovia Digi team in Rajasthan, India.",
  keywords: [
    "digital marketing blog india",
    "seo tips india",
    "generative engine optimization blog",
    "geo blog india",
    "social media marketing tips",
    "performance marketing india",
    "answer engine optimization",
    "digital marketing rajasthan blog",
    "ai marketing strategy india",
    "email marketing tips india",
  ],
  openGraph: {
    title: "Blog — Digital Marketing Insights | Grovia Digi",
    description:
      "Expert insights on SEO, GEO, social media marketing, performance ads and AI-driven growth from the Grovia Digi team.",
    url: "https://groviadigi.in/blog",
    siteName: "Grovia Digi",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Grovia Digi Blog — Digital Marketing Insights",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog — Digital Marketing Insights | Grovia Digi",
    description:
      "SEO, GEO, performance marketing and AI growth strategies for Indian businesses.",
    images: ["/og-image.png"],
  },
  alternates: {
    canonical: "https://groviadigi.in/blog",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
};

const categories = [
  { label: "All", active: true },
  { label: "SEO", active: false },
  { label: "GEO", active: false },
  { label: "Social Media", active: false },
  { label: "Performance", active: false },
  { label: "AI & CRM", active: false },
  { label: "Email", active: false },
];

const posts = [
  {
    category: "GEO",
    title: "What is GEO? How to Get Your Brand Cited in ChatGPT and AI Overviews",
    excerpt:
      "Generative Engine Optimisation is the next layer of search. Here's exactly what it is, why it matters, and the steps we use at Grovia Digi to get brands cited by AI.",
    readTime: "8 min read",
    featured: true,
  },
  {
    category: "SEO",
    title: "Local SEO in Rajasthan: The Complete 2026 Guide for Indian Businesses",
    excerpt:
      "From Google Business Profile to hyperlocal content — a step-by-step system for dominating local search in Rajasthan and across India.",
    readTime: "12 min read",
    featured: true,
  },
  {
    category: "Social Media",
    title: "Why Your Instagram Reels Get Zero Reach (And How to Fix It)",
    excerpt:
      "Three structural reasons most Reels fail before they start — and the hook-proof-punchline framework we use to build scroll-stopping content.",
    readTime: "6 min read",
    featured: false,
  },
  {
    category: "Performance",
    title: "Meta Ads in India 2026: CPM, CTR Benchmarks and What's Actually Working",
    excerpt:
      "Real data from active campaigns across restaurants, gyms, and e-commerce. Stop guessing what a 'good' ROAS looks like.",
    readTime: "7 min read",
    featured: false,
  },
  {
    category: "AI & CRM",
    title: "How to Set Up a Zero-Leak Lead Pipeline with Zoho and WhatsApp",
    excerpt:
      "The exact automation stack we deploy for clients — from first click to closed deal — without losing a single lead in the gaps.",
    readTime: "10 min read",
    featured: false,
  },
  {
    category: "Email",
    title: "Cold Email in 2026: What Still Works (And What Gets You Blacklisted)",
    excerpt:
      "Deliverability, open rates, reply rates — the fundamentals haven't changed, but the rules have. Here's the updated playbook.",
    readTime: "9 min read",
    featured: false,
  },
];

const faqs = [
  {
    question: "What topics does the Grovia Digi blog cover?",
    answer:
      "The Grovia Digi blog covers SEO, Generative Engine Optimisation (GEO), social media marketing, performance advertising on Meta and Google, email marketing, AI-driven lead generation, CRM automation, and digital growth strategy — all from the perspective of an agency working with Indian businesses.",
  },
  {
    question: "What is GEO and why should Indian businesses care about it?",
    answer:
      "GEO (Generative Engine Optimisation) helps your brand appear in AI-generated answers from ChatGPT, Perplexity, and Google AI Overviews. As more users skip Google's traditional results and ask AI directly, appearing in those answers means being the brand they trust. Indian businesses that invest in GEO now will have a significant advantage in 2026 and beyond.",
  },
  {
    question: "How often will new articles be published?",
    answer:
      "We publish two to three in-depth articles per week — Monday, Wednesday, and Friday. Each piece is built around real campaign data, actionable frameworks, and specific tactics you can implement immediately. No filler, no fluff.",
  },
  {
    question: "Are these strategies applicable to small businesses in India?",
    answer:
      "Yes. Every strategy on this blog is designed with Indian businesses in mind — including budget constraints, local platform behaviour, bilingual audiences, and the specific competitive dynamics of industries like food, fitness, jewellery, and travel.",
  },
  {
    question: "What is Answer Engine Optimisation (AEO)?",
    answer:
      "AEO is the practice of structuring your content so it directly answers the questions people ask AI assistants and voice search engines. Instead of optimising for keywords, you optimise for questions. This means clear, concise answers, FAQ schema markup, and content that mirrors how people actually phrase their queries to Siri, Google Assistant, and ChatGPT.",
  },
  {
    question: "Can I get notified when new posts go live?",
    answer:
      "Yes. Subscribe using the form on this page and we will send each new article directly to your inbox. One email per article — no newsletters, no spam. Unsubscribe any time.",
  },
];

const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: "Grovia Digi Blog",
    description:
      "Expert insights on SEO, GEO, social media marketing, performance advertising and AI-driven growth from the Grovia Digi team in Rajasthan, India.",
    url: "https://groviadigi.in/blog",
    inLanguage: "en-IN",
    publisher: {
      "@type": "Organization",
      name: "Grovia Digi",
      url: "https://groviadigi.in",
      logo: {
        "@type": "ImageObject",
        url: "https://groviadigi.in/og-image.png",
      },
    },
    about: [
      { "@type": "Thing", name: "Search Engine Optimization" },
      { "@type": "Thing", name: "Generative Engine Optimization" },
      { "@type": "Thing", name: "Answer Engine Optimization" },
      { "@type": "Thing", name: "Social Media Marketing" },
      { "@type": "Thing", name: "Performance Marketing" },
      { "@type": "Thing", name: "Digital Marketing India" },
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Blog — Digital Marketing Insights | Grovia Digi",
    description:
      "Expert insights on SEO, GEO, social media marketing, performance ads and AI-driven growth strategies for Indian businesses.",
    url: "https://groviadigi.in/blog",
    isPartOf: {
      "@type": "WebSite",
      name: "Grovia Digi",
      url: "https://groviadigi.in",
    },
    breadcrumb: {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://groviadigi.in" },
        { "@type": "ListItem", position: 2, name: "Blog", item: "https://groviadigi.in/blog" },
      ],
    },
    author: {
      "@type": "Organization",
      name: "Grovia Digi",
      url: "https://groviadigi.in",
    },
    about: {
      "@type": "Thing",
      name: "Digital Marketing",
      description: "Strategies and tactics for SEO, GEO, social media, and performance marketing in India.",
    },
  },
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://groviadigi.in" },
      { "@type": "ListItem", position: 2, name: "Blog", item: "https://groviadigi.in/blog" },
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  },
  {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Grovia Digi",
    url: "https://groviadigi.in",
    logo: "https://groviadigi.in/og-image.png",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Rajasthan",
      addressRegion: "Rajasthan",
      addressCountry: "IN",
    },
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+91-93520-00935",
      email: "Hello@groviadigi.in",
      contactType: "customer service",
      availableLanguage: ["English", "Hindi"],
    },
    sameAs: [
      "https://www.instagram.com/groviadigi",
      "https://www.linkedin.com/company/groviadigi",
    ],
  },
];

export default function BlogPage() {
  return (
    <main className="bg-paper text-ink">
      <Script
        id="blog-json-ld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <BlogNav />

      {/* ── Hero ── */}
      <section
        className="relative bg-teal overflow-hidden pt-40 pb-24 px-6 md:px-10 grain"
        aria-labelledby="blog-hero-heading"
      >
        <div className="mx-auto max-w-[1400px] relative z-10">
          <nav aria-label="Breadcrumb" className="mb-8">
            <ol className="flex items-center gap-2 font-mono-tag text-paper/60">
              <li>
                <Link href="/" className="hover:text-paper transition-colors">
                  Home
                </Link>
              </li>
              <li aria-hidden="true" className="text-paper/40">/</li>
              <li className="text-paper/80" aria-current="page">Blog</li>
            </ol>
          </nav>

          <div className="max-w-4xl">
            <p className="font-mono-tag text-blue mb-6">Grow Loud · Insights</p>
            <h1
              id="blog-hero-heading"
              className="font-display text-7xl md:text-[9vw] text-paper leading-none mb-8"
            >
              The Blog.
            </h1>
            <p className="font-sans text-lg md:text-xl text-paper/80 max-w-2xl leading-relaxed">
              Real tactics. Real data. Built for Indian businesses ready to grow online — through
              SEO, GEO, social media, performance ads, and AI-powered systems.
            </p>
          </div>
        </div>

        {/* Ambient glow — pattern C */}
        <div
          className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-blue/10 blur-[120px] pointer-events-none"
          aria-hidden="true"
        />
        <div
          className="absolute -bottom-20 -left-20 w-[400px] h-[400px] rounded-full bg-teal/30 blur-[100px] pointer-events-none"
          aria-hidden="true"
        />
      </section>

      {/* ── Category Filter ── */}
      <div className="border-b border-ink/10 sticky top-[72px] z-40 bg-paper/90 backdrop-blur-sm">
        <div className="mx-auto max-w-[1400px] px-6 md:px-10">
          <div
            className="flex items-center gap-2 overflow-x-auto py-4"
            role="tablist"
            aria-label="Filter articles by topic"
          >
            {categories.map((cat) => (
              <button
                key={cat.label}
                role="tab"
                aria-selected={cat.active}
                className={`font-mono-tag whitespace-nowrap px-4 py-2 rounded-full transition-all duration-300 ${
                  cat.active
                    ? "bg-ink text-paper"
                    : "bg-transparent text-ink-muted border border-ink/15 hover:border-ink/40 hover:text-ink"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── Coming Soon Notice ── */}
      <div className="mx-auto max-w-[1400px] px-6 md:px-10 pt-14 pb-2">
        <div className="flex items-center gap-3">
          <span className="pulse-dot" aria-hidden="true" />
          <p className="font-mono-tag text-ink-muted">
            Articles dropping soon — subscribe below to read first
          </p>
        </div>
      </div>

      {/* ── Featured Posts ── */}
      <section
        className="section-perf"
        aria-labelledby="featured-posts-heading"
      >
        <div className="mx-auto max-w-[1400px] px-6 md:px-10 py-10">
          <h2
            id="featured-posts-heading"
            className="font-mono-tag text-ink-muted mb-8"
          >
            Featured
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {posts
              .filter((p) => p.featured)
              .map((post, i) => (
                <article
                  key={i}
                  className="group relative rounded-2xl overflow-hidden bg-invert text-invert-fg p-8 md:p-10"
                  aria-label={post.title}
                >
                  <div className="flex items-center justify-between mb-6">
                    <span className="font-mono-tag text-blue">{post.category}</span>
                    <span className="font-mono-tag text-invert-fg-muted">{post.readTime}</span>
                  </div>
                  <h3 className="font-display text-3xl md:text-4xl text-invert-fg mb-4 leading-tight">
                    {post.title}
                  </h3>
                  <p className="font-sans text-invert-fg-soft/80 text-base leading-relaxed mb-8">
                    {post.excerpt}
                  </p>
                  <span className="inline-flex items-center gap-2 font-mono-tag text-invert-fg-muted border border-invert-fg/20 px-4 py-2 rounded-full">
                    Coming soon
                  </span>
                  <div
                    className="absolute bottom-0 right-0 w-64 h-64 rounded-full bg-teal/15 blur-[60px] pointer-events-none"
                    aria-hidden="true"
                  />
                </article>
              ))}
          </div>
        </div>
      </section>

      {/* ── All Posts Grid ── */}
      <section
        className="section-perf"
        aria-labelledby="all-posts-heading"
      >
        <div className="mx-auto max-w-[1400px] px-6 md:px-10 pb-20">
          <h2
            id="all-posts-heading"
            className="font-mono-tag text-ink-muted mb-8"
          >
            All Articles
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts
              .filter((p) => !p.featured)
              .map((post, i) => (
                <article
                  key={i}
                  className="group rounded-2xl border border-ink/10 bg-paper p-7 transition-all duration-500 hover:border-teal/40 hover:shadow-[0_8px_30px_-8px_hsl(var(--teal)/0.25)]"
                  aria-label={post.title}
                >
                  <div className="flex items-center justify-between mb-5">
                    <span className="font-mono-tag text-teal">{post.category}</span>
                    <span className="font-mono-tag text-ink-muted">{post.readTime}</span>
                  </div>
                  <h3 className="font-display text-2xl text-ink mb-3 leading-tight">
                    {post.title}
                  </h3>
                  <p className="font-sans text-ink-soft/80 text-sm leading-relaxed mb-6">
                    {post.excerpt}
                  </p>
                  <span className="inline-flex font-mono-tag text-ink-muted border border-ink/10 px-3 py-1.5 rounded-full text-[0.6rem]">
                    Coming soon
                  </span>
                </article>
              ))}
          </div>
        </div>
      </section>

      {/* ── Newsletter CTA ── */}
      <section
        className="section-perf bg-teal"
        aria-labelledby="newsletter-heading"
      >
        <div className="mx-auto max-w-[1400px] px-6 md:px-10 py-20 md:py-28">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <p className="font-mono-tag text-blue mb-4">No spam. Just strategy.</p>
              <h2
                id="newsletter-heading"
                className="font-display text-5xl md:text-6xl text-paper leading-none mb-6"
              >
                Read first.
                <br />
                <span className="font-serif text-sand">Think ahead.</span>
              </h2>
              <p className="font-sans text-paper/75 text-lg leading-relaxed max-w-md">
                Get every new article in your inbox the moment it&apos;s published. Digital
                marketing insights written for Indian businesses — zero filler.
              </p>
            </div>
            <div>
              <form
                action="https://groviadigi.in/api/subscribe"
                method="POST"
                aria-label="Subscribe to the Grovia Digi blog"
                className="flex flex-col sm:flex-row gap-3"
              >
                <label htmlFor="blog-email" className="sr-only">
                  Email address
                </label>
                <input
                  id="blog-email"
                  type="email"
                  name="email"
                  placeholder="your@email.com"
                  required
                  autoComplete="email"
                  className="flex-1 rounded-full px-6 py-4 bg-paper text-ink placeholder:text-ink-muted font-sans text-sm outline-none focus:ring-2 focus:ring-blue transition-shadow"
                />
                <button type="submit" className="pill-cta whitespace-nowrap text-sm">
                  Subscribe free →
                </button>
              </form>
              <p className="font-mono-tag text-paper/50 mt-4">
                One email per article. Unsubscribe anytime.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQ — AEO & GEO ── */}
      <section
        className="section-perf bg-paper-deep"
        aria-labelledby="faq-heading"
      >
        <div className="mx-auto max-w-[1400px] px-6 md:px-10 py-20 md:py-28">
          <div className="grid md:grid-cols-12 gap-12">
            <div className="md:col-span-4">
              <p className="font-mono-tag text-teal mb-4">Common Questions</p>
              <h2
                id="faq-heading"
                className="font-display text-5xl text-ink leading-none"
              >
                What people
                <br />
                ask first.
              </h2>
              <p className="font-sans text-ink-soft/70 text-base leading-relaxed mt-6">
                About the blog, our approach, and what SEO, GEO, and AEO actually mean for your
                business.
              </p>
            </div>
            <div className="md:col-span-8">
              <dl className="divide-y divide-ink/10">
                {faqs.map((faq, i) => (
                  <div key={i} className="py-8">
                    <dt className="font-display text-xl text-ink mb-3">{faq.question}</dt>
                    <dd className="font-sans text-ink-soft/80 text-base leading-relaxed">
                      {faq.answer}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>
      </section>

      {/* ── Bottom CTA ── */}
      <section className="section-perf">
        <div className="mx-auto max-w-[1400px] px-6 md:px-10 py-20 md:py-28 text-center">
          <p className="font-mono-tag text-ink-muted mb-6">Ready to grow?</p>
          <h2 className="font-display text-6xl md:text-8xl text-ink leading-none mb-10">
            Let&apos;s build
            <br />
            <span className="text-teal">something</span> loud.
          </h2>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/#contact" className="pill-cta text-base">
              Book a free strategy call →
            </Link>
            <Link href="/" className="pill-ghost text-base">
              Back to home
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
