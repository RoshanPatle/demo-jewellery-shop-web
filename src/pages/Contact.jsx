import { useState } from 'react'
import { Clock, Mail, MapPin, Phone } from 'lucide-react'
import WhatsAppIcon from '../components/WhatsAppIcon'
import { site, whatsappLink } from '../config/site'
import { usePageTitle } from '../hooks/useUi'

function validate({ name, phone, message }) {
  const e = {}
  if (!name.trim()) e.name = 'Please enter your name.'
  if (phone.trim() && !/^[+()\d\s-]{7,16}$/.test(phone.trim())) e.phone = 'Please enter a valid phone number, or leave this blank.'
  if (message.trim().length < 5) e.message = 'Please tell us a little about what you are looking for.'
  return e
}

function Field({ id, label, error, children, hint }) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-[15px] font-medium">
        {label}
      </label>
      {children}
      {hint && !error && <p className="mt-1 text-sm text-muted">{hint}</p>}
      {error && (
        <p id={`${id}-error`} role="alert" className="mt-1 text-sm font-medium text-[#9B2C2C]">
          {error}
        </p>
      )}
    </div>
  )
}

export default function Contact() {
  usePageTitle('Contact')
  const [form, setForm] = useState({ name: '', phone: '', message: '' })
  const [errors, setErrors] = useState({})
  const [sent, setSent] = useState(false)

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }))

  const submit = (e) => {
    e.preventDefault()
    const found = validate(form)
    setErrors(found)
    setSent(false)
    if (Object.keys(found).length) {
      document.getElementById(`c-${Object.keys(found)[0]}`)?.focus()
      return
    }
    const text = `Hello ${site.brandName}, my name is ${form.name.trim()}.${form.phone.trim() ? ` My phone number is ${form.phone.trim()}.` : ''}\n\n${form.message.trim()}`
    window.open(whatsappLink(text), '_blank', 'noopener,noreferrer')
    setSent(true)
  }

  const details = [
    site.address && { Icon: MapPin, label: 'Showroom', value: site.address },
    site.phone && { Icon: Phone, label: 'Phone', value: site.phone, href: `tel:${site.phone.replace(/\s/g, '')}` },
    site.email && { Icon: Mail, label: 'Email', value: site.email, href: `mailto:${site.email}` },
    site.hours && { Icon: Clock, label: 'Hours', value: site.hours },
  ].filter(Boolean)

  return (
    <div className="container-page py-10 sm:py-14 lg:py-20">
      <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
        <div>
          <p className="eyebrow mb-3">Contact</p>
          <h1 className="h-section">We&rsquo;d love to help you choose</h1>
          <p className="mt-4 max-w-md text-[16px] leading-relaxed text-muted sm:text-lg">
            Ask about a design, today&rsquo;s price, weight or availability. The quickest way to reach us is WhatsApp.
          </p>

          <a
            href={whatsappLink(`Hello ${site.brandName}, I would like to know more about your jewellery.`)}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary mt-6 w-full sm:w-auto"
          >
            <WhatsAppIcon className="h-5 w-5" />
            Chat on WhatsApp
          </a>

          {details.length > 0 && (
            <ul className="mt-8 space-y-4">
              {details.map(({ Icon, label, value, href }) => (
                <li key={label} className="flex items-start gap-4">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-cream text-gold-deep">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <div className="min-w-0">
                    <p className="text-sm text-muted">{label}</p>
                    {href ? (
                      <a href={href} className="break-words text-[16px] font-medium hover:text-gold-deep">
                        {value}
                      </a>
                    ) : (
                      <p className="break-words text-[16px] font-medium">{value}</p>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        <form onSubmit={submit} noValidate className="card space-y-5 p-5 sm:p-8" aria-labelledby="form-title">
          <h2 id="form-title" className="font-serif text-2xl font-semibold">
            Send an enquiry
          </h2>
          <Field id="c-name" label="Your name" error={errors.name}>
            <input
              id="c-name"
              name="name"
              value={form.name}
              onChange={set('name')}
              autoComplete="name"
              aria-invalid={!!errors.name}
              aria-describedby={errors.name ? 'c-name-error' : undefined}
              className="field"
            />
          </Field>
          <Field id="c-phone" label="Phone number (optional)" error={errors.phone}>
            <input
              id="c-phone"
              name="phone"
              type="tel"
              inputMode="tel"
              value={form.phone}
              onChange={set('phone')}
              autoComplete="tel"
              aria-invalid={!!errors.phone}
              aria-describedby={errors.phone ? 'c-phone-error' : undefined}
              className="field"
            />
          </Field>
          <Field id="c-message" label="How can we help?" error={errors.message}>
            <textarea
              id="c-message"
              name="message"
              rows={5}
              value={form.message}
              onChange={set('message')}
              aria-invalid={!!errors.message}
              aria-describedby={errors.message ? 'c-message-error' : undefined}
              className="field min-h-[130px] resize-y py-3"
            />
          </Field>
          <button type="submit" className="btn-primary w-full">
            <WhatsAppIcon className="h-5 w-5" />
            Send via WhatsApp
          </button>
          <p role="status" className="text-sm text-muted">
            {sent
              ? 'Opening WhatsApp with your message. If nothing opened, please allow pop-ups and try again.'
              : 'This form opens WhatsApp with your message ready to send. Nothing is stored on this website.'}
          </p>
        </form>
      </div>
    </div>
  )
}
