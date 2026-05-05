import { api } from './client'

export async function checkHealth(): Promise<{
  ok: boolean
  status?: string
  error?: string
}> {
  const res = await api.get<{ status: string }>('/health')
  if (!res.success || !res.data) {
    return { ok: false, error: res.message }
  }
  return { ok: true, status: res.data.status }
}
