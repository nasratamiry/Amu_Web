import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import mongoose from 'mongoose'
import path from 'path'
import fs from 'fs'
import dotenv from 'dotenv'
import rateLimit from 'express-rate-limit'
import routes from './routes'
import { errorHandler } from './middleware/errorHandler'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/amu_web'

// Trust proxy (required when behind reverse proxy like Spaceship)
app.set('trust proxy', 1)

// CORS
const corsOrigins = process.env.CORS_ORIGINS?.split(',').map((o) => o.trim()) || [
  'http://localhost:5173',
  'http://localhost:5174',
  'https://euphonious-kheer-5db008.netlify.app',
]

app.use(
  cors({
    origin: corsOrigins,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
)

// Rate limiting
app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    message: { success: false, message: 'Too many requests' },
  })
)

// Middleware
app.use(morgan('dev'))
app.use(express.json())
app.use('/uploads', express.static(path.join(process.cwd(), 'uploads')))

// API routes
app.use('/api', routes)

// Root route - friendly response instead of 404
app.get('/', (_req, res) => {
  res.status(200).json({
    success: true,
    message: 'Etihad Amu API',
    api: '/api',
    health: '/api/health',
  })
})

// Serve frontend static files (when deployed on same domain)
const clientDir = path.join(process.cwd(), 'client')
if (fs.existsSync(clientDir)) {
  app.use(express.static(clientDir))
  app.get('*', (_req, res) => {
    res.sendFile(path.join(clientDir, 'index.html'))
  })
} else {
  app.use((_req, res) => res.status(404).json({ success: false, message: 'Not found' }))
}

// Error handler
app.use(errorHandler)

// MongoDB connection
mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log('✅ Connected to MongoDB')
    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`)
      console.log(`📡 API: http://localhost:${PORT}/api`)
    })
  })
  .catch((err) => {
    console.error('❌ MongoDB connection error:', err.message)
    process.exit(1)
  })
