import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { projects } from '@/data/projects'
import { LazyImage } from '@/components/LazyImage'
import { useI18n } from '@/i18n/I18nContext'

export function Projects() {
  const { t, path } = useI18n()

  return (
    <section className="py-20 lg:py-32 bg-brand-soft">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto"
        >
          <span className="text-brand font-semibold text-sm uppercase tracking-wider">{t.projects.label}</span>
          <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900">
            {t.projects.title}
          </h2>
          <p className="mt-6 text-slate-600 text-lg">
            {t.projects.subtitle}
          </p>
        </motion.div>

        <div className="mt-16 grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Link to={path(`/projects/${project.id}`)} className="group block">
                <div className="relative aspect-video rounded-2xl overflow-hidden bg-white border border-slate-200 shadow-sm group-hover:shadow-xl group-hover:border-brand transition-all duration-300">
                  <LazyImage
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <span className="text-brand-light text-sm font-medium">{project.category}</span>
                    <h3 className="mt-1 text-xl font-semibold text-white drop-shadow-lg">
                      {project.title}
                    </h3>
                  </div>
                  <div className="absolute top-4 right-4 rtl:right-auto rtl:left-4 px-3 py-1 rounded-full bg-white/90 text-slate-700 text-xs font-medium">
                    {project.year}
                  </div>
                </div>
                <p className="mt-4 text-slate-600 text-sm line-clamp-2">{project.description}</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {project.technologies.slice(0, 3).map((tech) => (
                    <span key={tech} className="text-xs text-slate-500">
                      {tech}
                    </span>
                  ))}
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <Link
            to={path('/projects')}
            className="inline-flex items-center gap-2 text-brand hover:text-brand-dark font-medium transition-colors"
          >
            {t.projects.viewAll}
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
