import { motion } from 'framer-motion'
import { useI18n } from '@/i18n/I18nContext'
import { services } from '@/data/services'
import { ServiceIcon } from '@/components/ServiceIcon'

const serviceKeys = ['customSoftware', 'enterpriseApps', 'saasPlatforms', 'softwareArchitecture', 'modernization'] as const

export function Services() {
  const { t } = useI18n()

  const getServiceContent = (id: string) => {
    const key = serviceKeys[services.findIndex((s) => s.id === id)]
    return key ? t.services[key] : { title: id, desc: '' }
  }

  return (
    <section className="py-20 lg:py-32 bg-brand-soft">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto"
        >
          <span className="text-brand font-semibold text-sm uppercase tracking-wider">{t.services.label}</span>
          <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900">
            {t.services.title}
          </h2>
          <p className="mt-6 text-slate-600 text-lg">
            {t.services.subtitle}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-50px' }}
          className="mt-16 grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6"
        >
          {services.map((service, i) => {
            const content = getServiceContent(service.id)
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group p-6 rounded-2xl bg-white border border-slate-200 shadow-sm hover:shadow-lg hover:border-brand transition-all duration-300"
              >
                <div className="w-14 h-14 rounded-xl bg-brand-soft flex items-center justify-center text-brand group-hover:text-brand-dark group-hover:scale-110 transition-all">
                  <ServiceIcon name={service.icon} />
                </div>
                <h3 className="mt-4 text-lg font-semibold text-slate-900">{content.title}</h3>
                <p className="mt-2 text-slate-600 text-sm leading-relaxed">{content.desc}</p>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
