import { Fragment, useEffect, useRef, type ElementType, type ReactNode } from "react";
import { gsap } from "@/lib/scroll";
import { cn } from "@/utils/cn";

/** Word-by-word masked reveal for headlines. */
export function RevealText({
  text,
  className,
  as: Tag = "span",
  delay = 0,
  stagger = 0.05,
  mode = "scroll",
  play = true,
}: {
  text: string;
  className?: string;
  as?: ElementType;
  delay?: number;
  stagger?: number;
  mode?: "scroll" | "mount";
  play?: boolean;
}) {
  const ref = useRef<HTMLElement>(null);
  const words = text.split(" ");

  useEffect(() => {
    if (mode === "mount" && !play) return;
    const ctx = gsap.context(() => {
      const targets = ref.current?.querySelectorAll<HTMLElement>(".rv-w");
      if (!targets?.length) return;
      gsap.fromTo(
        targets,
        { yPercent: 115, opacity: 0 },
        {
          yPercent: 0,
          opacity: 1,
          duration: 1,
          ease: "power4.out",
          stagger,
          delay,
          scrollTrigger:
            mode === "scroll"
              ? { trigger: ref.current, start: "top 86%", once: true }
              : undefined,
        },
      );
    }, ref);
    return () => ctx.revert();
  }, [delay, stagger, mode, play]);

  return (
    <Tag ref={ref} className={className}>
      {words.map((w, i) => (
        <Fragment key={i}>
          <span className="inline-block overflow-hidden pb-[0.12em] -mb-[0.12em] align-bottom leading-[1.12]">
            <span className="rv-w inline-block leading-[1.12] will-change-transform">
              {w}
            </span>
          </span>
          {i < words.length - 1 ? " " : ""}
        </Fragment>
      ))}
    </Tag>
  );
}

/** Fade + slide block reveal. */
export function Reveal({
  children,
  className,
  y = 38,
  delay = 0,
  duration = 0.85,
  as: Tag = "div",
}: {
  children: ReactNode;
  className?: string;
  y?: number;
  delay?: number;
  duration?: number;
  as?: ElementType;
}) {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ref.current,
        { y, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration,
          delay,
          ease: "power3.out",
          scrollTrigger: { trigger: ref.current, start: "top 90%", once: true },
        },
      );
    }, ref);
    return () => ctx.revert();
  }, [y, delay, duration]);
  return (
    <Tag ref={ref} className={className}>
      {children}
    </Tag>
  );
}

/** Count-up number. */
export function Counter({
  to,
  suffix = "",
  prefix = "",
  className,
  duration = 2,
}: {
  to: number;
  suffix?: string;
  prefix?: string;
  className?: string;
  duration?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const ctx = gsap.context(() => {
      const o = { v: 0 };
      gsap.to(o, {
        v: to,
        duration,
        ease: "power2.out",
        scrollTrigger: { trigger: ref.current, start: "top 88%", once: true },
        onUpdate() {
          if (ref.current)
            ref.current.textContent =
              prefix + Math.round(o.v).toLocaleString() + suffix;
        },
      });
    }, ref);
    return () => ctx.revert();
  }, [to, suffix, prefix, duration]);
  return (
    <span ref={ref} className={cn(className)}>
      {prefix}0{suffix}
    </span>
  );
}
