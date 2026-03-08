import { Helmet } from 'react-helmet-async'
import { Services } from '@/components/sections/Services'

export function ServicesPage() {
  return (
    <>
      <Helmet>
        <title>Services | Etihad Amu</title>
        <meta name="description" content="Our services: Web Development, Mobile Apps, UI/UX Design, Cloud Solutions, Tech Consulting." />
      </Helmet>
      <div className="pt-24 lg:pt-32">
        <Services />
      </div>
    </>
  )
}
