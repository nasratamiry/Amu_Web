import { useEffect, useState } from 'react'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import { adminApi } from '@/api/adminClient'
import { ImageUploadInput } from '@/components/admin/ImageUploadInput'

type LangTab = 'en' | 'fa' | 'ps'

const LANG_TABS: { id: LangTab; label: string }[] = [
  { id: 'en', label: 'English' },
  { id: 'fa', label: 'فارسی' },
  { id: 'ps', label: 'پښتو' },
]

interface BlogPost {
  _id: string
  title: string
  titleFa?: string
  titlePs?: string
  slug: string
  content: string
  contentFa?: string
  contentPs?: string
  excerpt?: string
  excerptFa?: string
  excerptPs?: string
  image: string
  author?: string
  date: string
  readTime?: string
  category?: string
  categoryFa?: string
  categoryPs?: string
}

export function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)
  const [modalOpen, setModalOpen] = useState(false)
  const [editing, setEditing] = useState<BlogPost | null>(null)
  const [langTab, setLangTab] = useState<LangTab>('en')
  const [form, setForm] = useState({
    title: '',
    titleFa: '',
    titlePs: '',
    slug: '',
    content: '',
    contentFa: '',
    contentPs: '',
    excerpt: '',
    excerptFa: '',
    excerptPs: '',
    image: '',
    author: '',
    category: '',
    categoryFa: '',
    categoryPs: '',
  })
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  const loadPosts = () => {
    setLoading(true)
    adminApi.get<BlogPost[]>('/blog', { limit: 100 }).then((res) => {
      if (res.success && res.data) {
        setPosts(Array.isArray(res.data) ? res.data : [])
      }
      setLoading(false)
    })
  }

  useEffect(() => loadPosts(), [])

  const slugify = (s: string) =>
    s
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '')

  const openCreate = () => {
    setEditing(null)
    setLangTab('en')
    setForm({
      title: '',
      titleFa: '',
      titlePs: '',
      slug: '',
      content: '',
      contentFa: '',
      contentPs: '',
      excerpt: '',
      excerptFa: '',
      excerptPs: '',
      image: '',
      author: '',
      category: '',
      categoryFa: '',
      categoryPs: '',
    })
    setModalOpen(true)
  }

  const openEdit = (p: BlogPost) => {
    setEditing(p)
    setLangTab('en')
    setForm({
      title: p.title,
      titleFa: p.titleFa || '',
      titlePs: p.titlePs || '',
      slug: p.slug,
      content: p.content,
      contentFa: p.contentFa || '',
      contentPs: p.contentPs || '',
      excerpt: p.excerpt || '',
      excerptFa: p.excerptFa || '',
      excerptPs: p.excerptPs || '',
      image: p.image,
      author: p.author || '',
      category: p.category || '',
      categoryFa: p.categoryFa || '',
      categoryPs: p.categoryPs || '',
    })
    setModalOpen(true)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    setError('')
    const payload = {
      title: form.title,
      titleFa: form.titleFa || undefined,
      titlePs: form.titlePs || undefined,
      slug: form.slug || slugify(form.title),
      content: form.content,
      contentFa: form.contentFa || undefined,
      contentPs: form.contentPs || undefined,
      excerpt: form.excerpt || undefined,
      excerptFa: form.excerptFa || undefined,
      excerptPs: form.excerptPs || undefined,
      image: form.image,
      author: form.author || undefined,
      category: form.category || undefined,
      categoryFa: form.categoryFa || undefined,
      categoryPs: form.categoryPs || undefined,
      date: editing ? undefined : new Date().toISOString(),
    }

    const res = editing
      ? await adminApi.put(`/blog/${editing._id}`, payload)
      : await adminApi.post('/blog', payload)

    if (res.success) {
      setModalOpen(false)
      loadPosts()
    } else {
      setError(res.message || 'Failed to save')
    }
    setSaving(false)
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this post?')) return
    const res = await adminApi.delete(`/blog/${id}`)
    if (res.success) loadPosts()
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-white">Blog</h1>
        <button
          onClick={openCreate}
          className="px-4 py-2 bg-brand text-white rounded-xl font-medium hover:bg-brand-dark transition-colors"
        >
          + New Post
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center py-12">
          <div className="animate-spin w-10 h-10 border-2 border-brand border-t-transparent rounded-full" />
        </div>
      ) : (
        <div className="bg-slate-900/50 rounded-2xl border border-slate-800 overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-800">
                <th className="text-left p-4 text-slate-400 font-medium">Title</th>
                <th className="text-left p-4 text-slate-400 font-medium">Slug</th>
                <th className="text-left p-4 text-slate-400 font-medium">Category</th>
                <th className="text-right p-4 text-slate-400 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {posts.map((p) => (
                <tr key={p._id} className="border-b border-slate-800/50 hover:bg-slate-800/30">
                  <td className="p-4 text-white font-medium">{p.title}</td>
                  <td className="p-4 text-slate-400 font-mono text-sm">{p.slug}</td>
                  <td className="p-4 text-slate-400">{p.category || '-'}</td>
                  <td className="p-4 text-right">
                    <button onClick={() => openEdit(p)} className="text-brand hover:underline mr-4">
                      Edit
                    </button>
                    <button onClick={() => handleDelete(p._id)} className="text-red-400 hover:underline">
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {modalOpen && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
          <div className="bg-slate-900 rounded-2xl border border-slate-800 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <h2 className="text-xl font-bold text-white mb-6">
                {editing ? 'Edit Post' : 'New Post'}
              </h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                {error && (
                  <div className="p-3 rounded-lg bg-red-500/10 text-red-400 text-sm">{error}</div>
                )}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-slate-400 text-sm mb-1">Slug * (from EN title)</label>
                    <input
                      value={form.slug}
                      onChange={(e) => setForm({ ...form, slug: e.target.value })}
                      className="w-full px-4 py-2 rounded-lg bg-slate-800 border border-slate-700 text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-400 text-sm mb-1">Author</label>
                    <input
                      value={form.author}
                      onChange={(e) => setForm({ ...form, author: e.target.value })}
                      className="w-full px-4 py-2 rounded-lg bg-slate-800 border border-slate-700 text-white"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-slate-400 text-sm mb-1">Image URL *</label>
                  <ImageUploadInput
                    value={form.image}
                    onChange={(url) => setForm({ ...form, image: url })}
                    required
                  />
                </div>
                <div className="border-b border-slate-700 -mx-6 px-6">
                  <div className="flex gap-2">
                    {LANG_TABS.map((tab) => (
                      <button
                        key={tab.id}
                        type="button"
                        onClick={() => setLangTab(tab.id)}
                        className={`px-4 py-2 text-sm font-medium rounded-t-lg transition-colors ${
                          langTab === tab.id
                            ? 'bg-slate-800 text-white border-b-2 border-brand'
                            : 'text-slate-400 hover:text-white'
                        }`}
                      >
                        {tab.label}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-slate-400 text-sm mb-1">
                    Title * {langTab !== 'en' && `(${LANG_TABS.find((t) => t.id === langTab)?.label})`}
                  </label>
                  <input
                    value={langTab === 'en' ? form.title : langTab === 'fa' ? form.titleFa : form.titlePs}
                    onChange={(e) => {
                      const v = e.target.value
                      setForm({
                        ...form,
                        ...(langTab === 'en' ? { title: v, slug: form.slug || slugify(v) } : langTab === 'fa' ? { titleFa: v } : { titlePs: v }),
                      })
                    }}
                    required={langTab === 'en'}
                    className="w-full px-4 py-2 rounded-lg bg-slate-800 border border-slate-700 text-white"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 text-sm mb-1">
                    Excerpt {langTab !== 'en' && `(${LANG_TABS.find((t) => t.id === langTab)?.label})`}
                  </label>
                  <textarea
                    value={langTab === 'en' ? form.excerpt : langTab === 'fa' ? form.excerptFa : form.excerptPs}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        ...(langTab === 'en' ? { excerpt: e.target.value } : langTab === 'fa' ? { excerptFa: e.target.value } : { excerptPs: e.target.value }),
                      })
                    }
                    rows={2}
                    className="w-full px-4 py-2 rounded-lg bg-slate-800 border border-slate-700 text-white"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 text-sm mb-1">
                    Content * {langTab !== 'en' && `(${LANG_TABS.find((t) => t.id === langTab)?.label})`}
                  </label>
                  <div className="rounded-lg overflow-hidden bg-slate-800 [&_.ql-toolbar]:bg-slate-700 [&_.ql-container]:bg-slate-800 [&_.ql-editor]:text-white [&_.ql-editor]:min-h-[200px]">
                    <ReactQuill
                      theme="snow"
                      value={langTab === 'en' ? form.content : langTab === 'fa' ? form.contentFa : form.contentPs}
                      onChange={(v) =>
                        setForm({
                          ...form,
                          ...(langTab === 'en' ? { content: v } : langTab === 'fa' ? { contentFa: v } : { contentPs: v }),
                        })
                      }
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-slate-400 text-sm mb-1">
                    Category {langTab !== 'en' && `(${LANG_TABS.find((t) => t.id === langTab)?.label})`}
                  </label>
                  <input
                    value={langTab === 'en' ? form.category : langTab === 'fa' ? form.categoryFa : form.categoryPs}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        ...(langTab === 'en' ? { category: e.target.value } : langTab === 'fa' ? { categoryFa: e.target.value } : { categoryPs: e.target.value }),
                      })
                    }
                    className="w-full px-4 py-2 rounded-lg bg-slate-800 border border-slate-700 text-white"
                  />
                </div>
                <div className="flex gap-3 pt-4">
                  <button
                    type="submit"
                    disabled={saving}
                    className="px-4 py-2 bg-brand text-white rounded-lg font-medium hover:bg-brand-dark disabled:opacity-50"
                  >
                    {saving ? 'Saving...' : 'Save'}
                  </button>
                  <button
                    type="button"
                    onClick={() => setModalOpen(false)}
                    className="px-4 py-2 bg-slate-700 text-white rounded-lg hover:bg-slate-600"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
