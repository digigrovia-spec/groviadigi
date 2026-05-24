import Nav from "@/components/site/Nav";
import Footer from "@/components/site/Footer";
import Link from "next/link";

export const metadata = {
  title: "Blog | Grovia Digi",
  description: "Digital marketing insights, SEO tips, GEO strategies and growth tactics from the Grovia Digi team.",
};

export default function BlogPage() {
  return (
    <main className="bg-paper text-ink">
      <Nav />

      {/* Hero */}
      <section className="relative overflow-hidden pt-40 pb-24 px-6 md:px-10">
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

      {/* Coming Soon */}
      <section className="mx-auto max-w-[1400px] px-6 md:px-10 py-28 md:py-36">
        <div className="flex flex-col items-center text-center gap-8">
          <div className="flex items-center gap-3">
            <span className="pulse-dot" aria-hidden="true" />
            <p className="font-mono-tag text-ink-muted">Articles dropping soon</p>
          </div>

          <h2 className="font-display text-5xl md:text-7xl text-ink leading-none max-w-3xl">
            We&apos;re writing.<br />
            <span className="text-teal">Stay tuned.</span>
          </h2>

          <p className="font-sans text-ink-soft/80 text-lg max-w-lg leading-relaxed">
            In-depth guides on SEO, GEO, social media marketing, performance ads, and AI-driven growth — written for Indian businesses.
          </p>

          <Link href="/#contact" className="pill-cta text-base mt-4">
            Talk to us in the meantime →
          </Link>
        </div>
      </section>

      {/* Topics preview */}
      <section className="bg-invert text-invert-fg">
        <div className="mx-auto max-w-[1400px] px-6 md:px-10 py-20">
          <p className="font-mono-tag text-invert-fg-muted mb-10">Topics we&apos;ll cover</p>
          <div className="flex flex-wrap gap-3">
            {["SEO", "GEO", "Social Media", "Performance Marketing", "Email Marketing", "AI & CRM", "Lead Generation", "Web Design"].map((topic) => (
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
