import { Link } from 'react-router-dom'
import { brandParts, site } from '../config/site'

export function LogoMark({ className = 'h-8 w-8' }) {
  return (
    <svg viewBox="0 0 40 40" className={className} aria-hidden="true">
      <path d="M20 4 L31 14 L20 36 L9 14 Z" fill="#B99A5B" />
      <path d="M9 14 H31 M15 4 L9 14 L20 36 M25 4 L31 14 L20 36 M20 4 V14" stroke="#FFFCF7" strokeWidth="1.2" fill="none" strokeLinejoin="round" />
    </svg>
  )
}

export default function Logo({ onClick, className = '' }) {
  return (
    <Link
      to="/"
      onClick={onClick}
      aria-label={`${site.brandName} – home`}
      className={`flex min-w-0 items-center gap-2 rounded-md py-1 xs:gap-2.5 ${className}`}
    >
      <LogoMark className="h-6 w-6 shrink-0 xs:h-7 xs:w-7 sm:h-8 sm:w-8" />
      <span className="flex min-w-0 flex-col leading-none">
        <span className="truncate font-serif text-[17px] font-bold tracking-[0.12em] text-ink xs:text-[20px] xs:tracking-[0.16em] sm:text-[24px]">
          {brandParts.first}
        </span>
        {brandParts.rest && (
          <span className="mt-1 text-[10px] font-semibold uppercase tracking-[0.5em] text-gold-deep sm:text-[11px]">
            {brandParts.rest}
          </span>
        )}
      </span>
    </Link>
  )
}
