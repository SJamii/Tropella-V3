"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Icon } from "@/components/icon";
import { Logo } from "@/components/logo";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { label: "Store", href: "#tp-range" },
  { label: "Wholesale", href: "#tp-wholesale" },
  { label: "Process", href: "#tp-process" },
  { label: "About", href: "#tp-about" },
  { label: "Contact", href: "#tp-contact" },
] as const;

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  // Sticky nav gains a blurred background once the user scrolls past 30px.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 border-b transition-[background-color,backdrop-filter,border-color] duration-300",
        scrolled
          ? "border-white/10 bg-canvas/85 backdrop-blur-[14px]"
          : "border-transparent bg-transparent",
      )}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-6 py-[18px] md:px-8">
        <Logo />

        <nav className="hidden items-center gap-[30px] lg:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-[15px] font-medium text-ink-soft transition-colors hover:text-ink"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-[14px]">
          <button
            type="button"
            aria-label="Cart"
            className="text-ink-soft transition-colors hover:text-ink"
          >
            <Icon name="shopping_basket" className="text-[22px]" />
          </button>

          <Button
            asChild
            variant="brand"
            size="pill"
            className="hidden sm:inline-flex"
          >
            <Link href="#tp-contact">Request Samples</Link>
          </Button>

          <button
            type="button"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((v) => !v)}
            className="text-ink lg:hidden"
          >
            <Icon name={menuOpen ? "close" : "menu"} className="text-[26px]" />
          </button>
        </div>
      </div>

      {/* Mobile dropdown menu */}
      {menuOpen && (
        <div className="border-t border-white/[0.07] bg-surface px-6 pt-2 pb-[22px] lg:hidden">
          <div className="flex flex-col">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="px-1 py-3 text-[17px] font-medium text-ink/90 transition-colors hover:text-ink"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
