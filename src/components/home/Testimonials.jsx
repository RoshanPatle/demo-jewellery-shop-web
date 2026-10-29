import { Quote } from 'lucide-react'
import SectionHeading from '../SectionHeading'
import Reveal from '../Reveal'

// DEMONSTRATION CONTENT ONLY. Replace with genuine, permissioned customer reviews.
const samples = [
  { text: 'The team patiently explained every detail and helped me choose a necklace for my sister’s wedding.', who: 'Sample customer', occasion: 'Wedding purchase' },
  { text: 'Browsing was easy and I could ask about weight and availability straight away on WhatsApp.', who: 'Sample customer', occasion: 'Festival gift' },
  { text: 'A lovely, unhurried experience. The jhumkas were exactly the kind of traditional design I wanted.', who: 'Sample customer', occasion: 'Anniversary' },
]

export default function Testimonials() {
  return (
    <section aria-labelledby="reviews-title" className="section-y">
      <div className="container-page">
        <SectionHeading
          id="reviews-title"
          eyebrow="Kind words"
          title="Moments Our Customers Cherish"
          description="Sample reviews shown for demonstration. They will be replaced with genuine customer reviews."
        />
        <ul className="grid gap-4 md:grid-cols-3 md:gap-6">
          {samples.map((s, i) => (
            <li key={i}>
              <Reveal delay={i * 0.06} className="card flex h-full flex-col p-6 sm:p-8">
                <Quote className="h-7 w-7 text-gold" aria-hidden="true" />
                <blockquote className="mt-4 flex-1 font-serif text-[20px] leading-snug text-ink sm:text-[22px]">{s.text}</blockquote>
                <div className="mt-6 flex items-center justify-between gap-3 border-t border-line pt-4 text-sm">
                  <div>
                    <p className="font-semibold">{s.who}</p>
                    <p className="text-muted">{s.occasion}</p>
                  </div>
                  <span className="rounded-full bg-cream px-3 py-1 text-xs font-semibold uppercase tracking-wider text-muted">Demo</span>
                </div>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
