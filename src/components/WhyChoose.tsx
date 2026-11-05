import { useState, type ReactNode } from "react";
import { Reveal, RevealText } from "./Reveal";
import { cn } from "@/utils/cn";

const ICON_PROPS = {
  width: 30,
  height: 30,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
};

const REASONS: {
  n: string;
  title: string;
  desc: string;
  points: string[];
  icon: ReactNode;
}[] = [
  {
    n: "01",
    title: "Built around your business",
    desc: "No recycled templates. We start from your customers, workflows and goals.",
    points: ["Custom design and build", "Tailored to how you work", "Ready to use from day one"],
    icon: (
      <svg {...ICON_PROPS}>
        <circle cx="12" cy="12" r="10" />
        <circle cx="12" cy="12" r="6" />
        <circle cx="12" cy="12" r="2" />
      </svg>
    ),
  },
  {
    n: "02",
    title: "AI that does real work",
    desc: "Assistants and automation that answer customers and handle repetitive tasks.",
    points: ["Smart chat assistants", "Automatic lead capture", "Automated follow-ups"],
    icon: (
      <svg {...ICON_PROPS}>
        <rect x="4" y="4" width="16" height="16" rx="3" />
        <path d="M9 9h6v6H9z" />
        <path d="M9 2v2M15 2v2M9 20v2M15 20v2M2 9h2M2 15h2M20 9h2M20 15h2" />
      </svg>
    ),
  },
  {
    n: "03",
    title: "One team, start to finish",
    desc: "Strategy, design, development and cloud under one roof.",
    points: ["Talk directly to the builders", "No handoffs between vendors", "Full context, always"],
    icon: (
      <svg {...ICON_PROPS}>
        <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" />
      </svg>
    ),
  },
  {
    n: "04",
    title: "Clear scope, steady support",
    desc: "Defined deliverables and timelines, then round-the-clock support.",
    points: ["Clear deliverables up front", "Defined project timelines", "24/7 support and monitoring"],
    icon: (
      <svg {...ICON_PROPS}>
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <path d="M9 12l2 2 4-4" />
      </svg>
    ),
  },
];

const DURATION = 5; // seconds per reason

export function WhyChoose() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const r = REASONS[active];

  return (
    <section id="why" className="relative overflow-hidden bg-paper py-24 sm:py-32">
      <div className="pointer-events-none absolute left-1/2 top-0 h-[400px] w-[700px] -translate-x-1/2 rounded-full bg-brand/8 blur-[120px]" />

      <div
        className="relative mx-auto max-w-[1240px] px-5 sm:px-8"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        <div className="grid items-start gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          {/* left: heading + selectable list */}
          <div>
            <p className="mb-5 inline-flex items-center gap-3 font-sans text-[12.5px] font-semibold uppercase tracking-[0.22em] text-brand">
              <span className="h-px w-8 bg-brand" />
              Why Us
            </p>
            <RevealText
              text="Why businesses choose Zolvex"
              className="block font-display text-[9vw] font-bold leading-[1.04] tracking-tight text-ink sm:text-5xl"
            />
            <Reveal delay={0.12}>
              <p className="mt-5 max-w-md font-sans text-base leading-relaxed text-muted sm:text-[17px]">
                Four reasons teams trust us to build technology that fits.
              </p>
            </Reveal>

            <ul className="mt-10 space-y-3">
              {REASONS.map((it, i) => {
                const on = i === active;
                return (
                  <li key={it.n}>
                    <button
                      type="button"
                      onClick={() => setActive(i)}
                      className={cn(
                        "group relative flex w-full items-center gap-5 overflow-hidden rounded-2xl border px-5 py-4 text-left transition-all duration-500",
                        on
                          ? "border-ink/10 bg-white shadow-xl shadow-ink/5"
                          : "border-transparent hover:bg-white/60",
                      )}
                    >
                      <span
                        className={cn(
                          "font-display text-sm font-bold tracking-widest transition-colors duration-500",
                          on ? "text-brand" : "text-ink/30",
                        )}
                      >
                        {it.n}
                      </span>
                      <span
                        className={cn(
                          "font-display text-lg font-bold transition-colors duration-500 sm:text-xl",
                          on ? "text-ink" : "text-ink/50 group-hover:text-ink",
                        )}
                      >
                        {it.title}
                      </span>
                      {/* progress */}
                      {on && (
                        <span className="absolute inset-x-0 bottom-0 h-[3px] bg-ink/5">
                          <span
                            key={active}
                            onAnimationEnd={() => setActive((a) => (a + 1) % REASONS.length)}
                            className="block h-full origin-left bg-gradient-to-r from-brand to-brand-400"
                            style={{
                              animation: `progress-fill ${DURATION}s linear forwards`,
                              animationPlayState: paused ? "paused" : "running",
                            }}
                          />
                        </span>
                      )}
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* right: feature panel */}
          <div className="relative overflow-hidden rounded-[2rem] bg-ink p-8 text-paper shadow-2xl shadow-ink/20 sm:p-12 lg:min-h-[520px]">
            <div className="pointer-events-none absolute inset-0 bg-grid-dark opacity-50" />
            <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-brand/30 blur-[100px]" />
            <div className="pointer-events-none absolute -bottom-28 -left-16 h-64 w-64 rounded-full bg-brand-400/15 blur-[100px]" />
            <div className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 animate-[spin_40s_linear_infinite] rounded-full border border-dashed border-paper/10" />

            <div key={active} className="relative flex h-full flex-col" style={{ animation: "panel-in 0.7s ease-out" }}>
              <span className="pointer-events-none absolute -right-2 -top-6 select-none font-display text-[8rem] font-bold leading-none text-paper/[0.06] sm:text-[11rem]">
                {r.n}
              </span>

              <div className="mb-8 grid h-16 w-16 place-items-center rounded-2xl bg-gradient-to-br from-brand to-brand-400 text-white shadow-lg shadow-brand/40">
                {r.icon}
              </div>
              <h3 className="font-display text-3xl font-bold leading-tight sm:text-4xl">{r.title}</h3>
              <p className="mt-4 max-w-md font-sans text-base leading-relaxed text-paper/65 sm:text-[17px]">
                {r.desc}
              </p>

              <ul className="mt-10 space-y-4">
                {r.points.map((p, i) => (
                  <li
                    key={p}
                    className="flex items-center gap-3.5 font-sans text-[15px] text-paper/85"
                    style={{ animation: `panel-in 0.6s ease-out ${0.15 + i * 0.1}s both` }}
                  >
                    <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-brand/20 text-brand-400">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" aria-hidden>
                        <path
                          d="M5 12l5 5L20 7"
                          stroke="currentColor"
                          strokeWidth="3"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                    {p}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
