import { cn } from "@/lib/utils";

type MarqueeProps = {
  children: React.ReactNode;
  className?: string;
};

/**
 * CSS-only infinite marquee (no JS, stays a Server Component). The children
 * are rendered twice inside a `w-max` track that translates -50% via the
 * `animate-marquee` keyframe — the duplicate group makes the loop seamless.
 * Each group carries a trailing gap (pr-16) matching the inter-item gap so the
 * wrap point is invisible. Pauses on hover; respects reduced-motion globally.
 */
export function Marquee({ children, className }: MarqueeProps) {
  return (
    <div className={cn("relative overflow-hidden", className)}>
      <div className="flex w-max animate-marquee hover:[animation-play-state:paused]">
        {[0, 1].map((group) => (
          <div
            key={group}
            aria-hidden={group === 1}
            className="flex shrink-0 items-center gap-16 pr-16"
          >
            {children}
          </div>
        ))}
      </div>
    </div>
  );
}
