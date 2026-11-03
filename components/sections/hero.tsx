import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Icon } from "@/components/icon";
import { Reveal } from "@/components/reveal";
import { HeroArt } from "@/components/hero-art";
import { HeroFloaters } from "@/components/hero-floaters";
import { cn } from "@/lib/utils";

const GRADIENT_TEXT =
  "bg-[linear-gradient(115deg,var(--color-brand)_20%,var(--color-brand-deep)_60%,var(--color-leaf))] bg-clip-text text-transparent";

// h1 words, popped in one by one on load (70ms stagger).
const HEADLINE: { word: string; gradient?: boolean }[] = [
  { word: "From" },
  { word: "Tropics" },
  { word: "to" },
  { word: "your" },
  { word: "Table", gradient: true },
  { word: "&", gradient: true },
  { word: "Factory", gradient: true },
];

export function Hero() {
  return (
    <header
      id="tp-top"
      className="relative isolate overflow-hidden px-6 pt-32 pb-[70px] md:px-8 md:pt-[150px]"
    >
      {/* Morphing background blobs + paper grain */}
      <div aria-hidden="true" className="pointer-events-none absolute -top-24 -right-20 -z-10 size-[420px] animate-morph bg-brand/14 blur-[72px] md:size-[560px]" />
      <div aria-hidden="true" className="pointer-events-none absolute -bottom-28 -left-24 -z-10 size-[380px] animate-morph2 bg-leaf/12 blur-[72px] md:size-[500px]" />
      <div aria-hidden="true" className="paper-grain pointer-events-none absolute inset-0 -z-10 opacity-[0.07]" />

      <HeroFloaters />

      <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-[1.05fr_0.95fr]">
        {/* Copy */}
        <div>
          <Reveal>
            <span className="mb-[26px] inline-flex items-center gap-[9px] rounded-full border border-brand/30 bg-brand/10 px-[15px] py-2 text-[13px] font-semibold tracking-[0.04em] text-brand-soft">
              <span className="size-[7px] rounded-full bg-brand" />
              CHOOSE THE ONE THAT LASTS
            </span>
          </Reveal>

          <h1 className="mb-6 font-display text-[clamp(42px,5.6vw,82px)] leading-[0.98] font-extrabold tracking-[-0.03em]">
            {HEADLINE.map(({ word, gradient }, i) => (
              <span key={word}>
                <span
                  className={cn("inline-block animate-word-pop", gradient && GRADIENT_TEXT)}
                  style={{ animationDelay: `${i * 70}ms` }}
                >
                  {word}
                </span>
                {i < HEADLINE.length - 1 && " "}
              </span>
            ))}
          </h1>

          <Reveal delay={180}>
            <p className="mb-[34px] max-w-[520px] text-[19px] leading-[1.55] text-ink-muted">
              Premium tropical dried fruits, dried vegetables, and natural
              powders — handpicked and slow-dried for discerning kitchens and
              innovative manufacturers alike.
            </p>
          </Reveal>

          <Reveal delay={270}>
            <div className="flex flex-col flex-wrap gap-[14px] sm:flex-row">
              <Button asChild variant="brand" size="pillLg" className="w-full sm:w-auto">
                <Link href="#tp-range">
                  Explore Products
                  <Icon name="arrow_forward" className="text-[19px]" />
                </Link>
              </Button>
              <Button asChild variant="brandOutline" size="pillLg" className="w-full sm:w-auto">
                <Link href="#tp-contact">Partner With Us</Link>
              </Button>
            </div>
          </Reveal>
        </div>

        {/* Product pouch */}
        <Reveal delay={120}>
          <HeroArt />
        </Reveal>
      </div>
    </header>
  );
}
