'use client'

import { FormEvent, useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { revalidateCommunity, revalidatePortfolio } from '@/app/actions/revalidate'
import ImageUpload from '@/components/admin/image-upload'
import MarkdownEditor from '@/components/admin/markdown-editor'
import {
  DangerButton,
  Field,
  PrimaryButton,
  TextInput,
  TextTextarea,
} from '@/components/admin/field'
import type { Tables } from '@/lib/supabase/types'
import { Briefcase, HeartHandshake } from 'lucide-react'

type Props = {
  initial?: Tables<'journey_items'> | null
  returnTo?: string
}

export default function JourneyForm({ initial, returnTo }: Props) {
  const router = useRouter()
  const [title, setTitle] = useState(initial?.title ?? '')
  const [organization, setOrganization] = useState(initial?.organization ?? '')
  const [role, setRole] = useState(initial?.role ?? '')
  const [dateLabel, setDateLabel] = useState(initial?.date_label ?? '')
  const [description, setDescription] = useState(initial?.description ?? '')

  // Initial category detection based on type and details
  const initialType = initial?.type || 'work'
  const initialDetails = initial?.details || []

  const isInitiallyWork =
    initialType === 'work' ||
    initialDetails.some((d) => d.toLowerCase().includes('work') || d.toLowerCase().includes('professional'))

  const isInitiallyVolunteer =
    initialType === 'volunteer' ||
    initialDetails.some((d) => d.toLowerCase().includes('volunteer') || d.toLowerCase().includes('community'))

  // State for the 2 clean checkboxes: Professional Work and Volunteering
  const [inWork, setInWork] = useState<boolean>(initial ? isInitiallyWork : true)
  const [inVolunteer, setInVolunteer] = useState<boolean>(initial ? isInitiallyVolunteer : false)

  const [details, setDetails] = useState((initial?.details ?? []).join('\n'))
  const [images, setImages] = useState((initial?.images ?? []).join('\n'))
  const [cover, setCover] = useState(initial?.images?.[0] ?? '')
  const [sortOrder, setSortOrder] = useState(String(initial?.sort_order ?? 0))
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  const redirectPath = returnTo || '/admin/journey'

  const isMembership = initial?.type === 'membership' || returnTo?.includes('memberships')

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

    let primaryType: Tables<'journey_items'>['type'] = isMembership ? 'membership' : 'work'
    let combinedDetails: string[] = []

    if (isMembership) {
      // For membership items, preserve clean details without journey placement tags
      const userDetailLines = details
        .split('\n')
        .map((d) => d.trim())
        .filter(Boolean)
      combinedDetails = userDetailLines
    } else {
      // Ensure at least one category is checked for journey/experience items
      if (!inWork && !inVolunteer) {
        setError('Please tick at least one placement: Professional Work Experience or Volunteering & Community.')
        setSaving(false)
        return
      }

      // Build categories tag list
      const explicitCategoryTags: string[] = []
      if (inWork) explicitCategoryTags.push('Professional Work')
      if (inVolunteer) explicitCategoryTags.push('Volunteering')

      const userDetailLines = details
        .split('\n')
        .map((d) => d.trim())
        .filter(Boolean)

      // Filter out old system tags and combine
      const cleanUserLines = userDetailLines.filter(
        (l) => l !== 'Professional Work' && l !== 'Volunteering' && l !== 'Key Milestone' && l !== 'Accredited Membership'
      )
      combinedDetails = Array.from(new Set([...explicitCategoryTags, ...cleanUserLines]))

      if (inVolunteer && !inWork) {
        primaryType = 'volunteer'
      } else {
        primaryType = 'work'
      }
    }

    const supabase = createClient()
    const payload = {
      title,
      organization,
      role: role || null,
      date_label: dateLabel,
      description,
      type: primaryType,
      details: combinedDetails,
      images: imageList,
      sort_order: Number(sortOrder) || 0,
    }

    try {
      const initialId = initial?.id
      const isRealUuid = Boolean(
        initialId && /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/.test(initialId)
      )
      const res =
        isRealUuid && initialId
          ? await supabase.from('journey_items').update(payload).eq('id', initialId)
          : await supabase.from('journey_items').insert(payload)

      if (res.error) {
        setError(res.error.message)
        return
      }
      await revalidateCommunity()
      await revalidatePortfolio()
      router.push(redirectPath)
      router.refresh()
    } catch (err: any) {
      setError(err?.message || 'Failed to save item.')
    } finally {
      setSaving(false)
    }
  }

  async function onDelete() {
    if (!initial || !confirm('Delete this item?')) return
    setSaving(true)
    try {
      const supabase = createClient()
      await supabase.from('journey_items').delete().eq('id', initial.id)
      await revalidateCommunity()
      await revalidatePortfolio()
      router.push(redirectPath)
      router.refresh()
    } catch (err: any) {
      setError(err?.message || 'Failed to delete item.')
    } finally {
      setSaving(false)
    }
  }

  return (
    <form onSubmit={onSubmit} className="max-w-3xl space-y-6">
      
      {/* ── Two Clean Placement Checkboxes (Hidden for Professional Memberships) ── */}
      {!isMembership && (
        <div className="p-5 rounded-2xl bg-card border border-border/80 shadow-xs space-y-3.5">
          <div>
            <label className="text-sm font-bold text-foreground font-heading block">
              Placement &amp; Experience Type (Select all that apply)
            </label>
            <p className="text-xs text-muted-foreground mt-0.5">
              Tick where this entry should appear. If you tick both, it will appear in both sections!
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
            
            {/* 1. Professional Work */}
            <label
              className={`flex items-start gap-3 p-4 rounded-xl border transition-all cursor-pointer ${
                inWork
                  ? 'bg-blue-500/10 border-blue-500/40 text-foreground shadow-xs'
                  : 'bg-background/50 border-border/70 hover:border-border text-muted-foreground'
              }`}
            >
              <input
                type="checkbox"
                checked={inWork}
                onChange={(e) => setInWork(e.target.checked)}
                className="mt-0.5 w-4 h-4 rounded text-[#0075ff] focus:ring-[#0075ff]"
              />
              <div className="space-y-0.5">
                <div className="flex items-center gap-1.5 font-bold text-xs sm:text-sm text-foreground">
                  <Briefcase className="w-4 h-4 text-[#0075ff]" />
                  <span>Professional Work Experience</span>
                </div>
                <p className="text-[11px] text-muted-foreground leading-relaxed">
                  Appears on the Career Roadmap (/experience) &amp; /admin/journey
                </p>
              </div>
            </label>

            {/* 2. Volunteering & Community Advocacy */}
            <label
              className={`flex items-start gap-3 p-4 rounded-xl border transition-all cursor-pointer ${
                inVolunteer
                  ? 'bg-emerald-500/10 border-emerald-500/40 text-foreground shadow-xs'
                  : 'bg-background/50 border-border/70 hover:border-border text-muted-foreground'
              }`}
            >
              <input
                type="checkbox"
                checked={inVolunteer}
                onChange={(e) => setInVolunteer(e.target.checked)}
                className="mt-0.5 w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500"
              />
              <div className="space-y-0.5">
                <div className="flex items-center gap-1.5 font-bold text-xs sm:text-sm text-foreground">
                  <HeartHandshake className="w-4 h-4 text-emerald-500" />
                  <span>Volunteering &amp; Community</span>
                </div>
                <p className="text-[11px] text-muted-foreground leading-relaxed">
                  Appears on Volunteer &amp; Community lists (/community)
                </p>
              </div>
            </label>

          </div>
        </div>
      )}

      <Field label="Title / Position">
        <TextInput
          required
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="e.g. Director Of Information Communication Technology"
        />
      </Field>

      <Field label="Organization / Event">
        <TextInput
          value={organization}
          onChange={(e) => setOrganization(e.target.value)}
          placeholder="e.g. NACOS Federal University of Technology Owerri"
        />
      </Field>

      <Field label="Specific Role / Subtitle (Optional)">
        <TextInput
          value={role}
          onChange={(e) => setRole(e.target.value)}
          placeholder="e.g. Executive Board Member &amp; ICT Director"
        />
      </Field>

      <Field label="Date Label">
        <TextInput
          value={dateLabel}
          onChange={(e) => setDateLabel(e.target.value)}
          placeholder="e.g. Oct 2025 - Present"
        />
      </Field>

      <Field label="Description">
        <MarkdownEditor
          value={description}
          onChange={setDescription}
          height={280}
          placeholder="Write the journey and role description…"
          folder="journey"
        />
      </Field>

      <Field label="Key Highlights / Tags (one per line)">
        <TextTextarea
          value={details}
          onChange={(e) => setDetails(e.target.value)}
          placeholder="ICT Strategy &amp; Governance&#10;Digital Infrastructure&#10;Community Engagement"
        />
      </Field>

      <ImageUpload
        label="Primary Organization Logo / Cover Photo"
        value={cover}
        onChange={setCover}
        folder="journey"
      />

      <div className="space-y-2">
        <Field label="Additional image URLs (one per line)">
          <TextTextarea value={images} onChange={(e) => setImages(e.target.value)} />
        </Field>
        <ImageUpload
          label="Add Image to Journey Items"
          value=""
          onChange={(newUrl) => {
            if (newUrl) {
              setImages((prev) => (prev ? `${prev}\n${newUrl}` : newUrl))
            }
          }}
          folder="journey"
        />
      </div>

      <Field label="Sort order">
        <TextInput
          type="number"
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
        />
      </Field>

      {error ? <p className="text-sm font-semibold text-red-500">{error}</p> : null}

      <div className="flex gap-3 pt-2">
        <PrimaryButton type="submit" disabled={saving}>
          {saving ? 'Saving…' : initial?.id ? 'Update Item' : 'Create Item'}
        </PrimaryButton>
        {initial?.id ? (
          <DangerButton type="button" onClick={onDelete} disabled={saving}>
            Delete
          </DangerButton>
        ) : null}
      </div>
    </form>
  )
}
