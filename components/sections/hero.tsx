import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Icon } from "@/components/icon";
import { Reveal } from "@/components/reveal";
import { HeroArt, HeroProductScope } from "@/components/hero-art";
import { cn } from "@/lib/utils";

// h1 words, popped in one by one on load (70ms stagger). `accent` words are
// brand-coloured; `underline` gets a hand-drawn stroke drawn in after the pop.
const HEADLINE: { word: string; accent?: boolean; underline?: boolean }[] = [
  { word: "From" },
  { word: "Tropics" },
  { word: "to" },
  { word: "your" },
  { word: "Table", accent: true },
  { word: "&", accent: true },
  { word: "Factory", accent: true, underline: true },
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

      <HeroProductScope className="relative z-10 mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-[1.05fr_0.95fr]">
        {/* Copy */}
        <div>
          <h1 className="mb-6 font-display text-[clamp(42px,5.6vw,82px)] leading-[0.98] font-extrabold tracking-[-0.03em]">
            {HEADLINE.map(({ word, accent, underline }, i) => (
              <span key={word}>
                <span
                  className={cn(
                    "inline-block animate-word-pop",
                    accent && "text-brand-deep",
                    underline && "relative",
                  )}
                  style={{ animationDelay: `${i * 70}ms` }}
                >
                  {word}
                  {underline && (
                    <svg
                      aria-hidden="true"
                      viewBox="0 0 300 24"
                      preserveAspectRatio="none"
                      className="pointer-events-none absolute -bottom-[0.1em] left-[-2%] h-[0.2em] w-[104%] overflow-visible"
                    >
                      <path
                        d="M4 15 C70 6 150 4 296 10 M40 20 C110 14 190 13 262 16"
                        pathLength={1}
                        strokeDasharray={1}
                        className="animate-draw fill-none stroke-leaf"
                        strokeWidth="5"
                        strokeLinecap="round"
                      />
                    </svg>
                  )}
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

          {/* Brand motto, as the closing sign-off. Takes the colour of the
              pack currently on the pouch (see HeroProductScope). */}
          <Reveal delay={360}>
            <p className="mt-9 flex items-center gap-3 font-display text-[20px] font-semibold tracking-[-0.01em] text-(--pk-text) transition-colors duration-500 md:mt-11 md:text-[23px]">
              <span aria-hidden="true" className="h-0.5 w-10 shrink-0 rounded-full bg-(--pk) transition-colors duration-500" />
              Choose the one that lasts.
            </p>
          </Reveal>
        </div>

        {/* Product pouch */}
        <Reveal delay={120}>
          <HeroArt />
        </Reveal>
      </HeroProductScope>
    </header>
  );
}
