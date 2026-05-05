import { api } from './client'
import type { AdminStatsEntity } from './types'

export async function fetchAdminStats(): Promise<{
  stats: AdminStatsEntity | null
  error?: string
}> {
  const res = await api.get<AdminStatsEntity>('/admin/stats', undefined, {
    auth: true,
  })
  if (!res.success || !res.data) {
    return { stats: null, error: res.message }
  }
  return { stats: res.data }
}
