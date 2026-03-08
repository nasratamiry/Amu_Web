import { Helmet } from 'react-helmet-async'
import { About } from '@/components/sections/About'

export function AboutPage() {
  return (
    <>
      <Helmet>
        <title>About Us | Etihad Amu</title>
        <meta name="description" content="Our story and mission. Building the future, one line of code at a time." />
      </Helmet>
      <div className="pt-24 lg:pt-32">
        <About />
      </div>
    </>
  )
}
