import { Link } from 'react-router-dom'
import Img from '../Img'
import Reveal from '../Reveal'

// Brand copy is intentionally general. Replace with the showroom's real story.
export default function Story() {
  return (
    <section aria-labelledby="story-title" className="section-y">
      <div className="container-page grid items-center gap-8 md:grid-cols-2 lg:gap-16">
        <Reveal className="md:order-2">
          <Img
            src="/images/story.svg"
            alt="Floral gold pendant above a stack of gold bangles"
            ratio={null}
            className="aspect-square rounded-3xl border border-line md:aspect-[4/5]"
            position="center 40%"
            sizes="(min-width:768px) 48vw, 100vw"
          />
        </Reveal>

        <Reveal delay={0.06} className="md:order-1">
          <p className="eyebrow mb-3">Our philosophy</p>
          <h2 id="story-title" className="h-section">
            Rooted in Tradition. Designed for Generations.
          </h2>
          <div className="mt-5 max-w-xl space-y-4 text-[16px] leading-relaxed text-muted sm:text-lg">
            <p>
              Gold has always marked India&rsquo;s most meaningful moments: weddings, festivals, new beginnings and the pieces handed down with love.
            </p>
            <p>
              We bring a traditional design language together with a clear, unhurried way of choosing jewellery, with honest product details and a team that is happy to guide you.
            </p>
          </div>
          <Link to="/about" className="btn-outline mt-7 w-full sm:w-auto">
            Read more about us
          </Link>
        </Reveal>
      </div>
    </section>
  )
}
