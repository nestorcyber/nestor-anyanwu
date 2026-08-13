'use client'

import { useState, useRef } from 'react'
import dynamic from 'next/dynamic'
import { useTheme } from 'next-themes'
import ImageUpload from '@/components/admin/image-upload'
import { validateImageFile, getOptimizedImageUrl } from '@/lib/cloudinary'
import { Image as ImageIcon, Plus, X, Upload, Loader2, Sparkles } from 'lucide-react'
import '@uiw/react-md-editor/markdown-editor.css'
import '@uiw/react-markdown-preview/markdown.css'

const MDEditor = dynamic(() => import('@uiw/react-md-editor'), {
  ssr: false,
  loading: () => (
    <div className="flex min-h-[300px] items-center justify-center border border-border bg-background text-sm text-muted-foreground">
      Loading editor…
    </div>
  ),
})

type Props = {
  value: string
  onChange: (value: string) => void
  height?: number
  placeholder?: string
  folder?: string
}

export default function MarkdownEditor({
  value,
  onChange,
  height = 480,
  placeholder = 'Write article content…',
  folder = 'journal',
}: Props) {
  const { resolvedTheme } = useTheme()
  const colorMode = resolvedTheme === 'dark' ? 'dark' : 'light'
  const [showImageModal, setShowImageModal] = useState(false)
  const [uploadedUrl, setUploadedUrl] = useState('')
  const [altText, setAltText] = useState('')
  const [isUploading, setIsUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [uploadError, setUploadError] = useState('')
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Direct Cloudinary upload function for files
  const uploadToCloudinary = async (file: File): Promise<string> => {
    const validation = validateImageFile(file)
    if (!validation.valid) {
      throw new Error(validation.error || 'Invalid file format')
    }

    setIsUploading(true)
    setUploadProgress(0)

    try {
      const sigRes = await fetch('/api/admin/upload', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ folder }),
      })
      const sig = await sigRes.json()
      if (!sigRes.ok) throw new Error(sig.error || 'Failed to get upload signature')

      const formData = new FormData()
      formData.append('file', file)
      formData.append('api_key', sig.apiKey)
      formData.append('timestamp', String(sig.timestamp))
      formData.append('signature', sig.signature)
      formData.append('folder', sig.folder)

      return await new Promise<string>((resolve, reject) => {
        const xhr = new XMLHttpRequest()
        const uploadUrl = `https://api.cloudinary.com/v1_1/${sig.cloudName}/image/upload`

        xhr.upload.addEventListener('progress', (e) => {
          if (e.lengthComputable) {
            setUploadProgress(Math.round((e.loaded / e.total) * 100))
          }
        })

        xhr.addEventListener('load', () => {
          if (xhr.status >= 200 && xhr.status < 300) {
            const res = JSON.parse(xhr.responseText)
            if (res.secure_url) {
              resolve(res.secure_url)
            } else {
              reject(new Error('Cloudinary response missing URL'))
            }
          } else {
            reject(new Error(`Upload failed with status ${xhr.status}`))
          }
        })

        xhr.addEventListener('error', () => reject(new Error('Network error during upload')))
        xhr.open('POST', uploadUrl)
        xhr.send(formData)
      })
    } finally {
      setIsUploading(false)
      setUploadProgress(0)
    }
  }

  // Insert image markdown at cursor or end of text
  const insertImageMarkdown = (url: string, caption = '') => {
    const optimized = getOptimizedImageUrl(url, { width: 1200, quality: 'auto' })
    const markdown = `\n![${caption || 'Article Image'}](${optimized})\n`
    onChange(value ? `${value}\n${markdown}` : markdown)
  }

  const handleManualInsert = () => {
    if (!uploadedUrl) return
    insertImageMarkdown(uploadedUrl, altText)
    setUploadedUrl('')
    setAltText('')
    setShowImageModal(false)
  }

  // Handle Clipboard Paste (Ctrl + V) with images
  const handlePaste = async (e: React.ClipboardEvent) => {
    const items = e.clipboardData?.items
    if (!items) return

    for (let i = 0; i < items.length; i++) {
      const item = items[i]
      if (item.type.indexOf('image') !== -1) {
        e.preventDefault()
        const file = item.getAsFile()
        if (file) {
          try {
            setUploadError('')
            const url = await uploadToCloudinary(file)
            insertImageMarkdown(url, 'Pasted Image')
          } catch (err) {
            setUploadError(err instanceof Error ? err.message : 'Upload failed')
          }
        }
        break
      }
    }
  }

  // Handle Drag & Drop files into editor
  const handleDrop = async (e: React.DragEvent) => {
    const files = e.dataTransfer?.files
    if (files && files.length > 0) {
      const file = files[0]
      if (file.type.startsWith('image/')) {
        e.preventDefault()
        try {
          setUploadError('')
          const url = await uploadToCloudinary(file)
          insertImageMarkdown(url, file.name.replace(/\.[^/.]+$/, ''))
        } catch (err) {
          setUploadError(err instanceof Error ? err.message : 'Upload failed')
        }
      }
    }
  }

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files && files[0]) {
      try {
        setUploadError('')
        const url = await uploadToCloudinary(files[0])
        insertImageMarkdown(url, files[0].name.replace(/\.[^/.]+$/, ''))
      } catch (err) {
        setUploadError(err instanceof Error ? err.message : 'Upload failed')
      }
    }
    if (e.target) e.target.value = ''
  }

  return (
    <div className="space-y-3">
      {/* Editor Helper Action Bar */}
      <div className="flex flex-wrap items-center justify-between gap-2 p-2 rounded-lg border border-border bg-secondary/40">
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            disabled={isUploading}
            className="inline-flex items-center gap-1.5 rounded-md border border-border bg-card px-3 py-1.5 text-xs font-bold text-foreground hover:bg-secondary transition-colors shadow-2xs cursor-pointer"
          >
            <Upload className="h-3.5 w-3.5 text-[#0070f3]" />
            <span>Upload Image to Body</span>
          </button>

          <button
            type="button"
            onClick={() => setShowImageModal(!showImageModal)}
            className="inline-flex items-center gap-1.5 rounded-md border border-border bg-card px-3 py-1.5 text-xs font-semibold text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors cursor-pointer"
          >
            <ImageIcon className="h-3.5 w-3.5" />
            <span>{showImageModal ? 'Hide Image Drawer' : 'Cloudinary Options'}</span>
          </button>

          <button
            type="button"
            onClick={() => onChange(value ? `${value}\n\n&nbsp;\n\n` : '&nbsp;\n\n')}
            className="inline-flex items-center gap-1.5 rounded-md border border-border bg-card px-2.5 py-1.5 text-xs font-semibold text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors cursor-pointer"
            title="Add empty line space between sections"
          >
            <Plus className="h-3.5 w-3.5 text-[#0070f3]" />
            <span>+ Section Gap Space</span>
          </button>

          <input
            ref={fileInputRef}
            type="file"
            accept="image/jpeg,image/png,image/webp,image/avif"
            onChange={handleFileSelect}
            className="hidden"
          />
        </div>

        <p className="text-[11px] text-muted-foreground font-mono hidden md:block">
          💡 Tip: You can paste (<kbd className="font-sans px-1 rounded bg-muted">Ctrl+V</kbd>) or drag images directly into the editor body!
        </p>
      </div>

      {/* Progress & Error Feedback */}
      {isUploading && (
        <div className="flex items-center gap-3 p-3 rounded-lg border border-blue-500/30 bg-blue-500/10 text-blue-400 text-xs">
          <Loader2 className="h-4 w-4 animate-spin shrink-0 text-[#0070f3]" />
          <div className="flex-1 space-y-1">
            <div className="flex items-center justify-between font-semibold">
              <span>Uploading image to Cloudinary…</span>
              <span>{uploadProgress}%</span>
            </div>
            <div className="h-1.5 w-full bg-secondary rounded-full overflow-hidden">
              <div className="h-full bg-[#0070f3] transition-all duration-200" style={{ width: `${uploadProgress}%` }} />
            </div>
          </div>
        </div>
      )}

      {uploadError && (
        <div className="p-3 rounded-lg border border-red-500/30 bg-red-500/10 text-red-500 text-xs flex items-center justify-between">
          <span>Upload failed: {uploadError}</span>
          <button type="button" onClick={() => setUploadError('')} className="text-red-400 hover:text-red-300">
            <X className="h-3.5 w-3.5" />
          </button>
        </div>
      )}

      {/* Cloudinary Full Modal / Drawer */}
      {showImageModal && (
        <div className="rounded-xl border border-border bg-card p-4 space-y-3 shadow-md">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#0070f3]" />
              <h4 className="text-xs font-bold uppercase tracking-wider text-foreground">
                Cloudinary Media Uploader for Article Body
              </h4>
            </div>
            <button
              type="button"
              onClick={() => setShowImageModal(false)}
              className="text-muted-foreground hover:text-foreground p-1"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          <ImageUpload
            value={uploadedUrl}
            onChange={setUploadedUrl}
            folder={folder}
            altText={altText}
            onAltTextChange={setAltText}
            showAltInput={true}
          />

          {uploadedUrl && (
            <button
              type="button"
              onClick={handleManualInsert}
              className="inline-flex items-center gap-1.5 rounded-lg bg-[#0070f3] hover:bg-blue-600 px-4 py-2 text-xs font-bold text-white transition-colors cursor-pointer shadow-sm"
            >
              <Plus className="h-4 w-4" />
              <span>Insert Image into Writing Body</span>
            </button>
          )}
        </div>
      )}

      {/* Editor Workspace */}
      <div
        data-color-mode={colorMode}
        onPaste={handlePaste}
        onDrop={handleDrop}
        className="overflow-hidden rounded-xl border border-border/80 shadow-2xs"
      >
        <MDEditor
          value={value}
          onChange={(v) => onChange(v ?? '')}
          height={height}
          preview="live"
          visibleDragbar={false}
          textareaProps={{
            placeholder: `${placeholder}\n\n(Tip: Paste images from clipboard or drop files here directly to upload to Cloudinary)`,
          }}
        />
      </div>
    </div>
  )
}
