import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useI18n } from '@/i18n/I18nContext'
import { LazyImage } from '@/components/LazyImage'

export function HomeHero() {
  const { t, path } = useI18n()

  return (
    <section className="relative overflow-hidden pt-24 lg:pt-32 pb-16 lg:pb-24 bg-hero-brand">
      <div className="absolute inset-0 bg-gradient-radial from-brand-soft/40 via-transparent to-transparent" />
      <div className="absolute top-1/3 left-1/4 w-80 h-80 bg-brand/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-brand-light/15 rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="order-2 lg:order-1"
          >
            <span className="inline-block mb-6 px-4 py-2 rounded-full bg-brand-soft border border-brand/20 text-brand text-sm font-semibold uppercase tracking-wider">
              {t.hero.badge}
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight tracking-tight text-slate-900">
              {t.home.heroTitle}
            </h1>
            <p className="mt-6 text-lg sm:text-xl text-slate-600 leading-relaxed">
              {t.home.heroSubtitle}
            </p>
            <p className="mt-4 text-slate-600 leading-relaxed">
              {t.home.heroTagline}
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link
                to={path('/contact')}
                className="group inline-flex items-center gap-2 px-8 py-4 bg-brand rounded-xl font-semibold text-white hover:bg-brand-dark active:bg-brand-dark shadow-lg shadow-brand/25 transition-all duration-300"
              >
                {t.hero.cta1}
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform rtl:group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
              <Link
                to={path('/services')}
                className="inline-flex items-center gap-2 px-8 py-4 border-2 border-brand rounded-xl font-semibold text-brand hover:bg-brand-soft active:bg-brand-soft transition-all duration-300"
              >
                {t.hero.cta2}
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative order-1 lg:order-2"
          >
            <div className="aspect-[4/3] lg:aspect-square rounded-2xl overflow-hidden bg-slate-100 border border-slate-200 shadow-xl">
              <LazyImage
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80"
                alt="Etihad Amu team"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 rtl:right-auto rtl:left-6 max-w-xs p-6 rounded-2xl bg-white/95 backdrop-blur-sm border border-slate-200 shadow-xl">
              <h3 className="text-lg font-bold text-slate-900">{t.about.mission}</h3>
              <p className="mt-2 text-slate-600 text-sm leading-relaxed">
                {t.about.missionText}
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
