import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import { ApiError } from './errorHandler'
import { Admin } from '../models/Admin'

const JWT_SECRET = process.env.JWT_SECRET || 'change-me-in-production-secret-key'

export interface AuthPayload {
  adminId: string
  email: string
}

export interface AuthRequest extends Request {
  admin?: AuthPayload
}

export const authenticate = async (
  req: AuthRequest,
  _res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers.authorization
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new ApiError('Unauthorized: No token provided', 401)
    }

    const token = authHeader.split(' ')[1]
    const decoded = jwt.verify(token, JWT_SECRET) as AuthPayload

    const admin = await Admin.findById(decoded.adminId).select('_id email')
    if (!admin) {
      throw new ApiError('Unauthorized: Admin not found', 401)
    }

    req.admin = { adminId: admin._id.toString(), email: admin.email }
    next()
  } catch (err) {
    if (err instanceof jwt.JsonWebTokenError) {
      next(new ApiError('Unauthorized: Invalid token', 401))
    } else {
      next(err)
    }
  }
}
