import { motion } from 'framer-motion'
import { technologies } from '@/data/technologies'
import { useI18n } from '@/i18n/I18nContext'

const ICON_BASE = 'https://cdn.simpleicons.org'

export function Technologies() {
  const { t } = useI18n()

  return (
    <section className="py-24 lg:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto"
        >
          <span className="text-brand font-semibold text-sm uppercase tracking-wider">
            {t.technologies.label}
          </span>
          <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900">
            {t.technologies.title}
          </h2>
          <p className="mt-6 text-slate-600 text-lg">
            {t.technologies.subtitle}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="mt-16 p-8 lg:p-12 rounded-3xl bg-slate-50/80 border border-slate-200"
        >
          <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-7 gap-6">
            {technologies.map((tech, index) => (
              <motion.div
                key={tech.name}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.02 }}
                whileHover={{ y: -4 }}
                className="group flex flex-col items-center gap-3 p-5 rounded-2xl bg-white border border-slate-200 hover:border-brand/30 hover:shadow-lg transition-all duration-300"
              >
                <div className="w-14 h-14 rounded-xl flex items-center justify-center overflow-hidden p-2 group-hover:scale-105 transition-transform">
                  <img
                      src={`${ICON_BASE}/${tech.icon}`}
                      alt={tech.name}
                      className="w-full h-full object-contain"
                      loading="lazy"
                    />
                </div>
                <span className="text-slate-900 font-semibold text-sm text-center group-hover:text-brand transition-colors">
                  {tech.name}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
