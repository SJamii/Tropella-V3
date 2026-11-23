"use client";

import { useId, useState } from "react";
import Link from "next/link";
import { Eyebrow } from "@/components/eyebrow";
import { Icon } from "@/components/icon";
import { bangla } from "@/lib/fonts";
import type { ProductVariety, VarietyGroup } from "@/lib/products";
import { cn } from "@/lib/utils";

type VarietySwitcherProps = {
  group: VarietyGroup;
};

/**
 * "Choose your mango / pineapple" section: pill tabs pick a variety, and a
 * spotlight card shows its region, season, flavour and best uses.
 * Informational only — the single link goes to the contact form, like the
 * page's other enquiry CTAs.
 */
export function VarietySwitcher({ group }: VarietySwitcherProps) {
  const { fruit, list: varieties } = group;
  const [index, setIndex] = useState(0);
  const v = varieties[index];
  const headingId = useId();
  const Art = ART[fruit];
  const fruitLabel = fruit.charAt(0).toUpperCase() + fruit.slice(1);

  return (
    <section aria-labelledby={headingId}>
      <div className="mb-6 flex flex-wrap items-end justify-between gap-x-10 gap-y-3">
        <div>
          <Eyebrow className="mb-3">CHOOSE YOUR {fruit.toUpperCase()}</Eyebrow>
          <h2
            id={headingId}
            className="font-display text-[clamp(28px,4vw,44px)] leading-[1.04] font-extrabold tracking-[-0.03em] text-ink"
          >
            {varieties.length} Bangladeshi varieties,
            <br className="hidden sm:block" /> each with its own character
          </h2>
        </div>
        <p className="max-w-[340px] text-[15px] leading-[1.55] text-ink-dim">
          Pick a variety to see where it grows, when it&apos;s in season and
          how it tastes once dried.
        </p>
      </div>

      {/* Tabs: scroll sideways on phones, wrap from md. */}
      <div
        role="group"
        aria-label={`${fruitLabel} variety`}
        className="-mx-6 mb-5 flex gap-2.5 overflow-x-auto px-6 pb-1 [scrollbar-width:none] md:mx-0 md:flex-wrap md:px-0"
      >
        {varieties.map((variety, i) => {
          const selected = i === index;
          return (
            <button
              key={variety.name}
              type="button"
              aria-pressed={selected}
              onClick={() => setIndex(i)}
              className={cn(
                "inline-flex min-h-11 shrink-0 cursor-pointer items-center gap-2 rounded-full border px-[18px] text-[14px] font-semibold transition-colors duration-200",
                selected
                  ? "border-ink bg-ink text-canvas"
                  : "border-border text-ink-soft hover:border-brand/50 hover:text-ink",
              )}
            >
              <span
                aria-hidden="true"
                className="size-2.5 rounded-full"
                style={{ backgroundColor: variety.colors.flesh }}
              />
              {variety.name}
            </button>
          );
        })}
      </div>

      <div className="grid overflow-hidden rounded-3xl border border-border bg-surface-2 lg:grid-cols-2">
        {/* Visual */}
        <div
          className="relative grid min-h-[280px] place-items-center overflow-hidden transition-[background] duration-500 md:min-h-[360px]"
          style={{
            background: `radial-gradient(circle at 50% 46%, ${v.colors.flesh}55 0%, ${v.colors.flesh}14 42%, transparent 72%)`,
          }}
        >
          <div className="grid w-[min(280px,68%)] place-items-center motion-safe:animate-bob">
            <Art
              key={v.name}
              variety={v}
              className="w-full motion-safe:animate-in motion-safe:fade-in motion-safe:zoom-in-95 motion-safe:duration-500"
            />
          </div>
        </div>

        {/* Details */}
        <div
          key={v.name}
          aria-live="polite"
          className="flex flex-col gap-5 p-6 motion-safe:animate-in motion-safe:fade-in motion-safe:slide-in-from-bottom-2 motion-safe:duration-500 md:p-10"
        >
          <div className="flex flex-wrap gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-border px-3 py-1.5 text-[13px] text-ink-soft">
              <Icon name="location_on" className="text-[16px]" />
              {v.region}
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-leaf/35 bg-leaf/[0.12] px-3 py-1.5 text-[13px] text-leaf-soft">
              <Icon name="calendar_month" className="text-[16px]" />
              In season: {v.season}
            </span>
          </div>

          <div>
            <h3 className="font-display text-[clamp(38px,5vw,52px)] leading-none font-extrabold tracking-[-0.03em] text-ink">
              {v.name}
            </h3>
            <p
              lang="bn"
              className={cn(bangla.className, "mt-1.5 text-[20px] font-medium text-brand-soft")}
            >
              {v.nameBn}
            </p>
          </div>

          <p className="max-w-[460px] text-[16px] leading-[1.6] text-ink-muted">
            {v.note}
          </p>

          <dl className="grid max-w-[420px] grid-cols-[92px_minmax(0,1fr)] items-center gap-x-4 gap-y-3">
            <Meter label="Sweetness" value={v.sweetness} color={v.colors.flesh} />
            <Meter label="Tang" value={v.tang} color={v.colors.flesh} />
            <Meter label="Aroma" value={v.aroma} color={v.colors.flesh} />
          </dl>

          <div className="flex flex-wrap items-center gap-2">
            <span className="mr-1 text-[13px] text-ink-dim">Best for</span>
            {v.bestFor.map((use) => (
              <span
                key={use}
                className="rounded-full border border-brand/30 bg-brand/[0.14] px-[11px] py-[5px] text-[12px] font-semibold text-brand-soft"
              >
                {use}
              </span>
            ))}
          </div>

          <Link
            href="/#tp-contact"
            className="mt-1 inline-flex min-h-11 items-center gap-1.5 self-start text-[15px] font-semibold text-brand-soft transition-colors hover:text-brand"
          >
            Ask us about {v.name}
            <Icon name="arrow_forward" className="text-[18px]" />
          </Link>
        </div>
      </div>
    </section>
  );
}

/** A 5-step flavour scale, read out as "Sweetness: 4 out of 5". */
function Meter({
  label,
  value,
  color,
}: {
  label: string;
  value: number;
  color: string;
}) {
  return (
    <>
      <dt className="text-[13px] text-ink-dim">{label}</dt>
      <dd className="flex gap-1.5">
        <span className="sr-only">
          {value} out of 5
        </span>
        {[1, 2, 3, 4, 5].map((step) => (
          <span
            key={step}
            aria-hidden="true"
            className="h-2 flex-1 rounded-full bg-ink/[0.12] transition-colors duration-300"
            style={step <= value ? { backgroundColor: color } : undefined}
          />
        ))}
      </dd>
    </>
  );
}

type ArtProps = { variety: ProductVariety; className?: string };

/** Illustrated lime with a dried wheel, tinted per variety. */
function LimeArt({ variety, className }: ArtProps) {
  const gradientId = useId();
  const { skin, flesh } = variety.colors;

  return (
    <svg viewBox="0 0 130 150" aria-hidden="true" className={className}>
      <defs>
        <radialGradient id={gradientId} cx="0.35" cy="0.35" r="0.75">
          <stop offset="0" stopColor={flesh} />
          <stop offset="0.55" stopColor={skin} />
          <stop offset="1" stopColor={skin} />
        </radialGradient>
      </defs>
      {/* Leaf */}
      <path d="M62 34 C70 18 88 12 104 16 C96 30 80 38 62 34Z" fill="#5E9A3A" />
      <path
        d="M62 34 C76 28 88 22 100 18"
        stroke="#3E7426"
        strokeWidth="1.2"
        fill="none"
      />
      {/* Whole lime */}
      <ellipse
        cx="54"
        cy="72"
        rx="42"
        ry="35"
        transform="rotate(-14 54 72)"
        fill={`url(#${gradientId})`}
      />
      <circle cx="14" cy="82" r="4" fill={skin} />
      <ellipse
        cx="38"
        cy="56"
        rx="12"
        ry="6"
        fill="#fff"
        opacity="0.22"
        transform="rotate(-20 38 56)"
      />
      {/* Dried wheel */}
      <circle cx="98" cy="114" r="27" fill={skin} />
      <circle cx="98" cy="114" r="24" fill="#F6F7DC" />
      <circle cx="98" cy="114" r="21" fill={flesh} />
      <g stroke="#F6F7DC" strokeWidth="1.6" strokeLinecap="round">
        {[0, 45, 90, 135].map((deg) => (
          <path
            key={deg}
            d="M98 94 L98 134"
            transform={`rotate(${deg} 98 114)`}
          />
        ))}
      </g>
      <circle cx="98" cy="114" r="3.5" fill="#F6F7DC" />
    </svg>
  );
}

/** Illustrated pineapple with a dried ring, tinted per variety. */
function PineappleArt({
  variety,
  className,
}: {
  variety: ProductVariety;
  className?: string;
}) {
  const id = useId();
  const gradientId = `${id}-skin`;
  const clipId = `${id}-body`;
  const { skin, flesh } = variety.colors;
  // Diagonal offsets for the criss-cross skin pattern.
  const lines = Array.from({ length: 12 }, (_, i) => -44 + i * 12);

  return (
    <svg viewBox="0 0 130 150" aria-hidden="true" className={className}>
      <defs>
        <linearGradient id={gradientId} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor={skin} />
          <stop offset="1" stopColor={flesh} />
        </linearGradient>
        <clipPath id={clipId}>
          <ellipse cx="56" cy="94" rx="34" ry="44" />
        </clipPath>
      </defs>
      {/* Crown */}
      <path
        d="M56 56 C50 38 42 24 30 14 C44 18 52 28 56 40 C58 24 62 12 70 2 C68 18 66 32 62 46 C70 32 80 24 94 20 C82 30 72 42 64 56Z"
        fill="#5E9A3A"
      />
      <path d="M56 58 C48 46 40 40 26 38 C40 34 50 40 58 50Z" fill="#78B045" />
      {/* Body */}
      <ellipse cx="56" cy="94" rx="34" ry="44" fill={`url(#${gradientId})`} />
      <g
        clipPath={`url(#${clipId})`}
        stroke="#5B4A2A"
        strokeOpacity="0.3"
        strokeWidth="1.5"
      >
        {lines.map((x) => (
          <path key={`a${x}`} d={`M${x} 44 L${x + 100} 144`} />
        ))}
        {lines.map((x) => (
          <path key={`b${x}`} d={`M${x + 100} 44 L${x} 144`} />
        ))}
      </g>
      <ellipse
        cx="40"
        cy="76"
        rx="7"
        ry="16"
        fill="#fff"
        opacity="0.18"
        transform="rotate(20 40 76)"
      />
      {/* Dried ring */}
      <circle
        cx="102"
        cy="120"
        r="22"
        fill={flesh}
        stroke="#FFF4D6"
        strokeOpacity="0.45"
        strokeWidth="1.5"
      />
      <g stroke="#FFF4D6" strokeOpacity="0.45" strokeWidth="1">
        {[0, 45, 90, 135].map((deg) => (
          <path
            key={deg}
            d="M102 102 L102 138"
            transform={`rotate(${deg} 102 120)`}
          />
        ))}
      </g>
      <circle cx="102" cy="120" r="5" fill="#FBEBB5" />
    </svg>
  );
}

/** Illustrated mango with a dehydrated slice, tinted per variety. */
function MangoArt({
  variety,
  className,
}: {
  variety: ProductVariety;
  className?: string;
}) {
  const gradientId = useId();
  const { skin, flesh } = variety.colors;

  return (
    <svg viewBox="0 -8 130 150" aria-hidden="true" className={className}>
      <defs>
        <linearGradient id={gradientId} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor={skin} />
          <stop offset="1" stopColor={flesh} />
        </linearGradient>
      </defs>
      <path
        d="M58 14 C88 12 110 42 106 80 C102 114 76 134 50 130 C22 126 8 100 12 70 C16 36 30 16 58 14Z"
        fill={`url(#${gradientId})`}
      />
      <path
        d="M58 15 C58 9 60 4 64 1"
        stroke="#5B4A2A"
        strokeWidth="3"
        fill="none"
        strokeLinecap="round"
      />
      <path d="M63 6 C75 -5 93 -3 100 3 C88 12 73 12 63 6Z" fill="#6FA03A" />
      <ellipse
        cx="38"
        cy="52"
        rx="9"
        ry="18"
        fill="#fff"
        opacity="0.18"
        transform="rotate(25 38 52)"
      />
      <path
        d="M78 104 C98 92 120 98 126 116 C112 132 88 132 78 104Z"
        fill={flesh}
        stroke="#FFF4D6"
        strokeOpacity="0.4"
        strokeWidth="1.5"
      />
    </svg>
  );
}

/** Which illustration each fruit uses. */
const ART: Record<VarietyGroup["fruit"], (props: ArtProps) => React.JSX.Element> = {
  mango: MangoArt,
  pineapple: PineappleArt,
  lime: LimeArt,
};
