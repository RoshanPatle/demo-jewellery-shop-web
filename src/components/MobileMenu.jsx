import { useRef, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { ChevronDown, Heart, Search, ShoppingBag, X } from 'lucide-react'
import Logo from './Logo'
import WhatsAppIcon from './WhatsAppIcon'
import { categories } from '../data/categories'
import { site, whatsappLink } from '../config/site'
import { useBodyLock, useFocusTrap } from '../hooks/useUi'

const row =
  'flex min-h-[56px] w-full items-center justify-between border-b border-line px-1 font-serif text-[26px] font-semibold text-ink transition-colors active:bg-cream'

export default function MobileMenu({ open, onClose, wishCount, bagCount, onSearch }) {
  const panel = useRef(null)
  const reduce = useReducedMotion()
  const [catsOpen, setCatsOpen] = useState(false)

  useBodyLock(open)
  useFocusTrap(panel, open, onClose)

  const activeRow = ({ isActive }) => `${row} ${isActive ? 'text-gold-deep' : ''}`

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[80] xl:hidden">
          <motion.div
            className="absolute inset-0 bg-ink/30"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduce ? 0 : 0.2 }}
            onClick={onClose}
            aria-hidden="true"
          />
          <motion.div
            ref={panel}
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Site menu"
            className="absolute inset-y-0 left-0 flex w-[min(90vw,400px)] flex-col border-r border-line bg-ivory shadow-lift"
            initial={reduce ? { opacity: 0 } : { x: '-100%' }}
            animate={reduce ? { opacity: 1 } : { x: 0 }}
            exit={reduce ? { opacity: 0 } : { x: '-100%' }}
            transition={{ duration: reduce ? 0 : 0.28, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex h-14 shrink-0 items-center justify-between border-b border-line px-4 sm:h-16">
              <Logo onClick={onClose} />
              <button type="button" className="icon-btn -mr-2" aria-label="Close menu" onClick={onClose} data-autofocus>
                <X className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto overscroll-contain px-5 pb-6">
              <button
                type="button"
                onClick={onSearch}
                className="mt-5 flex min-h-[52px] w-full items-center gap-3 rounded-full border border-line bg-white px-5 text-left text-[16px] text-muted"
              >
                <Search className="h-5 w-5 text-gold-deep" aria-hidden="true" />
                Search jewellery
              </button>

              <nav aria-label="Mobile" className="mt-3">
                <NavLink to="/" end onClick={onClose} className={activeRow}>
                  Home
                </NavLink>

                <button
                  type="button"
                  className={row}
                  aria-expanded={catsOpen}
                  aria-controls="mobile-cats"
                  onClick={() => setCatsOpen((v) => !v)}
                >
                  Gold Jewellery
                  <ChevronDown className={`h-5 w-5 text-gold-deep transition-transform ${catsOpen ? 'rotate-180' : ''}`} aria-hidden="true" />
                </button>
                {catsOpen && (
                  <ul id="mobile-cats" className="border-b border-line bg-cream/60 px-3 py-2">
                    {categories.map((c) => (
                      <li key={c.slug}>
                        <Link
                          to={`/shop/${c.slug}`}
                          onClick={onClose}
                          className="flex min-h-[48px] items-center rounded-lg px-2 text-[17px] text-ink active:bg-cream"
                        >
                          {c.name}
                        </Link>
                      </li>
                    ))}
                    <li>
                      <Link
                        to="/shop"
                        onClick={onClose}
                        className="flex min-h-[48px] items-center rounded-lg px-2 text-[17px] font-semibold text-gold-deep"
                      >
                        View all jewellery →
                      </Link>
                    </li>
                  </ul>
                )}

                <NavLink to="/shop/bridal" onClick={onClose} className={activeRow}>
                  Bridal Collection
                </NavLink>
                <NavLink to="/about" onClick={onClose} className={activeRow}>
                  About Us
                </NavLink>
                <NavLink to="/contact" onClick={onClose} className={activeRow}>
                  Contact
                </NavLink>
              </nav>

              <div className="mt-6 grid grid-cols-2 gap-3">
                <Link to="/wishlist" onClick={onClose} className="btn-soft !min-h-[52px] !px-3">
                  <Heart className="h-5 w-5 text-gold-deep" aria-hidden="true" />
                  Wishlist{wishCount ? ` (${wishCount})` : ''}
                </Link>
                <Link to="/cart" onClick={onClose} className="btn-soft !min-h-[52px] !px-3">
                  <ShoppingBag className="h-5 w-5 text-gold-deep" aria-hidden="true" />
                  Bag{bagCount ? ` (${bagCount})` : ''}
                </Link>
              </div>
            </div>

            <div className="shrink-0 border-t border-line bg-cream/70 px-5 pt-4 pb-safe">
              <a
                href={whatsappLink(`Hello ${site.brandName}, I would like some help choosing gold jewellery.`)}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary w-full"
              >
                <WhatsAppIcon className="h-5 w-5" />
                Chat on WhatsApp
              </a>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
