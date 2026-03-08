import { useEffect, useState } from 'react'
import { adminApi } from '@/api/adminClient'
import { ImageUploadInput } from '@/components/admin/ImageUploadInput'

interface Project {
  _id: string
  title: string
  description: string
  category?: string
  image: string
  link?: string
  technologies?: string[]
  year?: string
  featured?: boolean
}

export function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [modalOpen, setModalOpen] = useState(false)
  const [editing, setEditing] = useState<Project | null>(null)
  const [form, setForm] = useState({
    title: '',
    description: '',
    category: '',
    image: '',
    link: '',
    technologies: '',
    year: '',
  })
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  const loadProjects = () => {
    setLoading(true)
    adminApi.get<Project[]>('/projects', { limit: 100 }).then((res) => {
      const data = res.data
      if (res.success && data) {
        setProjects(Array.isArray(data) ? data : [])
      }
      setLoading(false)
    })
  }

  useEffect(() => {
    loadProjects()
  }, [])

  const openCreate = () => {
    setEditing(null)
    setForm({ title: '', description: '', category: '', image: '', link: '', technologies: '', year: '' })
    setModalOpen(true)
  }

  const openEdit = (p: Project) => {
    setEditing(p)
    setForm({
      title: p.title,
      description: p.description,
      category: p.category || '',
      image: p.image,
      link: p.link || '',
      technologies: (p.technologies || []).join(', '),
      year: p.year || '',
    })
    setModalOpen(true)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    setError('')
    const payload = {
      title: form.title,
      description: form.description,
      category: form.category || undefined,
      image: form.image,
      link: form.link || undefined,
      technologies: form.technologies ? form.technologies.split(',').map((t) => t.trim()).filter(Boolean) : [],
      year: form.year || undefined,
    }

    const res = editing
      ? await adminApi.put(`/projects/${editing._id}`, payload)
      : await adminApi.post('/projects', payload)

    if (res.success) {
      setModalOpen(false)
      loadProjects()
    } else {
      setError(res.message || 'Failed to save')
    }
    setSaving(false)
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this project?')) return
    const res = await adminApi.delete(`/projects/${id}`)
    if (res.success) loadProjects()
  }

  const projectList = Array.isArray(projects) ? projects : []

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-white">Projects</h1>
        <button
          onClick={openCreate}
          className="px-4 py-2 bg-brand text-white rounded-xl font-medium hover:bg-brand-dark transition-colors"
        >
          + Add Project
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
                <th className="text-left p-4 text-slate-400 font-medium">Image</th>
                <th className="text-left p-4 text-slate-400 font-medium">Title</th>
                <th className="text-left p-4 text-slate-400 font-medium">Category</th>
                <th className="text-left p-4 text-slate-400 font-medium">Year</th>
                <th className="text-right p-4 text-slate-400 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {projectList.map((p: Project) => (
                <tr key={p._id} className="border-b border-slate-800/50 hover:bg-slate-800/30">
                  <td className="p-4">
                    <img src={p.image} alt="" className="w-16 h-10 object-cover rounded-lg" />
                  </td>
                  <td className="p-4 text-white font-medium">{p.title}</td>
                  <td className="p-4 text-slate-400">{p.category || '-'}</td>
                  <td className="p-4 text-slate-400">{p.year || '-'}</td>
                  <td className="p-4 text-right">
                    <button
                      onClick={() => openEdit(p)}
                      className="text-brand hover:underline mr-4"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(p._id)}
                      className="text-red-400 hover:underline"
                    >
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
          <div className="bg-slate-900 rounded-2xl border border-slate-800 w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <h2 className="text-xl font-bold text-white mb-6">
                {editing ? 'Edit Project' : 'New Project'}
              </h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                {error && (
                  <div className="p-3 rounded-lg bg-red-500/10 text-red-400 text-sm">{error}</div>
                )}
                <div>
                  <label className="block text-slate-400 text-sm mb-1">Title *</label>
                  <input
                    value={form.title}
                    onChange={(e) => setForm({ ...form, title: e.target.value })}
                    required
                    className="w-full px-4 py-2 rounded-lg bg-slate-800 border border-slate-700 text-white"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 text-sm mb-1">Description *</label>
                  <textarea
                    value={form.description}
                    onChange={(e) => setForm({ ...form, description: e.target.value })}
                    required
                    rows={3}
                    className="w-full px-4 py-2 rounded-lg bg-slate-800 border border-slate-700 text-white"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-slate-400 text-sm mb-1">Category</label>
                    <input
                      value={form.category}
                      onChange={(e) => setForm({ ...form, category: e.target.value })}
                      className="w-full px-4 py-2 rounded-lg bg-slate-800 border border-slate-700 text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-400 text-sm mb-1">Year</label>
                    <input
                      value={form.year}
                      onChange={(e) => setForm({ ...form, year: e.target.value })}
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
                <div>
                  <label className="block text-slate-400 text-sm mb-1">Project URL</label>
                  <input
                    value={form.link}
                    onChange={(e) => setForm({ ...form, link: e.target.value })}
                    placeholder="https://..."
                    className="w-full px-4 py-2 rounded-lg bg-slate-800 border border-slate-700 text-white"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 text-sm mb-1">Technologies (comma-separated)</label>
                  <input
                    value={form.technologies}
                    onChange={(e) => setForm({ ...form, technologies: e.target.value })}
                    placeholder="React, Node.js, MongoDB"
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
