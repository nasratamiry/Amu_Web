export interface Technology {
  name: string
  category: string
  icon: string
}

export const technologies: Technology[] = [
  { name: 'React.js', category: 'Frontend', icon: 'react' },
  { name: 'Flutter', category: 'Mobile', icon: 'flutter' },
  { name: 'Node.js', category: 'Backend', icon: 'nodedotjs' },
  { name: 'Python', category: 'Language', icon: 'python' },
  { name: 'FastAPI', category: 'Backend', icon: 'fastapi' },
  { name: 'TypeScript', category: 'Language', icon: 'typescript' },
  { name: 'PostgreSQL', category: 'Database', icon: 'postgresql' },
  { name: 'MongoDB', category: 'Database', icon: 'mongodb' },
  { name: 'Docker', category: 'DevOps', icon: 'docker' },
  { name: 'Kubernetes', category: 'DevOps', icon: 'kubernetes' },
  { name: 'MySQL', category: 'Database', icon: 'mysql' },
  { name: 'Redis', category: 'Database', icon: 'redis' },
  { name: 'N8N', category: 'Automation', icon: 'n8n' },
  { name: 'Blockchain', category: 'Web3', icon: 'blockchaindotcom' },
]
