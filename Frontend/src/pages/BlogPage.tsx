import { Helmet } from 'react-helmet-async'
import { Blog } from '@/components/sections/Blog'

export function BlogPage() {
  return (
    <>
      <Helmet>
        <title>Blog | Etihad Amu</title>
        <meta name="description" content="Latest insights and updates on technology, design, and industry trends." />
      </Helmet>
      <div className="pt-24 lg:pt-32">
        <Blog />
      </div>
    </>
  )
}
