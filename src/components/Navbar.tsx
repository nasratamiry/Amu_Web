import { useState, useRef, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { Link, NavLink } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useI18n } from '@/i18n/I18nContext'
import { locales } from '@/i18n/translations'

const navLinks = [
  { path: '/', labelKey: 'home' as const },
  { path: '/about', labelKey: 'about' as const },
  { path: '/services', labelKey: 'services' as const },
  { path: '/technologies', labelKey: 'technologies' as const },
  { path: '/projects', labelKey: 'projects' as const },
  { path: '/team', labelKey: 'team' as const },
  { path: '/blog', labelKey: 'blog' as const },
  { path: '/contact', labelKey: 'contact' as const },
]

export function Navbar() {
  const { t, path, locale, setLocale } = useI18n()
  const [isOpen, setIsOpen] = useState(false)
  const [langOpen, setLangOpen] = useState(false)
  const langRef = useRef<HTMLDivElement>(null)
  const langButtonRef = useRef<HTMLButtonElement>(null)
  const [dropdownStyle, setDropdownStyle] = useState({ top: 0, left: 0 })

  useEffect(() => {
    if (langOpen && langButtonRef.current) {
      const rect = langButtonRef.current.getBoundingClientRect()
      const isRtl = document.documentElement.dir === 'rtl'
      setDropdownStyle({
        top: rect.bottom + 8,
        left: isRtl ? rect.left : rect.right - 140,
      })
    }
  }, [langOpen])

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      const target = event.target as Node
      const isInButton = langRef.current?.contains(target)
      const isInDropdown = (target as Element).closest?.('[data-lang-dropdown]')
      if (!isInButton && !isInDropdown) {
        setLangOpen(false)
      }
    }
    document.addEventListener('click', handleClickOutside)
    return () => document.removeEventListener('click', handleClickOutside)
  }, [])

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-xl border-b border-slate-200 shadow-sm"
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14 lg:h-16 gap-4">
          <Link to={path('/')} className="flex-shrink-0">
            <img src="/logo.svg" alt="Etihad Amu" className="h-8 sm:h-9 w-auto object-contain" />
          </Link>

          <div className="hidden lg:flex items-center flex-1 justify-end gap-x-6 pr-4">
            <Link
              to={path('/contact')}
              className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 bg-brand text-white rounded-xl text-sm font-semibold hover:bg-brand-dark shadow-soft hover:shadow-brand transition-all duration-300"
            >
              {t.nav.getStarted}
            </Link>
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={path(link.path)}
                end={link.path === '/'}
                className={({ isActive }) =>
                  `relative group whitespace-nowrap text-[13px] font-medium transition-colors ${
                    isActive ? 'text-brand active' : 'text-slate-900 hover:text-brand'
                  }`
                }
              >
                {t.nav[link.labelKey]}
                <span className="absolute -bottom-1 left-0 rtl:right-0 rtl:left-auto w-0 h-0.5 bg-brand group-hover:w-full group-[.active]:w-full transition-all duration-300" />
              </NavLink>
            ))}
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <div className="relative" ref={langRef}>
              <button
                ref={langButtonRef}
                onClick={() => setLangOpen(!langOpen)}
                className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-slate-700 hover:text-brand hover:bg-slate-50 border border-slate-200 hover:border-brand/30 transition-colors text-[13px] font-medium"
                aria-label="Select language"
              >
                <span className={locales.find(l => l.code === locale)?.code !== 'en' ? 'font-fa' : ''}>
                  {locales.find(l => l.code === locale)?.name ?? 'English'}
                </span>
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {langOpen && createPortal(
                <AnimatePresence>
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    style={{
                      position: 'fixed',
                      top: dropdownStyle.top,
                      right: undefined,
                      left: dropdownStyle.left,
                    }}
                    className="py-2 min-w-[8rem] rounded-xl bg-white border border-slate-200 shadow-xl z-[9999]"
                    data-lang-dropdown
                  >
                    {locales.map((l) => (
                      <button
                        key={l.code}
                        onClick={() => { setLocale(l.code); setLangOpen(false) }}
                        className={`block w-full text-start px-4 py-2 text-sm hover:bg-brand-soft transition-colors ${l.code !== 'en' ? 'font-fa' : ''} ${locale === l.code ? 'text-brand font-medium' : 'text-slate-700'}`}
                      >
                        {l.name}
                      </button>
                    ))}
                  </motion.div>
                </AnimatePresence>,
                document.body
              )}
            </div>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden p-2 rounded-lg text-brand hover:text-brand-dark hover:bg-slate-50 transition-colors"
              aria-label="Toggle menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="lg:hidden overflow-hidden border-t border-slate-200"
            >
              <div className="py-4 space-y-2 bg-white">
                {navLinks.map((link) => (
                  <NavLink
                    key={link.path}
                    to={path(link.path)}
                    end={link.path === '/'}
                    onClick={() => setIsOpen(false)}
                    className={({ isActive }) =>
                      `block px-4 py-3 rounded-lg transition-colors font-fa ${isActive ? 'text-brand bg-brand-soft font-medium' : 'text-slate-900 hover:text-slate-700 hover:bg-slate-50'}`
                    }
                  >
                    {t.nav[link.labelKey]}
                  </NavLink>
                ))}
                <Link
                  to={path('/contact')}
                  onClick={() => setIsOpen(false)}
                  className="mx-4 mb-2 py-3 bg-brand text-white rounded-xl text-center font-semibold hover:bg-brand-dark transition-colors"
                >
                  {t.nav.getStarted}
                </Link>
                <div className="px-4 py-3 flex items-center gap-2 border-t border-slate-100">
                  <span className="text-slate-500 text-sm">زبان / Language:</span>
                  <div className="flex gap-2">
                    {locales.map((l) => (
                      <button
                        key={l.code}
                        onClick={() => { setLocale(l.code); setLangOpen(false) }}
                        className={`px-3 py-1 rounded text-sm font-fa ${locale === l.code ? 'bg-brand-soft text-brand font-medium' : 'text-brand hover:text-brand-dark'}`}
                      >
                        {l.name}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </motion.header>
  )
}
