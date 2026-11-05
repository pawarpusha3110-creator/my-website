import { scrollToId } from "@/lib/scroll";
import { Marquee } from "./Marquee";
import { Reveal, RevealText } from "./Reveal";
import { ZolvexMark } from "./ZolvexLogo";

export function CTABand() {
  return (
    <section className="relative overflow-hidden bg-ink text-paper">
      {/* marquee strip */}
      <div className="border-y border-paper/10 bg-brand py-2.5 text-white">
        <Marquee
          items={[
            "Intelligent Websites",
            "AI Customer Experiences",
            "Business Automation",
            "Digital Systems",
            "Smart Technology",
            "Custom Development",
          ]}
        />
      </div>

      <div className="relative py-24 sm:py-32">
        <div className="pointer-events-none absolute inset-0 bg-grid-dark opacity-50" />
        <div className="pointer-events-none absolute left-1/2 top-1/2 h-[520px] w-[760px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand/18 blur-[140px] animate-glow" />

        <div className="relative mx-auto max-w-[1340px] px-5 text-center sm:px-8">
          <Reveal className="mb-8 flex justify-center">
            <span className="animate-float">
              <ZolvexMark className="h-16 w-16 drop-shadow-[0_14px_36px_rgba(250,95,1,0.45)] sm:h-20 sm:w-20" />
            </span>
          </Reveal>

          <RevealText
            text="Your business deserves"
            className="block font-display text-[11vw] font-bold leading-[1.02] tracking-tight text-paper sm:text-6xl lg:text-[4.4rem]"
          />
          <RevealText
            text="smarter technology."
            delay={0.12}
            className="block text-gradient-brand font-display text-[11vw] font-bold leading-[1.02] tracking-tight sm:text-6xl lg:text-[4.4rem]"
          />

          <Reveal delay={0.2}>
            <p className="mx-auto mt-7 max-w-xl font-sans text-base leading-relaxed text-paper/60 sm:text-[17px]">
              Smart websites, AI and automation built around your business. Tell us what
              you need and we&apos;ll take it from there.
            </p>
          </Reveal>

          <Reveal delay={0.28} className="mt-10 flex flex-wrap items-center justify-center gap-3.5">
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                scrollToId("#contact");
              }}
              className="group relative inline-flex items-center gap-2.5 overflow-hidden rounded-full bg-brand px-8 py-4 font-sans text-[15px] font-semibold text-white shadow-lg shadow-brand/30 transition-all duration-300 hover:shadow-2xl hover:shadow-brand/50"
            >
              <span className="relative z-10">Build Your Digital Solution</span>
              <span className="relative z-10 grid h-6 w-6 place-items-center rounded-full bg-white/20 transition-transform duration-300 group-hover:translate-x-0.5">
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M5 12h14M13 5l7 7-7 7"
                    stroke="currentColor"
                    strokeWidth="2.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
              <span className="absolute inset-0 -translate-x-full bg-paper/95 mix-blend-difference transition-transform duration-500 group-hover:translate-x-0" />
            </a>
            <a
              href="mailto:hello@zolvex.ai"
              className="inline-flex items-center gap-2 rounded-full border border-paper/20 px-8 py-4 font-sans text-[15px] font-semibold text-paper transition-colors duration-300 hover:border-paper/60 hover:bg-paper/5"
            >
              hello@zolvex.ai
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
