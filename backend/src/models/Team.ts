import mongoose, { Document, Schema } from 'mongoose'

interface ISocialLinks {
  linkedin?: string
  twitter?: string
  github?: string
}

export interface ITeamMember extends Document {
  name: string
  role: string
  photo: string
  bio?: string
  socialLinks: ISocialLinks
  createdAt: Date
  updatedAt: Date
}

const SocialLinksSchema = new Schema<ISocialLinks>(
  {
    linkedin: { type: String },
    twitter: { type: String },
    github: { type: String },
  },
  { _id: false }
)

const TeamMemberSchema = new Schema<ITeamMember>(
  {
    name: { type: String, required: true },
    role: { type: String, required: true },
    photo: { type: String, required: true },
    bio: { type: String },
    socialLinks: { type: SocialLinksSchema, default: {} },
  },
  { timestamps: true }
)

export const TeamMember = mongoose.model<ITeamMember>('TeamMember', TeamMemberSchema)
