'use client'

import { useState, useRef, DragEvent, ChangeEvent } from 'react'
import { validateImageFile, getOptimizedImageUrl } from '@/lib/cloudinary'
import { Upload, X, RefreshCw, Image as ImageIcon, AlertCircle } from 'lucide-react'

type ImageUploaderProps = {
  label?: string
  value: string
  onChange: (url: string) => void
  folder?: string
  altText?: string
  onAltTextChange?: (alt: string) => void
  showAltInput?: boolean
  className?: string
}

export default function ImageUpload({
  label = 'Image',
  value,
  onChange,
  folder = 'uploads',
  altText = '',
  onAltTextChange,
  showAltInput = false,
  className = '',
}: ImageUploaderProps) {
  const [uploading, setUploading] = useState(false)
  const [progress, setProgress] = useState(0)
  const [error, setError] = useState('')
  const [isDragOver, setIsDragOver] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleUpload = async (file: File) => {
    setError('')
    const validation = validateImageFile(file)
    if (!validation.valid) {
      setError(validation.error || 'Invalid file')
      return
    }

    setUploading(true)
    setProgress(0)

    try {
      // Step 1: Request signature from application server
      const sigRes = await fetch('/api/admin/upload', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ folder }),
      })

      const rawText = await sigRes.text()
      let sig: any = {}
      try {
        sig = rawText ? JSON.parse(rawText) : {}
      } catch {
        throw new Error(`Server returned non-JSON response (${sigRes.status}). Please verify environment configuration.`)
      }

      if (!sigRes.ok) {
        throw new Error(sig.error || `Failed to generate upload signature (HTTP ${sigRes.status})`)
      }

      // Step 2: Prepare FormData for direct Cloudinary upload
      const formData = new FormData()
      formData.append('file', file)
      formData.append('api_key', sig.apiKey)
      formData.append('timestamp', String(sig.timestamp))
      formData.append('signature', sig.signature)
      formData.append('folder', sig.folder)

      // Step 3: Direct XHR Upload to Cloudinary with real progress tracking
      await new Promise<void>((resolve, reject) => {
        const xhr = new XMLHttpRequest()
        const uploadUrl = `https://api.cloudinary.com/v1_1/${sig.cloudName}/image/upload`

        xhr.upload.addEventListener('progress', (event) => {
          if (event.lengthComputable) {
            const percent = Math.round((event.loaded / event.total) * 100)
            setProgress(percent)
          }
        })

        xhr.addEventListener('load', () => {
          if (xhr.status >= 200 && xhr.status < 300) {
            try {
              const res = JSON.parse(xhr.responseText)
              if (res.secure_url) {
                onChange(res.secure_url)
                resolve()
              } else {
                reject(new Error('Cloudinary response missing URL'))
              }
            } catch (e) {
              reject(new Error('Failed to parse Cloudinary response'))
            }
          } else {
            try {
              const errRes = JSON.parse(xhr.responseText)
              reject(new Error(errRes.error?.message || 'Upload failed'))
            } catch {
              reject(new Error(`Upload failed with HTTP ${xhr.status}`))
            }
          }
        })

        xhr.addEventListener('error', () => {
          reject(new Error('Network error during upload. Please check your connection.'))
        })

        xhr.addEventListener('abort', () => {
          reject(new Error('Upload was aborted.'))
        })

        xhr.open('POST', uploadUrl)
        xhr.send(formData)
      })
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred during upload')
    } finally {
      setUploading(false)
      setProgress(0)
    }
  }

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files && files[0]) {
      handleUpload(files[0])
    }
    // reset input so re-selecting same file triggers change
    if (e.target) e.target.value = ''
  }

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragOver(true)
  }

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragOver(false)
  }

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragOver(false)

    const files = e.dataTransfer.files
    if (files && files[0]) {
      handleUpload(files[0])
    }
  }

  const handleRemove = () => {
    onChange('')
    setError('')
  }

  const previewUrl = value ? getOptimizedImageUrl(value, { width: 600, quality: 'auto' }) : ''

  return (
    <div className={`space-y-3 ${className}`}>
      {label ? (
        <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          {label}
        </label>
      ) : null}

      {/* Screen Reader ARIA Live Region */}
      <div className="sr-only" aria-live="polite">
        {uploading ? `Uploading image, ${progress}% completed.` : null}
        {error ? `Upload error: ${error}` : null}
        {value ? 'Image uploaded successfully.' : null}
      </div>

      {value ? (
        // SUCCESS & PREVIEW STATE
        <div className="group relative overflow-hidden rounded-md border border-border bg-card p-2 transition-all">
          <div className="relative aspect-video w-full max-h-56 overflow-hidden rounded border border-border/50 bg-neutral-900/50 flex items-center justify-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={previewUrl}
              alt={altText || 'Uploaded preview'}
              className="h-full w-full object-contain"
            />
          </div>

          <div className="mt-3 flex flex-wrap items-center justify-between gap-2 border-t border-border/40 pt-2">
            <div className="truncate text-xs text-muted-foreground max-w-[70%]" title={value}>
              {value}
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                disabled={uploading}
                className="inline-flex items-center gap-1.5 rounded px-2.5 py-1 text-xs font-medium text-foreground bg-secondary hover:bg-secondary/80 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                title="Replace image"
              >
                <RefreshCw className="h-3.5 w-3.5" />
                Replace
              </button>
              <button
                type="button"
                onClick={handleRemove}
                disabled={uploading}
                className="inline-flex items-center gap-1.5 rounded px-2.5 py-1 text-xs font-medium text-destructive bg-destructive/10 hover:bg-destructive/20 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                title="Remove image"
              >
                <X className="h-3.5 w-3.5" />
                Remove
              </button>
            </div>
          </div>
        </div>
      ) : (
        // DROPZONE / EMPTY STATE
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => !uploading && fileInputRef.current?.click()}
          tabIndex={0}
          onKeyDown={(e) => {
            if ((e.key === 'Enter' || e.key === ' ') && !uploading) {
              e.preventDefault()
              fileInputRef.current?.click()
            }
          }}
          className={`group relative flex flex-col items-center justify-center rounded-lg border-2 border-dashed p-6 text-center cursor-pointer transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
            isDragOver
              ? 'border-primary bg-primary/10 scale-[1.01]'
              : 'border-border/60 hover:border-primary/60 bg-muted/20 hover:bg-muted/40'
          } ${uploading ? 'pointer-events-none opacity-80' : ''}`}
        >
          {uploading ? (
            <div className="w-full max-w-xs space-y-3 py-2">
              <div className="flex items-center justify-between text-xs font-medium text-foreground">
                <span>Uploading to Cloudinary…</span>
                <span>{progress}%</span>
              </div>
              <div className="h-2 w-full overflow-hidden rounded-full bg-secondary">
                <div
                  className="h-full bg-primary transition-all duration-300 ease-out"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          ) : (
            <>
              <div className="mb-2 rounded-full bg-primary/10 p-3 text-primary group-hover:scale-110 transition-transform">
                <Upload className="h-6 w-6" />
              </div>
              <p className="text-sm font-medium text-foreground">
                Click or drag & drop image to upload
              </p>
              <p className="mt-1 text-xs text-muted-foreground">
                JPG, PNG, WebP, AVIF up to 10MB
              </p>
            </>
          )}
        </div>
      )}

      {/* Hidden File Input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp,image/avif"
        disabled={uploading}
        onChange={handleFileChange}
        className="hidden"
      />

      {/* Manual URL input fallback for full flexibility */}
      <div className="flex items-center gap-2">
        <span className="text-[10px] text-muted-foreground uppercase font-mono tracking-tight shrink-0">
          URL:
        </span>
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="https://res.cloudinary.com/..."
          className="w-full rounded border border-border/50 bg-background px-2.5 py-1 text-xs font-mono text-foreground placeholder:text-muted-foreground/60 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
        />
      </div>

      {/* Optional Alt Text Field */}
      {(showAltInput || onAltTextChange) && (
        <div className="space-y-1 pt-1">
          <label className="block text-[11px] font-medium text-muted-foreground">
            Alt Text (for accessibility & SEO)
          </label>
          <input
            type="text"
            value={altText}
            onChange={(e) => onAltTextChange?.(e.target.value)}
            placeholder="Describe the image..."
            className="w-full rounded border border-border bg-background px-2.5 py-1 text-xs text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
          />
        </div>
      )}

      {/* Error Message Display */}
      {error ? (
        <div className="flex items-center gap-2 text-xs text-destructive bg-destructive/10 p-2.5 rounded border border-destructive/20">
          <AlertCircle className="h-4 w-4 shrink-0" />
          <span>{error}</span>
        </div>
      ) : null}
    </div>
  )
}
