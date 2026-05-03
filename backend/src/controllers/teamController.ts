import { Request, Response, NextFunction } from 'express'
import { TeamMember } from '../models/Team'
import { ApiError } from '../middleware/errorHandler'
import mongoose from 'mongoose'

// Fix localhost/relative photo URLs to use production API URL
const fixPhotoUrl = (photo: string): string => {
  if (!photo) return photo
  const apiBase = process.env.API_BASE_URL
  if (!apiBase) return photo
  // Replace localhost or relative uploads URLs with production API URL
  if (photo.startsWith('http://localhost:') || photo.startsWith('https://localhost:')) {
    const match = photo.match(/\/uploads\/.+$/)
    return match ? `${apiBase}${match[0]}` : photo
  }
  if (photo.startsWith('/uploads/')) {
    return `${apiBase}${photo}`
  }
  return photo
}

export const getAllTeamMembers = async (
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const members = await TeamMember.find().sort({ createdAt: -1 }).lean()
    const fixed = members.map((m: { photo?: string }) => ({
      ...m,
      photo: fixPhotoUrl(m.photo || ''),
    }))
    res.status(200).json({ success: true, data: fixed })
  } catch (error) {
    next(error)
  }
}

export const getTeamMemberById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new ApiError('Invalid team member ID', 400)
    }

    const member = await TeamMember.findById(id)
    if (!member) {
      throw new ApiError('Team member not found', 404)
    }

    const data = member.toObject ? member.toObject() : member
    if (data.photo) data.photo = fixPhotoUrl(data.photo)
    res.status(200).json({ success: true, data })
  } catch (error) {
    next(error)
  }
}

export const createTeamMember = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { socialLinks, ...rest } = req.body
    const member = await TeamMember.create({
      ...rest,
      socialLinks: socialLinks || {},
    })
    const data = member.toObject ? member.toObject() : member
    if (data.photo) data.photo = fixPhotoUrl(data.photo)
    res.status(201).json({ success: true, data })
  } catch (error) {
    next(error)
  }
}

export const updateTeamMember = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new ApiError('Invalid team member ID', 400)
    }

    const member = await TeamMember.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    })
    if (!member) {
      throw new ApiError('Team member not found', 404)
    }

    const data = member.toObject ? member.toObject() : member
    if (data.photo) data.photo = fixPhotoUrl(data.photo)
    res.status(200).json({ success: true, data })
  } catch (error) {
    next(error)
  }
}

export const deleteTeamMember = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new ApiError('Invalid team member ID', 400)
    }

    const member = await TeamMember.findByIdAndDelete(id)
    if (!member) {
      throw new ApiError('Team member not found', 404)
    }

    res.status(200).json({ success: true, message: 'Team member deleted successfully' })
  } catch (error) {
    next(error)
  }
}
