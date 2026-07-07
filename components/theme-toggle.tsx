"use client";

import { useSyncExternalStore } from "react";
import { Icon } from "@/components/icon";

// The active theme is a `light` class on <html>, applied before paint by the
// bootstrap script in layout.tsx. We read it as external state so the server
// renders the dark default and the client syncs to the real class without a
// setState-in-effect or a hydration mismatch.
function subscribe(callback: () => void) {
  window.addEventListener("themechange", callback);
  return () => window.removeEventListener("themechange", callback);
}

function isLight() {
  return document.documentElement.classList.contains("light");
}

/** Dark/light theme toggle. Reflects and flips the persisted theme. */
export function ThemeToggle() {
  const light = useSyncExternalStore(subscribe, isLight, () => false);

  const toggle = () => {
    const next = !light;
    document.documentElement.classList.toggle("light", next);
    localStorage.setItem("theme", next ? "light" : "dark");
    window.dispatchEvent(new Event("themechange"));
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={light ? "Switch to dark theme" : "Switch to light theme"}
      aria-pressed={light}
      className="flex size-11 items-center justify-center text-ink-soft transition-colors hover:text-ink"
    >
      <Icon name={light ? "dark_mode" : "light_mode"} className="text-[22px]" />
    </button>
  );
}
