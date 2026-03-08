import { Helmet } from 'react-helmet-async'
import { About } from '@/components/sections/About'

export function AboutPage() {
  return (
    <>
      <Helmet>
        <title>About Us | Etihad Amu</title>
        <meta name="description" content="Our story and mission. Strategic software engineering partner for scalable business systems." />
        <meta property="og:title" content="About Us | Etihad Amu" />
        <meta property="og:description" content="Our story and mission. Strategic software engineering partner for scalable business systems." />
        <meta property="og:type" content="website" />
      </Helmet>
      <div className="pt-24 lg:pt-32">
        <About />
      </div>
    </>
  )
}
