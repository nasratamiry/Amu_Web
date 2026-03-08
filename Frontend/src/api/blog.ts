import { api } from './client'
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

  if (!res.success || !res.data) {
    return { posts: [], error: res.message }
  }

  const posts = Array.isArray(res.data) ? res.data.map(toBlogPost) : []
  return {
    posts,
    pagination: res.pagination,
  }
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
