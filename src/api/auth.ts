import { api, clearAuthTokens, persistAuthTokens } from './client'
import type { LoginResponseData } from './types'

export async function adminLogin(
  username: string,
  password: string
): Promise<{
  success: boolean
  data?: LoginResponseData
  message?: string
}> {
  const res = await api.post<LoginResponseData>('/admin/login', {
    username,
    password,
  })

  if (res.success && res.data) {
    persistAuthTokens({
      access: res.data.access,
      refresh: res.data.refresh,
    })
  }

  return {
    success: res.success,
    data: res.data,
    message: res.message,
  }
}

export function adminLogout(): void {
  clearAuthTokens()
}
