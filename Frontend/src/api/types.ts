// Backend entity types (MongoDB _id)
export interface ProjectEntity {
  _id: string
  title: string
  description: string
  category?: string
  image: string
  link?: string
  technologies?: string[]
  year?: string
  createdAt?: string
  updatedAt?: string
}

export interface TeamMemberEntity {
  _id: string
  name: string
  role: string
  photo: string
  bio?: string
  socialLinks?: {
    linkedin?: string
    twitter?: string
    github?: string
  }
  createdAt?: string
  updatedAt?: string
}

export interface BlogPostEntity {
  _id: string
  title: string
  slug: string
  content: string
  excerpt?: string
  image: string
  author?: string
  date: string
  readTime?: string
  category?: string
  createdAt?: string
  updatedAt?: string
}

// Frontend-friendly types (id instead of _id, normalized field names)
export interface Project {
  id: string
  title: string
  description: string
  category?: string
  image: string
  link?: string
  technologies?: string[]
  year?: string
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
    email?: string
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

function formatDate(date: string | Date | undefined): string {
  if (!date) return ''
  const d = typeof date === 'string' ? new Date(date) : date
  return d.toISOString().split('T')[0]
}

export function toProject(entity: ProjectEntity): Project {
  return {
    id: entity._id,
    title: entity.title,
    description: entity.description,
    category: entity.category,
    image: entity.image,
    link: entity.link,
    technologies: entity.technologies ?? [],
    year: entity.year,
  }
}

export function toTeamMember(entity: TeamMemberEntity): TeamMember {
  return {
    id: entity._id,
    name: entity.name,
    role: entity.role,
    image: entity.photo,
    bio: entity.bio,
    social: entity.socialLinks ?? {},
  }
}

export function toBlogPost(entity: BlogPostEntity): BlogPost {
  return {
    id: entity._id,
    slug: entity.slug,
    title: entity.title,
    excerpt: entity.excerpt,
    content: entity.content,
    image: entity.image,
    author: entity.author,
    date: formatDate(entity.date),
    readTime: entity.readTime,
    category: entity.category,
  }
}
