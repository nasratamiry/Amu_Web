import { api } from './client'
import type { ApiResponse } from './client'
import type {
  BlogPostCreateInput,
  BlogPostEntity,
  BlogPostPatchInput,
} from './types'
import { toBlogPost } from './types'
import type { BlogPost } from './types'

export interface BlogListParams {
  page?: number
  limit?: number
  /** With JWT sends `Authorization`; staff sees drafts in list per README. */
  auth?: boolean
}

function extractBlogList(raw: unknown): BlogPostEntity[] {
  if (Array.isArray(raw)) return raw as BlogPostEntity[]
  if (
    raw &&
    typeof raw === 'object' &&
    'results' in raw &&
    Array.isArray((raw as { results: unknown }).results)
  ) {
    return (raw as { results: BlogPostEntity[] }).results
  }
  return []
}

function blogJsonPayload(
  p: BlogPostCreateInput | BlogPostPatchInput
): Record<string, unknown> {
  const o: Record<string, unknown> = {}
  if (p.title != null && p.title !== '') o.title = p.title
  if (p.slug != null && p.slug !== '') o.slug = p.slug
  if (p.excerpt != null) o.excerpt = p.excerpt
  if (p.content != null) o.content = p.content
  if (p.published != null) o.published = p.published
  if ('published_at' in p && p.published_at !== undefined) {
    o.published_at = p.published_at
  }
  return o
}

function blogFormDataPayload(
  p: BlogPostCreateInput | BlogPostPatchInput
): FormData {
  const fd = new FormData()
  const j = blogJsonPayload(p)
  Object.entries(j).forEach(([k, v]) => {
    if (v === undefined || v === null) return
    fd.append(k, typeof v === 'boolean' ? (v ? 'true' : 'false') : String(v))
  })
  const cover = 'coverImageFile' in p ? p.coverImageFile : undefined
  if (cover instanceof File || cover instanceof Blob) {
    fd.append('cover_image', cover)
  }
  return fd
}

function usesMultipart(p: BlogPostCreateInput | BlogPostPatchInput): boolean {
  const f = 'coverImageFile' in p ? p.coverImageFile : undefined
  return f instanceof File || f instanceof Blob
}

export async function fetchBlogPosts(params?: BlogListParams): Promise<{
  posts: BlogPost[]
  pagination?: ApiResponse<BlogPostEntity[]>['pagination']
  error?: string
}> {
  const query: Record<string, string> = {}
  if (params?.page) query.page = String(params.page)
  if (params?.limit) query.limit = String(params.limit)

  const res = await api.get<BlogPostEntity[] | { results: BlogPostEntity[] }>(
    '/blog',
    Object.keys(query).length ? query : undefined,
    params?.auth ? { auth: true } : undefined
  )

  if (!res.success || res.data === undefined) {
    return { posts: [], error: res.message }
  }

  const list = extractBlogList(res.data)
  const posts = list.map(toBlogPost)
  return {
    posts,
    pagination: res.pagination,
  }
}

export async function fetchBlogPostBySlug(slug: string): Promise<{
  post: BlogPost | null
  error?: string
}> {
  const safe = encodeURIComponent(slug)
  const res = await api.get<BlogPostEntity>(`/blog/slug/${safe}`)

  if (!res.success || !res.data) {
    return { post: null, error: res.message }
  }

  return { post: toBlogPost(res.data) }
}

export async function fetchBlogPostById(
  id: string,
  opts?: { auth?: boolean }
): Promise<{
  post: BlogPost | null
  error?: string
}> {
  const res = await api.get<BlogPostEntity>(
    `/blog/${id}`,
    undefined,
    opts?.auth ? { auth: true } : undefined
  )
  if (!res.success || !res.data) {
    return { post: null, error: res.message }
  }
  return { post: toBlogPost(res.data) }
}

export async function createBlogPost(input: BlogPostCreateInput): Promise<{
  entity: BlogPostEntity | null
  error?: string
}> {
  const body = usesMultipart(input)
    ? blogFormDataPayload(input)
    : blogJsonPayload(input)
  const res = await api.post<BlogPostEntity>('/blog', body, { auth: true })
  if (!res.success || !res.data) {
    return { entity: null, error: res.message }
  }
  return { entity: res.data }
}

export async function replaceBlogPost(
  id: string,
  input: BlogPostCreateInput
): Promise<{
  entity: BlogPostEntity | null
  error?: string
}> {
  const body = usesMultipart(input)
    ? blogFormDataPayload(input)
    : blogJsonPayload(input)
  const res = await api.put<BlogPostEntity>(`/blog/${id}`, body, {
    auth: true,
  })
  if (!res.success || !res.data) {
    return { entity: null, error: res.message }
  }
  return { entity: res.data }
}

export async function patchBlogPost(
  id: string,
  input: BlogPostPatchInput
): Promise<{
  entity: BlogPostEntity | null
  error?: string
}> {
  const body = usesMultipart(input)
    ? blogFormDataPayload(input)
    : blogJsonPayload(input)
  const res = await api.patch<BlogPostEntity>(`/blog/${id}`, body, {
    auth: true,
  })
  if (!res.success || !res.data) {
    return { entity: null, error: res.message }
  }
  return { entity: res.data }
}

export async function deleteBlogPost(id: string): Promise<{
  success: boolean
  message?: string
}> {
  const res = await api.delete<null>(`/blog/${id}`, { auth: true })
  return { success: res.success, message: res.message }
}
