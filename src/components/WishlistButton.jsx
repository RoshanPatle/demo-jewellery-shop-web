import { Heart } from 'lucide-react'
import { useWishlist } from '../context/WishlistContext'

// 44x44 hit area with a smaller visible circle.
export default function WishlistButton({ slug, name, className = '', variant = 'overlay' }) {
  const { has, toggle } = useWishlist()
  const active = has(slug)
  const label = active ? `Remove ${name} from wishlist` : `Add ${name} to wishlist`

  if (variant === 'full') {
    return (
      <button
        type="button"
        onClick={() => toggle(slug)}
        aria-pressed={active}
        className={`btn-soft ${className}`}
      >
        <Heart className={`h-5 w-5 ${active ? 'fill-gold-deep text-gold-deep' : ''}`} aria-hidden="true" />
        {active ? 'Saved to wishlist' : 'Add to wishlist'}
      </button>
    )
  }

  return (
    <button
      type="button"
      onClick={() => toggle(slug)}
      aria-pressed={active}
      aria-label={label}
      className={`group flex h-11 w-11 items-center justify-center ${className}`}
    >
      <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/95 shadow-soft transition-transform group-active:scale-90">
        <Heart className={`h-[18px] w-[18px] ${active ? 'fill-gold-deep text-gold-deep' : 'text-ink'}`} aria-hidden="true" />
      </span>
    </button>
  )
}
