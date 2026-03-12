import { Link } from 'react-router-dom'
import { useI18n } from '@/i18n/I18nContext'

const footerLinks = {
  company: [
    { path: '/about', labelKey: 'about' as const },
    { path: '/services', labelKey: 'services' as const },
    { path: '/projects', labelKey: 'projects' as const },
    { path: '/contact', labelKey: 'contact' as const },
  ],
  resources: [
    { path: '/blog', labelKey: 'blog' as const },
    { path: '/technologies', labelKey: 'technologies' as const },
    { path: '/team', labelKey: 'team' as const },
  ],
  social: [
    { href: 'https://www.facebook.com/share/1CNNStzbjZ/', label: 'Facebook', icon: 'M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z' },
    { href: 'https://www.instagram.com/etihadamu', label: 'Instagram', icon: 'M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z' },
    { href: 'https://www.linkedin.com/company/amu-company/', label: 'LinkedIn', icon: 'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z' },
    { href: 'https://t.me/amupay', label: 'Telegram', icon: 'M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z' },
  ],
}

export function Footer() {
  const { t, path } = useI18n()

  return (
    <footer className="bg-slate-900 text-slate-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-16">
          <div className="lg:col-span-1">
            <Link to={path('/')} className="inline-flex items-center gap-3 text-white hover:opacity-90 transition-opacity">
              <img src="/logo.svg" alt={t.footer.companyName} className="h-10 w-auto object-contain" />
              <span className="text-xl font-bold">{t.footer.companyName}</span>
            </Link>
            <p className="mt-6 text-slate-400 text-sm leading-relaxed max-w-xs">
              {t.footer.tagline}
            </p>
            <div className="mt-8 flex gap-5">
              {footerLinks.social.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-400 hover:text-brand transition-colors duration-300"
                  aria-label={social.label}
                >
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d={social.icon} />
                  </svg>
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">{t.footer.company}</h4>
            <ul className="mt-6 space-y-4">
              {footerLinks.company.map((link) => (
                <li key={link.path}>
                  <Link to={path(link.path)} className="text-slate-400 hover:text-brand transition-colors duration-300 text-sm">
                    {t.nav[link.labelKey]}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">{t.footer.resources}</h4>
            <ul className="mt-6 space-y-4">
              {footerLinks.resources.map((link) => (
                <li key={link.path}>
                  <Link to={path(link.path)} className="text-slate-400 hover:text-brand transition-colors duration-300 text-sm">
                    {t.nav[link.labelKey]}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">{t.footer.contact}</h4>
            <ul className="mt-6 space-y-4 text-slate-400 text-sm">
              <li><a href="mailto:info@amu.one" className="hover:text-brand transition-colors duration-300">info@amu.one</a></li>
              <li><a href="tel:+93786174307" className="hover:text-brand transition-colors duration-300" dir="ltr" style={{ unicodeBidi: 'isolate' }}>+93 786 174 307</a></li>
              <li>{t.footer.address}</li>
            </ul>
          </div>
        </div>

        <div className="mt-16 pt-10 border-t border-slate-800 flex flex-col sm:flex-row justify-between items-center gap-6">
          <p className="text-slate-500 text-sm">© {new Date().getFullYear()} {t.footer.companyName}. {t.footer.rights}</p>
          <div className="flex gap-8 text-sm">
            <Link to={path('/privacy')} className="text-slate-500 hover:text-brand transition-colors duration-300">{t.footer.privacy}</Link>
            <Link to={path('/terms')} className="text-slate-500 hover:text-brand transition-colors duration-300">{t.footer.terms}</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
