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
  TextTextarea,
} from '@/components/admin/field'
import type { ImpactStat, Tables } from '@/lib/supabase/types'

type Props = { initial?: Tables<'community_entries'> | null }

export default function CommunityForm({ initial }: Props) {
  const router = useRouter()
  const [organization, setOrganization] = useState(initial?.organization ?? '')
  const [slug, setSlug] = useState(initial?.slug ?? '')
  const [role, setRole] = useState(initial?.role ?? '')
  const [duration, setDuration] = useState(initial?.duration ?? '')
  const [coverImage, setCoverImage] = useState(initial?.cover_image ?? '')
  const [gallery, setGallery] = useState((initial?.gallery ?? []).join('\n'))
  const [achievements, setAchievements] = useState((initial?.achievements ?? []).join('\n'))
  const [impactStats, setImpactStats] = useState(
    JSON.stringify((initial?.impact_stats as ImpactStat[]) ?? [], null, 2)
  )
  const [tags, setTags] = useState((initial?.tags ?? []).join(', '))
  const [description, setDescription] = useState(initial?.description ?? '')
  const [featured, setFeatured] = useState(initial?.featured ?? false)
  const [draft, setDraft] = useState(initial?.draft ?? false)
  const [sortOrder, setSortOrder] = useState(String(initial?.sort_order ?? 0))
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  async function onSubmit(e: FormEvent) {
    e.preventDefault()
    setSaving(true)
    setError('')
    let parsedStats: ImpactStat[] = []
    try {
      parsedStats = JSON.parse(impactStats || '[]')
    } catch {
      setError('Impact stats must be valid JSON array of {value,label}')
      setSaving(false)
      return
    }

    const supabase = createClient()
    const payload = {
      organization,
      slug: slug || slugify(organization),
      role,
      duration,
      cover_image: coverImage || null,
      gallery: gallery.split('\n').map((u) => u.trim()).filter(Boolean),
      achievements: achievements.split('\n').map((a) => a.trim()).filter(Boolean),
      impact_stats: parsedStats,
      tags: tags.split(',').map((t) => t.trim()).filter(Boolean),
      description,
      featured,
      draft,
      sort_order: Number(sortOrder) || 0,
    }

    try {
      const initialId = initial?.id
      const isRealUuid = Boolean(initialId && /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/.test(initialId))
      const res = (isRealUuid && initialId)
        ? await supabase.from('community_entries').update(payload).eq('id', initialId)
        : await supabase.from('community_entries').insert(payload)

      if (res.error) {
        setError(res.error.message)
        return
      }
      router.push('/admin/community')
      router.refresh()
    } catch (err: any) {
      setError(err?.message || 'Failed to save community entry.')
    } finally {
      setSaving(false)
    }
  }

  async function onDelete() {
    if (!initial || !confirm('Delete this entry?')) return
    setSaving(true)
    try {
      const supabase = createClient()
      await supabase.from('community_entries').delete().eq('id', initial.id)
      router.push('/admin/community')
      router.refresh()
    } catch (err: any) {
      setError(err?.message || 'Failed to delete community entry.')
    } finally {
      setSaving(false)
    }
  }

  return (
    <form onSubmit={onSubmit} className="max-w-3xl space-y-5">
      <Field label="Organization">
        <TextInput
          required
          value={organization}
          onChange={(e) => {
            setOrganization(e.target.value)
            if (!initial) setSlug(slugify(e.target.value))
          }}
        />
      </Field>
      <Field label="Slug">
        <TextInput required value={slug} onChange={(e) => setSlug(slugify(e.target.value))} />
      </Field>
      <Field label="Role">
        <TextInput value={role} onChange={(e) => setRole(e.target.value)} />
      </Field>
      <Field label="Duration">
        <TextInput value={duration} onChange={(e) => setDuration(e.target.value)} />
      </Field>
      <ImageUpload label="Cover image" value={coverImage} onChange={setCoverImage} folder="community" />
      <div className="space-y-2">
        <Field label="Gallery URLs (one per line)">
          <TextTextarea value={gallery} onChange={(e) => setGallery(e.target.value)} />
        </Field>
        <ImageUpload
          label="Add Image to Gallery"
          value=""
          onChange={(newUrl) => {
            if (newUrl) {
              setGallery((prev) => (prev ? `${prev}\n${newUrl}` : newUrl))
            }
          }}
          folder="community"
        />
      </div>
      <Field label="Achievements (one per line)">
        <TextTextarea value={achievements} onChange={(e) => setAchievements(e.target.value)} />
      </Field>
      <Field label='Impact stats JSON ([{"value":"5000+","label":"Students"}])'>
        <TextTextarea value={impactStats} onChange={(e) => setImpactStats(e.target.value)} className="font-mono" />
      </Field>
      <Field label="Tags (comma separated)">
        <TextInput value={tags} onChange={(e) => setTags(e.target.value)} />
      </Field>
      <Field label="Description">
        <MarkdownEditor
          value={description}
          onChange={setDescription}
          height={360}
          placeholder="Write the community overview…"
          folder="community"
        />
      </Field>
      <Field label="Sort order">
        <TextInput type="number" value={sortOrder} onChange={(e) => setSortOrder(e.target.value)} />
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
        {initial ? <DangerButton type="button" onClick={onDelete}>Delete</DangerButton> : null}
      </div>
    </form>
  )
}
