import { useState } from 'react'
import { Gem } from 'lucide-react'

// Image with a reserved aspect ratio (no layout shift), lazy loading by default
// and a graceful on-brand fallback if the file fails to load.
export default function Img({
  src,
  alt,
  ratio = '4 / 5',
  className = '',
  imgClassName = '',
  priority = false,
  position = 'center',
  sizes,
  srcSet,
  width = 800,
  height = 1000,
}) {
  const [failed, setFailed] = useState(false)

  return (
    <div className={`relative overflow-hidden bg-cream ${className}`} style={ratio ? { aspectRatio: ratio } : undefined}>
      {failed ? (
        <div role="img" aria-label={alt} className="flex h-full w-full flex-col items-center justify-center gap-2 text-gold-deep/70">
          <Gem className="h-8 w-8" aria-hidden="true" />
          <span className="px-3 text-center text-xs">Image unavailable</span>
        </div>
      ) : (
        <img
          src={src}
          srcSet={srcSet}
          sizes={sizes}
          alt={alt}
          width={width}
          height={height}
          loading={priority ? 'eager' : 'lazy'}
          fetchPriority={priority ? 'high' : 'auto'}
          decoding="async"
          onError={() => setFailed(true)}
          className={`absolute inset-0 h-full w-full object-cover ${imgClassName}`}
          style={{ objectPosition: position }}
        />
      )}
    </div>
  )
}
