import { Helmet } from 'react-helmet-async'
import { Team } from '@/components/sections/Team'

export function TeamPage() {
  return (
    <>
      <Helmet>
        <title>Team | Etihad Amu</title>
        <meta name="description" content="Meet the people behind Etihad Amu. Our talented team of developers and designers." />
      </Helmet>
      <div className="pt-24 lg:pt-32">
        <Team />
      </div>
    </>
  )
}
