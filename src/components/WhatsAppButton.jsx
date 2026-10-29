import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import WhatsAppIcon from './WhatsAppIcon'
import { site, whatsappLink } from '../config/site'

// Floating enquiry pill. Deliberately restrained so it never obstructs content:
//  - tablet and up only (on phones, WhatsApp is in the menu drawer, on every product,
//    in the cart, footer and contact page, so a floating button would only cover content)
//  - appears after scrolling past the first screen
//  - hidden on pages that carry their own action bars or per-product WhatsApp buttons
const HIDDEN_ON = [/^\/product\//, /^\/cart/, /^\/shop/]

export default function WhatsAppButton() {
  const { pathname } = useLocation()
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  if (!visible || HIDDEN_ON.some((re) => re.test(pathname))) return null

  return (
    <a
      href={whatsappLink(`Hello ${site.brandName}, I would like some help choosing gold jewellery.`)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      className="safe-bottom safe-right fixed z-40 hidden items-center gap-2 rounded-full border border-gold-deep/30 bg-white px-5 py-3.5 text-gold-deep shadow-lift transition-transform active:scale-95 motion-safe:hover:-translate-y-0.5 md:flex"
    >
      <WhatsAppIcon className="h-5 w-5" />
      <span className="text-sm font-semibold">WhatsApp us</span>
    </a>
  )
}
