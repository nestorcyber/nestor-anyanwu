import { config } from 'dotenv'
import { createClient } from '@supabase/supabase-js'
import fs from 'node:fs'
import path from 'node:path'
import matter from 'gray-matter'
import {
  journeyTimeline,
  portfolioStats,
  projects,
  servicesList,
  skillGroups,
  certificationsList,
} from '../lib/data'

config({ path: '.env' })
config({ path: '.env.local', override: true })

const url = process.env.NEXT_PUBLIC_SUPABASE_URL
const key = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!url || !key) {
  console.error('Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY')
  process.exit(1)
}

const supabase = createClient(url, key, {
  auth: { persistSession: false, autoRefreshToken: false },
})

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

function readMdxDir(dir: string) {
  const abs = path.join(process.cwd(), dir)
  if (!fs.existsSync(abs)) return []
  return fs
    .readdirSync(abs)
    .filter((f) => f.endsWith('.mdx') || f.endsWith('.md'))
    .map((file) => {
      const slug = file.replace(/\.mdx?$/, '')
      const raw = fs.readFileSync(path.join(abs, file), 'utf8')
      const { data, content } = matter(raw)
      return { slug, data, content: content.trim() }
    })
}

async function upsert(table: string, rows: Record<string, unknown>[], onConflict: string) {
  if (!rows.length) return
  let { error } = await supabase.from(table).upsert(rows, { onConflict })
  if (error && error.message.includes('scheduled_at')) {
    const strippedRows = rows.map((r) => {
      const copy = { ...r }
      delete copy.scheduled_at
      return copy
    })
    const retry = await supabase.from(table).upsert(strippedRows, { onConflict })
    error = retry.error
  }
  if (error) throw new Error(`${table}: ${error.message}`)
  console.log(`✓ ${table}: ${rows.length} rows`)
}

async function main() {
  const settingsPath = path.join(process.cwd(), 'content/settings/site.json')
  if (fs.existsSync(settingsPath)) {
    const site = JSON.parse(fs.readFileSync(settingsPath, 'utf8'))
    const { data: existing } = await supabase.from('site_settings').select('id').limit(1).maybeSingle()
    const payload = {
      site_name: site.siteName,
      author_name: site.authorName,
      tagline: site.tagline,
      hero_title: site.heroTitle,
      hero_subtitle: site.heroSubtitle,
      contact_email: site.contactEmail,
      location: site.location,
      availability_status: site.availabilityStatus,
      social_github: site.socialLinks?.github ?? '',
      social_linkedin: site.socialLinks?.linkedin ?? '',
      social_twitter: site.socialLinks?.twitter ?? '',
      social_behance: site.socialLinks?.behance ?? '',
      social_whatsapp: site.socialLinks?.whatsapp ?? '',
      google_analytics_id: site.analytics?.googleAnalyticsId ?? '',
    }
    if (existing?.id) {
      await supabase.from('site_settings').update(payload).eq('id', existing.id)
    } else {
      await supabase.from('site_settings').insert(payload)
    }
    console.log('✓ site_settings')
  }

  const journal = readMdxDir('content/journal').map(({ slug, data, content }, i) => ({
    slug,
    title: data.title ?? slug,
    excerpt: data.excerpt ?? '',
    cover_image: data.coverImage ?? null,
    category: data.category ?? 'Technology',
    tags: data.tags ?? [],
    featured: !!data.featured,
    pinned: !!data.pinned,
    published_date: data.publishedDate ?? null,
    last_updated: data.lastUpdated ?? null,
    author: data.author ?? 'Nestor Anyanwu',
    seo_title: data.seoTitle ?? null,
    seo_description: data.seoDescription ?? null,
    draft: !!data.draft,
    content,
    sort_order: i,
  }))
  await upsert('journal_articles', journal, 'slug')

  const portfolioMdx = readMdxDir('content/portfolio').map(({ slug, data, content }, i) => ({
    slug,
    title: data.title ?? slug,
    short_description: data.shortDescription ?? '',
    cover_image: data.coverImage ?? null,
    gallery: (data.gallery ?? []).filter(Boolean),
    category: data.category ?? 'Software',
    technologies: data.technologies ?? [],
    status: data.status ?? 'Completed',
    client: data.client ?? null,
    role: data.role ?? null,
    github_url: data.githubUrl ?? null,
    live_url: data.liveUrl ?? null,
    case_study_url: null,
    featured: !!data.featured,
    completion_date: data.completionDate ?? null,
    full_description: content,
    draft: false,
    sort_order: i,
  }))

  const allowedSlugs = new Set(portfolioMdx.map((p) => p.slug))
  const { data: dbItems } = await supabase.from('portfolio_projects').select('id, slug')
  if (dbItems) {
    const toDelete = dbItems.filter((item: any) => !allowedSlugs.has(item.slug)).map((item: any) => item.id)
    if (toDelete.length > 0) {
      await supabase.from('portfolio_projects').delete().in('id', toDelete)
    }
  }

  await upsert('portfolio_projects', portfolioMdx, 'slug')

  const community = readMdxDir('content/community').map(({ slug, data, content }, i) => ({
    slug,
    organization: data.organization ?? slug,
    role: data.role ?? '',
    duration: data.duration ?? '',
    cover_image: data.coverImage ?? null,
    gallery: (data.gallery ?? []).filter(Boolean),
    achievements: data.achievements ?? [],
    impact_stats: data.impactStats ?? [],
    featured: !!data.featured,
    tags: data.tags ?? [],
    description: content,
    draft: false,
    sort_order: i,
  }))
  await upsert('community_entries', community, 'slug')

  await supabase.from('journey_items').delete().neq('id', '00000000-0000-0000-0000-000000000000')
  const journeyRows = journeyTimeline.map((item, i) => ({
    title: item.title,
    organization: item.organization,
    role: item.role ?? null,
    date_label: item.date,
    description: item.description,
    type: item.type,
    details: item.details ?? [],
    images: (item.images ?? []).filter((u) => u && !u.includes('placeholder')),
    sort_order: i,
  }))
  const { error: journeyErr } = await supabase.from('journey_items').insert(journeyRows)
  if (journeyErr) throw new Error(`journey_items: ${journeyErr.message}`)
  console.log(`✓ journey_items: ${journeyRows.length} rows`)

  await supabase.from('portfolio_stats').delete().neq('id', '00000000-0000-0000-0000-000000000000')
  const { error: statsErr } = await supabase.from('portfolio_stats').insert(
    portfolioStats.map((s, i) => ({
      value: s.value,
      label: s.label,
      description: s.description ?? null,
      sort_order: i,
    }))
  )
  if (statsErr) throw new Error(`portfolio_stats: ${statsErr.message}`)
  console.log(`✓ portfolio_stats: ${portfolioStats.length} rows`)

  const serviceRows = servicesList.map((s, i) => ({
    slug: s.id,
    title: s.title,
    description: s.description,
    icon_name: s.iconName,
    cta_text: s.ctaText,
    cta_href: s.ctaHref,
    sort_order: i,
  }))
  await upsert('services', serviceRows, 'slug')

  await supabase.from('skills').delete().neq('id', '00000000-0000-0000-0000-000000000000')
  await supabase.from('skill_groups').delete().neq('id', '00000000-0000-0000-0000-000000000000')
  for (let i = 0; i < skillGroups.length; i++) {
    const group = skillGroups[i]
    const { data: g, error: gErr } = await supabase
      .from('skill_groups')
      .insert({ category: group.category, sort_order: i })
      .select('id')
      .single()
    if (gErr || !g) throw new Error(`skill_groups: ${gErr?.message}`)
    if (group.skills.length) {
      const { error: sErr } = await supabase.from('skills').insert(
        group.skills.map((s, j) => ({
          group_id: g.id,
          name: s.name,
          experience_level: s.experienceLevel ?? null,
          years: s.years ?? null,
          icon_provider: s.iconProvider ?? null,
          icon_name: s.iconName ?? null,
          icon: s.icon ?? null,
          sort_order: j,
        }))
      )
      if (sErr) throw new Error(`skills: ${sErr.message}`)
    }
  }
  console.log(`✓ skill_groups + skills`)

  const certRows = certificationsList.map((c, i) => ({
    slug: c.id,
    title: c.title,
    provider: c.provider,
    date_label: c.date,
    credential_url: c.credentialUrl ?? null,
    sort_order: i,
  }))
  const sampleGallery = [
    {
      title: 'DevFest Owerri 2025 Tech Summit',
      caption: 'Directing visual design and logistics for South-East Nigeria largest developer festival.',
      image_url: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/dev-nnewBVnGcwatonVCQKc9zTtMdshDoM.jpg',
      alt: 'DevFest Owerri 2025',
      category: 'Events',
      featured: true,
      sort_order: 0,
    },
    {
      title: 'Build With AI 2025',
      caption: 'Facilitating AI developer workshops and prompt engineering sessions for FUTO students.',
      image_url: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/about-ItCmRGacGKzMpQbnPfGLfUfLEwWn3i.jpg',
      alt: 'Build With AI 2025 Workshop',
      category: 'Workshops',
      featured: true,
      sort_order: 1,
    },
    {
      title: 'NACOS FUTO Leadership Directorate',
      caption: 'Directing chapter digital infrastructure and student engagement initiatives across campus.',
      image_url: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/vol-ehxuFInSlnE81JZZijj6Bgoz9s2kcW.jpeg',
      alt: 'NACOS FUTO Leadership',
      category: 'Leadership',
      featured: true,
      sort_order: 2,
    },
    {
      title: 'Tech Nexus FUTO Summit',
      caption: 'Connecting computing students with industry mentors and technology engineering leaders.',
      image_url: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/eden2-sUzI0wvGmZMjB5UUP911IAB6WvBM5c.jpg',
      alt: 'Tech Nexus FUTO',
      category: 'Community',
      featured: false,
      sort_order: 3,
    },
    {
      title: 'Cowrywise Campus Fintech Advocacy',
      caption: 'Empowering university students with financial literacy and digital career skills.',
      image_url: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Hero-jwNXILOOhWA26ePzvza9GudcffKa9R.jpg',
      alt: 'Cowrywise Campus Advocacy',
      category: 'Volunteering',
      featured: false,
      sort_order: 4,
    },
  ]

  const { data: existingGallery } = await supabase.from('gallery_images').select('id').limit(1).maybeSingle()
  if (!existingGallery?.id) {
    const { error: galleryErr } = await supabase.from('gallery_images').insert(sampleGallery)
    if (galleryErr) console.warn('gallery_images seed notice:', galleryErr.message)
    else console.log(`✓ gallery_images: ${sampleGallery.length} rows`)
  }

  const sampleBrands = [
    {
      name: 'NACOS FUTO',
      logo_url: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/vol-ehxuFInSlnE81JZZijj6Bgoz9s2kcW.jpeg',
      website_url: 'https://nacos.org.ng',
      sort_order: 0,
    },
    {
      name: 'GDG Owerri',
      logo_url: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/dev-nnewBVnGcwatonVCQKc9zTtMdshDoM.jpg',
      website_url: 'https://gdg.community.dev',
      sort_order: 1,
    },
    {
      name: 'IEEE FUTO SB',
      logo_url: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/about-ItCmRGacGKzMpQbnPfGLfUfLEwWn3i.jpg',
      website_url: 'https://ieee.org',
      sort_order: 2,
    },
    {
      name: 'Build With AI',
      logo_url: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/about-ItCmRGacGKzMpQbnPfGLfUfLEwWn3i.jpg',
      sort_order: 3,
    },
    {
      name: 'DevFest Owerri',
      logo_url: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/dev-nnewBVnGcwatonVCQKc9zTtMdshDoM.jpg',
      sort_order: 4,
    },
  ]

  const { data: existingBrands } = await supabase.from('brand_partners').select('id').limit(1).maybeSingle()
  if (!existingBrands?.id) {
    const { error: brandErr } = await supabase.from('brand_partners').insert(sampleBrands)
    if (brandErr) console.warn('brand_partners seed notice:', brandErr.message)
    else console.log(`✓ brand_partners: ${sampleBrands.length} rows`)
  }

  console.log('\nSeed complete.')
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
