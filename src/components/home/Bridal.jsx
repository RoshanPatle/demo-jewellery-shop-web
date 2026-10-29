import { Link } from 'react-router-dom'
import { Check } from 'lucide-react'
import Img from '../Img'
import Reveal from '../Reveal'
import { site, whatsappLink } from '../../config/site'

const items = ['Harams and layered necklace sets', 'Jhumkas and maang tikka', 'Bangles, kadas and bridal chains']

export default function Bridal() {
  return (
    <section aria-labelledby="bridal-title" className="section-y bg-cream">
      <div className="container-page grid items-center gap-8 md:grid-cols-2 lg:gap-16">
        <Reveal>
          <Img
            src="/images/bridal-editorial.svg"
            alt="Bridal gold jewellery set with layered necklace, maang tikka and jhumkas"
            ratio={null}
            className="aspect-square rounded-3xl border border-line md:aspect-[4/5]"
            position="center 40%"
            sizes="(min-width:768px) 48vw, 100vw"
          />
        </Reveal>

        <Reveal delay={0.08}>
          <p className="eyebrow mb-3">Bridal collection</p>
          <h2 id="bridal-title" className="h-section">
            For the Beginning of Forever
          </h2>
          <p className="mt-4 max-w-lg text-[16px] leading-relaxed text-muted sm:text-lg">
            Celebrate life&rsquo;s most precious moments with gold jewellery inspired by timeless Indian traditions.
          </p>
          <ul className="mt-6 space-y-3">
            {items.map((t) => (
              <li key={t} className="flex items-start gap-3 text-[16px]">
                <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gold-soft text-gold-deep">
                  <Check className="h-3.5 w-3.5" aria-hidden="true" />
                </span>
                {t}
              </li>
            ))}
          </ul>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link to="/shop/bridal" className="btn-primary w-full sm:w-auto">
              Discover Bridal Jewellery
            </Link>
            <a
              href={whatsappLink(`Hello ${site.brandName}, I would like to book a bridal jewellery consultation.`)}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline w-full sm:w-auto"
            >
              Ask about bridal sets
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
