import { useParams, Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import { blogPosts } from '@/data/blog'
import { LazyImage } from '@/components/LazyImage'
import { useI18n } from '@/i18n/I18nContext'

export function BlogPostPage() {
  const { slug } = useParams<{ slug: string }>()
  const { t, path } = useI18n()
  const post = blogPosts.find((p) => p.slug === slug)

  if (!post) {
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
        <title>{post.title} | Etihad Amu Blog</title>
        <meta name="description" content={post.excerpt} />
      </Helmet>

      <article className="pt-24 lg:pt-32 pb-20 bg-white min-h-screen">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Link
              to={path('/blog')}
              className="inline-flex items-center gap-2 text-brand hover:text-brand-dark text-sm font-medium mb-8 transition-colors"
            >
              <svg className="w-4 h-4 rtl:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              {t.blog.backTo}
            </Link>

            <div className="aspect-video rounded-2xl overflow-hidden bg-slate-100 border border-slate-200 mb-8">
              <LazyImage
                src={post.image}
                alt={post.title}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="flex flex-wrap gap-4 text-sm text-slate-500 mb-6">
              <span>{post.date}</span>
              <span>•</span>
              <span>{post.readTime}</span>
              <span>•</span>
              <span className="text-brand">{post.category}</span>
              <span>•</span>
              <span>{t.blog.by} {post.author}</span>
            </div>

            <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-6 leading-tight">
              {post.title}
            </h1>

            <div className="prose prose-slate max-w-none">
              <div className="text-slate-600 leading-relaxed space-y-4 whitespace-pre-line">
                {post.content}
              </div>
            </div>

            <div className="mt-12 pt-8 border-t border-slate-200">
              <Link
                to={path('/blog')}
                className="inline-flex items-center gap-2 text-brand hover:text-brand-dark font-medium transition-colors"
              >
                <svg className="w-4 h-4 rtl:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                {t.blog.backTo}
              </Link>
            </div>
          </motion.div>
        </div>
      </article>
    </>
  )
}
