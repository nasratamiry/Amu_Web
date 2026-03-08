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
            <div className="animate-pulse flex flex-col gap-4 w-full max-w-4xl">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="h-64 rounded-2xl bg-slate-200" />
                ))}
              </div>
            </div>
          </div>
        ) : (
          <>
            {error && (
              <p className="mt-6 text-center text-amber-600 text-sm">
                {t.contact.error} ({error})
              </p>
            )}
            <div className="mt-20 grid md:grid-cols-2 lg:grid-cols-3 gap-10">
              {projects.map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -4 }}
                >
                  <Link to={path(`/projects/${project.id}`)} className="group block">
                    <div className="relative aspect-[16/10] rounded-2xl overflow-hidden bg-white border border-slate-200 shadow-soft group-hover:shadow-xl group-hover:border-brand/30 transition-all duration-300">
                      <LazyImage
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/30 to-transparent" />
                      <div className="absolute bottom-0 left-0 right-0 p-6">
                        <span className="text-brand-light text-sm font-medium">
                          {project.category || ''}
                        </span>
                        <h3 className="mt-1 text-xl font-bold text-white drop-shadow-lg">
                          {project.title}
                        </h3>
                      </div>
                      <div className="absolute top-4 right-4 rtl:right-auto rtl:left-4 px-3 py-1.5 rounded-full bg-white/95 text-slate-700 text-xs font-semibold">
                        {project.year || ''}
                      </div>
                    </div>
                    <p className="mt-5 text-slate-600 leading-relaxed line-clamp-2">
                      {project.description}
                    </p>
                    <div className="mt-4 flex items-center justify-between gap-4">
                      <div className="flex flex-wrap gap-2">
                        {(project.technologies ?? []).slice(0, 3).map((tech) => (
                          <span key={tech} className="text-xs text-slate-500 font-medium">
                            {tech}
                          </span>
                        ))}
                      </div>
                      <span className="inline-flex items-center gap-1.5 text-brand font-semibold text-sm group-hover:text-brand-dark transition-colors shrink-0">
                        {t.projects.viewProject}
                        <svg className="w-4 h-4 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </span>
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
          </>
        )}
      </div>
    </section>
  )
}
