'use client'

import { FormEvent, useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import ImageUpload from '@/components/admin/image-upload'
import MarkdownEditor from '@/components/admin/markdown-editor'
import {
  DangerButton,
  Field,
  PrimaryButton,
  TextInput,
  TextSelect,
  TextTextarea,
} from '@/components/admin/field'
import type { Tables } from '@/lib/supabase/types'

type Props = { initial?: Tables<'journey_items'> | null }

export default function JourneyForm({ initial }: Props) {
  const router = useRouter()
  const [title, setTitle] = useState(initial?.title ?? '')
  const [organization, setOrganization] = useState(initial?.organization ?? '')
  const [role, setRole] = useState(initial?.role ?? '')
  const [dateLabel, setDateLabel] = useState(initial?.date_label ?? '')
  const [description, setDescription] = useState(initial?.description ?? '')
  const [type, setType] = useState(initial?.type ?? 'work')
  const [details, setDetails] = useState((initial?.details ?? []).join('\n'))
  const [images, setImages] = useState((initial?.images ?? []).join('\n'))
  const [cover, setCover] = useState(initial?.images?.[0] ?? '')
  const [sortOrder, setSortOrder] = useState(String(initial?.sort_order ?? 0))
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  async function onSubmit(e: FormEvent) {
    e.preventDefault()
    setSaving(true)
    setError('')
    const imageList = [
      ...(cover ? [cover] : []),
      ...images
        .split('\n')
        .map((u) => u.trim())
        .filter(Boolean),
    ].filter((url, i, arr) => arr.indexOf(url) === i)

    const supabase = createClient()
    const payload = {
      title,
      organization,
      role: role || null,
      date_label: dateLabel,
      description,
      type: type as Tables<'journey_items'>['type'],
      details: details.split('\n').map((d) => d.trim()).filter(Boolean),
      images: imageList,
      sort_order: Number(sortOrder) || 0,
    }

    const isRealUuid = Boolean(initial?.id && /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/.test(initial.id))
    const res = isRealUuid
      ? await supabase.from('journey_items').update(payload).eq('id', initial.id)
      : await supabase.from('journey_items').insert(payload)

    if (res.error) {
      setError(res.error.message)
      setSaving(false)
      return
    }
    router.push('/admin/journey')
    router.refresh()
  }

  async function onDelete() {
    if (!initial || !confirm('Delete this journey item?')) return
    const supabase = createClient()
    await supabase.from('journey_items').delete().eq('id', initial.id)
    router.push('/admin/journey')
    router.refresh()
  }

  return (
    <form onSubmit={onSubmit} className="max-w-3xl space-y-5">
      <Field label="Title">
        <TextInput required value={title} onChange={(e) => setTitle(e.target.value)} />
      </Field>
      <Field label="Organization">
        <TextInput value={organization} onChange={(e) => setOrganization(e.target.value)} />
      </Field>
      <Field label="Role">
        <TextInput value={role} onChange={(e) => setRole(e.target.value)} />
      </Field>
      <Field label="Date label">
        <TextInput value={dateLabel} onChange={(e) => setDateLabel(e.target.value)} placeholder="Dec 2025 - Present" />
      </Field>
      <Field label="Type">
        <TextSelect value={type} onChange={(e) => setType(e.target.value as typeof type)}>
          <option value="work">work</option>
          <option value="volunteer">volunteer</option>
          <option value="membership">membership</option>
          <option value="milestone">milestone</option>
        </TextSelect>
      </Field>
      <Field label="Description">
        <MarkdownEditor
          value={description}
          onChange={setDescription}
          height={280}
          placeholder="Write the journey description…"
        />
      </Field>
      <Field label="Details (one per line)">
        <TextTextarea value={details} onChange={(e) => setDetails(e.target.value)} />
      </Field>
      <ImageUpload label="Primary image" value={cover} onChange={setCover} folder="journey" />
      <Field label="Additional image URLs (one per line)">
        <TextTextarea value={images} onChange={(e) => setImages(e.target.value)} />
      </Field>
      <Field label="Sort order">
        <TextInput type="number" value={sortOrder} onChange={(e) => setSortOrder(e.target.value)} />
      </Field>
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
