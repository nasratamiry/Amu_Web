import { Helmet } from 'react-helmet-async'
import { Projects } from '@/components/sections/Projects'

export function ProjectsPage() {
  return (
    <>
      <Helmet>
        <title>Projects | Etihad Amu</title>
        <meta name="description" content="Our portfolio of successful projects across various industries." />
      </Helmet>
      <div className="pt-24 lg:pt-32">
        <Projects />
      </div>
    </>
  )
}
