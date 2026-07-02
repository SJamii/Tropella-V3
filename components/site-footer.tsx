import Link from "next/link";
import { Icon } from "@/components/icon";
import { Logo } from "@/components/logo";

const FOOTER_NAV = {
  Navigation: [
    { label: "Store", href: "#tp-range" },
    { label: "Wholesale", href: "#tp-wholesale" },
    { label: "Process", href: "#tp-process" },
    { label: "About", href: "#tp-about" },
  ],
  Policies: [
    { label: "Privacy Policy", href: "#" },
    { label: "Terms of Service", href: "#" },
    { label: "Certifications", href: "#" },
    { label: "Sustainability", href: "#" },
  ],
} as const;

const SOCIALS = [
  { name: "photo_camera", label: "Instagram" },
  { name: "group", label: "Facebook" },
  { name: "chat", label: "WhatsApp" },
] as const;

export function SiteFooter() {
  return (
    <footer className="border-t border-white/[0.07] px-6 pt-[60px] pb-[34px] md:px-8">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-10 lg:grid-cols-[1.6fr_1fr_1fr_1fr]">
        {/* Brand */}
        <div className="col-span-2 lg:col-span-1">
          <Logo className="mb-4" />
          <p className="mb-[18px] max-w-[300px] text-[14.5px] leading-[1.6] text-ink-dim">
            Premium artisanal dried fruits, vegetables, and natural powders —
            handpicked and naturally processed for excellence.
          </p>
          <div className="flex gap-[11px]">
            {SOCIALS.map((social) => (
              <button
                key={social.name}
                type="button"
                aria-label={social.label}
                className="flex size-[38px] items-center justify-center rounded-[11px] border border-white/[0.08] bg-surface-2 text-ink-soft transition-colors hover:text-ink"
              >
                <Icon name={social.name} className="text-[19px]" />
              </button>
            ))}
          </div>
        </div>

        {/* Link columns */}
        {Object.entries(FOOTER_NAV).map(([heading, links]) => (
          <div key={heading}>
            <h5 className="mb-4 font-display text-[15px] font-bold">
              {heading}
            </h5>
            <div className="flex flex-col gap-[11px]">
              {links.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="text-[14.5px] text-ink-dim transition-colors hover:text-ink"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        ))}

        {/* Contact */}
        <div>
          <h5 className="mb-4 font-display text-[15px] font-bold">Contact</h5>
          <div className="flex flex-col gap-[11px] text-[14.5px]">
            <a
              href="mailto:hello@tropella.com"
              className="text-ink-dim transition-colors hover:text-ink"
            >
              hello@tropella.com
            </a>
            <a
              href="https://wa.me/1234567890"
              className="text-ink-dim transition-colors hover:text-ink"
            >
              +1 234 567 890
            </a>
            <span className="text-ink-dim">Mon–Fri, 9–6 (GMT+6)</span>
          </div>
        </div>
      </div>

      {/* Legal bar */}
      <div className="mx-auto mt-10 flex max-w-7xl flex-wrap items-center justify-between gap-4 border-t border-white/[0.07] pt-6">
        <span className="text-[13.5px] text-ink-faint">
          © 2026 Tropella Organic Atelier. Hand-picked tropical excellence.
        </span>
        <div className="flex gap-4 text-ink-faint">
          <Icon name="verified_user" className="text-[19px]" />
          <Icon name="eco" className="text-[19px]" />
          <Icon name="public" className="text-[19px]" />
        </div>
      </div>
    </footer>
  );
}
