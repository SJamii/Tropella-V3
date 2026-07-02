import { cn } from "@/lib/utils";

type IconProps = {
  /** Material Symbols ligature name, e.g. "spa", "arrow_forward". */
  name: string;
  /** Use the filled variant of the glyph. */
  filled?: boolean;
  className?: string;
} & React.HTMLAttributes<HTMLSpanElement>;

/**
 * Material Symbols icon. Size and color follow font-size / text color, so
 * control them with utilities: `<Icon name="spa" className="text-[21px] text-brand" />`.
 * Decorative by default (aria-hidden); pass an aria-label for meaningful icons.
 */
export function Icon({ name, filled, className, style, ...props }: IconProps) {
  return (
    <span
      aria-hidden="true"
      className={cn("material-symbols-outlined leading-none", className)}
      style={filled ? { fontVariationSettings: "'FILL' 1", ...style } : style}
      {...props}
    >
      {name}
    </span>
  );
}
