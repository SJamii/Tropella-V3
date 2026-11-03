import { Icon } from "@/components/icon";
import type { ProductDetail } from "@/lib/products";
import { cn } from "@/lib/utils";

const TONE = {
  brand: {
    frame:
      "from-brand/70 via-brand/15 to-brand-deep/60 shadow-[0_28px_70px_-34px_rgba(244,169,60,0.55)]",
    accent: "text-brand",
    label: "text-brand-soft",
    tile: "border-brand/25 bg-brand/[0.08]",
    tip: "border-brand/30 bg-brand/[0.1]",
  },
  leaf: {
    frame:
      "from-leaf/70 via-leaf/15 to-leaf/50 shadow-[0_28px_70px_-34px_rgba(134,192,63,0.5)]",
    accent: "text-leaf",
    label: "text-leaf-soft",
    tile: "border-leaf/25 bg-leaf/[0.08]",
    tip: "border-leaf/30 bg-leaf/[0.1]",
  },
} as const;

type GoodToKnowProps = Pick<ProductDetail, "tone" | "usage" | "benefits" | "tip">;

/**
 * The highlighted usage + benefits box on a product detail page. A gradient
 * border in the product's tone sets it apart from the plain-bordered cards.
 */
export function GoodToKnow({ tone, usage, benefits, tip }: GoodToKnowProps) {
  const t = TONE[tone];

  return (
    <section
      aria-labelledby="good-to-know"
      className={cn("rounded-3xl bg-linear-to-br p-px", t.frame)}
    >
      <div className="rounded-[calc(var(--radius-3xl)-1px)] bg-surface-2 p-6 md:p-8">
        <h2
          id="good-to-know"
          className={cn(
            "mb-6 flex items-center gap-2 text-[13px] font-bold tracking-[0.12em]",
            t.accent,
          )}
        >
          <Icon name="auto_awesome" className="text-[20px]" />
          GOOD TO KNOW
        </h2>

        <h3 className="mb-4 font-display text-[20px] font-bold tracking-[-0.01em] text-ink">
          How to enjoy
        </h3>
        <ul className="grid grid-cols-2 gap-3 md:grid-cols-4">
          {usage.map((item) => (
            <li
              key={item.label}
              className={cn(
                "flex flex-col gap-3 rounded-2xl border p-4",
                t.tile,
              )}
            >
              <Icon name={item.icon} className={cn("text-[28px]", t.accent)} />
              <span className="text-[14px] leading-[1.4] font-semibold text-ink-soft">
                {item.label}
              </span>
            </li>
          ))}
        </ul>

        <div className="my-7 h-px bg-border" />

        <h3 className="mb-4 font-display text-[20px] font-bold tracking-[-0.01em] text-ink">
          Why you&apos;ll love it
        </h3>
        <ul className="flex flex-col gap-3">
          {benefits.map((benefit) => (
            <li
              key={benefit}
              className="flex items-start gap-3 text-[15.5px] leading-[1.5] text-ink-muted"
            >
              <Icon
                name="check_circle"
                filled
                className={cn("mt-px text-[21px]", t.accent)}
              />
              {benefit}
            </li>
          ))}
        </ul>

        <p
          className={cn(
            "mt-7 flex items-start gap-3 rounded-2xl border p-4 text-[15px] leading-[1.5] text-ink-soft",
            t.tip,
          )}
        >
          <Icon
            name="lightbulb"
            className={cn("mt-px text-[21px]", t.accent)}
          />
          <span>
            <strong className={cn("font-bold", t.label)}>Tip: </strong>
            {tip}
          </span>
        </p>
      </div>
    </section>
  );
}
