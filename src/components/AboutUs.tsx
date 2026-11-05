import { Reveal, RevealText, Counter } from "./Reveal";
import { scrollToId } from "@/lib/scroll";

const SMALL_STATS = [
  { v: "08", l: "Industries served" },
  { v: "24/7", l: "Support & uptime" },
  { v: "100%", l: "Custom built, no templates" },
];

export function AboutUs() {
  return (
    <section id="about" className="relative overflow-hidden bg-white py-24 sm:py-32">
      <div className="pointer-events-none absolute -right-32 top-20 h-[420px] w-[420px] rounded-full bg-brand/10 blur-[130px]" />

      <div className="relative mx-auto grid max-w-[1200px] items-center gap-14 px-5 sm:px-8 lg:grid-cols-[1.1fr_0.9fr] lg:gap-20">
        {/* story */}
        <div>
          <p className="mb-5 inline-flex items-center gap-3 font-sans text-[12.5px] font-semibold uppercase tracking-[0.22em] text-brand">
            <span className="h-px w-8 bg-brand" />
            About Us
          </p>
          <RevealText
            text="Technology with a clear purpose: your growth."
            className="block font-display text-[8.5vw] font-bold leading-[1.05] tracking-tight text-ink sm:text-5xl"
          />

          <div className="mt-8 space-y-5 font-sans text-base leading-relaxed text-muted sm:text-[17px]">
            <Reveal delay={0.05} y={24}>
              <p>
                Zolvex.AI is a technology partner for businesses that want more from their
                digital presence. We design and build custom websites, web applications and
                intelligent systems around how your company actually works.
              </p>
            </Reveal>
            <Reveal delay={0.1} y={24}>
              <p>
                Too many businesses end up with a site that looks good but does little. We
                focus on what happens after the visit: AI assistants that answer and qualify
                customers, automation that handles the repetitive work, and cloud
                infrastructure that stays fast as you scale.
              </p>
            </Reveal>
            <Reveal delay={0.15} y={24}>
              <p>
                From a first conversation to launch and long-term support, you work with one
                dedicated team that learns your goals and builds technology to match.
              </p>
            </Reveal>
          </div>

          <Reveal delay={0.2} y={20}>
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                scrollToId("#contact");
              }}
              className="mt-9 inline-flex items-center gap-2.5 rounded-full bg-ink px-7 py-3.5 font-sans text-[15px] font-semibold text-white transition-colors duration-300 hover:bg-brand"
            >
              Talk to our team
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" aria-hidden>
                <path
                  d="M5 12h14M13 5l7 7-7 7"
                  stroke="currentColor"
                  strokeWidth="2.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>
          </Reveal>
        </div>

        {/* stats */}
        <div className="grid gap-4 sm:gap-5">
          <Reveal y={30}>
            <div className="rounded-3xl border border-ink/10 bg-paper p-8 shadow-sm sm:p-10">
              <p className="font-display text-6xl font-bold leading-none tracking-tight text-brand sm:text-7xl">
                <Counter to={50} suffix="+" />
              </p>
              <p className="mt-3 font-sans text-base font-medium text-ink">Projects delivered</p>
            </div>
          </Reveal>
          <div className="grid grid-cols-3 gap-4 sm:gap-5">
            {SMALL_STATS.map((s, i) => (
              <Reveal key={s.l} delay={0.08 * (i + 1)} y={30}>
                <div className="h-full rounded-2xl border border-ink/10 bg-paper p-4 sm:p-6">
                  <p className="font-display text-2xl font-bold text-ink sm:text-3xl">{s.v}</p>
                  <p className="mt-2 font-sans text-[12.5px] leading-snug text-muted sm:text-sm">
                    {s.l}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
