import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useI18n } from '@/i18n/I18nContext'

export function Hero() {
  const { t, path } = useI18n()

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 bg-hero-brand">
      <div className="absolute inset-0 bg-gradient-radial from-brand-soft/50 via-transparent to-transparent" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-brand/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-brand-light/20 rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-block mb-8 px-4 py-2 rounded-full bg-brand-soft border border-brand/20 text-brand text-sm font-medium"
        >
          {t.hero.badge}
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-relaxed sm:leading-loose tracking-tight text-slate-900"
        >
          <span>{t.hero.title1} </span>
          <span className="text-brand block mt-2">
            {t.hero.title2}
          </span>
          <span className="text-slate-900 block mt-2">{t.hero.title3}</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-10 max-w-2xl mx-auto text-lg sm:text-xl text-slate-600 leading-loose"
        >
          {t.hero.subtitle}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-12 flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <Link
            to={path('/contact')}
            className="group inline-flex items-center gap-2 px-8 py-4 bg-brand text-white rounded-2xl font-semibold hover:bg-brand-dark active:bg-brand-dark shadow-brand hover:shadow-brand-lg transition-all duration-300"
          >
            {t.hero.cta1}
            <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform rtl:group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
          <Link
            to={path('/projects')}
            className="inline-flex items-center gap-2 px-8 py-4 border-2 border-brand text-brand rounded-2xl font-semibold hover:bg-brand-soft active:bg-brand-soft transition-all duration-300"
          >
            {t.hero.cta2}
          </Link>
        </motion.div>

      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <Link to={path('/about')} className="flex flex-col items-center gap-2 text-brand hover:text-brand-dark transition-colors">
          <span className="text-xs">{t.hero.scroll}</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-6 h-10 rounded-full border-2 border-slate-300 flex items-start justify-center p-2"
          >
            <div className="w-1 h-2 rounded-full bg-brand" />
          </motion.div>
        </Link>
      </motion.div>
    </section>
  )
}
