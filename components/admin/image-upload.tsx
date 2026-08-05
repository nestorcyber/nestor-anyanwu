'use client'

import { useState } from 'react'
import { TextInput } from '@/components/admin/field'

type Props = {
  label?: string
  value: string
  onChange: (url: string) => void
  folder?: string
}

export default function ImageUpload({ label = 'Image', value, onChange, folder = 'journal' }: Props) {
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState('')

  async function onFile(file: File | null) {
    if (!file) return
    setUploading(true)
    setError('')
    try {
      const sigRes = await fetch('/api/admin/upload', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ folder }),
      })
      const sig = await sigRes.json()
      if (!sigRes.ok) throw new Error(sig.error || 'Failed to get upload signature')

      const form = new FormData()
      form.append('file', file)
      form.append('api_key', sig.apiKey)
      form.append('timestamp', String(sig.timestamp))
      form.append('signature', sig.signature)
      form.append('folder', sig.folder)

      const uploadRes = await fetch(
        `https://api.cloudinary.com/v1_1/${sig.cloudName}/image/upload`,
        { method: 'POST', body: form }
      )
      const uploaded = await uploadRes.json()
      if (!uploadRes.ok) throw new Error(uploaded.error?.message || 'Upload failed')
      onChange(uploaded.secure_url)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Upload failed')
    } finally {
      setUploading(false)
    }
  }

  return (
    <div className="space-y-2">
      <span className="text-xs uppercase tracking-wide text-neutral-400">{label}</span>
      <TextInput
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="https://… or upload below"
      />
      <input
        type="file"
        accept="image/*"
        disabled={uploading}
        onChange={(e) => onFile(e.target.files?.[0] || null)}
        className="block w-full text-sm text-neutral-400 file:mr-3 file:border-0 file:bg-neutral-800 file:px-3 file:py-1.5 file:text-white"
      />
      {uploading ? <p className="text-xs text-neutral-500">Uploading…</p> : null}
      {error ? <p className="text-xs text-red-400">{error}</p> : null}
      {value ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={value} alt="" className="mt-2 h-28 w-auto object-cover border border-neutral-800" />
      ) : null}
    </div>
  )
}
