import { motion } from 'framer-motion'
import { technologies } from '@/data/technologies'
import { useI18n } from '@/i18n/I18nContext'

export function Technologies() {
  const { t } = useI18n()

  return (
    <section className="py-20 lg:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto"
        >
          <span className="text-brand font-semibold text-sm uppercase tracking-wider">{t.technologies.label}</span>
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
          transition={{ delay: 0.2 }}
          className="mt-16 flex flex-wrap justify-center gap-3"
        >
          {technologies.map((tech, index) => (
            <motion.span
              key={tech.name}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.02 }}
              className="px-4 py-2 rounded-full bg-slate-100 border border-slate-200 text-slate-700 text-sm font-medium hover:border-brand hover:text-brand hover:shadow-md transition-all duration-300"
            >
              {tech.name}
            </motion.span>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-12 flex flex-wrap justify-center gap-4"
        >
          {[...new Set(technologies.map((tech) => tech.category))].map((category) => (
            <span key={category} className="text-xs text-slate-500 uppercase tracking-wider">
              {category}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
