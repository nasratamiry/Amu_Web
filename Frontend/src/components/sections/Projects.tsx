import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { fetchProjects } from '@/api'
import { projects as fallbackProjects } from '@/data/projects'
import { LazyImage } from '@/components/LazyImage'
import { useI18n } from '@/i18n/I18nContext'
import { getLocalized, type Project } from '@/api/types'

export function Projects() {
  const { t, path, locale } = useI18n()
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const loadProjects = () => {
    fetchProjects({ limit: 12 }).then(({ projects: data, error: err }) => {
      if (err) {
        setError(err)
        setProjects(fallbackProjects as Project[])
      } else {
        setError(null)
        setProjects(data)
      }
    }).finally(() => setLoading(false))
  }

  useEffect(() => {
    loadProjects()
  }, [])

  useEffect(() => {
    const onVisible = () => loadProjects()
    document.addEventListener('visibilitychange', onVisible)
    return () => document.removeEventListener('visibilitychange', onVisible)
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
                      {(project.category || getLocalized(project, 'category', locale)) && (
                        <span className="text-brand text-sm font-medium">
                          {getLocalized(project, 'category', locale) || project.category}
                        </span>
                      )}
                      <h3 className="mt-2 text-xl font-bold text-slate-900 group-hover:text-brand transition-colors">
                        {getLocalized(project, 'title', locale) || project.title}
                      </h3>
                      <p className="mt-3 text-slate-600 text-sm leading-relaxed line-clamp-2">
                        {getLocalized(project, 'description', locale) || project.description}
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
                  <div className="px-6 pb-6 pt-0 flex flex-col gap-3">
                    <Link
                      to={path(`/projects/${project.id}`)}
                      className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-brand text-white font-semibold text-sm hover:bg-brand-dark transition-colors"
                    >
                      {t.projects.viewProject}
                      <svg className="w-4 h-4 rtl:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </Link>
                    {(project.link || project.playStoreUrl || project.appStoreUrl) && (
                      <div className="flex flex-wrap gap-2">
                        {project.link && (
                          <a
                            href={project.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-1 min-w-[90px] flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-lg border border-gray-200 text-slate-700 font-medium text-xs hover:bg-slate-50 hover:border-brand/30 transition-colors"
                          >
                            <svg className="w-4 h-4 shrink-0 text-emerald-500" viewBox="0 0 24 24" fill="currentColor">
                              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
                            </svg>
                            <span className="truncate">{t.projects.website}</span>
                          </a>
                        )}
                        {project.playStoreUrl && (
                          <a
                            href={project.playStoreUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-1 min-w-[90px] flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-lg border border-gray-200 text-slate-700 font-medium text-xs hover:bg-slate-50 hover:border-brand/30 transition-colors"
                          >
                            <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
                              <path fill="#4285F4" d="M3.609 1.814L13.792 12 3.61 22.186a.996.996 0 0 1-.61-.92V2.734a1 1 0 0 1 .609-.92z" />
                              <path fill="#34A853" d="M16.955 12l3.612-3.612-9.062-9.062L6.544 10.5l10.411 1.5z" />
                              <path fill="#FBBC05" d="M16.955 12l-10.411 1.5 3.661 9.75 5.751-5.25L20.567 15.5z" />
                              <path fill="#EA4335" d="M13.792 12l-7.248-1.5-3.661 9.75 5.751 5.25 5.158-13.5z" />
                            </svg>
                            <span className="truncate">{t.projects.playStore}</span>
                          </a>
                        )}
                        {project.appStoreUrl && (
                          <a
                            href={project.appStoreUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-1 min-w-[90px] flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-lg border border-gray-200 text-slate-700 font-medium text-xs hover:bg-slate-50 hover:border-brand/30 transition-colors"
                          >
                            <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
                              <path fill="#007AFF" d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                            </svg>
                            <span className="truncate">{t.projects.appStore}</span>
                          </a>
                        )}
                      </div>
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
                <svg className="w-4 h-4 rtl:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
