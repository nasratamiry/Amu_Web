import { createContext, useContext, useEffect, ReactNode } from 'react'
import { Locale, locales, translations } from './translations'

type TranslationKeys = typeof translations.en

const I18nContext = createContext<{
  locale: Locale
  t: TranslationKeys
  setLocale: (locale: Locale) => void
  dir: 'ltr' | 'rtl'
  path: (path: string) => string
} | null>(null)

const STORAGE_KEY = 'amu-locale'

export function I18nProvider({ children, urlLocale }: { children: ReactNode; urlLocale: Locale }) {

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, urlLocale)
  }, [urlLocale])

  const localeConfig = locales.find((l) => l.code === urlLocale) ?? locales[0]

  useEffect(() => {
    document.documentElement.lang = urlLocale
    document.documentElement.dir = localeConfig.dir
  }, [urlLocale, localeConfig.dir])

  const setLocale = (newLocale: Locale) => {
    localStorage.setItem(STORAGE_KEY, newLocale)
    const pathname = window.location.pathname
    const parts = pathname.split('/').filter(Boolean)
    const isKnownLocale = ['en', 'fa', 'ps'].includes(parts[0])
    const restPath = isKnownLocale ? parts.slice(1).join('/') : parts.join('/')
    const newPath = `/${newLocale}${restPath ? '/' + restPath : ''}`
    window.location.href = newPath
  }

  const path = (p: string) => {
    const clean = p.startsWith('/') ? p : `/${p}`
    return `/${urlLocale}${clean === '/' ? '' : clean}`
  }

  const t = (translations[urlLocale] ?? translations.en) as TranslationKeys

  return (
    <I18nContext.Provider value={{ locale: urlLocale, t, setLocale, dir: localeConfig.dir, path }}>
      {children}
    </I18nContext.Provider>
  )
}

export function useI18n() {
  const ctx = useContext(I18nContext)
  if (!ctx) throw new Error('useI18n must be used within I18nProvider')
  return ctx
}
