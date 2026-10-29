import { products } from '../data/products'
import { categoryBySlug } from '../data/categories'

const norm = (s) => s.toLowerCase().trim()

// Light synonym handling so "necklace" matches "Gold Necklaces" and "bangle" matches kada/bracelet.
const synonyms = {
  jhumka: ['jhumka', 'jhumkas', 'earring', 'earrings'],
  haram: ['haram', 'necklace', 'bridal'],
  kada: ['kada', 'bangle', 'bangles', 'bracelet'],
  bracelet: ['bracelet', 'bangle', 'bangles'],
}

function haystack(p) {
  const cat = categoryBySlug[p.category]
  return norm([p.name, p.type, p.purity, cat?.name, cat?.short, p.category].join(' '))
}

export function searchProducts(query, list = products) {
  const terms = norm(query).split(/\s+/).filter(Boolean)
  if (!terms.length) return list
  return list.filter((p) => {
    const h = haystack(p)
    return terms.every((t) => {
      const stem = t.length > 3 ? t.replace(/(es|s)$/, '') : t
      if (h.includes(t) || h.includes(stem)) return true
      return Object.entries(synonyms).some(([k, alts]) => (t.startsWith(k) || alts.includes(t)) && alts.some((a) => h.includes(a.replace(/s$/, ''))))
    })
  })
}

export const sorters = {
  featured: null,
  'price-asc': (a, b) => a.price - b.price,
  'price-desc': (a, b) => b.price - a.price,
  alpha: (a, b) => a.name.localeCompare(b.name),
}

export const sortOptions = [
  { value: 'featured', label: 'Featured' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'alpha', label: 'Alphabetical (A–Z)' },
]
