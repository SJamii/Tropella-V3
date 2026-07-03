import { Eyebrow } from "@/components/eyebrow";
import { Reveal } from "@/components/reveal";
import { ProductCard, type Product } from "@/components/product-card";

type RangeItem = Product & { span: string };

const PRODUCTS: RangeItem[] = [
  {
    featured: true,
    tone: "brand",
    href: "#tp-contact",
    badge: "MOST LOVED · FRUIT",
    title: "Dried Mango Slices",
    description:
      "Naturally sweet, sun-ripened mango — slow-dried in slices with zero added sugar.",
    tags: ["Fruit", "Slices", "No Added Sugar"],
    image: "/mango-slices.jpg",
    placeholder: "Dried mango slices",
    span: "row-span-2 sm:col-span-2 lg:col-span-4",
  },
  {
    tone: "brand",
    href: "#tp-contact",
    badge: "FRUIT",
    title: "Dried Pineapple Slices",
    description: "Tangy-sweet golden rings",
    tags: ["Fruit", "Slices"],
    image: "/pineapple-slices.jpeg",
    placeholder: "Dried pineapple slices",
    span: "lg:col-span-2",
  },
  {
    tone: "brand",
    href: "#tp-contact",
    badge: "FRUIT",
    title: "Dried Lime Slices",
    description: "Zesty, aromatic citrus slices",
    tags: ["Fruit", "Slices"],
    image: "/lime-slices.jpeg",
    placeholder: "Dried lime slices",
    span: "lg:col-span-2",
  },
  {
    tone: "leaf",
    href: "#tp-contact",
    badge: "VEGETABLE",
    title: "Moringa Powder",
    description: "Nutrient-dense superfood green",
    tags: ["Vegetable", "Powder"],
    image: "/moringa-powder.jpeg",
    placeholder: "Moringa powder",
    span: "lg:col-span-2",
  },
  {
    tone: "leaf",
    href: "#tp-contact",
    badge: "VEGETABLE",
    title: "Tomato Powder",
    description: "Rich umami depth for cooking",
    tags: ["Vegetable", "Powder"],
    image: "/tomato-powder.png",
    placeholder: "Tomato powder",
    span: "lg:col-span-2",
  },
  {
    tone: "leaf",
    href: "#tp-contact",
    badge: "VEGETABLE",
    title: "Garlic Powder",
    description: "Pungent, savory flavor base",
    tags: ["Vegetable", "Powder"],
    image: "/garlic-powder.jpeg",
    placeholder: "Garlic powder",
    span: "lg:col-span-2",
  },
];

export function Range() {
  return (
    <section id="tp-range" className="mx-auto max-w-7xl px-6 py-[70px] md:px-8">
      <Reveal className="mb-[42px] flex flex-wrap items-end justify-between gap-6">
        <div>
          <Eyebrow className="mb-3">EXPLORE OUR RANGE</Eyebrow>
          <h2 className="font-display text-[clamp(32px,4vw,52px)] leading-none font-extrabold tracking-[-0.03em]">
            A range as rich
            <br />
            as the tropics
          </h2>
        </div>
        <p className="max-w-[330px] text-[16px] leading-[1.55] text-ink-dim">
          Six core categories, each available retail-ready or in bulk for
          manufacturing.
        </p>
      </Reveal>

      <div className="grid auto-rows-[230px] grid-cols-1 gap-4 sm:grid-cols-2 lg:auto-rows-[244px] lg:grid-cols-6">
        {PRODUCTS.map(({ span, ...product }, i) => (
          <Reveal key={product.title} delay={Math.min(i * 90, 360)} className={span}>
            <ProductCard {...product} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}
