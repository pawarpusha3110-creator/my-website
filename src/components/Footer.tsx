import { getLenis, scrollToId } from "@/lib/scroll";
import { ZolvexLogo } from "./ZolvexLogo";

const COLUMNS = [
  {
    title: "Services",
    links: [
      { label: "Intelligent Websites", href: "#services" },
      { label: "Business Automation", href: "#services" },
    ],
  },
  {
    title: "Industries",
    links: [
      "Manufacturing",
      "Healthcare",
      "Fintech",
      "Logistics",
      "Retail",
      "Energy",
      "Education",
      "Real Estate",
    ].map((label) => ({ label, href: "#industries" })),
  },
  {
    title: "Company",
    links: [
      { label: "About Us", href: "#about" },
      { label: "What We Do", href: "#services" },
      { label: "Industries", href: "#industries" },
      { label: "Why Us", href: "#why" },
      { label: "Contact", href: "#contact" },
    ],
  },
];

const TRUST = ["Smart Technology", "Custom Development", "Business-Focused Solutions"];

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-ink-800 text-paper">
      <div className="pointer-events-none absolute inset-0 bg-grid-dark opacity-40" />

      <div className="relative mx-auto max-w-[1340px] px-5 sm:px-8">
        <div className="grid gap-12 border-b border-paper/10 py-16 lg:grid-cols-[1.3fr_2fr]">
          <div>
            <ZolvexLogo variant="dark" className="h-10 text-2xl" />
            <p className="mt-5 max-w-xs font-sans text-[14.5px] leading-relaxed text-paper/55">
              Digital solutions that help your business grow. We design intelligent websites,
              AI-powered customer experiences and digital systems that help you grow with
              confidence.
            </p>
            <a
              href="mailto:hello@zolvex.ai"
              className="mt-6 inline-flex items-center gap-2.5 font-sans text-[14.5px] text-paper/70 transition-colors hover:text-brand-400"
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" className="text-brand">
                <rect x="2" y="4" width="20" height="16" rx="2" stroke="currentColor" strokeWidth="2" />
                <path d="M22 6l-10 7L2 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              hello@zolvex.ai
            </a>
          </div>

          <div className="grid gap-8 sm:grid-cols-3">
            {COLUMNS.map((col) => (
              <div key={col.title}>
                <h4 className="mb-4 font-display text-[12.5px] font-bold uppercase tracking-[0.18em] text-paper">
                  {col.title}
                </h4>
                <ul className="space-y-2.5">
                  {col.links.map((l) => {
                    const { label, href } = l;
                    return (
                      <li key={label}>
                        <a
                          href={href}
                          onClick={(e) => {
                            e.preventDefault();
                            scrollToId(href);
                          }}
                          className="group inline-flex items-center gap-1.5 font-sans text-[14px] text-paper/55 transition-colors hover:text-brand-400"
                        >
                          <span className="h-px w-0 bg-brand-400 transition-all duration-300 group-hover:w-3" />
                          {label}
                        </a>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-5 py-7 sm:flex-row">
          <p className="font-sans text-xs text-paper/40">
            © {new Date().getFullYear()} Zolvex.AI — All rights reserved.
          </p>

          <p className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 font-sans text-[11.5px] uppercase tracking-[0.14em] text-paper/50">
            {TRUST.map((t, i) => (
              <span key={t} className="inline-flex items-center gap-3">
                {i > 0 && <span className="h-1 w-1 rounded-full bg-brand" aria-hidden />}
                {t}
              </span>
            ))}
          </p>

          <button
            onClick={() => getLenis()?.scrollTo(0)}
            className="group inline-flex items-center gap-2 font-sans text-[11.5px] uppercase tracking-[0.14em] text-paper/50 transition-colors hover:text-paper"
          >
            Back to top
            <span className="grid h-8 w-8 place-items-center rounded-full border border-paper/20 transition-all duration-300 group-hover:-translate-y-1 group-hover:border-brand group-hover:bg-brand group-hover:text-white">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                <path
                  d="M12 19V5M5 12l7-7 7 7"
                  stroke="currentColor"
                  strokeWidth="2.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
          </button>
        </div>
      </div>
    </footer>
  );
}
