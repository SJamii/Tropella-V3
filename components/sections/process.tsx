import { SectionHeading } from "@/components/section-heading";
import { ProcessSteps } from "@/components/sections/process-steps";

export function Process() {
  return (
    <section id="tp-process" className="border-y border-white/6 bg-surface">
      <div className="mx-auto max-w-7xl px-6 py-22.5 md:px-8">
        <SectionHeading
          tone="leaf"
          align="center"
          eyebrow="FROM FARM TO CRUNCH & POWDER"
          title="Four steps. Pure sunshine."
          className="mb-14"
        />
        <ProcessSteps />
      </div>
    </section>
  );
}
