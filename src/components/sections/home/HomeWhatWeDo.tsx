import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useI18n } from '@/i18n/I18nContext'
import { services } from '@/data/services'
import { ServiceIcon } from '@/components/ServiceIcon'

const serviceKeys = ['customSoftware', 'enterpriseApps', 'saasPlatforms', 'softwareArchitecture', 'modernization'] as const

export function HomeWhatWeDo() {
  const { t, path } = useI18n()

  const getServiceContent = (id: string) => {
    const idx = services.findIndex((s) => s.id === id)
    const key = serviceKeys[idx]
    return key ? t.services[key] : { title: id, desc: '' }
  }

  const homeServices = [
    { id: services[0].id, icon: services[0].icon },
    { id: services[1].id, icon: services[1].icon },
    { id: services[2].id, icon: services[2].icon },
    { id: services[3].id, icon: services[3].icon },
    { id: services[4].id, icon: services[4].icon },
  ]

  return (
    <section className="py-20 lg:py-28 bg-brand-soft">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900">
            {t.home.whatWeDoTitle}
          </h2>
          <p className="mt-6 text-lg text-slate-600 leading-relaxed">
            {t.home.whatWeDoSubtitle}
          </p>
        </motion.div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {homeServices.map((s, i) => {
            const content = getServiceContent(s.id)
            return (
              <motion.div
                key={s.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
              >
                <Link
                  to={path('/services')}
                  className="block p-6 rounded-2xl bg-white border border-slate-200 shadow-sm hover:shadow-lg hover:border-brand transition-all duration-300 h-full"
                >
                  <div className="w-14 h-14 rounded-xl bg-brand-soft flex items-center justify-center text-brand">
                    <ServiceIcon name={s.icon} />
                  </div>
                  <h3 className="mt-4 text-lg font-semibold text-slate-900">{content.title}</h3>
                  <p className="mt-2 text-slate-600 text-sm leading-relaxed line-clamp-3">{content.desc}</p>
                </Link>
              </motion.div>
            )
          })}
        </div>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <Link
            to={path('/services')}
            className="inline-flex items-center gap-2 text-brand hover:text-brand-dark font-semibold transition-colors"
          >
            {t.home.viewAllServices}
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
