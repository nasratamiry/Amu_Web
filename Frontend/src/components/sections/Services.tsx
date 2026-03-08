import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useI18n } from '@/i18n/I18nContext'
import { services } from '@/data/services'
import { ServiceIcon } from '@/components/ServiceIcon'

const serviceKeys = ['customSoftware', 'enterpriseApps', 'saasPlatforms', 'softwareArchitecture', 'modernization'] as const

export function Services() {
  const { t, path } = useI18n()

  const getServiceContent = (id: string) => {
    const key = serviceKeys[services.findIndex((s) => s.id === id)]
    return key ? t.services[key] : { title: id, desc: '' }
  }

  return (
    <section className="py-24 lg:py-32 bg-brand-soft">
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
          className="mt-20 grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-8"
        >
          {services.map((service, i) => {
            const content = getServiceContent(service.id)
            return (
              <Link key={service.id} to={path(`/services/${service.id}`)} className="block h-full">
                <motion.div
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.15 }}
                  whileHover={{ y: -4 }}
                  className="group p-8 rounded-2xl bg-white border border-slate-200 shadow-soft hover:bg-brand hover:shadow-xl hover:border-brand transition-all duration-150 h-full flex flex-col items-center text-center cursor-pointer"
                >
                  <div className="w-16 h-16 rounded-2xl bg-brand-soft flex items-center justify-center text-brand group-hover:bg-white/30 group-hover:text-white transition-all duration-150 [&_svg]:w-10 [&_svg]:h-10 [&_svg]:transition-colors [&_svg]:duration-150">
                    <ServiceIcon name={service.icon} className="group-hover:text-white transition-colors duration-150" />
                  </div>
                  <h3 className="mt-6 text-lg font-bold text-slate-900 group-hover:text-white transition-colors duration-150">{content.title}</h3>
                </motion.div>
              </Link>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
