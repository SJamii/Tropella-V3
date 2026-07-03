import Image from "next/image";
import Link from "next/link";
import { Icon } from "@/components/icon";
import { ImagePlaceholder } from "@/components/image-placeholder";
import { cn } from "@/lib/utils";

export type Product = {
  tone: "brand" | "leaf";
  href: string;
  badge: string;
  title: string;
  description: string;
  tags: string[];
  /** Real product image (in /public). Falls back to a placeholder if absent. */
  image?: string;
  /** Placeholder caption + icon, used only when `image` is not set. */
  placeholder: string;
  iconName?: string;
  /** The large hero card (span 4×2). */
  featured?: boolean;
};

const TONE = {
  brand: {
    hoverBorder: "hover:border-brand/45",
    badgeText: "text-brand-soft",
    arrow: "border-brand/40 bg-brand/[0.16]",
    arrowIcon: "text-brand",
  },
  leaf: {
    hoverBorder: "hover:border-leaf/45",
    badgeText: "text-leaf-soft",
    arrow: "border-leaf/40 bg-leaf/[0.16]",
    arrowIcon: "text-leaf",
  },
} as const;

export function ProductCard({
  tone,
  href,
  badge,
  title,
  description,
  tags,
  image,
  placeholder,
  iconName = "image",
  featured = false,
}: Product) {
  const t = TONE[tone];

  return (
    <Link
      href={href}
      className={cn(
        "group relative block h-full overflow-hidden rounded-[24px] border border-white/[0.07] transition-[transform,box-shadow,border-color] duration-300 hover:-translate-y-[6px]",
        t.hoverBorder,
        featured
          ? "hover:shadow-[0_26px_56px_rgba(0,0,0,0.5)]"
          : "hover:shadow-[0_18px_42px_rgba(0,0,0,0.45)]",
      )}
    >
      {image ? (
        <Image
          src={image}
          alt={title}
          fill
          sizes={
            featured
              ? "(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 640px"
              : "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 320px"
          }
          className="object-cover"
        />
      ) : (
        <ImagePlaceholder
          label={placeholder}
          iconName={iconName}
          className="absolute inset-0 h-full w-full rounded-none border-0"
        />
      )}

      {/* Legibility gradient */}
      <div
        className={cn(
          "pointer-events-none absolute inset-0",
          featured
            ? "bg-[linear-gradient(to_top,rgba(18,15,10,0.94)_4%,rgba(18,15,10,0.5)_38%,transparent_68%)]"
            : "bg-[linear-gradient(to_top,rgba(18,15,10,0.92)_2%,rgba(18,15,10,0.35)_45%,transparent_72%)]",
        )}
      />

      {/* Category badge */}
      {featured ? (
        <span className="absolute top-[18px] left-[18px] inline-flex items-center gap-2 rounded-full border border-white/[0.18] bg-[rgba(18,15,10,0.55)] px-[13px] py-[7px] text-[12px] font-semibold tracking-[0.05em] text-brand-soft backdrop-blur-[6px]">
          <span className="size-[6px] rounded-full bg-brand" />
          {badge}
        </span>
      ) : (
        <span
          className={cn(
            "absolute top-[14px] left-[14px] rounded-full border border-white/[0.16] bg-[rgba(18,15,10,0.55)] px-[11px] py-[5px] text-[11px] font-bold tracking-[0.06em] backdrop-blur-[6px]",
            t.badgeText,
          )}
        >
          {badge}
        </span>
      )}

      {/* Content */}
      <div
        className={cn(
          "absolute inset-x-0 bottom-0 flex items-end justify-between",
          featured ? "gap-4 p-[30px]" : "gap-3 p-[20px]",
        )}
      >
        <div>
          {featured ? (
            <h3 className="mb-2 font-display text-[clamp(26px,3vw,34px)] font-extrabold tracking-[-0.02em]">
              {title}
            </h3>
          ) : (
            <h3 className="mb-1 font-display text-[20px] font-bold tracking-[-0.01em]">
              {title}
            </h3>
          )}

          <p
            className={cn(
              featured
                ? "max-w-[380px] text-[15.5px] leading-[1.5] text-ink-soft"
                : "text-[13px] leading-[1.4] text-ink-dim",
            )}
          >
            {description}
          </p>

          <div
            className={cn(
              "flex flex-wrap",
              featured ? "mt-[14px] gap-[7px]" : "mt-[10px] gap-[6px]",
            )}
          >
            {tags.map((tag) => (
              <span
                key={tag}
                className={cn(
                  "rounded-full border bg-white/10 font-semibold",
                  featured
                    ? "border-white/[0.18] px-3 py-[5px] text-[12px] text-ink"
                    : "border-white/[0.16] px-[9px] py-[3px] text-[10.5px] text-ink-soft",
                )}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Arrow */}
        {featured ? (
          <span className="flex size-[48px] shrink-0 items-center justify-center rounded-full bg-brand">
            <Icon name="arrow_outward" className="text-2xl text-canvas" />
          </span>
        ) : (
          <span
            className={cn(
              "flex size-[38px] shrink-0 items-center justify-center rounded-full border",
              t.arrow,
            )}
          >
            <Icon
              name="arrow_outward"
              className={cn("text-[19px]", t.arrowIcon)}
            />
          </span>
        )}
      </div>
    </Link>
  );
}
