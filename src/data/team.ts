export interface TeamMember {
  id: string
  name: string
  role: string
  image: string
  bio: string
  social: {
    linkedin?: string
    twitter?: string
    github?: string
  }
}

export const teamMembers: TeamMember[] = [
  {
    id: 'anosh-sharifi',
    name: 'Anosh Sharifi',
    role: 'CEO',
    image: 'https://amu.one/static/images/Anosh_sharifi.jpg',
    bio: 'Leads business strategy, oversees financial planning with the CFO, drives business growth, and represents the startup in all key negotiations.',
    social: { linkedin: 'https://www.linkedin.com/in/m-anosh-sharifi-696819397', github: 'https://github.com/Ansohsharifi' },
  },
  {
    id: 'latif-haqjou',
    name: 'Latif Haqjou',
    role: 'CTO',
    image: 'https://amu.one/static/images/Latif_haqjo.JPG',
    bio: 'Guides technical strategy, manages product development, ensures quality and security, and oversees the tech team.',
    social: { linkedin: 'https://www.linkedin.com/in/latif-haqjou-695354327', github: 'https://github.com/latifhaqjou' },
  },
  {
    id: 'abdulhabib-reshtin',
    name: 'Abdulhabib Reshtin',
    role: 'CFO',
    image: 'https://amu.one/static/images/Abdulhabeib.png',
    bio: 'Manages budgeting, financial reporting, fundraising documents, and financial risk control.',
    social: { linkedin: 'https://linkedin.com', github: 'https://github.com/habibshahreshtin98-hash' },
  },
  {
    id: 'satar-sharifi',
    name: 'Satar Sharifi',
    role: 'CPO',
    image: 'https://amu.one/static/images/satar_sharifi.jpg',
    bio: 'Leads product roadmap, user experience, feature design, and data-driven prioritization.',
    social: { linkedin: 'https://www.linkedin.com/in/abdulsatar-sharifi-46b7a8365', github: 'https://github.com/Satar-lab' },
  },
  {
    id: 'ziauddin-khaliqyar',
    name: 'Ziauddin Khaliqyar',
    role: 'CMO',
    image: 'https://amu.one/static/images/Zyauidin%20khaliqyar.jpg',
    bio: 'Develops marketing and branding strategies, manages social media, digital campaigns, and ensures message consistency.',
    social: { linkedin: 'https://www.linkedin.com/in/ziauddin-khaliqyar-b88664380', github: 'https://github.com/vipmb002-cod' },
  },
]
