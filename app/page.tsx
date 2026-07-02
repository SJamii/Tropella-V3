import { Eyebrow } from "@/components/eyebrow";

export default function Home() {
  return (
    <main
      id="tp-top"
      className="mx-auto flex min-h-screen max-w-7xl flex-col items-center justify-center px-6 pt-30 pb-24 text-center md:px-8"
    >
      <Eyebrow>LAYOUT SHELL READY</Eyebrow>
      <h1 className="mt-4 font-display text-4xl font-extrabold tracking-tight md:text-6xl">
        Tropella
      </h1>
      <p className="mt-3 max-w-md text-ink-muted">
        Header and footer are in place. Building the Hero section next.
      </p>
    </main>
  );
}
