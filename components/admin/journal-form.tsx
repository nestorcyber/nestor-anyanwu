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

    const isRealUuid = Boolean(initial?.id && /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/.test(initial.id))
    const res = isRealUuid
      ? await supabase.from('journal_articles').update(payload).eq('id', initial.id)
      : await supabase.from('journal_articles').insert(payload)

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
    <form onSubmit={onSubmit} className="max-w-3xl space-y-5">
      <div className="flex items-center justify-between p-3 border border-border bg-card rounded-md">
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono text-muted-foreground uppercase">Status:</span>
          <span className={`px-2.5 py-0.5 text-xs font-semibold rounded border ${statusBadge.class}`}>
            {statusBadge.label}
          </span>
        </div>
        {initial?.updated_at && (
          <span className="text-xs text-muted-foreground">
            Last saved: {new Date(initial.updated_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </span>
        )}
      </div>

      <Field label="Title">
        <TextInput
          required
          value={title}
          onChange={(e) => {
            setTitle(e.target.value)
            if (!initial) setSlug(slugify(e.target.value))
          }}
        />
      </Field>
      <Field label="Slug">
        <TextInput required value={slug} onChange={(e) => setSlug(slugify(e.target.value))} />
      </Field>
      <Field label="Excerpt">
        <TextTextarea value={excerpt} onChange={(e) => setExcerpt(e.target.value)} />
      </Field>
      <ImageUpload label="Cover image" value={coverImage} onChange={setCoverImage} folder="journal" />
      <Field label="Category">
        <TextSelect value={category} onChange={(e) => setCategory(e.target.value)}>
          {CATEGORIES.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </TextSelect>
      </Field>
      <Field label="Tags (comma separated)">
        <TextInput value={tags} onChange={(e) => setTags(e.target.value)} />
      </Field>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Field label="Published Date">
          <TextInput type="date" value={publishedDate || ''} onChange={(e) => setPublishedDate(e.target.value)} />
        </Field>
        <Field label="Schedule Publication (Optional)">
          <TextInput type="datetime-local" value={scheduledAt} onChange={(e) => setScheduledAt(e.target.value)} />
        </Field>
      </div>
      <Field label="Author">
        <TextInput value={author} onChange={(e) => setAuthor(e.target.value)} />
      </Field>
      <Field label="SEO Title (Fallback: Post Title)">
        <TextInput value={seoTitle} onChange={(e) => setSeoTitle(e.target.value)} placeholder={title} />
      </Field>
      <Field label="SEO Description (Fallback: Post Excerpt)">
        <TextTextarea value={seoDescription} onChange={(e) => setSeoDescription(e.target.value)} placeholder={excerpt} />
      </Field>
      <Field label="Content">
        <MarkdownEditor
          value={content}
          onChange={setContent}
          height={420}
          placeholder="Write the full article…"
          folder="journal"
        />
      </Field>
      <div className="flex flex-wrap gap-4 pt-2">
        <Checkbox label="Featured" checked={featured} onChange={setFeatured} />
        <Checkbox label="Pinned" checked={pinned} onChange={setPinned} />
        <Checkbox label="Draft (Hide from Public Website)" checked={draft} onChange={setDraft} />
      </div>
      {error ? <p className="text-sm text-red-400">{error}</p> : null}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-border">
        <div className="flex gap-3">
          <PrimaryButton type="submit" disabled={saving}>
            {saving ? 'Saving…' : initial ? 'Update Post' : 'Create Post'}
          </PrimaryButton>
          {initial && (
            <button
              type="button"
              onClick={onDuplicate}
              className="px-3.5 py-2 text-xs font-semibold border border-border bg-card hover:bg-muted text-foreground transition-colors rounded-none"
            >
              Duplicate
            </button>
          )}
        </div>
        {initial ? (
          <DangerButton type="button" onClick={onDelete}>
            Delete Article
          </DangerButton>
        ) : null}
      </div>
    </form>
  )
}
