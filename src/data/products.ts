import { Product, Review, Coupon } from "../types";

export const PRODUCTS: Product[] = [
  // --- Jewelry Category ---
  {
    id: "jewel-1",
    name: "Aura Gold Leaf Tear Drop Chain Necklace",
    category: "Jewelry",
    subCategory: "Necklaces",
    price: 7120,
    rating: 4.9,
    reviewCount: 42,
    image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1629224316810-9d8805b95e76?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?auto=format&fit=crop&w=800&q=80"
    ],
    description: "An elegant resin tear-drop necklace containing swirled liquid bronze pigments and 24k gold leaf flakes. Hand-polished to a glass-like finish, suspended on a solid 14k gold plated chain.",
    colors: ["Gold", "Bronze", "Clear"],
    keywords: ["gold leaf", "chains", "necklace", "elegant", "wedding", "glamorous", "resign"],
    stock: 14,
    theme: "Gold Elegance",
    occasion: "Anniversary",
    material: "14k Gold & Eco-Resin",
    dimensions: "18 in chain, 1.5 in pendant",
    isBestSeller: true
  },
  {
    id: "jewel-2",
    name: "Obsidian Core Silver Resin Chain",
    category: "Jewelry",
    subCategory: "Necklaces",
    price: 9200,
    rating: 4.8,
    reviewCount: 38,
    image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=800&q=80"
    ],
    description: "A dark, mesmerizing fluid-cast resin pendant with shimmering obsidian black base and embedded sterling silver foil chips, mimicking deep interstellar gravity lanes.",
    colors: ["Black", "Silver", "Clear"],
    keywords: ["black resin", "silver foil", "chain", "necklace", "unisex", "industrial", "resign"],
    stock: 8,
    theme: "Cosmic Shimmer",
    occasion: "Birthday",
    material: "Sterling Silver-Filled Chain & Pigmented Resin",
    dimensions: "20 in chain, 1.2 in pendant",
    isBestSeller: true
  },
  {
    id: "jewel-3",
    name: "Holographic Stardust Heavy Resin Bracelet",
    category: "Jewelry",
    subCategory: "Bracelets",
    price: 6000,
    rating: 4.7,
    reviewCount: 22,
    image: "https://images.unsplash.com/photo-1603561591411-07134e71a2a9?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1603561591411-07134e71a2a9?auto=format&fit=crop&w=800&q=80"
    ],
    description: "A solid, faceted statement bangle bracelet made entirely of scratch-resistant resin. Infused with shimmering holographic flakes and deep purple stardust pigments that dance in natural light.",
    colors: ["Purple", "Holographic", "Silver"],
    keywords: ["bracelet", "bangle", "purple resin", "holographic", "stardust", "glitter", "resign"],
    stock: 12,
    theme: "Cosmic Shimmer",
    occasion: "Birthday",
    material: "Premium Acrylic Resin & Holographic Dust",
    dimensions: "2.7 in Inner Diameter",
    isBestSeller: false
  },
  {
    id: "jewel-4",
    name: "Liquid Coral Gilded Resin Cuff",
    category: "Jewelry",
    subCategory: "Bracelets",
    price: 7600,
    rating: 4.9,
    reviewCount: 19,
    image: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&w=800&q=80"
    ],
    description: "A gorgeous open-cuff bracelet showcasing active swirls of coral orange and milk-white liquid resin accents. Embellished with solid gold leaf lining along the center ridge.",
    colors: ["Orange", "Gold", "White"],
    keywords: ["cuff", "bracelet", "coral", "bangle", "liquid art", "swirls", "resign"],
    stock: 10,
    theme: "Gold Elegance",
    occasion: "Mother's Day",
    material: "Fluid Art Resin & Gold Leaf Accent",
    dimensions: "Adjustable 2.5 in width",
    isBestSeller: false
  },

  // --- Home Decor Category ---
  {
    id: "decor-1",
    name: "Shimmering Ocean Tide Geode Wall Clock",
    category: "Home Decor",
    subCategory: "Clocks",
    price: 22400,
    rating: 4.9,
    reviewCount: 64,
    image: "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1569336415962-a4bd9f69cd83?auto=format&fit=crop&w=800&q=80"
    ],
    description: "A luxury wood-backed wall clock portraying a 3D ocean shoreline. Hand-poured with metallic gold lines, deep navy, vibrant turquoise swirled resin, real shore sand, and shimmering white frothy waves overlapping quartz crystal accents.",
    colors: ["Blue", "Turquoise", "Navy", "Gold"],
    keywords: ["ocean tide", "wall clock", "geode clock", "coastal", "aquatic", "large luxury", "resign"],
    stock: 5,
    theme: "Ocean Waves",
    occasion: "Housewarming",
    material: "Quartz Crystals, Sand, Pigments, Wood & Eco-Resin",
    dimensions: "16 in Diameter",
    isBestSeller: true
  },
  {
    id: "decor-2",
    name: "Aura Gilded Emerald Coasters (Set of 4)",
    category: "Home Decor",
    subCategory: "Coasters",
    price: 8800,
    rating: 5.0,
    reviewCount: 51,
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1604871000636-074fa5117945?auto=format&fit=crop&w=800&q=80"
    ],
    description: "Stunning hexagonal agate-style resin coasters featuring deep forest emerald swirls, high-clarity crystalline centers, and handpainted textured gold gilding along the raw organic edges.",
    colors: ["Emerald", "Green", "Gold"],
    keywords: ["coasters", "emerald", "gold leaf", "agate", "hexagon", "coffee table", "resign"],
    stock: 18,
    theme: "Gold Elegance",
    occasion: "Wedding",
    material: "Liquid Metal Gold & Tinted Resin",
    dimensions: "4.5 in across",
    isBestSeller: true
  },
  {
    id: "decor-3",
    name: "Luxe Deep Space Resin Mantel Clock",
    category: "Home Decor",
    subCategory: "Clocks",
    price: 15600,
    rating: 4.8,
    reviewCount: 22,
    image: "https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1549887534-1541e9326642?auto=format&fit=crop&w=800&q=80"
    ],
    description: "An elegant standing desk and mantel clock. Layered ultraviolet and midnight resin are swirled with pearl dust, capturing the movement of deep galaxies, detailed with brass hands.",
    colors: ["Purple", "Indigo", "Gold", "Ivory"],
    keywords: ["mantel clock", "table clock", "celestial", "space", "home decor", "resign"],
    stock: 3,
    theme: "Cosmic Shimmer",
    occasion: "Corporate Gift",
    material: "Layered Premium Resin, Solid Brass Feet, Pine Core",
    dimensions: "8 in x 8 in x 2 in",
    isBestSeller: false
  },

  // --- Accessories Category ---
  {
    id: "acc-1",
    name: "Liquid Sand Gold-Flaked Initial Keychain",
    category: "Accessories",
    subCategory: "Keychains",
    price: 2800,
    rating: 4.9,
    reviewCount: 110,
    image: "https://images.unsplash.com/photo-1582139329536-e7284fece509?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1582139329536-e7284fece509?auto=format&fit=crop&w=800&q=80"
    ],
    description: "Personalized high-gloss clear resin alphabet initial keychain containing layered gold flakes, pearl pigments, and a matching gold-plated solid steel trigger clasp.",
    colors: ["Gold", "Silver", "Clear"],
    keywords: ["keychain", "initial", "monogram", "keyring", "charm", "resign"],
    stock: 85,
    theme: "Gold Elegance",
    occasion: "Birthday",
    material: "24k Gold Flecks & Durable Hard Resin",
    dimensions: "1.8 in Height",
    isBestSeller: true
  },
  {
    id: "acc-2",
    name: "Copper-Swirl Automatic Chronometer Watch",
    category: "Accessories",
    subCategory: "Watches",
    price: 25600,
    rating: 4.8,
    reviewCount: 76,
    image: "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=800&q=80"
    ],
    description: "A prestigious automatic watch featuring an authentic hand-casted copper and obsidian resin swirled dial. Each timepiece dial is individual, housed in a surgical-grade steel bezel.",
    colors: ["Copper", "Black", "Steel"],
    keywords: ["watch", "automatic", "timepiece", "copper", "luxury accessories", "resign"],
    stock: 5,
    theme: "Cosmic Shimmer",
    occasion: "Promotion",
    material: "Surgical Steel, Genuine Leather & Artisan Resin Dial Inlay",
    dimensions: "42mm Dial, 20mm Strap",
    isBestSeller: true
  },
  {
    id: "acc-3",
    name: "Terrazzo Golden Swirl Apple Watch Band",
    category: "Accessories",
    subCategory: "Watches",
    price: 5200,
    rating: 4.7,
    reviewCount: 33,
    image: "https://images.unsplash.com/photo-1601597111158-2fceff270190?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1601597111158-2fceff270190?auto=format&fit=crop&w=800&q=80"
    ],
    description: "Hand-linked premium resin smart watch strap. Gorgeous off-white terrazzo fragments meticulously cast with copper specks for smooth, light, stylish executive wristwear.",
    colors: ["Beige", "White", "Rose Gold"],
    keywords: ["watch band", "apple watch", "strap", "terrazzo", "copper flakes", "resign"],
    stock: 30,
    theme: "Beige Aesthetics",
    occasion: "Self Gift",
    material: "High-Tactility Resin Links & Stainless Gold Pin Buckle",
    dimensions: "Compatible with 38mm-45mm Smartwatches",
    isBestSeller: false
  },

  // --- Personalized Gifts Category ---
  {
    id: "gift-1",
    name: "Walnut Live-Edge Midnight River Table Clock",
    category: "Personalized Gifts",
    subCategory: "Clocks",
    price: 19200,
    rating: 5.0,
    reviewCount: 29,
    image: "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80"
    ],
    description: "A gorgeous desk mantel clock made from kiln-dried black walnut live-edge wood. The middle gap is bonded with swirled midnight blue and copper-gold metallic resin river pouring, personalized with lasered initials or family names.",
    colors: ["Brown", "Midnight Blue", "Gold"],
    keywords: ["river table", "clock", "walnut wood", "epoxy river", "name desk", "resin clock", "resign"],
    stock: 4,
    theme: "Gold Swirl & Wood",
    occasion: "Housewarming",
    material: "Solid Live-Edge Walnut & Metallic Fluid Resin",
    dimensions: "10 in x 10 in x 1.5 in",
    isBestSeller: true
  },
  {
    id: "gift-2",
    name: "Executive Gilded Desk Name Plate",
    category: "Personalized Gifts",
    subCategory: "Name Plates",
    price: 14400,
    rating: 4.9,
    reviewCount: 17,
    image: "https://images.unsplash.com/photo-1507208773393-40016562cede?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1507208773393-40016562cede?auto=format&fit=crop&w=800&q=80"
    ],
    description: "Charred live-edge pine desk block bonded seamlessly with pearlescent white and real gold-dust resin, finished with custom metallic letters embedded deep inside the high-gloss resin core.",
    colors: ["Brown", "White", "Gold"],
    keywords: ["name plate", "desk sign", "personalized office", "luxury river", "pine wood", "resign"],
    stock: 12,
    theme: "Gold Swirl & Wood",
    occasion: "Promotion",
    material: "Sovereign Charred Pine Wood & Premium Dense Resin",
    dimensions: "12 in x 4 in x 1.2 in",
    isBestSeller: false
  },
  {
    id: "gift-3",
    name: "Aura Ocean Wave Custom Keychain Suite",
    category: "Personalized Gifts",
    subCategory: "Keychains",
    price: 3920,
    rating: 4.9,
    reviewCount: 21,
    image: "https://images.unsplash.com/photo-1490750967868-88aa4486c946?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1490750967868-88aa4486c946?auto=format&fit=crop&w=800&q=80"
    ],
    description: "A premium matched couple's keyring set. Recreates a tiny turquoise coastal shore with realistic frothy white waves pouring over deep blue, with personalized side-by-side engraved initials.",
    colors: ["Turquoise", "Navy", "Gold"],
    keywords: ["keychain", "couples keychain", "ocean waves", "custom letters", "marine art", "resign"],
    stock: 15,
    theme: "Ocean Waves",
    occasion: "Anniversary",
    material: "Insured Marine Pigments, Real Micro Sand, Stainless Rings",
    dimensions: "1.5 in diameter per charm",
    isBestSeller: false
  }
];

export const REVIEWS: Review[] = [
  {
    id: "rev-1",
    userName: "Evelyn Sterling",
    rating: 5,
    date: "2026-05-18",
    comment: "The Ocean Tide Geode Wall Clock is an absolute spectacular masterpiece! The depth in the ocean waves is unbelievable, and the resin gloss is so deep, it literally looks like liquid water. Cleanest luxury packaging.",
    verified: true,
    productName: "Shimmering Ocean Tide Geode Wall Clock"
  },
  {
    id: "rev-2",
    userName: "Julian Vance",
    rating: 5,
    date: "2026-06-02",
    comment: "Bought the obsidian silver chain for my brother's birthday. The interstellar swirls are captured perfectly, zero micro-bubbles, and high-quality durable clasp. Resin Aura is unmatched!",
    verified: true,
    productName: "Obsidian Core Silver Resin Chain"
  },
  {
    id: "rev-3",
    userName: "Charlotte Montgomery",
    rating: 5,
    date: "2026-06-08",
    comment: "I order the custom Walnut Table Clock with our engraved initials. Breathtaking details. The blue swirled river epoxy is glassy and pristine. Highly recommend!",
    verified: true,
    productName: "Walnut Live-Edge Midnight River Table Clock"
  },
  {
    id: "rev-4",
    userName: "Sienna Lockhart",
    rating: 5,
    date: "2026-04-20",
    comment: "The emerald gold coasters are gorgeous. The green swirls look exactly like real raw mineral slices and the liquid gold edging adds a premium brilliance. Elegant business storefront!",
    verified: true,
    productName: "Aura Gilded Emerald Coasters (Set of 4)"
  }
];

export const COUPONS: Coupon[] = [
  {
    code: "AURA15",
    discount: 15,
    expiry: "2026-08-31",
    minSpend: 8000,
    description: "15% OFF on premium watches & geode clocks. Min spend ₹8,000."
  },
  {
    code: "LUXURY30",
    discount: 30,
    expiry: "2026-12-31",
    minSpend: 24000,
    description: "Exclusive 30% OFF on elite customized wood-resin river clocks and masterpieces. Min spend ₹24,000."
  },
  {
    code: "WELCOME10",
    discount: 10,
    expiry: "2026-07-31",
    minSpend: 0,
    description: "Get 10% OFF on your first resin order from Resin Aura. No minimum spend."
  }
];
