import mongoose, { Document, Schema } from 'mongoose'

export interface IBlogPost extends Document {
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
  date: Date
  readTime?: string
  category?: string
  categoryFa?: string
  categoryPs?: string
  createdAt: Date
  updatedAt: Date
}

const BlogPostSchema = new Schema<IBlogPost>(
  {
    title: { type: String, required: true },
    titleFa: { type: String },
    titlePs: { type: String },
    slug: { type: String, required: true, unique: true },
    content: { type: String, required: true },
    contentFa: { type: String },
    contentPs: { type: String },
    excerpt: { type: String },
    excerptFa: { type: String },
    excerptPs: { type: String },
    image: { type: String, required: true },
    author: { type: String },
    date: { type: Date, required: true, default: Date.now },
    readTime: { type: String },
    category: { type: String },
    categoryFa: { type: String },
    categoryPs: { type: String },
  },
  { timestamps: true }
)

export const BlogPost = mongoose.model<IBlogPost>('BlogPost', BlogPostSchema)
