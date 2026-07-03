import { Hero } from "@/components/sections/hero";
import { TrustMarquee } from "@/components/sections/trust-marquee";
import { DualAudience } from "@/components/sections/dual-audience";
import { Range } from "@/components/sections/range";

export default function Home() {
  return (
    <main>
      <Hero />
      <TrustMarquee />
      <DualAudience />
      <Range />
    </main>
  );
}
