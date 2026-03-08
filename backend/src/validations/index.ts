import { z } from 'zod'

export const projectSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().min(1, 'Description is required'),
  category: z.string().optional(),
  image: z.string().min(1, 'Image URL is required'),
  link: z.string().url().optional().or(z.literal('')),
  technologies: z.array(z.string()).optional(),
  year: z.string().optional(),
})

export const teamMemberSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  role: z.string().min(1, 'Role is required'),
  photo: z.string().min(1, 'Photo URL is required'),
  bio: z.string().optional(),
  socialLinks: z
    .object({
      linkedin: z.string().url().optional().or(z.literal('')),
      twitter: z.string().url().optional().or(z.literal('')),
      github: z.string().url().optional().or(z.literal('')),
    })
    .optional(),
})

export const blogPostSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  slug: z.string().min(1, 'Slug is required'),
  content: z.string().min(1, 'Content is required'),
  excerpt: z.string().optional(),
  image: z.string().min(1, 'Image URL is required'),
  author: z.string().optional(),
  date: z.coerce.date().optional(),
  readTime: z.string().optional(),
  category: z.string().optional(),
})

export const adminLoginSchema = z.object({
  email: z.string().email('Invalid email'),
  password: z.string().min(1, 'Password is required'),
})

export const contactMessageSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email address'),
  message: z.string().min(1, 'Message is required'),
  subject: z.string().optional(),
})

export type ProjectInput = z.infer<typeof projectSchema>
export type TeamMemberInput = z.infer<typeof teamMemberSchema>
export type BlogPostInput = z.infer<typeof blogPostSchema>
export type ContactMessageInput = z.infer<typeof contactMessageSchema>
