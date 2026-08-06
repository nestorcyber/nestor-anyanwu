'use client'

import { FormEvent, useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { slugify } from '@/lib/utils/slug'
import ImageUpload from '@/components/admin/image-upload'
import MarkdownEditor from '@/components/admin/markdown-editor'
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

const CATEGORIES = ['Software', 'Web', 'Design', 'Branding', 'Automation', 'Open Source']
const STATUSES = ['Completed', 'Active', 'Production', 'In Development']

type Props = { initial?: Tables<'portfolio_projects'> | null }

export default function PortfolioForm({ initial }: Props) {
  const router = useRouter()
  const [title, setTitle] = useState(initial?.title ?? '')
  const [slug, setSlug] = useState(initial?.slug ?? '')
  const [shortDescription, setShortDescription] = useState(initial?.short_description ?? '')
  const [coverImage, setCoverImage] = useState(initial?.cover_image ?? '')
  const [gallery, setGallery] = useState((initial?.gallery ?? []).join('\n'))
  const [category, setCategory] = useState(initial?.category ?? 'Software')
  const [technologies, setTechnologies] = useState((initial?.technologies ?? []).join(', '))
  const [status, setStatus] = useState(initial?.status ?? 'Completed')
  const [client, setClient] = useState(initial?.client ?? '')
  const [role, setRole] = useState(initial?.role ?? 'Lead Developer & Designer')
  const [githubUrl, setGithubUrl] = useState(initial?.github_url ?? '')
  const [liveUrl, setLiveUrl] = useState(initial?.live_url ?? '')
  const [caseStudyUrl, setCaseStudyUrl] = useState(initial?.case_study_url ?? '')
  const [featured, setFeatured] = useState(initial?.featured ?? false)
  const [draft, setDraft] = useState(initial?.draft ?? false)
  const [completionDate, setCompletionDate] = useState(initial?.completion_date ?? '')
  const [fullDescription, setFullDescription] = useState(initial?.full_description ?? '')
  const [sortOrder, setSortOrder] = useState(String(initial?.sort_order ?? 0))
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
      short_description: shortDescription,
      cover_image: coverImage || null,
      gallery: gallery
        .split('\n')
        .map((u) => u.trim())
        .filter(Boolean),
      category,
      technologies: technologies
        .split(',')
        .map((t) => t.trim())
        .filter(Boolean),
      status,
      client: client || null,
      role: role || null,
      github_url: githubUrl || null,
      live_url: liveUrl || null,
      case_study_url: caseStudyUrl || null,
      featured,
      draft,
      completion_date: completionDate || null,
      full_description: fullDescription,
      sort_order: Number(sortOrder) || 0,
    }

    const isRealUuid = Boolean(initial?.id && /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/.test(initial.id))
    const res = isRealUuid
      ? await supabase.from('portfolio_projects').update(payload).eq('id', initial.id)
      : await supabase.from('portfolio_projects').insert(payload)

    if (res.error) {
      setError(res.error.message)
      setSaving(false)
      return
    }
    router.push('/admin/portfolio')
    router.refresh()
  }

  async function onDelete() {
    if (!initial || !confirm('Delete this project?')) return
    const supabase = createClient()
    await supabase.from('portfolio_projects').delete().eq('id', initial.id)
    router.push('/admin/portfolio')
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
      <Field label="Short description">
        <TextTextarea value={shortDescription} onChange={(e) => setShortDescription(e.target.value)} />
      </Field>
      <ImageUpload label="Cover image" value={coverImage} onChange={setCoverImage} folder="portfolio" />
      <Field label="Gallery URLs (one per line)">
        <TextTextarea value={gallery} onChange={(e) => setGallery(e.target.value)} />
      </Field>
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Category">
          <TextSelect value={category} onChange={(e) => setCategory(e.target.value)}>
            {CATEGORIES.map((c) => (
              <option key={c}>{c}</option>
            ))}
          </TextSelect>
        </Field>
        <Field label="Status">
          <TextSelect value={status} onChange={(e) => setStatus(e.target.value)}>
            {STATUSES.map((s) => (
              <option key={s}>{s}</option>
            ))}
          </TextSelect>
        </Field>
      </div>
      <Field label="Technologies (comma separated)">
        <TextInput value={technologies} onChange={(e) => setTechnologies(e.target.value)} />
      </Field>
      <Field label="Client">
        <TextInput value={client} onChange={(e) => setClient(e.target.value)} />
      </Field>
      <Field label="Role">
        <TextInput value={role} onChange={(e) => setRole(e.target.value)} />
      </Field>
      <Field label="GitHub URL">
        <TextInput value={githubUrl} onChange={(e) => setGithubUrl(e.target.value)} />
      </Field>
      <Field label="Live URL">
        <TextInput value={liveUrl} onChange={(e) => setLiveUrl(e.target.value)} />
      </Field>
      <Field label="Case study URL">
        <TextInput value={caseStudyUrl} onChange={(e) => setCaseStudyUrl(e.target.value)} />
      </Field>
      <Field label="Completion date">
        <TextInput type="date" value={completionDate || ''} onChange={(e) => setCompletionDate(e.target.value)} />
      </Field>
      <Field label="Sort order">
        <TextInput type="number" value={sortOrder} onChange={(e) => setSortOrder(e.target.value)} />
      </Field>
      <Field label="Full description">
        <MarkdownEditor
          value={fullDescription}
          onChange={setFullDescription}
          height={420}
          placeholder="Write the full case study…"
        />
      </Field>
      <div className="flex gap-4">
        <Checkbox label="Featured" checked={featured} onChange={setFeatured} />
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
