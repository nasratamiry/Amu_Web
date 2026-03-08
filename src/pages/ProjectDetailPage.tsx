import { useParams, Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import { projects } from '@/data/projects'
import { LazyImage } from '@/components/LazyImage'
import { useI18n } from '@/i18n/I18nContext'

export function ProjectDetailPage() {
  const { id } = useParams<{ id: string }>()
  const { t, path } = useI18n()
  const project = projects.find((p) => p.id === id)

  if (!project) {
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
        <title>{project.title} | Etihad Amu Projects</title>
        <meta name="description" content={project.description} />
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
                alt={project.title}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="flex flex-wrap gap-3 mb-6">
              <span className="px-3 py-1 rounded-full bg-brand-soft text-brand text-sm font-medium">
                {project.category}
              </span>
              <span className="px-3 py-1 rounded-full bg-slate-100 text-slate-600 text-sm">
                {project.year}
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 mb-6">
              {project.title}
            </h1>

            <p className="text-lg text-slate-600 leading-relaxed mb-8">
              {project.description}
            </p>

            <div>
              <h3 className="text-sm font-semibold text-slate-700 uppercase tracking-wider mb-3">{t.projects.techUsed}</h3>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="px-4 py-2 rounded-lg bg-slate-100 border border-slate-200 text-slate-700 text-sm"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-12 p-6 rounded-2xl bg-brand-soft border border-brand/20">
              <h3 className="text-lg font-semibold text-slate-900 mb-4">{t.projects.aboutProject}</h3>
              <p className="text-slate-600 leading-relaxed">
                {t.projects.aboutText}
              </p>
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
