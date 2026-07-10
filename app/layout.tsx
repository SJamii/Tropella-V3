import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, Hanken_Grotesk } from "next/font/google";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import "./globals.css";

// Display face — headings, logo, numerals.
const display = Bricolage_Grotesque({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-display",
  display: "swap",
});

// Body face — paragraphs, UI text.
const body = Hanken_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-body",
  display: "swap",
});

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://tropella.com";
const TITLE = "Tropella — From Tropics to your Table & Factory";
const DESCRIPTION =
  "Premium tropical dried fruits, dried vegetables, and natural powders — handpicked and slow-dried for discerning kitchens and innovative manufacturers alike.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: TITLE,
    template: "%s · Tropella",
  },
  description: DESCRIPTION,
  applicationName: "Tropella",
  keywords: [
    "dried fruit",
    "dried mango",
    "tropical fruit powder",
    "moringa powder",
    "wholesale dried fruit",
    "bulk dried fruit export",
    "natural fruit powders",
  ],
  authors: [{ name: "Tropella" }],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: "Tropella",
    url: SITE_URL,
    title: TITLE,
    description: DESCRIPTION,
    locale: "en_US",
    images: [
      {
        url: "/hero-product.jpeg",
        alt: "Tropella premium tropical dried fruit",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: ["/hero-product.jpeg"],
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#FBF6EC" },
    { media: "(prefers-color-scheme: dark)", color: "#14110C" },
  ],
  colorScheme: "light dark",
};

// Applies the persisted theme before first paint to avoid a flash of the wrong
// theme. Default is light; the `.light` class is added unless the visitor has
// explicitly chosen dark. Dark stays the class-less `:root` state so shadcn's
// dormant `dark:` variants don't activate.
const THEME_BOOTSTRAP = `try{if(localStorage.getItem("theme")!=="dark")document.documentElement.classList.add("light")}catch(e){}`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${body.variable}`}
      suppressHydrationWarning
    >
      <head>
        {/* Set the persisted theme before paint (no flash of dark on light). */}
        <script dangerouslySetInnerHTML={{ __html: THEME_BOOTSTRAP }} />
        {/*
          Material Symbols is a variable icon font that next/font/google does
          not support, so it's loaded via a stylesheet link. The two @next
          font rules below target the Pages Router (_document) and don't apply
          to this App Router icon font.
        */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin=""
        />
        {/* display=block is intentional for an icon font: it prevents the raw
            ligature text (e.g. "spa") from flashing before the glyphs load. */}
        {/* eslint-disable-next-line @next/next/no-page-custom-font, @next/next/google-font-display */}
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0&display=block"
        />
      </head>
      <body>
        <a
          href="#tp-main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:rounded-lg focus:bg-brand focus:px-4 focus:py-2 focus:font-semibold focus:text-canvas"
        >
          Skip to content
        </a>
        <SiteHeader />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
