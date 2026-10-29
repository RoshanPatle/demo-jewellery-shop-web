import { createContext, useCallback, useContext, useMemo } from 'react'
import useLocalStorage from '../hooks/useLocalStorage'
import { productBySlug } from '../data/products'

const WishlistContext = createContext(null)

export function WishlistProvider({ children }) {
  const [slugs, setSlugs] = useLocalStorage('swarnika:wishlist:v1', [])

  const toggle = useCallback(
    (slug) => setSlugs((prev) => (prev.includes(slug) ? prev.filter((s) => s !== slug) : [...prev, slug])),
    [setSlugs],
  )
  const remove = useCallback((slug) => setSlugs((prev) => prev.filter((s) => s !== slug)), [setSlugs])

  const value = useMemo(() => {
    const valid = (Array.isArray(slugs) ? slugs : []).filter((s) => productBySlug[s])
    const set = new Set(valid)
    return {
      items: valid.map((s) => productBySlug[s]),
      count: valid.length,
      has: (slug) => set.has(slug),
      toggle,
      remove,
    }
  }, [slugs, toggle, remove])

  return <WishlistContext.Provider value={value}>{children}</WishlistContext.Provider>
}

export const useWishlist = () => useContext(WishlistContext)
