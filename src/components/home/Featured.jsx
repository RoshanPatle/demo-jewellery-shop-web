import SectionHeading from '../SectionHeading'
import ProductCard from '../ProductCard'
import { products } from '../../data/products'

const featured = products.filter((p) => p.featured)

export default function Featured() {
  return (
    <section aria-labelledby="featured-title" className="section-y">
      <div className="container-page">
        <SectionHeading
          id="featured-title"
          align="left"
          eyebrow="Signature pieces"
          title="Our Gold Favourites"
          description="Sample designs shown with indicative prices. Message us for today's rate, weight and availability."
          action={{ to: '/shop', label: 'View all jewellery' }}
        />
        <ul className="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4 lg:gap-6">
          {featured.map((p) => (
            <li key={p.slug}>
              <ProductCard product={p} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
