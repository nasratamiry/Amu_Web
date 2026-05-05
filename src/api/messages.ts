import { api } from './client'
import type { ApiResponse } from './client'
import type { ContactMessageEntity, PaginatedResult } from './types'

export interface MessagesListParams {
  page?: number
  limit?: number
}

function extractMessages(raw: unknown): ContactMessageEntity[] {
  if (Array.isArray(raw)) return raw as ContactMessageEntity[]
  if (
    raw &&
    typeof raw === 'object' &&
    'results' in raw &&
    Array.isArray((raw as { results: unknown }).results)
  ) {
    return (raw as PaginatedResult<ContactMessageEntity>).results
  }
  return []
}

export async function fetchContactMessages(params?: MessagesListParams): Promise<{
  messages: ContactMessageEntity[]
  pagination?: ApiResponse<ContactMessageEntity[]>['pagination']
  error?: string
}> {
  const query: Record<string, string> = {}
  if (params?.page) query.page = String(params.page)
  if (params?.limit) query.limit = String(params.limit)

  const res = await api.get<
    ContactMessageEntity[] | PaginatedResult<ContactMessageEntity>
  >('/messages', Object.keys(query).length ? query : undefined, { auth: true })

  if (!res.success || res.data === undefined) {
    return { messages: [], error: res.message }
  }

  return { messages: extractMessages(res.data), pagination: res.pagination }
}

export async function deleteContactMessage(id: string): Promise<{
  success: boolean
  message?: string
}> {
  const res = await api.delete<null>(`/messages/${id}`, { auth: true })
  return { success: res.success, message: res.message }
}
