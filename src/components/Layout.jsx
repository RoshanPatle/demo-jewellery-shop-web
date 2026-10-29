import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'
import WhatsAppButton from './WhatsAppButton'

function ScrollManager() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
  }, [pathname])
  return null
}

export default function Layout() {
  const { pathname } = useLocation()
  // Product pages carry a fixed mobile action bar: reserve space so it never covers the footer.
  const hasStickyBar = pathname.startsWith('/product/')
  return (
    <div className={`flex min-h-screen flex-col ${hasStickyBar ? 'pb-[calc(5.5rem+env(safe-area-inset-bottom))] lg:pb-0' : ''}`}>
      <ScrollManager />
      <Header />
      <main id="main" tabIndex={-1} className="flex-1 focus:outline-none">
        <Outlet />
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  )
}
