import { Minus, Plus } from 'lucide-react'

export default function QuantityStepper({ value, onChange, min = 1, max = 10, label = 'Quantity' }) {
  const btn =
    'flex h-11 w-11 items-center justify-center rounded-full text-ink transition-colors hover:bg-cream active:bg-cream disabled:opacity-40 disabled:hover:bg-transparent'
  return (
    <div role="group" aria-label={label} className="inline-flex items-center rounded-full border border-line bg-white p-0.5">
      <button type="button" className={btn} onClick={() => onChange(value - 1)} disabled={value <= min} aria-label={`Decrease ${label.toLowerCase()}`}>
        <Minus className="h-4 w-4" aria-hidden="true" />
      </button>
      <output aria-live="polite" className="min-w-[2.25rem] text-center text-[16px] font-semibold tabular-nums">
        {value}
      </output>
      <button type="button" className={btn} onClick={() => onChange(value + 1)} disabled={value >= max} aria-label={`Increase ${label.toLowerCase()}`}>
        <Plus className="h-4 w-4" aria-hidden="true" />
      </button>
    </div>
  )
}
