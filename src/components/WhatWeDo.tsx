import { useEffect, useRef, type ReactNode } from "react";
import { gsap, scrollToId } from "@/lib/scroll";
import { Reveal, RevealText } from "./Reveal";

/* ---------- animated mini visuals ---------- */

function WebVisual() {
  return (
    <div className="relative mx-auto w-full max-w-[300px] overflow-hidden rounded-xl border border-paper/15 bg-ink/70 shadow-2xl">
      <div className="flex items-center gap-1.5 border-b border-paper/10 px-3 py-2">
        <span className="h-2 w-2 rounded-full bg-brand" />
        <span className="h-2 w-2 rounded-full bg-brand-400" />
        <span className="h-2 w-2 rounded-full bg-paper/30" />
        <span className="ml-3 h-2 flex-1 rounded-full bg-paper/10" />
      </div>
      <div className="space-y-2.5 p-4">
        <div
          className="h-3 w-3/4 origin-left rounded-full bg-gradient-to-r from-brand to-brand-400"
          style={{ animation: "bar-load 4.5s ease-in-out infinite" }}
        />
        <div
          className="h-2 w-full origin-left rounded-full bg-paper/15"
          style={{ animation: "bar-load 5.5s ease-in-out infinite 0.4s" }}
        />
        <div
          className="h-2 w-2/3 origin-left rounded-full bg-paper/15"
          style={{ animation: "bar-load 5s ease-in-out infinite 0.8s" }}
        />
        <div className="grid grid-cols-3 gap-2 pt-2">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="h-10 animate-glow rounded-md bg-paper/10"
              style={{ animationDelay: `${i * 0.6}s` }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function AutoVisual() {
  return (
    <svg viewBox="0 0 300 120" className="mx-auto w-full max-w-[300px]" fill="none" aria-hidden>
      <path
        d="M40 60 C 90 60, 90 25, 150 25 S 210 60, 260 60 M40 60 C 90 60, 90 95, 150 95 S 210 60, 260 60"
        stroke="#ff9b24"
        strokeOpacity="0.7"
        strokeWidth="1.8"
        strokeDasharray="6 6"
        style={{ animation: "dash-flow 1.2s linear infinite" }}
      />
      {[
        [40, 60],
        [150, 25],
        [150, 95],
        [260, 60],
      ].map(([x, y], i) => (
        <g key={i}>
          <circle cx={x} cy={y} r="15" fill="#080605" stroke="#fa5f01" strokeWidth="2" />
          <circle cx={x} cy={y} r="5" fill="#fa5f01" className="animate-glow" style={{ animationDelay: `${i * 0.5}s` }} />
        </g>
      ))}
    </svg>
  );
}

/* ---------- data ---------- */

const SERVICES: {
  n: string;
  title: string;
  desc: string;
  tags: string[];
  span: string;
  visual: ReactNode;
}[] = [
  {
    n: "01",
    title: "Intelligent Websites",
    desc: "Fast, custom websites that turn visitors into customers.",
    tags: ["Business websites", "Web apps"],
    span: "lg:col-span-6",
    visual: <WebVisual />,
  },
  {
    n: "02",
    title: "Business Automation",
    desc: "Automate follow-ups and everyday tasks to save your team time.",
    tags: ["Workflows", "Integrations"],
    span: "lg:col-span-6",
    visual: <AutoVisual />,
  },
];

/* ---------- section ---------- */

export function WhatWeDo() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".svc-card",
        { y: 70, opacity: 0, scale: 0.96 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.95,
          ease: "power3.out",
          stagger: 0.14,
          scrollTrigger: { trigger: ".svc-grid", start: "top 82%", once: true },
        },
      );
      gsap.to(".svc-orb", {
        yPercent: -25,
        ease: "none",
        scrollTrigger: { trigger: root.current, start: "top bottom", end: "bottom top", scrub: true },
      });
    }, root);
    return () => ctx.revert();
  }, []);

  const onMove = (e: React.MouseEvent<HTMLElement>) => {
    const el = e.currentTarget;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - r.left}px`);
    el.style.setProperty("--my", `${e.clientY - r.top}px`);
  };

  return (
    <section
      id="services"
      ref={root}
      className="relative overflow-hidden bg-ink py-24 text-paper sm:py-32"
    >
      <div className="pointer-events-none absolute inset-0 bg-grid-dark opacity-60" />
      <div className="svc-orb pointer-events-none absolute -left-32 top-1/3 h-[460px] w-[460px] rounded-full bg-brand/20 blur-[140px]" />
      <div className="svc-orb pointer-events-none absolute -right-24 bottom-10 h-[380px] w-[380px] rounded-full bg-brand-400/15 blur-[120px]" />

      <div className="relative mx-auto max-w-[1280px] px-5 sm:px-8">
        <div className="mb-14 grid gap-8 lg:grid-cols-[1.25fr_0.75fr] lg:items-end">
          <div>
            <p className="mb-5 inline-flex items-center gap-3 font-sans text-[12.5px] font-semibold uppercase tracking-[0.22em] text-brand-400">
              <span className="h-px w-8 bg-brand-400" />
              What We Do
            </p>
            <RevealText
              text="Technology that helps you grow."
              className="block font-display text-[9vw] font-bold leading-[1.03] tracking-tight text-paper sm:text-5xl lg:text-[3.6rem]"
            />
          </div>
          <Reveal delay={0.12}>
            <p className="font-sans text-base leading-relaxed text-paper/60 sm:text-[17px]">
              Smart websites and AI that help you attract customers and grow.
            </p>
          </Reveal>
        </div>

        <div className="svc-grid grid gap-5 lg:grid-cols-12">
          {SERVICES.map((s) => (
            <article
              key={s.n}
              onMouseMove={onMove}
              className={`svc-card group relative overflow-hidden rounded-3xl border border-paper/10 bg-ink-900/70 p-6 backdrop-blur transition-colors duration-500 hover:border-brand/40 sm:p-8 ${s.span}`}
            >
              {/* cursor spotlight */}
              <div
                className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                style={{
                  background:
                    "radial-gradient(520px circle at var(--mx, 50%) var(--my, 50%), rgba(250,95,1,0.16), transparent 60%)",
                }}
              />
              {/* bottom accent bar */}
              <span className="pointer-events-none absolute inset-x-0 bottom-0 h-[3px] origin-left scale-x-0 bg-gradient-to-r from-brand to-brand-400 transition-transform duration-700 group-hover:scale-x-100" />

              <div className="relative">
                <div className="mb-8 flex h-[170px] items-center rounded-2xl border border-paper/10 bg-paper/[0.03] px-4 transition-transform duration-500 group-hover:-translate-y-1">
                  {s.visual}
                </div>

                <div className="mb-3 flex items-center gap-3">
                  <span className="font-display text-sm font-bold text-brand-400">{s.n}</span>
                  <span className="h-px w-8 bg-paper/20 transition-all duration-500 group-hover:w-14 group-hover:bg-brand" />
                </div>
                <h3 className="mb-3 font-display text-2xl font-bold leading-tight text-paper sm:text-[1.7rem]">
                  {s.title}
                </h3>
                <p className="max-w-xl font-sans text-[15px] leading-relaxed text-paper/60">
                  {s.desc}
                </p>

                <div className="mt-6 flex flex-wrap gap-2">
                  {s.tags.map((t) => (
                    <span
                      key={t}
                      className="rounded-full border border-paper/15 px-3.5 py-1.5 font-sans text-[12.5px] text-paper/70 transition-colors duration-300 group-hover:border-brand/30"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                <a
                  href="#contact"
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToId("#contact");
                  }}
                  className="mt-7 inline-flex items-center gap-2 font-sans text-[14.5px] font-semibold text-brand-400 transition-all duration-300 hover:gap-3.5"
                >
                  Discuss this service
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
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
