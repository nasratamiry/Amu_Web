import { useState } from 'react'
import { motion } from 'framer-motion'
import { submitContactMessage } from '@/api'
import { useI18n } from '@/i18n/I18nContext'

export function Contact() {
  const { t } = useI18n()
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState<string>('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('submitting')
    setErrorMessage('')

    const result = await submitContactMessage({
      name: formState.name,
      email: formState.email,
      message: formState.message,
      subject: formState.subject || undefined,
    })

    if (result.success) {
      setStatus('success')
      setFormState({ name: '', email: '', subject: '', message: '' })
    } else {
      setStatus('error')
      setErrorMessage(result.message || t.contact.error)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormState((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  return (
    <section className="py-24 lg:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-brand font-semibold text-sm uppercase tracking-wider">
              {t.contact.label}
            </span>
            <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900">
              {t.contact.title}
            </h2>
            <p className="mt-6 text-slate-600 text-lg leading-relaxed">
              {t.contact.subtitle}
            </p>

            <div className="mt-10 space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-brand-soft border border-brand/20 flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-brand" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900">{t.contact.email}</h3>
                  <a href="mailto:info@amu.one" className="text-brand hover:text-brand-dark transition-colors">
                    info@amu.one
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-brand-soft border border-brand/20 flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-brand" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900">{t.contact.phone}</h3>
                  <a href="tel:+93786174307" className="text-brand hover:text-brand-dark transition-colors">
                    +93 786 174 307
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-brand-soft border border-brand/20 flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-brand" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900">{t.contact.office}</h3>
                  <p className="text-slate-600">Kabul, Afghanistan</p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <form onSubmit={handleSubmit} className="space-y-6 p-8 rounded-2xl bg-slate-50 border border-slate-200 shadow-sm">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-2">
                  {t.contact.name}
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  value={formState.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl bg-white border border-slate-200 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand focus:border-transparent"
                  placeholder={t.contact.namePlaceholder}
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-2">
                  {t.contact.email}
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={formState.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl bg-white border border-slate-200 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand focus:border-transparent"
                  placeholder={t.contact.emailPlaceholder}
                />
              </div>
              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-slate-700 mb-2">
                  {t.contact.subject}
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formState.subject}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl bg-white border border-slate-200 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand focus:border-transparent"
                  placeholder={t.contact.subjectPlaceholder}
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-slate-700 mb-2">
                  {t.contact.message}
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={5}
                  value={formState.message}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl bg-white border border-slate-200 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand focus:border-transparent resize-none"
                  placeholder={t.contact.messagePlaceholder}
                />
              </div>
              {status === 'success' && (
                <p className="text-green-600 text-sm">{t.contact.success}</p>
              )}
              {status === 'error' && (
                <p className="text-red-600 text-sm">{errorMessage}</p>
              )}
              <button
                type="submit"
                disabled={status === 'submitting'}
                className="w-full py-4 px-6 bg-brand text-white rounded-2xl font-semibold hover:bg-brand-dark active:bg-brand-dark shadow-brand hover:shadow-brand-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
              >
                {status === 'submitting' ? t.contact.sending : t.contact.send}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
