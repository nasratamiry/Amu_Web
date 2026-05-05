import { api } from './client'
import type { UploadedImageEntity } from './types'

export type UploadFieldName = 'image' | 'file'

export async function uploadImage(
  file: File | Blob,
  fieldName: UploadFieldName = 'image'
): Promise<{
  result: UploadedImageEntity | null
  error?: string
}> {
  const fd = new FormData()
  fd.append(fieldName, file)

  const res = await api.post<UploadedImageEntity>('/upload', fd, { auth: true })

  if (!res.success || !res.data) {
    return { result: null, error: res.message }
  }
  return { result: res.data }
}
