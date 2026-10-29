import { useMemo, useRef, useState } from 'react'
import { Link, useNavigate, useParams, useSearchParams } from 'react-router-dom'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { Search, SlidersHorizontal, X } from 'lucide-react'
import ProductCard from '../components/ProductCard'
import { categories, categoryBySlug } from '../data/categories'
import { priceRanges, productTypes, products, purities } from '../data/products'
import { searchProducts, sortOptions, sorters } from '../lib/catalog'
import { useBodyLock, useFocusTrap, usePageTitle } from '../hooks/useUi'

const csv = (v) => (v || '').split(',').filter(Boolean)

function applyFilters(list, { cat, q, price, purity, type, sort }) {
  let out = list
  if (cat) out = out.filter((p) => p.category === cat)
  if (q.trim()) out = searchProducts(q, out)
  if (price) {
    const r = priceRanges.find((x) => x.id === price)
    if (r) out = out.filter((p) => p.price >= r.min && p.price < r.max)
  }
  if (purity.length) out = out.filter((p) => purity.includes(p.purity))
  if (type.length) out = out.filter((p) => type.includes(p.type))
  const s = sorters[sort]
  return s ? [...out].sort(s) : out
}

const optionRow =
  'flex min-h-[44px] cursor-pointer items-center gap-3 rounded-lg px-1 text-[15px] text-ink active:bg-cream [&:has(:focus-visible)]:outline [&:has(:focus-visible)]:outline-2 [&:has(:focus-visible)]:outline-gold-deep'
const inputCls = 'h-5 w-5 shrink-0 accent-[#876B31]'

function FilterGroups({ state, counts, onCategory, onPrice, onToggle }) {
  return (
    <div className="space-y-6">
      <fieldset>
        <legend className="mb-1 font-serif text-xl font-semibold">Category</legend>
        <label className={optionRow}>
          <input type="radio" name="category" className={inputCls} checked={!state.cat} onChange={() => onCategory('')} />
          <span className="flex-1">All jewellery</span>
          <span className="text-sm text-muted">{counts.all}</span>
        </label>
        {categories.map((c) => (
          <label key={c.slug} className={optionRow}>
            <input type="radio" name="category" className={inputCls} checked={state.cat === c.slug} onChange={() => onCategory(c.slug)} />
            <span className="flex-1">{c.name}</span>
            <span className="text-sm text-muted">{counts[c.slug] ?? 0}</span>
          </label>
        ))}
      </fieldset>

      <fieldset>
        <legend className="mb-1 font-serif text-xl font-semibold">Price</legend>
        <label className={optionRow}>
          <input type="radio" name="price" className={inputCls} checked={!state.price} onChange={() => onPrice('')} />
          Any price
        </label>
        {priceRanges.map((r) => (
          <label key={r.id} className={optionRow}>
            <input type="radio" name="price" className={inputCls} checked={state.price === r.id} onChange={() => onPrice(r.id)} />
            {r.label}
          </label>
        ))}
        <p className="mt-1 px-1 text-xs text-muted">Indicative sample prices.</p>
      </fieldset>

      <fieldset>
        <legend className="mb-1 font-serif text-xl font-semibold">Gold purity</legend>
        {purities.map((p) => (
          <label key={p} className={optionRow}>
            <input type="checkbox" className={inputCls} checked={state.purity.includes(p)} onChange={() => onToggle('purity', p)} />
            {p}
          </label>
        ))}
      </fieldset>

      <fieldset>
        <legend className="mb-1 font-serif text-xl font-semibold">Type</legend>
        {productTypes.map((t) => (
          <label key={t} className={optionRow}>
            <input type="checkbox" className={inputCls} checked={state.type.includes(t)} onChange={() => onToggle('type', t)} />
            {t}
          </label>
        ))}
      </fieldset>
    </div>
  )
}

function FilterSheet({ open, onClose, resultCount, onReset, children }) {
  const ref = useRef(null)
  const reduce = useReducedMotion()
  useBodyLock(open)
  useFocusTrap(ref, open, onClose)

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[80] lg:hidden">
          <motion.div
            className="absolute inset-0 bg-ink/30"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            aria-hidden="true"
          />
          <motion.div
            ref={ref}
            role="dialog"
            aria-modal="true"
            aria-label="Filter jewellery"
            className="absolute inset-x-0 bottom-0 mx-auto flex max-h-[88dvh] w-full max-w-xl flex-col rounded-t-3xl border border-b-0 border-line bg-ivory shadow-lift"
            initial={reduce ? { opacity: 0 } : { y: '100%' }}
            animate={reduce ? { opacity: 1 } : { y: 0 }}
            exit={reduce ? { opacity: 0 } : { y: '100%' }}
            transition={{ duration: reduce ? 0 : 0.28, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex shrink-0 items-center justify-between border-b border-line px-5 py-2">
              <h2 className="font-serif text-2xl font-semibold">Filters</h2>
              <button type="button" onClick={onClose} aria-label="Close filters" className="icon-btn -mr-2" data-autofocus>
                <X className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>
            <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-5 py-5">{children}</div>
            <div className="flex shrink-0 gap-3 border-t border-line bg-ivory px-5 pt-3 pb-safe">
              <button type="button" onClick={onReset} className="btn-soft flex-1">
                Reset
              </button>
              <button type="button" onClick={onClose} className="btn-primary flex-[2]">
                Show {resultCount} {resultCount === 1 ? 'piece' : 'pieces'}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}

export default function Shop() {
  const { slug } = useParams()
  const navigate = useNavigate()
  const [sp, setSp] = useSearchParams()
  const [sheet, setSheet] = useState(false)

  const category = slug ? categoryBySlug[slug] : null
  const state = {
    cat: category ? category.slug : '',
    q: sp.get('q') || '',
    price: sp.get('price') || '',
    purity: csv(sp.get('purity')),
    type: csv(sp.get('type')),
    sort: sorters[sp.get('sort')] !== undefined ? sp.get('sort') : 'featured',
  }

  usePageTitle(category ? category.name : state.q ? `Search: ${state.q}` : 'Gold Jewellery')

  const patch = (changes) => {
    const next = new URLSearchParams(sp)
    Object.entries(changes).forEach(([k, v]) => {
      const val = Array.isArray(v) ? v.join(',') : v
      if (!val || val === 'featured') next.delete(k)
      else next.set(k, val)
    })
    setSp(next, { replace: true })
  }
  const toggle = (key, value) => {
    const cur = state[key]
    patch({ [key]: cur.includes(value) ? cur.filter((v) => v !== value) : [...cur, value] })
  }
  const setCategory = (s) => navigate({ pathname: s ? `/shop/${s}` : '/shop', search: sp.toString() ? `?${sp}` : '' }, { replace: true })
  const reset = () => navigate('/shop', { replace: true })

  const results = useMemo(() => applyFilters(products, state), [slug, sp]) // eslint-disable-line react-hooks/exhaustive-deps

  const counts = useMemo(() => {
    const base = applyFilters(products, { ...state, cat: '', sort: 'featured' })
    const c = { all: base.length }
    base.forEach((p) => (c[p.category] = (c[p.category] || 0) + 1))
    return c
  }, [slug, sp]) // eslint-disable-line react-hooks/exhaustive-deps

  const activeChips = [
    ...(category ? [{ key: 'cat', label: category.name, clear: () => setCategory('') }] : []),
    ...(state.q ? [{ key: 'q', label: `“${state.q}”`, clear: () => patch({ q: '' }) }] : []),
    ...(state.price ? [{ key: 'price', label: priceRanges.find((r) => r.id === state.price)?.label, clear: () => patch({ price: '' }) }] : []),
    ...state.purity.map((p) => ({ key: `purity-${p}`, label: p, clear: () => toggle('purity', p) })),
    ...state.type.map((t) => ({ key: `type-${t}`, label: t, clear: () => toggle('type', t) })),
  ]
  const filterCount = activeChips.filter((c) => c.key !== 'q').length

  if (slug && !category) {
    return (
      <div className="container-page py-20 text-center">
        <h1 className="h-section">Collection not found</h1>
        <p className="mt-3 text-muted">We couldn&rsquo;t find that jewellery collection.</p>
        <Link to="/shop" className="btn-primary mt-6">
          Browse all jewellery
        </Link>
      </div>
    )
  }

  const filters = <FilterGroups state={state} counts={counts} onCategory={setCategory} onPrice={(v) => patch({ price: v })} onToggle={toggle} />

  return (
    <div className="container-page py-8 sm:py-12 lg:py-14">
      <header className="mb-6 sm:mb-8">
        <p className="eyebrow mb-2">{category ? 'Collection' : 'The collection'}</p>
        <h1 className="h-section">{category ? category.name : 'All Gold Jewellery'}</h1>
        <p className="mt-2 max-w-2xl text-[16px] text-muted">
          {category ? category.blurb : 'Search and filter by category, purity and price.'} Prices are indicative samples; message us for the latest rate.
        </p>
      </header>

      <div className="lg:grid lg:grid-cols-[272px_1fr] lg:gap-10 xl:grid-cols-[288px_1fr] xl:gap-12">
        <aside className="hidden lg:block" aria-label="Filters">
          <div className="card sticky top-24 max-h-[calc(100dvh-7rem)] overflow-y-auto p-5 xl:top-28">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="font-serif text-2xl font-semibold">Filters</h2>
              {(filterCount > 0 || state.q) && (
                <button type="button" onClick={reset} className="min-h-[44px] px-1 text-sm font-semibold text-gold-deep hover:underline">
                  Reset all
                </button>
              )}
            </div>
            {filters}
          </div>
        </aside>

        <div className="min-w-0">
          <form role="search" onSubmit={(e) => e.preventDefault()} className="relative">
            <label htmlFor="shop-search" className="sr-only">
              Search by name or category
            </label>
            <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gold-deep" aria-hidden="true" />
            <input
              id="shop-search"
              type="search"
              value={state.q}
              onChange={(e) => patch({ q: e.target.value })}
              placeholder="Search by name or category"
              className="field !pl-12"
              autoComplete="off"
              enterKeyHint="search"
            />
          </form>

          <div className="mt-3 flex items-center gap-3">
            <button type="button" onClick={() => setSheet(true)} className="btn-soft relative !min-h-[48px] shrink-0 !px-4 lg:hidden" aria-haspopup="dialog">
              <SlidersHorizontal className="h-[18px] w-[18px] text-gold-deep" aria-hidden="true" />
              Filters
              {filterCount > 0 && (
                <span className="flex h-5 min-w-[20px] items-center justify-center rounded-full bg-gold-deep px-1.5 text-xs font-semibold text-white">{filterCount}</span>
              )}
            </button>

            <p className="hidden flex-1 text-sm text-muted sm:block" aria-live="polite">
              Showing {results.length} {results.length === 1 ? 'piece' : 'pieces'}
            </p>

            <div className="ml-auto flex min-w-0 flex-1 items-center gap-2 sm:flex-none">
              <label htmlFor="sort" className="sr-only sm:not-sr-only sm:text-sm sm:text-muted">
                Sort by
              </label>
              <select
                id="sort"
                value={state.sort}
                onChange={(e) => patch({ sort: e.target.value })}
                className="field min-h-[48px] !w-full cursor-pointer !px-3 text-[15px] sm:!w-56"
              >
                {sortOptions.map((o) => (
                  <option key={o.value} value={o.value}>
                    {o.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <p className="mt-3 text-sm text-muted sm:hidden" aria-live="polite">
            Showing {results.length} {results.length === 1 ? 'piece' : 'pieces'}
          </p>

          {activeChips.length > 0 && (
            <ul className="mt-3 flex flex-wrap gap-2" aria-label="Active filters">
              {activeChips.map((c) => (
                <li key={c.key}>
                  <button
                    type="button"
                    onClick={c.clear}
                    aria-label={`Remove filter ${c.label}`}
                    className="inline-flex min-h-[40px] items-center gap-1.5 rounded-full border border-line bg-white py-1 pl-3.5 pr-2.5 text-sm hover:border-gold"
                  >
                    {c.label}
                    <X className="h-3.5 w-3.5 text-gold-deep" aria-hidden="true" />
                  </button>
                </li>
              ))}
              <li>
                <button type="button" onClick={reset} className="min-h-[40px] px-2 text-sm font-semibold text-gold-deep hover:underline">
                  Clear all
                </button>
              </li>
            </ul>
          )}

          {results.length ? (
            <ul className="mt-5 grid grid-cols-2 gap-3 sm:gap-5 md:grid-cols-3 3xl:grid-cols-4">
              {results.map((p) => (
                <li key={p.slug}>
                  <ProductCard product={p} />
                </li>
              ))}
            </ul>
          ) : (
            <div className="mt-8 rounded-3xl border border-dashed border-line bg-cream/60 px-6 py-14 text-center">
              <h2 className="font-serif text-2xl font-semibold">No matching jewellery</h2>
              <p className="mx-auto mt-2 max-w-sm text-muted">Try removing a filter or searching for something broader, such as “necklace” or “bangles”.</p>
              <button type="button" onClick={reset} className="btn-primary mt-6">
                Reset all filters
              </button>
            </div>
          )}
        </div>
      </div>

      <FilterSheet open={sheet} onClose={() => setSheet(false)} resultCount={results.length} onReset={reset}>
        {filters}
      </FilterSheet>
    </div>
  )
}
