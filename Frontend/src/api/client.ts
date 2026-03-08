const API_BASE =
  import.meta.env.VITE_API_BASE_URL ||
  import.meta.env.REACT_APP_API_BASE_URL ||
  'http://localhost:5000/api'

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
  options: RequestInit = {}
): Promise<ApiResponse<T>> {
  const url = `${API_BASE}${endpoint}`
  const config: RequestInit = {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  }

  try {
    const res = await fetch(url, config)
    const json = await res.json()

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

export const api = {
  get: <T>(endpoint: string, params?: Record<string, string | number>) => {
    const search = params
      ? '?' + new URLSearchParams(params as Record<string, string>).toString()
      : ''
    return request<T>(`${endpoint}${search}`)
  },
  post: <T>(endpoint: string, body: unknown) =>
    request<T>(endpoint, { method: 'POST', body: JSON.stringify(body) }),
  put: <T>(endpoint: string, body: unknown) =>
    request<T>(endpoint, { method: 'PUT', body: JSON.stringify(body) }),
  delete: <T>(endpoint: string) => request<T>(endpoint, { method: 'DELETE' }),
}
