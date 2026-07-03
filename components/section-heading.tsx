import { Eyebrow } from "@/components/eyebrow";
import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  eyebrow: string;
  title: React.ReactNode;
  tone?: "brand" | "leaf";
  align?: "left" | "center";
  className?: string;
};

/**
 * Eyebrow + h2 pair used at the top of most sections. `align="center"`
 * centers it (Process, Testimonials, Contact); default is left.
 */
export function SectionHeading({
  eyebrow,
  title,
  tone = "brand",
  align = "left",
  className,
}: SectionHeadingProps) {
  return (
    <div className={cn(align === "center" && "text-center", className)}>
      <Eyebrow tone={tone} className="mb-3">
        {eyebrow}
      </Eyebrow>
      <h2 className="font-display text-[clamp(32px,4vw,52px)] leading-[1.02] font-extrabold tracking-[-0.03em]">
        {title}
      </h2>
    </div>
  );
}
