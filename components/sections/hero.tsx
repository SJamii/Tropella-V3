import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Icon } from "@/components/icon";
import { Reveal } from "@/components/reveal";

export function Hero() {
  return (
    <header
      id="tp-top"
      className="relative overflow-hidden px-6 pt-32 pb-[70px] md:px-8 md:pt-[150px]"
    >
      {/* Decorative floating blobs */}
      <div className="pointer-events-none absolute -top-20 -right-[60px] size-[520px] rounded-full bg-[radial-gradient(circle,rgba(244,169,60,0.22),transparent_65%)] blur-[20px] animate-float" />
      <div className="pointer-events-none absolute -bottom-[120px] -left-20 size-[480px] rounded-full bg-[radial-gradient(circle,rgba(134,192,63,0.16),transparent_65%)] blur-[20px] animate-float2" />

      <div className="relative mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-[1.05fr_0.95fr]">
        {/* Copy */}
        <div>
          <Reveal>
            <span className="mb-[26px] inline-flex items-center gap-[9px] rounded-full border border-brand/30 bg-brand/10 px-[15px] py-2 text-[13px] font-semibold tracking-[0.04em] text-brand-soft">
              <span className="size-[7px] rounded-full bg-brand" />
              FROM THE TROPICS, NATURALLY
            </span>
          </Reveal>

          <Reveal delay={90}>
            <h1 className="mb-6 font-display text-[clamp(42px,5.6vw,82px)] leading-[0.98] font-extrabold tracking-[-0.03em]">
              From Tropics to your{" "}
              <span className="bg-[linear-gradient(115deg,var(--color-brand)_20%,var(--color-brand-deep)_60%,var(--color-leaf))] bg-clip-text text-transparent">
                Table &amp; Factory
              </span>
            </h1>
          </Reveal>

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

        {/* Product visual */}
        <Reveal delay={120} className="relative">
          <div className="relative animate-herofloat">
            <div className="relative h-105 w-full overflow-hidden rounded-[28px] md:h-130">
              <Image
                src="/hero-product.jpeg"
                alt="A bowl of premium tropical dried fruit — mango, pineapple, banana, and jackfruit — with fresh moringa leaves on dark slate."
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 560px"
                className="object-cover"
              />
            </div>

            {/* Spinning "100% natural" seal */}
            <div className="absolute -top-[14px] -right-[14px] flex size-[88px] items-center justify-center rounded-full bg-linear-to-br from-brand to-brand-deep text-center animate-spin-slow">
              <span className="font-display text-[12px] leading-[1.1] font-bold text-canvas">
                100%
                <br />
                NATURAL
              </span>
            </div>
          </div>
        </Reveal>
      </div>
    </header>
  );
}
