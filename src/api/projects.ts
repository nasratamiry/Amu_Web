import { api } from './client'
import type { ApiResponse } from './client'
import type {
  ProjectCreateInput,
  ProjectEntity,
  ProjectPatchInput,
} from './types'
import { toProject } from './types'
import type { Project } from './types'

export interface ProjectsListParams {
  page?: number
  limit?: number
  search?: string
}

function extractProjectList(raw: unknown): ProjectEntity[] {
  if (Array.isArray(raw)) return raw as ProjectEntity[]
  if (
    raw &&
    typeof raw === 'object' &&
    'results' in raw &&
    Array.isArray((raw as { results: unknown }).results)
  ) {
    return (raw as { results: ProjectEntity[] }).results
  }
  return []
}

function projectJsonPayload(
  p: ProjectCreateInput | ProjectPatchInput
): Record<string, unknown> {
  const o: Record<string, unknown> = {}
  if (p.title != null && p.title !== '') o.title = p.title
  if (p.description != null) o.description = p.description
  if (p.technologies != null) o.technologies = p.technologies
  if (p.play_store_url != null) o.play_store_url = p.play_store_url
  if (p.app_store_url != null) o.app_store_url = p.app_store_url
  if (p.website_url != null) o.website_url = p.website_url
  if (p.featured != null) o.featured = p.featured
  if (p.order != null) o.order = p.order
  return o
}

function projectFormDataPayload(
  p: ProjectCreateInput | ProjectPatchInput
): FormData {
  const fd = new FormData()
  const j = projectJsonPayload(p)
  Object.entries(j).forEach(([k, v]) => {
    if (v === undefined) return
    if (k === 'technologies') {
      fd.append(k, JSON.stringify(v))
      return
    }
    fd.append(k, typeof v === 'boolean' ? (v ? 'true' : 'false') : String(v))
  })
  const img = 'imageFile' in p ? p.imageFile : undefined
  if (img instanceof File || img instanceof Blob) {
    fd.append('image', img)
  }
  return fd
}

function usesMultipart(p: ProjectCreateInput | ProjectPatchInput): boolean {
  const img = 'imageFile' in p ? p.imageFile : undefined
  return img instanceof File || img instanceof Blob
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

  const res = await api.get<ProjectEntity[] | { results: ProjectEntity[] }>(
    '/projects',
    Object.keys(query).length ? query : undefined
  )

  if (!res.success || res.data === undefined) {
    return { projects: [], error: res.message }
  }

  const list = extractProjectList(res.data)
  const projects = list.map(toProject)
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

export async function createProject(input: ProjectCreateInput): Promise<{
  entity: ProjectEntity | null
  error?: string
}> {
  const body = usesMultipart(input)
    ? projectFormDataPayload(input)
    : projectJsonPayload(input)
  const res = await api.post<ProjectEntity>(
    '/projects',
    body,
    { auth: true }
  )
  if (!res.success || !res.data) {
    return { entity: null, error: res.message }
  }
  return { entity: res.data }
}

export async function replaceProject(
  id: string,
  input: ProjectCreateInput
): Promise<{
  entity: ProjectEntity | null
  error?: string
}> {
  const body = usesMultipart(input)
    ? projectFormDataPayload(input)
    : projectJsonPayload(input)
  const res = await api.put<ProjectEntity>(`/projects/${id}`, body, {
    auth: true,
  })
  if (!res.success || !res.data) {
    return { entity: null, error: res.message }
  }
  return { entity: res.data }
}

export async function patchProject(
  id: string,
  input: ProjectPatchInput
): Promise<{
  entity: ProjectEntity | null
  error?: string
}> {
  const body = usesMultipart(input)
    ? projectFormDataPayload(input)
    : projectJsonPayload(input)
  const res = await api.patch<ProjectEntity>(`/projects/${id}`, body, {
    auth: true,
  })
  if (!res.success || !res.data) {
    return { entity: null, error: res.message }
  }
  return { entity: res.data }
}

export async function deleteProject(id: string): Promise<{
  success: boolean
  message?: string
}> {
  const res = await api.delete<null>(`/projects/${id}`, { auth: true })
  return { success: res.success, message: res.message }
}
