import { Helmet } from 'react-helmet-async'
import { Contact } from '@/components/sections/Contact'

export function ContactPage() {
  return (
    <>
      <Helmet>
        <title>Contact | Etihad Amu</title>
        <meta name="description" content="Get in touch with us. Start your software engineering project today." />
        <meta property="og:title" content="Contact | Etihad Amu" />
        <meta property="og:description" content="Get in touch with us. Start your software engineering project today." />
        <meta property="og:type" content="website" />
      </Helmet>
      <div className="pt-24 lg:pt-32">
        <Contact />
      </div>
    </>
  )
}
