"use client";

import { useEffect, useRef, useState } from "react";
import { Icon } from "@/components/icon";
import { Reveal } from "@/components/reveal";

const FEATURES = [
  {
    icon: "box_add",
    title: "Bulk Packaging",
    body: "Vacuum-sealed industrial packs, 5kg–25kg.",
  },
  {
    icon: "science",
    title: "Custom Specs",
    body: "Tailored moisture levels and cut sizes.",
  },
  {
    icon: "local_shipping",
    title: "Worldwide Logistics",
    body: "CIF / FOB shipping options available.",
  },
  {
    icon: "fact_check",
    title: "Compliance",
    body: "Full traceability and documentation.",
  },
];

export function WholesaleFeatures() {
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const [focused, setFocused] = useState(0);

  // Mobile-only focus: the card whose center is nearest the viewport center
  // gets highlighted as you scroll (touch devices have no hover). The focus
  // styling itself is gated to `max-lg` in the classes below — desktop uses
  // hover — so this state is simply ignored at wider breakpoints.
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

    schedule(); // initial position (deferred so we don't setState in render)
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule, { passive: true });
    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div className="grid gap-[18px] sm:grid-cols-2 lg:grid-cols-4">
      {FEATURES.map((feature, i) => (
        <Reveal
          key={feature.title}
          delay={Math.min(i * 90, 360)}
          className="h-full"
        >
          <div
            ref={(el) => {
              cardsRef.current[i] = el;
            }}
            data-focused={i === focused ? "true" : undefined}
            className="group flex h-full flex-col items-center rounded-[18px] border border-white/7 bg-surface-2 p-[26px] text-center transition-all duration-300 hover:-translate-y-1.5 hover:border-leaf/40 hover:bg-[color-mix(in_oklch,var(--color-surface-2),white_5%)] hover:shadow-[0_20px_44px_-14px_rgba(134,192,63,0.45)] active:-translate-y-1.5 active:border-leaf/40 active:bg-[color-mix(in_oklch,var(--color-surface-2),white_5%)] active:shadow-[0_20px_44px_-14px_rgba(134,192,63,0.45)] max-lg:data-[focused=true]:-translate-y-1.5 max-lg:data-[focused=true]:border-leaf/40 max-lg:data-[focused=true]:bg-[color-mix(in_oklch,var(--color-surface-2),white_5%)] max-lg:data-[focused=true]:shadow-[0_20px_44px_-14px_rgba(134,192,63,0.45)] sm:items-start sm:text-left"
          >
            <span className="inline-flex size-12 items-center justify-center rounded-2xl border border-leaf/20 bg-leaf/[0.12] transition-transform duration-300 ease-out group-hover:scale-110 group-hover:rotate-6 group-active:scale-110 group-active:rotate-6 max-lg:group-data-[focused=true]:scale-110 max-lg:group-data-[focused=true]:rotate-6">
              <Icon name={feature.icon} className="text-[26px] text-leaf" />
            </span>
            <h4 className="mt-[18px] mb-[7px] font-display text-[18px] font-bold tracking-[-0.01em]">
              {feature.title}
            </h4>
            <p className="text-[14px] leading-[1.5] text-ink-dim">
              {feature.body}
            </p>
          </div>
        </Reveal>
      ))}
    </div>
  );
}
