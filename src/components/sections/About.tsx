import { motion } from 'framer-motion'
import { useI18n } from '@/i18n/I18nContext'

export function About() {
  const { t } = useI18n()

  return (
    <section className="py-20 lg:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-brand font-semibold text-sm uppercase tracking-wider">{t.about.label}</span>
            <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900">
              {t.about.title}
            </h2>
            <p className="mt-6 text-slate-600 text-lg leading-relaxed">
              {t.about.para1}
            </p>
            <p className="mt-4 text-slate-600 text-lg leading-relaxed">
              {t.about.para2}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="aspect-[4/3] rounded-2xl bg-slate-100 border border-slate-200 overflow-hidden shadow-sm hover:shadow-lg hover:border-brand transition-all duration-300">
              <img
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80"
                alt="Team collaboration"
                loading="lazy"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 rtl:right-auto rtl:left-6 w-full max-w-xs p-6 rounded-2xl bg-brand-soft border border-brand/20 backdrop-blur-sm shadow-lg">
              <div className="text-3xl font-bold text-slate-900">{t.about.mission}</div>
              <p className="mt-2 text-slate-600 text-sm">
                {t.about.missionText}
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
