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
    { href: 'https://twitter.com', label: 'Twitter', icon: 'M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z' },
    { href: 'https://linkedin.com', label: 'LinkedIn', icon: 'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z' },
    { href: 'https://github.com', label: 'GitHub', icon: 'M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z' },
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
              <img src="/logo.svg" alt="Etihad Amu" className="h-10 w-auto object-contain" />
              <span className="text-xl font-bold">Etihad Amu</span>
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
              <li>Kabul, Afghanistan</li>
            </ul>
          </div>
        </div>

        <div className="mt-16 pt-10 border-t border-slate-800 flex flex-col sm:flex-row justify-between items-center gap-6">
          <p className="text-slate-500 text-sm">© {new Date().getFullYear()} Etihad Amu. {t.footer.rights}</p>
          <div className="flex gap-8 text-sm">
            <a href="#" className="text-slate-500 hover:text-brand transition-colors duration-300">{t.footer.privacy}</a>
            <a href="#" className="text-slate-500 hover:text-brand transition-colors duration-300">{t.footer.terms}</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
