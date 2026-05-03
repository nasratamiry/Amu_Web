import { api } from './client'
import type { ContactMessageInput } from './types'

export async function submitContactMessage(
  data: ContactMessageInput
): Promise<{ success: boolean; message?: string }> {
  const res = await api.post<{ id: string }>('/contact', data)

  if (!res.success) {
    return { success: false, message: res.message }
  }

  return {
    success: true,
    message: res.message || 'Your message has been sent successfully.',
  }
}
