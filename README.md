# AMU - Etihad Amu Web

Marketing site built with React, TypeScript, and Tailwind CSS. Dynamic content comes from an external **Django REST Framework** API (see `FRONTEND_API_README.md`). This repository contains **only the frontend** — there is no Node.js API server here.

## Project layout

```
Amu_Web-main/
├── src/                     # React + Vite application
├── public/
├── FRONTEND_API_README.md   # API contract consumed by this app
└── package.json
```

## Features

- Sections: hero, about, services, tech stack, projects, team, blog, contact  
- Project and blog detail routes  
- Framer Motion, i18n, SEO helpers (`react-helmet-async`)

## Stack

- **Frontend:** React 18, TypeScript, Vite, Tailwind CSS, React Router  
- **Backend:** **`https://api.etihadamu.com`** (`**/api/**`; **`VITE_DJANGO_ORIGIN`**). **Dev** uses Vite **`/api`** proxy → that host; **prod** calls the API URL directly. **`server.host: true`** on **5174**.

## Getting started

### 1. API & CORS

Production API host: **`https://api.etihadamu.com`** (see **`VITE_DJANGO_ORIGIN`**). The Django server must allow **`https://etihadamu.com`** and local dev origins (**`http://localhost:5174`**, etc.). Public site domain: **`src/config/site.ts`** / **`VITE_SITE_URL`**.

### 2. API URL

**`npm run dev`:** defaults to **`/api`** on the Vite host (same-origin). Vite proxies to **`VITE_DJANGO_ORIGIN`** (`https://api.etihadamu.com`). This avoids **CORS** errors when the SPA is on **`localhost:5174`**.

**Production build:** calls **`https://api.etihadamu.com/api/...`** unless you set **`VITE_API_BASE_URL`**. **`https://etihadamu.com`** must be allowed in Django **CORS** for the live API.

**Direct API in dev** (no proxy): set **`VITE_API_BASE_URL=https://api.etihadamu.com/api`** — your API must send **`Access-Control-Allow-Origin`** for `http://localhost:5174`.

Helpers: **`src/api/index.ts`**.

All JSON routes use Django-style trailing slashes; the client unwinds `{ success, data, message }`. Mutating calls send **`Authorization: Bearer …`** using the JWT stored after `adminLogin`.

### 3. Frontend dev server

```bash
npm install
npm run dev
```

Production bundle:

```bash
npm run build
npm run preview
```

## License

MIT
