import { Icon } from "@/components/icon";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { ContactForm } from "@/components/contact-form";
import { cn } from "@/lib/utils";

type Channel = {
  icon: string;
  tone: "brand" | "leaf";
  label: string;
  value: string;
  href?: string;
};

const CHANNELS: Channel[] = [
  {
    icon: "mail",
    tone: "brand",
    label: "Email",
    value: "sjamiiuc@gmail.com",
    href: "mailto:sjamiiuc@gmail.com",
  },
  {
    icon: "chat",
    tone: "leaf",
    label: "WhatsApp",
    value: "+880 1861 237066",
    href: "https://wa.me/8801861237066",
  },
  {
    icon: "schedule",
    tone: "brand",
    label: "Business Hours",
    value: "Mon–Fri, 9 AM – 6 PM (GMT+6)",
  },
];

const TONE = {
  brand: { badge: "bg-brand/[0.13] text-brand", hover: "hover:border-brand/40" },
  leaf: { badge: "bg-leaf/[0.13] text-leaf", hover: "hover:border-leaf/40" },
} as const;

function Channel({ icon, tone, label, value, href }: Channel) {
  const t = TONE[tone];
  const inner = (
    <>
      <span
        className={cn(
          "flex size-12 shrink-0 items-center justify-center rounded-[13px]",
          t.badge,
        )}
      >
        <Icon name={icon} className="text-[24px]" />
      </span>
      <div>
        <div className="text-[13px] text-ink-dim">{label}</div>
        <div className="text-[16px] font-semibold text-ink">{value}</div>
      </div>
    </>
  );

  const base =
    "flex items-center gap-4 rounded-[18px] border border-border bg-surface-2 p-[22px] transition-colors";

  return href ? (
    <a href={href} className={cn(base, t.hover)}>
      {inner}
    </a>
  ) : (
    <div className={base}>{inner}</div>
  );
}

export function Contact() {
  return (
    <section
      id="tp-contact"
      className="border-t border-border bg-surface"
    >
      <div className="mx-auto max-w-7xl px-6 py-22.5 md:px-8">
        <SectionHeading
          align="center"
          eyebrow="LET'S WORK TOGETHER"
          title="Sourcing, samples, or just curious?"
          className="mb-[54px]"
        />

        <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr]">
          <Reveal className="flex flex-col gap-[18px]">
            {CHANNELS.map((channel) => (
              <Channel key={channel.label} {...channel} />
            ))}
            <p className="rounded-[18px] border border-leaf/20 bg-leaf/[0.08] p-[22px] text-[15px] leading-[1.55] text-ink-soft italic">
              &ldquo;From a single inquiry to full export contracts — our team
              responds within 24 hours.&rdquo;
            </p>
          </Reveal>

          <Reveal>
            <ContactForm />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
