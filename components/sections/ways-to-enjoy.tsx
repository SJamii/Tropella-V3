import Image from "next/image";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { ImagePlaceholder } from "@/components/image-placeholder";
import { cn } from "@/lib/utils";

type EnjoyTile = {
  title: string;
  /** ImagePlaceholder caption (design's slot label) — shown when `image` is absent. */
  placeholder: string;
  iconName: string;
  /** Real image in /public; falls back to the placeholder if omitted. */
  image?: string;
  /** Responsive grid span — mobile packs into 2 cols, desktop into the 4-col bento. */
  span?: string;
  /** The design uses a larger overlay label on the feature/wide tiles. */
  large?: boolean;
};

const TILES: EnjoyTile[] = [
  {
    title: "Smoothie Bowls",
    placeholder: "Smoothie bowls",
    iconName: "blender",
    image: "/lifestyle-smoothie.jpg",
    span: "col-span-2 lg:col-span-1 lg:row-span-2",
    large: true,
  },
  {
    title: "Yogurt Topping",
    placeholder: "Yogurt topping",
    iconName: "icecream",
    image: "/yogurt.jpg",
  },
  {
    title: "Trail Mix & Snacking",
    placeholder: "Trail mix & snacking",
    iconName: "nutrition",
    image: "/potato_chips.jpeg",
    span: "lg:col-span-2",
    large: true,
  },
  {
    title: "Baking & Dessert",
    placeholder: "Baking & dessert",
    iconName: "cake",
    image: "/jackfruit.jpeg",
    span: "col-span-2",
    large: true,
  },
  {
    title: "Cereal & Granola",
    placeholder: "Cereal & granola",
    iconName: "breakfast_dining",
    image: "/cereal.jpg",
  },
  {
    title: "Gift Boxes",
    placeholder: "Gift boxes",
    iconName: "redeem",
    image: "/gift-boxes.jpg",
    span: "lg:col-span-2",
  },
  {
    title: "Supplements",
    placeholder: "Health supplements",
    iconName: "medication",
    image: "/health_suppliment.jpeg",
    span: "col-span-2",
  },
];

export function WaysToEnjoy() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-22.5 md:px-8">
      <Reveal className="mb-[42px]">
        <SectionHeading
          eyebrow="A THOUSAND WAYS TO ENJOY"
          title="However you use it"
        />
      </Reveal>

      <div className="grid auto-rows-[150px] grid-cols-2 gap-4 lg:auto-rows-[200px] lg:grid-cols-4">
        {TILES.map(({ title, placeholder, iconName, image, span, large }, i) => (
          <Reveal
            key={title}
            delay={Math.min(i * 70, 350)}
            className={cn(
              "group relative overflow-hidden rounded-[20px]",
              span,
            )}
          >
            {image ? (
              <Image
                src={image}
                alt={title}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                className="object-cover"
              />
            ) : (
              <ImagePlaceholder
                label={placeholder}
                iconName={iconName}
                className="absolute inset-0 h-full w-full rounded-none border-0"
              />
            )}
            <div
              className={cn(
                "pointer-events-none absolute inset-0 flex items-end bg-[linear-gradient(to_top,rgba(20,17,12,0.85),transparent_55%)]",
                large ? "p-5" : "p-[18px]",
              )}
            >
              <span
                className={cn(
                  "font-display font-bold tracking-[-0.01em] text-ink",
                  large ? "text-[19px]" : "text-[17px]",
                )}
              >
                {title}
              </span>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
