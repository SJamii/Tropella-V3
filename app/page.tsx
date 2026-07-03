import { Hero } from "@/components/sections/hero";
import { TrustMarquee } from "@/components/sections/trust-marquee";
import { DualAudience } from "@/components/sections/dual-audience";
import { Range } from "@/components/sections/range";
import { Process } from "@/components/sections/process";
import { WaysToEnjoy } from "@/components/sections/ways-to-enjoy";
import { Wholesale } from "@/components/sections/wholesale";
import { FarmToExport } from "@/components/sections/farm-to-export";
import { About } from "@/components/sections/about";
import { Testimonials } from "@/components/sections/testimonials";
import { Newsletter } from "@/components/sections/newsletter";
import { Contact } from "@/components/sections/contact";

export default function Home() {
  return (
    <main id="tp-main">
      <Hero />
      <TrustMarquee />
      <DualAudience />
      <Range />
      <Process />
      <WaysToEnjoy />
      <Wholesale />
      <FarmToExport />
      <About />
      <Testimonials />
      <Newsletter />
      <Contact />
    </main>
  );
}
