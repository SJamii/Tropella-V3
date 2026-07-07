import Link from "next/link";
import { cn } from "@/lib/utils";

/**
 * Tropella wordmark — rendered from /public/logo.png. The source asset has a
 * solid teal background, so we frame just the white sticker body (the
 * "Tropella" wordmark) with a background crop and clip the rounded corners with
 * `overflow-hidden`. The crop constants below map to the body's bounding box in
 * the 1344×768 source (x 364–926, y 255–473). Replace logo.png with a
 * transparent-background export to have it blend perfectly with either theme.
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
        "block h-9 w-23.25 overflow-hidden rounded-md bg-[url('/logo.png')] bg-no-repeat bg-position-[47%_46%] bg-size-[239%]",
        className,
      )}
    >
      <span className="sr-only">Tropella</span>
    </Link>
  );
}
