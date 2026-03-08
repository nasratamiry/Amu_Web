import { useState } from 'react'
import { Outlet, NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '@/contexts/AuthContext'

const iconClass = 'w-5 h-5 flex-shrink-0'
const icons = {
  dashboard: (
    <svg className={iconClass} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
    </svg>
  ),
  projects: (
    <svg className={iconClass} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
    </svg>
  ),
  blog: (
    <svg className={iconClass} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
    </svg>
  ),
  messages: (
    <svg className={iconClass} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
  ),
  team: (
    <svg className={iconClass} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
    </svg>
  ),
  settings: (
    <svg className={iconClass} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  ),
  logout: (
    <svg className={iconClass} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
    </svg>
  ),
}

const navItems = [
  { to: '/admin/dashboard', icon: icons.dashboard, label: 'Dashboard' },
  { to: '/admin/projects', icon: icons.projects, label: 'Projects' },
  { to: '/admin/blog', icon: icons.blog, label: 'Blog' },
  { to: '/admin/messages', icon: icons.messages, label: 'Messages' },
  { to: '/admin/team', icon: icons.team, label: 'Team' },
  { to: '/admin/settings', icon: icons.settings, label: 'Settings' },
]

export function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const { logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/admin/login')
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex">
      {/* Sidebar */}
      <aside
        className={`${
          sidebarOpen ? 'w-64' : 'w-20'
        } bg-slate-900 border-r border-slate-800 transition-all duration-300 flex flex-col fixed h-full z-40`}
      >
        <div className="p-4 border-b border-slate-800 flex items-center justify-between">
          <NavLink to="/admin/dashboard" className="flex items-center gap-2 min-w-0">
            <img src="/logo.svg" alt="Etihad Amu" className="h-8 w-auto object-contain flex-shrink-0" />
            {sidebarOpen && <span className="text-sm font-medium truncate">Admin</span>}
          </NavLink>
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 rounded-lg hover:bg-slate-800 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${
                  isActive
                    ? 'bg-brand/20 text-brand border border-brand/30'
                    : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'
                }`
              }
            >
              <span className="[&>svg]:text-current">{item.icon}</span>
              {sidebarOpen && <span className="font-medium">{item.label}</span>}
            </NavLink>
          ))}
        </nav>
        <div className="p-4 border-t border-slate-800">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 w-full px-4 py-3 rounded-xl text-red-400 hover:bg-red-500/10 transition-colors"
          >
            <span className="[&>svg]:text-current">{icons.logout}</span>
            {sidebarOpen && <span className="font-medium">Logout</span>}
          </button>
        </div>
      </aside>

      {/* Main */}
      <div className={`flex-1 flex flex-col ${sidebarOpen ? 'ml-64' : 'ml-20'} transition-all duration-300`}>
        <header className="h-16 bg-slate-900/50 border-b border-slate-800 sticky top-0 z-30 flex items-center justify-between px-6">
          <h1 className="text-lg font-semibold text-slate-200">Etihad Amu Admin</h1>
          <a
            href="/en"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-slate-400 hover:text-brand transition-colors"
          >
            View Site →
          </a>
        </header>
        <main className="flex-1 p-6 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
