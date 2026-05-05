/** `http://0.0.0.0` is not a usable fetch destination in browsers → loopback. */
export function normalizeApiHostForFetch(url: string): string {
  return url.replace(
    /^(https?:\/\/)0\.0\.0\.0(?=(?::\d+)?(?:\/|$))/i,
    (_, proto) => `${proto}127.0.0.1`
  )
}

function resolveBrowserApiBase(trimmed: string): string {
  if (trimmed.startsWith('/')) return trimmed
  return normalizeApiHostForFetch(trimmed)
}

const STORAGE_ACCESS = 'amu_api_access_token'
const STORAGE_REFRESH = 'amu_api_refresh_token'

export function getAccessToken(): string | null {
  if (typeof localStorage === 'undefined') return null
  return localStorage.getItem(STORAGE_ACCESS)
}

export function getRefreshToken(): string | null {
  if (typeof localStorage === 'undefined') return null
  return localStorage.getItem(STORAGE_REFRESH)
}

export function persistAuthTokens(tokens: { access: string; refresh: string }): void {
  if (typeof localStorage === 'undefined') return
  localStorage.setItem(STORAGE_ACCESS, tokens.access)
  localStorage.setItem(STORAGE_REFRESH, tokens.refresh)
}

export function clearAuthTokens(): void {
  if (typeof localStorage === 'undefined') return
  localStorage.removeItem(STORAGE_ACCESS)
  localStorage.removeItem(STORAGE_REFRESH)
}

const rawEnvBase =
  import.meta.env.VITE_API_BASE_URL || import.meta.env.REACT_APP_API_BASE_URL || ''

const normalizedEnvBase = rawEnvBase.replace(/\/+$/, '')

const djangoOrigin = (
  import.meta.env.VITE_DJANGO_ORIGIN || 'https://api.etihadamu.com'
).replace(/\/+$/, '')
const fallbackProdApi = `${djangoOrigin}/api`

/**
 * **Dev:** `/api` → Vite proxies to `VITE_DJANGO_ORIGIN` (avoids CORS: localhost → api subdomain).
 * **Prod build:** `{VITE_DJANGO_ORIGIN}/api` (**https://api.etihadamu.com/api**).
 * Override anytime: `VITE_API_BASE_URL=...`
 */
const rawBase =
  normalizedEnvBase || (import.meta.env.DEV ? '/api' : fallbackProdApi)

/** Base URL without trailing slash (`/projects/` → `{API_BASE}/projects/`). */
export const API_BASE = resolveBrowserApiBase(rawBase.replace(/\/+$/, ''))

export interface ApiResponse<T> {
  success: boolean
  data?: T
  message?: string
  errors?: { field: string; message: string }[]
  /** Legacy shape; Django uses `count` / `next` / `previous` inside `data`. */
  pagination?: {
    page: number
    limit: number
    total: number
    pages: number
  }
}

type DjangoEnvelope = {
  success?: boolean
  message?: string
  data?: unknown
}

export type DjangoRequestOpts = Omit<RequestInit, 'headers' | 'body'> & {
  auth?: boolean
  headers?: Record<string, string>
  /** Body for POST/PATCH/PUT (JSON string or FormData). Omit for DELETE/GET. */
  body?: RequestInit['body']
}

/** Match Django REST style: trailing slash before query string. */
function djangoEndpoint(endpoint: string): string {
  let path = endpoint.startsWith('/') ? endpoint : `/${endpoint}`
  const q = path.indexOf('?')
  if (q === -1) {
    return path.endsWith('/') ? path : `${path}/`
  }
  const p = path.slice(0, q)
  const search = path.slice(q)
  const normalized = p.endsWith('/') ? p : `${p}/`
  return `${normalized}${search}`
}

async function request<T>(
  endpoint: string,
  options: DjangoRequestOpts & {
    body?: BodyInit | null | undefined
  } = {}
): Promise<ApiResponse<T>> {
  const path = djangoEndpoint(endpoint)
  const url = `${API_BASE}${path}`

  const { auth, headers: hdrsInit, ...restInit } = options
  const method = String(restInit.method || 'GET').toUpperCase()
  const isFormData =
    typeof FormData !== 'undefined' && restInit.body instanceof FormData
  const omitJsonCt =
    isFormData || method === 'GET' || method === 'HEAD' || method === 'DELETE'

  const headers: Record<string, string> = {
    ...(omitJsonCt ? {} : { 'Content-Type': 'application/json' }),
    ...hdrsInit,
  }

  if (auth) {
    const tok = getAccessToken()
    if (tok) headers['Authorization'] = `Bearer ${tok}`
  }

  const config: RequestInit = {
    ...restInit,
    headers,
  }

  try {
    const res = await fetch(url, config)

    let body: DjangoEnvelope | null = null
    const text = await res.text()
    if (text) {
      try {
        body = JSON.parse(text) as DjangoEnvelope
      } catch {
        if (!res.ok) {
          return {
            success: false,
            message: `Request failed with status ${res.status}`,
          }
        }
        return { success: false, message: 'Invalid JSON response' }
      }
    }

    const envelopeMsg =
      body && typeof body.message === 'string' ? body.message : undefined

    if (!res.ok) {
      return {
        success: false,
        message:
          body?.success === false && envelopeMsg
            ? envelopeMsg
            : envelopeMsg || `Request failed with status ${res.status}`,
        errors: (body as { errors?: ApiResponse<T>['errors'] })?.errors,
      }
    }

    if (body && body.success === false) {
      return {
        success: false,
        message: envelopeMsg || 'Request failed',
      }
    }

    const data =
      body && 'data' in body && body.data !== undefined
        ? (body.data as T)
        : (body as unknown as T)

    return {
      success: true,
      data,
      message: envelopeMsg,
    }
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Network error'
    return { success: false, message }
  }
}

export const api = {
  get: <T>(
    endpoint: string,
    params?: Record<string, string | number>,
    init?: Pick<DjangoRequestOpts, 'auth' | 'headers' | 'credentials' | 'signal'>
  ) => {
    const search = params
      ? '?' + new URLSearchParams(params as Record<string, string>).toString()
      : ''
    return request<T>(`${endpoint}${search}`, {
      method: 'GET',
      ...(init ?? {}),
    })
  },
  post: <T>(endpoint: string, body: unknown, init?: DjangoRequestOpts) =>
    request<T>(endpoint, {
      method: 'POST',
      body:
        typeof FormData !== 'undefined' && body instanceof FormData
          ? body
          : JSON.stringify(body),
      ...(init ?? {}),
    }),
  put: <T>(endpoint: string, body: unknown, init?: DjangoRequestOpts) =>
    request<T>(endpoint, {
      method: 'PUT',
      body:
        typeof FormData !== 'undefined' && body instanceof FormData
          ? body
          : JSON.stringify(body),
      ...(init ?? {}),
    }),
  patch: <T>(endpoint: string, body: unknown, init?: DjangoRequestOpts) =>
    request<T>(endpoint, {
      method: 'PATCH',
      body:
        typeof FormData !== 'undefined' && body instanceof FormData
          ? body
          : JSON.stringify(body),
      ...(init ?? {}),
    }),
  delete: <T>(endpoint: string, init?: DjangoRequestOpts) =>
    request<T>(endpoint, { method: 'DELETE', ...(init ?? {}) }),
}
