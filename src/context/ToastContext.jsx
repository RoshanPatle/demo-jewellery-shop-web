import { createContext, useCallback, useContext, useMemo, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { CheckCircle2, X } from 'lucide-react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'

const ToastContext = createContext(null)

export function ToastProvider({ children }) {
  const [toast, setToast] = useState(null)
  const timer = useRef()
  const reduce = useReducedMotion()

  const dismiss = useCallback(() => setToast(null), [])
  const show = useCallback((message, action) => {
    clearTimeout(timer.current)
    setToast({ id: Date.now(), message, action })
    timer.current = setTimeout(() => setToast(null), 3800)
  }, [])

  const value = useMemo(() => ({ show }), [show])

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div
        aria-live="polite"
        role="status"
        className="pointer-events-none fixed inset-x-0 top-[72px] z-[70] flex justify-center px-4 lg:top-24"
      >
        <AnimatePresence>
          {toast && (
            <motion.div
              key={toast.id}
              initial={reduce ? false : { opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduce ? { opacity: 0 } : { opacity: 0, y: -12 }}
              transition={{ duration: 0.2 }}
              className="pointer-events-auto flex w-full max-w-md items-center gap-3 rounded-2xl border border-line bg-white px-4 py-3 shadow-lift"
            >
              <CheckCircle2 className="h-5 w-5 shrink-0 text-gold-deep" aria-hidden="true" />
              <p className="min-w-0 flex-1 text-sm text-ink">{toast.message}</p>
              {toast.action && (
                <Link
                  to={toast.action.to}
                  onClick={dismiss}
                  className="shrink-0 rounded-lg px-2 py-2 text-sm font-semibold text-gold-deep underline-offset-4 hover:underline"
                >
                  {toast.action.label}
                </Link>
              )}
              <button
                type="button"
                onClick={dismiss}
                aria-label="Dismiss notification"
                className="icon-btn -mr-2 h-9 w-9 shrink-0"
              >
                <X className="h-4 w-4" aria-hidden="true" />
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  )
}

export const useToast = () => useContext(ToastContext)
