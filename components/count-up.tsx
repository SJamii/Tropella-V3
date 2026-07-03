"use client";

import { useEffect, useRef, useState } from "react";

type CountUpProps = {
  /** Target value to count up to. */
  to: number;
  prefix?: string;
  suffix?: string;
  /** Animation length in ms. */
  duration?: number;
  /** Delay before starting once in view (for staggering a row of stats). */
  delay?: number;
  className?: string;
};

/**
 * Animates a number from 0 → `to` the first time it scrolls into view.
 * Eases out (cubic) and respects `prefers-reduced-motion` (jumps to the
 * final value). Used by the Wholesale stat row.
 */
export function CountUp({
  to,
  prefix = "",
  suffix = "",
  duration = 1400,
  delay = 0,
  className,
}: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const [value, setValue] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    let raf = 0;
    let timer: ReturnType<typeof setTimeout> | undefined;
    let start = 0;
    const tick = (now: number) => {
      if (!start) start = now;
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // easeOutCubic
      setValue(Math.round(eased * to));
      if (progress < 1) raf = requestAnimationFrame(tick);
    };

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            io.unobserve(entry.target);
            if (prefersReduced) {
              setValue(to); // no animation — jump to final value
            } else {
              timer = setTimeout(() => {
                raf = requestAnimationFrame(tick);
              }, delay);
            }
          }
        }
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      if (timer) clearTimeout(timer);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [to, duration, delay]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {value}
      {suffix}
    </span>
  );
}
