import { Icon } from "@/components/icon";
import { Marquee } from "@/components/marquee";
import { cn } from "@/lib/utils";

const ITEMS = [
  { icon: "eco", label: "100% Natural", tone: "leaf" },
  { icon: "do_not_disturb_on", label: "No Added Sugar", tone: "brand" },
  { icon: "handshake", label: "Sustainable & Ethical", tone: "leaf" },
  { icon: "public", label: "Export Ready", tone: "brand" },
  { icon: "verified", label: "Certified Quality", tone: "leaf" },
  { icon: "local_shipping", label: "Worldwide Logistics", tone: "brand" },
] as const;

export function TrustMarquee() {
  return (
    <section className="border-y border-white/[0.07] py-[22px]">
      <Marquee>
        {ITEMS.map((item) => (
          <span
            key={item.label}
            className="inline-flex items-center gap-[11px] font-display text-[18px] font-semibold whitespace-nowrap text-ink-soft"
          >
            <Icon
              name={item.icon}
              className={cn(
                "text-[23px]",
                item.tone === "leaf" ? "text-leaf" : "text-brand",
              )}
            />
            {item.label}
          </span>
        ))}
      </Marquee>
    </section>
  );
}
