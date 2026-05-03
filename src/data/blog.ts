export interface BlogPost {
  id: string
  slug: string
  title: string
  excerpt: string
  content: string
  image: string
  author: string
  date: string
  readTime: string
  category: string
}

export const blogPosts: BlogPost[] = [
  {
    id: '1',
    slug: 'future-of-web-development-2024',
    title: 'The Future of Web Development in 2024',
    excerpt: 'Exploring emerging trends and technologies that will shape the web development landscape this year.',
    content: `The web development industry continues to evolve at a rapid pace. In 2024, we're seeing several key trends emerge that will define how we build and deliver web applications.

First, the rise of AI-assisted development is transforming how developers write code. Tools like GitHub Copilot and Cursor are becoming indispensable, helping developers write more efficiently while maintaining quality.

Second, edge computing is bringing applications closer to users. With services like Cloudflare Workers and Vercel Edge Functions, we can now run logic at the edge for faster response times and better user experiences.

Third, the component-driven approach continues to dominate. React, Vue, and Svelte are all pushing the boundaries of what's possible with component architecture, making it easier to build complex, maintainable applications.

As we look ahead, the focus remains on performance, accessibility, and developer experience. The best teams will be those that can adapt quickly and leverage these new tools effectively.`,
    image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&q=80',
    author: 'David Park',
    date: '2024-03-01',
    readTime: '5 min read',
    category: 'Technology',
  },
  {
    id: '2',
    slug: 'building-scalable-systems',
    title: 'Building Scalable Systems: Lessons Learned',
    excerpt: 'Key insights from building systems that handle millions of users without breaking a sweat.',
    content: `Scalability isn't just about handling more users—it's about designing systems that can grow gracefully. Over the years, we've learned several critical lessons.

Start with observability. You can't optimize what you can't measure. Implement comprehensive logging, metrics, and tracing from day one. Tools like Prometheus, Grafana, and distributed tracing give you the visibility needed to understand system behavior.

Embrace eventual consistency where appropriate. Not every operation needs to be strongly consistent. Understanding your consistency requirements allows you to choose the right database and architecture.

Design for failure. Systems will fail; the key is failing gracefully. Implement circuit breakers, retries with exponential backoff, and graceful degradation. Your users will thank you when things go wrong.`,
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&q=80',
    author: 'Marcus Johnson',
    date: '2024-02-15',
    readTime: '7 min read',
    category: 'Engineering',
  },
  {
    id: '3',
    slug: 'design-systems-that-scale',
    title: 'Design Systems That Scale',
    excerpt: 'Creating consistent, maintainable design systems for growing product teams.',
    content: `A design system is more than a collection of components—it's a shared language that enables teams to build cohesive experiences at scale.

Documentation is everything. Your design system is only as good as its documentation. Use tools like Storybook to create living documentation that stays in sync with your code. Include usage guidelines, accessibility notes, and real-world examples.

Think in tokens. Design tokens (colors, spacing, typography) create the foundation. By defining these systematically, you enable consistency and make theming straightforward. When a brand evolves, you update tokens, not hundreds of components.

Foster adoption through contribution. The best design systems are built by the teams that use them. Create clear contribution guidelines, review processes, and make it easy for anyone to suggest improvements.`,
    image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&q=80',
    author: 'Elena Rodriguez',
    date: '2024-02-01',
    readTime: '6 min read',
    category: 'Design',
  },
]
