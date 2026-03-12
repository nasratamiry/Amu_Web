import mongoose, { Document, Schema } from 'mongoose'

interface ISocialLinks {
  linkedin?: string
  email?: string
}

export interface ITeamMember extends Document {
  name: string
  role: string
  roleFa?: string
  rolePs?: string
  photo: string
  bio?: string
  bioFa?: string
  bioPs?: string
  socialLinks: ISocialLinks
  createdAt: Date
  updatedAt: Date
}

const SocialLinksSchema = new Schema<ISocialLinks>(
  {
    linkedin: { type: String },
    email: { type: String },
  },
  { _id: false }
)

const TeamMemberSchema = new Schema<ITeamMember>(
  {
    name: { type: String, required: true },
    role: { type: String, required: true },
    roleFa: { type: String },
    rolePs: { type: String },
    photo: { type: String, required: true },
    bio: { type: String },
    bioFa: { type: String },
    bioPs: { type: String },
    socialLinks: { type: SocialLinksSchema, default: {} },
  },
  { timestamps: true }
)

export const TeamMember = mongoose.model<ITeamMember>('TeamMember', TeamMemberSchema)
