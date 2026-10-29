// ---------------------------------------------------------------------------
// Central configuration. Edit this file (or use a .env file) to customise the
// site for a real showroom. Nothing here is invented: any value left empty is
// simply not shown, or handled gracefully.
//
//   VITE_WHATSAPP_NUMBER=919XXXXXXXXX   (country code + number, digits only)
// ---------------------------------------------------------------------------

const env = import.meta.env

export const site = {
  brandName: env.VITE_BRAND_NAME || 'SWARNIKA JEWELS',
  tagline: 'Indian Gold Jewellery',

  // Digits only, with country code, e.g. "919876543210". Leave empty until the
  // showroom supplies its number: WhatsApp then opens its own contact picker.
  whatsappNumber: (env.VITE_WHATSAPP_NUMBER || '').replace(/\D/g, ''),

  // Contact details are only displayed when supplied.
  phone: env.VITE_PHONE || '',
  email: env.VITE_EMAIL || '',
  address: env.VITE_ADDRESS || '',
  hours: env.VITE_HOURS || '',

  social: {
    instagram: env.VITE_INSTAGRAM_URL || '',
    facebook: env.VITE_FACEBOOK_URL || '',
    youtube: env.VITE_YOUTUBE_URL || '',
  },
}

export const brandParts = (() => {
  const [first, ...rest] = site.brandName.split(' ')
  return { first, rest: rest.join(' ') }
})()

export function whatsappLink(message) {
  const text = encodeURIComponent(message)
  return site.whatsappNumber
    ? `https://wa.me/${site.whatsappNumber}?text=${text}`
    : `https://wa.me/?text=${text}`
}

export const productEnquiryMessage = (name) =>
  `Hello, I am interested in the ${name}. Could you please share its latest price, purity, weight, and availability?`

export const formatINR = (n) =>
  new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(n)
