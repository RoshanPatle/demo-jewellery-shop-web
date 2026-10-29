import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ChevronDown, Mail, MapPin, Phone } from 'lucide-react'
import { Facebook, Instagram, Youtube } from './SocialIcons'
import { LogoMark } from './Logo'
import WhatsAppIcon from './WhatsAppIcon'
import { categories } from '../data/categories'
import { brandParts, productEnquiryMessage, site, whatsappLink } from '../config/site'
import { useMediaQuery } from '../hooks/useUi'

const linkCls = 'inline-flex min-h-[44px] items-center text-[15px] text-muted transition-colors hover:text-gold-deep md:min-h-[40px]'

function Group({ title, children }) {
  const desktop = useMediaQuery('(min-width: 768px)')
  const [open, setOpen] = useState(false)
  const expanded = desktop || open
  const id = `footer-${title.replace(/\s+/g, '-').toLowerCase()}`

  return (
    <div className="border-b border-line md:border-0">
      {desktop ? (
        <h2 className="mb-3 font-serif text-xl font-semibold">{title}</h2>
      ) : (
        <h2>
          <button
            type="button"
            aria-expanded={open}
            aria-controls={id}
            onClick={() => setOpen((v) => !v)}
            className="flex min-h-[56px] w-full items-center justify-between font-serif text-xl font-semibold"
          >
            {title}
            <ChevronDown className={`h-5 w-5 text-gold-deep transition-transform ${open ? 'rotate-180' : ''}`} aria-hidden="true" />
          </button>
        </h2>
      )}
      {expanded && (
        <div id={id} className="pb-4 md:pb-0">
          {children}
        </div>
      )}
    </div>
  )
}

export default function Footer() {
  const socials = [
    { key: 'instagram', label: 'Instagram', href: site.social.instagram, Icon: Instagram },
    { key: 'facebook', label: 'Facebook', href: site.social.facebook, Icon: Facebook },
    { key: 'youtube', label: 'YouTube', href: site.social.youtube, Icon: Youtube },
  ].filter((s) => s.href)

  return (
    <footer className="mt-10 border-t border-line bg-cream">
      <div className="container-page py-12 lg:py-16">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-4">
            <Link to="/" className="inline-flex items-center gap-3" aria-label={`${site.brandName} home`}>
              <LogoMark className="h-9 w-9" />
              <span className="flex flex-col leading-none">
                <span className="font-serif text-2xl font-bold tracking-[0.16em]">{brandParts.first}</span>
                {brandParts.rest && (
                  <span className="mt-1.5 text-[11px] font-semibold uppercase tracking-[0.5em] text-gold-deep">{brandParts.rest}</span>
                )}
              </span>
            </Link>
            <p className="mt-5 max-w-sm text-[15px] leading-relaxed text-muted">
              Gold jewellery inspired by Indian tradition and made for the moments you celebrate. Visit, call or message us for a personal consultation.
            </p>
            {socials.length > 0 && (
              <ul className="mt-5 flex gap-2">
                {socials.map(({ key, label, href, Icon }) => (
                  <li key={key}>
                    <a
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${site.brandName} on ${label}`}
                      className="icon-btn border border-line bg-white"
                    >
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="grid gap-0 md:col-span-2 md:grid-cols-3 md:gap-8 lg:col-span-8">
            <Group title="Jewellery">
              <ul>
                {categories.map((c) => (
                  <li key={c.slug}>
                    <Link to={`/shop/${c.slug}`} className={linkCls}>
                      {c.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </Group>

            <Group title="Customer Care">
              <ul>
                <li>
                  <Link to="/contact" className={linkCls}>
                    Contact us
                  </Link>
                </li>
                <li>
                  <a href={whatsappLink(productEnquiryMessage('jewellery piece'))} target="_blank" rel="noopener noreferrer" className={linkCls}>
                    WhatsApp enquiry
                  </a>
                </li>
                <li>
                  <Link to="/wishlist" className={linkCls}>
                    My wishlist
                  </Link>
                </li>
                <li>
                  <Link to="/cart" className={linkCls}>
                    My bag
                  </Link>
                </li>
              </ul>
            </Group>

            <Group title="Company">
              <ul>
                <li>
                  <Link to="/about" className={linkCls}>
                    About us
                  </Link>
                </li>
                <li>
                  <Link to="/privacy" className={linkCls}>
                    Privacy policy
                  </Link>
                </li>
                <li>
                  <Link to="/terms" className={linkCls}>
                    Terms &amp; conditions
                  </Link>
                </li>
              </ul>
              <ul className="mt-3 space-y-2 text-[15px] text-muted">
                {site.phone && (
                  <li className="flex items-start gap-2">
                    <Phone className="mt-1 h-4 w-4 shrink-0 text-gold-deep" aria-hidden="true" />
                    <a href={`tel:${site.phone.replace(/\s/g, '')}`} className="hover:text-gold-deep">
                      {site.phone}
                    </a>
                  </li>
                )}
                {site.email && (
                  <li className="flex items-start gap-2">
                    <Mail className="mt-1 h-4 w-4 shrink-0 text-gold-deep" aria-hidden="true" />
                    <a href={`mailto:${site.email}`} className="break-all hover:text-gold-deep">
                      {site.email}
                    </a>
                  </li>
                )}
                {site.address && (
                  <li className="flex items-start gap-2">
                    <MapPin className="mt-1 h-4 w-4 shrink-0 text-gold-deep" aria-hidden="true" />
                    <span>{site.address}</span>
                  </li>
                )}
                <li>
                  <a
                    href={whatsappLink(`Hello ${site.brandName}, I would like to know more about your jewellery.`)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-[44px] items-center gap-2 font-medium text-gold-deep hover:underline"
                  >
                    <WhatsAppIcon className="h-4 w-4" /> Message us on WhatsApp
                  </a>
                </li>
              </ul>
            </Group>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-2 border-t border-line pt-6 text-[13px] text-muted md:flex-row md:items-center md:justify-between">
          <p>
            © {new Date().getFullYear()} {site.brandName}. All rights reserved.
          </p>
          <p>Prices and product details shown are sample values for demonstration. Please confirm current rates with the showroom.</p>
        </div>
      </div>
    </footer>
  )
}
