import { motion } from 'framer-motion'
import { useI18n } from '@/i18n/I18nContext'

const icons = [
  <svg key="0" className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
  </svg>,
  <svg key="1" className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
  </svg>,
]

export function OurExpertise() {
  const { t } = useI18n()

  const items = [
    { title: t.home.expertise1Title, desc: t.home.expertise1Desc },
    { title: t.home.expertise2Title, desc: t.home.expertise2Desc },
  ]

  return (
    <section className="py-24 lg:py-28 bg-brand-soft">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900">
            {t.home.expertiseTitle}
          </h2>
          <p className="mt-6 text-lg text-slate-600 leading-relaxed">
            {t.home.expertiseSubtitle}
          </p>
        </motion.div>
        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          {items.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="p-8 lg:p-10 rounded-2xl bg-white border border-slate-200 shadow-soft hover:shadow-xl hover:border-brand/30 hover:-translate-y-1 transition-all duration-300"
            >
              <div className="w-16 h-16 rounded-2xl bg-brand-soft flex items-center justify-center text-brand [&_svg]:w-10 [&_svg]:h-10">
                {icons[i]}
              </div>
              <h3 className="mt-6 text-xl font-bold text-slate-900">{item.title}</h3>
              <p className="mt-4 text-slate-600 leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
