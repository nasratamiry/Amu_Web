import { Request, Response, NextFunction } from 'express'
import { Project } from '../models/Project'
import { ApiError } from '../middleware/errorHandler'
import mongoose from 'mongoose'

export const getAllProjects = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { page = 1, limit = 10, search } = req.query
    const skip = (Number(page) - 1) * Number(limit)
    const filter: Record<string, unknown> = {}

    if (search && typeof search === 'string') {
      filter.title = { $regex: search, $options: 'i' }
    }

    const [projects, total] = await Promise.all([
      Project.find(filter).sort({ createdAt: -1 }).skip(skip).limit(Number(limit)).lean(),
      Project.countDocuments(filter),
    ])

    res.status(200).json({
      success: true,
      data: projects,
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

export const getProjectById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new ApiError('Invalid project ID', 400)
    }

    const project = await Project.findById(id)
    if (!project) {
      throw new ApiError('Project not found', 404)
    }

    res.status(200).json({ success: true, data: project })
  } catch (error) {
    next(error)
  }
}

export const createProject = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const project = await Project.create(req.body)
    res.status(201).json({ success: true, data: project })
  } catch (error) {
    next(error)
  }
}

export const updateProject = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new ApiError('Invalid project ID', 400)
    }

    const project = await Project.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    })
    if (!project) {
      throw new ApiError('Project not found', 404)
    }

    res.status(200).json({ success: true, data: project })
  } catch (error) {
    next(error)
  }
}

export const deleteProject = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new ApiError('Invalid project ID', 400)
    }

    const project = await Project.findByIdAndDelete(id)
    if (!project) {
      throw new ApiError('Project not found', 404)
    }

    res.status(200).json({ success: true, message: 'Project deleted successfully' })
  } catch (error) {
    next(error)
  }
}
