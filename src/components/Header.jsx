import { useEffect, useRef, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { ChevronDown, Heart, Menu, Search, ShoppingBag } from 'lucide-react'
import Logo from './Logo'
import MobileMenu from './MobileMenu'
import SearchOverlay from './SearchOverlay'
import Img from './Img'
import { categories } from '../data/categories'
import { useCart } from '../context/CartContext'
import { useWishlist } from '../context/WishlistContext'

const linkBase =
  'relative inline-flex min-h-[44px] items-center px-1 text-[15px] font-medium text-ink transition-colors hover:text-gold-deep after:absolute after:inset-x-1 after:bottom-1.5 after:h-px after:origin-left after:scale-x-0 after:bg-gold-deep after:transition-transform hover:after:scale-x-100'

const navClass = ({ isActive }) => `${linkBase} ${isActive ? 'text-gold-deep after:scale-x-100' : ''}`

function Badge({ n }) {
  if (!n) return null
  return (
    <span className="absolute right-0.5 top-0.5 flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-gold-deep px-1 text-[10px] font-semibold leading-none text-white">
      {n > 99 ? '99+' : n}
    </span>
  )
}

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [megaOpen, setMegaOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { pathname } = useLocation()
  const { count: bagCount } = useCart()
  const { count: wishCount } = useWishlist()
  const menuBtn = useRef(null)
  const megaRef = useRef(null)
  const closeTimer = useRef()

  useEffect(() => {
    setMenuOpen(false)
    setSearchOpen(false)
    setMegaOpen(false)
  }, [pathname])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close mega menu on outside click / Escape.
  useEffect(() => {
    if (!megaOpen) return
    const onDown = (e) => {
      if (megaRef.current && !megaRef.current.contains(e.target)) setMegaOpen(false)
    }
    const onKey = (e) => e.key === 'Escape' && setMegaOpen(false)
    document.addEventListener('pointerdown', onDown)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('pointerdown', onDown)
      document.removeEventListener('keydown', onKey)
    }
  }, [megaOpen])

  const openMega = () => {
    clearTimeout(closeTimer.current)
    setMegaOpen(true)
  }
  const closeMegaSoon = () => {
    clearTimeout(closeTimer.current)
    closeTimer.current = setTimeout(() => setMegaOpen(false), 140)
  }

  return (
    <>
      <a
        href="#main"
        className="sr-only z-[100] rounded-full bg-gold-deep px-5 py-3 text-white focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
      >
        Skip to content
      </a>

      <header
        className={`sticky top-0 z-50 border-b bg-ivory transition-shadow duration-300 ${
          scrolled ? 'border-line shadow-soft' : 'border-transparent'
        }`}
      >
        <div className="container-page flex h-14 items-center gap-1 sm:h-16 xl:h-20 xl:gap-8">
          {/* Mobile / tablet / small laptop: menu button */}
          <button
            ref={menuBtn}
            type="button"
            className="icon-btn -ml-2 xl:hidden"
            aria-label="Open menu"
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            onClick={() => setMenuOpen(true)}
          >
            <Menu className="h-6 w-6" aria-hidden="true" />
          </button>

          <Logo className="min-w-0" />

          {/* Desktop navigation (xl and up) */}
          <nav aria-label="Main" className="hidden flex-1 items-center justify-center gap-5 xl:flex 2xl:gap-8">
            <NavLink to="/" end className={navClass}>
              Home
            </NavLink>

            <div ref={megaRef} className="static" onMouseEnter={openMega} onMouseLeave={closeMegaSoon}>
              <button
                type="button"
                className={`${linkBase} gap-1`}
                aria-expanded={megaOpen}
                aria-controls="mega-menu"
                aria-haspopup="true"
                onClick={() => setMegaOpen((v) => !v)}
              >
                Gold Jewellery
                <ChevronDown className={`h-4 w-4 transition-transform ${megaOpen ? 'rotate-180' : ''}`} aria-hidden="true" />
              </button>

              {megaOpen && (
                <div
                  id="mega-menu"
                  className="absolute inset-x-0 top-full border-b border-line bg-ivory shadow-lift"
                  onMouseEnter={openMega}
                  onMouseLeave={closeMegaSoon}
                >
                  <div className="container-page grid grid-cols-12 gap-8 py-8">
                    <ul className="col-span-8 grid grid-cols-3 gap-x-6 gap-y-5">
                      {categories.map((c) => (
                        <li key={c.slug}>
                          <Link
                            to={`/shop/${c.slug}`}
                            onClick={() => setMegaOpen(false)}
                            className="group flex items-center gap-4 rounded-xl p-2 transition-colors hover:bg-cream"
                          >
                            <Img src={c.image} alt="" ratio="1 / 1" className="h-16 w-16 shrink-0 rounded-lg" sizes="64px" />
                            <span>
                              <span className="block font-serif text-lg font-semibold group-hover:text-gold-deep">{c.name}</span>
                              <span className="block text-[13px] leading-snug text-muted">{c.blurb}</span>
                            </span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                    <div className="col-span-4">
                      <Link
                        to="/shop"
                        onClick={() => setMegaOpen(false)}
                        className="group flex h-full flex-col justify-between rounded-2xl bg-cream p-6 transition-colors hover:bg-[#f3e9d9]"
                      >
                        <span>
                          <span className="eyebrow">The Collection</span>
                          <span className="mt-2 block font-serif text-2xl font-semibold leading-tight">Browse all gold jewellery</span>
                          <span className="mt-2 block text-sm text-muted">Search and filter by category, purity and price.</span>
                        </span>
                        <span className="mt-6 text-sm font-semibold text-gold-deep underline-offset-4 group-hover:underline">
                          Shop everything →
                        </span>
                      </Link>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <NavLink to="/shop/bridal" className={navClass}>
              Bridal Collection
            </NavLink>
            <NavLink to="/shop/necklaces" className={navClass}>
              Necklaces
            </NavLink>
            <NavLink to="/shop/earrings" className={navClass}>
              Earrings
            </NavLink>
            <NavLink to="/shop/bangles" className={navClass}>
              Bangles
            </NavLink>
            <NavLink to="/about" className={navClass}>
              About Us
            </NavLink>
            <NavLink to="/contact" className={navClass}>
              Contact
            </NavLink>
          </nav>

          <div className="ml-auto flex items-center xl:ml-0">
            <button type="button" className="icon-btn" aria-label="Search jewellery" onClick={() => setSearchOpen(true)}>
              <Search className="h-[22px] w-[22px]" aria-hidden="true" />
            </button>
            <Link
              to="/wishlist"
              className="icon-btn hidden xs:inline-flex"
              aria-label={`Wishlist, ${wishCount} ${wishCount === 1 ? 'item' : 'items'}`}
            >
              <Heart className="h-[22px] w-[22px]" aria-hidden="true" />
              <Badge n={wishCount} />
            </Link>
            <Link
              to="/cart"
              className="icon-btn -mr-2 xl:mr-0"
              aria-label={`Shopping bag, ${bagCount} ${bagCount === 1 ? 'item' : 'items'}`}
            >
              <ShoppingBag className="h-[22px] w-[22px]" aria-hidden="true" />
              <Badge n={bagCount} />
            </Link>
          </div>
        </div>
      </header>

      <MobileMenu
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
        wishCount={wishCount}
        bagCount={bagCount}
        onSearch={() => {
          setMenuOpen(false)
          setSearchOpen(true)
        }}
      />
      <SearchOverlay open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  )
}
