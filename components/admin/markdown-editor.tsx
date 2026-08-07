'use client'

import { useState } from 'react'
import dynamic from 'next/dynamic'
import { useTheme } from 'next-themes'
import ImageUpload from '@/components/admin/image-upload'
import { Image as ImageIcon, Plus, X } from 'lucide-react'
import '@uiw/react-md-editor/markdown-editor.css'
import '@uiw/react-markdown-preview/markdown.css'

const MDEditor = dynamic(() => import('@uiw/react-md-editor'), {
  ssr: false,
  loading: () => (
    <div className="flex min-h-[280px] items-center justify-center border border-border bg-background text-sm text-muted-foreground">
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
  height = 360,
  placeholder = 'Write content…',
  folder = 'editor',
}: Props) {
  const { resolvedTheme } = useTheme()
  const colorMode = resolvedTheme === 'dark' ? 'dark' : 'light'
  const [showImageModal, setShowImageModal] = useState(false)
  const [uploadedUrl, setUploadedUrl] = useState('')
  const [altText, setAltText] = useState('')

  const handleInsertImage = () => {
    if (!uploadedUrl) return
    const imageMarkdown = `\n![${altText || 'Image'}](${uploadedUrl})\n`
    onChange(value + imageMarkdown)
    setUploadedUrl('')
    setAltText('')
    setShowImageModal(false)
  }

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={() => setShowImageModal(!showImageModal)}
          className="inline-flex items-center gap-1.5 rounded border border-border bg-secondary/60 px-2.5 py-1 text-xs font-medium text-foreground hover:bg-secondary transition-colors"
        >
          <ImageIcon className="h-3.5 w-3.5" />
          {showImageModal ? 'Close Uploader' : 'Insert Cloudinary Image'}
        </button>
      </div>

      {showImageModal && (
        <div className="rounded-md border border-border bg-card p-4 space-y-3 shadow-sm">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Upload Image into Content
            </h4>
            <button
              type="button"
              onClick={() => setShowImageModal(false)}
              className="text-muted-foreground hover:text-foreground"
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
              onClick={handleInsertImage}
              className="inline-flex items-center gap-1.5 rounded bg-primary px-3 py-1.5 text-xs font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
            >
              <Plus className="h-3.5 w-3.5" />
              Insert into Article Content
            </button>
          )}
        </div>
      )}

      <div data-color-mode={colorMode} className="overflow-hidden rounded-sm border border-border">
        <MDEditor
          value={value}
          onChange={(v) => onChange(v ?? '')}
          height={height}
          preview="live"
          visibleDragbar={false}
          textareaProps={{ placeholder }}
        />
      </div>
    </div>
  )
}
