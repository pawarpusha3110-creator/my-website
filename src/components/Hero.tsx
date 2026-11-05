import { useEffect, useRef } from "react";
import { gsap, scrollToId } from "@/lib/scroll";
import { RevealText } from "./Reveal";
import { ZolvexMark } from "./ZolvexLogo";

const TRUST = ["Smart Technology", "Custom Development", "Business-Focused Solutions"];

export function Hero() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".h-fade",
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: 0.9, stagger: 0.1, delay: 0.5, ease: "power3.out" },
      );
      // floating orbs drift
      gsap.to(".orb-a", {
        x: 60,
        y: -40,
        duration: 14,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
      gsap.to(".orb-b", {
        x: -50,
        y: 50,
        duration: 18,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
      // hero mark spin-in + idle float
      gsap.fromTo(
        ".hero-mark",
        { opacity: 0, scale: 0.6, rotate: -18 },
        { opacity: 1, scale: 1, rotate: 0, duration: 1.4, delay: 0.3, ease: "expo.out" },
      );
      // parallax on scroll
      gsap.to(".hero-mark-wrap", {
        y: -70,
        ease: "none",
        scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: true },
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="home"
      ref={root}
      className="relative flex min-h-[100svh] items-center overflow-hidden bg-paper pt-28 pb-16"
    >
      {/* backdrop */}
      <div className="pointer-events-none absolute inset-0 bg-grid animate-grid opacity-70" />
      <div className="orb-a pointer-events-none absolute -left-32 top-10 h-[480px] w-[480px] rounded-full bg-brand/25 blur-[130px]" />
      <div className="orb-b pointer-events-none absolute -right-24 bottom-0 h-[420px] w-[420px] rounded-full bg-brand-400/25 blur-[120px]" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-paper to-transparent" />

      <div className="relative mx-auto grid w-full max-w-[1340px] items-center gap-14 px-5 sm:px-8 lg:grid-cols-[1.15fr_0.85fr]">
        {/* copy */}
        <div>
          <div className="h-fade mb-7 inline-flex items-center gap-2.5 rounded-full border border-ink/10 bg-white/70 px-4 py-2 backdrop-blur">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-brand" />
            </span>
            <span className="font-sans text-[12.5px] font-medium tracking-wide text-muted">
              Who we are — Zolvex.AI
            </span>
          </div>

          <h1 className="font-display font-bold leading-[1.02] tracking-tight text-ink">
            <RevealText
              text="Digital Solutions"
              mode="mount"
              delay={0.1}
              className="block text-[10.5vw] sm:text-[7vw] lg:text-[4.6rem]"
            />
            <RevealText
              text="That Help Your"
              mode="mount"
              delay={0.22}
              className="block text-[10.5vw] sm:text-[7vw] lg:text-[4.6rem]"
            />
            <RevealText
              text="Business Grow"
              mode="mount"
              delay={0.34}
              className="block text-gradient-brand text-[10.5vw] sm:text-[7vw] lg:text-[4.6rem]"
            />
          </h1>

          <p className="h-fade mt-7 max-w-xl font-sans text-base leading-relaxed text-muted sm:text-[17px]">
            We design intelligent websites, AI-powered customer experiences, and digital
            systems that help businesses attract customers, automate everyday tasks, and
            grow with confidence.
          </p>

          <div className="h-fade mt-9 flex flex-wrap items-center gap-3.5">
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                scrollToId("#contact");
              }}
              className="group relative inline-flex items-center gap-2.5 overflow-hidden rounded-full bg-brand px-7 py-3.5 font-sans text-[15px] font-semibold text-white shadow-lg shadow-brand/25 transition-all duration-300 hover:shadow-xl hover:shadow-brand/40"
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
              <span className="absolute inset-0 -translate-x-full bg-ink transition-transform duration-500 group-hover:translate-x-0" />
            </a>
            <a
              href="#services"
              onClick={(e) => {
                e.preventDefault();
                scrollToId("#services");
              }}
              className="inline-flex items-center gap-2 rounded-full border border-ink/15 px-7 py-3.5 font-sans text-[15px] font-semibold text-ink transition-colors duration-300 hover:border-ink/40 hover:bg-mutedbg"
            >
              Explore Our Services
            </a>
          </div>

          {/* trust line */}
          <div className="h-fade mt-12 flex max-w-xl flex-wrap items-center gap-x-3 gap-y-2 border-t border-ink/10 pt-7 font-sans text-[13.5px] font-medium text-muted sm:text-sm">
            {TRUST.map((t, i) => (
              <span key={t} className="inline-flex items-center gap-3">
                {i > 0 && <span className="h-1 w-1 rounded-full bg-brand" aria-hidden />}
                {t}
              </span>
            ))}
          </div>
        </div>

        {/* visual */}
        <div className="hero-mark-wrap relative hidden lg:block">
          <div className="relative mx-auto aspect-square w-full max-w-[420px]">
            {/* rotating rings */}
            <div className="absolute inset-0 animate-[spin_30s_linear_infinite] rounded-full border border-dashed border-ink/12" />
            <div className="absolute inset-[12%] animate-[spin_22s_linear_infinite_reverse] rounded-full border border-ink/10" />
            <div className="absolute inset-[24%] rounded-full bg-gradient-to-br from-brand/12 to-brand-400/5 blur-2xl animate-glow" />

            {/* the Z mark */}
            <div className="hero-mark absolute inset-[26%] animate-float">
              <ZolvexMark className="h-full w-full drop-shadow-[0_18px_40px_rgba(250,95,1,0.35)]" />
            </div>

            {/* orbiting dots */}
            {[0, 120, 240].map((deg, i) => (
              <div
                key={deg}
                className="absolute inset-0 animate-[spin_18s_linear_infinite]"
                style={{ animationDelay: `${i * -6}s` }}
              >
                <span
                  className="absolute left-1/2 top-0 h-2.5 w-2.5 -translate-x-1/2 rounded-full bg-brand shadow-lg shadow-brand/50"
                  style={{ transform: `rotate(${deg}deg) translateY(0)` }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* scroll cue */}
      <div className="h-fade pointer-events-none absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 lg:flex">
        <span className="font-sans text-[10px] uppercase tracking-[0.3em] text-muted">
          Scroll
        </span>
        <span className="h-9 w-px overflow-hidden bg-ink/15">
          <span className="block h-1/2 w-full animate-float bg-brand" />
        </span>
      </div>
    </section>
  );
}
