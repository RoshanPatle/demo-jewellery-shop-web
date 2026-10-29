import { useMemo, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { Search, X } from 'lucide-react'
import Img from './Img'
import { categories } from '../data/categories'
import { searchProducts } from '../lib/catalog'
import { formatINR } from '../config/site'
import { useBodyLock, useFocusTrap } from '../hooks/useUi'

export default function SearchOverlay({ open, onClose }) {
  const [q, setQ] = useState('')
  const panel = useRef(null)
  const navigate = useNavigate()
  const reduce = useReducedMotion()

  useBodyLock(open)
  useFocusTrap(panel, open, onClose)

  const results = useMemo(() => (q.trim() ? searchProducts(q) : []), [q])

  const submit = (e) => {
    e.preventDefault()
    const term = q.trim()
    onClose()
    navigate(term ? `/shop?q=${encodeURIComponent(term)}` : '/shop')
  }

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[90]">
          <motion.div
            className="absolute inset-0 bg-ink/30"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduce ? 0 : 0.18 }}
            onClick={onClose}
            aria-hidden="true"
          />
          <motion.div
            ref={panel}
            role="dialog"
            aria-modal="true"
            aria-label="Search jewellery"
            className="relative mx-auto flex max-h-[100dvh] w-full flex-col border-b border-line bg-ivory shadow-lift sm:max-w-3xl sm:rounded-b-3xl sm:border-x"
            initial={reduce ? { opacity: 0 } : { y: -24, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={reduce ? { opacity: 0 } : { y: -24, opacity: 0 }}
            transition={{ duration: reduce ? 0 : 0.22, ease: [0.22, 1, 0.36, 1] }}
          >
            <form onSubmit={submit} role="search" className="flex items-center gap-2 border-b border-line px-4 py-3 sm:px-6">
              <label htmlFor="site-search" className="sr-only">
                Search by product name or category
              </label>
              <Search className="h-5 w-5 shrink-0 text-gold-deep" aria-hidden="true" />
              <input
                id="site-search"
                data-autofocus
                type="search"
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search necklaces, jhumkas, bangles…"
                autoComplete="off"
                enterKeyHint="search"
                className="h-12 min-w-0 flex-1 bg-transparent text-[17px] text-ink placeholder:text-muted/70 focus:outline-none"
              />
              <button type="button" onClick={onClose} aria-label="Close search" className="icon-btn -mr-2">
                <X className="h-6 w-6" aria-hidden="true" />
              </button>
            </form>

            <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-4 py-5 sm:px-6">
              {q.trim() ? (
                results.length ? (
                  <>
                    <p className="mb-3 text-sm text-muted" aria-live="polite">
                      {results.length} {results.length === 1 ? 'match' : 'matches'}
                    </p>
                    <ul className="divide-y divide-line">
                      {results.slice(0, 6).map((p) => (
                        <li key={p.slug}>
                          <Link to={`/product/${p.slug}`} onClick={onClose} className="flex items-center gap-4 py-3 active:bg-cream">
                            <Img src={p.images[0]} alt="" ratio="1 / 1" className="h-16 w-16 shrink-0 rounded-lg" sizes="64px" />
                            <span className="min-w-0 flex-1">
                              <span className="block truncate font-serif text-lg font-semibold">{p.name}</span>
                              <span className="block text-sm text-muted">
                                {p.purity} · {p.weight} g
                              </span>
                            </span>
                            <span className="shrink-0 text-sm font-semibold">{formatINR(p.price)}</span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                    <button type="submit" onClick={submit} className="btn-primary mt-4 w-full">
                      See all {results.length} results
                    </button>
                  </>
                ) : (
                  <p className="py-8 text-center text-muted" aria-live="polite">
                    No jewellery found for “{q.trim()}”. Try “necklace”, “bangles” or “bridal”.
                  </p>
                )
              ) : (
                <>
                  <p className="eyebrow mb-3">Popular categories</p>
                  <ul className="flex flex-wrap gap-2">
                    {categories.map((c) => (
                      <li key={c.slug}>
                        <Link
                          to={`/shop/${c.slug}`}
                          onClick={onClose}
                          className="inline-flex min-h-[44px] items-center rounded-full border border-line bg-white px-4 text-sm font-medium transition-colors hover:border-gold hover:bg-cream"
                        >
                          {c.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
