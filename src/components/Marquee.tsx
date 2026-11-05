import { cn } from "@/utils/cn";

export function Marquee({
  items,
  className,
}: {
  items: string[];
  className?: string;
}) {
  const track = [...items, ...items];
  return (
    <div className={cn("relative flex overflow-hidden", className)}>
      <div className="flex w-max shrink-0 items-center gap-8 pr-8 will-change-transform animate-marquee">
        {track.map((t, i) => (
          <span key={i} className="flex items-center gap-8">
            <span className="whitespace-nowrap font-display text-sm font-semibold uppercase tracking-[0.18em] sm:text-base">
              {t}
            </span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="shrink-0">
              <path
                d="M12 2v20M2 12h20M5 5l14 14M19 5L5 19"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </span>
        ))}
      </div>
    </div>
  );
}
