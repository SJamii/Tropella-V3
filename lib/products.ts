/**
 * Product detail content for /products/[slug]. Each entry powers one detail
 * page; the range card links to `/products/<slug>`.
 */

export type ProductUsage = {
  /** Material Symbols ligature name. */
  icon: string;
  label: string;
};

export type ProductImage = {
  src: string;
  alt: string;
};

/** One fruit variety shown in the "Choose your mango" switcher. */
export type ProductVariety = {
  name: string;
  /** Name in Bangla script. */
  nameBn: string;
  region: string;
  season: string;
  /** Flavour scores out of 5. */
  sweetness: number;
  tang: number;
  aroma: number;
  note: string;
  bestFor: string[];
  /** Illustration colours: skin fades into flesh. */
  colors: { skin: string; flesh: string };
};

/** The varieties a product is made from, and which fruit illustration to use. */
export type VarietyGroup = {
  fruit: "mango" | "pineapple" | "lime";
  list: ProductVariety[];
};

// SAMPLE CONTENT: varieties, regions, seasons and flavour scores are
// placeholders until Tropella confirms which varieties it uses.
const MANGO_VARIETIES: VarietyGroup = {
  fruit: "mango",
  list: [
    {
      name: "Himsagar",
      nameBn: "হিমসাগর",
      region: "Rajshahi · Chapainawabganj",
      season: "June",
      sweetness: 5,
      tang: 1,
      aroma: 4,
      note: "Honey-sweet and creamy with almost no fibre — the mango Bangladesh waits for every June.",
      bestFor: ["Snacking", "Smoothies", "Desserts"],
      colors: { skin: "#8DB04A", flesh: "#F5B731" },
    },
    {
      name: "Langra",
      nameBn: "ল্যাংড়া",
      region: "Rajshahi",
      season: "June – July",
      sweetness: 4,
      tang: 2,
      aroma: 5,
      note: "Intensely aromatic, with a gentle tang that keeps every bite bright.",
      bestFor: ["Snacking", "Chutneys", "Baking"],
      colors: { skin: "#5F8F3A", flesh: "#F2C14E" },
    },
    {
      name: "Amrapali",
      nameBn: "আম্রপালি",
      region: "Nationwide · Hill Tracts",
      season: "July",
      sweetness: 5,
      tang: 1,
      aroma: 3,
      note: "Small fruit with deep-orange flesh and the richest sweetness of the lot.",
      bestFor: ["Lunchboxes", "Yogurt", "Bakes"],
      colors: { skin: "#B99A3A", flesh: "#EE8A22" },
    },
    {
      name: "Fazli",
      nameBn: "ফজলি",
      region: "Rajshahi · Chapainawabganj",
      season: "July – August",
      sweetness: 3,
      tang: 2,
      aroma: 3,
      note: "A big, late-season mango with juicy, mildly sweet flesh.",
      bestFor: ["Drinks", "Cooking", "Bulk"],
      colors: { skin: "#A9B847", flesh: "#F6CF66" },
    },
    {
      name: "Gopalbhog",
      nameBn: "গোপালভোগ",
      region: "Rajshahi",
      season: "Late May – June",
      sweetness: 4,
      tang: 1,
      aroma: 4,
      note: "The first of the season — fragrant, sweet and smooth.",
      bestFor: ["Snacking", "Gifting"],
      colors: { skin: "#9CB24C", flesh: "#F4C03E" },
    },
    {
      name: "Haribhanga",
      nameBn: "হাঁড়িভাঙ্গা",
      region: "Rangpur",
      season: "June – July",
      sweetness: 4,
      tang: 1,
      aroma: 3,
      note: "Round and fleshy, with firm, fibreless flesh from the north.",
      bestFor: ["Snacking", "Desserts"],
      colors: { skin: "#6E9C3C", flesh: "#F3B23A" },
    },
  ],
};

const PINEAPPLE_VARIETIES: VarietyGroup = {
  fruit: "pineapple",
  list: [
    {
      name: "Honey Queen",
      nameBn: "হানি কুইন",
      region: "Madhupur, Tangail · Sylhet",
      season: "May – July",
      sweetness: 5,
      tang: 2,
      aroma: 4,
      note: "Small and golden, with very sweet, fragrant flesh — the classic Madhupur pineapple.",
      bestFor: ["Snacking", "Desserts", "Trail mix"],
      colors: { skin: "#C9A43A", flesh: "#F6D04D" },
    },
    {
      name: "Giant Kew",
      nameBn: "জায়ান্ট কিউ",
      region: "Sylhet · Srimangal · Hill Tracts",
      season: "June – August",
      sweetness: 3,
      tang: 3,
      aroma: 3,
      note: "A large, juicy pineapple with pale flesh and a refreshing tang.",
      bestFor: ["Drinks", "Baking", "Bulk"],
      colors: { skin: "#8FA23E", flesh: "#F3E07A" },
    },
    {
      name: "Ghorashal",
      nameBn: "ঘোড়াশাল",
      region: "Narsingdi",
      season: "June – July",
      sweetness: 4,
      tang: 2,
      aroma: 4,
      note: "Medium-sized and aromatic, with a balanced sweet-tangy bite.",
      bestFor: ["Snacking", "Cakes", "Salads"],
      colors: { skin: "#A7953A", flesh: "#F2C94C" },
    },
  ],
};

const LIME_VARIETIES: VarietyGroup = {
  fruit: "lime",
  list: [
    {
      name: "Kagoji",
      nameBn: "কাগজি লেবু",
      region: "Nationwide",
      season: "Year-round · peak June – September",
      sweetness: 1,
      tang: 5,
      aroma: 4,
      note: "The classic thin-skinned Bangladeshi lime — sharp, sour and wonderfully aromatic.",
      bestFor: ["Tea", "Drinks", "Garnish"],
      colors: { skin: "#5E9E36", flesh: "#D9E68A" },
    },
    {
      name: "Seedless",
      nameBn: "সিডলেস লেবু",
      region: "Nationwide",
      season: "Year-round · peak June – September",
      sweetness: 1,
      tang: 4,
      aroma: 3,
      note: "Juicy and nearly seed-free, so every slice dries into a clean, even wheel.",
      bestFor: ["Drinks", "Garnish", "Infused water"],
      colors: { skin: "#6BAA3C", flesh: "#E4EC9A" },
    },
    {
      name: "Gondhoraj",
      nameBn: "গন্ধরাজ লেবু",
      region: "Nationwide",
      season: "July – September",
      sweetness: 1,
      tang: 4,
      aroma: 5,
      note: "Famous for its intense, floral fragrance — a few slices perfume a whole pot of tea.",
      bestFor: ["Tea", "Desserts", "Gifting"],
      colors: { skin: "#4F8F2F", flesh: "#DCE89A" },
    },
    {
      name: "Elachi",
      nameBn: "এলাচি লেবু",
      region: "Sylhet",
      season: "July – September",
      sweetness: 2,
      tang: 3,
      aroma: 5,
      note: "A large, highly aromatic lime from Sylhet with generous, fragrant slices.",
      bestFor: ["Tea", "Cooking", "Garnish"],
      colors: { skin: "#6A9F3A", flesh: "#E8E59A" },
    },
    {
      name: "Shorboti",
      nameBn: "শরবতি লেবু",
      region: "Nationwide",
      season: "June – September",
      sweetness: 2,
      tang: 3,
      aroma: 3,
      note: "Juicy and mild, traditionally squeezed for shorbot — gentle and refreshing when dried.",
      bestFor: ["Drinks", "Infused water"],
      colors: { skin: "#7DB043", flesh: "#EEF0A8" },
    },
  ],
};

export type ProductDetail = {
  slug: string;
  tone: "brand" | "leaf";
  badge: string;
  title: string;
  /** One-line summary under the title. */
  tagline: string;
  /** Short paragraph shown before the "Good to know" box. */
  description: string;
  tags: string[];
  image: string;
  imageAlt: string;
  /**
   * Photos for the detail-page gallery, shown in a portrait (3:4) frame unless
   * `galleryOrientation` is "landscape" (4:3). When absent, the page shows
   * `image` alone in a landscape frame.
   */
  gallery?: ProductImage[];
  galleryOrientation?: "portrait" | "landscape";
  /** Fruit varieties; when present the page shows a variety switcher. */
  varieties?: VarietyGroup;
  usage: ProductUsage[];
  /** Plain, everyday benefits — taste, texture, convenience. No health claims. */
  benefits: string[];
  tip: string;
};

export const PRODUCT_DETAILS: ProductDetail[] = [
  {
    slug: "dried-mango-slices",
    tone: "brand",
    badge: "FRUIT · MOST LOVED",
    title: "Dried Mango Slices",
    tagline: "Naturally sweet, ripe mango — gently dehydrated in tender slices.",
    description:
      "Ripe mangoes are sliced and gently dehydrated to hold on to their golden colour, rich aroma and soft, chewy bite. Enjoy them straight from the pack, or bring a taste of the tropics to your breakfast, baking and drinks.",
    tags: ["Fruit", "Slices"],
    image: "/mango-slices.jpg",
    imageAlt: "Golden dried mango slices",
    // These photos are all landscape; a portrait frame would crop the slices.
    galleryOrientation: "landscape",
    gallery: [
      {
        src: "/mango-slices.jpg",
        alt: "Golden dried mango slices in a clear pouch, seen from the side",
      },
      {
        src: "/dried_mango/dried-mango-1.jpeg",
        alt: "Clear vacuum pouch packed with bright yellow dried mango slices",
      },
      {
        src: "/dried_mango/dried-mango-2.jpeg",
        alt: "Pouch of dried mango slices held up to the light",
      },
      {
        src: "/dried_mango/dried-mango-3.jpeg",
        alt: "Dried mango slices in a pouch resting on a marble counter",
      },
    ],
    varieties: MANGO_VARIETIES,
    usage: [
      { icon: "nutrition", label: "Snack straight from the pack" },
      { icon: "breakfast_dining", label: "Chop into cereal or yogurt" },
      { icon: "cake", label: "Bake into muffins & cakes" },
      { icon: "blender", label: "Blend into smoothies" },
    ],
    benefits: [
      "Naturally sweet, ripe-mango flavour",
      "Soft, chewy slices",
      "Keeps for months in a sealed pack",
    ],
    tip: "Soak in warm water for 10 minutes to soften for desserts or chutneys.",
  },
  {
    slug: "dried-pineapple-slices",
    tone: "brand",
    badge: "FRUIT",
    title: "Dried Pineapple Slices",
    tagline: "Tangy-sweet golden rings.",
    description:
      "Juicy pineapple rings, slow-dried until golden with a bright, tangy-sweet bite. Great on their own, tossed into a snack mix, or used to dress up cakes, desserts and drinks.",
    tags: ["Fruit", "Slices"],
    image: "/Dried_pineapple_slices_original.png",
    imageAlt: "Golden dried pineapple rings",
    varieties: PINEAPPLE_VARIETIES,
    // Landscape photos; a portrait frame would crop the plate of rings.
    galleryOrientation: "landscape",
    gallery: [
      {
        src: "/Dried_pineapple_slices_original.png",
        alt: "Golden dried pineapple rings spread across a black patterned plate",
      },
      {
        src: "/dried_pineapple/dried-pineapple-1.jpeg",
        alt: "Dried pineapple rings up close, showing their flower-like shape",
      },
      {
        src: "/dried_pineapple/dried-pineapple-2.jpeg",
        alt: "Dried pineapple rings on a plate, seen from a low angle",
      },
      {
        src: "/dried_pineapple/dried-pineapple-3.jpeg",
        alt: "Plate of dried pineapple rings on a green tablecloth",
      },
    ],
    usage: [
      { icon: "nutrition", label: "Snack on its own" },
      { icon: "grain", label: "Add to trail mix" },
      { icon: "cake", label: "Top cakes & desserts" },
      { icon: "local_bar", label: "Garnish drinks & cocktails" },
    ],
    benefits: [
      "Bright, tangy-sweet taste",
      "Golden rings that look good on a plate",
      "Easy to carry and store",
    ],
    tip: "Chop small and stir into rice or salads for a sweet-sour touch.",
  },
  {
    slug: "dried-lime-slices",
    tone: "brand",
    badge: "FRUIT",
    title: "Dried Lime Slices",
    tagline: "Zesty, aromatic citrus slices.",
    description:
      "Thin lime slices, dried to keep their fresh citrus aroma and pretty colour. Drop them into hot or cold drinks, use them as a garnish, or add a zesty note to your cooking.",
    tags: ["Fruit", "Slices"],
    image: "/lime_slices.png",
    imageAlt: "Dried lime slices",
    varieties: LIME_VARIETIES,
    gallery: [
      {
        src: "/lime_slices.png",
        alt: "Clear pouch packed with dried lime slices and a Tropella label",
      },
      {
        src: "/lime-slices/lime-slices-1.jpeg",
        alt: "Dried lime slices stacked on a plate in front of the Tropella backdrop",
      },
      {
        src: "/lime-slices/lime-slices-2.jpeg",
        alt: "Dried lime slices on a plate, close-up with a softly blurred backdrop",
      },
      {
        src: "/lime-slices/lime-slices-3.jpeg",
        alt: "Dried lime slices, closer front view showing the pale citrus segments",
      },
    ],
    usage: [
      { icon: "emoji_food_beverage", label: "Float in tea or warm water" },
      { icon: "local_bar", label: "Garnish cocktails & mocktails" },
      { icon: "soup_kitchen", label: "Add to marinades & stews" },
      { icon: "grain", label: "Grind into seasoning" },
    ],
    benefits: [
      "Fresh, zesty citrus aroma",
      "Looks great in a glass",
      "Lasts much longer than fresh lime",
    ],
    tip: "Drop a slice into a hot drink and let it steep for 3–5 minutes.",
  },
  {
    slug: "sweetened-dried-mango",
    tone: "brand",
    badge: "FRUIT · SWEETENED",
    title: "Sweetened Dried Mango",
    tagline: "Soft, chewy, lightly sweetened slices.",
    description:
      "Ripe mango slices, lightly sweetened and dried to a soft, chewy texture. A ready-to-eat treat for snacking, lunchboxes and desserts.",
    tags: ["Fruit", "Slices", "Sweetened"],
    image: "/dried_mango_flow.jpeg",
    imageAlt: "Sweetened dried mango slices",
    varieties: MANGO_VARIETIES,
    // Mostly landscape photos; a portrait frame would crop the plated slices.
    galleryOrientation: "landscape",
    gallery: [
      {
        src: "/dried_mango_flow.jpeg",
        alt: "Sweetened dried mango slices fanned out on a steel plate",
      },
      {
        src: "/sweetend_dried_mango/sweetened-mango-1.jpeg",
        alt: "Soft, glossy sweetened mango slices arranged in a circle on a tray",
      },
      {
        src: "/sweetend_dried_mango/sweetened-mango-2.jpeg",
        alt: "Sweetened dried mango slices in a yellow pouch with a clear window",
      },
      {
        src: "/sweetend_dried_mango/sweetened-mango-3.jpeg",
        alt: "Tray of sweetened dried mango slices in the processing room",
      },
    ],
    usage: [
      { icon: "nutrition", label: "Sweet snack" },
      { icon: "icecream", label: "Chop into desserts & ice cream" },
      { icon: "bakery_dining", label: "Add to baked goods" },
      { icon: "lunch_dining", label: "Pack in lunchboxes" },
    ],
    benefits: [
      "Soft, chewy, dessert-like texture",
      "Lightly sweetened for a treat feel",
      "Ready to eat, no prep",
    ],
    tip: "Dice and fold into pancake or waffle batter.",
  },
  {
    slug: "sweetened-dried-pineapple-slices",
    tone: "brand",
    badge: "FRUIT · SWEETENED",
    title: "Sweetened Dried Pineapple Slices",
    tagline: "Sugar-kissed golden rings, soft & chewy.",
    description:
      "Pineapple rings with a light sugar coating, dried until soft and chewy. A sweet tropical treat to enjoy on its own or on top of your favourite desserts.",
    tags: ["Fruit", "Slices", "Sweetened"],
    image: "/dried_sweet_pineapple_slices.jpeg",
    imageAlt: "Sweetened dried pineapple rings piled on a plate",
    varieties: PINEAPPLE_VARIETIES,
    // Landscape / square photos; a portrait frame would crop the rings.
    galleryOrientation: "landscape",
    gallery: [
      {
        src: "/dried_sweet_pineapple_slices.jpeg",
        alt: "Sweetened dried pineapple rings piled on a plate",
      },
      {
        src: "/sweetend_dried_pineapple/sweetened-pineapple-1.jpeg",
        alt: "Close-up of soft, pale-gold sweetened pineapple rings",
      },
      {
        src: "/sweetend_dried_pineapple/sweetened-pineapple-2.jpeg",
        alt: "Sweetened pineapple rings in a clear dish in front of the Tropella page",
      },
      {
        src: "/sweetend_dried_pineapple/sweetened-pineapple-3.jpeg",
        alt: "Dish of sweetened dried pineapple rings, front view",
      },
    ],
    usage: [
      { icon: "nutrition", label: "Sweet snack" },
      { icon: "cake", label: "Top cakes & puddings" },
      { icon: "grain", label: "Mix with nuts for a treat mix" },
      { icon: "icecream", label: "Garnish desserts" },
    ],
    benefits: [
      "Sugar-kissed, chewy rings",
      "Tropical flavour any time of year",
      "Ready to eat, no prep",
    ],
    tip: "Warm briefly in a pan for a quick caramelised topping.",
  },
  {
    slug: "moringa-powder",
    tone: "leaf",
    badge: "VEGETABLE · POWDER",
    title: "Moringa Powder",
    tagline: "Finely milled green leaf powder.",
    description:
      "Moringa leaves, dried and finely milled into a smooth green powder. Stir it into drinks, soups and doughs for a mild, earthy flavour and a fresh green colour.",
    tags: ["Vegetable", "Powder"],
    image: "/moringa_powder.png",
    imageAlt: "Green moringa powder",
    usage: [
      { icon: "blender", label: "Stir into smoothies" },
      { icon: "soup_kitchen", label: "Mix into soups & dals" },
      { icon: "bakery_dining", label: "Add to dough or batter" },
      { icon: "emoji_food_beverage", label: "Whisk into tea or warm water" },
    ],
    benefits: [
      "Mild, earthy green taste",
      "Dissolves easily",
      "A small spoon goes a long way",
    ],
    tip: "Start with half a teaspoon. The flavour is stronger than it looks.",
  },
  {
    slug: "tomato-powder",
    tone: "leaf",
    badge: "VEGETABLE · POWDER",
    title: "Tomato Powder",
    tagline: "Rich umami depth for cooking.",
    description:
      "Ripe tomatoes, dried and ground into a fine powder full of rich tomato flavour. Use it to thicken, season and colour your dishes without chopping a single tomato.",
    tags: ["Vegetable", "Powder"],
    image: "/tomato_powder.png",
    imageAlt: "Red tomato powder",
    usage: [
      { icon: "soup_kitchen", label: "Thicken soups & sauces" },
      { icon: "tapas", label: "Season snacks & popcorn" },
      { icon: "skillet", label: "Make quick tomato paste" },
      { icon: "outdoor_grill", label: "Add to spice rubs" },
    ],
    benefits: [
      "Rich tomato flavour without chopping",
      "No waste, use just what you need",
      "Stores far longer than fresh tomatoes",
    ],
    tip: "Mix 1 part powder with 2 parts water for an instant paste.",
  },
  {
    slug: "garlic-powder",
    tone: "leaf",
    badge: "VEGETABLE · POWDER",
    title: "Garlic Powder",
    tagline: "Pungent, savory flavor base.",
    description:
      "Garlic cloves, dried and finely ground for full garlic flavour in seconds. Sprinkle it into everyday cooking, marinades and snacks with no peeling or chopping.",
    tags: ["Vegetable", "Powder"],
    image: "/garlic_powder/garlic-powder-3.jpeg",
    imageAlt: "Garlic powder heaped on a plate in front of whole garlic bulbs",
    gallery: [
      {
        src: "/garlic_powder/garlic-powder-3.jpeg",
        alt: "Garlic powder seen from a little further back, with the Tropella sign behind",
      },
      {
        src: "/garlic_powder/garlic-powder-1.jpeg",
        alt: "Garlic powder heaped on a plate in front of whole garlic bulbs and the Tropella backdrop",
      },
      {
        src: "/garlic_powder/garlic-powder-2.jpeg",
        alt: "Mound of garlic powder on a patterned cloth",
      },
    ],
    usage: [
      { icon: "skillet", label: "Season meat & vegetables" },
      { icon: "bakery_dining", label: "Make garlic bread & butter" },
      { icon: "restaurant", label: "Add to marinades & dressings" },
      { icon: "tapas", label: "Sprinkle on snacks" },
    ],
    benefits: [
      "Full garlic flavour with no peeling",
      "Spreads evenly through food",
      "Long shelf life",
    ],
    tip: "Add near the end of cooking so the flavour stays fresh.",
  },
  {
    slug: "ginger-powder",
    tone: "leaf",
    badge: "VEGETABLE · POWDER",
    title: "Ginger Powder",
    tagline: "Warm, zesty spice for drinks & cooking.",
    description:
      "Ginger root, dried and ground into a warm, zesty spice. Use it in teas, curries and baking whenever you want ginger flavour without peeling or grating.",
    tags: ["Vegetable", "Powder"],
    image: "/ginger_powder.png",
    imageAlt: "Ginger powder",
    usage: [
      { icon: "emoji_food_beverage", label: "Brew ginger tea" },
      { icon: "skillet", label: "Add to curries & stir-fries" },
      { icon: "cookie", label: "Bake into cookies & cakes" },
      { icon: "blender", label: "Mix into smoothies" },
    ],
    benefits: [
      "Warm, zesty spice",
      "No peeling or grating",
      "Easy to measure",
    ],
    tip: "A pinch with honey and hot water makes a quick ginger drink.",
  },
  {
    slug: "pumpkin-powder",
    tone: "leaf",
    badge: "VEGETABLE · POWDER",
    title: "Pumpkin Powder",
    tagline: "Earthy-sweet golden color & flavor.",
    description:
      "Pumpkin, dried and milled into a smooth golden powder. Add earthy-sweet flavour and warm colour to soups, breads and purées with no peeling, cutting or cooking.",
    tags: ["Vegetable", "Powder"],
    image: "/pumpkin_powder.png",
    imageAlt: "Golden pumpkin powder",
    gallery: [
      {
        src: "/pumpkin_powder.png",
        alt: "Mound of golden pumpkin powder on a plate",
      },
      {
        src: "/pumpkin_powder/pumpkin-powder-1.jpeg",
        alt: "Pumpkin powder in front of a kraft pouch with a clear window",
      },
      {
        src: "/pumpkin_powder/pumpkin-powder-2.jpeg",
        alt: "Pumpkin powder, closer front view",
      },
      {
        src: "/pumpkin_powder/pumpkin-powder-3.jpeg",
        alt: "Pumpkin powder heaped on a plate, with the filled pouch behind",
      },
    ],
    usage: [
      { icon: "soup_kitchen", label: "Stir into soups" },
      { icon: "bakery_dining", label: "Add to bread & pancake batter" },
      { icon: "child_care", label: "Make baby-food purées" },
      { icon: "ramen_dining", label: "Colour & flavour pasta dough" },
    ],
    benefits: [
      "Earthy-sweet taste",
      "Natural golden colour",
      "No peeling, cutting or cooking",
    ],
    tip: "Mix with warm water or milk for a quick pumpkin purée.",
  },
  {
    slug: "mango-peel-powder",
    tone: "brand",
    badge: "FRUIT · POWDER",
    title: "Mango Peel Powder",
    tagline: "Tangy, fruity powder from dehydrated mango peel.",
    description:
      "Mango peels, dehydrated and finely milled into a soft golden powder with a tangy, fruity flavour. Stir it into drinks, chutneys and bakes for a gentle mango note — nothing from the fruit goes to waste.",
    tags: ["Fruit", "Powder"],
    image: "/mango_peel_powder.jpeg",
    imageAlt: "Mound of golden mango peel powder on a plate",
    gallery: [
      {
        src: "/mango_peel_powder.jpeg",
        alt: "Mound of golden mango peel powder on a plate",
      },
      {
        src: "/mango_peel_powder/mango-peel-powder-1.jpeg",
        alt: "Mango peel powder in front of fresh mangoes and the Tropella backdrop",
      },
      {
        src: "/mango_peel_powder/mango-peel-powder-2.jpeg",
        alt: "Small mound of mango peel powder on a woven cloth, with the Tropella sign behind",
      },
      {
        src: "/mango_peel_powder/mango-peel-powder-3.jpeg",
        alt: "Mango peel powder heaped on a plate, closer view",
      },
    ],
    usage: [
      { icon: "blender", label: "Blend into smoothies" },
      { icon: "restaurant", label: "Season chutneys & dressings" },
      { icon: "bakery_dining", label: "Add to dough or batter" },
      { icon: "emoji_food_beverage", label: "Stir into warm drinks" },
    ],
    benefits: [
      "Tangy, fruity mango flavour",
      "Made from the whole fruit — less waste",
      "Easy to measure and store",
    ],
    tip: "Start with a teaspoon. The tangy flavour builds as it sits.",
  },
  {
    slug: "green-chili-powder",
    tone: "leaf",
    badge: "VEGETABLE · POWDER",
    title: "Green Chili Powder",
    tagline: "Fresh, grassy heat in a fine green powder.",
    description:
      "Green chilies, dried and ground into a fine powder that keeps their fresh, grassy heat. Add a kick to curries, marinades and snacks without chopping a single chili.",
    tags: ["Vegetable", "Powder"],
    image: "/green_chili_powder.jpeg",
    imageAlt: "Mound of green chili powder on a plate",
    gallery: [
      {
        src: "/green-chili/green-chili-1.jpeg",
        alt: "Green chili powder heaped in a clear dish",
      },
      {
        src: "/green-chili/green-chili-2.jpeg",
        alt: "Green chili powder, closer front view",
      },
      {
        src: "/green-chili/green-chili-3.jpeg",
        alt: "Green chili powder from a slightly lower angle",
      },
      {
        src: "/green-chili/green-chili-4.jpeg",
        alt: "Green chili powder in front of fresh green chilies and the Tropella backdrop",
      },
    ],
    usage: [
      { icon: "skillet", label: "Spice up curries & stir-fries" },
      { icon: "outdoor_grill", label: "Add to marinades & rubs" },
      { icon: "tapas", label: "Sprinkle on snacks & fries" },
      { icon: "soup_kitchen", label: "Season soups & dals" },
    ],
    benefits: [
      "Fresh green-chili heat and flavour",
      "No chopping, no stinging hands",
      "A pinch goes a long way",
    ],
    tip: "Add a pinch at a time. It's easy to add heat, hard to take it away.",
  },
  {
    slug: "onion-powder",
    tone: "leaf",
    badge: "VEGETABLE · POWDER",
    title: "Onion Powder",
    tagline: "Sweet, savoury onion flavour in a fine powder.",
    description:
      "Onions, dehydrated and finely milled into a soft powder that carries their sweet, savoury flavour. Season curries, soups and snacks in seconds — no peeling, chopping or teary eyes.",
    tags: ["Vegetable", "Powder"],
    image: "/onion_powder/onion_powder-4.jpeg",
    imageAlt: "Pink onion powder in a clear dish in front of fresh red onions",
    gallery: [
      {
        src: "/onion_powder/onion_powder-4.jpeg",
        alt: "Pink onion powder in a clear dish, seen from above, in front of fresh red onions and the Tropella sign",
      },
      {
        src: "/onion_powder/onion_powder.jpeg",
        alt: "Pale pink onion powder heaped in a clear dish",
      },
      {
        src: "/onion_powder/onion_powder_3.jpeg",
        alt: "Onion powder, closer front view",
      },
      {
        src: "/onion_powder/onion_powder_5.jpeg",
        alt: "Onion powder from a slightly lower angle",
      },
    ],
    usage: [
      { icon: "skillet", label: "Season curries & stir-fries" },
      { icon: "soup_kitchen", label: "Stir into soups & gravies" },
      { icon: "outdoor_grill", label: "Add to marinades & rubs" },
      { icon: "tapas", label: "Sprinkle on snacks & fries" },
    ],
    benefits: [
      "Sweet, savoury onion flavour",
      "No peeling, chopping or tears",
      "Blends evenly into any dish",
    ],
    tip: "Mix with a little water before adding to a hot pan so it doesn't clump.",
  },
  {
    slug: "lime-powder",
    tone: "brand",
    badge: "FRUIT · POWDER",
    title: "Lime Powder",
    tagline: "Bright, tangy citrus in a fine powder.",
    description:
      "Limes, dehydrated and finely milled into a soft, creamy powder with a bright, tangy citrus flavour. Add a fresh squeeze of lime to drinks, dressings and cooking — no fresh limes needed.",
    tags: ["Fruit", "Powder"],
    image: "/lime_powder/lime-powder-1.jpeg",
    imageAlt: "Mound of creamy lime powder on a plate",
    gallery: [
      {
        src: "/lime_powder/lime-powder-1.jpeg",
        alt: "Mound of creamy lime powder on a plate in front of the Tropella backdrop",
      },
      {
        src: "/lime_powder/lime-powder-2.jpeg",
        alt: "Lime powder, closer front view",
      },
      {
        src: "/lime_powder/lime-powder-3.jpeg",
        alt: "Lime powder in a round dish, seen from above",
      },
    ],
    usage: [
      { icon: "local_drink", label: "Mix into lemonade & cold drinks" },
      { icon: "restaurant", label: "Season dressings & chutneys" },
      { icon: "set_meal", label: "Sprinkle on fish & grilled meat" },
      { icon: "tapas", label: "Dust over fruit & snacks" },
    ],
    benefits: [
      "Bright, tangy lime flavour",
      "No squeezing or wasted limes",
      "Easy to measure and store",
    ],
    tip: "Start with half a teaspoon. Its tang is stronger than fresh juice.",
  },
];

export function getProduct(slug: string) {
  return PRODUCT_DETAILS.find((p) => p.slug === slug);
}
