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
              "name": "Grovia Digi",
              "alternateName": "Groviadigi",
              "url": "https://groviadigi.com",
              "logo": "https://groviadigi.com/logo.png",
              "description": "Premium digital marketing agency built in Ajmer, Rajasthan. SEO, social media, performance marketing, GEO, email, lead generation, web development & AI-CRM systems. Trusted across India.",
              "foundingDate": "2024",
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "Ajmer",
                "addressRegion": "Rajasthan",
                "addressCountry": "IN"
              },
              "contactPoint": {
                "@type": "ContactPoint",
                "telephone": "+91-98290-84210",
                "email": "hello@groviadigi.co",
                "contactType": "customer service",
                "availableLanguage": ["English", "Hindi"]
              },
              "sameAs": [
                "https://www.instagram.com/groviadigi",
                "https://www.linkedin.com/company/groviadigi",
                "https://www.facebook.com/groviadigi"
              ]
            },
            {
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              "name": "Grovia Digi",
              "image": "https://groviadigi.com/og-image.png",
              "@id": "https://groviadigi.com",
              "url": "https://groviadigi.com",
              "telephone": "+91-98290-84210",
              "email": "hello@groviadigi.co",
              "priceRange": "₹₹",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "Ajmer",
                "addressLocality": "Ajmer",
                "addressRegion": "Rajasthan",
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
                  "Monday", "Tuesday", "Wednesday",
                  "Thursday", "Friday", "Saturday"
                ],
                "opens": "10:00",
                "closes": "19:00"
              },
              "areaServed": [
                { "@type": "City", "name": "Ajmer" },
                { "@type": "State", "name": "Rajasthan" },
                { "@type": "Country", "name": "India" }
              ],
              "hasMap": "https://maps.google.com/?q=Ajmer,Rajasthan,India"
            },
            {
              "@context": "https://schema.org",
              "@type": "Service",
              "serviceType": "Digital Marketing",
              "provider": {
                "@type": "Organization",
                "name": "Grovia Digi"
              },
              "areaServed": "India",
              "hasOfferCatalog": {
                "@type": "OfferCatalog",
                "name": "Digital Marketing Services",
                "itemListElement": [
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": "Social Media Marketing",
                      "description": "Platform-native content, Reels, carousels, community management and brand voice — the full social ecosystem."
                    }
                  },
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": "Performance Marketing",
                      "description": "High-ROI Meta, Google & YouTube ad campaigns. Every rupee tracked. Every click optimised."
                    }
                  },
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": "SEO — Search Engine Optimisation",
                      "description": "Technical audits, keyword strategy, on-page optimisation, local SEO and authority building that compounds month after month."
                    }
                  },
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": "GEO — Generative Engine Optimisation",
                      "description": "Optimise your brand to appear in ChatGPT, Perplexity and Google AI Overview answers — next-generation search visibility."
                    }
                  },
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": "Email Marketing",
                      "description": "Cold outreach to nurture flows — inbound and outbound email campaigns with Mailchimp, Zoho & HubSpot."
                    }
                  },
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": "Lead Generation",
                      "description": "End-to-end lead generation systems — landing pages, funnels, CRM integration and automated follow-ups."
                    }
                  },
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": "Website Development",
                      "description": "Mobile-first, lightning-fast websites from simple business sites to full e-commerce platforms."
                    }
                  },
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": "AI & CRM Systems",
                      "description": "Zoho and HubSpot CRM setup, lead pipeline automation, AI-powered lead scoring and sales workflow design."
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
                  "name": "What does a digital marketing agency actually do?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "A digital marketing agency runs the strategy, content, ads, SEO, email, and automation that grow your online presence and revenue. At Grovia Digi, we run all seven channels under one roof — so you don't have to coordinate between freelancers and platforms. We focus on outcomes (leads, sales, bookings), not just outputs (posts, clicks, impressions)."
                  }
                },
                {
                  "@type": "Question",
                  "name": "How much does digital marketing cost in India?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Digital marketing budgets in India typically range from ₹25,000 to ₹3,00,000+ per month depending on business size, industry competition, and growth goals. Small businesses often start at ₹25,000–₹60,000 covering SEO, Google Business Profile, and basic social media. Growing businesses invest ₹60,000–₹1,50,000 for full-funnel campaigns."
                  }
                },
                {
                  "@type": "Question",
                  "name": "How long does it take to see results from digital marketing?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Paid ads can deliver leads within days. Social media engagement compounds over 1–3 months. SEO and content marketing typically show meaningful results in 4–6 months and accelerate from there."
                  }
                },
                {
                  "@type": "Question",
                  "name": "Do you only work with Ajmer-based businesses?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Not at all. We're based in Ajmer, Rajasthan, but we work with brands across India. Our entire workflow is digital-first — strategy calls, creative reviews, reporting, training — all remote. Geography doesn't limit results."
                  }
                },
                {
                  "@type": "Question",
                  "name": "What industries do you specialise in?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "We've built deep expertise in six industries: Restaurants & Food, Gyms & Fitness, Jewellery & Lifestyle, Food Manufacturers, Travel Agencies, and Startups & SMEs."
                  }
                },
                {
                  "@type": "Question",
                  "name": "What is GEO and how is it different from SEO?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "SEO (Search Engine Optimisation) helps you rank on Google. GEO (Generative Engine Optimisation) helps you appear in AI-generated answers — ChatGPT, Perplexity, Google AI Overviews. As AI search grows, GEO is becoming the natural extension of SEO. We do both, and we treat them as one connected strategy."
                  }
                },
                {
                  "@type": "Question",
                  "name": "Will I own the work and accounts you create?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "100% yes. Every ad account, every CRM workspace, every social profile, every piece of content — it's yours. We work for you, not over you. If you ever leave us, you walk away with everything."
                  }
                },
                {
                  "@type": "Question",
                  "name": "How do I get started with Grovia Digi?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Book a free 30-minute strategy call. We'll audit your current digital presence, identify your single biggest growth opportunity, and tell you exactly what we'd do — even if you decide not to hire us. Zero commitment, real value either way."
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
