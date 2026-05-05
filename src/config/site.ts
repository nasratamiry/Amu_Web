/** Production frontend hostname (HTTPS, no path). Matches public deploy **etihadamu.com**. */
export const SITE_ORIGIN_CANONICAL = 'https://etihadamu.com'

/** Same as `SITE_ORIGIN_CANONICAL`; override entirely with `VITE_SITE_URL` if staging uses another domain. */
export function getSiteOrigin(): string {
  const fromEnv = import.meta.env.VITE_SITE_URL?.trim().replace(/\/+$/, '')
  if (fromEnv) return fromEnv
  if (import.meta.env.DEV && typeof window !== 'undefined') {
    return window.location.origin
  }
  return SITE_ORIGIN_CANONICAL
}

export function canonicalUrl(pathname: string, search = ''): string {
  const origin = getSiteOrigin()
  const path = pathname.startsWith('/') ? pathname : `/${pathname}`
  return `${origin}${path}${search}`
}
