import { useEffect, useState } from 'react'
import { adminApi } from '@/api/adminClient'
import { ImageUploadInput } from '@/components/admin/ImageUploadInput'

type LangTab = 'en' | 'fa' | 'ps'

const LANG_TABS: { id: LangTab; label: string }[] = [
  { id: 'en', label: 'English' },
  { id: 'fa', label: 'فارسی' },
  { id: 'ps', label: 'پښتو' },
]

interface Project {
  _id: string
  title: string
  titleFa?: string
  titlePs?: string
  description: string
  descriptionFa?: string
  descriptionPs?: string
  category?: string
  categoryFa?: string
  categoryPs?: string
  image: string
  link?: string
  playStoreUrl?: string
  appStoreUrl?: string
  technologies?: string[]
  year?: string
  featured?: boolean
}

export function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [modalOpen, setModalOpen] = useState(false)
  const [editing, setEditing] = useState<Project | null>(null)
  const [langTab, setLangTab] = useState<LangTab>('en')
  const [form, setForm] = useState({
    title: '',
    titleFa: '',
    titlePs: '',
    description: '',
    descriptionFa: '',
    descriptionPs: '',
    category: '',
    categoryFa: '',
    categoryPs: '',
    image: '',
    link: '',
    playStoreUrl: '',
    appStoreUrl: '',
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
    setLangTab('en')
    setForm({
      title: '',
      titleFa: '',
      titlePs: '',
      description: '',
      descriptionFa: '',
      descriptionPs: '',
      category: '',
      categoryFa: '',
      categoryPs: '',
      image: '',
      link: '',
      playStoreUrl: '',
      appStoreUrl: '',
      technologies: '',
      year: '',
    })
    setModalOpen(true)
  }

  const openEdit = (p: Project) => {
    setEditing(p)
    setLangTab('en')
    setForm({
      title: p.title,
      titleFa: p.titleFa || '',
      titlePs: p.titlePs || '',
      description: p.description,
      descriptionFa: p.descriptionFa || '',
      descriptionPs: p.descriptionPs || '',
      category: p.category || '',
      categoryFa: p.categoryFa || '',
      categoryPs: p.categoryPs || '',
      image: p.image,
      link: p.link || '',
      playStoreUrl: p.playStoreUrl || '',
      appStoreUrl: p.appStoreUrl || '',
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
      titleFa: form.titleFa || undefined,
      titlePs: form.titlePs || undefined,
      description: form.description,
      descriptionFa: form.descriptionFa || undefined,
      descriptionPs: form.descriptionPs || undefined,
      category: form.category || undefined,
      categoryFa: form.categoryFa || undefined,
      categoryPs: form.categoryPs || undefined,
      image: form.image,
      link: form.link || undefined,
      playStoreUrl: form.playStoreUrl || undefined,
      appStoreUrl: form.appStoreUrl || undefined,
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
                    onChange={(e) =>
                      setForm({
                        ...form,
                        ...(langTab === 'en' ? { title: e.target.value } : langTab === 'fa' ? { titleFa: e.target.value } : { titlePs: e.target.value }),
                      })
                    }
                    required={langTab === 'en'}
                    className="w-full px-4 py-2 rounded-lg bg-slate-800 border border-slate-700 text-white"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 text-sm mb-1">
                    Description * {langTab !== 'en' && `(${LANG_TABS.find((t) => t.id === langTab)?.label})`}
                  </label>
                  <textarea
                    value={langTab === 'en' ? form.description : langTab === 'fa' ? form.descriptionFa : form.descriptionPs}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        ...(langTab === 'en' ? { description: e.target.value } : langTab === 'fa' ? { descriptionFa: e.target.value } : { descriptionPs: e.target.value }),
                      })
                    }
                    required={langTab === 'en'}
                    rows={3}
                    className="w-full px-4 py-2 rounded-lg bg-slate-800 border border-slate-700 text-white"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
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
                  <label className="block text-slate-400 text-sm mb-1">Play Store URL (optional)</label>
                  <input
                    value={form.playStoreUrl}
                    onChange={(e) => setForm({ ...form, playStoreUrl: e.target.value })}
                    placeholder="https://play.google.com/store/apps/details?id=..."
                    className="w-full px-4 py-2 rounded-lg bg-slate-800 border border-slate-700 text-white"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 text-sm mb-1">App Store URL (optional)</label>
                  <input
                    value={form.appStoreUrl}
                    onChange={(e) => setForm({ ...form, appStoreUrl: e.target.value })}
                    placeholder="https://apps.apple.com/..."
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
