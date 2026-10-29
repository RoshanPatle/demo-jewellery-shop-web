import { Link } from 'react-router-dom'
import { Heart } from 'lucide-react'
import ProductCard from '../components/ProductCard'
import { useWishlist } from '../context/WishlistContext'
import { usePageTitle } from '../hooks/useUi'

export default function Wishlist() {
  const { items, count } = useWishlist()
  usePageTitle('Wishlist')

  if (!count) {
    return (
      <div className="container-page py-16 text-center sm:py-24">
        <span className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-cream text-gold-deep">
          <Heart className="h-9 w-9" aria-hidden="true" />
        </span>
        <h1 className="h-section mt-6">Your wishlist is empty</h1>
        <p className="mx-auto mt-3 max-w-md text-muted">Tap the heart on any piece to save it here and come back to it later.</p>
        <Link to="/shop" className="btn-primary mt-7">
          Discover Gold Jewellery
        </Link>
      </div>
    )
  }

  return (
    <div className="container-page py-8 sm:py-12 lg:py-14">
      <h1 className="h-section">Your wishlist</h1>
      <p className="mt-1 text-muted">
        {count} saved {count === 1 ? 'piece' : 'pieces'}
      </p>
      <ul className="mt-8 grid grid-cols-2 gap-3 sm:gap-5 md:grid-cols-3 lg:grid-cols-4 lg:gap-6">
        {items.map((p) => (
          <li key={p.slug}>
            <ProductCard product={p} />
          </li>
        ))}
      </ul>
    </div>
  )
}
