import { Link } from 'react-router-dom'
import { usePageTitle } from '../hooks/useUi'

export default function NotFound() {
  usePageTitle('Page not found')
  return (
    <div className="container-page py-20 text-center sm:py-28">
      <p className="eyebrow">404</p>
      <h1 className="h-section mt-3">This page could not be found</h1>
      <p className="mx-auto mt-3 max-w-md text-muted">The page may have moved. Let&rsquo;s get you back to the jewellery.</p>
      <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
        <Link to="/" className="btn-primary">
          Go to home
        </Link>
        <Link to="/shop" className="btn-outline">
          Browse jewellery
        </Link>
      </div>
    </div>
  )
}
