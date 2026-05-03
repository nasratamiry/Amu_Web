import { Request, Response, NextFunction } from 'express'
import { ContactMessage } from '../models/ContactMessage'

export const createContactMessage = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const message = await ContactMessage.create(req.body)
    res.status(201).json({
      success: true,
      message: 'Thank you! Your message has been received. We will get back to you soon.',
      data: { id: message._id },
    })
  } catch (error) {
    next(error)
  }
}
