import { api } from './client'
import type { TeamMemberEntity } from './types'
import { toTeamMember } from './types'
import type { TeamMember } from './types'

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
