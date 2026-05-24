import Nav from "@/components/site/Nav";
import Footer from "@/components/site/Footer";
import Link from "next/link";
import Image from "next/image";

export const metadata = {
  title: "Blog | Grovia Digi",
  description: "Digital marketing insights, case studies, and growth tactics from the Grovia Digi team — built for Indian businesses.",
};

const publishedPosts = [
  {
    slug: "how-kitkat-became-1-chocolate-brand-india",
    category: "Case Study",
    title: "How KitKat Became the #1 Chocolate Brand in India",
    excerpt:
      "A marketer's breakdown of the 90-year-old brand that just made India its largest market globally — and turned a chocolate wrapper into a Faraday cage.",
    author: "Abhuday Tripathi",
    date: "May 2026",
    readTime: "12 min read",
    cover: "/images/kitkat-case-study-cover.png",
  },
];

const upcomingTopics = [
  "SEO", "GEO", "Social Media", "Performance Marketing",
  "Email Marketing", "AI & CRM", "Lead Generation", "Web Design",
];

export default function BlogPage() {
  return (
    <main className="bg-paper text-ink">
      <Nav />

      {/* ── Hero ── */}
      <section className="relative overflow-hidden pt-40 pb-16 px-6 md:px-10">
        <div className="mx-auto max-w-[1400px]">
          <p className="font-mono-tag text-blue mb-6">Grow Loud · Insights</p>
          <h1 className="font-display text-7xl md:text-[10vw] text-ink leading-none mb-8">
            The Blog.
          </h1>
          <p className="font-sans text-lg md:text-xl text-ink-soft max-w-xl leading-relaxed">
            Real tactics. Real data. Built for Indian businesses ready to grow — SEO, GEO, social media, performance ads, and AI-powered systems.
          </p>
        </div>
      </section>

      {/* ── Published Articles ── */}
      <section className="mx-auto max-w-[1400px] px-6 md:px-10 pb-10">
        <h2 className="font-mono-tag text-ink-muted mb-8">Latest</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {publishedPosts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group rounded-2xl overflow-hidden border border-ink/10 bg-paper transition-all duration-500 hover:border-teal/40 hover:shadow-[0_8px_30px_-8px_hsl(var(--teal)/0.25)] flex flex-col"
            >
              {/* Cover */}
              <div className="relative w-full aspect-[16/10] bg-ink overflow-hidden">
                <Image
                  src={post.cover}
                  alt={post.title}
                  fill
                  className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              {/* Content */}
              <div className="p-7 flex flex-col flex-1">
                <div className="flex items-center justify-between mb-4">
                  <span className="font-mono-tag text-teal">{post.category}</span>
                  <span className="font-mono-tag text-ink-muted">{post.readTime}</span>
                </div>
                <h3 className="font-display text-2xl text-ink leading-tight mb-3 group-hover:text-teal transition-colors">
                  {post.title}
                </h3>
                <p className="font-sans text-sm text-ink-soft/80 leading-relaxed mb-6 flex-1">
                  {post.excerpt}
                </p>
                <div className="flex items-center gap-2 mt-auto">
                  <div className="w-7 h-7 rounded-full bg-teal flex items-center justify-center flex-shrink-0">
                    <span className="font-display text-paper text-[0.55rem]">AT</span>
                  </div>
                  <div>
                    <p className="font-sans text-xs font-medium text-ink">{post.author}</p>
                    <p className="font-mono-tag text-ink-muted" style={{ fontSize: "0.58rem" }}>{post.date}</p>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ── Coming Soon ── */}
      <section className="mx-auto max-w-[1400px] px-6 md:px-10 py-16">
        <div className="flex items-center gap-3 mb-10">
          <span className="pulse-dot" aria-hidden="true" />
          <p className="font-mono-tag text-ink-muted">More articles dropping soon</p>
        </div>
        <h2 className="font-display text-4xl md:text-5xl text-ink leading-none mb-6">
          We&apos;re writing.<br />
          <span className="text-teal">Stay tuned.</span>
        </h2>
        <p className="font-sans text-ink-soft/80 text-base leading-relaxed max-w-md mb-10">
          In-depth guides on SEO, GEO, social media, performance ads, and AI-driven growth — written for Indian businesses.
        </p>
        <Link href="/#contact" className="pill-cta text-sm">
          Talk to us in the meantime →
        </Link>
      </section>

      {/* ── Topics ── */}
      <section className="bg-invert text-invert-fg">
        <div className="mx-auto max-w-[1400px] px-6 md:px-10 py-16">
          <p className="font-mono-tag text-invert-fg-muted mb-8">Topics we cover</p>
          <div className="flex flex-wrap gap-3">
            {upcomingTopics.map((topic) => (
              <span
                key={topic}
                className="font-mono-tag border border-invert-fg/20 text-invert-fg-soft px-5 py-3 rounded-full"
              >
                {topic}
              </span>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
