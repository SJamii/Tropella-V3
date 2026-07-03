import { Hero } from "@/components/sections/hero";
import { TrustMarquee } from "@/components/sections/trust-marquee";
import { DualAudience } from "@/components/sections/dual-audience";
import { Range } from "@/components/sections/range";
import { Process } from "@/components/sections/process";
import { WaysToEnjoy } from "@/components/sections/ways-to-enjoy";

export default function Home() {
  return (
    <main>
      <Hero />
      <TrustMarquee />
      <DualAudience />
      <Range />
      <Process />
      <WaysToEnjoy />
    </main>
  );
}
