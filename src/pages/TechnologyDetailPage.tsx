import { Helmet } from 'react-helmet-async'
import { Link, Navigate, useParams } from 'react-router-dom'
import { technologies } from '@/data/technologies'
import { technologyDetails } from '@/data/technologyDetails'
import { useI18n } from '@/i18n/I18nContext'

export function TechnologyDetailPage() {
  const { slug } = useParams<{ slug: string }>()
  const { t, locale, path } = useI18n()
  const technology = technologies.find((item) => item.slug === slug)

  if (!technology) return <Navigate to={path('/technologies')} replace />

  const fallback = {
    en: {
      whatIsTitle: 'Overview',
      whatIsText: `${technology.name} is an important technology in our delivery stack.`,
      useCasesTitle: 'Typical Use Cases',
      useCases: ['Product development', 'Performance optimization', 'Scalable system design'],
      whyWeUseTitle: 'Business Value',
      whyWeUseText: `We use ${technology.name} to build reliable, secure, and scalable software solutions.`,
      summary: `Useful insights about ${technology.name} for technical and business audiences.`,
    },
    fa: {
      whatIsTitle: 'معرفی',
      whatIsText: `${technology.name} یکی از تکنالوژی‌های مهم در استک توسعه ما است.`,
      useCasesTitle: 'موارد استفاده معمول',
      useCases: ['توسعه محصول', 'بهینه‌سازی عملکرد', 'طراحی سیستم مقیاس‌پذیر'],
      whyWeUseTitle: 'ارزش تجاری',
      whyWeUseText: `ما از ${technology.name} برای ساخت راهکارهای قابل اعتماد، امن و مقیاس‌پذیر استفاده می‌کنیم.`,
      summary: `معلومات مفید درباره ${technology.name} برای مخاطبان تخنیکی و تجاری.`,
    },
    ps: {
      whatIsTitle: 'پېژندنه',
      whatIsText: `${technology.name} زموږ د پراختیا په استک کې یوه مهمه تکنالوژي ده.`,
      useCasesTitle: 'عام استعمالونه',
      useCases: ['د محصول پراختیا', 'د فعالیت ښه کول', 'مقدار وړ سیسټم ډیزاین'],
      whyWeUseTitle: 'سوداګریز ارزښت',
      whyWeUseText: `موږ ${technology.name} د باور وړ، خوندي او مقدار وړ سافټویر حلونو لپاره کاروو.`,
      summary: `د ${technology.name} په اړه ګټور معلومات د تخنیکي او سوداګریزو لیدونکو لپاره.`,
    },
  } as const

  const custom = technologyDetails[technology.slug]?.[locale]
  const content = custom ?? {
    title: technology.name,
    ...fallback[locale],
  }

  return (
    <>
      <Helmet>
        <title>{`${technology.name} | Etihad Amu`}</title>
        <meta name="description" content={content.summary} />
      </Helmet>
      <section className="pt-28 pb-24 lg:pt-32 lg:pb-28 bg-transparent">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link to={path('/technologies')} className="inline-flex items-center gap-2 text-[#1A3C2A] hover:text-[#E8620A] font-medium transition-colors">
            <span aria-hidden>←</span>
            {t.nav.technologies}
          </Link>

          <h1 className="mt-6 text-4xl sm:text-5xl font-bold text-[#1A3C2A]">{content.title}</h1>
          <p className="mt-4 text-lg text-[#235236] leading-relaxed">{content.summary}</p>

          <div className="mt-10 space-y-8">
            <article className="p-6 rounded-2xl border border-[#1A3C2A]/20 bg-white">
              <h2 className="text-2xl font-bold text-[#1A3C2A]">{content.whatIsTitle}</h2>
              <p className="mt-3 text-[#235236] leading-relaxed">{content.whatIsText}</p>
            </article>

            <article className="p-6 rounded-2xl border border-[#1A3C2A]/20 bg-white">
              <h2 className="text-2xl font-bold text-[#1A3C2A]">{content.useCasesTitle}</h2>
              <ul className="mt-3 space-y-2 text-[#235236]">
                {content.useCases.map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <span className="mt-1.5 h-2 w-2 rounded-full bg-[#E8620A]" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </article>

            <article className="p-6 rounded-2xl border border-[#1A3C2A]/20 bg-white">
              <h2 className="text-2xl font-bold text-[#1A3C2A]">{content.whyWeUseTitle}</h2>
              <p className="mt-3 text-[#235236] leading-relaxed">{content.whyWeUseText}</p>
            </article>
          </div>
        </div>
      </section>
    </>
  )
}
