import { useState } from 'react'

const API_BASE =
  import.meta.env.VITE_API_BASE_URL ||
  import.meta.env.REACT_APP_API_BASE_URL ||
  'http://localhost:5000/api'

export function ImageUploadInput({
  value,
  onChange,
  required = false,
  placeholder = 'Image URL or upload',
}: {
  value: string
  onChange: (url: string) => void
  required?: boolean
  placeholder?: string
}) {
  const [uploading, setUploading] = useState(false)

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setUploading(true)
    const formData = new FormData()
    formData.append('image', file)

    const token = localStorage.getItem('amu_admin_token')
    const res = await fetch(`${API_BASE}/upload`, {
      method: 'POST',
      headers: token ? { Authorization: `Bearer ${token}` } : {},
      body: formData,
    })

    const json = await res.json()
    setUploading(false)
    if (json.success && json.data?.url) {
      onChange(json.data.url)
    }
    e.target.value = ''
  }

  return (
    <div className="space-y-2">
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
        placeholder={placeholder}
        className="w-full px-4 py-2 rounded-lg bg-slate-800 border border-slate-700 text-white"
      />
      <div className="flex items-center gap-2">
        <label className="px-3 py-1.5 rounded-lg bg-slate-700 text-slate-300 text-sm cursor-pointer hover:bg-slate-600">
          {uploading ? 'Uploading...' : 'Upload'}
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFileChange}
            disabled={uploading}
          />
        </label>
      </div>
    </div>
  )
}
