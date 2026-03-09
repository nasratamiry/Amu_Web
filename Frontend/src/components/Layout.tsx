import { Outlet, useParams, Navigate } from 'react-router-dom'
import { I18nProvider } from '@/i18n/I18nContext'
import { Navbar } from './Navbar'
import { Footer } from './Footer'
import { ScrollToTop } from './ScrollToTop'

const VALID_LOCALES = ['en', 'fa', 'ps'] as const

export function Layout() {
  const { locale } = useParams<{ locale: string }>()

  if (!locale || !VALID_LOCALES.includes(locale as 'en' | 'fa' | 'ps')) {
    return <Navigate to="/en" replace />
  }

  return (
    <I18nProvider urlLocale={locale as 'en' | 'fa' | 'ps'}>
      <ScrollToTop />
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1">
          <Outlet />
        </main>
        <Footer />
      </div>
    </I18nProvider>
  )
}
