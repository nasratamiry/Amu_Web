import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { fetchBlogPosts } from '@/api'
import { blogPosts as fallbackPosts } from '@/data/blog'
import { LazyImage } from '@/components/LazyImage'
import { useI18n } from '@/i18n/I18nContext'
import type { BlogPost } from '@/api/types'

export function Blog() {
  const { t, path } = useI18n()
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchBlogPosts({ limit: 9 })
      .then(({ posts: data, error: err }) => {
        if (err) {
          setError(err)
          setPosts(
            fallbackPosts.map((p) => ({
              id: p.id,
              slug: p.slug,
              title: p.title,
              excerpt: p.excerpt,
              content: p.content,
              image: p.image,
              author: p.author,
              date: p.date,
              readTime: p.readTime,
              category: p.category,
            }))
          )
        } else {
          setPosts(data)
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
            {t.blog.label}
          </span>
          <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900">
            {t.blog.title}
          </h2>
          <p className="mt-6 text-slate-600 text-lg">
            {t.blog.subtitle}
          </p>
        </motion.div>

        {loading ? (
          <div className="mt-16 flex justify-center items-center min-h-[300px]">
            <div className="animate-pulse grid md:grid-cols-2 lg:grid-cols-3 gap-8 w-full">
              {[1, 2, 3].map((i) => (
                <div key={i}>
                  <div className="aspect-video rounded-2xl bg-slate-200" />
                  <div className="mt-4 h-4 w-1/2 bg-slate-200 rounded" />
                  <div className="mt-2 h-3 w-full bg-slate-200 rounded" />
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
            <div className="mt-16 grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post, index) => (
                <motion.article
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -4 }}
                >
                  <Link to={path(`/blog/${post.slug}`)} className="group block">
                    <div className="aspect-video rounded-2xl overflow-hidden bg-white border border-slate-200 shadow-soft group-hover:shadow-xl group-hover:border-brand/30 transition-all duration-300">
                      <LazyImage
                        src={post.image}
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <div className="mt-4 flex items-center gap-4 text-sm text-slate-500">
                      <span>{post.date}</span>
                      <span>•</span>
                      <span>{post.readTime || ''}</span>
                      <span>•</span>
                      <span className="text-brand">{post.category || ''}</span>
                    </div>
                    <h3 className="mt-2 text-xl font-semibold text-slate-900 group-hover:text-brand transition-colors line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="mt-2 text-slate-600 text-sm line-clamp-2">{post.excerpt}</p>
                    <span className="mt-3 inline-flex items-center gap-1 text-brand hover:text-brand-dark text-sm font-medium group-hover:gap-2 transition-all">
                      {t.blog.readMore}
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </span>
                  </Link>
                </motion.article>
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  )
}
