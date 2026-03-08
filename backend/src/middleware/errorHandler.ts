import { Request, Response, NextFunction } from 'express'

export class ApiError extends Error {
  statusCode: number
  constructor(message: string, statusCode = 500) {
    super(message)
    this.statusCode = statusCode
    this.name = 'ApiError'
  }
}

export const errorHandler = (
  err: Error & { statusCode?: number },
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  const statusCode = err.statusCode ?? 500
  const message = err.message || 'Internal Server Error'

  console.error(`[Error] ${statusCode}: ${message}`, err.stack)

  res.status(statusCode).json({
    success: false,
    message: process.env.NODE_ENV === 'production' ? 'Something went wrong' : message,
  })
}
