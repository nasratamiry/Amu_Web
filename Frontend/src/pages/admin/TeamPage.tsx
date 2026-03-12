import { useEffect, useState } from 'react'
import { adminApi } from '@/api/adminClient'
import { apiCache } from '@/api/cache'
import { ImageUploadInput } from '@/components/admin/ImageUploadInput'

type LangTab = 'en' | 'fa' | 'ps'

const LANG_TABS: { id: LangTab; label: string }[] = [
  { id: 'en', label: 'English' },
  { id: 'fa', label: 'فارسی' },
  { id: 'ps', label: 'پښتو' },
]

interface TeamMember {
  _id: string
  name: string
  role: string
  roleFa?: string
  rolePs?: string
  photo: string
  bio?: string
  bioFa?: string
  bioPs?: string
  socialLinks?: { linkedin?: string; email?: string }
}

export function TeamPage() {
  const [members, setMembers] = useState<TeamMember[]>([])
  const [loading, setLoading] = useState(true)
  const [modalOpen, setModalOpen] = useState(false)
  const [editing, setEditing] = useState<TeamMember | null>(null)
  const [langTab, setLangTab] = useState<LangTab>('en')
  const [form, setForm] = useState({
    name: '',
    role: '',
    roleFa: '',
    rolePs: '',
    photo: '',
    bio: '',
    bioFa: '',
    bioPs: '',
    linkedin: '',
    email: '',
  })
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  const loadMembers = () => {
    setLoading(true)
    adminApi.get<TeamMember[]>('/team').then((res) => {
      if (res.success && res.data) {
        setMembers(Array.isArray(res.data) ? res.data : [])
      }
      setLoading(false)
    })
  }

  useEffect(() => loadMembers(), [])

  const openCreate = () => {
    setEditing(null)
    setLangTab('en')
    setForm({ name: '', role: '', roleFa: '', rolePs: '', photo: '', bio: '', bioFa: '', bioPs: '', linkedin: '', email: '' })
    setModalOpen(true)
  }

  const openEdit = (m: TeamMember) => {
    setEditing(m)
    setLangTab('en')
    setForm({
      name: m.name,
      role: m.role,
      roleFa: m.roleFa || '',
      rolePs: m.rolePs || '',
      photo: m.photo,
      bio: m.bio || '',
      bioFa: m.bioFa || '',
      bioPs: m.bioPs || '',
      linkedin: m.socialLinks?.linkedin || '',
      email: m.socialLinks?.email || '',
    })
    setModalOpen(true)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    setError('')
    const payload = {
      name: form.name,
      role: form.role,
      roleFa: form.roleFa || undefined,
      rolePs: form.rolePs || undefined,
      photo: form.photo,
      bio: form.bio || undefined,
      bioFa: form.bioFa || undefined,
      bioPs: form.bioPs || undefined,
      socialLinks: {
        linkedin: form.linkedin || undefined,
        email: form.email || undefined,
      },
    }

    const res = editing
      ? await adminApi.put(`/team/${editing._id}`, payload)
      : await adminApi.post('/team', payload)

    if (res.success) {
      setModalOpen(false)
      apiCache.invalidate('team')
      loadMembers()
    } else {
      setError(res.message || 'Failed to save')
    }
    setSaving(false)
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this team member?')) return
    const res = await adminApi.delete(`/team/${id}`)
    if (res.success) {
      apiCache.invalidate('team')
      loadMembers()
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-white">Team</h1>
        <button
          onClick={openCreate}
          className="px-4 py-2 bg-brand text-white rounded-xl font-medium hover:bg-brand-dark transition-colors"
        >
          + Add Member
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
                <th className="text-left p-4 text-slate-400 font-medium">Photo</th>
                <th className="text-left p-4 text-slate-400 font-medium">Name</th>
                <th className="text-left p-4 text-slate-400 font-medium">Role</th>
                <th className="text-right p-4 text-slate-400 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {members.map((m) => (
                <tr key={m._id} className="border-b border-slate-800/50 hover:bg-slate-800/30">
                  <td className="p-4">
                    <img src={m.photo} alt="" className="w-12 h-12 rounded-full object-cover" />
                  </td>
                  <td className="p-4 text-white font-medium">{m.name}</td>
                  <td className="p-4 text-slate-400">{m.role}</td>
                  <td className="p-4 text-right">
                    <button onClick={() => openEdit(m)} className="text-brand hover:underline mr-4">
                      Edit
                    </button>
                    <button onClick={() => handleDelete(m._id)} className="text-red-400 hover:underline">
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
          <div className="bg-slate-900 rounded-2xl border border-slate-800 w-full max-w-lg">
            <div className="p-6">
              <h2 className="text-xl font-bold text-white mb-6">
                {editing ? 'Edit Member' : 'New Member'}
              </h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                {error && (
                  <div className="p-3 rounded-lg bg-red-500/10 text-red-400 text-sm">{error}</div>
                )}
                <div>
                  <label className="block text-slate-400 text-sm mb-1">Name *</label>
                  <input
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    required
                    className="w-full px-4 py-2 rounded-lg bg-slate-800 border border-slate-700 text-white"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 text-sm mb-1">Photo URL *</label>
                  <ImageUploadInput
                    value={form.photo}
                    onChange={(url) => setForm({ ...form, photo: url })}
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
                    Role * {langTab !== 'en' && `(${LANG_TABS.find((t) => t.id === langTab)?.label})`}
                  </label>
                  <input
                    value={langTab === 'en' ? form.role : langTab === 'fa' ? form.roleFa : form.rolePs}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        ...(langTab === 'en' ? { role: e.target.value } : langTab === 'fa' ? { roleFa: e.target.value } : { rolePs: e.target.value }),
                      })
                    }
                    required={langTab === 'en'}
                    placeholder={langTab === 'en' ? 'CEO, CTO, etc.' : 'مثال: مدیر عامل'}
                    className="w-full px-4 py-2 rounded-lg bg-slate-800 border border-slate-700 text-white"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 text-sm mb-1">
                    Bio {langTab !== 'en' && `(${LANG_TABS.find((t) => t.id === langTab)?.label})`}
                  </label>
                  <textarea
                    value={langTab === 'en' ? form.bio : langTab === 'fa' ? form.bioFa : form.bioPs}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        ...(langTab === 'en' ? { bio: e.target.value } : langTab === 'fa' ? { bioFa: e.target.value } : { bioPs: e.target.value }),
                      })
                    }
                    rows={3}
                    placeholder={langTab !== 'en' ? 'توضیحات به زبان انتخاب شده' : undefined}
                    className="w-full px-4 py-2 rounded-lg bg-slate-800 border border-slate-700 text-white"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-slate-400 text-sm mb-1">LinkedIn</label>
                    <input
                      value={form.linkedin}
                      onChange={(e) => setForm({ ...form, linkedin: e.target.value })}
                      placeholder="https://linkedin.com/in/username"
                      className="w-full px-4 py-2 rounded-lg bg-slate-800 border border-slate-700 text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-400 text-sm mb-1">Email</label>
                    <input
                      type="email"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      placeholder="email@example.com"
                      className="w-full px-4 py-2 rounded-lg bg-slate-800 border border-slate-700 text-white"
                    />
                  </div>
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
