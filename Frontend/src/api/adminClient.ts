const API_BASE =
  import.meta.env.VITE_API_BASE_URL ||
  import.meta.env.REACT_APP_API_BASE_URL ||
  'http://localhost:5000/api'

const TOKEN_KEY = 'amu_admin_token'

export function getToken(): string | null {
  return localStorage.getItem(TOKEN_KEY)
}

export function setToken(token: string): void {
  localStorage.setItem(TOKEN_KEY, token)
}

export function removeToken(): void {
  localStorage.removeItem(TOKEN_KEY)
}

export interface ApiResponse<T> {
  success: boolean
  data?: T
  message?: string
  errors?: { field: string; message: string }[]
  pagination?: {
    page: number
    limit: number
    total: number
    pages: number
  }
}

async function request<T>(
  endpoint: string,
  options: RequestInit = {},
  requiresAuth = true
): Promise<ApiResponse<T>> {
  const url = `${API_BASE}${endpoint}`
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options.headers as Record<string, string>),
  }

  if (requiresAuth) {
    const token = getToken()
    if (token) headers['Authorization'] = `Bearer ${token}`
  }

  const config: RequestInit = {
    ...options,
    headers,
  }

  try {
    const res = await fetch(url, config)
    const json = await res.json()

    if (res.status === 401) {
      if (requiresAuth) {
        removeToken()
        window.location.href = '/admin/login'
        return { success: false, message: 'Session expired' }
      }
      return {
        success: false,
        message: json.message || 'Invalid email or password',
      }
    }

    if (!res.ok) {
      return {
        success: false,
        message: json.message || `Request failed with status ${res.status}`,
        errors: json.errors,
      }
    }

    return json as ApiResponse<T>
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Network error'
    return { success: false, message }
  }
}

export const adminApi = {
  get: <T>(endpoint: string, params?: Record<string, string | number>, requiresAuth = true) => {
    const search = params
      ? '?' + new URLSearchParams(params as Record<string, string>).toString()
      : ''
    return request<T>(`${endpoint}${search}`, {}, requiresAuth)
  },
  post: <T>(endpoint: string, body: unknown, requiresAuth = true) =>
    request<T>(endpoint, { method: 'POST', body: JSON.stringify(body) }, requiresAuth),
  put: <T>(endpoint: string, body: unknown) =>
    request<T>(endpoint, { method: 'PUT', body: JSON.stringify(body) }),
  delete: <T>(endpoint: string) =>
    request<T>(endpoint, { method: 'DELETE' }),
}
