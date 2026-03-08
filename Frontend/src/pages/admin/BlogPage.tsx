import { useEffect, useState } from 'react'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import { adminApi } from '@/api/adminClient'
import { ImageUploadInput } from '@/components/admin/ImageUploadInput'

interface BlogPost {
  _id: string
  title: string
  slug: string
  content: string
  excerpt?: string
  image: string
  author?: string
  date: string
  readTime?: string
  category?: string
}

export function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)
  const [modalOpen, setModalOpen] = useState(false)
  const [editing, setEditing] = useState<BlogPost | null>(null)
  const [form, setForm] = useState({
    title: '',
    slug: '',
    content: '',
    excerpt: '',
    image: '',
    author: '',
    category: '',
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
    setForm({ title: '', slug: '', content: '', excerpt: '', image: '', author: '', category: '' })
    setModalOpen(true)
  }

  const openEdit = (p: BlogPost) => {
    setEditing(p)
    setForm({
      title: p.title,
      slug: p.slug,
      content: p.content,
      excerpt: p.excerpt || '',
      image: p.image,
      author: p.author || '',
      category: p.category || '',
    })
    setModalOpen(true)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    setError('')
    const payload = {
      title: form.title,
      slug: form.slug || slugify(form.title),
      content: form.content,
      excerpt: form.excerpt || undefined,
      image: form.image,
      author: form.author || undefined,
      category: form.category || undefined,
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
                    <label className="block text-slate-400 text-sm mb-1">Title *</label>
                    <input
                      value={form.title}
                      onChange={(e) =>
                        setForm({ ...form, title: e.target.value, slug: slugify(e.target.value) })
                      }
                      required
                      className="w-full px-4 py-2 rounded-lg bg-slate-800 border border-slate-700 text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-400 text-sm mb-1">Slug *</label>
                    <input
                      value={form.slug}
                      onChange={(e) => setForm({ ...form, slug: e.target.value })}
                      className="w-full px-4 py-2 rounded-lg bg-slate-800 border border-slate-700 text-white"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-slate-400 text-sm mb-1">Excerpt</label>
                  <textarea
                    value={form.excerpt}
                    onChange={(e) => setForm({ ...form, excerpt: e.target.value })}
                    rows={2}
                    className="w-full px-4 py-2 rounded-lg bg-slate-800 border border-slate-700 text-white"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 text-sm mb-1">Content *</label>
                  <div className="rounded-lg overflow-hidden bg-slate-800 [&_.ql-toolbar]:bg-slate-700 [&_.ql-container]:bg-slate-800 [&_.ql-editor]:text-white [&_.ql-editor]:min-h-[200px]">
                    <ReactQuill
                      theme="snow"
                      value={form.content}
                      onChange={(v) => setForm({ ...form, content: v })}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-slate-400 text-sm mb-1">Image URL *</label>
                    <ImageUploadInput
                      value={form.image}
                      onChange={(url) => setForm({ ...form, image: url })}
                      required
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
                  <label className="block text-slate-400 text-sm mb-1">Category</label>
                  <input
                    value={form.category}
                    onChange={(e) => setForm({ ...form, category: e.target.value })}
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
