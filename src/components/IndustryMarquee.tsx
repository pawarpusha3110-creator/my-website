import { useEffect, useRef, useState } from "react";
import { gsap, ScrollTrigger } from "@/lib/scroll";
import { cn } from "@/utils/cn";

export type Industry = { n: string; label: string };

/**
 * Infinite industries marquee.
 * - Drifts continuously (GSAP ticker, frame-rate independent)
 * - Speeds up with scroll velocity and follows the scroll direction
 * - Glides to a smooth stop while hovered with a mouse, then eases back
 * - Soft faded edges; static + swipeable when reduced motion is requested
 */
export function IndustryMarquee({
  items,
  speed = 48,
  className,
}: {
  items: Industry[];
  /** Resting speed in px per second */
  speed?: number;
  className?: string;
}) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLUListElement>(null);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const wrap = wrapRef.current;
    const track = trackRef.current;
    if (!wrap || !track) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setReduced(true);
      return;
    }

    // Width of one copy of the list (the track holds two identical copies)
    let half = track.scrollWidth / 2;
    const ro = new ResizeObserver(() => {
      half = track.scrollWidth / 2;
    });
    ro.observe(track);

    const state = { x: 0, dir: 1, boost: 0, hover: 1 };
    const setX = gsap.quickSetter(track, "x", "px") as (v: number) => void;

    const tick = (_time: number, deltaMs: number) => {
      if (half <= 0) return;
      const dt = Math.min(deltaMs, 64) / 1000;
      state.boost *= Math.pow(0.9, dt * 60); // scroll boost decays smoothly
      state.x -= speed * (1 + state.boost) * state.hover * state.dir * dt;
      if (state.x <= -half) state.x += half;
      else if (state.x > 0) state.x -= half;
      setX(state.x);
    };
    gsap.ticker.add(tick);

    const st = ScrollTrigger.create({
      trigger: wrap,
      start: "top bottom",
      end: "bottom top",
      onUpdate(self) {
        state.dir = self.direction; // 1 = scrolling down, -1 = scrolling up
        state.boost = Math.min(Math.abs(self.getVelocity()) / 300, 7);
      },
    });

    const onEnter = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      gsap.to(state, { hover: 0, duration: 0.9, ease: "power3.out", overwrite: true });
    };
    const onLeave = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      gsap.to(state, { hover: 1, duration: 0.9, ease: "power2.inOut", overwrite: true });
    };
    wrap.addEventListener("pointerenter", onEnter);
    wrap.addEventListener("pointerleave", onLeave);

    return () => {
      gsap.ticker.remove(tick);
      st.kill();
      ro.disconnect();
      gsap.killTweensOf(state);
      wrap.removeEventListener("pointerenter", onEnter);
      wrap.removeEventListener("pointerleave", onLeave);
    };
  }, [speed]);

  const list = reduced ? items : [...items, ...items];

  return (
    <div
      ref={wrapRef}
      className={cn(
        "relative mask-fade-x",
        reduced ? "no-scrollbar overflow-x-auto" : "overflow-hidden",
        className,
      )}
    >
      <ul
        ref={trackRef}
        aria-label="Industries we serve"
        className="flex w-max will-change-transform"
      >
        {list.map((it, i) => {
          const duplicate = i >= items.length;
          return (
            <li
              key={`${it.n}-${i}`}
              aria-hidden={duplicate || undefined}
              className="ind-item group/ind flex shrink-0 cursor-default items-center gap-4 py-1 pr-12 sm:pr-16"
            >
              <span className="relative grid h-11 w-11 place-items-center rounded-full border-[1.5px] border-brand/50 font-display text-sm font-semibold text-brand transition-all duration-500 ease-out group-hover/ind:scale-110 group-hover/ind:border-brand group-hover/ind:bg-brand group-hover/ind:text-white group-hover/ind:shadow-lg group-hover/ind:shadow-brand/30 sm:h-[52px] sm:w-[52px] sm:text-[15px]">
                {it.n}
                {/* pulse ring while hovered */}
                <span className="pointer-events-none absolute inset-0 rounded-full border-2 border-brand opacity-0 group-hover/ind:animate-ring" />
              </span>
              <span className="whitespace-nowrap font-display text-lg font-semibold text-ink transition-colors duration-300 group-hover/ind:text-brand sm:text-xl">
                {it.label}
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
