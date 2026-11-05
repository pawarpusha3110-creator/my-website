import { cn } from "@/utils/cn";

/**
 * Letter-by-letter "roll" text.
 * Each character slides up and is replaced by a coloured copy rolling in from
 * below, staggered across the word. Triggered by the nearest `.group` ancestor
 * being hovered or keyboard-focused.
 */
export function RollText({
  text,
  className,
  hoverClassName = "text-brand",
  stagger = 22,
}: {
  text: string;
  className?: string;
  /** Colour/classes for the copy that rolls in on hover */
  hoverClassName?: string;
  /** Delay between letters in ms */
  stagger?: number;
}) {
  const chars = Array.from(text);
  const motion =
    "inline-block transition-transform duration-[450ms] ease-[cubic-bezier(0.65,0,0.35,1)] group-hover:-translate-y-full group-focus-visible:-translate-y-full";

  return (
    <span className={cn("relative inline-flex", className)}>
      <span className="sr-only">{text}</span>
      <span aria-hidden className="inline-flex">
        {chars.map((ch, i) => {
          const c = ch === " " ? "\u00A0" : ch;
          const delay = { transitionDelay: `${i * stagger}ms` };
          return (
            <span key={i} className="relative inline-block overflow-hidden leading-[1.25]">
              <span className={motion} style={delay}>
                {c}
              </span>
              <span
                className={cn(motion, "absolute inset-x-0 top-full", hoverClassName)}
                style={delay}
              >
                {c}
              </span>
            </span>
          );
        })}
      </span>
    </span>
  );
}
