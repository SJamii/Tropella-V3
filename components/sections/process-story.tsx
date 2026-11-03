"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { SectionHeading } from "@/components/section-heading";
import { ProcessScene } from "@/components/process-scene";
import { cn } from "@/lib/utils";

const STEPS = [
  {
    number: "01",
    title: "Handpicked",
    body: "The finest fruits and vegetables, sourced from tropical farms at their peak.",
  },
  {
    number: "02",
    title: "Washed & Sliced",
    body: "Triple-washed and expertly sliced for consistent, even dehydration.",
  },
  {
    number: "03",
    title: "Machine Dried",
    body: "Dehydrated in temperature-controlled machines — gentle, even heat that locks in nutrients, color, and flavor.",
  },
  {
    number: "04",
    title: "Packed Fresh",
    body: "Sealed in eco-pouches or milled into fine powder for maximum freshness.",
  },
] as const;

/** Drying readout: start (steps 1–2) → end (after step 3). Illustrative. */
const READOUT = {
  start: { moisture: 88, temp: 30, hours: 0 },
  end: { moisture: 10, temp: 58, hours: 12 },
};

/** Scroll distance the pinned story is scrubbed over. */
const SCROLL_PX = 2400;

// Slice row x offsets (DOM order: mango, mango, tomato, tomato, lime, lime).
const PIECE_X = [-140, -84, -28, 28, 84, 140];
// Step-4 drop points relative to the slice row centre (200,240): pouch / jar.
const INTO_POUCH = { x: -80, y: -10 };
const INTO_JAR = { x: 90, y: -50 };

function subscribeReduced(cb: () => void) {
  const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
  mq.addEventListener("change", cb);
  return () => mq.removeEventListener("change", cb);
}

function usePrefersReducedMotion() {
  return useSyncExternalStore(
    subscribeReduced,
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    () => false,
  );
}

function stepLabel(i: number) {
  return `STEP ${STEPS[i].number} · ${STEPS[i].title.toUpperCase()}`;
}

const HEADING = {
  tone: "leaf",
  eyebrow: "FROM FARM TO CRUNCH & POWDER",
  title: "Four steps. Precision dried.",
} as const;

type ReadoutRefs = {
  moisture: React.RefObject<HTMLSpanElement | null>;
  temp: React.RefObject<HTMLSpanElement | null>;
  hours: React.RefObject<HTMLSpanElement | null>;
};

/** 3-column drying readout. With refs, the numbers are driven by the timeline. */
function DryingReadout({
  values,
  refs,
}: {
  values: (typeof READOUT)["start"];
  refs?: ReadoutRefs;
}) {
  const cells = [
    { label: "Moisture", key: "moisture", unit: "%" },
    { label: "Air temp", key: "temp", unit: "°C" },
    { label: "Drying time", key: "hours", unit: " h" },
  ] as const;
  return (
    <div>
      <dl className="grid grid-cols-3 gap-3 border-t border-ink/15 pt-4 md:gap-6 md:pt-5">
        {cells.map((c) => (
          <div key={c.key}>
            <dt className="text-[11px] font-semibold tracking-[0.1em] text-ink-dim uppercase md:text-xs">
              {c.label}
            </dt>
            <dd className="mt-1 font-display text-[28px] leading-none font-extrabold tabular-nums md:text-[40px]">
              <span ref={refs?.[c.key]}>{values[c.key]}</span>
              <span className="text-[0.55em] font-bold text-brand-soft">{c.unit}</span>
            </dd>
          </div>
        ))}
      </dl>
      <p className="mt-2.5 text-[11px] text-ink-dim md:mt-3 md:text-xs">
        Illustrative values. Each product has its own drying recipe.
      </p>
    </div>
  );
}

/**
 * Process section as a pinned, scroll-scrubbed story (GSAP + ScrollTrigger):
 * the farm-to-powder scene animates through the 4 steps while the step text,
 * progress bars and drying readout follow. Reduced motion, or GSAP failing to
 * load, renders a static version: all steps listed, final readout and scene.
 */
export function ProcessStory() {
  const reduced = usePrefersReducedMotion();
  const [gsapFailed, setGsapFailed] = useState(false);
  const isStatic = reduced || gsapFailed;

  const [active, setActive] = useState(0);
  const pinRef = useRef<HTMLDivElement>(null);
  const barRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const readoutRefs: ReadoutRefs = {
    moisture: useRef<HTMLSpanElement>(null),
    temp: useRef<HTMLSpanElement>(null),
    hours: useRef<HTMLSpanElement>(null),
  };
  // Stable handle for the effect (the object above is rebuilt each render).
  const readoutRef = useRef(readoutRefs);

  useEffect(() => {
    if (isStatic) return;
    const scope = pinRef.current;
    if (!scope) return;
    let cancelled = false;
    let revert: (() => void) | undefined;

    Promise.all([import("gsap"), import("gsap/ScrollTrigger")])
      .then(([{ gsap }, { ScrollTrigger }]) => {
        if (cancelled) return;
        gsap.registerPlugin(ScrollTrigger);

        const ctx = gsap.context(() => {
          const pieces = gsap.utils.toArray<SVGGElement>(".piece");
          const toPouch = [pieces[0], pieces[1], pieces[4], pieces[5]];
          const toJar = [pieces[2], pieces[3]];
          const water = gsap.utils.toArray<SVGCircleElement>("#fp-water circle");
          const readout = readoutRef.current;
          const counter = { ...READOUT.start };

          gsap.set([".hop", ".piece", "#fp-pickTag", "#fp-stamp", "#fp-pouch", "#fp-jar"], {
            transformOrigin: "50% 50%",
          });

          const fillBars = (p: number) => {
            barRefs.current.forEach((bar, i) => {
              if (!bar) return;
              const f = gsap.utils.clamp(0, 1, p * STEPS.length - i);
              bar.style.transform = `scaleX(${f})`;
            });
          };

          // One unit of timeline per step (total 4), scrubbed over SCROLL_PX.
          const tl = gsap.timeline({
            defaults: { ease: "none" },
            scrollTrigger: {
              trigger: scope,
              start: "top top",
              end: `+=${SCROLL_PX}`,
              pin: true,
              scrub: 0.4,
              anticipatePin: 1,
              invalidateOnRefresh: true,
              onUpdate: (self) => {
                setActive(Math.min(STEPS.length - 1, Math.floor(self.progress * STEPS.length)));
                fillBars(self.progress);
              },
              onRefresh: (self) => fillBars(self.progress),
            },
          });

          // ── Step 1 · Handpicked: items hop one after another, tag pops in.
          tl.to(
            ".hop",
            {
              keyframes: [
                { y: -36, duration: 0.14, ease: "power2.out" },
                { y: 0, duration: 0.24, ease: "bounce.out" },
              ],
              stagger: 0.16,
            },
            0.05,
          );
          tl.fromTo(
            "#fp-pickTag",
            { autoAlpha: 0, scale: 0.4 },
            { autoAlpha: 1, scale: 1, duration: 0.14, ease: "back.out(2.5)" },
            0.74,
          );

          // ── Step 2 · Washed & Sliced
          tl.to("#fp-pickTag", { autoAlpha: 0, scale: 0.6, duration: 0.08 }, 1);
          tl.fromTo(water, { y: -50 }, { y: 150, duration: 0.34, stagger: 0.04, ease: "power1.in" }, 1.02);
          tl.fromTo(water, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.06, stagger: 0.04 }, 1.02);
          tl.to(water, { autoAlpha: 0, duration: 0.1, stagger: 0.04 }, 1.26);
          tl.to(".hop", { scale: 1.12, duration: 0.1, ease: "power1.out" }, 1.32);
          tl.to(".hop", { scale: 0, autoAlpha: 0, duration: 0.15, ease: "back.in(1.6)" }, 1.43);
          tl.to("#fp-crate", { y: 40, autoAlpha: 0, duration: 0.18, ease: "power1.in" }, 1.43);
          tl.fromTo(
            pieces,
            { autoAlpha: 0, scale: 0, x: 0, y: 0, rotation: 0, filter: "saturate(1) brightness(1)" },
            {
              autoAlpha: 1,
              scale: 1,
              x: (i) => PIECE_X[i],
              rotation: (i) => (i % 2 ? 8 : -8),
              filter: "saturate(1) brightness(1)",
              duration: 0.3,
              stagger: 0.03,
              ease: "back.out(2.2)",
            },
            1.58,
          );

          // ── Step 3 · Machine Dried: tray, heat waves, slices shrink + darken.
          tl.fromTo("#fp-tray", { autoAlpha: 0, y: 10 }, { autoAlpha: 1, y: 0, duration: 0.18 }, 2);
          tl.fromTo(".heat", { autoAlpha: 0, y: 20 }, { autoAlpha: 0.9, y: -8, duration: 0.2, stagger: 0.14 }, 2.1);
          tl.to(".heat", { autoAlpha: 0, y: -40, duration: 0.2, stagger: 0.14 }, 2.3);
          tl.to(
            pieces,
            { scale: 0.8, filter: "saturate(1.35) brightness(0.82)", duration: 0.6, ease: "power1.inOut" },
            2.2,
          );
          tl.to(
            counter,
            {
              ...READOUT.end,
              duration: 0.85,
              ease: "power1.inOut",
              onUpdate: () => {
                if (readout.moisture.current) readout.moisture.current.textContent = String(Math.round(counter.moisture));
                if (readout.temp.current) readout.temp.current.textContent = String(Math.round(counter.temp));
                if (readout.hours.current) readout.hours.current.textContent = String(Math.round(counter.hours));
              },
            },
            2.05,
          );

          // ── Step 4 · Packed Fresh: pouch + jar rise, slices fly in, powder fills.
          tl.to("#fp-tray", { autoAlpha: 0, duration: 0.12 }, 3);
          tl.fromTo("#fp-pouch", { autoAlpha: 0, y: 170 }, { autoAlpha: 1, y: 0, duration: 0.28, ease: "back.out(1.6)" }, 3.05);
          tl.fromTo("#fp-jar", { autoAlpha: 0, y: 170 }, { autoAlpha: 1, y: 0, duration: 0.28, ease: "back.out(1.6)" }, 3.12);
          tl.to(toPouch, { ...INTO_POUCH, scale: 0.2, autoAlpha: 0, rotation: "+=90", duration: 0.26, stagger: 0.04, ease: "power2.in" }, 3.38);
          tl.to(toJar, { ...INTO_JAR, scale: 0.2, autoAlpha: 0, rotation: "+=90", duration: 0.26, stagger: 0.05, ease: "power2.in" }, 3.4);
          tl.fromTo(
            "#fp-powder",
            { scaleY: 0, transformOrigin: "50% 100%" },
            { scaleY: 1, transformOrigin: "50% 100%", duration: 0.25, ease: "power1.out" },
            3.55,
          );
          tl.fromTo("#fp-puff", { autoAlpha: 0, y: 0 }, { autoAlpha: 1, y: -12, duration: 0.08 }, 3.66);
          tl.to("#fp-puff", { autoAlpha: 0, y: -34, duration: 0.16 }, 3.74);
          tl.fromTo(
            "#fp-stamp",
            { autoAlpha: 0, scale: 2.2, rotation: -30 },
            { autoAlpha: 1, scale: 1, rotation: -12, duration: 0.14, ease: "back.out(3)" },
            3.8,
          );
          tl.to({}, { duration: 0.06 }, 3.94); // pad to exactly 4 units
        }, scope);

        // Fonts / late images can shift layout: re-measure the pin.
        const refresh = () => ScrollTrigger.refresh();
        document.fonts?.ready.then(() => !cancelled && refresh());
        if (document.readyState !== "complete") window.addEventListener("load", refresh, { once: true });

        revert = () => {
          window.removeEventListener("load", refresh);
          ctx.revert();
        };
      })
      .catch(() => {
        if (!cancelled) setGsapFailed(true);
      });

    return () => {
      cancelled = true;
      revert?.();
    };
  }, [isStatic]);

  return (
    // The <section> stays put; GSAP pins (and wraps) only the inner div, so
    // React never has to remove a node GSAP has re-parented.
    <section
      id="tp-process"
      className="theme-dark overflow-x-clip bg-[color-mix(in_oklch,var(--color-brand-deep)_40%,var(--canvas))]"
    >
      <div
        ref={pinRef}
        className={cn(
          "relative",
          !isStatic && "flex h-svh min-h-[560px] items-center overflow-hidden",
        )}
      >
        {isStatic ? (
          <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 py-22.5 md:px-8 lg:grid-cols-2">
            <div>
              <SectionHeading {...HEADING} className="mb-10" />
              <ol className="mb-10 space-y-7">
                {STEPS.map((s, i) => (
                  <li key={s.number}>
                    <p className="mb-1.5 text-xs font-bold tracking-[0.12em] text-brand-soft">{stepLabel(i)}</p>
                    <h3 className="mb-1.5 font-display text-2xl font-bold">{s.title}</h3>
                    <p className="text-[15px] leading-[1.55] text-ink-muted">{s.body}</p>
                  </li>
                ))}
              </ol>
              <DryingReadout values={READOUT.end} />
            </div>
            <ProcessScene final className="mx-auto w-full max-w-[560px]" />
          </div>
        ) : (
          <>
            <div className="mx-auto grid w-full max-w-7xl items-center gap-5 px-6 pt-[76px] pb-12 md:px-8 lg:grid-cols-2 lg:gap-14 lg:pt-20">
              <div>
                <SectionHeading
                  {...HEADING}
                  className="mb-5 md:mb-9 max-lg:[@media(max-height:780px)]:hidden"
                />

                {/* One step at a time: all stacked in one grid cell so the
                    area keeps the tallest step's height; the active one fades
                    in sliding up 16px while the previous fades out. */}
                <div className="grid">
                  {STEPS.map((s, i) => (
                    <div
                      key={s.number}
                      aria-hidden={i !== active}
                      className={cn(
                        "[grid-area:1/1] transition-[opacity,translate] duration-400 ease-out",
                        i === active ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0",
                      )}
                    >
                      <p className="mb-1.5 text-xs font-bold tracking-[0.12em] text-brand-soft md:mb-2.5">
                        {stepLabel(i)}
                      </p>
                      <h3 className="mb-1.5 font-display text-[26px] leading-tight font-bold md:mb-2.5 md:text-[34px]">
                        {s.title}
                      </h3>
                      <p className="max-w-[480px] text-[15px] leading-[1.5] text-ink-muted md:text-[17px]">
                        {s.body}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Progress bars, filled by scroll */}
                <div className="my-4 grid grid-cols-4 gap-2 md:my-7" aria-hidden="true">
                  {STEPS.map((s, i) => (
                    <span key={s.number} className="h-1.5 overflow-hidden rounded-full bg-ink/15">
                      <span
                        ref={(el) => {
                          barRefs.current[i] = el;
                        }}
                        className="block h-full origin-left rounded-full bg-brand"
                        style={{ transform: "scaleX(0)" }}
                      />
                    </span>
                  ))}
                </div>

                <DryingReadout values={READOUT.start} refs={readoutRefs} />
              </div>

              <div className="flex justify-center max-lg:order-first">
                <ProcessScene className="size-[min(300px,34svh)] lg:size-[min(560px,70svh)]" />
              </div>
            </div>

            <p
              aria-hidden="true"
              className="absolute bottom-3 left-1/2 flex -translate-x-1/2 items-center gap-1.5 text-xs font-semibold tracking-[0.08em] text-ink-dim md:bottom-5"
            >
              keep scrolling
              <span className="inline-block animate-nudge">↓</span>
            </p>
          </>
        )}
      </div>
    </section>
  );
}
