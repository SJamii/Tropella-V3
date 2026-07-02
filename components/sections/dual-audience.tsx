import Link from "next/link";
import { Icon } from "@/components/icon";
import { Reveal } from "@/components/reveal";
import { cn } from "@/lib/utils";

const CARDS = [
  {
    tone: "brand",
    icon: "storefront",
    eyebrow: "FOR YOUR TABLE",
    title: "Retail & Snacking",
    body: "Beautifully packaged dried fruit, veggie chips, and powders for everyday kitchens, gifting, and clean-label snacking.",
    linkLabel: "Browse the store",
    href: "#tp-range",
    // 155deg gradient + border from the source design.
    surface:
      "bg-[linear-gradient(155deg,rgba(244,169,60,0.16),rgba(233,102,59,0.06))] border-brand/20",
    iconColor: "text-brand",
    eyebrowColor: "text-brand-soft",
    linkColor: "text-brand",
  },
  {
    tone: "leaf",
    icon: "factory",
    eyebrow: "FOR YOUR FACTORY",
    title: "Wholesale & Export",
    body: "Industrial-grade powders and slices with custom specs, full traceability, and low MOQs that scale to container volume.",
    linkLabel: "Partner with us",
    href: "#tp-wholesale",
    surface:
      "bg-[linear-gradient(155deg,rgba(134,192,63,0.15),rgba(134,192,63,0.04))] border-leaf/20",
    iconColor: "text-leaf",
    eyebrowColor: "text-leaf-soft",
    linkColor: "text-leaf",
  },
] as const;

export function DualAudience() {
  return (
    <section className="mx-auto max-w-7xl px-6 pt-[90px] pb-[30px] md:px-8">
      <div className="grid gap-[22px] md:grid-cols-2">
        {CARDS.map((card, i) => (
          <Reveal key={card.tone} delay={i * 90}>
            <div
              className={cn(
                "relative h-full overflow-hidden rounded-[24px] border p-[42px] transition-transform duration-300 hover:-translate-y-[5px]",
                card.surface,
              )}
            >
              <Icon
                name={card.icon}
                className={cn("text-[34px]", card.iconColor)}
              />
              <div
                className={cn(
                  "mt-[18px] mb-2 text-[13px] font-bold tracking-[0.1em]",
                  card.eyebrowColor,
                )}
              >
                {card.eyebrow}
              </div>
              <h3 className="mb-3 font-display text-[30px] font-bold tracking-[-0.02em]">
                {card.title}
              </h3>
              <p className="mb-[22px] text-[16px] leading-[1.55] text-ink-muted">
                {card.body}
              </p>
              <Link
                href={card.href}
                className={cn(
                  "inline-flex items-center gap-2 text-[15px] font-semibold",
                  card.linkColor,
                )}
              >
                {card.linkLabel}
                <Icon name="arrow_forward" className="text-[18px]" />
              </Link>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
