import { cn } from "@/lib/utils";

type EyebrowProps = {
  children: React.ReactNode;
  /** Accent color — orange (retail) or green (wholesale/export). */
  tone?: "brand" | "leaf";
  className?: string;
};

/**
 * The small uppercase, letter-spaced label that sits above every section
 * heading (e.g. "EXPLORE OUR RANGE"). Pass already-uppercase text.
 */
export function Eyebrow({ children, tone = "brand", className }: EyebrowProps) {
  return (
    <p
      className={cn(
        "text-[13px] font-bold tracking-[0.12em]",
        tone === "leaf" ? "text-leaf" : "text-brand",
        className,
      )}
    >
      {children}
    </p>
  );
}
