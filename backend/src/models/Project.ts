import mongoose, { Document, Schema } from 'mongoose'

export interface IProject extends Document {
  title: string
  description: string
  category?: string
  image: string
  link?: string
  projectUrl?: string
  technologies?: string[]
  year?: string
  featured?: boolean
  createdAt: Date
  updatedAt: Date
}

const ProjectSchema = new Schema<IProject>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String, default: '' },
    image: { type: String, required: true },
    link: { type: String },
    projectUrl: { type: String },
    technologies: [{ type: String }],
    year: { type: String },
    featured: { type: Boolean, default: false },
  },
  { timestamps: true }
)

export const Project = mongoose.model<IProject>('Project', ProjectSchema)
