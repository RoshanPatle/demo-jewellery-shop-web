export const categories = [
  {
    slug: 'necklaces',
    name: 'Gold Necklaces',
    short: 'Necklaces',
    image: '/images/categories/necklaces.svg',
    blurb: 'Layered, temple and everyday necklaces.',
  },
  {
    slug: 'earrings',
    name: 'Gold Earrings',
    short: 'Earrings',
    image: '/images/categories/earrings.svg',
    blurb: 'Jhumkas, studs and statement drops.',
  },
  {
    slug: 'bangles',
    name: 'Gold Bangles',
    short: 'Bangles',
    image: '/images/categories/bangles.svg',
    blurb: 'Bangles, kadas and bracelets.',
  },
  {
    slug: 'chains',
    name: 'Gold Chains',
    short: 'Chains',
    image: '/images/categories/chains.svg',
    blurb: 'Classic links and rope chains.',
  },
  {
    slug: 'rings',
    name: 'Gold Rings',
    short: 'Rings',
    image: '/images/categories/rings.svg',
    blurb: 'Floral and contemporary rings.',
  },
  {
    slug: 'bridal',
    name: 'Bridal Gold Jewellery',
    short: 'Bridal',
    image: '/images/categories/bridal.svg',
    blurb: 'Harams, chokers and wedding sets.',
  },
]

export const categoryBySlug = Object.fromEntries(categories.map((c) => [c.slug, c]))
