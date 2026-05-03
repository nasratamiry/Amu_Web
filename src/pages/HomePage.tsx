import { Helmet } from 'react-helmet-async'
import { useI18n } from '@/i18n/I18nContext'
import { HomeHero, WhyEtihadAmu, HomeWhatWeDo, OurExpertise } from '@/components/sections/home'

export function HomePage() {
  const { locale } = useI18n()
  const pageTitle =
    locale === 'fa'
      ? 'اتحاد آمو | بزرگ‌ترین شرکت نرم‌افزاری در افغانستان'
      : locale === 'ps'
        ? 'اتحاد امو | د افغانستان ترټولو لوی سافټویر شرکت'
        : 'Etihad Amu | The Largest Software Company in Afghanistan'

  return (
    <>
      <Helmet>
        <title>{pageTitle}</title>
        <meta
          name="description"
          content="Etihad Amu delivers enterprise-grade custom software solutions that power business transformation. We architect, develop, and modernize mission-critical applications for global organizations."
        />
        <meta property="og:title" content={pageTitle} />
        <meta
          property="og:description"
          content="Enterprise-grade custom software solutions. We architect, develop, and modernize mission-critical applications for global organizations across logistics, fintech, and commerce."
        />
        <meta property="og:type" content="website" />
      </Helmet>
      <HomeHero />
      <WhyEtihadAmu />
      <HomeWhatWeDo />
      <OurExpertise />
    </>
  )
}
