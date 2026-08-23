'use client'

import { FormEvent, useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { slugify } from '@/lib/utils/slug'
import { revalidateGallery, revalidatePortfolio } from '@/app/actions/revalidate'
import ImageUpload from '@/components/admin/image-upload'
import {
  DangerButton,
  Field,
  PrimaryButton,
  TextInput,
  TextTextarea,
} from '@/components/admin/field'
import type { Tables } from '@/lib/supabase/types'

export function GalleryForm({ initial }: { initial?: Tables<'gallery_images'> | null }) {
  const router = useRouter()
  const [title, setTitle] = useState(initial?.title ?? '')
  const [caption, setCaption] = useState(initial?.caption ?? '')
  const [imageUrl, setImageUrl] = useState(initial?.image_url ?? '')
  const [alt, setAlt] = useState(initial?.alt ?? '')
  const [category, setCategory] = useState(initial?.category ?? 'Events')
  const [location, setLocation] = useState(initial?.location ?? '')
  const [eventDate, setEventDate] = useState(initial?.event_date ?? '')
  const [externalLink, setExternalLink] = useState(initial?.external_link ?? '')
  const [videoUrl, setVideoUrl] = useState(initial?.video_url ?? '')
  const [videoDuration, setVideoDuration] = useState(initial?.video_duration ?? '')
  const [width, setWidth] = useState<number | null>(initial?.width ?? null)
  const [height, setHeight] = useState<number | null>(initial?.height ?? null)
  const [featured, setFeatured] = useState(initial?.featured ?? false)
  const [sortOrder, setSortOrder] = useState(String(initial?.sort_order ?? 0))
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  // Automatically detect image dimensions whenever imageUrl changes
  const handleImageChange = (url: string) => {
    setImageUrl(url)
    if (!url) {
      setWidth(null)
      setHeight(null)
      return
    }
    if (typeof window !== 'undefined') {
      const img = new window.Image()
      img.onload = () => {
        if (img.naturalWidth && img.naturalHeight) {
          setWidth(img.naturalWidth)
          setHeight(img.naturalHeight)
        }
      }
      img.src = url
    }
  }

  async function onSubmit(e: FormEvent) {
    e.preventDefault()
    setSaving(true)
    setError('')
    const supabase = createClient()
    const payload = {
      title: title || null,
      caption: caption || null,
      image_url: imageUrl,
      alt: alt || title || null,
      category: category || 'Events',
      location: location || null,
      event_date: eventDate || null,
      external_link: externalLink || null,
      video_url: videoUrl || null,
      video_duration: videoDuration || null,
      width: width || null,
      height: height || null,
      featured,
      sort_order: Number(sortOrder) || 0,
    }
    try {
      const initialId = initial?.id
      const isRealUuid = Boolean(initialId && /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/.test(initialId))
      const res = (isRealUuid && initialId)
        ? await supabase.from('gallery_images').update(payload).eq('id', initialId)
        : await supabase.from('gallery_images').insert(payload)
      if (res.error) {
        setError(`Save error: ${res.error.message}`)
        return
      }
      await revalidateGallery()
      router.push('/admin/gallery')
      router.refresh()
    } catch (err: any) {
      setError(err?.message || 'Failed to save gallery image.')
    } finally {
      setSaving(false)
    }
  }

  async function onDelete() {
    if (!initial || !confirm('Delete image from gallery archive?')) return
    setSaving(true)
    setError('')
    try {
      const supabase = createClient()
      const initialId = initial.id
      const isRealUuid = Boolean(
        initialId &&
        /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/.test(initialId)
      )

      if (isRealUuid && initialId) {
        const res = await supabase.from('gallery_images').delete().eq('id', initialId)
        if (res.error) {
          setError(`Delete error: ${res.error.message}`)
          return
        }
      } else if (imageUrl || initial.image_url) {
        const targetUrl = imageUrl || initial.image_url
        const res = await supabase.from('gallery_images').delete().eq('image_url', targetUrl)
        if (res.error) {
          setError(`Delete error: ${res.error.message}`)
          return
        }
      }

      await revalidateGallery()
      router.push('/admin/gallery')
      router.refresh()
    } catch (err: any) {
      setError(err?.message || 'Failed to delete gallery image.')
    } finally {
      setSaving(false)
    }
  }

  return (
    <form onSubmit={onSubmit} className="max-w-2xl space-y-5">
      <Field label="Title / Heading">
        <TextInput value={title} onChange={(e) => setTitle(e.target.value)} placeholder="e.g. Speaking at Build with AI 2025" />
      </Field>
      
      <Field label="Caption / Moment Story">
        <TextTextarea value={caption} onChange={(e) => setCaption(e.target.value)} placeholder="Context, background, or notable people in this photo..." rows={3} />
      </Field>

      <ImageUpload label="Gallery Image / Photo" value={imageUrl} onChange={handleImageChange} folder="gallery" />

      {width && height && (
        <div className="flex items-center gap-3 p-3 rounded-lg bg-secondary/50 border border-border text-xs text-muted-foreground">
          <span className="font-mono font-semibold text-foreground">Natural Dimensions:</span>
          <span>{width}px × {height}px</span>
          <span className="text-border">|</span>
          <span>Aspect Ratio: {((width / height) > 1.2 ? 'Landscape' : (width / height) < 0.85 ? 'Portrait' : 'Square')} ({(width / height).toFixed(2)}:1)</span>
        </div>
      )}

      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Category / Track">
          <TextInput value={category} onChange={(e) => setCategory(e.target.value)} placeholder="Events, Leadership, Speaking, Community, Tech..." />
        </Field>
        <Field label="Event Date">
          <TextInput type="date" value={eventDate} onChange={(e) => setEventDate(e.target.value)} />
        </Field>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Location / Venue">
          <TextInput value={location} onChange={(e) => setLocation(e.target.value)} placeholder="e.g. FUTO Auditorium, Owerri" />
        </Field>
        <Field label="External Link (Optional)">
          <TextInput value={externalLink} onChange={(e) => setExternalLink(e.target.value)} placeholder="https://..." />
        </Field>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Video URL (Optional Clip / Reel)">
          <TextInput value={videoUrl} onChange={(e) => setVideoUrl(e.target.value)} placeholder="https://... (mp4 / stream)" />
        </Field>
        <Field label="Video Duration Badge (e.g. 0:03, 0:12)">
          <TextInput value={videoDuration} onChange={(e) => setVideoDuration(e.target.value)} placeholder="0:12" />
        </Field>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Alt text (SEO & Accessibility)">
          <TextInput value={alt} onChange={(e) => setAlt(e.target.value)} placeholder="Describe the image content..." />
        </Field>
        <Field label="Sort order">
          <TextInput type="number" value={sortOrder} onChange={(e) => setSortOrder(e.target.value)} />
        </Field>
      </div>

      <div className="flex gap-4 items-center pt-2">
        <label className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground cursor-pointer">
          <input
            type="checkbox"
            checked={featured}
            onChange={(e) => setFeatured(e.target.checked)}
            className="rounded border-border"
          />
          <span>Featured on Gallery Header & Top Shelf</span>
        </label>
      </div>

      {error ? <p className="text-sm text-red-400">{error}</p> : null}

      <div className="flex gap-3 pt-3">
        <PrimaryButton type="submit" disabled={saving || !imageUrl}>
          {saving ? 'Saving Media...' : 'Save Gallery Item'}
        </PrimaryButton>
        {initial ? <DangerButton type="button" onClick={onDelete}>Delete</DangerButton> : null}
      </div>
    </form>
  )
}

export function ServiceForm({ initial }: { initial?: Tables<'services'> | null }) {
  const router = useRouter()
  const [title, setTitle] = useState(initial?.title ?? '')
  const [slug, setSlug] = useState(initial?.slug ?? '')
  const [description, setDescription] = useState(initial?.description ?? '')
  const [iconName, setIconName] = useState(initial?.icon_name ?? 'Code')
  const [ctaText, setCtaText] = useState(initial?.cta_text ?? 'Learn more')
  const [ctaHref, setCtaHref] = useState(initial?.cta_href ?? '/contact')
  const [sortOrder, setSortOrder] = useState(String(initial?.sort_order ?? 0))
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  async function onSubmit(e: FormEvent) {
    e.preventDefault()
    setSaving(true)
    const supabase = createClient()
    const payload = {
      title,
      slug: slug || slugify(title),
      description,
      icon_name: iconName,
      cta_text: ctaText,
      cta_href: ctaHref,
      sort_order: Number(sortOrder) || 0,
    }
    try {
      const initialId = initial?.id
      const isRealUuid = Boolean(initialId && /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/.test(initialId))
      const res = (isRealUuid && initialId)
        ? await supabase.from('services').update(payload).eq('id', initialId)
        : await supabase.from('services').insert(payload)
      if (res.error) {
        setError(res.error.message)
        return
      }
      router.push('/admin/services')
      router.refresh()
    } catch (err: any) {
      setError(err?.message || 'Failed to save service.')
    } finally {
      setSaving(false)
    }
  }

  async function onDelete() {
    if (!initial || !confirm('Delete?')) return
    setSaving(true)
    try {
      const supabase = createClient()
      await supabase.from('services').delete().eq('id', initial.id)
      router.push('/admin/services')
      router.refresh()
    } catch (err: any) {
      setError(err?.message || 'Failed to delete service.')
    } finally {
      setSaving(false)
    }
  }

  return (
    <form onSubmit={onSubmit} className="max-w-xl space-y-5">
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
      <Field label="Description">
        <TextTextarea value={description} onChange={(e) => setDescription(e.target.value)} />
      </Field>
      <Field label="Icon name (Lucide)">
        <TextInput value={iconName} onChange={(e) => setIconName(e.target.value)} />
      </Field>
      <Field label="CTA text">
        <TextInput value={ctaText} onChange={(e) => setCtaText(e.target.value)} />
      </Field>
      <Field label="CTA href">
        <TextInput value={ctaHref} onChange={(e) => setCtaHref(e.target.value)} />
      </Field>
      <Field label="Sort order">
        <TextInput type="number" value={sortOrder} onChange={(e) => setSortOrder(e.target.value)} />
      </Field>
      {error ? <p className="text-sm text-red-400">{error}</p> : null}
      <div className="flex gap-3">
        <PrimaryButton type="submit" disabled={saving}>
          Save
        </PrimaryButton>
        {initial ? <DangerButton type="button" onClick={onDelete}>Delete</DangerButton> : null}
      </div>
    </form>
  )
}

export function StatForm({ initial }: { initial?: Tables<'portfolio_stats'> | null }) {
  const router = useRouter()
  const [value, setValue] = useState(initial?.value ?? '')
  const [label, setLabel] = useState(initial?.label ?? '')
  const [description, setDescription] = useState(initial?.description ?? '')
  const [sortOrder, setSortOrder] = useState(String(initial?.sort_order ?? 0))
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  async function onSubmit(e: FormEvent) {
    e.preventDefault()
    setSaving(true)
    const supabase = createClient()
    const payload = {
      value,
      label,
      description: description || null,
      sort_order: Number(sortOrder) || 0,
    }
    try {
      const initialId = initial?.id
      const isRealUuid = Boolean(initialId && /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/.test(initialId))
      const res = (isRealUuid && initialId)
        ? await supabase.from('portfolio_stats').update(payload).eq('id', initialId)
        : await supabase.from('portfolio_stats').insert(payload)
      if (res.error) {
        setError(res.error.message)
        return
      }
      router.push('/admin/stats')
      router.refresh()
    } catch (err: any) {
      setError(err?.message || 'Failed to save portfolio stat.')
    } finally {
      setSaving(false)
    }
  }

  async function onDelete() {
    if (!initial || !confirm('Delete?')) return
    setSaving(true)
    try {
      const supabase = createClient()
      await supabase.from('portfolio_stats').delete().eq('id', initial.id)
      router.push('/admin/stats')
      router.refresh()
    } catch (err: any) {
      setError(err?.message || 'Failed to delete portfolio stat.')
    } finally {
      setSaving(false)
    }
  }

  return (
    <form onSubmit={onSubmit} className="max-w-xl space-y-5">
      <Field label="Value">
        <TextInput required value={value} onChange={(e) => setValue(e.target.value)} />
      </Field>
      <Field label="Label">
        <TextInput required value={label} onChange={(e) => setLabel(e.target.value)} />
      </Field>
      <Field label="Description">
        <TextTextarea value={description} onChange={(e) => setDescription(e.target.value)} />
      </Field>
      <Field label="Sort order">
        <TextInput type="number" value={sortOrder} onChange={(e) => setSortOrder(e.target.value)} />
      </Field>
      {error ? <p className="text-sm text-red-400">{error}</p> : null}
      <div className="flex gap-3">
        <PrimaryButton type="submit" disabled={saving}>
          Save
        </PrimaryButton>
        {initial ? <DangerButton type="button" onClick={onDelete}>Delete</DangerButton> : null}
      </div>
    </form>
  )
}

export function CertificationForm({ initial }: { initial?: any }) {
  const router = useRouter()
  const [title, setTitle] = useState(initial?.title ?? '')
  const [slug, setSlug] = useState(initial?.slug ?? '')
  const [provider, setProvider] = useState(initial?.provider ?? '')
  const [description, setDescription] = useState(initial?.description ?? '')
  const [imageUrl, setImageUrl] = useState(initial?.image_url ?? initial?.image ?? '')
  const [dateLabel, setDateLabel] = useState(initial?.date_label ?? initial?.issue_date ?? '')
  const [credentialUrl, setCredentialUrl] = useState(initial?.credential_url ?? '')
  const [sortOrder, setSortOrder] = useState(String(initial?.sort_order ?? 0))
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  async function onSubmit(e: FormEvent) {
    e.preventDefault()
    setSaving(true)
    setError('')
    try {
      const supabase = createClient()
      const payload: any = {
        title,
        slug: slug || slugify(title),
        provider,
        description: description || null,
        image_url: imageUrl || null,
        date_label: dateLabel || '',
        credential_url: credentialUrl || null,
        sort_order: Number(sortOrder) || 0,
      }
      const initialId = initial?.id
      const isRealUuid = Boolean(
        initialId &&
        /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/.test(initialId)
      )
      let res = (isRealUuid && initialId)
        ? await supabase.from('certifications').update(payload).eq('id', initialId)
        : await supabase.from('certifications').insert(payload)

      // Fallback if remote table does not have 'description' or 'image_url' columns yet
      if (res.error && (res.error.message.includes('column') || res.error.message.includes('schema cache'))) {
        const fallbackPayload: any = {
          title: payload.title,
          slug: payload.slug,
          provider: payload.provider,
          date_label: payload.date_label,
          credential_url: payload.credential_url,
          sort_order: payload.sort_order,
        }
        res = (isRealUuid && initialId)
          ? await supabase.from('certifications').update(fallbackPayload).eq('id', initialId)
          : await supabase.from('certifications').insert(fallbackPayload)
      }

      if (res.error) {
        setError(res.error.message)
        setSaving(false)
        return
      }

      await revalidatePortfolio()
      router.push('/admin/certifications')
      router.refresh()
    } catch (err: any) {
      setError(err?.message || 'Failed to save certification')
    } finally {
      setSaving(false)
    }
  }

  async function onDelete() {
    if (!initial || !confirm('Delete this certification?')) return
    setSaving(true)
    setError('')
    try {
      const supabase = createClient()
      if (initial.id) {
        const isRealUuid = Boolean(
          initial.id &&
          /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/.test(initial.id)
        )
        if (isRealUuid) {
          const res = await supabase.from('certifications').delete().eq('id', initial.id)
          if (res.error) {
            setError(res.error.message)
            return
          }
        } else {
          const res = await supabase.from('certifications').delete().eq('slug', initial.slug || initial.id)
          if (res.error) {
            setError(res.error.message)
            return
          }
        }
      }
      await revalidatePortfolio()
      router.push('/admin/certifications')
      router.refresh()
    } catch (err: any) {
      setError(err?.message || 'Failed to delete certification')
    } finally {
      setSaving(false)
    }
  }

  return (
    <form onSubmit={onSubmit} className="max-w-xl space-y-5">
      <Field label="Name (Certificate Title)">
        <TextInput
          required
          value={title}
          placeholder="e.g. Data Privacy Ambassador"
          onChange={(e) => {
            setTitle(e.target.value)
            if (!initial) setSlug(slugify(e.target.value))
          }}
        />
      </Field>
      <Field label="Slug">
        <TextInput required value={slug} onChange={(e) => setSlug(slugify(e.target.value))} />
      </Field>
      <Field label="Issued By (Provider / Organization)">
        <TextInput
          required
          value={provider}
          placeholder="e.g. Nigeria Data Protection Commission (NDPC)"
          onChange={(e) => setProvider(e.target.value)}
        />
      </Field>
      <Field label="Description">
        <TextTextarea
          value={description}
          placeholder="Summary of accredited competencies and domain skills..."
          rows={3}
          onChange={(e) => setDescription(e.target.value)}
        />
      </Field>
      <Field label="Credential URL (Linked in button)">
        <TextInput
          value={credentialUrl}
          placeholder="https://..."
          onChange={(e) => setCredentialUrl(e.target.value)}
        />
      </Field>
      <ImageUpload
        label="Certificate Document Image"
        value={imageUrl}
        onChange={(url) => setImageUrl(url)}
        folder="certificates"
      />
      <div className="grid grid-cols-2 gap-4">
        <Field label="Issue Date (Optional)">
          <TextInput value={dateLabel} placeholder="e.g. April 2025" onChange={(e) => setDateLabel(e.target.value)} />
        </Field>
        <Field label="Sort order">
          <TextInput type="number" value={sortOrder} onChange={(e) => setSortOrder(e.target.value)} />
        </Field>
      </div>
      {error ? <p className="text-sm text-red-400">{error}</p> : null}
      <div className="flex gap-3">
        <PrimaryButton type="submit" disabled={saving}>
          {saving ? 'Saving...' : 'Save Certification'}
        </PrimaryButton>
        {initial ? <DangerButton type="button" onClick={onDelete}>Delete</DangerButton> : null}
      </div>
    </form>
  )
}

export function SettingsForm({ initial }: { initial: Tables<'site_settings'> }) {
  const router = useRouter()
  const [form, setForm] = useState(initial)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [ok, setOk] = useState(false)

  function set<K extends keyof Tables<'site_settings'>>(key: K, value: Tables<'site_settings'>[K]) {
    setForm((prev) => ({ ...prev, [key]: value }))
  }

  async function onSubmit(e: FormEvent) {
    e.preventDefault()
    setSaving(true)
    setError('')
    setOk(false)
    const supabase = createClient()
    const { id, created_at, updated_at, ...payload } = form
    const res = await supabase.from('site_settings').update(payload).eq('id', id)
    if (res.error) {
      setError(res.error.message)
      setSaving(false)
      return
    }
    setOk(true)
    setSaving(false)
    router.refresh()
  }

  return (
    <form onSubmit={onSubmit} className="max-w-2xl space-y-5">
      {(
        [
          ['site_name', 'Site name'],
          ['author_name', 'Author name'],
          ['tagline', 'Tagline'],
          ['hero_title', 'Hero title'],
          ['hero_subtitle', 'Hero subtitle / Bio'],
          ['about_paragraph', 'About Me (Detailed Paragraph)'],
          ['contact_email', 'Contact email'],
          ['location', 'Location'],
          ['availability_status', 'Availability'],
          ['social_github', 'GitHub'],
          ['social_linkedin', 'LinkedIn'],
          ['social_twitter', 'Twitter'],
          ['social_behance', 'Behance'],
          ['social_whatsapp', 'WhatsApp'],
          ['google_analytics_id', 'Google Analytics ID'],
        ] as const
      ).map(([key, label]) => (
        <Field key={key} label={label}>
          {key === 'hero_subtitle' || key === 'tagline' || key === 'about_paragraph' ? (
            <TextTextarea value={String(form[key as keyof Tables<'site_settings'>] ?? '')} onChange={(e) => set(key as any, e.target.value)} />
          ) : (
            <TextInput value={String(form[key as keyof Tables<'site_settings'>] ?? '')} onChange={(e) => set(key as any, e.target.value)} />
          )}
        </Field>
      ))}
      {error ? <p className="text-sm text-red-400">{error}</p> : null}
      {ok ? <p className="text-sm text-emerald-400">Saved.</p> : null}
      <PrimaryButton type="submit" disabled={saving}>
        {saving ? 'Saving…' : 'Save settings'}
      </PrimaryButton>
    </form>
  )
}

export function BrandForm({ initial }: { initial?: Tables<'brand_partners'> | null }) {
  const router = useRouter()
  const [name, setName] = useState(initial?.name ?? '')
  const [logoUrl, setLogoUrl] = useState(initial?.logo_url ?? '')
  const [websiteUrl, setWebsiteUrl] = useState(initial?.website_url ?? '')
  const [sortOrder, setSortOrder] = useState(String(initial?.sort_order ?? 0))
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  async function onSubmit(e: FormEvent) {
    e.preventDefault()
    setSaving(true)
    setError('')
    const supabase = createClient()
    const payload = {
      name,
      logo_url: logoUrl,
      website_url: websiteUrl || null,
      sort_order: Number(sortOrder) || 0,
    }
    try {
      const initialId = initial?.id
      const isRealUuid = Boolean(initialId && /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/.test(initialId))
      const res = (isRealUuid && initialId)
        ? await supabase.from('brand_partners').update(payload).eq('id', initialId)
        : await supabase.from('brand_partners').insert(payload)

      if (res.error) {
        if (res.error.message.includes('schema cache') || res.error.message.includes('brand_partners')) {
          setError("Database table 'brand_partners' has not been created in Supabase yet. Run the SQL script from supabase/migrations/002_brand_partners.sql in your Supabase SQL Editor.")
        } else {
          setError(res.error.message)
        }
        return
      }
      router.push('/admin/brands')
      router.refresh()
    } catch (err: any) {
      setError(err?.message || 'Failed to save brand partner.')
    } finally {
      setSaving(false)
    }
  }

  async function onDelete() {
    if (!initial || !confirm('Delete brand partner?')) return
    setSaving(true)
    try {
      const supabase = createClient()
      await supabase.from('brand_partners').delete().eq('id', initial.id)
      router.push('/admin/brands')
      router.refresh()
    } catch (err: any) {
      setError(err?.message || 'Failed to delete brand partner.')
    } finally {
      setSaving(false)
    }
  }

  return (
    <form onSubmit={onSubmit} className="max-w-xl space-y-5">
      <Field label="Brand / Organization Name">
        <TextInput value={name} onChange={(e) => setName(e.target.value)} required placeholder="e.g. NACOS FUTO, IEEE, GDG" />
      </Field>
      <ImageUpload label="Brand Logo Image" value={logoUrl} onChange={setLogoUrl} folder="brands" />
      <Field label="Website URL (Optional)">
        <TextInput value={websiteUrl} onChange={(e) => setWebsiteUrl(e.target.value)} placeholder="https://..." />
      </Field>
      <Field label="Sort Order">
        <TextInput type="number" value={sortOrder} onChange={(e) => setSortOrder(e.target.value)} />
      </Field>
      {error ? <p className="text-sm text-red-400">{error}</p> : null}
      <div className="flex gap-3">
        <PrimaryButton type="submit" disabled={saving || !name || !logoUrl}>
          {saving ? 'Saving...' : 'Save Brand Partner'}
        </PrimaryButton>
        {initial ? <DangerButton type="button" onClick={onDelete}>Delete</DangerButton> : null}
      </div>
    </form>
  )
}
