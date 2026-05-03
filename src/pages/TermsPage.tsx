import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import { useI18n } from '@/i18n/I18nContext'

function Section({ title, body }: { title: string; body: string }) {
  return (
    <section className="mt-10">
      <h2 className="text-xl font-bold text-slate-900">{title}</h2>
      <p className="mt-3 text-black leading-relaxed">{body}</p>
    </section>
  )
}

export function TermsPage() {
  const { t, path } = useI18n()
  const p = t.terms

  return (
    <>
      <Helmet>
        <title>{p.title} | {t.footer.companyName}</title>
        <meta name="description" content={p.intro} />
      </Helmet>
      <div className="pt-24 lg:pt-32 pb-20 bg-transparent min-h-[60vh]">
        <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-slate-900">{p.title}</h1>
          <p className="mt-2 text-sm text-slate-600">
            {p.lastUpdated}: {new Date().toLocaleDateString()}
          </p>
          <p className="mt-8 text-black leading-relaxed">{p.intro}</p>
          <Section title={p.services} body={p.servicesDesc} />
          <Section title={p.usage} body={p.usageDesc} />
          <Section title={p.intellectual} body={p.intellectualDesc} />
          <Section title={p.liability} body={p.liabilityDesc} />
          <Section title={p.contact} body={p.contactDesc} />
          <p className="mt-12 text-sm text-slate-600">
            <Link to={path('/')} className="text-brand hover:text-brand-dark font-medium">
              ← {t.common.backHome}
            </Link>
          </p>
        </article>
      </div>
    </>
  )
}
