import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { cn } from "@/utils/cn";
import { scrollToId } from "@/lib/scroll";
import { ZolvexLogo } from "./ZolvexLogo";
import { RollText } from "./RollText";

const LINKS = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Industries", href: "#industries" },
  { label: "Why Us", href: "#why" },
  { label: "Contact", href: "#contact" },
];

type Indicator = {
  left: number;
  right: number;
  top: number;
  opacity: number;
  dir: "left" | "right";
};

const EASE = "cubic-bezier(0.65, 0, 0.35, 1)";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("#home");
  const [hovered, setHovered] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);
  const [ind, setInd] = useState<Indicator>({
    left: 0,
    right: 0,
    top: 0,
    opacity: 0,
    dir: "right",
  });
  const [animate, setAnimate] = useState(false);

  const wrapRef = useRef<HTMLDivElement>(null);
  const labelRefs = useRef<Record<string, HTMLSpanElement | null>>({});

  // Scroll state + progress bar
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20);
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? window.scrollY / max : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Active section tracking
  useEffect(() => {
    const secs = LINKS.map((l) => document.getElementById(l.href.slice(1))).filter(
      (e): e is HTMLElement => !!e,
    );
    if (!secs.length) return;
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => e.isIntersecting && setActive("#" + e.target.id)),
      { rootMargin: "-45% 0px -45% 0px" },
    );
    secs.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, []);

  // Measure the label under the cursor (or the active one) for the underline
  const measure = useCallback((href: string | null) => {
    const wrap = wrapRef.current;
    const label = href ? labelRefs.current[href] : null;
    if (!wrap || !label) {
      setInd((p) => ({ ...p, opacity: 0 }));
      return;
    }
    const W = wrap.getBoundingClientRect();
    if (W.width === 0) return; // desktop nav hidden (mobile)
    const R = label.getBoundingClientRect();
    const left = R.left - W.left;
    const right = W.right - R.right;
    const top = R.bottom - W.top + 5;
    setInd((p) => ({
      left,
      right,
      top,
      opacity: 1,
      dir: left > p.left + 0.5 ? "right" : left < p.left - 0.5 ? "left" : p.dir,
    }));
  }, []);

  // Which link the underline should sit under right now
  const targetRef = useRef<string | null>("#home");

  useLayoutEffect(() => {
    targetRef.current = hovered ?? active;
    measure(targetRef.current);
  }, [hovered, active, measure]);

  // Re-measure whenever label sizes change (web-font load, resize, zoom)
  useEffect(() => {
    const re = () => measure(targetRef.current);
    const ro = new ResizeObserver(re);
    if (wrapRef.current) ro.observe(wrapRef.current);
    Object.values(labelRefs.current).forEach((el) => el && ro.observe(el));
    window.addEventListener("resize", re);
    document.fonts?.addEventListener?.("loadingdone", re);
    document.fonts?.ready.then(re).catch(() => undefined);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", re);
      document.fonts?.removeEventListener?.("loadingdone", re);
    };
  }, [measure]);

  // Enable underline transitions only after the first placement (no slide-in from 0)
  useEffect(() => {
    const t = window.setTimeout(() => setAnimate(true), 120);
    return () => window.clearTimeout(t);
  }, []);

  // Liquid stretch: the leading edge moves fast, the trailing edge follows slower
  const transition = animate
    ? ind.dir === "right"
      ? `left 0.55s ${EASE}, right 0.32s ${EASE}, top 0.3s ease, opacity 0.3s ease`
      : `left 0.32s ${EASE}, right 0.55s ${EASE}, top 0.3s ease, opacity 0.3s ease`
    : "none";

  const go = (href: string) => {
    setOpen(false);
    scrollToId(href);
  };

  return (
    <>
      {/* progress bar */}
      <div className="pointer-events-none fixed inset-x-0 top-0 z-[60] h-[3px]">
        <div
          className="h-full origin-left bg-gradient-to-r from-brand via-brand to-brand-400"
          style={{ transform: `scaleX(${progress})` }}
        />
      </div>

      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-all duration-500",
          scrolled
            ? "border-b border-ink/8 bg-paper/80 py-2.5 backdrop-blur-xl"
            : "border-b border-transparent py-5",
        )}
      >
        <nav className="mx-auto flex max-w-[1340px] items-center justify-between gap-6 px-5 sm:px-8">
          <a
            href="#home"
            onClick={(e) => {
              e.preventDefault();
              go("#home");
            }}
            className="flex shrink-0 items-center"
            aria-label="Zolvex.AI home"
          >
            <ZolvexLogo
              className={cn(
                "transition-all duration-500",
                scrolled
                  ? "h-8 text-xl sm:h-9 sm:text-[22px]"
                  : "h-9 text-[22px] sm:h-11 sm:text-2xl",
              )}
            />
          </a>

          {/* Desktop menu */}
          <div
            ref={wrapRef}
            onMouseLeave={() => setHovered(null)}
            className="relative hidden md:block"
          >
            <ul className="flex items-center gap-1">
              {LINKS.map((l) => {
                const on = active === l.href;
                return (
                  <li key={l.href}>
                    <a
                      href={l.href}
                      onClick={(e) => {
                        e.preventDefault();
                        go(l.href);
                      }}
                      onMouseEnter={() => setHovered(l.href)}
                      onFocus={() => setHovered(l.href)}
                      onBlur={() => setHovered(null)}
                      aria-current={on ? "true" : undefined}
                      className={cn(
                        "group relative block px-4 py-2 font-sans text-[13.5px] font-medium outline-none transition-colors duration-300",
                        on ? "text-ink" : "text-muted",
                      )}
                    >
                      <span
                        ref={(el) => {
                          labelRefs.current[l.href] = el;
                        }}
                        className="relative inline-block"
                      >
                        <RollText text={l.label} />
                      </span>
                    </a>
                  </li>
                );
              })}
            </ul>

            {/* Liquid gliding underline with a glowing leading spark */}
            <span
              aria-hidden
              className="pointer-events-none absolute h-[2px] rounded-full bg-gradient-to-r from-brand via-brand to-brand-400 shadow-[0_0_12px_rgba(250,95,1,0.55)]"
              style={{
                left: ind.left,
                right: ind.right,
                top: ind.top,
                opacity: ind.opacity,
                transition,
              }}
            >
              <span
                className={cn(
                  "absolute top-1/2 h-[6px] w-[6px] -translate-y-1/2 rounded-full bg-brand-400 shadow-[0_0_10px_2px_rgba(255,155,36,0.75)]",
                  ind.dir === "right" ? "-right-0.5" : "-left-0.5",
                )}
              />
            </span>
          </div>

          <div className="flex items-center gap-2.5">
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                go("#contact");
              }}
              className="group relative hidden overflow-hidden rounded-full bg-ink px-5 py-2.5 font-sans text-[13px] font-semibold text-paper transition-all duration-300 hover:shadow-lg hover:shadow-brand/25 sm:inline-flex"
            >
              <span className="relative z-10 flex items-center gap-2">
                <RollText text="Let's Talk" hoverClassName="text-white" stagger={18} />
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  className="transition-transform duration-300 group-hover:-rotate-45"
                >
                  <path
                    d="M5 12h14M13 5l7 7-7 7"
                    stroke="currentColor"
                    strokeWidth="2.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
              <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-brand to-brand-400 transition-transform duration-500 group-hover:translate-x-0" />
            </a>

            <button
              aria-label="Toggle menu"
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
              className={cn(
                "flex h-10 w-10 flex-col items-center justify-center gap-[5px] rounded-full border transition-colors md:hidden",
                open ? "border-brand bg-brand" : "border-ink/15 hover:bg-mutedbg",
              )}
            >
              <span
                className={cn(
                  "h-[2px] w-[18px] transition-transform duration-300",
                  open ? "translate-y-[7px] rotate-45 bg-white" : "bg-ink",
                )}
              />
              <span
                className={cn(
                  "h-[2px] w-[18px] transition-opacity duration-300",
                  open ? "opacity-0" : "bg-ink",
                )}
              />
              <span
                className={cn(
                  "h-[2px] w-[18px] transition-transform duration-300",
                  open ? "-translate-y-[7px] -rotate-45 bg-white" : "bg-ink",
                )}
              />
            </button>
          </div>
        </nav>

        {/* Mobile menu — items cascade in */}
        <div
          className={cn(
            "overflow-hidden transition-[max-height] duration-500 md:hidden",
            open
              ? "max-h-[360px] border-t border-ink/8 bg-paper/95 backdrop-blur-xl"
              : "max-h-0",
          )}
        >
          <ul className="flex flex-col px-5 py-4">
            {LINKS.map((l, i) => (
              <li
                key={l.href}
                className={cn(
                  "transition-all duration-500 ease-out",
                  open ? "translate-x-0 opacity-100" : "translate-x-6 opacity-0",
                )}
                style={{ transitionDelay: open ? `${100 + i * 60}ms` : "0ms" }}
              >
                <a
                  href={l.href}
                  onClick={(e) => {
                    e.preventDefault();
                    go(l.href);
                  }}
                  className={cn(
                    "group flex items-center justify-between border-b border-ink/8 py-3 font-display text-lg font-semibold",
                    active === l.href ? "text-brand" : "text-ink",
                  )}
                >
                  <RollText text={l.label} />
                  <span className="text-brand transition-transform duration-300 group-hover:translate-x-1">
                    →
                  </span>
                </a>
              </li>
            ))}
            <li
              className={cn(
                "pt-4 transition-all duration-500 ease-out",
                open ? "translate-x-0 opacity-100" : "translate-x-6 opacity-0",
              )}
              style={{ transitionDelay: open ? `${100 + LINKS.length * 60}ms` : "0ms" }}
            >
              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  go("#contact");
                }}
                className="inline-flex items-center gap-2 rounded-full bg-brand px-6 py-3 font-semibold text-white"
              >
                Let&apos;s Talk →
              </a>
            </li>
          </ul>
        </div>
      </header>
    </>
  );
}
