import { api } from './client'
import { apiCache } from './cache'
import type { ApiResponse } from './client'
import type { BlogPostEntity } from './types'
import { toBlogPost } from './types'
import type { BlogPost } from './types'

export interface BlogListParams {
  page?: number
  limit?: number
}

export async function fetchBlogPosts(params?: BlogListParams): Promise<{
  posts: BlogPost[]
  pagination?: ApiResponse<BlogPostEntity[]>['pagination']
  error?: string
}> {
  const query: Record<string, string> = {}
  if (params?.page) query.page = String(params.page)
  if (params?.limit) query.limit = String(params.limit)

  const res = await api.get<BlogPostEntity[]>(
    '/blog',
    Object.keys(query).length ? query : undefined
  )

  if (res.success && res.data && Array.isArray(res.data)) {
    const posts = res.data.map(toBlogPost)
    const cachePayload = { posts, pagination: res.pagination }
    apiCache.set(apiCache.keys.blog(params), cachePayload)
    return { posts, pagination: res.pagination }
  }

  const cached = apiCache.get<{ posts: BlogPost[]; pagination?: ApiResponse<BlogPostEntity[]>['pagination'] }>(
    apiCache.keys.blog(params)
  )
  if (cached && Array.isArray(cached.posts)) {
    return { posts: cached.posts, pagination: cached.pagination }
  }

  return { posts: [], error: res.message }
}

export async function fetchBlogPostBySlug(slug: string): Promise<{
  post: BlogPost | null
  error?: string
}> {
  const res = await api.get<BlogPostEntity>(`/blog/slug/${slug}`)

  if (!res.success || !res.data) {
    return { post: null, error: res.message }
  }

  return { post: toBlogPost(res.data) }
}

export async function fetchBlogPostById(id: string): Promise<{
  post: BlogPost | null
  error?: string
}> {
  const res = await api.get<BlogPostEntity>(`/blog/${id}`)

  if (!res.success || !res.data) {
    return { post: null, error: res.message }
  }

  return { post: toBlogPost(res.data) }
}
