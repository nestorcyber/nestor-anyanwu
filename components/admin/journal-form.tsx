'use client'

import { FormEvent, useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { slugify } from '@/lib/utils/slug'
import ImageUpload from '@/components/admin/image-upload'
import MarkdownEditor from '@/components/admin/markdown-editor'
import { logAdminActivity } from '@/lib/admin-activity'
import { revalidateJournal } from '@/app/actions/revalidate'
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

  async function onSubmit(e: FormEvent) {
    e.preventDefault()
    setSaving(true)
    setError('')
    const supabase = createClient()
    const targetSlug = slug || slugify(title)
    const payload = {
      title,
      slug: targetSlug,
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

    try {
      let res
      if (initial?.id) {
        res = await supabase.from('journal_articles').update(payload).eq('id', initial.id)
      } else if (initial?.slug) {
        res = await supabase.from('journal_articles').update(payload).eq('slug', initial.slug)
      } else {
        res = await supabase.from('journal_articles').insert(payload)
      }

      if (res.error && initial) {
        res = await supabase.from('journal_articles').upsert(payload, { onConflict: 'slug' })
      }

      if (res.error && res.error.message.includes('scheduled_at')) {
        delete (payload as Record<string, unknown>).scheduled_at
        if (initial?.id) {
          res = await supabase.from('journal_articles').update(payload).eq('id', initial.id)
        } else {
          res = await supabase.from('journal_articles').upsert(payload, { onConflict: 'slug' })
        }
      }

      if (res.error) {
        setError(res.error.message)
        return
      }

      await revalidateJournal(targetSlug)
      await logAdminActivity(initial ? 'Updated Post' : 'Created Post', 'journal_articles', initial?.id || targetSlug, `Title: ${title}`)

      router.push('/admin/journal')
      router.refresh()
    } catch (err: any) {
      setError(err?.message || 'Failed to save article.')
    } finally {
      setSaving(false)
    }
  }

  async function onDelete() {
    if (!initial || !confirm('Delete this article?')) return
    setSaving(true)
    try {
      const supabase = createClient()
      if (initial.id) {
        await supabase.from('journal_articles').delete().eq('id', initial.id)
      } else if (initial.slug) {
        await supabase.from('journal_articles').delete().eq('slug', initial.slug)
      }
      await revalidateJournal(initial.slug)
      await logAdminActivity('Deleted Post', 'journal_articles', initial.id || initial.slug, `Title: ${title}`)
      router.push('/admin/journal')
      router.refresh()
    } catch (err: any) {
      setError(err?.message || 'Failed to delete article.')
    } finally {
      setSaving(false)
    }
  }

  async function onDuplicate() {
    setTitle(`${title} (Copy)`)
    setSlug(`${slug}-copy`)
    setDraft(true)
  }

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      {/* Sticky Action Buttons at Top Right (No full bar) */}
      <div className="sticky top-14 md:top-16 z-20 flex justify-end">
        <div className="flex items-center gap-3">
          {initial && (
            <button
              type="button"
              onClick={onDuplicate}
              className="px-3 py-1.5 text-xs font-semibold rounded-lg border border-border bg-card hover:bg-secondary text-foreground transition-colors cursor-pointer shadow-2xs"
            >
              Duplicate
            </button>
          )}
          {initial && (
            <button
              type="button"
              onClick={onDelete}
              className="px-3 py-1.5 text-xs font-semibold rounded-lg border border-red-500/30 bg-red-500/10 text-red-500 hover:bg-red-500/20 transition-colors cursor-pointer shadow-2xs"
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
