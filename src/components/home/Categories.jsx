import { Link } from 'react-router-dom'
import SectionHeading from '../SectionHeading'
import Img from '../Img'
import Reveal from '../Reveal'
import { categories } from '../../data/categories'

export default function Categories() {
  return (
    <section aria-labelledby="cat-title" className="section-y bg-cream">
      <div className="container-page">
        <SectionHeading
          id="cat-title"
          eyebrow="Shop by category"
          title="Gold for Every Occasion"
          description="From everyday elegance to wedding heirlooms, explore our six jewellery collections."
        />
        <ul className="mx-auto grid max-w-[1200px] grid-cols-2 gap-3 sm:gap-5 md:grid-cols-3 lg:gap-6">
          {categories.map((c, i) => (
            <li key={c.slug}>
              <Reveal delay={(i % 3) * 0.06}>
                <Link
                  to={`/shop/${c.slug}`}
                  className="group block overflow-hidden rounded-2xl border border-line bg-white shadow-soft transition-[transform,box-shadow] duration-300 active:scale-[0.985] [@media(hover:hover)]:hover:shadow-lift"
                >
                  <Img
                    src={c.image}
                    alt={`${c.name} collection`}
                    ratio={null}
                    className="aspect-[4/5] md:aspect-square"
                    sizes="(min-width:1280px) 380px, (min-width:768px) 30vw, 46vw"
                    imgClassName="transition-transform duration-500 ease-out motion-safe:[@media(hover:hover)]:group-hover:scale-105"
                  />
                  <div className="flex items-center justify-between gap-2 px-3.5 py-3.5 sm:px-5 sm:py-4">
                    <div className="min-w-0">
                      <h3 className="font-serif text-[18px] font-semibold leading-tight sm:text-2xl">{c.name}</h3>
                      <p className="mt-1 hidden text-sm text-muted sm:block">{c.blurb}</p>
                    </div>
                    <span aria-hidden="true" className="shrink-0 text-lg text-gold-deep transition-transform group-hover:translate-x-1">
                      →
                    </span>
                  </div>
                </Link>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
