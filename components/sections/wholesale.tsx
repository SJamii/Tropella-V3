import Image from "next/image";
import Link from "next/link";
import { Icon } from "@/components/icon";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { CountUp } from "@/components/count-up";
import { Button } from "@/components/ui/button";
import { WholesaleFeatures } from "@/components/sections/wholesale-features";
import { cn } from "@/lib/utils";

const CREDENTIALS = [
  { icon: "verified", label: "FSSC 22000 & Organic Certified", wide: false },
  { icon: "tune", label: "Low MOQs, scales to export volume", wide: false },
  {
    icon: "public",
    label: "Exporting to Europe, North America & East Asia",
    wide: true,
  },
];

const STATS = [
  { to: 3, suffix: "+", label: "Continents served" },
  { to: 25, suffix: "kg", label: "Max export pack size" },
  { to: 24, suffix: "h", label: "Inquiry response" },
];

export function Wholesale() {
  return (
    <section id="tp-wholesale" className="border-t border-white/6 bg-surface">
      <div className="mx-auto max-w-7xl px-6 py-22.5 md:px-8">
        {/* Intro: facility image (left) + copy (right) */}
        <div className="mb-[60px] grid items-stretch gap-10 lg:grid-cols-2 lg:gap-14">
          <Reveal className="order-2 h-full lg:order-1">
            <div className="relative h-full min-h-[440px] w-full overflow-hidden rounded-[26px]">
              <Image
                src="/global_supply_new.png"
                alt="Tropella industrial-scale dehydration facility"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          </Reveal>

          <Reveal className="order-1 lg:order-2">
            <SectionHeading
              tone="leaf"
              eyebrow="GLOBAL SUPPLY, LOCAL ROOTS"
              title={
                <>
                  Built for volume,
                  <br />
                  obsessed with quality
                </>
              }
              className="mb-5"
            />
            <p className="mb-[26px] text-[17px] leading-[1.6] text-ink-muted">
              We empower manufacturers and retailers worldwide with
              premium-grade tropical ingredients from an industrial-scale
              dehydration facility engineered for consistency.
            </p>

            <div className="grid grid-cols-2 gap-3">
              {CREDENTIALS.map((cred) => (
                <div
                  key={cred.label}
                  className={cn(
                    "rounded-2xl border border-white/8 bg-surface-2 p-[18px]",
                    cred.wide && "col-span-2",
                  )}
                >
                  <span className="inline-flex size-9 items-center justify-center rounded-xl border border-leaf/20 bg-leaf/[0.12]">
                    <Icon name={cred.icon} className="text-[18px] text-leaf" />
                  </span>
                  <p className="mt-3 text-[14px] leading-snug font-semibold text-ink">
                    {cred.label}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-7 grid grid-cols-3 gap-4 border-t border-white/8 pt-6 sm:flex sm:flex-wrap sm:gap-x-10 sm:gap-y-4">
              {STATS.map((stat, i) => (
                <div key={stat.label}>
                  <CountUp
                    to={stat.to}
                    suffix={stat.suffix}
                    delay={i * 140}
                    className="font-display text-[30px] leading-none font-extrabold text-leaf"
                  />
                  <div className="mt-1 text-[13px] text-ink-dim">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>

            <Button
              asChild
              variant="leaf"
              size="pillLg"
              className="mt-7 w-full sm:w-auto"
            >
              <Link href="#tp-contact">
                Request Catalog / Samples
                <Icon name="description" className="text-[19px]" />
              </Link>
            </Button>
          </Reveal>
        </div>

        {/* Capability tiles */}
        <WholesaleFeatures />
      </div>
    </section>
  );
}
