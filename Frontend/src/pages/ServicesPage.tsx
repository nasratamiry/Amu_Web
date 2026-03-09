import { Helmet } from 'react-helmet-async'
import { Services } from '@/components/sections/Services'

export function ServicesPage() {
  return (
    <>
      <Helmet>
        <title>Services | Etihad Amu</title>
        <meta name="description" content="Enterprise-grade software engineering services: Custom Development, Enterprise Apps, SaaS Platforms, Architecture, Modernization." />
        <meta property="og:title" content="Services | Etihad Amu" />
        <meta property="og:description" content="Enterprise-grade software engineering services for mission-critical business systems." />
        <meta property="og:type" content="website" />
      </Helmet>
      <div className="pt-24 lg:pt-32 bg-brand-soft">
        <Services />
      </div>
    </>
  )
}
