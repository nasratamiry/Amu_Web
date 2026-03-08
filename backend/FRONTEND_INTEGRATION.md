# Frontend Integration Guide

This document provides example API calls for the React frontend to integrate with the backend.

## Base URL

- **Development:** `http://localhost:5000/api`
- **Production:** `https://your-backend-url.com/api`

## Example: Fetch (vanilla)

### Projects

```typescript
// GET all projects (with optional pagination & search)
const response = await fetch(
  'http://localhost:5000/api/projects?page=1&limit=10&search=fintech'
)
const { data, pagination } = await response.json()

// GET single project
const project = await fetch('http://localhost:5000/api/projects/PROJECT_ID').then((r) =>
  r.json()
)

// POST create project
const newProject = await fetch('http://localhost:5000/api/projects', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    title: 'My Project',
    description: 'Description here',
    image: 'https://example.com/image.jpg',
    category: 'FinTech',
    technologies: ['React', 'Node.js'],
    year: '2024',
  }),
}).then((r) => r.json())

// PUT update project
await fetch('http://localhost:5000/api/projects/PROJECT_ID', {
  method: 'PUT',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ title: 'Updated Title' }),
})

// DELETE project
await fetch('http://localhost:5000/api/projects/PROJECT_ID', { method: 'DELETE' })
```

### Team

```typescript
// GET all team members
const { data } = await fetch('http://localhost:5000/api/team').then((r) => r.json())

// POST create team member
await fetch('http://localhost:5000/api/team', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    name: 'John Doe',
    role: 'Developer',
    photo: 'https://example.com/photo.jpg',
    bio: 'Bio text',
    socialLinks: { linkedin: 'https://linkedin.com/in/john', github: 'https://github.com/john' },
  }),
})
```

### Blog

```typescript
// GET all posts (with pagination)
const { data, pagination } = await fetch(
  'http://localhost:5000/api/blog?page=1&limit=10'
).then((r) => r.json())

// GET post by slug
const post = await fetch('http://localhost:5000/api/blog/slug/my-post-slug').then((r) =>
  r.json()
)

// POST create post
await fetch('http://localhost:5000/api/blog', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    title: 'My Post',
    slug: 'my-post',
    content: 'Full content...',
    excerpt: 'Short excerpt',
    image: 'https://example.com/image.jpg',
    author: 'Author Name',
    date: new Date().toISOString(),
    readTime: '5 min read',
    category: 'Technology',
  }),
})
```

### Contact Form

```typescript
// POST contact message
const result = await fetch('http://localhost:5000/api/contact', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    name: 'User Name',
    email: 'user@example.com',
    message: 'Message content',
    subject: 'Optional subject',
  }),
}).then((r) => r.json())
// { success: true, message: 'Thank you! Your message has been received...' }
```

## Example: Axios (React)

```typescript
import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
  headers: { 'Content-Type': 'application/json' },
})

// Projects
const projects = await api.get('/projects', { params: { page: 1, limit: 10, search: 'fintech' } })
const project = await api.get(`/projects/${id}`)
await api.post('/projects', projectData)
await api.put(`/projects/${id}`, updates)
await api.delete(`/projects/${id}`)

// Team
const team = await api.get('/team')

// Blog
const posts = await api.get('/blog', { params: { page: 1, limit: 10 } })
const post = await api.get(`/blog/slug/${slug}`)

// Contact
await api.post('/contact', { name, email, message, subject })
```

## Response Format

All responses follow this structure:

**Success:**
```json
{
  "success": true,
  "data": { ... }
}
```

**Error:**
```json
{
  "success": false,
  "message": "Error description",
  "errors": []  // for validation errors
}
```

## Environment Variable (Frontend)

Add to your React `.env`:

```
VITE_API_URL=http://localhost:5000/api
```

For production:
```
VITE_API_URL=https://your-backend.herokuapp.com/api
```
