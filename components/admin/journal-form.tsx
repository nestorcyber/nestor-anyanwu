'use client'

import { FormEvent, useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { slugify } from '@/lib/utils/slug'
import ImageUpload from '@/components/admin/image-upload'
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
    const payload = {
      title,
      slug: slug || slugify(title),
      excerpt,
      cover_image: coverImage || null,
      category,
      tags: tags
        .split(',')
        .map((t) => t.trim())
        .filter(Boolean),
      featured,
      pinned,
      draft,
      published_date: publishedDate || null,
      author,
      seo_title: seoTitle || null,
      seo_description: seoDescription || null,
      content,
    }

    const res = initial
      ? await supabase.from('journal_articles').update(payload).eq('id', initial.id)
      : await supabase.from('journal_articles').insert(payload)

    if (res.error) {
      setError(res.error.message)
      setSaving(false)
      return
    }
    router.push('/admin/journal')
    router.refresh()
  }

  async function onDelete() {
    if (!initial || !confirm('Delete this article?')) return
    const supabase = createClient()
    await supabase.from('journal_articles').delete().eq('id', initial.id)
    router.push('/admin/journal')
    router.refresh()
  }

  return (
    <form onSubmit={onSubmit} className="max-w-3xl space-y-5">
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
      <Field label="Published date">
        <TextInput type="date" value={publishedDate || ''} onChange={(e) => setPublishedDate(e.target.value)} />
      </Field>
      <Field label="Author">
        <TextInput value={author} onChange={(e) => setAuthor(e.target.value)} />
      </Field>
      <Field label="SEO title">
        <TextInput value={seoTitle} onChange={(e) => setSeoTitle(e.target.value)} />
      </Field>
      <Field label="SEO description">
        <TextTextarea value={seoDescription} onChange={(e) => setSeoDescription(e.target.value)} />
      </Field>
      <Field label="Content (Markdown)">
        <TextTextarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="min-h-[280px] font-mono"
        />
      </Field>
      <div className="flex flex-wrap gap-4">
        <Checkbox label="Featured" checked={featured} onChange={setFeatured} />
        <Checkbox label="Pinned" checked={pinned} onChange={setPinned} />
        <Checkbox label="Draft" checked={draft} onChange={setDraft} />
      </div>
      {error ? <p className="text-sm text-red-400">{error}</p> : null}
      <div className="flex gap-3">
        <PrimaryButton type="submit" disabled={saving}>
          {saving ? 'Saving…' : 'Save'}
        </PrimaryButton>
        {initial ? (
          <DangerButton type="button" onClick={onDelete}>
            Delete
          </DangerButton>
        ) : null}
      </div>
    </form>
  )
}
