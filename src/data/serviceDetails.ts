/** Long-form copy for service detail pages (aligned with etihadamu.com). */
export const serviceDetailsById: Record<
  string,
  { fullDesc: string; highlights: string[] }
> = {
  'custom-software': {
    fullDesc:
      'Our custom software development approach combines deep domain expertise with modern engineering practices. We work closely with your team to understand workflows, pain points, and growth objectives—then design and build solutions that fit your exact needs. Whether you need a standalone application or integration with existing systems, we deliver production-ready software that drives measurable business outcomes.',
    highlights: [
      'Requirements analysis and technical specification',
      'Agile development with iterative feedback',
      'Full-stack development (web, mobile, APIs)',
      'Integration with legacy and third-party systems',
      'Ongoing support and maintenance',
    ],
  },
  'enterprise-apps': {
    fullDesc:
      'Enterprise applications demand reliability, security, and scalability. We design and build mission-critical systems that handle complex workflows, multiple user roles, and large volumes of data. Our solutions integrate with your existing ERP, CRM, and internal tools while providing a unified user experience.',
    highlights: [
      'ERP and business process automation',
      'Multi-tenant and role-based access',
      'Database design and optimization',
      'Real-time reporting and dashboards',
      'Compliance and audit trails',
    ],
  },
  'saas-platforms': {
    fullDesc:
      'We build SaaS products that are ready to compete in today\'s market. From subscription billing and usage metering to tenant isolation and white-labeling, we implement the infrastructure that scales with your user base. Our cloud-native architecture ensures high availability and cost efficiency.',
    highlights: [
      'Subscription and billing management',
      'Multi-tenant architecture',
      'Analytics and usage dashboards',
      'REST and GraphQL APIs',
      'White-label and customization',
    ],
  },
  'software-architecture': {
    fullDesc:
      'Great architecture is the foundation of scalable software. Our architects evaluate your current systems, business goals, and future requirements to design solutions that avoid technical debt and support growth. We apply patterns such as microservices, event sourcing, and CQRS where they add value.',
    highlights: [
      'System and data architecture design',
      'Microservices and service mesh',
      'Event-driven and message queues',
      'API design and governance',
      'Performance and scalability analysis',
    ],
  },
  modernization: {
    fullDesc:
      'Legacy systems often hold critical business logic but become bottlenecks for innovation. We help you modernize incrementally: refactoring monoliths, extracting services, migrating to the cloud, and improving performance—all while keeping your business running. Our approach minimizes risk and maximizes ROI.',
    highlights: [
      'Legacy code refactoring',
      'Monolith to microservices migration',
      'Cloud migration (AWS, GCP, Azure)',
      'Performance optimization',
      'Technical debt assessment',
    ],
  },
}
