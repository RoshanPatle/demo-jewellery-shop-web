import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import Img from '../Img'
import { site } from '../../config/site'

export default function Hero() {
  return (
    <section aria-labelledby="hero-title" className="bg-ivory">
      <div className="container-page grid items-center gap-6 pb-10 pt-4 sm:gap-8 sm:pb-14 sm:pt-8 lg:grid-cols-[1fr_1fr] lg:gap-14 lg:py-16 xl:grid-cols-[0.95fr_1.05fr]">
        {/* Image leads on small screens, sits on the right from lg */}
        <div className="relative order-1 lg:order-2">
          <div
            aria-hidden="true"
            className="absolute -bottom-3 -right-3 hidden h-full w-full rounded-[28px] border border-gold/50 lg:block"
          />
          <Img
            src="/images/hero.svg"
            alt="Traditional Indian gold bridal jewellery set with layered necklace, jhumkas and maang tikka"
            ratio={null}
            className="relative aspect-[5/4] rounded-3xl border border-line xs:aspect-square sm:aspect-[16/11] lg:aspect-[4/5] lg:max-h-[min(78vh,760px)] lg:w-full"
            position="center 38%"
            priority
            sizes="(min-width:1024px) 50vw, 100vw"
          />
        </div>

        <div className="order-2 lg:order-1 lg:pr-4">
          <p className="eyebrow mb-3 sm:mb-4">{site.tagline}</p>
          <h1 id="hero-title" className="h-display">
            <span className="block">Timeless Gold.</span>
            <span className="block text-gold-deep">Endless Traditions.</span>
          </h1>
          <p className="mt-4 max-w-lg text-[16px] leading-relaxed text-muted sm:mt-5 sm:text-lg">
            Discover exquisite gold jewellery that celebrates India&rsquo;s rich heritage and the beauty of every special moment.
          </p>
          <div className="mt-6 flex flex-col gap-3 sm:mt-8 sm:flex-row sm:flex-wrap">
            <Link to="/shop" className="btn-primary w-full sm:w-auto">
              Explore Gold Collection
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
            <Link to="/shop/bridal" className="btn-outline w-full sm:w-auto">
              Discover Bridal Jewellery
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
