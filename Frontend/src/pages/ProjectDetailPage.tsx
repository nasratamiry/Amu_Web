import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import { fetchProjectById } from '@/api'
import { projects as fallbackProjects } from '@/data/projects'
import { LazyImage } from '@/components/LazyImage'
import { useI18n } from '@/i18n/I18nContext'
import { getLocalized, type Project } from '@/api/types'

export function ProjectDetailPage() {
  const { id } = useParams<{ id: string }>()
  const { t, path, locale } = useI18n()
  const [project, setProject] = useState<Project | null>(null)
  const [loading, setLoading] = useState(true)
  const [notFound, setNotFound] = useState(false)

  useEffect(() => {
    if (!id) {
      setNotFound(true)
      setLoading(false)
      return
    }
    fetchProjectById(id)
      .then(({ project: data, error }) => {
        if (error || !data) {
          const fallback = fallbackProjects.find((p) => p.id === id)
          if (fallback) {
            setProject({
              id: fallback.id,
              title: fallback.title,
              description: fallback.description,
              category: fallback.category,
              image: fallback.image,
              technologies: fallback.technologies,
              year: fallback.year,
            })
          } else {
            setNotFound(true)
          }
        } else {
          setProject(data)
        }
      })
      .finally(() => setLoading(false))
  }, [id])

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center pt-24">
        <div className="animate-pulse w-full max-w-4xl mx-auto px-4">
          <div className="h-12 w-48 bg-slate-200 rounded mb-8" />
          <div className="aspect-video bg-slate-200 rounded-2xl mb-8" />
          <div className="h-8 w-3/4 bg-slate-200 rounded mb-4" />
          <div className="h-4 w-full bg-slate-200 rounded" />
        </div>
      </div>
    )
  }

  if (notFound || !project) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center pt-24">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-slate-900">{t.common.notFound}</h1>
          <Link to={path('/')} className="mt-4 inline-block text-brand hover:text-brand-dark">
            {t.common.backHome}
          </Link>
        </div>
      </div>
    )
  }

  return (
    <>
      <Helmet>
        <title>{getLocalized(project, 'title', locale) || project.title} | Etihad Amu Projects</title>
        <meta name="description" content={getLocalized(project, 'description', locale) || project.description} />
      </Helmet>

      <div className="pt-24 lg:pt-32 pb-20 bg-white min-h-screen">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Link
              to={path('/projects')}
              className="inline-flex items-center gap-2 text-brand hover:text-brand-dark text-sm font-medium mb-8 transition-colors"
            >
              <svg className="w-4 h-4 rtl:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              {t.projects.backTo}
            </Link>

            <div className="aspect-video rounded-2xl overflow-hidden bg-slate-100 border border-slate-200 mb-8">
              <LazyImage
                src={project.image}
                alt={getLocalized(project, 'title', locale) || project.title}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="flex flex-wrap gap-3 mb-6">
              {(getLocalized(project, 'category', locale) || project.category) && (
                <span className="px-3 py-1 rounded-full bg-brand-soft text-brand text-sm font-medium">
                  {getLocalized(project, 'category', locale) || project.category}
                </span>
              )}
              {project.year && (
                <span className="px-3 py-1 rounded-full bg-slate-100 text-slate-600 text-sm">
                  {project.year}
                </span>
              )}
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 mb-6">
              {getLocalized(project, 'title', locale) || project.title}
            </h1>

            <p className="text-lg text-slate-600 leading-relaxed mb-8">
              {getLocalized(project, 'description', locale) || project.description}
            </p>

            {(project.link || project.playStoreUrl || project.appStoreUrl) && (
              <div className="mb-8 flex flex-wrap gap-2">
                {project.link && (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 min-w-[100px] inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl border border-slate-300 text-slate-700 font-medium text-sm hover:bg-slate-50 transition-colors"
                  >
                    <svg className="w-5 h-5 shrink-0 text-emerald-500" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
                    </svg>
                    {t.projects.website}
                  </a>
                )}
                {project.playStoreUrl && (
                  <a
                    href={project.playStoreUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 min-w-[100px] inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl border border-slate-300 text-slate-700 font-medium text-sm hover:bg-slate-50 transition-colors"
                  >
                    <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24">
                      <path fill="#4285F4" d="M3.609 1.814L13.792 12 3.61 22.186a.996.996 0 0 1-.61-.92V2.734a1 1 0 0 1 .609-.92z" />
                      <path fill="#34A853" d="M16.955 12l3.612-3.612-9.062-9.062L6.544 10.5l10.411 1.5z" />
                      <path fill="#FBBC05" d="M16.955 12l-10.411 1.5 3.661 9.75 5.751-5.25L20.567 15.5z" />
                      <path fill="#EA4335" d="M13.792 12l-7.248-1.5-3.661 9.75 5.751 5.25 5.158-13.5z" />
                    </svg>
                    {t.projects.playStore}
                  </a>
                )}
                {project.appStoreUrl && (
                  <a
                    href={project.appStoreUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 min-w-[100px] inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl border border-slate-300 text-slate-700 font-medium text-sm hover:bg-slate-50 transition-colors"
                  >
                    <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24">
                      <path fill="#007AFF" d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                    </svg>
                    {t.projects.appStore}
                  </a>
                )}
              </div>
            )}

            {(project.technologies?.length ?? 0) > 0 && (
              <div>
                <h3 className="text-sm font-semibold text-slate-700 uppercase tracking-wider mb-3">
                  {t.projects.techUsed}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {project.technologies!.map((tech) => (
                    <span
                      key={tech}
                      className="px-4 py-2 rounded-lg bg-slate-100 border border-slate-200 text-slate-700 text-sm"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <div className="mt-12 p-6 rounded-2xl bg-brand-soft border border-brand/20">
              <h3 className="text-lg font-semibold text-slate-900 mb-4">{t.projects.aboutProject}</h3>
              <p className="text-slate-600 leading-relaxed">{t.projects.aboutText}</p>
            </div>

            <div className="mt-12">
              <Link
                to={path('/contact')}
                className="inline-flex items-center gap-2 px-6 py-3 bg-brand rounded-xl font-semibold text-white hover:bg-brand-dark transition-colors"
              >
                {t.projects.similarProject}
                <svg className="w-4 h-4 rtl:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  )
}
