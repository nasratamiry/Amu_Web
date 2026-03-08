import mongoose from 'mongoose'
import dotenv from 'dotenv'
import { Project } from './models/Project'
import { TeamMember } from './models/Team'
import { BlogPost } from './models/Blog'
import { Admin } from './models/Admin'

dotenv.config()

const projects = [
  {
    title: 'APRCrail.com',
    description: 'Multilingual enterprise platform for rail and logistics operations.',
    category: 'Logistics',
    image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&q=80',
    technologies: ['React', 'Node.js', 'PostgreSQL'],
    year: '2024',
  },
  {
    title: 'AmuPay',
    description: 'Fintech platform for payments and financial services.',
    category: 'FinTech',
    image: 'https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?w=800&q=80',
    technologies: ['React', 'Node.js', 'PostgreSQL', 'Redis'],
    year: '2024',
  },
  {
    title: 'Business Automation System',
    description: 'Enterprise business process automation for large organizations.',
    category: 'Enterprise',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80',
    technologies: ['React', 'Python', 'PostgreSQL', 'AWS'],
    year: '2024',
  },
]

const teamMembers = [
  {
    name: 'Anosh Sharifi',
    role: 'CEO',
    photo: 'https://amu.one/static/images/Anosh_sharifi.jpg',
    bio: 'Leads business strategy, oversees financial planning with the CFO, drives business growth, and represents the startup in all key negotiations.',
    socialLinks: {
      linkedin: 'https://www.linkedin.com/in/m-anosh-sharifi-696819397',
      github: 'https://github.com/Ansohsharifi',
    },
  },
  {
    name: 'Latif Haqjou',
    role: 'CTO',
    photo: 'https://amu.one/static/images/Latif_haqjo.JPG',
    bio: 'Guides technical strategy, manages product development, ensures quality and security, and oversees the tech team.',
    socialLinks: {
      linkedin: 'https://www.linkedin.com/in/latif-haqjou-695354327',
      github: 'https://github.com/latifhaqjou',
    },
  },
  {
    name: 'Abdulhabib Reshtin',
    role: 'CFO',
    photo: 'https://amu.one/static/images/Abdulhabeib.png',
    bio: 'Manages budgeting, financial reporting, fundraising documents, and financial risk control.',
    socialLinks: {
      linkedin: 'https://linkedin.com',
      github: 'https://github.com/habibshahreshtin98-hash',
    },
  },
  {
    name: 'Satar Sharifi',
    role: 'CPO',
    photo: 'https://amu.one/static/images/satar_sharifi.jpg',
    bio: 'Leads product roadmap, user experience, feature design, and data-driven prioritization.',
    socialLinks: {
      linkedin: 'https://www.linkedin.com/in/abdulsatar-sharifi-46b7a8365',
      github: 'https://github.com/Satar-lab',
    },
  },
  {
    name: 'Ziauddin Khaliqyar',
    role: 'CMO',
    photo: 'https://amu.one/static/images/Zyauidin%20khaliqyar.jpg',
    bio: 'Develops marketing and branding strategies, manages social media, digital campaigns, and ensures message consistency.',
    socialLinks: {
      linkedin: 'https://www.linkedin.com/in/ziauddin-khaliqyar-b88664380',
      github: 'https://github.com/vipmb002-cod',
    },
  },
]

const blogPosts = [
  {
    title: 'The Future of Web Development in 2024',
    slug: 'future-of-web-development-2024',
    excerpt: "Exploring emerging trends and technologies that will shape the web development landscape this year.",
    content: `The web development industry continues to evolve at a rapid pace. In 2024, we're seeing several key trends emerge that will define how we build and deliver web applications.

First, the rise of AI-assisted development is transforming how developers write code. Tools like GitHub Copilot and Cursor are becoming indispensable, helping developers write more efficiently while maintaining quality.

Second, edge computing is bringing applications closer to users. With services like Cloudflare Workers and Vercel Edge Functions, we can now run logic at the edge for faster response times and better user experiences.

Third, the component-driven approach continues to dominate. React, Vue, and Svelte are all pushing the boundaries of what's possible with component architecture, making it easier to build complex, maintainable applications.

As we look ahead, the focus remains on performance, accessibility, and developer experience. The best teams will be those that can adapt quickly and leverage these new tools effectively.`,
    image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&q=80',
    author: 'David Park',
    date: new Date('2024-03-01'),
    readTime: '5 min read',
    category: 'Technology',
  },
  {
    title: 'Building Scalable Systems: Lessons Learned',
    slug: 'building-scalable-systems',
    excerpt: 'Key insights from building systems that handle millions of users without breaking a sweat.',
    content: `Scalability isn't just about handling more users—it's about designing systems that can grow gracefully. Over the years, we've learned several critical lessons.

Start with observability. You can't optimize what you can't measure. Implement comprehensive logging, metrics, and tracing from day one. Tools like Prometheus, Grafana, and distributed tracing give you the visibility needed to understand system behavior.

Embrace eventual consistency where appropriate. Not every operation needs to be strongly consistent. Understanding your consistency requirements allows you to choose the right database and architecture.

Design for failure. Systems will fail; the key is failing gracefully. Implement circuit breakers, retries with exponential backoff, and graceful degradation. Your users will thank you when things go wrong.`,
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&q=80',
    author: 'Marcus Johnson',
    date: new Date('2024-02-15'),
    readTime: '7 min read',
    category: 'Engineering',
  },
  {
    title: 'Design Systems That Scale',
    slug: 'design-systems-that-scale',
    excerpt: 'Creating consistent, maintainable design systems for growing product teams.',
    content: `A design system is more than a collection of components—it's a shared language that enables teams to build cohesive experiences at scale.

Documentation is everything. Your design system is only as good as its documentation. Use tools like Storybook to create living documentation that stays in sync with your code. Include usage guidelines, accessibility notes, and real-world examples.

Think in tokens. Design tokens (colors, spacing, typography) create the foundation. By defining these systematically, you enable consistency and make theming straightforward. When a brand evolves, you update tokens, not hundreds of components.

Foster adoption through contribution. The best design systems are built by the teams that use them. Create clear contribution guidelines, review processes, and make it easy for anyone to suggest improvements.`,
    image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&q=80',
    author: 'Elena Rodriguez',
    date: new Date('2024-02-01'),
    readTime: '6 min read',
    category: 'Design',
  },
]

async function seed() {
  const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/amu_web'
  await mongoose.connect(uri)
  console.log('✅ Connected to MongoDB')

  const admins = [
    { email: process.env.ADMIN_EMAIL || 'admin@amu.one', password: process.env.ADMIN_PASSWORD || 'Admin@123' },
    { email: 'nasratamiry93@gmail.com', password: '@Mazar2020' },
  ]
  for (const { email, password } of admins) {
    let admin = await Admin.findOne({ email })
    if (!admin) {
      admin = await Admin.create({ email, password })
      console.log(`✅ Created admin: ${email}`)
    } else {
      console.log(`✅ Admin exists: ${email}`)
    }
  }

  await Project.deleteMany({})
  await Project.insertMany(projects)
  console.log(`✅ Seeded ${projects.length} projects`)

  await TeamMember.deleteMany({})
  await TeamMember.insertMany(teamMembers)
  console.log(`✅ Seeded ${teamMembers.length} team members`)

  await BlogPost.deleteMany({})
  await BlogPost.insertMany(blogPosts)
  console.log(`✅ Seeded ${blogPosts.length} blog posts`)

  await mongoose.disconnect()
  console.log('✅ Done')
  process.exit(0)
}

seed().catch((err) => {
  console.error('❌ Seed failed:', err.message)
  process.exit(1)
})
