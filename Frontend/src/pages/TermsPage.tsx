import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import { useI18n } from '@/i18n/I18nContext'

export function TermsPage() {
  const { t, path } = useI18n()

  return (
    <>
      <Helmet>
        <title>{t.terms.title} | Etihad Amu</title>
        <meta name="description" content={t.terms.intro} />
      </Helmet>
      <div className="pt-24 lg:pt-32 pb-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            to={path('/')}
            className="inline-flex items-center gap-2 text-slate-600 hover:text-brand transition-colors mb-8"
          >
            <svg className="w-5 h-5 rtl:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            {t.common.backHome}
          </Link>
          <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-2">{t.terms.title}</h1>
          <p className="text-slate-500 text-sm mb-10">{t.terms.lastUpdated}: {new Date().toLocaleDateString()}</p>

          <div className="prose prose-slate max-w-none space-y-8">
            <p className="text-slate-600 leading-relaxed">{t.terms.intro}</p>

            <section>
              <h2 className="text-xl font-bold text-slate-900 mb-3">{t.terms.services}</h2>
              <p className="text-slate-600 leading-relaxed">{t.terms.servicesDesc}</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-slate-900 mb-3">{t.terms.usage}</h2>
              <p className="text-slate-600 leading-relaxed">{t.terms.usageDesc}</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-slate-900 mb-3">{t.terms.intellectual}</h2>
              <p className="text-slate-600 leading-relaxed">{t.terms.intellectualDesc}</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-slate-900 mb-3">{t.terms.liability}</h2>
              <p className="text-slate-600 leading-relaxed">{t.terms.liabilityDesc}</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-slate-900 mb-3">{t.terms.contact}</h2>
              <p className="text-slate-600 leading-relaxed">{t.terms.contactDesc}</p>
            </section>
          </div>
        </div>
      </div>
    </>
  )
}
