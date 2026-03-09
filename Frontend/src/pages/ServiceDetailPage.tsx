import { useParams, Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import { services } from '@/data/services'
import { ServiceIcon } from '@/components/ServiceIcon'
import { useI18n } from '@/i18n/I18nContext'

const serviceKeys = ['customSoftware', 'enterpriseApps', 'saasPlatforms', 'softwareArchitecture', 'modernization'] as const

export function ServiceDetailPage() {
  const { id } = useParams<{ id: string }>()
  const { t, path } = useI18n()

  const service = services.find((s) => s.id === id)
  const key = service ? serviceKeys[services.findIndex((s) => s.id === id)] : null
  const content = key ? t.services[key] : null

  if (!service || !content) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center pt-24">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-slate-900">{t.common.notFound}</h1>
          <Link to={path('/services')} className="mt-4 inline-block text-brand hover:text-brand-dark">
            {t.services.backTo}
          </Link>
        </div>
      </div>
    )
  }

  return (
    <>
      <Helmet>
        <title>{content.title} | Etihad Amu Services</title>
        <meta name="description" content={content.desc} />
        <meta property="og:title" content={`${content.title} | Etihad Amu Services`} />
        <meta property="og:description" content={content.desc} />
      </Helmet>

      <div className="pt-24 lg:pt-32 pb-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            to={path('/services')}
            className="inline-flex items-center gap-2 text-slate-600 hover:text-brand transition-colors mb-8"
          >
            <svg className="w-5 h-5 rtl:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            {t.services.backTo}
          </Link>

          <motion.article
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="p-8 lg:p-12 rounded-2xl bg-white border border-slate-200 shadow-soft"
          >
            <div className="w-20 h-20 rounded-2xl bg-brand-soft flex items-center justify-center text-brand [&_svg]:w-12 [&_svg]:h-12 mb-8">
              <ServiceIcon name={service.icon} />
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-6">{content.title}</h1>
            <p className="text-slate-600 text-lg leading-relaxed">{content.desc}</p>

            {content.fullDesc && (
              <p className="mt-6 text-slate-600 text-base leading-relaxed">{content.fullDesc}</p>
            )}

            {content.highlights && content.highlights.length > 0 && (
              <div className="mt-8">
                <h3 className="text-lg font-semibold text-slate-800 mb-4">
                  {t.services.highlightsTitle}
                </h3>
                <ul className="space-y-2 text-slate-600">
                  {content.highlights.map((item: string, idx: number) => (
                    <li key={idx} className="flex items-start gap-3">
                      <span className="text-brand mt-1 shrink-0">✓</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <Link
              to={path('/contact')}
              className="mt-10 inline-flex items-center gap-2 px-8 py-4 bg-brand text-white rounded-xl font-semibold hover:bg-brand-dark transition-colors"
            >
              {t.contact.label}
              <svg className="w-5 h-5 rtl:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </motion.article>
        </div>
      </div>
    </>
  )
}
