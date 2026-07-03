import { Icon } from "@/components/icon";
import { Reveal } from "@/components/reveal";
import { NewsletterForm } from "@/components/newsletter-form";

export function Newsletter() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-22.5 md:px-8">
      <Reveal>
        <div className="relative overflow-hidden rounded-[30px] border border-brand/20 bg-[linear-gradient(135deg,rgba(244,169,60,0.16),rgba(134,192,63,0.1))] px-6 py-14 text-center md:px-12 md:py-16">
          {/* Warm corner glow, matching the source design. */}
          <div
            aria-hidden
            className="pointer-events-none absolute -top-[60px] -left-10 h-60 w-60 rounded-full bg-[radial-gradient(circle,rgba(244,169,60,0.3),transparent_70%)]"
          />

          <div className="relative">
            <Icon name="wb_sunny" className="text-[40px] text-brand" />
            <h2 className="mt-[14px] mb-3 font-display text-[clamp(28px,3.6vw,44px)] font-extrabold tracking-[-0.03em]">
              Sunshine in your mailbox
            </h2>
            <p className="mx-auto mb-7 max-w-[480px] text-[17px] leading-[1.55] text-ink-soft">
              Seasonal harvests, new powder launches, and exclusive offers —
              delivered weekly.
            </p>
            <NewsletterForm />
          </div>
        </div>
      </Reveal>
    </section>
  );
}
