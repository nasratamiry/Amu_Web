import { Request, Response, NextFunction } from 'express'
import { ContactMessage } from '../models/ContactMessage'
import { ApiError } from '../middleware/errorHandler'
import mongoose from 'mongoose'

export const getAllMessages = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { page = 1, limit = 20 } = req.query
    const skip = (Number(page) - 1) * Number(limit)

    const [messages, total] = await Promise.all([
      ContactMessage.find()
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(Number(limit))
        .lean(),
      ContactMessage.countDocuments(),
    ])

    res.status(200).json({
      success: true,
      data: messages,
      pagination: {
        page: Number(page),
        limit: Number(limit),
        total,
        pages: Math.ceil(total / Number(limit)),
      },
    })
  } catch (error) {
    next(error)
  }
}

export const deleteMessage = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new ApiError('Invalid message ID', 400)
    }

    const message = await ContactMessage.findByIdAndDelete(id)
    if (!message) {
      throw new ApiError('Message not found', 404)
    }

    res.status(200).json({ success: true, message: 'Message deleted successfully' })
  } catch (error) {
    next(error)
  }
}
