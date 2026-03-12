import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import { fetchBlogPostBySlug } from '@/api'
import { blogPosts as fallbackPosts } from '@/data/blog'
import { LazyImage } from '@/components/LazyImage'
import { useI18n } from '@/i18n/I18nContext'
import type { BlogPost } from '@/api/types'

export function BlogPostPage() {
  const { slug } = useParams<{ slug: string }>()
  const { t, path } = useI18n()
  const [post, setPost] = useState<BlogPost | null>(null)
  const [loading, setLoading] = useState(true)
  const [notFound, setNotFound] = useState(false)

  useEffect(() => {
    if (!slug) {
      setNotFound(true)
      setLoading(false)
      return
    }
    fetchBlogPostBySlug(slug)
      .then(({ post: data, error }) => {
        if (error || !data) {
          const fallback = fallbackPosts.find((p) => p.slug === slug)
          if (fallback) {
            setPost({
              id: fallback.id,
              slug: fallback.slug,
              title: fallback.title,
              excerpt: fallback.excerpt,
              content: fallback.content,
              image: fallback.image,
              author: fallback.author,
              date: fallback.date,
              readTime: fallback.readTime,
              category: fallback.category,
            })
          } else {
            setNotFound(true)
          }
        } else {
          setPost(data)
        }
      })
      .finally(() => setLoading(false))
  }, [slug])

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center pt-24">
        <div className="animate-pulse w-full max-w-3xl mx-auto px-4">
          <div className="h-12 w-48 bg-slate-200 rounded mb-8" />
          <div className="aspect-video bg-slate-200 rounded-2xl mb-8" />
          <div className="h-8 w-3/4 bg-slate-200 rounded mb-4" />
          <div className="h-4 w-full bg-slate-200 rounded" />
        </div>
      </div>
    )
  }

  if (notFound || !post) {
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
        <meta name="description" content={post.excerpt || post.title} />
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
              {post.readTime && (
                <>
                  <span>•</span>
                  <span>{post.readTime}</span>
                </>
              )}
              {post.category && (
                <>
                  <span>•</span>
                  <span className="text-brand">{post.category}</span>
                </>
              )}
              {post.author && (
                <>
                  <span>•</span>
                  <span>
                    {t.blog.by} {post.author}
                  </span>
                </>
              )}
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
