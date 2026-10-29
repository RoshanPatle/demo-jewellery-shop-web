import { Link } from 'react-router-dom'
import { Info, ShoppingBag, Trash2 } from 'lucide-react'
import Img from '../components/Img'
import QuantityStepper from '../components/QuantityStepper'
import WhatsAppIcon from '../components/WhatsAppIcon'
import { useCart } from '../context/CartContext'
import { formatINR, site, whatsappLink } from '../config/site'
import { usePageTitle } from '../hooks/useUi'

export default function Cart() {
  const { items, count, subtotal, setQty, removeItem, clear, MAX_QTY } = useCart()
  usePageTitle('Shopping bag')

  if (!items.length) {
    return (
      <div className="container-page py-16 text-center sm:py-24">
        <span className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-cream text-gold-deep">
          <ShoppingBag className="h-9 w-9" aria-hidden="true" />
        </span>
        <h1 className="h-section mt-6">Your bag is empty</h1>
        <p className="mx-auto mt-3 max-w-md text-muted">Explore our gold collections and add the pieces you love. They&rsquo;ll wait here for you.</p>
        <Link to="/shop" className="btn-primary mt-7">
          Explore Gold Collection
        </Link>
      </div>
    )
  }

  const message =
    `Hello ${site.brandName}, I would like to enquire about these pieces from my bag:\n\n` +
    items.map((l, i) => `${i + 1}. ${l.product.name} × ${l.qty}`).join('\n') +
    `\n\nCould you please share the latest price, purity, weight, and availability?`

  return (
    <div className="container-page py-8 sm:py-12 lg:py-14">
      <h1 className="h-section">Shopping bag</h1>
      <p className="mt-1 text-muted">
        {count} {count === 1 ? 'item' : 'items'}
      </p>

      <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_380px] lg:items-start lg:gap-10">
        <ul className="min-w-0 space-y-4">
          {items.map(({ product, qty }) => (
            <li key={product.slug} className="card p-3 sm:p-4">
              <div className="flex gap-3 sm:gap-5">
                <Link to={`/product/${product.slug}`} className="block w-24 shrink-0 sm:w-32" aria-label={`View ${product.name}`}>
                  <Img src={product.images[0]} alt="" ratio="4 / 5" className="rounded-xl" sizes="128px" />
                </Link>
                <div className="flex min-w-0 flex-1 flex-col">
                  <h2 className="font-serif text-lg font-semibold leading-snug sm:text-xl">
                    <Link to={`/product/${product.slug}`} className="inline-block py-1 hover:text-gold-deep">
                      {product.name}
                    </Link>
                  </h2>
                  <p className="mt-0.5 text-sm text-muted">
                    {product.purity} · {product.weight} g
                  </p>
                  <p className="mt-1 text-sm text-muted">{formatINR(product.price)} each</p>

                  <div className="mt-auto flex flex-wrap items-center justify-between gap-x-3 gap-y-2 pt-3">
                    <QuantityStepper
                      value={qty}
                      onChange={(n) => setQty(product.slug, n)}
                      max={MAX_QTY}
                      label={`Quantity of ${product.name}`}
                    />
                    <p className="text-lg font-semibold tabular-nums">{formatINR(product.price * qty)}</p>
                  </div>
                </div>
              </div>
              <div className="mt-2 flex justify-end border-t border-line pt-1">
                <button
                  type="button"
                  onClick={() => removeItem(product.slug)}
                  className="inline-flex min-h-[44px] items-center gap-2 rounded-lg px-3 text-sm font-medium text-muted hover:text-ink"
                  aria-label={`Remove ${product.name} from bag`}
                >
                  <Trash2 className="h-4 w-4" aria-hidden="true" />
                  Remove
                </button>
              </div>
            </li>
          ))}
          <li className="flex flex-wrap items-center justify-between gap-3 px-1">
            <Link to="/shop" className="inline-flex min-h-[44px] items-center text-[15px] font-semibold text-gold-deep underline-offset-4 hover:underline">
              ← Continue browsing
            </Link>
            <button type="button" onClick={clear} className="min-h-[44px] px-1 text-sm text-muted underline-offset-4 hover:text-ink hover:underline">
              Clear bag
            </button>
          </li>
        </ul>

        <aside aria-labelledby="summary" className="card p-5 sm:p-6 lg:sticky lg:top-28">
          <h2 id="summary" className="font-serif text-2xl font-semibold">
            Order summary
          </h2>
          <dl className="mt-4 space-y-2 text-[15px]">
            <div className="flex justify-between gap-4">
              <dt className="text-muted">Items</dt>
              <dd className="tabular-nums">{count}</dd>
            </div>
            <div className="flex justify-between gap-4 border-t border-line pt-3 text-lg font-semibold">
              <dt>Indicative subtotal</dt>
              <dd className="tabular-nums">{formatINR(subtotal)}</dd>
            </div>
          </dl>
          <p className="mt-2 text-xs leading-relaxed text-muted">Sample prices only. The showroom confirms the final amount based on the day&rsquo;s gold rate and applicable charges.</p>

          <a href={whatsappLink(message)} target="_blank" rel="noopener noreferrer" className="btn-primary mt-5 w-full">
            <WhatsAppIcon className="h-5 w-5" />
            Enquire about this bag
          </a>

          <div className="mt-5 flex gap-3 rounded-2xl bg-cream p-4 text-[13px] leading-relaxed text-muted">
            <Info className="mt-0.5 h-4 w-4 shrink-0 text-gold-deep" aria-hidden="true" />
            <p>Demonstration bag: no payment is taken and no order is placed online. Your selection opens as a WhatsApp enquiry.</p>
          </div>
        </aside>
      </div>
    </div>
  )
}
