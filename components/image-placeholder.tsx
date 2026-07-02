import { Icon } from "@/components/icon";
import { cn } from "@/lib/utils";

type ImagePlaceholderProps = {
  /** Caption describing the intended asset (from the design's slot labels). */
  label?: string;
  /** Material Symbol shown in the center. */
  iconName?: string;
  /** Size + radius come from the caller (e.g. "h-[520px] w-full rounded-[28px]"). */
  className?: string;
};

/**
 * Stand-in for the design's image slots. Swap for `next/image` once real
 * assets are available — the caller controls dimensions and radius.
 */
export function ImagePlaceholder({
  label,
  iconName = "image",
  className,
}: ImagePlaceholderProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center gap-2 overflow-hidden border border-white/[0.06] bg-linear-to-br from-surface-2 to-surface p-4 text-center",
        className,
      )}
    >
      <Icon name={iconName} className="text-3xl text-ink-dim/50" />
      {label && (
        <span className="max-w-[75%] text-xs font-medium text-ink-dim/70">
          {label}
        </span>
      )}
    </div>
  );
}
