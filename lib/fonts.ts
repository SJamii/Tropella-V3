import { Hind_Siliguri } from "next/font/google";

// Bangla script face for variety names. Loaded here (not in the root layout)
// so it is only fetched on pages that render Bangla text.
export const bangla = Hind_Siliguri({
  subsets: ["bengali"],
  weight: ["500", "700"],
  display: "swap",
});
