import { Helmet } from 'react-helmet-async'
import {
  HomeHero,
  WhyEtihadAmu,
  HomeWhatWeDo,
  OurCustomers,
  CtaBanner,
  OurExpertise,
} from '@/components/sections/home'

export function HomePage() {
  return (
    <>
      <Helmet>
        <title>Etihad Amu - Strategic Software Engineering Partner for Scalable Business Systems</title>
        <meta name="description" content="Etihad Amu delivers enterprise-grade custom software solutions that power business transformation. We architect, develop, and modernize mission-critical applications for global organizations." />
        <meta property="og:title" content="Etihad Amu - Strategic Software Engineering Partner for Scalable Business Systems" />
        <meta property="og:description" content="Enterprise-grade custom software solutions. We architect, develop, and modernize mission-critical applications for global organizations across logistics, fintech, and commerce." />
        <meta property="og:type" content="website" />
      </Helmet>
      <HomeHero />
      <WhyEtihadAmu />
      <HomeWhatWeDo />
      <OurCustomers />
      <CtaBanner />
      <OurExpertise />
    </>
  )
}
