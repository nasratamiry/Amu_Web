import { Helmet } from 'react-helmet-async'
import { Outlet, useParams, Navigate, useLocation } from 'react-router-dom'
import { canonicalUrl } from '@/config/site'
import { I18nProvider } from '@/i18n/I18nContext'
import { Navbar } from './Navbar'
import { Footer } from './Footer'

function SiteRouteMeta() {
  const { pathname, search } = useLocation()
  const url = canonicalUrl(pathname, search)
  return (
    <Helmet>
      <link rel="canonical" href={url} />
      <meta property="og:url" content={url} />
    </Helmet>
  )
}

const VALID_LOCALES = ['en', 'fa', 'ps'] as const

export function Layout() {
  const { locale } = useParams<{ locale: string }>()

  if (!locale || !VALID_LOCALES.includes(locale as 'en' | 'fa' | 'ps')) {
    return <Navigate to="/en" replace />
  }

  return (
    <I18nProvider urlLocale={locale as 'en' | 'fa' | 'ps'}>
      <SiteRouteMeta />
      <div className="min-h-screen flex flex-col page-enterprise-flow">
        <Navbar />
        <main className="flex-1">
          <Outlet />
        </main>
        <Footer />
      </div>
    </I18nProvider>
  )
}
