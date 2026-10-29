import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ChevronRight, Info, ShoppingBag } from 'lucide-react'
import ProductGallery from '../components/ProductGallery'
import QuantityStepper from '../components/QuantityStepper'
import WishlistButton from '../components/WishlistButton'
import WhatsAppIcon from '../components/WhatsAppIcon'
import ProductCard from '../components/ProductCard'
import { careInstructions, productBySlug, products } from '../data/products'
import { categoryBySlug } from '../data/categories'
import { formatINR, productEnquiryMessage, whatsappLink } from '../config/site'
import { useCart } from '../context/CartContext'
import { useToast } from '../context/ToastContext'
import { usePageTitle } from '../hooks/useUi'

export default function Product() {
  const { slug } = useParams()
  const product = productBySlug[slug]
  const { addItem } = useCart()
  const toast = useToast()
  const [qty, setQty] = useState(1)

  usePageTitle(product?.name || 'Product not found')

  if (!product) {
    return (
      <div className="container-page py-20 text-center">
        <h1 className="h-section">Product not found</h1>
        <p className="mt-3 text-muted">This piece may no longer be available.</p>
        <Link to="/shop" className="btn-primary mt-6">
          Browse all jewellery
        </Link>
      </div>
    )
  }

  const category = categoryBySlug[product.category]
  const enquiry = whatsappLink(productEnquiryMessage(product.name))
  const related = [
    ...products.filter((p) => p.category === product.category && p.slug !== product.slug),
    ...products.filter((p) => p.category !== product.category && p.slug !== product.slug),
  ].slice(0, 4)

  const add = () => {
    addItem(product.slug, qty)
    toast.show(`${qty > 1 ? `${qty} × ` : ''}${product.name} added to your bag`, { label: 'View bag', to: '/cart' })
  }

  const specs = [
    ['Category', category?.name],
    ['Design style', product.type],
    ['Gold purity', `${product.purity} (sample value)`],
    ['Approx. weight', `${product.weight} g (sample value)`],
    ['Price', 'Indicative; confirm latest rate on enquiry'],
    ['Availability', 'Please enquire'],
  ]

  return (
    <div className="container-page py-6 sm:py-10 lg:py-12">
      <nav aria-label="Breadcrumb" className="mb-5 text-sm text-muted">
        <ol className="flex flex-wrap items-center gap-1">
          <li>
            <Link to="/" className="inline-flex min-h-[32px] items-center hover:text-gold-deep">
              Home
            </Link>
          </li>
          <ChevronRight className="h-3.5 w-3.5" aria-hidden="true" />
          <li>
            <Link to={`/shop/${product.category}`} className="inline-flex min-h-[32px] items-center hover:text-gold-deep">
              {category?.name}
            </Link>
          </li>
          <ChevronRight className="h-3.5 w-3.5" aria-hidden="true" />
          <li aria-current="page" className="min-w-0 truncate text-ink">
            {product.name}
          </li>
        </ol>
      </nav>

      <div className="grid gap-8 md:gap-10 lg:grid-cols-2 lg:gap-14">
        <div className="min-w-0 lg:sticky lg:top-24 lg:self-start">
          <ProductGallery images={product.images} name={product.name} />
        </div>

        <div className="min-w-0">
          <p className="eyebrow">{category?.short}</p>
          <h1 className="mt-2 font-serif text-[clamp(1.75rem,1.3rem+1.6vw,2.75rem)] font-semibold leading-tight">{product.name}</h1>

          <p className="mt-4 text-[28px] font-semibold tracking-tight sm:text-3xl">{formatINR(product.price)}</p>
          <p className="mt-1 text-sm text-muted">Sample price for demonstration. Final price depends on the day&rsquo;s gold rate.</p>

          <ul className="mt-5 flex flex-wrap gap-2 text-sm">
            <li className="rounded-full border border-line bg-white px-4 py-1.5 font-medium">{product.purity} gold</li>
            <li className="rounded-full border border-line bg-white px-4 py-1.5 font-medium">{product.weight} g approx.</li>
            <li className="rounded-full border border-line bg-white px-4 py-1.5 font-medium">{product.type}</li>
          </ul>

          <p className="mt-6 text-[16px] leading-relaxed text-muted sm:text-[17px]">{product.description}</p>

          <div className="mt-7 flex flex-wrap items-center gap-3">
            <QuantityStepper value={qty} onChange={setQty} label="Quantity" />
            <button type="button" onClick={add} className="btn-primary min-w-0 flex-1 sm:flex-none sm:px-10">
              <ShoppingBag className="h-5 w-5" aria-hidden="true" />
              Add to bag
            </button>
          </div>
          <div className="mt-3 grid gap-3 sm:grid-cols-2">
            <a href={enquiry} target="_blank" rel="noopener noreferrer" className="btn-outline">
              <WhatsAppIcon className="h-5 w-5" />
              Enquire on WhatsApp
            </a>
            <WishlistButton slug={product.slug} name={product.name} variant="full" />
          </div>

          <div className="mt-6 flex gap-3 rounded-2xl bg-cream p-4 text-sm leading-relaxed text-muted">
            <Info className="mt-0.5 h-5 w-5 shrink-0 text-gold-deep" aria-hidden="true" />
            <p>This is a demonstration storefront. Adding to the bag does not place an order or take payment; use WhatsApp to confirm price, purity, weight and availability.</p>
          </div>

          <section aria-labelledby="specs" className="mt-10">
            <h2 id="specs" className="font-serif text-2xl font-semibold">
              Specifications
            </h2>
            <dl className="mt-3 divide-y divide-line rounded-2xl border border-line bg-white">
              {specs.map(([k, v]) => (
                <div key={k} className="grid grid-cols-[minmax(0,2fr)_minmax(0,3fr)] gap-3 px-4 py-3 text-[15px] sm:px-5">
                  <dt className="text-muted">{k}</dt>
                  <dd className="min-w-0 break-words font-medium">{v}</dd>
                </div>
              ))}
            </dl>
          </section>

          <section aria-labelledby="care" className="mt-8">
            <h2 id="care" className="font-serif text-2xl font-semibold">
              Jewellery care
            </h2>
            <ul className="mt-3 space-y-2.5 text-[15px] leading-relaxed text-muted">
              {careInstructions.map((c) => (
                <li key={c} className="flex gap-3">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-gold" aria-hidden="true" />
                  {c}
                </li>
              ))}
            </ul>
          </section>
        </div>
      </div>

      <section aria-labelledby="related" className="mt-16 lg:mt-24">
        <h2 id="related" className="h-section mb-6 sm:mb-8">
          You may also love
        </h2>
        <ul className="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4 lg:gap-6">
          {related.map((p) => (
            <li key={p.slug}>
              <ProductCard product={p} />
            </li>
          ))}
        </ul>
      </section>

      {/* Sticky mobile / tablet action bar. Layout adds bottom padding so it never hides content. */}
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-ivory px-4 pt-3 pb-safe shadow-[0_-8px_24px_-16px_rgba(81,64,52,.3)] lg:hidden">
        <div className="mx-auto flex max-w-xl items-center gap-3">
          <div className="min-w-0">
            <p className="truncate text-xs text-muted">{product.name}</p>
            <p className="text-lg font-semibold leading-tight">{formatINR(product.price)}</p>
          </div>
          <button type="button" onClick={add} className="btn-primary ml-auto shrink-0 !px-5">
            Add to bag
          </button>
          <a href={enquiry} target="_blank" rel="noopener noreferrer" aria-label={`Enquire about ${product.name} on WhatsApp`} className="btn-soft !w-12 shrink-0 !p-0">
            <WhatsAppIcon className="h-5 w-5 text-gold-deep" />
          </a>
        </div>
      </div>
    </div>
  )
}
