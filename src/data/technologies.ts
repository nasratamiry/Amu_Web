export interface Technology {
  slug: string
  name: string
  category: string
  icon: string
}

export const technologies: Technology[] = [
  { slug: 'react', name: 'React.js', category: 'Frontend', icon: 'react' },
  { slug: 'flutter', name: 'Flutter', category: 'Mobile', icon: 'flutter' },
  { slug: 'django', name: 'Django', category: 'Backend', icon: 'django' },
  { slug: 'python', name: 'Python', category: 'Language', icon: 'python' },
  { slug: 'typescript', name: 'TypeScript', category: 'Language', icon: 'typescript' },
  { slug: 'postgresql', name: 'PostgreSQL', category: 'Database', icon: 'postgresql' },
  { slug: 'docker', name: 'Docker', category: 'DevOps', icon: 'docker' },
  { slug: 'kubernetes', name: 'Kubernetes', category: 'DevOps', icon: 'kubernetes' },
  { slug: 'mysql', name: 'MySQL', category: 'Database', icon: 'mysql' },
  { slug: 'redis', name: 'Redis', category: 'Database', icon: 'redis' },
  { slug: 'n8n', name: 'N8N', category: 'Automation', icon: 'n8n' },
  { slug: 'ai', name: 'AI', category: 'AI', icon: '/ai-icon.png' },
  { slug: 'blockchain', name: 'Blockchain', category: 'Web3', icon: 'blockchaindotcom' },
]
