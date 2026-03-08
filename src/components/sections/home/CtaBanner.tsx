import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useI18n } from '@/i18n/I18nContext'

export function CtaBanner() {
  const { t, path } = useI18n()

  return (
    <section className="py-20 lg:py-28 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="p-12 lg:p-16 rounded-3xl bg-brand-soft border border-brand/20"
        >
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900">
            {t.home.ctaBannerTitle}
          </h2>
          <p className="mt-6 text-lg text-slate-600">
            {t.home.ctaBannerText}
          </p>
          <Link
            to={path('/contact')}
            className="mt-10 inline-flex items-center gap-2 px-8 py-4 bg-brand rounded-xl font-semibold text-white hover:bg-brand-dark transition-colors"
          >
            {t.home.ctaBannerButton}
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
