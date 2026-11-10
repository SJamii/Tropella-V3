import Image from "next/image";

import { Icon } from "@/components/icon";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { cn } from "@/lib/utils";

type Testimonial = {
  tone: "brand" | "leaf";
  quote: string;
  name: string;
  role: string;
  /** Reviewer photo in /public; falls back to a person icon. */
  image?: string;
};

const TESTIMONIALS: Testimonial[] = [
  {
    tone: "brand",
    quote: "The product is absolutely amazing. Something new tried after ages 💗",
    name: "Arefin Chisty",
    role: "China",
    image: "/reviewer-arefin-chisty.jpg",
  },
  {
    tone: "brand",
    quote:
      "I'd tried Thai dried mango before, so I gave Tropella a go — honestly amazed. The dried mango and pineapple were top notch, and the moringa powder is really good too. Will definitely order again.",
    name: "Hima Nur",
    role: "Bangladesh",
    image: "/reviewer-hima-nur.jpg",
  },
  {
    tone: "leaf",
    quote:
      "Finding a reliable export partner who understands organic standards was tough — until we found Tropella. Their documentation is flawless.",
    name: "Marcus K.",
    role: "Logistics Director, Berlin",
  },
];

const AVATAR_TONE = {
  brand: "bg-brand/15 text-brand",
  leaf: "bg-leaf/15 text-leaf",
} as const;

export function Testimonials() {
  return (
    <section className="border-y border-border bg-surface">
      <div className="mx-auto max-w-7xl px-6 py-22.5 md:px-8">
        <SectionHeading
          tone="leaf"
          align="center"
          eyebrow="LOVED AROUND THE WORLD"
          title="From chefs to factory floors"
          className="mb-[50px]"
        />

        <div className="grid gap-5 md:grid-cols-3">
          {TESTIMONIALS.map((t, i) => (
            <Reveal key={t.name} delay={Math.min(i * 90, 360)} className="h-full">
              <figure className="flex h-full flex-col rounded-[22px] border border-border bg-surface-2 p-8">
                <div className="mb-[18px] flex gap-[3px]">
                  {Array.from({ length: 5 }).map((_, s) => (
                    <Icon
                      key={s}
                      name="star"
                      filled
                      className="text-[19px] text-brand"
                    />
                  ))}
                </div>
                <blockquote className="mb-6 text-[16.5px] leading-[1.6] text-ink-soft">
                  {t.quote}
                </blockquote>
                <figcaption className="mt-auto flex items-center gap-[13px]">
                  {t.image ? (
                    <Image
                      src={t.image}
                      alt=""
                      width={44}
                      height={44}
                      className="size-11 rounded-full object-cover"
                    />
                  ) : (
                    <span
                      className={cn(
                        "flex size-11 items-center justify-center rounded-full",
                        AVATAR_TONE[t.tone],
                      )}
                    >
                      <Icon name="person" className="text-[24px]" />
                    </span>
                  )}
                  <div>
                    <div className="text-[15px] font-bold text-ink">
                      {t.name}
                    </div>
                    <div className="text-[13px] text-ink-dim">{t.role}</div>
                  </div>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
