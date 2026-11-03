"use client";

import { useEffect, useId, useState } from "react";
import {
  PowderBowl,
  heroIllustrationSrc,
  type HeroIllustrationName,
} from "@/components/hero-illustration";
import { cn } from "@/lib/utils";

type PouchProduct = {
  name: string;
  /** Fruit slices use their own illustration… */
  illustration?: HeroIllustrationName;
  /** …powders use the powder bowl, tinted with a `text-*` token. */
  powder?: string;
};

// Index 0 (Dried Mango Slices) is also the reduced-motion resting product.
const PRODUCTS: PouchProduct[] = [
  { name: "Dried Mango Slices", illustration: "mango-slice" },
  { name: "Dried Pineapple Slices", illustration: "pineapple-ring" },
  { name: "Dried Lime Slices", illustration: "lime-slice" },
  { name: "Sweetened Dried Mango", illustration: "mango-slice" },
  { name: "Moringa Powder", powder: "text-leaf" },
  { name: "Tomato Powder", powder: "text-brand-deep" },
  { name: "Garlic Powder", powder: "text-ink-faint" },
  { name: "Ginger Powder", powder: "text-brand-soft" },
  { name: "Pumpkin Powder", powder: "text-brand" },
];

const CYCLE_MS = 2600;
const OUT_MS = 300; // matches --animate-pop-out

/** Cycles through PRODUCTS; `leaving` is true while the current one spins out. */
function useProductCycle() {
  const [index, setIndex] = useState(0);
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let swap: ReturnType<typeof setTimeout>;
    const tick = setInterval(() => {
      setLeaving(true);
      swap = setTimeout(() => {
        setIndex((i) => (i + 1) % PRODUCTS.length);
        setLeaving(false);
      }, OUT_MS);
    }, CYCLE_MS);
    return () => {
      clearInterval(tick);
      clearTimeout(swap);
    };
  }, []);

  return { product: PRODUCTS[index], index, leaving };
}

/**
 * pouch.svg inlined so its CSS variables follow the theme tokens. The logo,
 * product illustration and label sit in the file's logo-slot, product-window
 * and label-band rects (same coordinates, 240×320 viewBox).
 */
function Pouch() {
  const { product, index, leaving } = useProductCycle();

  return (
    <svg
      viewBox="0 0 240 320"
      aria-hidden="true"
      className="h-full w-full overflow-visible drop-shadow-[0_24px_28px_rgb(0_0_0/0.28)] [--pouch-band:var(--color-brand)] [--pouch-body:var(--color-leaf)] [--pouch-stitch:var(--color-surface-2)] [--pouch-top:color-mix(in_oklch,var(--color-leaf),black_30%)] [--pouch-window:var(--color-surface-2)]"
    >
      <path d="M28 34 L212 34 L226 300 Q120 322 14 300 Z" fill="var(--pouch-body)" />
      <path d="M28 34 L212 34 L213 56 L27 56Z" fill="var(--pouch-top)" />
      <path d="M40 45h160" stroke="var(--pouch-stitch)" strokeWidth="2" strokeDasharray="6 6" opacity=".5" />

      {/* logo-slot */}
      <rect x="58" y="62" width="124" height="48" rx="24" fill="var(--pouch-window)" />
      <image
        href="/logo-transparent.png"
        x="72"
        y="70"
        width="96"
        height="32"
        preserveAspectRatio="xMidYMid meet"
      />

      {/* product-window */}
      <rect x="58" y="112" width="124" height="102" rx="51" fill="var(--pouch-window)" />
      <g
        key={index}
        className={cn(
          "origin-center transform-fill",
          leaving ? "animate-pop-out" : "animate-pop-in",
        )}
      >
        {product.powder ? (
          <PowderBowl x="78" y="121" width="84" height="84" className={product.powder} />
        ) : (
          <image
            href={heroIllustrationSrc(product.illustration!)}
            x="78"
            y="121"
            width="84"
            height="84"
          />
        )}
      </g>

      {/* label-band */}
      <rect x="30" y="226" width="180" height="34" rx="17" fill="var(--pouch-band)" />
      <text
        x="120"
        y="243"
        textAnchor="middle"
        dominantBaseline="central"
        className="fill-primary-foreground font-display text-[12.5px] font-bold"
      >
        {product.name}
      </text>
    </svg>
  );
}

/** Round "100% NATURAL · NO ADDED SUGAR ·" seal, text around its edge. */
function NaturalBadge({ className }: { className?: string }) {
  const id = useId();
  return (
    <svg
      viewBox="0 0 100 100"
      aria-hidden="true"
      className={cn("animate-spin-slow drop-shadow-[0_10px_18px_rgb(0_0_0/0.22)]", className)}
    >
      <defs>
        <linearGradient id={`${id}-g`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="var(--color-brand)" />
          <stop offset="1" stopColor="var(--color-brand-deep)" />
        </linearGradient>
        <path id={`${id}-p`} d="M50 50 m-37 0 a37 37 0 1 1 74 0 a37 37 0 1 1 -74 0" />
      </defs>
      <circle cx="50" cy="50" r="49" fill={`url(#${id}-g)`} />
      <circle cx="50" cy="50" r="27" fill="none" stroke="var(--color-primary-foreground)" strokeOpacity=".35" />
      <text className="fill-primary-foreground font-display text-[9.6px] font-bold">
        <textPath href={`#${id}-p`} textLength="230" lengthAdjust="spacing">
          100% NATURAL · NO ADDED SUGAR ·
        </textPath>
      </text>
      <text
        x="50"
        y="50"
        textAnchor="middle"
        dominantBaseline="central"
        className="fill-primary-foreground font-display text-[15px] font-extrabold"
      >
        100%
      </text>
    </svg>
  );
}

/** Hero right column: rays + soft halo, swaying product pouch, natural seal. */
export function HeroArt() {
  return (
    <div
      role="img"
      aria-label={`A Tropella pouch cycling through our range: ${PRODUCTS.map((p) => p.name).join(", ")}.`}
      className="relative mx-auto aspect-square w-full max-w-75 sm:max-w-100 lg:max-w-120"
    >
      {/* Slowly rotating rays */}
      <div className="absolute inset-0 animate-spin-rays rounded-full bg-[repeating-conic-gradient(var(--color-brand)_0deg_5deg,transparent_5deg_18deg)] opacity-25 mask-radial-from-20% mask-radial-to-70%" />
      {/* Soft halo */}
      <div className="absolute inset-[14%] rounded-full bg-radial from-brand/35 via-leaf/15 via-55% to-transparent to-70%" />

      <div className="absolute inset-0 flex items-center justify-center">
        <div className="aspect-3/4 h-[84%] origin-top animate-sway">
          <Pouch />
        </div>
      </div>

      <NaturalBadge className="absolute top-[3%] right-[3%] size-21 sm:size-26" />
    </div>
  );
}
