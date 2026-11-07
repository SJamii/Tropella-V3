"use client";

import { createContext, use, useEffect, useId, useState } from "react";
import { Icon } from "@/components/icon";
import {
  PowderBowl,
  heroIllustrationSrc,
  type HeroIllustrationName,
} from "@/components/hero-illustration";
import { cn } from "@/lib/utils";

type PouchProduct = {
  name: string;
  /** Pack title: black first line, accent-coloured second line. */
  title: [string, string];
  /** Line under the title. */
  tagline: string;
  /** Wave / accent colour, from the brand tokens (constant across themes). */
  accent: string;
  /** Sugar-added product: the pack tag reads SWEETENED instead of 100% PURE. */
  sweetened?: boolean;
  /** Fruit: a pile of this slice illustration… */
  illustration?: HeroIllustrationName;
  /** …powder: the powder bowl tinted with this colour, beside the raw ingredient. */
  powder?: { tint: string; raw: HeroIllustrationName };
};

const FRUIT = "NATURAL FRUIT SNACK";
const SWEET = "SWEET FRUIT SNACK";
const POWDER = "PURE NATURAL POWDER";

// Index 0 (Dried Mango Slices) is also the reduced-motion resting product.
const PRODUCTS: PouchProduct[] = [
  { name: "Dried Mango Slices", title: ["DRIED", "MANGO SLICES"], tagline: FRUIT, accent: "var(--color-brand)", illustration: "mango-slice" },
  { name: "Dried Pineapple Slices", title: ["DRIED", "PINEAPPLE SLICES"], tagline: FRUIT, accent: "color-mix(in oklch, var(--color-brand) 65%, white)", illustration: "pineapple-ring" },
  { name: "Dried Lime Slices", title: ["DRIED", "LIME SLICES"], tagline: FRUIT, accent: "var(--color-leaf)", illustration: "lime-slice" },
  { name: "Sweetened Dried Mango", title: ["SWEETENED DRIED", "MANGO"], tagline: SWEET, accent: "color-mix(in oklch, var(--color-brand), var(--color-brand-deep))", sweetened: true, illustration: "mango-slice" },
  { name: "Sweetened Dried Pineapple Slices", title: ["SWEETENED DRIED", "PINEAPPLE SLICES"], tagline: SWEET, accent: "color-mix(in oklch, var(--color-brand) 80%, white)", sweetened: true, illustration: "pineapple-ring" },
  { name: "Moringa Powder", title: ["MORINGA", "POWDER"], tagline: POWDER, accent: "color-mix(in oklch, var(--color-leaf), black 22%)", powder: { tint: "var(--color-leaf)", raw: "moringa-sprig" } },
  { name: "Tomato Powder", title: ["TOMATO", "POWDER"], tagline: POWDER, accent: "color-mix(in oklch, var(--color-brand-deep), black 8%)", powder: { tint: "var(--color-brand-deep)", raw: "tomato-slice" } },
  { name: "Garlic Powder", title: ["GARLIC", "POWDER"], tagline: POWDER, accent: "color-mix(in oklch, var(--color-brand) 62%, white)", powder: { tint: "color-mix(in oklch, var(--color-brand) 25%, white)", raw: "garlic" } },
  { name: "Ginger Powder", title: ["GINGER", "POWDER"], tagline: POWDER, accent: "color-mix(in oklch, var(--color-brand), black 15%)", powder: { tint: "color-mix(in oklch, var(--color-brand) 70%, white)", raw: "ginger" } },
  { name: "Pumpkin Powder", title: ["PUMPKIN", "POWDER"], tagline: POWDER, accent: "color-mix(in oklch, var(--color-brand) 55%, var(--color-brand-deep))", powder: { tint: "var(--color-brand)", raw: "pumpkin-slice" } },
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

  return { index, product: PRODUCTS[index], leaving };
}

type ProductCycle = ReturnType<typeof useProductCycle>;
const HeroProductContext = createContext<ProductCycle | null>(null);

/**
 * Wraps the hero columns and owns the pouch's product cycle, so anything in
 * the hero can follow the current product. Exposes the pack colour as
 * `--pk`, plus `--pk-text`: the same hue at a fixed lightness with a chroma
 * floor, so even the pale packs (pineapple, garlic) give a rich, readable
 * text colour — dark on the light theme, light on dark. Colour changes ease
 * via transitions on the elements using them.
 */
export function HeroProductScope({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  const cycle = useProductCycle();
  return (
    <div
      className={cn(
        "[--pk-text:oklch(from_var(--pk)_0.82_max(c,0.1)_h)] light:[--pk-text:oklch(from_var(--pk)_0.5_max(c,0.12)_h)]",
        className,
      )}
      style={{ "--pk": cycle.product.accent } as React.CSSProperties}
    >
      <HeroProductContext value={cycle}>{children}</HeroProductContext>
    </div>
  );
}

/**
 * Vector take on the Tropella stand-up pouch (after the "Dehydrated Lime
 * Slices" packaging): white pouch, colour waves, logo, pack tag, two-line
 * title, product picture and a badge row. Waves and the accent title follow
 * the current product's `--pk` colour and ease between products.
 */
function Pouch({
  product,
  index,
  leaving,
}: {
  product: PouchProduct;
  index: number;
  leaving: boolean;
}) {
  const clip = useId();
  const [line1, line2] = product.title;
  const swap = cn(
    "origin-center transform-fill",
    leaving ? "animate-pop-out" : "animate-pop-in",
  );
  const fade = leaving ? "opacity-0 transition-opacity duration-300" : "animate-fade-in";
  const wave = "transition-[fill] duration-500";

  return (
    <svg
      viewBox="0 0 240 360"
      aria-hidden="true"
      className="h-full w-full overflow-visible drop-shadow-[0_24px_28px_rgb(0_0_0/0.28)] [--pk-ink:oklch(from_var(--pk)_0.5_max(c,0.12)_h)] [--pk-soft:color-mix(in_oklch,var(--pk)_45%,white)]"
      style={{ "--pk": product.accent } as React.CSSProperties}
    >
      <defs>
        <clipPath id={clip}>
          <path d="M14 14 Q14 6 22 6 H218 Q226 6 226 14 V340 Q226 352 214 352 H26 Q14 352 14 340 Z" />
        </clipPath>
      </defs>

      <g clipPath={`url(#${clip})`}>
        <rect x="0" y="0" width="240" height="360" fill="white" />

        {/* Colour waves */}
        <path className={cn(wave, "fill-(--pk)")} d="M14 0 H98 C80 30 88 62 74 90 C62 114 36 126 14 124 Z" />
        <path className={cn(wave, "fill-(--pk-soft)")} d="M14 0 H58 C50 40 44 80 14 102 Z" opacity=".55" />
        <path className={cn(wave, "fill-(--pk-soft)")} d="M138 0 H240 V98 C204 94 172 72 158 46 C150 30 144 14 138 0 Z" />
        <path className={cn(wave, "fill-(--pk)")} d="M0 186 C64 170 124 198 240 176 V200 C156 214 92 188 0 210 Z" />
        <path className={cn(wave, "fill-(--pk-soft)")} d="M0 252 C76 236 150 264 240 244 V360 H0 Z" />

        {/* Zipper seal */}
        <path d="M14 22 H226 M14 27 H226 M14 32 H226" stroke="black" strokeOpacity=".12" strokeWidth="1.2" />

        {/* Logo + motto + pack tag */}
        <image href="/logo-transparent.png" x="62" y="50" width="116" height="30" preserveAspectRatio="xMidYMid meet" />
        <text x="120" y="92" textAnchor="middle" className="fill-primary-foreground text-[7.5px] font-medium">
          Choose the One That Lasts
        </text>
        <rect x="88" y="100" width="64" height="11" rx="1.5" className="fill-primary-foreground" />
        <text key={`tag${index}`} x="120" y="108" textAnchor="middle" letterSpacing="1.4" className={cn("fill-white text-[6.2px] font-bold", fade)}>
          {product.sweetened ? "SWEETENED" : "100% PURE"}
        </text>

        {/* Title (fades between products) */}
        <g key={`t${index}`} className={fade}>
          <text x="120" y="134" textAnchor="middle" fontSize={fitTitle(line1)} className="fill-primary-foreground font-display font-extrabold">
            {line1}
          </text>
          <text x="120" y="155" textAnchor="middle" fontSize={fitTitle(line2)} className={cn(wave, "fill-(--pk-ink) font-display font-extrabold")}>
            {line2}
          </text>
          <text x="120" y="168" textAnchor="middle" letterSpacing="1.8" className="fill-primary-foreground text-[6.4px] font-semibold">
            {product.tagline}
          </text>
        </g>

        {/* Product picture (spins out / pops in) */}
        <g key={`p${index}`} className={swap}>
          {product.powder ? (
            <>
              <image href={heroIllustrationSrc(product.powder.raw)} x="134" y="222" width="54" height="54" />
              <PowderBowl x="62" y="194" width="88" height="88" style={{ color: product.powder.tint }} />
            </>
          ) : (
            <>
              <image href={heroIllustrationSrc(product.illustration!)} x="50" y="216" width="62" height="62" />
              <image href={heroIllustrationSrc(product.illustration!)} x="128" y="216" width="62" height="62" />
              <image href={heroIllustrationSrc(product.illustration!)} x="80" y="194" width="80" height="80" />
            </>
          )}
        </g>

        {/* Badge row — only claims true for every product. */}
        <g className="fill-none stroke-primary-foreground" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
          <path d="M50 316 V305 M50 307 C44 307 41 303 41 298 C46 298 50 301 50 307 M50 305 C50 300 54 296 59 296 C59 301 56 305 50 305" />
          <circle cx="120" cy="306" r="7" />
          <path d="M120 301.5 V306 L123.5 308.5" />
          <circle cx="190" cy="306" r="4.2" />
          <path d="M190 297.5 V299 M190 313 V314.5 M181.5 306 H183 M197 306 H198.5 M184 300 L185 301 M195 311 L196 312 M196 300 L195 301 M185 311 L184 312" />
          <path d="M86 298 V338 M154 298 V338" strokeOpacity=".25" />
        </g>
        <g textAnchor="middle" className="fill-primary-foreground text-[6px] font-bold">
          <text x="50" y="327">HAND</text>
          <text x="50" y="334.5">PICKED</text>
          <text x="120" y="327">SLOW</text>
          <text x="120" y="334.5">DRIED</text>
          <text x="190" y="327">RICH IN</text>
          <text x="190" y="334.5">NATURAL FLAVOR</text>
        </g>
      </g>
    </svg>
  );
}

/** Font size that fits `text` (uppercase display face) in ~196 units. */
function fitTitle(text: string, max = 19) {
  return Math.min(max, 196 / (text.length * 0.66));
}

/**
 * Round seal on the art's corner: claims true for every product run around
 * the edge and slowly turn, while the leaf in the middle stays upright.
 */
function RingBadge({ className }: { className?: string }) {
  const id = useId();
  return (
    <div className={cn("drop-shadow-[0_10px_18px_rgb(0_0_0/0.22)]", className)}>
      <svg viewBox="0 0 100 100" aria-hidden="true" className="size-full animate-spin-slow">
        <defs>
          <linearGradient id={`${id}-g`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="var(--color-brand)" />
            <stop offset="1" stopColor="var(--color-brand-deep)" />
          </linearGradient>
          <path id={`${id}-p`} d="M50 50 m-37 0 a37 37 0 1 1 74 0 a37 37 0 1 1 -74 0" />
        </defs>
        <circle cx="50" cy="50" r="49" fill={`url(#${id}-g)`} />
        <circle cx="50" cy="50" r="26" fill="none" stroke="var(--color-primary-foreground)" strokeOpacity=".35" />
        <text className="fill-primary-foreground font-display text-[9.4px] font-bold">
          <textPath href={`#${id}-p`} textLength="230" lengthAdjust="spacing">
            HAND PICKED · SLOW DRIED · FROM THE TROPICS ·
          </textPath>
        </text>
      </svg>
      <Icon
        name="eco"
        filled
        className="absolute inset-0 m-auto size-fit text-[30px] text-primary-foreground sm:text-[36px]"
      />
    </div>
  );
}

/**
 * Hero right column: rays + soft halo, swaying product pouch, ring badge.
 * Reads the product cycle from the surrounding <HeroProductScope>.
 */
export function HeroArt() {
  const cycle = use(HeroProductContext);
  if (!cycle) throw new Error("HeroArt must be rendered inside <HeroProductScope>");
  const { index, product, leaving } = cycle;

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
        <div className="aspect-2/3 h-[88%] origin-top animate-sway">
          <Pouch product={product} index={index} leaving={leaving} />
        </div>
      </div>

      <RingBadge className="absolute top-[3%] right-[3%] size-21 sm:size-26" />
    </div>
  );
}
