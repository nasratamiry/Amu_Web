import { Request, Response, NextFunction } from 'express'

export const uploadImage = (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'No file uploaded',
      })
    }

    const port = process.env.PORT || 5000
    const baseUrl = process.env.API_BASE_URL || `http://localhost:${port}`
    const fileUrl = `${baseUrl}/uploads/${req.file.filename}`

    res.status(200).json({
      success: true,
      data: { url: fileUrl, filename: req.file.filename },
    })
  } catch (error) {
    next(error)
  }
}
