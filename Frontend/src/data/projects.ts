export interface Project {
  id: string
  title: string
  description: string
  category: string
  image: string
  technologies: string[]
  year: string
  link?: string
}

export const projects: Project[] = [
  {
    id: 'aprcrail',
    title: 'APRCrail.com',
    description: 'Multilingual enterprise platform for rail and logistics operations.',
    category: 'Logistics',
    image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&q=80',
    technologies: ['React', 'Node.js', 'PostgreSQL'],
    year: '2024',
  },
  {
    id: 'amupay',
    title: 'AmuPay',
    description: 'Fintech platform for payments and financial services.',
    category: 'FinTech',
    image: 'https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?w=800&q=80',
    technologies: ['React', 'Node.js', 'PostgreSQL', 'Redis'],
    year: '2024',
  },
  {
    id: 'business-automation',
    title: 'Business Automation System',
    description: 'Enterprise business process automation for large organizations.',
    category: 'Enterprise',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80',
    technologies: ['React', 'Python', 'PostgreSQL', 'AWS'],
    year: '2024',
  },
]
