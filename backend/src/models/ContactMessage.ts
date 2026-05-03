import mongoose, { Document, Schema } from 'mongoose'

export interface IContactMessage extends Document {
  name: string
  email: string
  message: string
  subject?: string
  date: Date
  createdAt: Date
}

const ContactMessageSchema = new Schema<IContactMessage>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    message: { type: String, required: true },
    subject: { type: String },
    date: { type: Date, default: Date.now },
  },
  { timestamps: true }
)

export const ContactMessage = mongoose.model<IContactMessage>(
  'ContactMessage',
  ContactMessageSchema
)
