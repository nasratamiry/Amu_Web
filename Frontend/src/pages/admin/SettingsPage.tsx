export function SettingsPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-white mb-8">Settings</h1>

      <div className="bg-slate-900/50 rounded-2xl border border-slate-800 p-6 max-w-2xl">
        <h2 className="text-lg font-semibold text-white mb-4">General</h2>
        <p className="text-slate-400">
          Admin panel settings can be configured via environment variables on the backend.
        </p>
        <ul className="mt-4 space-y-2 text-slate-400 text-sm">
          <li>• JWT_SECRET – Change in production</li>
          <li>• ADMIN_EMAIL / ADMIN_PASSWORD – Set in seed or create admin via MongoDB</li>
          <li>• CORS_ORIGINS – Add your admin panel URL if hosted separately</li>
        </ul>
      </div>
    </div>
  )
}
