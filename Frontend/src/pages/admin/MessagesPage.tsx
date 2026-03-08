import { useEffect, useState } from 'react'
import { adminApi } from '@/api/adminClient'

interface Message {
  _id: string
  name: string
  email: string
  message: string
  subject?: string
  createdAt: string
}

export function MessagesPage() {
  const [messages, setMessages] = useState<Message[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    adminApi.get<Message[]>('/messages', { limit: 50 }).then((res) => {
      if (res.success && res.data) {
        setMessages(Array.isArray(res.data) ? res.data : [])
      }
      setLoading(false)
    })
  }, [])

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this message?')) return
    const res = await adminApi.delete(`/messages/${id}`)
    if (res.success) setMessages((m) => m.filter((x) => x._id !== id))
  }

  const formatDate = (d: string) => new Date(d).toLocaleDateString()

  return (
    <div>
      <h1 className="text-2xl font-bold text-white mb-8">Messages</h1>

      {loading ? (
        <div className="flex justify-center py-12">
          <div className="animate-spin w-10 h-10 border-2 border-brand border-t-transparent rounded-full" />
        </div>
      ) : (
        <div className="bg-slate-900/50 rounded-2xl border border-slate-800 overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-800">
                <th className="text-left p-4 text-slate-400 font-medium">Name</th>
                <th className="text-left p-4 text-slate-400 font-medium">Email</th>
                <th className="text-left p-4 text-slate-400 font-medium">Message</th>
                <th className="text-left p-4 text-slate-400 font-medium">Date</th>
                <th className="text-right p-4 text-slate-400 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {messages.map((m) => (
                <tr key={m._id} className="border-b border-slate-800/50 hover:bg-slate-800/30">
                  <td className="p-4 text-white font-medium">{m.name}</td>
                  <td className="p-4 text-slate-400">
                    <a href={`mailto:${m.email}`} className="text-brand hover:underline">
                      {m.email}
                    </a>
                  </td>
                  <td className="p-4 text-slate-300 max-w-xs truncate">{m.message}</td>
                  <td className="p-4 text-slate-400">{formatDate(m.createdAt)}</td>
                  <td className="p-4 text-right">
                    <button
                      onClick={() => handleDelete(m._id)}
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
    </div>
  )
}
