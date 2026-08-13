'use client'

import { useState, useRef, useEffect } from 'react'
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Underline from '@tiptap/extension-underline'
import LinkExtension from '@tiptap/extension-link'
import TextAlign from '@tiptap/extension-text-align'
import ImageExtension from '@tiptap/extension-image'
import { validateImageFile, getOptimizedImageUrl } from '@/lib/cloudinary'
import {
  Bold,
  Italic,
  Underline as UnderlineIcon,
  Strikethrough,
  Code,
  List,
  ListOrdered,
  Quote,
  Minus,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  Link as LinkIcon,
  Unlink,
  Image as ImageIcon,
  Upload,
  Undo,
  Redo,
  X,
  Loader2,
  Sparkles,
  Heading1,
  Heading2,
  Heading3,
  Heading4,
  Pilcrow,
  FileCode,
} from 'lucide-react'

// Convert legacy markdown or plain text paragraphs to clean HTML for Tiptap
function ensureHtmlContent(raw: string): string {
  if (!raw) return ''
  const trimmed = raw.trim()
  if (trimmed.startsWith('<') && trimmed.endsWith('>')) {
    return raw
  }

  // Basic conversion for legacy markdown articles
  return raw
    .split(/\n{2,}/)
    .map((block) => {
      const b = block.trim()
      if (!b) return ''
      if (b.startsWith('# ')) return `<h1>${b.slice(2)}</h1>`
      if (b.startsWith('## ')) return `<h2>${b.slice(3)}</h2>`
      if (b.startsWith('### ')) return `<h3>${b.slice(4)}</h3>`
      if (b.startsWith('#### ')) return `<h4>${b.slice(5)}</h4>`
      if (b.startsWith('> ')) return `<blockquote><p>${b.slice(2)}</p></blockquote>`
      if (b.startsWith('![') && b.includes('](')) {
        const alt = b.slice(2, b.indexOf(']('))
        const src = b.slice(b.indexOf('](') + 2, b.lastIndexOf(')'))
        return `<img src="${src}" alt="${alt}" />`
      }
      return `<p>${b.replace(/\n/g, '<br />')}</p>`
    })
    .join('')
}

type Props = {
  value: string
  onChange: (html: string) => void
  height?: number
  placeholder?: string
  folder?: string
}

export default function RichTextEditor({
  value,
  onChange,
  height = 500,
  placeholder = 'Write your article here… Press Enter for a new paragraph.',
  folder = 'journal',
}: Props) {
  const [showImageModal, setShowImageModal] = useState(false)
  const [showLinkModal, setShowLinkModal] = useState(false)
  const [linkUrl, setLinkUrl] = useState('')
  const [uploadedUrl, setUploadedUrl] = useState('')
  const [altText, setAltText] = useState('')
  const [isUploading, setIsUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [uploadError, setUploadError] = useState('')
  const fileInputRef = useRef<HTMLInputElement>(null)

  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3, 4],
        },
      }),
      Underline,
      LinkExtension.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: 'text-[#0070f3] underline font-semibold hover:text-blue-600 transition-colors',
          target: '_blank',
          rel: 'noopener noreferrer',
        },
      }),
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
      ImageExtension.configure({
        inline: false,
        HTMLAttributes: {
          class: 'rounded-xl max-w-full my-6 border border-border/80 shadow-md mx-auto block',
        },
      }),
    ],
    content: ensureHtmlContent(value),
    onUpdate: ({ editor }: { editor: any }) => {
      onChange(editor.getHTML())
    },
    editorProps: {
      attributes: {
        class:
          'article-editor-content focus:outline-none min-h-[380px] p-4 sm:p-6 text-foreground font-light text-base leading-relaxed',
      },
    },
  })

  // Synchronize initial value if changed externally (e.g. loaded async post)
  useEffect(() => {
    if (editor && value !== editor.getHTML()) {
      const currentHtml = editor.getHTML()
      const formattedInput = ensureHtmlContent(value)
      if (formattedInput && formattedInput !== currentHtml && editor.isEmpty) {
        editor.commands.setContent(formattedInput)
      }
    }
  }, [value, editor])

  const uploadToCloudinary = async (file: File): Promise<string> => {
    const validation = validateImageFile(file)
    if (!validation.valid) {
      throw new Error(validation.error || 'Invalid image file')
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
      if (!sigRes.ok) throw new Error(sig.error || 'Failed to generate upload signature')

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

  const handleInsertImage = (url: string, alt = '') => {
    if (!editor) return
    const optimized = getOptimizedImageUrl(url, { width: 1200, quality: 'auto' })
    editor.chain().focus().setImage({ src: optimized, alt: alt || 'Article Image' }).run()
  }

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files && files[0]) {
      try {
        setUploadError('')
        const url = await uploadToCloudinary(files[0])
        handleInsertImage(url, files[0].name.replace(/\.[^/.]+$/, ''))
      } catch (err) {
        setUploadError(err instanceof Error ? err.message : 'Upload failed')
      }
    }
    if (e.target) e.target.value = ''
  }

  const setLink = () => {
    if (!editor) return
    if (!linkUrl) {
      editor.chain().focus().extendMarkRange('link').unsetLink().run()
      setShowLinkModal(false)
      return
    }

    const formattedUrl = linkUrl.startsWith('http://') || linkUrl.startsWith('https://') ? linkUrl : `https://${linkUrl}`
    editor.chain().focus().extendMarkRange('link').setLink({ href: formattedUrl }).run()
    setLinkUrl('')
    setShowLinkModal(false)
  }

  if (!editor) {
    return (
      <div className="flex min-h-[300px] items-center justify-center border border-border bg-background text-sm text-muted-foreground rounded-xl">
        Loading editor…
      </div>
    )
  }

  return (
    <div className="space-y-3">
      {/* Sticky Rich Text Formatting Toolbar */}
      <div className="sticky top-28 z-10 flex flex-wrap items-center gap-1 p-2 rounded-xl border border-border/90 bg-card/95 backdrop-blur shadow-2xs">
        {/* Text Formatting Group */}
        <div className="flex items-center gap-0.5 border-r border-border/70 pr-1.5 mr-1">
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleBold().run()}
            className={`p-1.5 rounded-lg text-xs font-bold transition-all ${
              editor.isActive('bold')
                ? 'bg-[#0070f3] text-white shadow-xs'
                : 'text-muted-foreground hover:bg-secondary hover:text-foreground'
            }`}
            title="Bold (Ctrl+B)"
          >
            <Bold className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleItalic().run()}
            className={`p-1.5 rounded-lg text-xs font-bold transition-all ${
              editor.isActive('italic')
                ? 'bg-[#0070f3] text-white shadow-xs'
                : 'text-muted-foreground hover:bg-secondary hover:text-foreground'
            }`}
            title="Italic (Ctrl+I)"
          >
            <Italic className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleUnderline().run()}
            className={`p-1.5 rounded-lg text-xs font-bold transition-all ${
              editor.isActive('underline')
                ? 'bg-[#0070f3] text-white shadow-xs'
                : 'text-muted-foreground hover:bg-secondary hover:text-foreground'
            }`}
            title="Underline (Ctrl+U)"
          >
            <UnderlineIcon className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleStrike().run()}
            className={`p-1.5 rounded-lg text-xs font-bold transition-all ${
              editor.isActive('strike')
                ? 'bg-[#0070f3] text-white shadow-xs'
                : 'text-muted-foreground hover:bg-secondary hover:text-foreground'
            }`}
            title="Strikethrough"
          >
            <Strikethrough className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleCode().run()}
            className={`p-1.5 rounded-lg text-xs font-bold transition-all ${
              editor.isActive('code')
                ? 'bg-[#0070f3] text-white shadow-xs'
                : 'text-muted-foreground hover:bg-secondary hover:text-foreground'
            }`}
            title="Inline Code"
          >
            <Code className="w-4 h-4" />
          </button>
        </div>

        {/* Headings & Block Types */}
        <div className="flex items-center gap-0.5 border-r border-border/70 pr-1.5 mr-1">
          <button
            type="button"
            onClick={() => editor.chain().focus().setParagraph().run()}
            className={`p-1.5 rounded-lg text-xs font-bold transition-all ${
              editor.isActive('paragraph') && !editor.isActive('heading')
                ? 'bg-[#0070f3] text-white shadow-xs'
                : 'text-muted-foreground hover:bg-secondary hover:text-foreground'
            }`}
            title="Normal Paragraph"
          >
            <Pilcrow className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
            className={`p-1.5 rounded-lg text-xs font-extrabold transition-all ${
              editor.isActive('heading', { level: 1 })
                ? 'bg-[#0070f3] text-white shadow-xs'
                : 'text-muted-foreground hover:bg-secondary hover:text-foreground'
            }`}
            title="Heading 1"
          >
            <Heading1 className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
            className={`p-1.5 rounded-lg text-xs font-extrabold transition-all ${
              editor.isActive('heading', { level: 2 })
                ? 'bg-[#0070f3] text-white shadow-xs'
                : 'text-muted-foreground hover:bg-secondary hover:text-foreground'
            }`}
            title="Heading 2"
          >
            <Heading2 className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
            className={`p-1.5 rounded-lg text-xs font-extrabold transition-all ${
              editor.isActive('heading', { level: 3 })
                ? 'bg-[#0070f3] text-white shadow-xs'
                : 'text-muted-foreground hover:bg-secondary hover:text-foreground'
            }`}
            title="Heading 3"
          >
            <Heading3 className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleHeading({ level: 4 }).run()}
            className={`p-1.5 rounded-lg text-xs font-extrabold transition-all ${
              editor.isActive('heading', { level: 4 })
                ? 'bg-[#0070f3] text-white shadow-xs'
                : 'text-muted-foreground hover:bg-secondary hover:text-foreground'
            }`}
            title="Heading 4"
          >
            <Heading4 className="w-4 h-4" />
          </button>
        </div>

        {/* Lists & Quotes */}
        <div className="flex items-center gap-0.5 border-r border-border/70 pr-1.5 mr-1">
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            className={`p-1.5 rounded-lg text-xs font-bold transition-all ${
              editor.isActive('bulletList')
                ? 'bg-[#0070f3] text-white shadow-xs'
                : 'text-muted-foreground hover:bg-secondary hover:text-foreground'
            }`}
            title="Bullet List"
          >
            <List className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            className={`p-1.5 rounded-lg text-xs font-bold transition-all ${
              editor.isActive('orderedList')
                ? 'bg-[#0070f3] text-white shadow-xs'
                : 'text-muted-foreground hover:bg-secondary hover:text-foreground'
            }`}
            title="Numbered List"
          >
            <ListOrdered className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleBlockquote().run()}
            className={`p-1.5 rounded-lg text-xs font-bold transition-all ${
              editor.isActive('blockquote')
                ? 'bg-[#0070f3] text-white shadow-xs'
                : 'text-muted-foreground hover:bg-secondary hover:text-foreground'
            }`}
            title="Blockquote"
          >
            <Quote className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleCodeBlock().run()}
            className={`p-1.5 rounded-lg text-xs font-bold transition-all ${
              editor.isActive('codeBlock')
                ? 'bg-[#0070f3] text-white shadow-xs'
                : 'text-muted-foreground hover:bg-secondary hover:text-foreground'
            }`}
            title="Code Block"
          >
            <FileCode className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().setHorizontalRule().run()}
            className="p-1.5 rounded-lg text-xs font-bold text-muted-foreground hover:bg-secondary hover:text-foreground transition-all"
            title="Horizontal Divider Line"
          >
            <Minus className="w-4 h-4" />
          </button>
        </div>

        {/* Text Alignment */}
        <div className="flex items-center gap-0.5 border-r border-border/70 pr-1.5 mr-1">
          <button
            type="button"
            onClick={() => editor.chain().focus().setTextAlign('left').run()}
            className={`p-1.5 rounded-lg text-xs font-bold transition-all ${
              editor.isActive({ textAlign: 'left' })
                ? 'bg-[#0070f3] text-white shadow-xs'
                : 'text-muted-foreground hover:bg-secondary hover:text-foreground'
            }`}
            title="Align Left"
          >
            <AlignLeft className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().setTextAlign('center').run()}
            className={`p-1.5 rounded-lg text-xs font-bold transition-all ${
              editor.isActive({ textAlign: 'center' })
                ? 'bg-[#0070f3] text-white shadow-xs'
                : 'text-muted-foreground hover:bg-secondary hover:text-foreground'
            }`}
            title="Align Center"
          >
            <AlignCenter className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().setTextAlign('right').run()}
            className={`p-1.5 rounded-lg text-xs font-bold transition-all ${
              editor.isActive({ textAlign: 'right' })
                ? 'bg-[#0070f3] text-white shadow-xs'
                : 'text-muted-foreground hover:bg-secondary hover:text-foreground'
            }`}
            title="Align Right"
          >
            <AlignRight className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().setTextAlign('justify').run()}
            className={`p-1.5 rounded-lg text-xs font-bold transition-all ${
              editor.isActive({ textAlign: 'justify' })
                ? 'bg-[#0070f3] text-white shadow-xs'
                : 'text-muted-foreground hover:bg-secondary hover:text-foreground'
            }`}
            title="Justify Text"
          >
            <AlignJustify className="w-4 h-4" />
          </button>
        </div>

        {/* Links & Cloudinary Image Upload */}
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => {
              const previousUrl = editor.getAttributes('link').href
              setLinkUrl(previousUrl || '')
              setShowLinkModal(true)
            }}
            className={`p-1.5 rounded-lg text-xs font-bold transition-all ${
              editor.isActive('link')
                ? 'bg-[#0070f3] text-white shadow-xs'
                : 'text-muted-foreground hover:bg-secondary hover:text-foreground'
            }`}
            title="Insert Link"
          >
            <LinkIcon className="w-4 h-4" />
          </button>

          {editor.isActive('link') && (
            <button
              type="button"
              onClick={() => editor.chain().focus().unsetLink().run()}
              className="p-1.5 rounded-lg text-xs font-bold text-muted-foreground hover:bg-red-500/10 hover:text-red-500 transition-all"
              title="Remove Link"
            >
              <Unlink className="w-4 h-4" />
            </button>
          )}

          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            disabled={isUploading}
            className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-card px-2.5 py-1.5 text-xs font-bold text-foreground hover:bg-secondary transition-colors shadow-2xs cursor-pointer ml-1"
            title="Upload image directly to article body"
          >
            <Upload className="w-3.5 h-3.5 text-[#0070f3]" />
            <span>Upload Image</span>
          </button>

          <input
            ref={fileInputRef}
            type="file"
            accept="image/jpeg,image/png,image/webp,image/avif"
            onChange={handleFileSelect}
            className="hidden"
          />
        </div>

        {/* Undo / Redo */}
        <div className="flex items-center gap-0.5 ml-auto">
          <button
            type="button"
            onClick={() => editor.chain().focus().undo().run()}
            disabled={!editor.can().undo()}
            className="p-1.5 rounded-lg text-xs text-muted-foreground hover:bg-secondary hover:text-foreground disabled:opacity-30 transition-all"
            title="Undo"
          >
            <Undo className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().redo().run()}
            disabled={!editor.can().redo()}
            className="p-1.5 rounded-lg text-xs text-muted-foreground hover:bg-secondary hover:text-foreground disabled:opacity-30 transition-all"
            title="Redo"
          >
            <Redo className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Cloudinary Progress & Errors */}
      {isUploading && (
        <div className="flex items-center gap-3 p-3 rounded-xl border border-blue-500/30 bg-blue-500/10 text-blue-400 text-xs">
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
        <div className="p-3 rounded-xl border border-red-500/30 bg-red-500/10 text-red-500 text-xs flex items-center justify-between">
          <span>Upload error: {uploadError}</span>
          <button type="button" onClick={() => setUploadError('')} className="text-red-400 hover:text-red-300">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Link Input Modal */}
      {showLinkModal && (
        <div className="p-3 rounded-xl border border-border bg-card shadow-lg flex items-center gap-2 max-w-md">
          <input
            type="url"
            placeholder="https://example.com"
            value={linkUrl}
            onChange={(e) => setLinkUrl(e.target.value)}
            className="flex-1 px-3 py-1.5 text-xs rounded-lg border border-border bg-background text-foreground focus:outline-none focus:border-[#0070f3]"
          />
          <button
            type="button"
            onClick={setLink}
            className="px-3 py-1.5 text-xs font-bold bg-[#0070f3] text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            Apply Link
          </button>
          <button
            type="button"
            onClick={() => setShowLinkModal(false)}
            className="p-1.5 text-muted-foreground hover:text-foreground"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Tiptap Visual Canvas */}
      <div className="border border-border/80 rounded-2xl bg-card overflow-hidden shadow-2xs">
        <EditorContent editor={editor} />
      </div>

      <style jsx global>{`
        .article-editor-content p {
          margin-bottom: 1.25rem;
          line-height: 1.75;
        }
        .article-editor-content h1 {
          font-size: 2.25rem;
          font-weight: 800;
          margin-top: 2rem;
          margin-bottom: 1rem;
          line-height: 1.2;
        }
        .article-editor-content h2 {
          font-size: 1.75rem;
          font-weight: 800;
          margin-top: 1.75rem;
          margin-bottom: 0.85rem;
          line-height: 1.25;
        }
        .article-editor-content h3 {
          font-size: 1.35rem;
          font-weight: 700;
          margin-top: 1.5rem;
          margin-bottom: 0.75rem;
        }
        .article-editor-content h4 {
          font-size: 1.1rem;
          font-weight: 700;
          margin-top: 1.25rem;
          margin-bottom: 0.5rem;
        }
        .article-editor-content blockquote {
          border-left: 4px solid #0070f3;
          padding-left: 1rem;
          font-style: italic;
          margin-top: 1.25rem;
          margin-bottom: 1.25rem;
          opacity: 0.9;
        }
        .article-editor-content ul {
          list-style-type: disc;
          padding-left: 1.5rem;
          margin-bottom: 1.25rem;
        }
        .article-editor-content ol {
          list-style-type: decimal;
          padding-left: 1.5rem;
          margin-bottom: 1.25rem;
        }
        .article-editor-content pre {
          background-color: rgba(15, 23, 42, 0.9);
          color: #f8fafc;
          padding: 1rem;
          border-radius: 0.75rem;
          font-family: monospace;
          margin-top: 1.25rem;
          margin-bottom: 1.25rem;
          overflow-x: auto;
        }
        .article-editor-content hr {
          border: none;
          border-top: 1px solid var(--border);
          margin-top: 2rem;
          margin-bottom: 2rem;
        }
      `}</style>
    </div>
  )
}
