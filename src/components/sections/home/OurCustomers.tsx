import { motion } from 'framer-motion'
import { useI18n } from '@/i18n/I18nContext'

export function OurCustomers() {
  const { t } = useI18n()

  return (
    <section className="py-20 lg:py-28 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900">
            {t.home.customersTitle}
          </h2>
          <p className="mt-8 text-lg sm:text-xl text-slate-600 leading-relaxed">
            {t.home.customersText}
          </p>
        </motion.div>
      </div>
    </section>
  )
}
