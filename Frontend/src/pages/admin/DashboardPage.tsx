import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { adminApi } from '@/api/adminClient'

interface Stats {
  projects: number
  blogPosts: number
  messages: number
  teamMembers: number
}

export function DashboardPage() {
  const [stats, setStats] = useState<Stats | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    adminApi.get<Stats>('/admin/stats').then((res) => {
      if (res.success && res.data) setStats(res.data)
      setLoading(false)
    })
  }, [])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin w-10 h-10 border-2 border-brand border-t-transparent rounded-full" />
      </div>
    )
  }

  const cards = [
    { label: 'Projects', value: stats?.projects ?? 0, to: '/admin/projects', color: 'from-blue-500/20 to-blue-600/10', border: 'border-blue-500/30' },
    { label: 'Blog Posts', value: stats?.blogPosts ?? 0, to: '/admin/blog', color: 'from-emerald-500/20 to-emerald-600/10', border: 'border-emerald-500/30' },
    { label: 'Messages', value: stats?.messages ?? 0, to: '/admin/messages', color: 'from-amber-500/20 to-amber-600/10', border: 'border-amber-500/30' },
    { label: 'Team Members', value: stats?.teamMembers ?? 0, to: '/admin/team', color: 'from-violet-500/20 to-violet-600/10', border: 'border-violet-500/30' },
  ]

  return (
    <div>
      <h1 className="text-2xl font-bold text-white mb-8">Dashboard</h1>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {cards.map((card) => (
          <Link
            key={card.label}
            to={card.to}
            className={`block p-6 rounded-2xl bg-gradient-to-br ${card.color} border ${card.border} hover:scale-[1.02] transition-transform`}
          >
            <p className="text-slate-400 text-sm font-medium">{card.label}</p>
            <p className="text-3xl font-bold text-white mt-2">{card.value}</p>
            <p className="text-brand text-sm mt-2">View →</p>
          </Link>
        ))}
      </div>

      <div className="mt-12 p-6 rounded-2xl bg-slate-900/50 border border-slate-800">
        <h2 className="text-lg font-semibold text-white mb-4">Quick Actions</h2>
        <div className="flex flex-wrap gap-4">
          <Link
            to="/admin/projects"
            className="px-4 py-2 rounded-xl bg-brand/20 text-brand border border-brand/30 hover:bg-brand/30 transition-colors"
          >
            Add Project
          </Link>
          <Link
            to="/admin/blog"
            className="px-4 py-2 rounded-xl bg-brand/20 text-brand border border-brand/30 hover:bg-brand/30 transition-colors"
          >
            New Blog Post
          </Link>
          <Link
            to="/admin/team"
            className="px-4 py-2 rounded-xl bg-brand/20 text-brand border border-brand/30 hover:bg-brand/30 transition-colors"
          >
            Add Team Member
          </Link>
        </div>
      </div>
    </div>
  )
}
