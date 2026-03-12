// Backend entity types (MongoDB _id)
export interface ProjectEntity {
  _id: string
  title: string
  titleFa?: string
  titlePs?: string
  description: string
  descriptionFa?: string
  descriptionPs?: string
  category?: string
  categoryFa?: string
  categoryPs?: string
  image: string
  link?: string
  playStoreUrl?: string
  appStoreUrl?: string
  technologies?: string[]
  year?: string
  createdAt?: string
  updatedAt?: string
}

export interface TeamMemberEntity {
  _id: string
  name: string
  role: string
  roleFa?: string
  rolePs?: string
  photo: string
  bio?: string
  bioFa?: string
  bioPs?: string
  socialLinks?: {
    linkedin?: string
    email?: string
  }
  createdAt?: string
  updatedAt?: string
}

export interface BlogPostEntity {
  _id: string
  title: string
  titleFa?: string
  titlePs?: string
  slug: string
  content: string
  contentFa?: string
  contentPs?: string
  excerpt?: string
  excerptFa?: string
  excerptPs?: string
  image: string
  author?: string
  date: string
  readTime?: string
  category?: string
  categoryFa?: string
  categoryPs?: string
  createdAt?: string
  updatedAt?: string
}

// Frontend-friendly types (id instead of _id, normalized field names)
export interface Project {
  id: string
  title: string
  titleFa?: string
  titlePs?: string
  description: string
  descriptionFa?: string
  descriptionPs?: string
  category?: string
  categoryFa?: string
  categoryPs?: string
  image: string
  link?: string
  playStoreUrl?: string
  appStoreUrl?: string
  technologies?: string[]
  year?: string
}

export interface TeamMember {
  id: string
  name: string
  role: string
  roleFa?: string
  rolePs?: string
  image: string
  bio?: string
  bioFa?: string
  bioPs?: string
  social: {
    linkedin?: string
    email?: string
  }
}

export interface BlogPost {
  id: string
  slug: string
  title: string
  titleFa?: string
  titlePs?: string
  excerpt?: string
  excerptFa?: string
  excerptPs?: string
  content: string
  contentFa?: string
  contentPs?: string
  image: string
  author?: string
  date: string
  readTime?: string
  category?: string
  categoryFa?: string
  categoryPs?: string
}

export interface ContactMessageInput {
  name: string
  email: string
  message: string
  subject?: string
}

function formatDate(date: string | Date | undefined): string {
  if (!date) return ''
  const d = typeof date === 'string' ? new Date(date) : date
  return d.toISOString().split('T')[0]
}

export function toProject(entity: ProjectEntity): Project {
  return {
    id: entity._id,
    title: entity.title,
    titleFa: entity.titleFa,
    titlePs: entity.titlePs,
    description: entity.description,
    descriptionFa: entity.descriptionFa,
    descriptionPs: entity.descriptionPs,
    category: entity.category,
    categoryFa: entity.categoryFa,
    categoryPs: entity.categoryPs,
    image: entity.image,
    link: entity.link,
    playStoreUrl: entity.playStoreUrl,
    appStoreUrl: entity.appStoreUrl,
    technologies: entity.technologies ?? [],
    year: entity.year,
  }
}

export function toTeamMember(entity: TeamMemberEntity): TeamMember {
  return {
    id: entity._id,
    name: entity.name,
    role: entity.role,
    roleFa: entity.roleFa,
    rolePs: entity.rolePs,
    image: entity.photo,
    bio: entity.bio,
    bioFa: entity.bioFa,
    bioPs: entity.bioPs,
    social: entity.socialLinks ?? {},
  }
}

export function toBlogPost(entity: BlogPostEntity): BlogPost {
  return {
    id: entity._id,
    slug: entity.slug,
    title: entity.title,
    titleFa: entity.titleFa,
    titlePs: entity.titlePs,
    excerpt: entity.excerpt,
    excerptFa: entity.excerptFa,
    excerptPs: entity.excerptPs,
    content: entity.content,
    contentFa: entity.contentFa,
    contentPs: entity.contentPs,
    image: entity.image,
    author: entity.author,
    date: formatDate(entity.date),
    readTime: entity.readTime,
    category: entity.category,
    categoryFa: entity.categoryFa,
    categoryPs: entity.categoryPs,
  }
}

export type Locale = 'en' | 'fa' | 'ps'

export function getLocalized(obj: object, baseKey: string, locale: Locale): string {
  const o = obj as Record<string, unknown>
  if (locale === 'fa') {
    const faKey = `${baseKey}Fa`
    return (o[faKey] as string) || (o[baseKey] as string) || ''
  }
  if (locale === 'ps') {
    const psKey = `${baseKey}Ps`
    return (o[psKey] as string) || (o[baseKey] as string) || ''
  }
  return (o[baseKey] as string) || ''
}
