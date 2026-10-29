import { useRef, useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useReducedMotion } from 'framer-motion'
import Img from './Img'

// Swipeable (scroll-snap) gallery with thumbnail buttons and prev/next controls.
export default function ProductGallery({ images, name }) {
  const [active, setActive] = useState(0)
  const track = useRef(null)
  const reduce = useReducedMotion()

  const goTo = (i) => {
    const el = track.current
    if (!el) return
    const next = Math.max(0, Math.min(images.length - 1, i))
    el.scrollTo({ left: next * el.clientWidth, behavior: reduce ? 'auto' : 'smooth' })
    setActive(next)
  }
  const onScroll = () => {
    const el = track.current
    if (!el) return
    const i = Math.round(el.scrollLeft / el.clientWidth)
    if (i !== active) setActive(i)
  }
  const onKey = (e) => {
    if (e.key === 'ArrowRight') {
      e.preventDefault()
      goTo(active + 1)
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault()
      goTo(active - 1)
    }
  }

  const ctrl =
    'absolute top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-line bg-white/95 text-ink shadow-soft transition-opacity hover:bg-white disabled:pointer-events-none disabled:opacity-0'

  return (
    <div role="region" aria-roledescription="carousel" aria-label={`${name} photos`}>
      <div className="relative overflow-hidden rounded-3xl border border-line bg-cream">
        <div
          ref={track}
          onScroll={onScroll}
          onKeyDown={onKey}
          tabIndex={0}
          aria-label="Swipe or use arrow keys to change photo"
          className="no-scrollbar flex snap-x snap-mandatory overflow-x-auto overscroll-x-contain focus-visible:outline-offset-[-3px]"
        >
          {images.map((src, i) => (
            <div key={src} className="w-full shrink-0 snap-center" role="group" aria-roledescription="slide" aria-label={`${i + 1} of ${images.length}`}>
              <Img
                src={src}
                alt={`${name}, view ${i + 1} of ${images.length}`}
                ratio={null}
                className="aspect-[4/5] lg:aspect-[5/6]"
                priority={i === 0}
                sizes="(min-width:1024px) 50vw, 100vw"
              />
            </div>
          ))}
        </div>

        {images.length > 1 && (
          <>
            <button type="button" className={`${ctrl} left-3`} onClick={() => goTo(active - 1)} disabled={active === 0} aria-label="Previous photo">
              <ChevronLeft className="h-5 w-5" aria-hidden="true" />
            </button>
            <button type="button" className={`${ctrl} right-3`} onClick={() => goTo(active + 1)} disabled={active === images.length - 1} aria-label="Next photo">
              <ChevronRight className="h-5 w-5" aria-hidden="true" />
            </button>
            <p className="absolute bottom-3 left-1/2 -translate-x-1/2 rounded-full bg-white/95 px-3 py-1 text-xs font-medium text-muted shadow-soft" aria-live="polite">
              {active + 1} / {images.length}
            </p>
          </>
        )}
      </div>

      {images.length > 1 && (
        <ul className="mt-3 grid grid-cols-4 gap-2 sm:gap-3">
          {images.map((src, i) => (
            <li key={src}>
              <button
                type="button"
                onClick={() => goTo(i)}
                aria-label={`Show photo ${i + 1}`}
                aria-current={i === active}
                className={`block w-full overflow-hidden rounded-xl border-2 transition-colors ${i === active ? 'border-gold-deep' : 'border-line hover:border-gold'}`}
              >
                <Img src={src} alt="" ratio="1 / 1" sizes="120px" width={200} height={200} />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
