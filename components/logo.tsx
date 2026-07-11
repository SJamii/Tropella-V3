import Link from "next/link";
import { cn } from "@/lib/utils";

/**
 * Tropella wordmark — /public/logo-transparent.png, a transparent-background
 * export of the "Tropella" wordmark. Generated from logo.jpeg by flood-filling
 * out the white background and stripping the leaf/berry mark and the black
 * tagline, so it blends with either theme. Intrinsic size 988×256 (≈247/64);
 * `bg-contain` fits it to the box height with the aspect ratio held constant.
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
      aria-label="Tropella — home"
      className={cn(
        "block h-9 aspect-247/64 bg-[url('/logo-transparent.png')] bg-contain bg-center bg-no-repeat",
        className,
      )}
    >
      <span className="sr-only">Tropella</span>
    </Link>
  );
}
