import { Request, Response, NextFunction } from 'express'
import { TeamMember } from '../models/Team'
import { ApiError } from '../middleware/errorHandler'
import mongoose from 'mongoose'

export const getAllTeamMembers = async (
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const members = await TeamMember.find().sort({ createdAt: -1 }).lean()
    res.status(200).json({ success: true, data: members })
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

    res.status(200).json({ success: true, data: member })
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
    res.status(201).json({ success: true, data: member })
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

    res.status(200).json({ success: true, data: member })
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
