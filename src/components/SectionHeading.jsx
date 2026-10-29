import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'

export default function SectionHeading({ eyebrow, title, description, align = 'center', action, id }) {
  const center = align === 'center'
  return (
    <div className={`mb-8 sm:mb-12 ${center ? 'mx-auto max-w-2xl text-center' : 'flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between'}`}>
      <div>
        {eyebrow && <p className="eyebrow mb-3">{eyebrow}</p>}
        <h2 id={id} className="h-section">
          {title}
        </h2>
        {description && <p className={`mt-3 text-[16px] leading-relaxed text-muted sm:text-lg ${center ? '' : 'max-w-xl'}`}>{description}</p>}
      </div>
      {action && (
        <Link
          to={action.to}
          className="inline-flex min-h-[44px] shrink-0 items-center gap-2 text-[15px] font-semibold text-gold-deep underline-offset-4 hover:underline"
        >
          {action.label}
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </Link>
      )}
    </div>
  )
}
