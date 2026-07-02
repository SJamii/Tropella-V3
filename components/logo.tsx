import Link from "next/link";
import { Icon } from "@/components/icon";
import { cn } from "@/lib/utils";

/**
 * Tropella wordmark — gradient "spa" mark + name. Used in the header and
 * footer. Links to the top of the page by default.
 */
export function Logo({
  href = "#tp-top",
  className,
}: {
  href?: string;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={cn("flex items-center gap-[11px] text-ink", className)}
    >
      <span className="flex size-[34px] items-center justify-center rounded-[11px] bg-linear-to-br from-brand to-brand-deep">
        <Icon name="spa" className="text-[21px] text-canvas" />
      </span>
      <span className="font-display text-[23px] font-bold tracking-[-0.02em]">
        Tropella
      </span>
    </Link>
  );
}
