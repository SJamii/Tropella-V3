/**
 * The site's public origin — the single source for canonical URLs, Open Graph,
 * the sitemap and robots.txt. Override per environment with NEXT_PUBLIC_SITE_URL.
 */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://tropella.net"
).replace(/\/+$/, "");
