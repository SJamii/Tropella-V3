import Image from "next/image";
import Link from "next/link";
import { Icon } from "@/components/icon";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";

export function About() {
  return (
    <section
      id="tp-about"
      className="mx-auto max-w-7xl px-6 py-22.5 md:px-8"
    >
      <div className="grid items-center gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14">
        <Reveal className="order-2 lg:order-1">
          <div className="relative h-[480px] w-full overflow-hidden rounded-[26px]">
            <Image
              src="/global_supply.jpeg"
              alt="Lush tropical farm where Tropella sources its fruit"
              fill
              sizes="(max-width: 1024px) 100vw, 45vw"
              className="object-cover"
            />
          </div>
        </Reveal>

        <Reveal className="order-1 lg:order-2">
          <SectionHeading
            eyebrow="OUR JOURNEY"
            title={
              <>
                Where sunshine
                <br />
                meets soil
              </>
            }
            className="mb-[22px]"
          />
          <p className="mb-[18px] text-[17px] leading-[1.65] text-ink-muted">
            Tropella began with a simple observation: the incredible flavor of
            tree-ripened tropical fruit was so often lost in industrial
            processing. We wanted to capture that peak-season sweetness in its
            purest form.
          </p>
          <p className="mb-[28px] text-[17px] leading-[1.65] text-ink-muted">
            We work directly with small-scale farmers who treat their land with
            respect. Through innovative low-temperature drying, we preserve the
            vibrant colors and essential vitamins that make tropical fruit — and
            moringa and other superfoods — nature&rsquo;s ultimate gift.
          </p>
          <Link
            href="#tp-contact"
            className="inline-flex items-center gap-2 text-[16px] font-semibold text-brand"
          >
            Learn more about us
            <Icon name="arrow_right_alt" className="text-[19px]" />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
