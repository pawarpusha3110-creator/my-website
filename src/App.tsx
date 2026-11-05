import { useEffect } from "react";
import { initScroll, ScrollTrigger } from "@/lib/scroll";
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { AboutUs } from "./components/AboutUs";
import { WhatWeDo } from "./components/WhatWeDo";
import { Industries } from "./components/Industries";
import { WhyChoose } from "./components/WhyChoose";
import { Contact } from "./components/Contact";
import { CTABand } from "./components/CTABand";
import { Footer } from "./components/Footer";

export default function App() {
  useEffect(() => {
    initScroll();
    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener("load", refresh);
    const t = setTimeout(refresh, 600);
    return () => {
      window.removeEventListener("load", refresh);
      clearTimeout(t);
    };
  }, []);

  return (
    <>
      <Header />
      <main>
        <Hero />
        <AboutUs />
        <WhatWeDo />
        <Industries />
        <WhyChoose />
        <Contact />
        <CTABand />
      </main>
      <Footer />
    </>
  );
}
