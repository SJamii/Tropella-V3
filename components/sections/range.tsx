import { Eyebrow } from "@/components/eyebrow";
import { Reveal } from "@/components/reveal";
import { ProductCard, type Product } from "@/components/product-card";

type RangeItem = Product & { span: string };

const PRODUCTS: RangeItem[] = [
  {
    featured: true,
    tone: "brand",
    href: "/products/dried-mango-slices",
    badge: "MOST LOVED · FRUIT",
    title: "Dried Mango Slices",
    description:
      "Naturally sweet, sun-ripened mango — slow-dried in tender slices.",
    tags: ["Fruit", "Slices"],
    image: "/mango-slices.jpg",
    placeholder: "Dried mango slices",
    span: "row-span-2 sm:col-span-2 lg:col-span-4",
  },
  {
    tone: "brand",
    href: "/products/dried-pineapple-slices",
    badge: "FRUIT",
    title: "Dried Pineapple Slices",
    description: "Tangy-sweet golden rings",
    tags: ["Fruit", "Slices"],
    image: "/Dried_pineapple_slices_original.png",
    placeholder: "Dried pineapple slices",
    span: "lg:col-span-2",
  },
  {
    tone: "brand",
    href: "/products/dried-lime-slices",
    badge: "FRUIT",
    title: "Dried Lime Slices",
    description: "Zesty, aromatic citrus slices",
    tags: ["Fruit", "Slices"],
    image: "/lime_slices.png",
    placeholder: "Dried lime slices",
    span: "lg:col-span-2",
  },
  {
    tone: "brand",
    href: "/products/sweetened-dried-mango",
    badge: "FRUIT",
    title: "Sweetened Dried Mango",
    description: "Soft, chewy, lightly sweetened slices",
    tags: ["Fruit", "Slices", "Sweetened"],
    image: "/dried_mango_flow.jpeg",
    placeholder: "Sweetened dried mango slices",
    span: "lg:col-span-3",
  },
  {
    tone: "brand",
    href: "/products/sweetened-dried-pineapple-slices",
    badge: "FRUIT",
    title: "Sweetened Dried Pineapple Slices",
    description: "Sugar-kissed golden rings, soft & chewy",
    tags: ["Fruit", "Slices", "Sweetened"],
    image: "/dried_sweet_pineapple_slices.jpeg",
    placeholder: "Sweetened dried pineapple slices",
    span: "lg:col-span-3",
  },
  {
    tone: "leaf",
    href: "/products/moringa-powder",
    badge: "VEGETABLE",
    title: "Moringa Powder",
    description: "Nutrient-dense superfood green",
    tags: ["Vegetable", "Powder"],
    image: "/moringa_powder.png",
    placeholder: "Moringa powder",
    span: "lg:col-span-2",
  },
  {
    tone: "leaf",
    href: "/products/tomato-powder",
    badge: "VEGETABLE",
    title: "Tomato Powder",
    description: "Rich umami depth for cooking",
    tags: ["Vegetable", "Powder"],
    image: "/tomato_powder.png",
    placeholder: "Tomato powder",
    span: "lg:col-span-2",
  },
  {
    tone: "leaf",
    href: "/products/garlic-powder",
    badge: "VEGETABLE",
    title: "Garlic Powder",
    description: "Pungent, savory flavor base",
    tags: ["Vegetable", "Powder"],
    image: "/garlic-powder.jpeg",
    placeholder: "Garlic powder",
    span: "lg:col-span-2",
  },
  {
    tone: "leaf",
    href: "/products/ginger-powder",
    badge: "VEGETABLE",
    title: "Ginger Powder",
    description: "Warm, zesty spice for drinks & cooking",
    tags: ["Vegetable", "Powder"],
    image: "/ginger_powder.png",
    placeholder: "Ginger powder",
    span: "lg:col-span-3",
  },
  {
    tone: "leaf",
    href: "/products/pumpkin-powder",
    badge: "VEGETABLE",
    title: "Pumpkin Powder",
    description: "Earthy-sweet golden color & flavor",
    tags: ["Vegetable", "Powder"],
    image: "/pumpkin_powder.png",
    placeholder: "Pumpkin powder",
    span: "sm:col-span-2 lg:col-span-3",
  },
  {
    tone: "brand",
    href: "/products/mango-peel-powder",
    badge: "FRUIT",
    title: "Mango Peel Powder",
    description: "Tangy, fruity powder from sun-dried peel",
    tags: ["Fruit", "Powder"],
    image: "/mango_peel_powder.jpeg",
    placeholder: "Mango peel powder",
    span: "lg:col-span-3",
  },
  {
    tone: "leaf",
    href: "/products/green-chili-powder",
    badge: "VEGETABLE",
    title: "Green Chili Powder",
    description: "Fresh, grassy heat in a fine green powder",
    tags: ["Vegetable", "Powder"],
    image: "/green_chili_powder.jpeg",
    placeholder: "Green chili powder",
    span: "lg:col-span-3",
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
          Twelve core products, each available retail-ready or in bulk for
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
