import { Hero } from "@/components/sections/hero";
import { TrustMarquee } from "@/components/sections/trust-marquee";
import { DualAudience } from "@/components/sections/dual-audience";

export default function Home() {
  return (
    <main>
      <Hero />
      <TrustMarquee />
      <DualAudience />
    </main>
  );
}
