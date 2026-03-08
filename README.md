# AMU - Startup Website

A modern, fully responsive startup website built with React, TypeScript, and TailwindCSS. Features smooth animations with Framer Motion, optimized images with lazy loading, and SEO best practices.

## Features

- **Hero Section** - Company slogan and call-to-action
- **About Section** - Company story and mission
- **Services Section** - 5 key services with icons
- **Technologies Section** - Tech stack display
- **Projects Section** - Project cards with detail pages
- **Team Section** - Team members with photos and social links
- **Blog/News Section** - Blog posts with detail pages
- **Contact Section** - Contact form and company info
- **Navbar & Footer** - Consistent across all pages
- **Framer Motion** - Smooth animations and transitions
- **Lazy Loading** - Optimized image loading
- **SEO Optimized** - Meta tags, Open Graph, structured content

## Tech Stack

- React 18
- TypeScript
- Vite
- TailwindCSS
- React Router
- Framer Motion
- React Helmet Async (SEO)

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm preview
```

### Project Structure

```
src/
├── components/
│   ├── Navbar.tsx
│   ├── Footer.tsx
│   ├── LazyImage.tsx      # Lazy-loaded image component
│   └── sections/
│       ├── Hero.tsx
│       ├── About.tsx
│       ├── Services.tsx
│       ├── Technologies.tsx
│       ├── Projects.tsx
│       ├── Team.tsx
│       ├── Blog.tsx
│       └── Contact.tsx
├── data/
│   ├── services.ts
│   ├── technologies.ts
│   ├── projects.ts
│   ├── team.ts
│   └── blog.ts
├── pages/
│   ├── HomePage.tsx
│   ├── ProjectDetailPage.tsx
│   └── BlogPostPage.tsx
├── App.tsx
├── main.tsx
└── index.css
```

## Customization

- **Content**: Edit files in `src/data/` to update services, projects, team, and blog content
- **Styling**: Modify `tailwind.config.js` for theme colors and `src/index.css` for global styles
- **SEO**: Update meta tags in each page's Helmet component and `index.html`

## License

MIT
