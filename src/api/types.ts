import { API_BASE } from './client'

/** Django may return `/media/...`; resolve against API host (same origin as `{BASE_URL}/api`). */
function resolveMediaUrl(url: string | undefined): string | undefined {
  if (!url) return undefined
  if (
    url.startsWith('http://') ||
    url.startsWith('https://') ||
    url.startsWith('data:')
  ) {
    return url
  }
  if (!url.startsWith('/')) return url
  let origin = API_BASE.replace(/\/+$/, '')
  if (origin.endsWith('/api')) origin = origin.slice(0, -4)
  // Dev proxy: API_BASE `/api` → empty origin; `/media/*` still works via Vite proxy to Django.
  if (!origin || origin.startsWith('/')) return url
  return `${origin}${url}`
}

/** Placeholder when API omits `image` / `cover_image`. */
export const IMAGE_PLACEHOLDER =
  'data:image/svg+xml,' +
  encodeURIComponent(
    '<svg xmlns="http://www.w3.org/2000/svg" width="800" height="500"><rect fill="%23f1f5f9" width="100%" height="100%"/></svg>'
  )

/** Raw project from Django REST (`/api/projects/`). */
export interface ProjectEntity {
  id: string
  title: string
  description?: string
  technologies?: string[]
  featured?: boolean
  order?: number
  created_at?: string
  updated_at?: string
  image?: string
  play_store_url?: string
  app_store_url?: string
  website_url?: string
}

/** Raw team member from Django (`/api/team/`). */
export interface TeamMemberEntity {
  id: string
  name: string
  role?: string
  bio?: string
  image?: string
  social_links?: Record<string, unknown>
  order?: number
  created_at?: string
  updated_at?: string
}

/** Raw blog post from Django (`/api/blog/`). */
export interface BlogPostEntity {
  id: string
  title: string
  slug: string
  excerpt?: string
  content?: string
  published?: boolean
  published_at?: string | null
  created_at?: string
  updated_at?: string
  cover_image?: string
}

export interface Project {
  id: string
  title: string
  description: string
  category?: string
  image: string
  /** Primary external link when present (legacy single-link UI). */
  link?: string
  technologies?: string[]
  year?: string
  play_store_url?: string
  app_store_url?: string
  website_url?: string
}

export interface TeamMember {
  id: string
  name: string
  role: string
  image: string
  bio?: string
  social: {
    linkedin?: string
    twitter?: string
    github?: string
  }
}

export interface BlogPost {
  id: string
  slug: string
  title: string
  excerpt?: string
  content: string
  image: string
  author?: string
  date: string
  readTime?: string
  category?: string
}

export interface ContactMessageInput {
  name: string
  email: string
  message: string
  subject?: string
}

/** REST list envelope inside `data` (projects, blog, messages). */
export interface PaginatedResult<T> {
  count: number
  next: string | null
  previous: string | null
  results: T[]
}

export interface LoginResponseData {
  refresh: string
  access: string
  user: {
    id: string
    username: string
    email: string
    first_name: string
    last_name: string
    is_staff: boolean
  }
}

export interface AdminStatsEntity {
  projects: number
  team: number
  blog: number
  messages: number
}

/** Message row from `/api/contact/` or `/api/messages/`. */
export interface ContactMessageEntity {
  id: string
  name: string
  email: string
  subject: string
  message: string
  read: boolean
  created_at: string
  updated_at: string
}

export interface UploadedImageEntity {
  id: string
  image: string
  url: string
  created_at: string
  updated_at: string
}

export interface ProjectWriteInput {
  title: string
  description?: string
  technologies?: string[]
  play_store_url?: string
  app_store_url?: string
  website_url?: string
  featured?: boolean
  order?: number
}

export interface ProjectCreateInput extends ProjectWriteInput {
  imageFile?: File | Blob | null
}

export type ProjectPatchInput = Partial<ProjectWriteInput> & {
  title?: string
  imageFile?: File | Blob | null
}

export interface TeamMemberWriteInput {
  name: string
  role?: string
  bio?: string
  social_links?: Record<string, unknown>
  order?: number
}

export interface TeamMemberCreateInput extends TeamMemberWriteInput {
  imageFile?: File | Blob | null
}

export type TeamMemberPatchInput = Partial<TeamMemberWriteInput> & {
  name?: string
  imageFile?: File | Blob | null
}

export interface BlogPostWriteInput {
  title: string
  slug: string
  excerpt?: string
  content?: string
  published?: boolean
  published_at?: string | null
}

export interface BlogPostCreateInput extends BlogPostWriteInput {
  coverImageFile?: File | Blob | null
}

export type BlogPostPatchInput = Partial<BlogPostWriteInput> & {
  coverImageFile?: File | Blob | null
}

function formatDate(date: string | Date | undefined | null): string {
  if (!date) return ''
  const d = typeof date === 'string' ? new Date(date) : date
  return d.toISOString().split('T')[0]
}

function yearFromISO(iso?: string): string | undefined {
  if (!iso) return undefined
  const y = iso.slice(0, 4)
  return /^\d{4}$/.test(y) ? y : undefined
}

function pickSocial(obj: Record<string, unknown> | undefined): TeamMember['social'] {
  if (!obj || typeof obj !== 'object') return {}
  const s = (k: string): string | undefined =>
    typeof obj[k] === 'string' ? (obj[k] as string) : undefined
  return {
    linkedin: s('linkedin'),
    twitter: s('twitter'),
    github: s('github'),
  }
}

function primaryProjectLink(entity: ProjectEntity): string | undefined {
  return (
    entity.website_url || entity.play_store_url || entity.app_store_url
  )
}

export function toProject(entity: ProjectEntity): Project {
  return {
    id: entity.id,
    title: entity.title,
    description: entity.description ?? '',
    image: resolveMediaUrl(entity.image) || IMAGE_PLACEHOLDER,
    link: primaryProjectLink(entity),
    technologies: entity.technologies ?? [],
    year: yearFromISO(entity.created_at),
    play_store_url: entity.play_store_url,
    app_store_url: entity.app_store_url,
    website_url: entity.website_url,
  }
}

export function toTeamMember(entity: TeamMemberEntity): TeamMember {
  return {
    id: entity.id,
    name: entity.name,
    role: entity.role ?? '',
    image: resolveMediaUrl(entity.image) || IMAGE_PLACEHOLDER,
    bio: entity.bio,
    social: pickSocial(entity.social_links),
  }
}

export function toBlogPost(entity: BlogPostEntity): BlogPost {
  const dateSrc = entity.published_at || entity.created_at || ''
  return {
    id: entity.id,
    slug: entity.slug,
    title: entity.title,
    excerpt: entity.excerpt,
    content: entity.content ?? '',
    image: resolveMediaUrl(entity.cover_image) || IMAGE_PLACEHOLDER,
    date: formatDate(dateSrc),
  }
}
