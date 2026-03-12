import mongoose, { Document, Schema } from 'mongoose'

export interface IProject extends Document {
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
  projectUrl?: string
  playStoreUrl?: string
  appStoreUrl?: string
  technologies?: string[]
  year?: string
  featured?: boolean
  createdAt: Date
  updatedAt: Date
}

const ProjectSchema = new Schema<IProject>(
  {
    title: { type: String, required: true },
    titleFa: { type: String },
    titlePs: { type: String },
    description: { type: String, required: true },
    descriptionFa: { type: String },
    descriptionPs: { type: String },
    category: { type: String, default: '' },
    categoryFa: { type: String },
    categoryPs: { type: String },
    image: { type: String, required: true },
    link: { type: String },
    projectUrl: { type: String },
    playStoreUrl: { type: String },
    appStoreUrl: { type: String },
    technologies: [{ type: String }],
    year: { type: String },
    featured: { type: Boolean, default: false },
  },
  { timestamps: true }
)

export const Project = mongoose.model<IProject>('Project', ProjectSchema)
