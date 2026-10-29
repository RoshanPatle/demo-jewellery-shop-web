import { Gem, FileText, HeartHandshake, Headphones } from 'lucide-react'
import SectionHeading from '../SectionHeading'
import Reveal from '../Reveal'

const points = [
  { Icon: Gem, title: 'Carefully Selected Designs', text: 'Traditional and contemporary pieces chosen for craftsmanship and lasting style.' },
  { Icon: FileText, title: 'Transparent Product Information', text: 'Purity, weight and design details shared clearly before you decide.' },
  { Icon: HeartHandshake, title: 'Personalised Assistance', text: 'Help choosing the right piece for a wedding, festival or gift.' },
  { Icon: Headphones, title: 'Customer Support', text: 'Questions answered quickly over WhatsApp or in the showroom.' },
]

export default function Trust() {
  return (
    <section aria-labelledby="trust-title" className="section-y bg-cream">
      <div className="container-page">
        <SectionHeading id="trust-title" eyebrow="Why choose us" title="Jewellery You Can Choose with Confidence" />
        <ul className="grid gap-3 sm:grid-cols-2 sm:gap-5 lg:grid-cols-4">
          {points.map(({ Icon, title, text }, i) => (
            <li key={title}>
              <Reveal delay={i * 0.05} className="card flex h-full items-start gap-4 p-5 sm:flex-col sm:gap-5 sm:p-7">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gold-soft/70 text-gold-deep">
                  <Icon className="h-6 w-6" aria-hidden="true" />
                </span>
                <div>
                  <h3 className="font-serif text-xl font-semibold leading-snug">{title}</h3>
                  <p className="mt-1.5 text-[15px] leading-relaxed text-muted">{text}</p>
                </div>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
