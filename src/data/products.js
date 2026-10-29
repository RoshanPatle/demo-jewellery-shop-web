// DEMONSTRATION CATALOGUE.
// Prices, purity and weights below are sample values so the storefront can be
// shown end-to-end. Replace with the showroom's real catalogue before launch.
// `images` can be local paths (as now) or full URLs to real photography.

const img = (slug) => [1, 2, 3].map((n) => `/images/products/${slug}-${n}.svg`)

export const products = [
  {
    slug: 'traditional-gold-necklace',
    name: 'Traditional Gold Necklace',
    category: 'necklaces',
    type: 'Traditional',
    purity: '22K',
    weight: 32.5,
    price: 358000,
    images: img('traditional-gold-necklace'),
    description:
      'A layered necklace with graceful beadwork, ruby-toned stone accents and a teardrop pendant, inspired by classic South Indian temple jewellery.',
    featured: true,
  },
  {
    slug: 'antique-gold-jhumkas',
    name: 'Antique Gold Jhumkas',
    category: 'earrings',
    type: 'Antique',
    purity: '22K',
    weight: 14.2,
    price: 158500,
    images: img('antique-gold-jhumkas'),
    description:
      'Dome-shaped jhumkas with a soft antique finish, scalloped edge and pearl-style drops. A timeless pair for festivals and weddings.',
    featured: true,
  },
  {
    slug: 'classic-gold-bangles',
    name: 'Classic Gold Bangles (Set of 2)',
    category: 'bangles',
    type: 'Classic',
    purity: '22K',
    weight: 28,
    price: 312000,
    images: img('classic-gold-bangles'),
    description:
      'Smooth-finish gold bangles with fine engraved detailing along the edges. Designed to stack beautifully or be worn on their own.',
    featured: true,
  },
  {
    slug: 'everyday-gold-chain',
    name: 'Everyday Gold Chain',
    category: 'chains',
    type: 'Daily wear',
    purity: '22K',
    weight: 8.6,
    price: 96500,
    images: img('everyday-gold-chain'),
    description:
      'A lightweight oval-link chain made for daily wear. Sits comfortably on its own or carries a favourite pendant.',
    featured: true,
  },
  {
    slug: 'floral-gold-pendant',
    name: 'Floral Gold Pendant',
    category: 'necklaces',
    type: 'Daily wear',
    purity: '22K',
    weight: 6.2,
    price: 72800,
    images: img('floral-gold-pendant'),
    description:
      'An eight-petal floral pendant with a central ruby-toned stone and fine pearl-style accents, suspended on a delicate chain.',
    featured: true,
  },
  {
    slug: 'gold-haram',
    name: 'Gold Haram',
    category: 'bridal',
    type: 'Bridal',
    purity: '22K',
    weight: 58,
    price: 645000,
    images: img('gold-haram'),
    description:
      'A long, two-strand haram with graduated medallions and a statement pendant. A heirloom-style piece for weddings and celebrations.',
    featured: true,
  },
  {
    slug: 'elegant-gold-ring',
    name: 'Elegant Gold Ring',
    category: 'rings',
    type: 'Contemporary',
    purity: '22K',
    weight: 4.8,
    price: 54900,
    images: img('elegant-gold-ring'),
    description:
      'A floral cocktail ring with a polished band and a ruby-toned centre stone. Elegant enough for occasions, comfortable enough for regular wear.',
    featured: true,
  },
  {
    slug: 'contemporary-gold-bracelet',
    name: 'Contemporary Gold Bracelet',
    category: 'bangles',
    type: 'Contemporary',
    purity: '18K',
    weight: 9.4,
    price: 88600,
    images: img('contemporary-gold-bracelet'),
    description:
      'A modern link bracelet with softly rounded segments and a single stone accent. Light on the wrist with a refined, minimal look.',
    featured: true,
  },
  {
    slug: 'gold-stud-earrings',
    name: 'Gold Floral Stud Earrings',
    category: 'earrings',
    type: 'Daily wear',
    purity: '22K',
    weight: 3.2,
    price: 38500,
    images: img('gold-stud-earrings'),
    description:
      'Petite floral studs with ruby-toned centres and a pearl-style drop. Easy to wear from morning to evening.',
  },
  {
    slug: 'bridal-gold-choker-set',
    name: 'Bridal Gold Necklace Set',
    category: 'bridal',
    type: 'Bridal',
    purity: '22K',
    weight: 64,
    price: 725000,
    images: img('bridal-gold-choker-set'),
    description:
      'A complete bridal set with a layered necklace, matching jhumkas and a maang tikka, designed to be worn together on the wedding day.',
  },
  {
    slug: 'gold-rope-chain',
    name: 'Gold Rope Chain',
    category: 'chains',
    type: 'Classic',
    purity: '22K',
    weight: 12,
    price: 132000,
    images: img('gold-rope-chain'),
    description:
      'A solid twisted rope chain with a rich, lustrous finish. A confident everyday classic for men and women.',
  },
  {
    slug: 'antique-gold-kada',
    name: 'Antique Gold Kada',
    category: 'bangles',
    type: 'Antique',
    purity: '22K',
    weight: 26,
    price: 289000,
    images: img('antique-gold-kada'),
    description:
      'A broad kada with a textured antique finish and two stone-set accents. A statement piece for festive and bridal looks.',
  },
]

export const productBySlug = Object.fromEntries(products.map((p) => [p.slug, p]))

export const purities = ['22K', '18K']
export const productTypes = [...new Set(products.map((p) => p.type))].sort()
export const priceBounds = {
  min: Math.min(...products.map((p) => p.price)),
  max: Math.max(...products.map((p) => p.price)),
}

export const priceRanges = [
  { id: 'under-1', label: 'Under ₹1,00,000', min: 0, max: 100000 },
  { id: '1-3', label: '₹1,00,000 – ₹3,00,000', min: 100000, max: 300000 },
  { id: '3-5', label: '₹3,00,000 – ₹5,00,000', min: 300000, max: 500000 },
  { id: 'over-5', label: 'Above ₹5,00,000', min: 500000, max: Infinity },
]

export const careInstructions = [
  'Store each piece separately in a soft pouch to avoid scratches.',
  'Put jewellery on after perfume, cosmetics and hair products.',
  'Remove before swimming, bathing or heavy exercise.',
  'Clean gently with a soft cloth; ask your jeweller about professional cleaning.',
]
