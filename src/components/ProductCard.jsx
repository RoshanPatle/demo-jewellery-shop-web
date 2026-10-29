import { memo } from 'react'
import { Link } from 'react-router-dom'
import { ShoppingBag, Check } from 'lucide-react'
import Img from './Img'
import WishlistButton from './WishlistButton'
import WhatsAppIcon from './WhatsAppIcon'
import { useCart } from '../context/CartContext'
import { useToast } from '../context/ToastContext'
import { formatINR, productEnquiryMessage, whatsappLink } from '../config/site'
import { categoryBySlug } from '../data/categories'

function ProductCard({ product, priority = false }) {
  const { addItem, has } = useCart()
  const toast = useToast()
  const inBag = has(product.slug)
  const to = `/product/${product.slug}`

  const add = () => {
    addItem(product.slug)
    toast.show(`${product.name} added to your bag`, { label: 'View bag', to: '/cart' })
  }

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-white transition-shadow duration-300 hover:shadow-lift">
      <div className="relative">
        <Link to={to} aria-label={`View details: ${product.name}`} className="block overflow-hidden">
          <Img
            src={product.images[0]}
            alt={`${product.name} in gold`}
            ratio="4 / 5"
            priority={priority}
            sizes="(min-width:1280px) 22vw, (min-width:768px) 30vw, 46vw"
            imgClassName="transition-transform duration-500 ease-out motion-safe:[@media(hover:hover)]:group-hover:scale-[1.04]"
          />
        </Link>
        <WishlistButton slug={product.slug} name={product.name} className="absolute right-0.5 top-0.5" />
        <span className="pointer-events-none absolute bottom-2 left-2 rounded-full bg-white/95 px-2.5 py-1 text-xs font-semibold tracking-wide text-gold-deep shadow-soft">
          {product.purity}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-3 sm:p-4">
        <p className="truncate text-xs font-semibold text-muted">
          <span className="uppercase tracking-[0.1em]">{categoryBySlug[product.category]?.short}</span> · {product.weight} g
        </p>
        <h3 className="mt-1 text-[17px] font-semibold leading-snug sm:text-[19px]">
          <Link to={to} className="line-clamp-2 py-1 hover:text-gold-deep">
            {product.name}
          </Link>
        </h3>
        <p className="mt-1.5 text-base font-semibold text-ink sm:text-[17px]">
          {formatINR(product.price)}
          <span className="ml-1 text-xs font-normal text-muted">sample</span>
        </p>

        <div className="mt-auto flex items-center gap-1.5 pt-3 sm:gap-2">
          <button
            type="button"
            onClick={add}
            className="btn-primary !min-h-[44px] min-w-0 flex-1 !px-2 !text-[13px] sm:!px-4 sm:!text-sm"
          >
            {inBag ? <Check className="hidden h-4 w-4 sm:block" aria-hidden="true" /> : <ShoppingBag className="hidden h-4 w-4 sm:block" aria-hidden="true" />}
            <span className="xs:hidden">Add</span>
            <span className="hidden xs:inline">{inBag ? 'Add more' : 'Add to bag'}</span>
          </button>
          <a
            href={whatsappLink(productEnquiryMessage(product.name))}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Enquire about ${product.name} on WhatsApp`}
            className="btn-soft !min-h-[44px] !w-11 shrink-0 !p-0"
          >
            <WhatsAppIcon className="h-5 w-5 text-gold-deep" />
          </a>
        </div>
      </div>
    </article>
  )
}

export default memo(ProductCard)
