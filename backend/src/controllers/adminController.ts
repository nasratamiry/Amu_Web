import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import { Admin } from '../models/Admin'
import { Project } from '../models/Project'
import { BlogPost } from '../models/Blog'
import { ContactMessage } from '../models/ContactMessage'
import { TeamMember } from '../models/Team'
import { ApiError } from '../middleware/errorHandler'

const JWT_SECRET = process.env.JWT_SECRET || 'change-me-in-production-secret-key'
const JWT_EXPIRES = process.env.JWT_EXPIRES || '7d'

export const getStats = async (
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const [projects, blogPosts, messages, teamMembers] = await Promise.all([
      Project.countDocuments(),
      BlogPost.countDocuments(),
      ContactMessage.countDocuments(),
      TeamMember.countDocuments(),
    ])

    res.status(200).json({
      success: true,
      data: {
        projects,
        blogPosts,
        messages,
        teamMembers,
      },
    })
  } catch (error) {
    next(error)
  }
}

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body

    if (!email || !password) {
      throw new ApiError('Email and password are required', 400)
    }

    const admin = await Admin.findOne({ email: email.toLowerCase() }).select('+password')
    if (!admin) {
      throw new ApiError('Invalid email or password', 401)
    }

    const valid = await admin.comparePassword(password)
    if (!valid) {
      throw new ApiError('Invalid email or password', 401)
    }

    const token = jwt.sign(
      { adminId: admin._id.toString(), email: admin.email },
      JWT_SECRET,
      { expiresIn: '7d' }
    )

    res.status(200).json({
      success: true,
      data: {
        token,
        admin: { id: admin._id, email: admin.email },
      },
    })
  } catch (error) {
    next(error)
  }
}
