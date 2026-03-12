/**
 * Client-side cache for API responses.
 * When backend is online: fetches fresh data and updates cache.
 * When backend is offline: serves last successful response from cache.
 */

const PREFIX = 'amu_cache_'

function safeGet<T>(key: string): T | null {
  try {
    if (typeof window === 'undefined' || !window.localStorage) return null
    const raw = localStorage.getItem(PREFIX + key)
    if (!raw) return null
    return JSON.parse(raw) as T
  } catch {
    return null
  }
}

function safeSet(key: string, value: unknown): void {
  try {
    if (typeof window === 'undefined' || !window.localStorage) return
    localStorage.setItem(PREFIX + key, JSON.stringify(value))
  } catch {
    // localStorage full, quota exceeded, or private mode
  }
}

export function invalidateCache(key: string): void {
  try {
    if (typeof window !== 'undefined' && window.localStorage) {
      window.localStorage.removeItem(PREFIX + key)
    }
  } catch {
    // ignore
  }
}

export const apiCache = {
  get: safeGet,
  set: safeSet,
  invalidate: invalidateCache,
  keys: {
    team: 'team',
    blog: (params?: { limit?: number; page?: number }) =>
      `blog_${params?.limit ?? 10}_${params?.page ?? 1}`,
    projects: (params?: { limit?: number; page?: number; search?: string }) =>
      `projects_${params?.limit ?? 10}_${params?.page ?? 1}_${params?.search ?? ''}`,
  },
} as const
