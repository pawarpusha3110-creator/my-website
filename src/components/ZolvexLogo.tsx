import { cn } from "@/utils/cn";

/**
 * Zolvex "Z" mark — recreated from the brand artwork.
 * An angular Z built from a top bar, a diagonal stroke and a bottom bar,
 * with rounded outer corners and the signature orange gradient.
 */
export function ZolvexMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 880 880"
      className={cn("block h-full w-auto", className)}
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Zolvex"
    >
      <defs>
        <linearGradient id="zx-grad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#F74A00" />
          <stop offset="45%" stopColor="#FA5F01" />
          <stop offset="100%" stopColor="#FF8A1E" />
        </linearGradient>
        <linearGradient id="zx-grad-b" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#F74A00" />
          <stop offset="100%" stopColor="#FF9B24" />
        </linearGradient>
      </defs>

      {/* Upper arm: top bar sweeping right, with rounded top-right corner,
          then cutting down-left along the diagonal. */}
      <path
        fill="url(#zx-grad)"
        d="M62 34 H700
           C 782 34 846 98 846 180
           C 846 222 830 258 802 286
           L 690 442
           H 438
           L 578 236
           H 62
           Z"
      />

      {/* Lower arm: diagonal descending to the left, bottom bar sweeping right,
          with rounded bottom-left corner. */}
      <path
        fill="url(#zx-grad-b)"
        d="M190 438
           H 442
           L 290 654
           H 846
           V 846
           H 180
           C 98 846 34 782 34 700
           C 34 658 50 622 78 594
           Z"
      />
    </svg>
  );
}

/** Full lockup: Z mark + "ZOLVEX.AI" wordmark. */
export function ZolvexLogo({
  className,
  variant = "light",
  showWord = true,
}: {
  className?: string;
  /** "light" = dark text (for light bg), "dark" = white text (for dark bg) */
  variant?: "light" | "dark";
  showWord?: boolean;
}) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <ZolvexMark className="h-full" />
      {showWord && (
        <span
          className={cn(
            "font-display text-[0.92em] font-bold leading-none tracking-tight",
            variant === "dark" ? "text-paper" : "text-ink",
          )}
        >
          Zolvex
          <span className="text-brand">.AI</span>
        </span>
      )}
    </span>
  );
}

export default ZolvexLogo;
