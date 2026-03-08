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
