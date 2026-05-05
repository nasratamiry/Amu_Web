import { api } from './client'
import type {
  TeamMemberCreateInput,
  TeamMemberEntity,
  TeamMemberPatchInput,
} from './types'
import { toTeamMember } from './types'
import type { TeamMember } from './types'

function teamJsonPayload(
  p: TeamMemberCreateInput | TeamMemberPatchInput
): Record<string, unknown> {
  const o: Record<string, unknown> = {}
  if (p.name != null && p.name !== '') o.name = p.name
  if (p.role != null) o.role = p.role
  if (p.bio != null) o.bio = p.bio
  if (p.social_links != null) o.social_links = p.social_links
  if (p.order != null) o.order = p.order
  return o
}

function teamFormDataPayload(
  p: TeamMemberCreateInput | TeamMemberPatchInput
): FormData {
  const fd = new FormData()
  const j = teamJsonPayload(p)
  Object.entries(j).forEach(([k, v]) => {
    if (v === undefined) return
    fd.append(k, typeof v === 'object' ? JSON.stringify(v) : String(v))
  })
  const img = 'imageFile' in p ? p.imageFile : undefined
  if (img instanceof File || img instanceof Blob) {
    fd.append('image', img)
  }
  return fd
}

function usesMultipart(p: TeamMemberCreateInput | TeamMemberPatchInput): boolean {
  const img = 'imageFile' in p ? p.imageFile : undefined
  return img instanceof File || img instanceof Blob
}

export async function fetchTeamMembers(): Promise<{
  members: TeamMember[]
  error?: string
}> {
  const res = await api.get<TeamMemberEntity[]>('/team')

  if (!res.success || !res.data) {
    return { members: [], error: res.message }
  }

  const members = Array.isArray(res.data) ? res.data.map(toTeamMember) : []
  return { members }
}

export async function fetchTeamMemberById(id: string): Promise<{
  member: TeamMember | null
  error?: string
}> {
  const res = await api.get<TeamMemberEntity>(`/team/${id}`)

  if (!res.success || !res.data) {
    return { member: null, error: res.message }
  }

  return { member: toTeamMember(res.data) }
}

export async function createTeamMember(input: TeamMemberCreateInput): Promise<{
  entity: TeamMemberEntity | null
  error?: string
}> {
  const body = usesMultipart(input)
    ? teamFormDataPayload(input)
    : teamJsonPayload(input)
  const res = await api.post<TeamMemberEntity>('/team', body, { auth: true })
  if (!res.success || !res.data) {
    return { entity: null, error: res.message }
  }
  return { entity: res.data }
}

export async function replaceTeamMember(
  id: string,
  input: TeamMemberCreateInput
): Promise<{
  entity: TeamMemberEntity | null
  error?: string
}> {
  const body = usesMultipart(input)
    ? teamFormDataPayload(input)
    : teamJsonPayload(input)
  const res = await api.put<TeamMemberEntity>(`/team/${id}`, body, {
    auth: true,
  })
  if (!res.success || !res.data) {
    return { entity: null, error: res.message }
  }
  return { entity: res.data }
}

export async function patchTeamMember(
  id: string,
  input: TeamMemberPatchInput
): Promise<{
  entity: TeamMemberEntity | null
  error?: string
}> {
  const body = usesMultipart(input)
    ? teamFormDataPayload(input)
    : teamJsonPayload(input)
  const res = await api.patch<TeamMemberEntity>(`/team/${id}`, body, {
    auth: true,
  })
  if (!res.success || !res.data) {
    return { entity: null, error: res.message }
  }
  return { entity: res.data }
}

export async function deleteTeamMember(id: string): Promise<{
  success: boolean
  message?: string
}> {
  const res = await api.delete<null>(`/team/${id}`, { auth: true })
  return { success: res.success, message: res.message }
}
