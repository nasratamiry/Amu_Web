import { Request, Response, NextFunction } from 'express'
import { BlogPost } from '../models/Blog'
import { ApiError } from '../middleware/errorHandler'
import mongoose from 'mongoose'

export const getAllBlogPosts = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { page = 1, limit = 10 } = req.query
    const skip = (Number(page) - 1) * Number(limit)

    const [posts, total] = await Promise.all([
      BlogPost.find().sort({ date: -1 }).skip(skip).limit(Number(limit)).lean(),
      BlogPost.countDocuments(),
    ])

    res.status(200).json({
      success: true,
      data: posts,
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

export const getBlogPostById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new ApiError('Invalid blog post ID', 400)
    }

    const post = await BlogPost.findById(id)
    if (!post) {
      throw new ApiError('Blog post not found', 404)
    }

    res.status(200).json({ success: true, data: post })
  } catch (error) {
    next(error)
  }
}

export const getBlogPostBySlug = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { slug } = req.params
    const post = await BlogPost.findOne({ slug })
    if (!post) {
      throw new ApiError('Blog post not found', 404)
    }
    res.status(200).json({ success: true, data: post })
  } catch (error) {
    next(error)
  }
}

export const createBlogPost = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const post = await BlogPost.create(req.body)
    res.status(201).json({ success: true, data: post })
  } catch (error) {
    next(error)
  }
}

export const updateBlogPost = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new ApiError('Invalid blog post ID', 400)
    }

    const post = await BlogPost.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    })
    if (!post) {
      throw new ApiError('Blog post not found', 404)
    }

    res.status(200).json({ success: true, data: post })
  } catch (error) {
    next(error)
  }
}

export const deleteBlogPost = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new ApiError('Invalid blog post ID', 400)
    }

    const post = await BlogPost.findByIdAndDelete(id)
    if (!post) {
      throw new ApiError('Blog post not found', 404)
    }

    res.status(200).json({ success: true, message: 'Blog post deleted successfully' })
  } catch (error) {
    next(error)
  }
}
