import { createContext, useCallback, useContext, useMemo } from 'react'
import useLocalStorage from '../hooks/useLocalStorage'
import { productBySlug } from '../data/products'

const CartContext = createContext(null)
const MAX_QTY = 10

// The cart only stores { slug, qty }. Product data is always read fresh from the
// catalogue, so stale prices never linger in storage.
export function CartProvider({ children }) {
  const [lines, setLines] = useLocalStorage('swarnika:cart:v1', [])

  const addItem = useCallback(
    (slug, qty = 1) =>
      setLines((prev) => {
        const found = prev.find((l) => l.slug === slug)
        if (found) return prev.map((l) => (l.slug === slug ? { ...l, qty: Math.min(MAX_QTY, l.qty + qty) } : l))
        return [...prev, { slug, qty: Math.min(MAX_QTY, qty) }]
      }),
    [setLines],
  )
  const removeItem = useCallback((slug) => setLines((prev) => prev.filter((l) => l.slug !== slug)), [setLines])
  const setQty = useCallback(
    (slug, qty) =>
      setLines((prev) =>
        qty < 1 ? prev.filter((l) => l.slug !== slug) : prev.map((l) => (l.slug === slug ? { ...l, qty: Math.min(MAX_QTY, qty) } : l)),
      ),
    [setLines],
  )
  const clear = useCallback(() => setLines([]), [setLines])

  const value = useMemo(() => {
    const items = (Array.isArray(lines) ? lines : [])
      .map((l) => ({ product: productBySlug[l.slug], qty: l.qty }))
      .filter((l) => l.product)
    return {
      items,
      count: items.reduce((n, l) => n + l.qty, 0),
      subtotal: items.reduce((n, l) => n + l.qty * l.product.price, 0),
      has: (slug) => items.some((l) => l.product.slug === slug),
      addItem,
      removeItem,
      setQty,
      clear,
      MAX_QTY,
    }
  }, [lines, addItem, removeItem, setQty, clear])

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export const useCart = () => useContext(CartContext)
