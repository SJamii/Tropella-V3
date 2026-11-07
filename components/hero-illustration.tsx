import { cn } from "@/lib/utils";

/** Folder holding the hero's flat fruit / vegetable SVG illustrations. */
export const HERO_ILLUSTRATIONS = "/tropella-hero-illustrations/hero-illustrations";

export type HeroIllustrationName =
  | "mango-slice"
  | "lime-slice"
  | "pineapple-ring"
  | "tomato-slice"
  | "moringa-sprig"
  | "garlic"
  | "pumpkin-slice"
  | "ginger"
  | "powder-bowl";

export function heroIllustrationSrc(name: HeroIllustrationName) {
  return `${HERO_ILLUSTRATIONS}/${name}.svg`;
}

/**
 * powder-bowl.svg with its powder mound re-tinted per product. The bowl comes
 * from the file; the mound + puffs are redrawn on top in `currentColor`, so
 * set the powder colour with a `text-*` token. Renders a nested <svg>, so it
 * works inside another SVG (pass x / y / width / height) or in HTML.
 */
export function PowderBowl({
  className,
  ...props
}: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 100 100"
      aria-hidden="true"
      className={cn("text-leaf", className)}
      {...props}
    >
      <image href={heroIllustrationSrc("powder-bowl")} width="100" height="100" />
      {/* Stops just above the bowl rim (y≈58) so the file's rim stays on top. */}
      <path d="M16.6 58.2 C22 36 40 28 50 28 C62 28 78 36 83.4 58.2Z" fill="currentColor" />
      {/* Puffs opaque + a hair larger so the file's green ones don't show through. */}
      <circle cx="34" cy="22" r="3.4" fill="currentColor" />
      <circle cx="62" cy="16" r="2.8" fill="currentColor" />
      <circle cx="50" cy="9" r="2.2" fill="currentColor" />
    </svg>
  );
}
