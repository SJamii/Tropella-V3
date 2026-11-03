import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Eyebrow } from "@/components/eyebrow";
import { GoodToKnow } from "@/components/good-to-know";
import { Icon } from "@/components/icon";
import { Reveal } from "@/components/reveal";
import { Button } from "@/components/ui/button";
import { PRODUCT_DETAILS, getProduct } from "@/lib/products";
import { cn } from "@/lib/utils";

// Only the slugs listed in PRODUCT_DETAILS exist; anything else 404s.
export const dynamicParams = false;

export function generateStaticParams() {
  return PRODUCT_DETAILS.map(({ slug }) => ({ slug }));
}

export async function generateMetadata(
  props: PageProps<"/products/[slug]">,
): Promise<Metadata> {
  const { slug } = await props.params;
  const product = getProduct(slug);
  if (!product) return {};

  return {
    title: product.title,
    description: product.tagline,
    alternates: { canonical: `/products/${product.slug}` },
    openGraph: {
      title: product.title,
      description: product.tagline,
      images: [{ url: product.image, alt: product.imageAlt }],
    },
  };
}

const TONE = {
  brand: {
    frame: "border-brand/40",
    tag: "border-brand/35 bg-brand/[0.14] text-brand-soft",
  },
  leaf: {
    frame: "border-leaf/40",
    tag: "border-leaf/35 bg-leaf/[0.14] text-leaf-soft",
  },
} as const;

export default async function ProductPage(
  props: PageProps<"/products/[slug]">,
) {
  const { slug } = await props.params;
  const product = getProduct(slug);
  if (!product) notFound();

  const t = TONE[product.tone];

  return (
    <main
      id="tp-main"
      className="mx-auto max-w-3xl px-6 pt-28 pb-16 md:px-8 md:pt-36 md:pb-[90px]"
    >
      <Link
        href="/#tp-range"
        className="mb-6 inline-flex min-h-11 items-center gap-2 text-[15px] font-medium text-ink-soft transition-colors hover:text-ink"
      >
        <Icon name="arrow_back" className="text-[20px]" />
        Back to range
      </Link>

      <Reveal>
        <div
          className={cn(
            "relative aspect-4/3 overflow-hidden rounded-3xl border-2 bg-surface-2",
            t.frame,
          )}
        >
          <Image
            src={product.image}
            alt={product.imageAlt}
            fill
            priority
            sizes="(max-width: 768px) 100vw, 768px"
            className="object-cover"
          />
        </div>
      </Reveal>

      <Reveal className="mt-8">
        <Eyebrow tone={product.tone} className="mb-3">
          {product.badge}
        </Eyebrow>
        <h1 className="font-display text-[clamp(34px,5vw,52px)] leading-[1.02] font-extrabold tracking-[-0.03em] text-ink">
          {product.title}
        </h1>
        <p className="mt-3 text-[17px] leading-[1.5] text-ink-soft">
          {product.tagline}
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          {product.tags.map((tag) => (
            <span
              key={tag}
              className={cn(
                "rounded-full border px-3 py-[5px] text-[12px] font-semibold",
                t.tag,
              )}
            >
              {tag}
            </span>
          ))}
        </div>
        <p className="mt-6 text-[16px] leading-[1.65] text-ink-muted">
          {product.description}
        </p>
      </Reveal>

      <Reveal className="mt-10">
        <GoodToKnow
          tone={product.tone}
          usage={product.usage}
          benefits={product.benefits}
          tip={product.tip}
        />
      </Reveal>

      <Reveal className="mt-10 grid gap-4 md:grid-cols-2">
        <div className="flex flex-col rounded-3xl border border-border bg-surface p-6">
          <Eyebrow className="mb-3">FOR YOUR TABLE</Eyebrow>
          <p className="mb-6 flex-1 text-[15px] leading-[1.55] text-ink-muted">
            Retail-ready packs for everyday snacking and home cooking.
          </p>
          <Button asChild variant="brand" size="pill" className="min-h-11 self-start">
            <Link href="/#tp-contact">
              Enquire to order
              <Icon name="arrow_forward" className="text-[18px]" />
            </Link>
          </Button>
        </div>
        <div className="flex flex-col rounded-3xl border border-border bg-surface p-6">
          <Eyebrow tone="leaf" className="mb-3">
            FOR YOUR FACTORY
          </Eyebrow>
          <p className="mb-6 flex-1 text-[15px] leading-[1.55] text-ink-muted">
            Bulk or private-label supply for manufacturers, retailers and
            exporters.
          </p>
          <Button asChild variant="leaf" size="pill" className="min-h-11 self-start">
            <Link href="/#tp-contact">
              Request a quote
              <Icon name="arrow_forward" className="text-[18px]" />
            </Link>
          </Button>
        </div>
      </Reveal>
    </main>
  );
}
