import { api } from './client'
import { apiCache } from './cache'
import type { TeamMemberEntity } from './types'
import { toTeamMember } from './types'
import type { TeamMember } from './types'

const CACHE_KEY = apiCache.keys.team

export async function fetchTeamMembers(): Promise<{
  members: TeamMember[]
  error?: string
}> {
  const res = await api.get<TeamMemberEntity[]>('/team')

  if (res.success && res.data && Array.isArray(res.data)) {
    const members = res.data.map(toTeamMember)
    apiCache.set(CACHE_KEY, members)
    return { members }
  }

  const cached = apiCache.get<TeamMember[]>(CACHE_KEY)
  if (cached && Array.isArray(cached)) {
    return { members: cached }
  }

  return { members: [], error: res.message }
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
