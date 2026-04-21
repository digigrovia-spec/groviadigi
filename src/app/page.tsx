"use client";

import Nav from "@/components/site/Nav";
import Hero from "@/components/site/Hero";
import Marquee from "@/components/site/Marquee";
import Services from "@/components/site/Services";
import Process from "@/components/site/Process";
import Work from "@/components/site/Work";
import Results from "@/components/site/Results";
import Testimonials from "@/components/site/Testimonials";
import Studio from "@/components/site/Studio";
import Contact from "@/components/site/Contact";
import Footer from "@/components/site/Footer";
import { useReveal } from "@/hooks/use-reveal";

export default function Page() {
  useReveal();
  return (
    <main className="bg-paper text-ink">
      <Nav />
      <Hero />
      <Marquee />
      <Services />
      <Process />
      <Work />
      <Results />
      <Testimonials />
      <Studio />
      <Contact />
      <Footer />
    </main>
  );
}
