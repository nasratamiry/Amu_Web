import { useState, useRef, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useI18n } from '@/i18n/I18nContext'
import { locales } from '@/i18n/translations'

const VALID_LOCALES = new Set(['en', 'fa', 'ps'])

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

function localeOnlyHomePath(pathname: string) {
  const parts = pathname.split('/').filter(Boolean)
  return parts.length === 1 && VALID_LOCALES.has(parts[0])
}

export function Navbar() {
  const { t, path, locale, setLocale } = useI18n()
  const location = useLocation()
  const [isOpen, setIsOpen] = useState(false)
  const [langOpen, setLangOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const langRef = useRef<HTMLDivElement>(null)
  const langButtonRef = useRef<HTMLButtonElement>(null)
  const [dropdownStyle, setDropdownStyle] = useState({ top: 0, left: 0 })

  const homeLocaleOnly = localeOnlyHomePath(location.pathname)
  const solidBar = !homeLocaleOnly || scrolled || isOpen

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [location.pathname])

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

  const linkTone = ({ isActive }: { isActive: boolean }) =>
    `relative group whitespace-nowrap text-[13px] font-medium transition-colors ${
      solidBar
        ? isActive
          ? 'text-[#E8620A] active'
          : 'text-slate-900 hover:text-[#E8620A]'
        : isActive
          ? 'text-[#E8620A] active'
          : 'text-white/95 hover:text-[#E8620A] drop-shadow-sm'
    }`

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="fixed top-0 left-0 right-0 z-50"
    >
      <nav className="w-full">
        <div
          className={`relative flex items-center justify-between h-14 lg:h-16 gap-4 px-2 sm:px-3 transition-[background-color,backdrop-filter,box-shadow,border-color] duration-300 ${
            solidBar
              ? 'bg-white/70 backdrop-blur-2xl supports-[backdrop-filter]:backdrop-saturate-150 shadow-[0_8px_28px_rgba(15,23,42,0.1)]'
              : 'bg-transparent shadow-none'
          }`}
        >
          <Link to={path('/')} className="flex-shrink-0">
            <img src="/logo.svg" alt="Etihad Amu" className="h-8 sm:h-9 w-auto object-contain" />
          </Link>

          <div className="hidden lg:flex items-center absolute left-1/2 -translate-x-1/2 gap-x-6">
            {navLinks.map((link) => (
              <NavLink key={link.path} to={path(link.path)} end={link.path === '/'} className={linkTone}>
                {t.nav[link.labelKey]}
                <span className="absolute -bottom-1 left-0 rtl:right-0 rtl:left-auto w-0 h-0.5 bg-[#E8620A] group-hover:w-full group-[.active]:w-full transition-all duration-300" />
              </NavLink>
            ))}
          </div>

          <div className="flex items-center gap-2 sm:gap-3 pr-1 sm:pr-2">
            <div className="relative" ref={langRef}>
              <button
                ref={langButtonRef}
                onClick={() => setLangOpen(!langOpen)}
                className={`flex items-center justify-center transition-colors ${
                  solidBar ? 'text-slate-700 hover:text-brand' : 'text-white hover:text-white/90 drop-shadow-sm'
                }`}
                aria-label="Select language"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.6 9h16.8M3.6 15h16.8M12 3a15 15 0 010 18M12 3a15 15 0 000 18" />
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
                      left: dropdownStyle.left,
                    }}
                    className="py-2 min-w-[8rem] rounded-xl bg-white/95 backdrop-blur-xl border border-slate-400/55 shadow-xl z-[9999]"
                    data-lang-dropdown
                  >
                    {locales.map((l) => (
                      <button
                        key={l.code}
                        onClick={() => {
                          setLocale(l.code)
                          setLangOpen(false)
                        }}
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
              className={`lg:hidden p-2 rounded-lg transition-colors ${
                solidBar ? 'text-brand hover:text-brand-dark hover:bg-slate-50' : 'text-white hover:bg-white/10'
              }`}
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
              className={`lg:hidden overflow-hidden border-t ${solidBar ? 'border-slate-400/50' : 'border-white/30'}`}
            >
              <div className={`py-4 space-y-2 backdrop-blur-xl ${solidBar ? 'bg-white/80' : 'bg-slate-900/40'}`}>
                {navLinks.map((link) => (
                  <NavLink
                    key={link.path}
                    to={path(link.path)}
                    end={link.path === '/'}
                    onClick={() => setIsOpen(false)}
                    className={({ isActive }) =>
                      `block px-4 py-3 rounded-lg transition-colors font-fa ${solidBar
                        ? isActive
                          ? 'text-brand bg-brand-soft font-medium'
                          : 'text-slate-900 hover:text-slate-700 hover:bg-slate-50'
                        : isActive
                          ? 'text-brand bg-white/15 font-medium'
                          : 'text-white/95 hover:bg-white/10'}`
                    }
                  >
                    {t.nav[link.labelKey]}
                  </NavLink>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </motion.header>
  )
}
