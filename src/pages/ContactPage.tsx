import { Helmet } from 'react-helmet-async'
import { Contact } from '@/components/sections/Contact'

export function ContactPage() {
  return (
    <>
      <Helmet>
        <title>Contact | Etihad Amu</title>
        <meta name="description" content="Get in touch with us. Start your project today." />
      </Helmet>
      <div className="pt-24 lg:pt-32">
        <Contact />
      </div>
    </>
  )
}
