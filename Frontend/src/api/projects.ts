import { api } from './client'
import type { ApiResponse } from './client'
import type { ProjectEntity } from './types'
import { toProject } from './types'
import type { Project } from './types'

export interface ProjectsListParams {
  page?: number
  limit?: number
  search?: string
}

export async function fetchProjects(params?: ProjectsListParams): Promise<{
  projects: Project[]
  pagination?: ApiResponse<ProjectEntity[]>['pagination']
  error?: string
}> {
  const query: Record<string, string> = {}
  if (params?.page) query.page = String(params.page)
  if (params?.limit) query.limit = String(params.limit)
  if (params?.search) query.search = params.search

  const res = await api.get<ProjectEntity[]>(
    '/projects',
    Object.keys(query).length ? query : undefined
  )

  if (!res.success || !res.data) {
    return { projects: [], error: res.message }
  }

  const projects = Array.isArray(res.data) ? res.data.map(toProject) : []
  return {
    projects,
    pagination: res.pagination,
  }
}

export async function fetchProjectById(id: string): Promise<{
  project: Project | null
  error?: string
}> {
  const res = await api.get<ProjectEntity>(`/projects/${id}`)

  if (!res.success || !res.data) {
    return { project: null, error: res.message }
  }

  return { project: toProject(res.data) }
}
