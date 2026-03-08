import mongoose, { Document, Schema } from 'mongoose'

export interface IBlogPost extends Document {
  title: string
  slug: string
  content: string
  excerpt?: string
  image: string
  author?: string
  date: Date
  readTime?: string
  category?: string
  createdAt: Date
  updatedAt: Date
}

const BlogPostSchema = new Schema<IBlogPost>(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    content: { type: String, required: true },
    excerpt: { type: String },
    image: { type: String, required: true },
    author: { type: String },
    date: { type: Date, required: true, default: Date.now },
    readTime: { type: String },
    category: { type: String },
  },
  { timestamps: true }
)

export const BlogPost = mongoose.model<IBlogPost>('BlogPost', BlogPostSchema)
