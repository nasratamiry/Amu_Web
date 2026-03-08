import { motion } from 'framer-motion'
import { useI18n } from '@/i18n/I18nContext'

export function About() {
  const { t } = useI18n()

  return (
    <section className="py-24 lg:py-32 bg-white">
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

            <div className="mt-10 grid sm:grid-cols-2 gap-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                className="p-5 rounded-xl bg-brand-soft/50 border border-brand/20 shadow-sm hover:shadow-md transition-shadow"
              >
                <h3 className="text-lg font-bold text-slate-900 mb-2">{t.about.vision}</h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  {t.about.visionText}
                </p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                className="p-5 rounded-xl bg-slate-50 border border-slate-200 shadow-sm hover:shadow-md transition-shadow"
              >
                <h3 className="text-lg font-bold text-slate-900 mb-2">{t.about.mission}</h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  {t.about.missionText}
                </p>
              </motion.div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6 }}
          >
            <div className="aspect-[4/3] rounded-2xl bg-slate-100 border border-slate-200 overflow-hidden shadow-sm hover:shadow-lg hover:border-brand transition-all duration-300">
              <img
                src="/about-workspace.png"
                alt="Software development collaboration"
                loading="lazy"
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
