"use client";

import { useRef, useState } from "react";
import { flushSync } from "react-dom";
import Image from "next/image";
import { Dialog as DialogPrimitive } from "radix-ui";
import { Icon } from "@/components/icon";
import type { ProductImage } from "@/lib/products";
import { cn } from "@/lib/utils";

type ProductGalleryProps = {
  images: ProductImage[];
  tone: "brand" | "leaf";
  /** Portrait (3:4) frame for gallery photos; landscape (4:3) otherwise. */
  portrait: boolean;
  /** Product name, used in the full-screen viewer's accessible title. */
  title: string;
};

const TONE = {
  brand: {
    frame: "border-brand/40",
    active: "border-brand",
    solid: "hover:bg-primary hover:text-primary-foreground",
  },
  leaf: {
    frame: "border-leaf/40",
    active: "border-leaf",
    solid: "hover:bg-secondary hover:text-secondary-foreground",
  },
} as const;

const EASE = "cubic-bezier(.77,0,.18,1)";
const VT_NAME = "tp-product-photo";
const SWIPE_PX = 40;

const pad = (n: number) => String(n).padStart(2, "0");
const motionOK = () =>
  !window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/** Glass chip / round button shared by the frame and the viewer. */
const glass =
  "border border-border bg-canvas/60 text-ink backdrop-blur-md";
const roundBtn = cn(
  glass,
  "grid size-11 shrink-0 cursor-pointer place-items-center rounded-full transition-[background-color,color,scale,opacity] duration-200 hover:scale-105",
);

/** Records a touch/pen swipe; returns whether the gesture was a swipe. */
function useSwipe(onSwipe: (dir: 1 | -1) => void) {
  const x0 = useRef<number | null>(null);
  const swiped = useRef(false);
  return {
    swiped,
    handlers: {
      onPointerDown: (e: React.PointerEvent) => {
        swiped.current = false;
        if (e.pointerType !== "mouse") x0.current = e.clientX;
      },
      onPointerUp: (e: React.PointerEvent) => {
        if (x0.current === null) return;
        const dx = e.clientX - x0.current;
        x0.current = null;
        if (Math.abs(dx) > SWIPE_PX) {
          swiped.current = true;
          onSwipe(dx < 0 ? 1 : -1);
        }
      },
      onPointerCancel: () => {
        x0.current = null;
      },
    },
  };
}

/**
 * Spotlight product gallery: a large photo with a thumbnail rail, a directional
 * wipe between photos, progress bars, hover-zoom (fine pointers), swipe
 * (touch) and arrow keys. Clicking the photo opens a full-screen viewer that
 * grows out of the frame (View Transitions, where supported).
 */
export function ProductGallery({
  images,
  tone,
  portrait,
  title,
}: ProductGalleryProps) {
  const t = TONE[tone];
  const count = images.length;
  const multi = count > 1;

  const [index, setIndex] = useState(0);
  const [prev, setPrev] = useState<number | null>(null);
  const [open, setOpen] = useState(false);
  /** Which element currently carries the view-transition name. */
  const [vt, setVt] = useState<"frame" | "viewer" | null>(null);
  const [zooming, setZooming] = useState(false);

  const slides = useRef<(HTMLDivElement | null)[]>([]);
  const zoomLayer = useRef<HTMLDivElement>(null);
  const viewerPhoto = useRef<HTMLDivElement>(null);

  /** Spotlight: wipe the next photo in from the side it travels from. */
  function go(target: number, dir?: 1 | -1) {
    const next = (target + count) % count;
    if (next === index) return;
    const d = dir ?? (next > index ? 1 : -1);
    if (motionOK()) {
      slides.current[next]?.animate(
        [
          {
            clipPath: d > 0 ? "inset(0 0 0 100%)" : "inset(0 100% 0 0)",
            transform: "scale(1.15)",
          },
          { clipPath: "inset(0 0 0 0%)", transform: "scale(1)" },
        ],
        { duration: 800, easing: EASE },
      );
      slides.current[index]?.animate(
        [
          { transform: "scale(1)", filter: "brightness(1)" },
          { transform: "scale(.92)", filter: "brightness(.45)" },
        ],
        { duration: 800, easing: EASE },
      );
    }
    setPrev(index);
    setIndex(next);
  }

  /** Viewer: slide the new photo in; the frame behind follows silently. */
  function view(target: number, dir: 1 | -1) {
    const next = (target + count) % count;
    if (next === index) return;
    setPrev(null);
    setIndex(next);
    if (motionOK()) {
      viewerPhoto.current?.animate(
        [
          { transform: `translateX(${dir * 60}px) scale(.96)`, opacity: 0 },
          { transform: "none", opacity: 1 },
        ],
        { duration: 420, easing: "cubic-bezier(.2,.8,.2,1)" },
      );
    }
  }

  function toggleViewer(next: boolean) {
    setZooming(false);
    if (!document.startViewTransition || !motionOK()) {
      setOpen(next);
      return;
    }
    flushSync(() => setVt(next ? "frame" : "viewer"));
    document
      .startViewTransition(() => {
        flushSync(() => {
          setVt(next ? "viewer" : "frame");
          setOpen(next);
        });
      })
      .finished.finally(() => setVt(null));
  }

  const frameSwipe = useSwipe((d) => go(index + d, d));
  const viewerSwipe = useSwipe((d) => view(index + d, d));

  function onArrow(
    e: React.KeyboardEvent,
    fn: (target: number, dir: 1 | -1) => void,
  ) {
    if (!multi) return;
    if (e.key === "ArrowRight") fn(index + 1, 1);
    if (e.key === "ArrowLeft") fn(index - 1, -1);
  }

  return (
    <div
      onKeyDown={(e) => onArrow(e, go)}
      className={cn(
        "grid gap-2.5",
        multi && "sm:grid-cols-[76px_minmax(0,1fr)] sm:gap-3.5",
      )}
    >
      {/* Main frame */}
      <div
        {...frameSwipe.handlers}
        onClick={(e) => {
          if (frameSwipe.swiped.current) return;
          if ((e.target as HTMLElement).closest("button")) return;
          toggleViewer(true);
        }}
        onPointerMove={(e) => {
          // Hover-zoom is for mouse users; touch taps open the viewer.
          if (e.pointerType !== "mouse") return;
          const onButton = !!(e.target as HTMLElement).closest("button");
          setZooming(!onButton);
          const r = e.currentTarget.getBoundingClientRect();
          if (zoomLayer.current) {
            zoomLayer.current.style.transformOrigin = `${((e.clientX - r.left) / r.width) * 100}% ${((e.clientY - r.top) / r.height) * 100}%`;
          }
        }}
        onPointerLeave={() => setZooming(false)}
        className={cn(
          "relative max-w-full touch-pan-y overflow-hidden rounded-3xl border-2 bg-surface-2",
          portrait ? "aspect-3/4" : "aspect-4/3",
          zooming ? "cursor-zoom-in" : "cursor-pointer",
          multi && "sm:order-2",
          t.frame,
        )}
      >
        <div
          ref={zoomLayer}
          className={cn(
            "absolute inset-0 transition-transform duration-500 ease-[cubic-bezier(.2,.8,.2,1)]",
            zooming && "scale-[2.2]",
          )}
        >
          {images.map((img, i) => (
            <div
              key={img.src}
              ref={(el) => {
                slides.current[i] = el;
              }}
              aria-hidden={i !== index}
              className={cn(
                "absolute inset-0",
                i === index ? "z-20" : i === prev ? "z-10" : "z-0",
              )}
              style={
                i === index && vt === "frame"
                  ? { viewTransitionName: VT_NAME }
                  : undefined
              }
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                preload={i === 0}
                sizes="(max-width: 1024px) 100vw, 600px"
                className="object-cover"
              />
            </div>
          ))}
        </div>

        {multi && (
          <>
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-3.5 top-3.5 z-30 flex gap-1.5"
            >
              {images.map((img, i) => (
                <span
                  key={img.src}
                  className="h-[3px] flex-1 overflow-hidden rounded-full bg-ink/30"
                >
                  <span
                    className={cn(
                      "block h-full origin-left bg-ink transition-transform duration-600 ease-[cubic-bezier(.2,.8,.2,1)]",
                      i <= index ? "scale-x-100" : "scale-x-0",
                    )}
                  />
                </span>
              ))}
            </div>
            <button
              type="button"
              aria-label="Previous photo"
              onClick={() => go(index - 1, -1)}
              className={cn(
                roundBtn,
                t.solid,
                "absolute top-1/2 left-3 z-30 -translate-y-1/2",
                zooming && "opacity-0",
              )}
            >
              <Icon name="chevron_left" className="text-[24px]" />
            </button>
            <button
              type="button"
              aria-label="Next photo"
              onClick={() => go(index + 1, 1)}
              className={cn(
                roundBtn,
                t.solid,
                "absolute top-1/2 right-3 z-30 -translate-y-1/2",
                zooming && "opacity-0",
              )}
            >
              <Icon name="chevron_right" className="text-[24px]" />
            </button>
            <span
              aria-live="polite"
              className={cn(
                glass,
                "absolute bottom-3.5 left-3.5 z-30 rounded-full px-3 py-1.5 font-display text-[13px] font-semibold tabular-nums transition-opacity",
                zooming && "opacity-0",
              )}
            >
              <span className="sr-only">Photo </span>
              {pad(index + 1)} / {pad(count)}
            </span>
          </>
        )}

        <button
          type="button"
          onClick={() => toggleViewer(true)}
          className={cn(
            glass,
            "absolute right-3.5 bottom-3.5 z-30 inline-flex min-h-11 cursor-pointer items-center gap-1.5 rounded-full px-3.5 text-[13px] font-semibold transition-opacity",
            zooming && "opacity-0",
          )}
        >
          <Icon name="open_in_full" className="text-[16px]" />
          <span className="sr-only sm:not-sr-only">View full screen</span>
          <span className="sm:hidden" aria-hidden="true">
            Expand
          </span>
        </button>
      </div>

      {/* Thumbnails: row under the frame on phones, rail to its left from sm. */}
      {multi && (
        <div
          role="group"
          aria-label="Choose photo"
          className="grid grid-cols-4 gap-2 sm:order-1 sm:grid-cols-1 sm:content-start sm:gap-2.5"
        >
          {images.map((img, i) => (
            <Thumb
              key={img.src}
              img={img}
              n={i + 1}
              active={i === index}
              activeClass={t.active}
              onSelect={() => go(i)}
            />
          ))}
        </div>
      )}

      {/* Full-screen viewer */}
      <DialogPrimitive.Root open={open} onOpenChange={toggleViewer}>
        <DialogPrimitive.Portal>
          <DialogPrimitive.Content
            aria-describedby={undefined}
            onKeyDown={(e) => {
              // Portal events still bubble through React to the gallery root.
              e.stopPropagation();
              onArrow(e, view);
            }}
            className="fixed inset-0 z-50 grid grid-rows-[auto_minmax(0,1fr)_auto] gap-3 bg-canvas/95 p-4 backdrop-blur-md outline-none sm:p-6"
          >
            <DialogPrimitive.Title className="sr-only">
              {title} photos
            </DialogPrimitive.Title>

            <div className="flex items-center justify-between">
              <span
                aria-live="polite"
                className="font-display text-[15px] font-semibold text-ink tabular-nums"
              >
                {multi ? `${index + 1} / ${count}` : ""}
              </span>
              <DialogPrimitive.Close
                aria-label="Close"
                className={cn(roundBtn, t.solid)}
              >
                <Icon name="close" className="text-[22px]" />
              </DialogPrimitive.Close>
            </div>

            <div
              {...viewerSwipe.handlers}
              onClick={(e) => {
                if (e.target === e.currentTarget) toggleViewer(false);
              }}
              className="relative grid min-h-0 touch-pan-y place-items-center"
            >
              <div
                ref={viewerPhoto}
                className={cn(
                  "relative max-h-full max-w-full overflow-hidden rounded-3xl",
                  portrait ? "aspect-3/4 h-full" : "aspect-4/3 w-full",
                )}
                style={vt === "viewer" ? { viewTransitionName: VT_NAME } : undefined}
              >
                <Image
                  src={images[index].src}
                  alt={images[index].alt}
                  fill
                  sizes="100vw"
                  className="object-contain"
                />
              </div>

              {multi && (
                <>
                  <button
                    type="button"
                    aria-label="Previous photo"
                    onClick={() => view(index - 1, -1)}
                    className={cn(roundBtn, t.solid, "absolute top-1/2 left-0 -translate-y-1/2")}
                  >
                    <Icon name="chevron_left" className="text-[24px]" />
                  </button>
                  <button
                    type="button"
                    aria-label="Next photo"
                    onClick={() => view(index + 1, 1)}
                    className={cn(roundBtn, t.solid, "absolute top-1/2 right-0 -translate-y-1/2")}
                  >
                    <Icon name="chevron_right" className="text-[24px]" />
                  </button>
                </>
              )}
            </div>

            {multi && (
              <div
                role="group"
                aria-label="Choose photo"
                className="flex justify-center gap-2"
              >
                {images.map((img, i) => (
                  <Thumb
                    key={img.src}
                    img={img}
                    n={i + 1}
                    active={i === index}
                    activeClass={t.active}
                    onSelect={() => view(i, i > index ? 1 : -1)}
                    className="w-13"
                  />
                ))}
              </div>
            )}
          </DialogPrimitive.Content>
        </DialogPrimitive.Portal>
      </DialogPrimitive.Root>
    </div>
  );
}

function Thumb({
  img,
  n,
  active,
  activeClass,
  onSelect,
  className,
}: {
  img: ProductImage;
  n: number;
  active: boolean;
  activeClass: string;
  onSelect: () => void;
  className?: string;
}) {
  return (
    <button
      type="button"
      aria-label={`Show photo ${n}`}
      aria-current={active}
      onClick={onSelect}
      className={cn(
        "group/thumb relative aspect-3/4 cursor-pointer overflow-hidden rounded-[14px] border-2 bg-surface-2 transition-[border-color,translate] duration-300",
        active ? cn(activeClass, "-translate-y-0.5") : "border-transparent",
        className,
      )}
    >
      <Image
        src={img.src}
        alt=""
        fill
        sizes="80px"
        className={cn(
          "object-cover transition-opacity duration-200",
          active ? "opacity-100" : "opacity-50 group-hover/thumb:opacity-85",
        )}
      />
    </button>
  );
}
