// Simple line glyphs for social links (lucide-react no longer ships brand icons).
const base = { viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 1.8, strokeLinecap: 'round', strokeLinejoin: 'round', 'aria-hidden': true }

export const Instagram = ({ className = 'h-5 w-5' }) => (
  <svg {...base} className={className}>
    <rect x="3" y="3" width="18" height="18" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.2" cy="6.8" r="0.8" fill="currentColor" stroke="none" />
  </svg>
)

export const Facebook = ({ className = 'h-5 w-5' }) => (
  <svg {...base} className={className}>
    <path d="M14 8.5h2.5V5H14c-2.2 0-3.5 1.5-3.5 3.7V11H8v3.5h2.5V21H14v-6.5h2.4l.6-3.5H14V9.2c0-.5.2-.7 0-.7Z" />
  </svg>
)

export const Youtube = ({ className = 'h-5 w-5' }) => (
  <svg {...base} className={className}>
    <rect x="2.5" y="5.5" width="19" height="13" rx="4" />
    <path d="m10.5 9.5 4.5 2.5-4.5 2.5Z" fill="currentColor" />
  </svg>
)
