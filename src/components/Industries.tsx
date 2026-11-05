import { useEffect, useRef } from "react";
import { gsap, scrollToId } from "@/lib/scroll";
import { Reveal, RevealText } from "./Reveal";
import { IndustryMarquee, type Industry } from "./IndustryMarquee";

const MARQUEE: Industry[] = [
  { n: "01", label: "Manufacturing" },
  { n: "02", label: "Healthcare" },
  { n: "03", label: "Fintech" },
  { n: "04", label: "Logistics" },
  { n: "05", label: "Retail" },
  { n: "06", label: "Energy" },
  { n: "07", label: "Education" },
  { n: "08", label: "Real Estate" },
];

export function Industries() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".ind-strip",
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: { trigger: ".ind-strip", start: "top 92%", once: true },
        },
      );
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section id="industries" ref={root} className="relative overflow-hidden bg-white py-20 sm:py-28">
      <div className="pointer-events-none absolute left-1/2 top-0 h-[360px] w-[760px] -translate-x-1/2 rounded-full bg-brand/8 blur-[120px]" />

      <div className="relative mx-auto max-w-[1280px] px-5 sm:px-8">
        <div className="mx-auto mb-12 max-w-3xl text-center">
          <p className="mb-5 inline-flex items-center gap-3 font-sans text-[12.5px] font-semibold uppercase tracking-[0.22em] text-brand">
            <span className="h-px w-8 bg-brand" />
            Industries We Serve
            <span className="h-px w-8 bg-brand" />
          </p>
          <RevealText
            text="Built for how your industry really works."
            className="block font-display text-[9vw] font-bold leading-[1.04] tracking-tight text-ink sm:text-5xl"
          />
          <Reveal delay={0.12}>
            <p className="mt-6 font-sans text-base leading-relaxed text-muted sm:text-[17px]">
              We shape websites, AI tools and automation around the way your sector actually
              operates, not the other way around.
            </p>
          </Reveal>
        </div>

        <div className="ind-strip relative overflow-hidden rounded-3xl border border-ink/10 bg-paper">
          <div className="border-b border-ink/10 px-6 py-5 sm:px-8">
            <div className="flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-center">
              <p className="font-display text-lg font-semibold text-ink sm:text-xl">
                Don&apos;t see your industry? We build for any business.
              </p>
              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToId("#contact");
                }}
                className="inline-flex items-center gap-2 font-sans text-[14.5px] font-semibold text-brand transition-all duration-300 hover:gap-3.5"
              >
                Tell us about yours
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
                  <path
                    d="M5 12h14M13 5l7 7-7 7"
                    stroke="currentColor"
                    strokeWidth="2.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </a>
            </div>
          </div>
          <div className="py-7 sm:py-9">
            <IndustryMarquee items={MARQUEE} />
          </div>
        </div>
      </div>
    </section>
  );
}
