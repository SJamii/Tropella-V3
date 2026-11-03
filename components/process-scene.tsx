import { cn } from "@/lib/utils";

/**
 * "From farm to crunch & powder" scene — public/story-illustrations/
 * farm-to-powder-scene.svg inlined so ProcessStory can animate its parts.
 * Ids are prefixed `fp-` to stay unique on the page; inner animation groups
 * carry no transform attribute (GSAP owns their transforms).
 *
 *   step 1  #fp-crate, .hop x3, #fp-pickTag
 *   step 2  #fp-water circles, .piece x6 (mango, mango, tomato, tomato, lime, lime)
 *   step 3  #fp-tray, .heat x3
 *   step 4  #fp-pouch, #fp-jar, #fp-powder, #fp-puff, #fp-stamp
 *
 * `final` renders the end state statically (pouch, jar + powder, stamp) for
 * reduced motion / no GSAP. Produce colours are natural colours, kept as
 * drawn; the pouch and glow follow theme tokens via CSS variables.
 */
export function ProcessScene({
  final = false,
  className,
}: {
  final?: boolean;
  className?: string;
}) {
  // Start-hidden parts; in the final state the step-4 ones show instead.
  const startHidden = "hidden-at-start";
  const endShown = final ? undefined : startHidden;
  const endGone = final ? "hidden" : undefined;

  return (
    <svg
      viewBox="0 0 400 400"
      overflow="visible"
      aria-hidden="true"
      className={cn(
        "[--pouch-body:var(--color-leaf)] [--pouch-top:color-mix(in_oklch,var(--color-leaf),black_30%)] [--story-glow:var(--color-brand)]",
        className,
      )}
    >
      <defs>
        <linearGradient id="fp-gMango" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#FFD54A" />
          <stop offset=".55" stopColor="#FFAA22" />
          <stop offset="1" stopColor="#EE6A1E" />
        </linearGradient>
        <linearGradient id="fp-gFlesh" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#FFD14D" />
          <stop offset="1" stopColor="#FFA92E" />
        </linearGradient>
        <symbol id="fp-sMangoSlice" viewBox="0 0 100 100">
          <path d="M50 6 C74 10 84 38 78 62 C72 86 52 96 36 92 C20 88 18 66 24 44 C30 22 36 4 50 6Z" fill="#F39A2B" />
          <path d="M50 12 C70 16 78 40 72 62 C67 82 50 90 38 86 C26 82 25 64 30 45 C35 25 40 10 50 12Z" fill="url(#fp-gFlesh)" />
          <path d="M44 24 C40 40 38 58 42 76 M54 22 C52 40 52 60 54 78" stroke="#F08A1E" strokeWidth="2.4" fill="none" strokeLinecap="round" opacity=".7" />
        </symbol>
        <symbol id="fp-sTomato" viewBox="0 0 100 100">
          <circle cx="50" cy="52" r="42" fill="#D9381E" />
          <circle cx="50" cy="52" r="36" fill="#F05A3A" />
          <g fill="#FF9A7A">
            <path d="M50 52 C34 36 30 62 50 52Z" />
            <path d="M50 52 C66 36 70 62 50 52Z" />
            <path d="M50 52 C40 74 60 74 50 52Z" />
          </g>
          <g fill="#FFE2A0">
            <circle cx="40" cy="47" r="2.4" />
            <circle cx="60" cy="47" r="2.4" />
            <circle cx="50" cy="65" r="2.4" />
            <circle cx="44" cy="58" r="2" />
            <circle cx="56" cy="58" r="2" />
          </g>
          <path d="M50 14 l6 -8 M50 14 l-8 -5 M50 14 l9 1" stroke="#3F8A3C" strokeWidth="4" strokeLinecap="round" />
        </symbol>
        <symbol id="fp-sLime" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="43" fill="#5E9A2A" />
          <circle cx="50" cy="50" r="38" fill="#F2F6C9" />
          <g fill="#B9D64A">
            <path d="M50 50 L50 16 A34 34 0 0 1 74 26Z" />
            <path d="M50 50 L78 30 A34 34 0 0 1 84 54Z" />
            <path d="M50 50 L82 60 A34 34 0 0 1 68 80Z" />
            <path d="M50 50 L62 83 A34 34 0 0 1 38 83Z" />
            <path d="M50 50 L32 80 A34 34 0 0 1 18 60Z" />
            <path d="M50 50 L16 54 A34 34 0 0 1 22 30Z" />
            <path d="M50 50 L26 26 A34 34 0 0 1 46 16Z" />
          </g>
          <circle cx="50" cy="50" r="5" fill="#F2F6C9" />
        </symbol>
        <symbol id="fp-sPouch" viewBox="0 0 240 320">
          <path d="M28 34 L212 34 L226 300 Q120 322 14 300 Z" fill="var(--pouch-body)" />
          <path d="M28 34 L212 34 L213 56 L27 56Z" fill="var(--pouch-top)" />
          <path d="M40 45h160" stroke="#FFE49A" strokeWidth="2" strokeDasharray="6 6" opacity=".5" />
          <rect x="54" y="118" width="132" height="92" rx="46" fill="#FFF2C9" />
          <g transform="translate(64 128) scale(.66)">
            <use href="#fp-sMangoSlice" width="100" height="100" />
          </g>
          <g transform="translate(116 132) scale(.6)">
            <use href="#fp-sLime" width="100" height="100" />
          </g>
          <rect x="58" y="62" width="124" height="48" rx="24" fill="#FFF8E6" />
          {/* Site wordmark (same file as components/logo.tsx). */}
          <image href="/logo-transparent.png" x="74" y="68" width="92" height="38" preserveAspectRatio="xMidYMid meet" />
          <text x="120" y="248" textAnchor="middle" fontWeight="700" fontSize="19" fill="#FFF2C9">
            DRIED SLICES
          </text>
          <text x="120" y="270" textAnchor="middle" fontSize="12" fill="#C4DDB0">
            fruit &amp; veg · eco-pouch
          </text>
        </symbol>
      </defs>
      <style>{".hidden-at-start{opacity:0;visibility:hidden}"}</style>

      <circle fill="var(--story-glow)" opacity=".12" cx="200" cy="215" r="160" />

      {/* crate of fresh produce */}
      <g id="fp-crate" className={endGone}>
        <rect x="92" y="268" width="216" height="58" rx="8" fill="#A8743C" />
        <path d="M92 287h216M92 306h216" stroke="#7C5226" strokeWidth="3" />
        <rect x="88" y="262" width="224" height="10" rx="5" fill="#C48A4A" />
      </g>
      <g transform="translate(128 232)" className={endGone}>
        <g className="hop">
          <circle r="32" fill="#DE2927" />
          <ellipse cx="-11" cy="-12" rx="7" ry="10" fill="#FFF2C9" opacity=".35" transform="rotate(30 -11 -12)" />
          <path d="M0 -30 l8 -8 M0 -30 l-9 -6 M0 -30 l10 2 M0 -30 l-6 6" stroke="#3F8A3C" strokeWidth="4" strokeLinecap="round" />
        </g>
      </g>
      <g transform="translate(200 214)" className={endGone}>
        <g className="hop">
          <g transform="scale(.66)">
            <path d="M0 -74 C48 -74 74 -26 66 24 C58 72 16 88 -16 80 C-58 70 -72 26 -64 -14 C-55 -56 -32 -74 0 -74Z" fill="url(#fp-gMango)" />
            <ellipse cx="34" cy="-20" rx="22" ry="30" fill="#DE2927" opacity=".35" />
            <path d="M0 -74 C2 -86 6 -92 12 -96" stroke="#6B4A22" strokeWidth="5" fill="none" strokeLinecap="round" />
            <path d="M10 -92 C30 -110 56 -104 60 -96 C44 -86 24 -86 10 -92Z" fill="#3F9A54" />
          </g>
        </g>
      </g>
      <g transform="translate(272 236)" className={endGone}>
        <g className="hop">
          <ellipse rx="30" ry="27" fill="#7DB33A" />
          <ellipse cx="-10" cy="-10" rx="7" ry="9" fill="#FFF2C9" opacity=".35" />
          <circle cx="29" cy="0" r="4" fill="#5E9A2A" />
        </g>
      </g>
      <g transform="translate(200 120)">
        <g id="fp-pickTag" className={startHidden}>
          <rect x="-62" y="-17" width="124" height="34" rx="17" fill="#FFF2C9" />
          <text y="6" textAnchor="middle" fontSize="14" fill="#1E4F10">
            ✓ picked ripe
          </text>
        </g>
      </g>

      {/* water */}
      <g id="fp-water" fill="#9FD7F2">
        <circle className={startHidden} cx="140" cy="120" r="7" />
        <circle className={startHidden} cx="185" cy="105" r="5" />
        <circle className={startHidden} cx="215" cy="118" r="8" />
        <circle className={startHidden} cx="255" cy="108" r="5" />
        <circle className={startHidden} cx="170" cy="140" r="4" />
        <circle className={startHidden} cx="240" cy="142" r="6" />
      </g>

      {/* tray */}
      <g id="fp-tray" className={startHidden}>
        <rect x="40" y="276" width="320" height="12" rx="6" fill="#C4DDB0" opacity=".55" />
        <path d="M60 282h280" stroke="#10301F" strokeWidth="2" strokeDasharray="4 8" opacity=".6" />
        <text x="200" y="316" textAnchor="middle" fontSize="13" fill="#C4DDB0">
          dehydrator tray · 58°C
        </text>
      </g>
      <g fill="none" stroke="#F1B005" strokeWidth="4" strokeLinecap="round">
        <path className={cn("heat", startHidden)} d="M90 360 c-10 -14 10 -24 0 -38 s10 -24 0 -38" />
        <path className={cn("heat", startHidden)} d="M200 362 c-10 -14 10 -24 0 -38 s10 -24 0 -38" />
        <path className={cn("heat", startHidden)} d="M310 360 c-10 -14 10 -24 0 -38 s10 -24 0 -38" />
      </g>

      {/* slices: mango, mango, tomato, tomato, lime, lime */}
      <g id="fp-pieces" transform="translate(200 240)" className={endGone}>
        <g className={cn("piece", startHidden)}>
          <use href="#fp-sMangoSlice" x="-30" y="-30" width="60" height="60" />
        </g>
        <g className={cn("piece", startHidden)}>
          <use href="#fp-sMangoSlice" x="-30" y="-30" width="60" height="60" />
        </g>
        <g className={cn("piece", startHidden)}>
          <use href="#fp-sTomato" x="-27" y="-27" width="54" height="54" />
        </g>
        <g className={cn("piece", startHidden)}>
          <use href="#fp-sTomato" x="-27" y="-27" width="54" height="54" />
        </g>
        <g className={cn("piece", startHidden)}>
          <use href="#fp-sLime" x="-26" y="-26" width="52" height="52" />
        </g>
        <g className={cn("piece", startHidden)}>
          <use href="#fp-sLime" x="-26" y="-26" width="52" height="52" />
        </g>
      </g>

      {/* pouch (slices) */}
      <g transform="translate(120 248)">
        <g id="fp-pouch" className={endShown}>
          <use href="#fp-sPouch" x="-75" y="-100" width="150" height="200" />
        </g>
      </g>

      {/* jar (powder) */}
      <g transform="translate(290 262)">
        <g id="fp-jar" className={endShown}>
          <rect x="-46" y="-72" width="92" height="142" rx="18" fill="#FFF2C9" opacity=".14" />
          <rect id="fp-powder" x="-40" y="-30" width="80" height="94" rx="12" fill="#DE2927" />
          <rect x="-46" y="-72" width="92" height="142" rx="18" fill="none" stroke="#FFF2C9" strokeWidth="3" />
          <rect x="-52" y="-88" width="104" height="20" rx="6" fill="#DE2927" />
          <rect x="-36" y="4" width="72" height="30" rx="7" fill="#FFF2C9" />
          <text y="24" textAnchor="middle" fontWeight="700" fontSize="13" fill="#1E4F10">
            POWDER
          </text>
          <g id="fp-puff" fill="#F05A3A" className={startHidden}>
            <circle cx="-14" cy="-80" r="6" />
            <circle cx="4" cy="-86" r="8" />
            <circle cx="18" cy="-78" r="5" />
          </g>
        </g>
      </g>

      {/* stamp */}
      <g transform="translate(206 92)">
        <g id="fp-stamp" className={endShown} transform={final ? "rotate(-12)" : undefined}>
          <circle r="44" fill="none" stroke="#DE2927" strokeWidth="4" strokeDasharray="3 5" />
          <circle r="36" fill="#DE2927" />
          <text y="-3" textAnchor="middle" fontSize="14" fill="#FFF2C9">
            Packed
          </text>
          <text y="16" textAnchor="middle" fontSize="14" fill="#FFF2C9">
            fresh!
          </text>
        </g>
      </g>
    </svg>
  );
}
