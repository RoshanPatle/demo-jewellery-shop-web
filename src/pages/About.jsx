import { Link } from 'react-router-dom'
import { Gem, FileText, HeartHandshake } from 'lucide-react'
import Img from '../components/Img'
import { site, whatsappLink } from '../config/site'
import { usePageTitle } from '../hooks/useUi'
import WhatsAppIcon from '../components/WhatsAppIcon'

// General brand copy. Replace with the showroom's real story, history and team.
const values = [
  { Icon: Gem, title: 'Craft and design', text: 'We favour designs rooted in Indian tradition, from temple-inspired necklaces to modern everyday pieces.' },
  { Icon: FileText, title: 'Clear information', text: 'Every piece lists its purity and approximate weight so you can compare with confidence.' },
  { Icon: HeartHandshake, title: 'Personal guidance', text: 'Whether it is a wedding or a small gift, we help you find the right piece without pressure.' },
]

export default function About() {
  usePageTitle('About us')
  return (
    <>
      <section className="bg-cream">
        <div className="container-page grid items-center gap-8 py-12 md:grid-cols-2 lg:gap-16 lg:py-20">
          <div>
            <p className="eyebrow mb-3">About us</p>
            <h1 className="h-display">Rooted in Tradition. Designed for Generations.</h1>
            <p className="mt-5 max-w-xl text-[16px] leading-relaxed text-muted sm:text-lg">
              {site.brandName} celebrates the beauty of Indian gold jewellery, from the pieces that mark weddings and festivals to the ones worn every day.
            </p>
          </div>
          <Img
            src="/images/story.svg"
            alt="Floral gold pendant above a stack of gold bangles"
            ratio={null}
            className="aspect-square rounded-3xl border border-line md:aspect-[4/5]"
            position="center 40%"
            priority
            sizes="(min-width:768px) 48vw, 100vw"
          />
        </div>
      </section>

      <section className="section-y">
        <div className="container-page">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="h-section">What we care about</h2>
          </div>
          <ul className="mt-10 grid gap-4 md:grid-cols-3 md:gap-6">
            {values.map(({ Icon, title, text }) => (
              <li key={title} className="card p-6 sm:p-8">
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-gold-soft/70 text-gold-deep">
                  <Icon className="h-6 w-6" aria-hidden="true" />
                </span>
                <h3 className="mt-5 font-serif text-2xl font-semibold">{title}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-muted">{text}</p>
              </li>
            ))}
          </ul>
          <div className="mt-12 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center">
            <Link to="/shop" className="btn-primary">
              Explore Gold Collection
            </Link>
            <a href={whatsappLink(`Hello ${site.brandName}, I would like to know more about your jewellery.`)} target="_blank" rel="noopener noreferrer" className="btn-outline">
              <WhatsAppIcon className="h-5 w-5" /> Talk to us on WhatsApp
            </a>
          </div>
        </div>
      </section>
    </>
  )
}
