"use client";

import { useEffect, useRef, useState } from "react";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { cn } from "@/lib/utils";

type Step = {
  number: string;
  title: string;
  body: string;
  tone: "leaf" | "brand";
};

const STEPS: Step[] = [
  {
    number: "01",
    title: "Sourcing",
    body: "Peak-season fruit selected straight from partner farms.",
    tone: "leaf",
  },
  {
    number: "02",
    title: "Drying",
    body: "Gentle drying locks in flavour, colour and nutrients.",
    tone: "brand",
  },
  {
    number: "03",
    title: "Quality Check",
    body: "Sorted, tested and graded by hand and by lab.",
    tone: "leaf",
  },
  {
    number: "04",
    title: "Packaging",
    body: "Bulk or private-label, sealed to your exact spec.",
    tone: "brand",
  },
  {
    number: "05",
    title: "Export",
    body: "Documented, containerised and shipped worldwide.",
    tone: "leaf",
  },
];

// Hover styles for pointers; the same look is re-applied via `data-focused`
// (set on scroll) at `max-lg` so touch devices get the effect too.
const TONE = {
  leaf: {
    number: "text-leaf",
    card: "hover:border-leaf/40 hover:shadow-[0_20px_44px_-14px_rgba(134,192,63,0.45)] max-lg:data-[focused=true]:border-leaf/40 max-lg:data-[focused=true]:shadow-[0_20px_44px_-14px_rgba(134,192,63,0.45)]",
  },
  brand: {
    number: "text-brand",
    card: "hover:border-brand/40 hover:shadow-[0_20px_44px_-14px_rgba(244,169,60,0.45)] max-lg:data-[focused=true]:border-brand/40 max-lg:data-[focused=true]:shadow-[0_20px_44px_-14px_rgba(244,169,60,0.45)]",
  },
} as const;

export function FarmToExport() {
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const [focused, setFocused] = useState(0);

  // Mobile-only: highlight the card whose center is nearest the viewport
  // center as you scroll (touch has no hover). Styling is gated to `max-lg`,
  // so this state is ignored once cards sit in the desktop row.
  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const center = window.innerHeight / 2;
      let best = 0;
      let bestDist = Infinity;
      cardsRef.current.forEach((el, i) => {
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const dist = Math.abs(rect.top + rect.height / 2 - center);
        if (dist < bestDist) {
          bestDist = dist;
          best = i;
        }
      });
      setFocused(best);
    };
    const schedule = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };

    schedule();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule, { passive: true });
    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section
      id="tp-export"
      className="relative overflow-hidden border-t border-border bg-[color-mix(in_oklch,var(--color-canvas),var(--color-leaf)_5%)]"
    >
      {/* Decorative leaf glow, echoing the source mockup's corner light. */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-24 right-[-60px] h-[420px] w-[420px] rounded-full bg-[radial-gradient(circle,rgba(134,192,63,0.14),transparent_70%)]"
      />

      <div className="relative mx-auto max-w-7xl px-6 py-22.5 md:px-8">
        <Reveal className="mb-14">
          <SectionHeading
            tone="leaf"
            eyebrow="FARM TO EXPORT"
            title={
              <>
                From orchard to your port,
                <br />
                in five steps.
              </>
            }
          />
        </Reveal>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {STEPS.map((step, i) => {
            const t = TONE[step.tone];
            return (
              <Reveal
                key={step.number}
                delay={Math.min(i * 80, 400)}
                className="h-full"
              >
                <div
                  ref={(el) => {
                    cardsRef.current[i] = el;
                  }}
                  data-focused={i === focused ? "true" : undefined}
                  className={cn(
                    "group flex h-full flex-col items-center rounded-2xl border border-border bg-surface-2 p-6 text-center transition-all duration-300 hover:-translate-y-1.5 hover:bg-[color-mix(in_oklch,var(--color-surface-2),var(--color-elevate)_6%)] active:-translate-y-1 max-lg:data-[focused=true]:-translate-y-1.5 max-lg:data-[focused=true]:bg-[color-mix(in_oklch,var(--color-surface-2),var(--color-elevate)_6%)] sm:items-start sm:text-left",
                    t.card,
                  )}
                >
                  <div
                    className={cn(
                      "inline-block origin-center font-display text-[40px] leading-none font-extrabold transition-transform duration-300 ease-out group-hover:scale-110 max-lg:group-data-[focused=true]:scale-110 sm:origin-left",
                      t.number,
                    )}
                  >
                    {step.number}
                  </div>
                  <h4 className="mt-4 mb-2 font-display text-[18px] font-bold tracking-[-0.01em]">
                    {step.title}
                  </h4>
                  <p className="text-[14px] leading-[1.5] text-ink-dim">
                    {step.body}
                  </p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
