import { Helmet } from 'react-helmet-async'
import { Technologies } from '@/components/sections/Technologies'

export function TechnologiesPage() {
  return (
    <>
      <Helmet>
        <title>Technologies | Etihad Amu</title>
        <meta name="description" content="Technologies we work with. React, Node.js, AWS, and more." />
      </Helmet>
      <div className="pt-24 lg:pt-32">
        <Technologies />
      </div>
    </>
  )
}
