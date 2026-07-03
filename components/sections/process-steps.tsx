"use client";

import { useEffect, useRef, useState } from "react";
import { Icon } from "@/components/icon";
import { Reveal } from "@/components/reveal";
import { cn } from "@/lib/utils";

const STEPS = [
  {
    number: "01",
    icon: "pan_tool",
    title: "Handpicked",
    body: "The finest fruits and vegetables, sourced from tropical farms at their peak.",
  },
  {
    number: "02",
    icon: "content_cut",
    title: "Washed & Sliced",
    body: "Triple-washed and expertly sliced for consistent, even dehydration.",
  },
  {
    number: "03",
    icon: "sunny",
    title: "Naturally Dried",
    body: "Slow-dried at low temperatures to lock in nutrients, color, and flavor.",
  },
  {
    number: "04",
    icon: "inventory_2",
    title: "Packed Fresh",
    body: "Sealed in eco-pouches or milled into fine powder for maximum freshness.",
  },
] as const;

export function ProcessSteps() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  // Highlight follows scroll: map how far the section has passed the viewport's
  // vertical center to a step index (0 as it enters → last as it leaves). We
  // measure the whole section (not just the grid) so the desktop row — which is
  // short — still gives each step a wide enough scroll window to highlight.
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const target = el.closest("section") ?? el;

    let raf = 0;
    const update = () => {
      raf = 0;
      const rect = target.getBoundingClientRect();
      const viewportCenter = window.innerHeight / 2;
      const progress = (viewportCenter - rect.top) / rect.height;
      const idx = Math.min(
        STEPS.length - 1,
        Math.max(0, Math.round(progress * (STEPS.length - 1))),
      );
      setActive(idx);
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
    <div
      ref={containerRef}
      className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4"
    >
      {STEPS.map((step, i) => {
        const isActive = i === active;
        return (
          <Reveal key={step.number} delay={i * 90}>
            <div className="text-center sm:text-left">
              <div className="mb-[18px] flex items-center justify-center gap-[14px] sm:justify-start">
                <span
                  className={cn(
                    "font-display text-[46px] leading-none font-extrabold transition-colors duration-500",
                    isActive ? "text-brand" : "text-brand/30",
                  )}
                >
                  {step.number}
                </span>
                <span
                  className={cn(
                    "flex size-[52px] items-center justify-center rounded-[15px] transition-all duration-500",
                    isActive
                      ? "scale-110 bg-brand shadow-[0_10px_26px_rgba(244,169,60,0.35)]"
                      : "bg-brand/[0.13]",
                  )}
                >
                  <Icon
                    name={step.icon}
                    className={cn(
                      "text-[28px] transition-colors duration-500",
                      isActive ? "text-canvas" : "text-brand",
                    )}
                  />
                </span>
              </div>
              <h4 className="mb-[9px] font-display text-[21px] font-bold">
                {step.title}
              </h4>
              <p className="text-[15px] leading-[1.55] text-ink-dim">
                {step.body}
              </p>
            </div>
          </Reveal>
        );
      })}
    </div>
  );
}
