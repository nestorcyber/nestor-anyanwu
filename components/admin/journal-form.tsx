'use client'

import { FormEvent, useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { slugify } from '@/lib/utils/slug'
import ImageUpload from '@/components/admin/image-upload'
import MarkdownEditor from '@/components/admin/markdown-editor'
import { logAdminActivity } from '@/lib/admin-activity'
import {
  Checkbox,
  DangerButton,
  Field,
  PrimaryButton,
  TextInput,
  TextSelect,
  TextTextarea,
} from '@/components/admin/field'
import type { Tables } from '@/lib/supabase/types'

const CATEGORIES = [
  'Technology',
  'Leadership',
  'Community',
  'AI & Data Privacy',
  'Design & Engineering',
]

type Props = { initial?: Tables<'journal_articles'> | null }

export default function JournalForm({ initial }: Props) {
  const router = useRouter()
  const [title, setTitle] = useState(initial?.title ?? '')
  const [slug, setSlug] = useState(initial?.slug ?? '')
  const [excerpt, setExcerpt] = useState(initial?.excerpt ?? '')
  const [coverImage, setCoverImage] = useState(initial?.cover_image ?? '')
  const [category, setCategory] = useState(initial?.category ?? 'Technology')
  const [tags, setTags] = useState((initial?.tags ?? []).join(', '))
  const [featured, setFeatured] = useState(initial?.featured ?? false)
  const [pinned, setPinned] = useState(initial?.pinned ?? false)
  const [draft, setDraft] = useState(initial?.draft ?? false)
  const [publishedDate, setPublishedDate] = useState(initial?.published_date ?? '')
  const [scheduledAt, setScheduledAt] = useState(initial?.scheduled_at ? new Date(initial.scheduled_at).toISOString().slice(0, 16) : '')
  const [author, setAuthor] = useState(initial?.author ?? 'Nestor Anyanwu')
  const [seoTitle, setSeoTitle] = useState(initial?.seo_title ?? '')
  const [seoDescription, setSeoDescription] = useState(initial?.seo_description ?? '')
  const [content, setContent] = useState(initial?.content ?? '')
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  // Determine current Publishing Status Indicator
  let statusBadge = { label: 'Published', class: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30' }
  if (draft) {
    statusBadge = { label: 'Draft', class: 'bg-amber-500/10 text-amber-400 border-amber-500/30' }
  } else if (scheduledAt && new Date(scheduledAt) > new Date()) {
    statusBadge = { label: `Scheduled: ${new Date(scheduledAt).toLocaleString()}`, class: 'bg-sky-500/10 text-sky-400 border-sky-500/30' }
  }

  async function onSubmit(e: FormEvent) {
    e.preventDefault()
    setSaving(true)
    setError('')
    const supabase = createClient()
    const payload = {
      title,
      slug: slug || slugify(title),
      excerpt: excerpt || (content ? content.slice(0, 160) + '…' : ''),
      cover_image: coverImage || null,
      category,
      tags: tags
        .split(',')
        .map((t) => t.trim())
        .filter(Boolean),
      featured,
      pinned,
      draft,
      scheduled_at: scheduledAt ? new Date(scheduledAt).toISOString() : null,
      published_date: publishedDate || new Date().toISOString().split('T')[0],
      author,
      seo_title: seoTitle || title,
      seo_description: seoDescription || excerpt,
      content,
    }

    const initialId = initial?.id
    const isRealUuid = Boolean(initialId && /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/.test(initialId))
    let res = (isRealUuid && initialId)
      ? await supabase.from('journal_articles').update(payload).eq('id', initialId)
      : await supabase.from('journal_articles').insert(payload)

    if (res.error && res.error.message.includes('scheduled_at')) {
      delete (payload as Record<string, unknown>).scheduled_at
      res = (isRealUuid && initialId)
        ? await supabase.from('journal_articles').update(payload).eq('id', initialId)
        : await supabase.from('journal_articles').insert(payload)
    }

    if (res.error) {
      setError(res.error.message)
      setSaving(false)
      return
    }

    // Log admin activity
    const actionName = isRealUuid ? (draft ? 'Updated Draft Post' : 'Updated Post') : 'Created Post'
    await logAdminActivity(actionName, 'journal_articles', initial?.id || payload.slug, `Title: ${title}`)

    router.push('/admin/journal')
    router.refresh()
  }

  async function onDelete() {
    if (!initial || !confirm('Delete this article?')) return
    const supabase = createClient()
    await supabase.from('journal_articles').delete().eq('id', initial.id)
    await logAdminActivity('Deleted Post', 'journal_articles', initial.id, `Title: ${title}`)
    router.push('/admin/journal')
    router.refresh()
  }

  async function onDuplicate() {
    setTitle(`${title} (Copy)`)
    setSlug(`${slug}-copy`)
    setDraft(true)
  }

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      {/* Top Sticky Editorial Action Header Bar */}
      <div className="sticky top-14 md:top-16 z-20 flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 border border-border/80 bg-card/95 backdrop-blur rounded-xl shadow-sm">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => router.push('/admin/journal')}
            className="text-xs font-bold text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-1"
          >
            ← Back to Posts
          </button>
          <span className="h-4 w-[1px] bg-border" />
          <span className={`px-2.5 py-0.5 text-xs font-semibold rounded-full border ${statusBadge.class}`}>
            {statusBadge.label}
          </span>
          {initial?.updated_at && (
            <span className="hidden sm:inline text-xs text-muted-foreground">
              Saved: {new Date(initial.updated_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </span>
          )}
        </div>

        <div className="flex items-center gap-3">
          {initial && (
            <button
              type="button"
              onClick={onDuplicate}
              className="px-3 py-1.5 text-xs font-semibold rounded-lg border border-border bg-secondary hover:bg-secondary/80 text-foreground transition-colors"
            >
              Duplicate
            </button>
          )}
          {initial && (
            <button
              type="button"
              onClick={onDelete}
              className="px-3 py-1.5 text-xs font-semibold rounded-lg border border-red-500/30 bg-red-500/10 text-red-500 hover:bg-red-500/20 transition-colors"
            >
              Delete
            </button>
          )}
          <PrimaryButton type="submit" disabled={saving}>
            {saving ? 'Saving…' : initial ? 'Update Article' : 'Publish Article'}
          </PrimaryButton>
        </div>
      </div>

      {/* Two-Column Editorial Content Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column (Col 1-8): Main Content & Editor */}
        <div className="lg:col-span-8 space-y-6">
          <div className="bg-card border border-border/80 rounded-xl p-5 sm:p-6 shadow-2xs space-y-5">
            <Field label="Title">
              <TextInput
                required
                value={title}
                onChange={(e) => {
                  setTitle(e.target.value)
                  if (!initial) setSlug(slugify(e.target.value))
                }}
                placeholder="Enter post title…"
              />
            </Field>

            <Field label="Slug">
              <TextInput required value={slug} onChange={(e) => setSlug(slugify(e.target.value))} />
            </Field>

            <Field label="Excerpt">
              <TextTextarea
                value={excerpt}
                onChange={(e) => setExcerpt(e.target.value)}
                placeholder="Brief summary of the article…"
              />
            </Field>

            <Field label="Article Content (Full Page Editor)">
              <MarkdownEditor
                value={content}
                onChange={setContent}
                height={580}
                placeholder="Write the full article using Markdown or rich text controls…"
                folder="journal"
              />
            </Field>
          </div>
        </div>

        {/* Right Column (Col 9-12): Publishing, Media, Category, & SEO */}
        <div className="lg:col-span-4 space-y-6">
          {/* Cover Media Panel */}
          <div className="bg-card border border-border/80 rounded-xl p-5 shadow-2xs space-y-4">
            <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-muted-foreground">Featured Cover Image</h3>
            <ImageUpload label="Cover Image" value={coverImage} onChange={setCoverImage} folder="journal" />
          </div>

          {/* Publishing Settings */}
          <div className="bg-card border border-border/80 rounded-xl p-5 shadow-2xs space-y-4">
            <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-muted-foreground">Publishing & Taxonomy</h3>
            
            <Field label="Category">
              <TextSelect value={category} onChange={(e) => setCategory(e.target.value)}>
                {CATEGORIES.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </TextSelect>
            </Field>

            <Field label="Tags (comma-separated)">
              <TextInput value={tags} onChange={(e) => setTags(e.target.value)} placeholder="tech, ai, tutorial" />
            </Field>

            <Field label="Published Date">
              <TextInput type="date" value={publishedDate || ''} onChange={(e) => setPublishedDate(e.target.value)} />
            </Field>

            <Field label="Schedule Publication (Optional)">
              <TextInput type="datetime-local" value={scheduledAt} onChange={(e) => setScheduledAt(e.target.value)} />
            </Field>

            <Field label="Author">
              <TextInput value={author} onChange={(e) => setAuthor(e.target.value)} />
            </Field>

            <div className="space-y-2 pt-2 border-t border-border/70">
              <Checkbox label="Featured Post" checked={featured} onChange={setFeatured} />
              <Checkbox label="Pinned to Top" checked={pinned} onChange={setPinned} />
              <Checkbox label="Save as Draft (Hidden Publicly)" checked={draft} onChange={setDraft} />
            </div>
          </div>

          {/* SEO Metadata */}
          <div className="bg-card border border-border/80 rounded-xl p-5 shadow-2xs space-y-4">
            <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-muted-foreground">Search Engine Optimization</h3>
            
            <Field label="SEO Title (Fallback: Post Title)">
              <TextInput value={seoTitle} onChange={(e) => setSeoTitle(e.target.value)} placeholder={title || 'SEO Title'} />
            </Field>

            <Field label="Meta Description (Fallback: Post Excerpt)">
              <TextTextarea value={seoDescription} onChange={(e) => setSeoDescription(e.target.value)} placeholder={excerpt || 'Meta Description'} />
            </Field>
          </div>

          {error ? <p className="text-sm text-red-500 font-medium">{error}</p> : null}
        </div>
      </div>
    </form>
  )
}
