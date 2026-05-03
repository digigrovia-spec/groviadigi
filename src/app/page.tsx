import dynamic from "next/dynamic";
import Nav from "@/components/site/Nav";
import Hero from "@/components/site/Hero";
import Marquee from "@/components/site/Marquee";
import { RevealController } from "@/components/ui/reveal-controller";

// Below-the-fold components — dynamically imported to reduce initial JS bundle.
// These won't block the hero section from rendering.
const Services = dynamic(() => import("@/components/site/Services"), { ssr: true });
const Process = dynamic(() => import("@/components/site/Process"), { ssr: true });
const Work = dynamic(() => import("@/components/site/Work"), { ssr: true });
const Results = dynamic(() => import("@/components/site/Results"), { ssr: true });
const Testimonials = dynamic(() => import("@/components/site/Testimonials"), { ssr: true });
const Studio = dynamic(() => import("@/components/site/Studio"), { ssr: true });
const Contact = dynamic(() => import("@/components/site/Contact"), { ssr: true });
const Footer = dynamic(() => import("@/components/site/Footer"), { ssr: true });

export default function Page() {
  return (
    <main className="bg-paper text-ink">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            {
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "Groviadigi",
              "url": "https://groviadigi.com",
              "logo": "https://groviadigi.com/logo.png",
              "description": "Groviadigi is a digital studio building premium brand systems and performance engines for founders.",
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "Rajasthan",
                "addressCountry": "IN"
              },
              "contactPoint": {
                "@type": "ContactPoint",
                "email": "hello@groviadigi.com",
                "contactType": "customer service"
              }
            },
            {
              "@context": "https://schema.org",
              "@type": "Service",
              "serviceType": "Digital Marketing & Branding",
              "provider": {
                "@type": "Organization",
                "name": "Groviadigi"
              },
              "areaServed": "Worldwide",
              "hasOfferCatalog": {
                "@type": "OfferCatalog",
                "name": "Digital Services",
                "itemListElement": [
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": "Brand & Identity",
                      "description": "Positioning, naming, visual systems and verbal identity that signal premium without shouting."
                    }
                  },
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": "Performance Marketing",
                      "description": "Paid media engineered around incrementality, not vanity. Meta, Google, LinkedIn, programmatic."
                    }
                  },
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": "Content & SEO",
                      "description": "Editorial-grade content built around search intent and long-term authority."
                    }
                  },
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": "Web & Product",
                      "description": "Sites that do real work — fast, accessible, conversion-tuned. Built for growth."
                    }
                  }
                ]
              }
            },
            {
              "@context": "https://schema.org",
              "@type": "FAQPage",
              "mainEntity": [
                {
                  "@type": "Question",
                  "name": "What is your approach to outcomes?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "We prioritize outcomes over outputs. Every engagement ships against a number you'd defend in a board meeting."
                  }
                },
                {
                  "@type": "Question",
                  "name": "Who works on my project?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "The people who pitch are the people who build. We have no account layers or junior swaps."
                  }
                }
              ]
            },
            {
              "@context": "https://schema.org",
              "@type": "BreadcrumbList",
              "itemListElement": [
                {
                  "@type": "ListItem",
                  "position": 1,
                  "name": "Home",
                  "item": "https://groviadigi.com"
                }
              ]
            },
            {
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              "name": "Groviadigi",
              "image": "https://groviadigi.com/og-image.png",
              "@id": "https://groviadigi.com",
              "url": "https://groviadigi.com",
              "telephone": "",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "Ajmer",
                "addressLocality": "Rajasthan",
                "addressRegion": "RJ",
                "postalCode": "305001",
                "addressCountry": "IN"
              },
              "geo": {
                "@type": "GeoCoordinates",
                "latitude": 26.4499,
                "longitude": 74.6399
              },
              "openingHoursSpecification": {
                "@type": "OpeningHoursSpecification",
                "dayOfWeek": [
                  "Monday",
                  "Tuesday",
                  "Wednesday",
                  "Thursday",
                  "Friday"
                ],
                "opens": "10:00",
                "closes": "19:00"
              }
            }
          ])
        }}
      />
      <RevealController />
      <Nav />
      <Hero />
      <Marquee />
      <div className="section-perf"><Services /></div>
      <div className="section-perf"><Process /></div>
      <div className="section-perf"><Work /></div>
      <div className="section-perf"><Results /></div>
      <div className="section-perf"><Testimonials /></div>
      <div className="section-perf"><Studio /></div>
      <div className="section-perf"><Contact /></div>
      <Footer />
    </main>
  );
}
