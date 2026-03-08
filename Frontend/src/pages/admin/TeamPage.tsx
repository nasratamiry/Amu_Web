import { useEffect, useState } from 'react'
import { adminApi } from '@/api/adminClient'
import { ImageUploadInput } from '@/components/admin/ImageUploadInput'

interface TeamMember {
  _id: string
  name: string
  role: string
  photo: string
  bio?: string
  socialLinks?: { linkedin?: string; twitter?: string; github?: string }
}

export function TeamPage() {
  const [members, setMembers] = useState<TeamMember[]>([])
  const [loading, setLoading] = useState(true)
  const [modalOpen, setModalOpen] = useState(false)
  const [editing, setEditing] = useState<TeamMember | null>(null)
  const [form, setForm] = useState({
    name: '',
    role: '',
    photo: '',
    bio: '',
    linkedin: '',
    github: '',
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
    setForm({ name: '', role: '', photo: '', bio: '', linkedin: '', github: '' })
    setModalOpen(true)
  }

  const openEdit = (m: TeamMember) => {
    setEditing(m)
    setForm({
      name: m.name,
      role: m.role,
      photo: m.photo,
      bio: m.bio || '',
      linkedin: m.socialLinks?.linkedin || '',
      github: m.socialLinks?.github || '',
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
      photo: form.photo,
      bio: form.bio || undefined,
      socialLinks: {
        linkedin: form.linkedin || undefined,
        github: form.github || undefined,
      },
    }

    const res = editing
      ? await adminApi.put(`/team/${editing._id}`, payload)
      : await adminApi.post('/team', payload)

    if (res.success) {
      setModalOpen(false)
      loadMembers()
    } else {
      setError(res.message || 'Failed to save')
    }
    setSaving(false)
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this team member?')) return
    const res = await adminApi.delete(`/team/${id}`)
    if (res.success) loadMembers()
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
                  <label className="block text-slate-400 text-sm mb-1">Role *</label>
                  <input
                    value={form.role}
                    onChange={(e) => setForm({ ...form, role: e.target.value })}
                    required
                    placeholder="CEO, CTO, etc."
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
                <div>
                  <label className="block text-slate-400 text-sm mb-1">Bio</label>
                  <textarea
                    value={form.bio}
                    onChange={(e) => setForm({ ...form, bio: e.target.value })}
                    rows={3}
                    className="w-full px-4 py-2 rounded-lg bg-slate-800 border border-slate-700 text-white"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-slate-400 text-sm mb-1">LinkedIn</label>
                    <input
                      value={form.linkedin}
                      onChange={(e) => setForm({ ...form, linkedin: e.target.value })}
                      className="w-full px-4 py-2 rounded-lg bg-slate-800 border border-slate-700 text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-400 text-sm mb-1">GitHub</label>
                    <input
                      value={form.github}
                      onChange={(e) => setForm({ ...form, github: e.target.value })}
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
