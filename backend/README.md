# Amu Web Backend

Node.js + TypeScript + Express + MongoDB backend for the Etihad Amu website.

## Setup

1. Install dependencies:
   ```bash
   cd backend
   npm install
   ```

2. Copy environment file:
   ```bash
   cp .env.example .env
   ```

3. Configure `.env`:
   - Set `MONGODB_URI` to your MongoDB connection string
   - Set `CORS_ORIGINS` for allowed frontend domains

4. Run development server:
   ```bash
   npm run dev
   ```

## Scripts

- `npm run dev` - Start with hot reload (tsx watch)
- `npm run build` - Compile TypeScript
- `npm start` - Run compiled output
- `npm run lint` - Run ESLint
- `npm run format` - Format with Prettier

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/health | Health check |
| GET | /api/projects | List projects (pagination, search) |
| GET | /api/projects/:id | Get single project |
| POST | /api/projects | Create project |
| PUT | /api/projects/:id | Update project |
| DELETE | /api/projects/:id | Delete project |
| GET | /api/team | List team members |
| GET | /api/team/:id | Get single member |
| POST | /api/team | Create member |
| PUT | /api/team/:id | Update member |
| DELETE | /api/team/:id | Delete member |
| GET | /api/blog | List posts (pagination) |
| GET | /api/blog/slug/:slug | Get post by slug |
| GET | /api/blog/:id | Get single post |
| POST | /api/blog | Create post |
| PUT | /api/blog/:id | Update post |
| DELETE | /api/blog/:id | Delete post |
| POST | /api/contact | Submit contact message |

## Project Structure

```
backend/
├── src/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── validations/
│   └── index.ts
├── .env.example
├── package.json
├── tsconfig.json
└── README.md
```
