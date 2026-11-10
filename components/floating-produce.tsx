"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import {
  heroIllustrationSrc,
  type HeroIllustrationName,
} from "@/components/hero-illustration";
import { cn } from "@/lib/utils";

type Floater = {
  name: HeroIllustrationName;
  /** Parallax depth, -2.4…2.4. Sign flips the direction, size the speed. */
  depth: number;
  /** Proximity spin direction (+1 / -1). */
  spin: 1 | -1;
  /** Position + size utilities (phone first). Kept clear of the content column. */
  className: string;
  /** Idle bob phase offset, seconds. */
  delay: number;
};

// Laid out for the product detail page: a centred max-w-3xl column.
// Phone / tablet (column fills the screen): all 9 items alternate left/right
// down the full page, peeking in from the screen edges so they frame the
// content without covering text. lg+: spread down the side margins.
const FLOATERS: Floater[] = [
  { name: "pineapple-ring", depth: -2.2, spin: -1, delay: 0.8, className: "top-[2.5%] -right-3 size-[60px] md:size-[72px] lg:top-[5%] lg:right-[3%] lg:size-[88px]" },
  { name: "mango-slice", depth: 1.6, spin: 1, delay: 0, className: "top-[12%] -left-4 size-[56px] md:size-[68px] lg:top-[8%] lg:left-[3%] lg:size-[80px]" },
  { name: "moringa-sprig", depth: 1.1, spin: 1, delay: 3.2, className: "top-[23%] -right-5 size-[64px] md:size-[76px] lg:top-[30%] lg:right-auto lg:left-[6%] lg:size-[96px]" },
  { name: "garlic", depth: -0.9, spin: -1, delay: 1.2, className: "top-[34%] -left-4 size-[52px] md:size-[62px] lg:top-[52%] lg:left-[2.5%] lg:size-[60px]" },
  { name: "lime-slice", depth: 2.4, spin: 1, delay: 1.6, className: "top-[45%] -right-4 size-[52px] md:size-[62px] lg:top-[22%] lg:right-[6%] lg:size-[60px]" },
  { name: "tomato-slice", depth: -1.4, spin: -1, delay: 2.4, className: "top-[56%] -left-4 size-[54px] md:size-[64px] lg:top-[74%] lg:left-[4%] lg:size-[64px]" },
  { name: "powder-bowl", depth: -1.2, spin: 1, delay: 0.4, className: "top-[67%] -right-4 size-[56px] md:size-[66px] lg:top-[42%] lg:right-[3%] lg:size-[64px]" },
  { name: "pumpkin-slice", depth: 2, spin: 1, delay: 2, className: "top-[78%] -left-5 size-[64px] md:size-[76px] lg:top-[62%] lg:left-auto lg:right-[5%] lg:size-[84px]" },
  { name: "ginger", depth: -2.4, spin: -1, delay: 2.8, className: "top-[89%] -right-4 size-[56px] md:size-[66px] lg:top-[84%] lg:right-[3%] lg:size-[66px]" },
];

const PARALLAX_PX = 26;
const PUSH_RADIUS = 120;
const PUSH_PX = 40;
const SPIN_DEG = 20;
/** Scroll parallax: max drift (px) and turn (deg) as an item crosses the viewport. */
const SCROLL_PX = 34;
const SCROLL_DEG = 18;
/** Easing time constant (s); ~0.5s to settle. */
const TAU = 0.12;

type Motion = { x: number; y: number; r: number };

/**
 * Decorative fruit & veg floating behind page content. Render it as the first
 * child of a `relative isolate overflow-hidden` container and lift the content
 * above it with `relative z-10`; the container's pointer events drive it.
 * Each item idles with a CSS bob; on hover-capable pointers, pointermove
 * drives a parallax shift (per-item depth) plus a push-away + spin when the
 * cursor is within PUSH_RADIUS. Touch gets the push only (no parallax). On
 * every device, scrolling drifts and turns each item by its depth. All
 * JS motion is transform-only, eased in one rAF loop. Reduced motion: static.
 */
export function FloatingProduce() {
  const layerRef = useRef<HTMLDivElement>(null);
  const anchorRefs = useRef<(HTMLDivElement | null)[]>([]);
  const moverRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const layer = layerRef.current;
    const hero = layer?.parentElement;
    if (!hero) return;
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    const zero = () => FLOATERS.map(() => ({ x: 0, y: 0, r: 0 }));
    const current: Motion[] = zero();
    // Pointer (parallax + push) and scroll offsets are tracked separately and
    // summed, so scrolling keeps working while a finger or mouse is active.
    let target: Motion[] = zero();
    let scrolled: Motion[] = zero();
    let frame = 0;
    let last = 0;

    const step = (now: number) => {
      const dt = last ? Math.min((now - last) / 1000, 0.05) : 1 / 60;
      last = now;
      const k = 1 - Math.exp(-dt / TAU);
      let moving = false;
      current.forEach((c, i) => {
        const t = {
          x: target[i].x + scrolled[i].x,
          y: target[i].y + scrolled[i].y,
          r: target[i].r + scrolled[i].r,
        };
        c.x += (t.x - c.x) * k;
        c.y += (t.y - c.y) * k;
        c.r += (t.r - c.r) * k;
        if (Math.abs(t.x - c.x) > 0.1 || Math.abs(t.y - c.y) > 0.1 || Math.abs(t.r - c.r) > 0.1) {
          moving = true;
        }
        const el = moverRefs.current[i];
        if (el) el.style.transform = `translate3d(${c.x.toFixed(2)}px, ${c.y.toFixed(2)}px, 0) rotate(${c.r.toFixed(2)}deg)`;
      });
      if (moving) {
        frame = requestAnimationFrame(step);
      } else {
        frame = 0;
        last = 0;
      }
    };

    const kick = () => {
      if (!frame) frame = requestAnimationFrame(step);
    };

    /** Parallax (mouse only) + push-away from the pointer at (px, py). */
    const aim = (px: number, py: number, parallax: boolean) => {
      const box = hero.getBoundingClientRect();
      // Pointer offset from the hero centre, -1…1 on each axis.
      const ox = parallax ? (px - (box.left + box.width / 2)) / (box.width / 2) : 0;
      const oy = parallax ? (py - (box.top + box.height / 2)) / (box.height / 2) : 0;

      target = FLOATERS.map((f, i) => {
        const x = ox * f.depth * PARALLAX_PX;
        const y = oy * f.depth * PARALLAX_PX;
        // Anchors are never transformed, so their rect is the resting spot.
        const a = anchorRefs.current[i]?.getBoundingClientRect();
        if (!a || a.width === 0) return { x, y, r: 0 };
        // Compare against where the item currently is (rest + its offset).
        // Pointer offsets are measured from the scroll-shifted position.
        const dx = a.left + a.width / 2 + current[i].x - px;
        const dy = a.top + a.height / 2 + current[i].y - py;
        const d = Math.hypot(dx, dy);
        if (d >= PUSH_RADIUS) return { x, y, r: 0 };
        const s = 1 - d / PUSH_RADIUS;
        const ux = d > 0.5 ? dx / d : 0;
        const uy = d > 0.5 ? dy / d : -1;
        return { x: x + ux * s * PUSH_PX, y: y + uy * s * PUSH_PX, r: f.spin * s * SPIN_DEG };
      });
      kick();
    };

    const rest = () => {
      target = zero();
      kick();
    };

    // Scroll: each item drifts and turns as it travels through the viewport,
    // at its own depth — the main motion on touch screens, where there is no
    // hover. Offscreen items are skipped.
    const onScroll = () => {
      const vh = window.innerHeight;
      scrolled = FLOATERS.map((f, i) => {
        const a = anchorRefs.current[i]?.getBoundingClientRect();
        if (!a || a.width === 0 || a.bottom < -vh / 2 || a.top > vh * 1.5) {
          return scrolled[i] ?? { x: 0, y: 0, r: 0 };
        }
        // -1 (top of screen) … 1 (bottom), 0 at the centre.
        const rel = Math.max(-1.5, Math.min(1.5, (a.top + a.height / 2 - vh / 2) / (vh / 2)));
        return {
          x: 0,
          y: rel * (f.depth / 2.4) * SCROLL_PX,
          r: rel * f.spin * SCROLL_DEG,
        };
      });
      kick();
    };

    const onMouse = (e: PointerEvent) => {
      if (e.pointerType === "mouse") aim(e.clientX, e.clientY, true);
    };

    // Touch: a finger (tap, drag or a scroll starting on the hero) pushes
    // nearby items away. Passive touch events keep firing while the page
    // scrolls, unlike pointer events, and never block scrolling.
    const onTouch = (e: TouchEvent) => {
      const t = e.touches[0];
      if (t) aim(t.clientX, t.clientY, false);
    };

    const opts = { passive: true };
    onScroll();
    window.addEventListener("scroll", onScroll, opts);
    window.addEventListener("resize", onScroll, opts);
    if (fine) {
      hero.addEventListener("pointermove", onMouse);
      hero.addEventListener("pointerleave", rest);
    }
    hero.addEventListener("touchstart", onTouch, opts);
    hero.addEventListener("touchmove", onTouch, opts);
    hero.addEventListener("touchend", rest, opts);
    hero.addEventListener("touchcancel", rest, opts);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      hero.removeEventListener("pointermove", onMouse);
      hero.removeEventListener("pointerleave", rest);
      hero.removeEventListener("touchstart", onTouch);
      hero.removeEventListener("touchmove", onTouch);
      hero.removeEventListener("touchend", rest);
      hero.removeEventListener("touchcancel", rest);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div ref={layerRef} aria-hidden="true" className="pointer-events-none absolute inset-0 z-0">
      {FLOATERS.map((f, i) => (
        <div
          key={f.name}
          ref={(el) => {
            anchorRefs.current[i] = el;
          }}
          className={cn("absolute", f.className)}
        >
          <div
            ref={(el) => {
              moverRefs.current[i] = el;
            }}
            className="size-full will-change-transform"
          >
            <Image
              src={heroIllustrationSrc(f.name)}
              alt=""
              width={96}
              height={96}
              priority={i < 2}
              className="size-full animate-bob drop-shadow-[0_8px_10px_rgb(0_0_0/0.18)]"
              style={{ animationDelay: `-${f.delay}s` }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
