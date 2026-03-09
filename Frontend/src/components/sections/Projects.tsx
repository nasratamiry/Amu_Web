import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { fetchProjects } from '@/api'
import { projects as fallbackProjects } from '@/data/projects'
import { LazyImage } from '@/components/LazyImage'
import { useI18n } from '@/i18n/I18nContext'
import type { Project } from '@/api/types'

export function Projects() {
  const { t, path } = useI18n()
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchProjects({ limit: 12 })
      .then(({ projects: data, error: err }) => {
        if (err) {
          setError(err)
          setProjects(fallbackProjects as Project[])
        } else {
          setProjects(data)
        }
      })
      .finally(() => setLoading(false))
  }, [])

  return (
    <section className="py-24 lg:py-32 bg-brand-soft">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto"
        >
          <span className="text-brand font-semibold text-sm uppercase tracking-wider">
            {t.projects.label}
          </span>
          <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900">
            {t.projects.title}
          </h2>
          <p className="mt-6 text-slate-600 text-lg">
            {t.projects.subtitle}
          </p>
        </motion.div>

        {loading ? (
          <div className="mt-20 flex justify-center items-center min-h-[200px]">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full">
              {[1, 2, 3].map((i) => (
                <div key={i} className="rounded-2xl border border-gray-200 bg-white shadow-md overflow-hidden">
                  <div className="aspect-[16/10] bg-slate-200" />
                  <div className="p-6 space-y-4">
                    <div className="h-4 w-1/3 bg-slate-200 rounded" />
                    <div className="h-6 w-2/3 bg-slate-200 rounded" />
                    <div className="h-3 w-full bg-slate-200 rounded" />
                    <div className="h-3 w-3/4 bg-slate-200 rounded" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <>
            {error && (
              <p className="mt-6 text-center text-amber-600 text-sm">
                {t.contact.error} ({error})
              </p>
            )}
            <div className="mt-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="group rounded-2xl border border-gray-200 bg-white shadow-md hover:shadow-xl hover:-translate-y-2 transition-all duration-300 overflow-hidden flex flex-col"
                >
                  <Link to={path(`/projects/${project.id}`)} className="flex flex-col flex-1">
                    <div className="relative aspect-[16/10] overflow-hidden">
                      <LazyImage
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover rounded-t-2xl group-hover:scale-105 transition-transform duration-300"
                      />
                      {project.year && (
                        <span className="absolute top-3 right-3 rtl:right-auto rtl:left-3 px-3 py-1 rounded-lg bg-white/95 text-slate-700 text-xs font-semibold shadow-sm">
                          {project.year}
                        </span>
                      )}
                    </div>
                    <div className="p-6 flex flex-col flex-1">
                      {project.category && (
                        <span className="text-brand text-sm font-medium">
                          {project.category}
                        </span>
                      )}
                      <h3 className="mt-2 text-xl font-bold text-slate-900 group-hover:text-brand transition-colors">
                        {project.title}
                      </h3>
                      <p className="mt-3 text-slate-600 text-sm leading-relaxed line-clamp-2">
                        {project.description}
                      </p>
                      <div className="mt-4 flex flex-wrap gap-2">
                        {(project.technologies ?? []).slice(0, 4).map((tech) => (
                          <span
                            key={tech}
                            className="px-2.5 py-1 rounded-lg bg-slate-100 text-slate-600 text-xs font-medium"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </Link>
                  <div className="px-6 pb-6 pt-0 flex gap-3">
                    <Link
                      to={path(`/projects/${project.id}`)}
                      className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-brand text-white font-semibold text-sm hover:bg-brand-dark transition-colors"
                    >
                      {t.projects.viewProject}
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </Link>
                    {project.link && (
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl border border-gray-200 text-slate-700 font-semibold text-sm hover:bg-slate-50 hover:border-brand/30 transition-colors"
                      >
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                        </svg>
                        GitHub
                      </a>
                    )}
                  </div>
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
          </>
        )}
      </div>
    </section>
  )
}
