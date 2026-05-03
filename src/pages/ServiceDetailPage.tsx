import { Helmet } from 'react-helmet-async'
import { Link, useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useI18n } from '@/i18n/I18nContext'
import { services } from '@/data/services'
import { serviceDetailsById } from '@/data/serviceDetails'
import { ServiceIcon } from '@/components/ServiceIcon'

const serviceKeys = ['customSoftware', 'enterpriseApps', 'saasPlatforms', 'softwareArchitecture', 'modernization'] as const

export function ServiceDetailPage() {
  const { id } = useParams<{ id: string }>()
  const { t, path } = useI18n()

  const service = services.find((s) => s.id === id)
  const idx = service ? services.findIndex((s) => s.id === id) : -1
  const sk = idx >= 0 ? serviceKeys[idx] : null
  const content = sk ? t.services[sk] : null
  const extra = id ? serviceDetailsById[id] : undefined

  if (!service || !content || !sk) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center pt-24 px-4">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-slate-900">{t.common.notFound}</h1>
          <Link to={path('/services')} className="mt-4 inline-block text-brand hover:text-brand-dark font-medium">
            {t.services.backTo}
          </Link>
        </div>
      </div>
    )
  }

  return (
    <>
      <Helmet>
        <title>{content.title} | Etihad Amu</title>
        <meta name="description" content={content.desc} />
        <meta property="og:title" content={`${content.title} | Etihad Amu`} />
        <meta property="og:description" content={content.desc} />
      </Helmet>
      <div className="pt-24 lg:pt-32 pb-24 bg-transparent min-h-screen">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            to={path('/services')}
            className="inline-flex items-center gap-2 text-black hover:text-brand transition-colors mb-8 text-sm font-medium"
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
            className="p-8 lg:p-12 rounded-2xl bg-white/95 backdrop-blur-md border border-slate-200/90 shadow-soft"
          >
            <div className="w-20 h-20 rounded-2xl bg-brand-soft flex items-center justify-center text-brand [&_svg]:w-12 [&_svg]:h-12 mb-8">
              <ServiceIcon name={service.icon} />
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-6">{content.title}</h1>
            <p className="text-black text-lg leading-relaxed">{content.desc}</p>
            {extra?.fullDesc && <p className="mt-6 text-black text-base leading-relaxed">{extra.fullDesc}</p>}
            {extra?.highlights && extra.highlights.length > 0 && (
              <div className="mt-8">
                <h3 className="text-lg font-semibold text-slate-800 mb-4">{t.services.highlightsTitle}</h3>
                <ul className="space-y-2 text-black">
                  {extra.highlights.map((line, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="text-brand mt-1 shrink-0">✓</span>
                      <span>{line}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </motion.article>

          <Link
            to={path('/contact')}
            className="mt-10 inline-flex items-center gap-2 px-8 py-4 bg-brand text-white rounded-xl font-semibold hover:bg-brand-dark transition-colors"
          >
            {t.contact.label}
            <svg className="w-5 h-5 rtl:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </div>
    </>
  )
}
