import fs from 'node:fs'
import path from 'node:path'
import matter from 'gray-matter'
import { createPublicClient } from '@/lib/supabase/public'
import type { ImpactStat, Tables } from '@/lib/supabase/types'
import {
  journeyTimeline,
  portfolioStats as fallbackPortfolioStats,
  projects as fallbackProjects,
  servicesList as fallbackServicesList,
  skillGroups as fallbackSkillGroups,
  certificationsList as fallbackCertificationsList,
} from '@/lib/data'

import { getOptimizedImageUrl } from '@/lib/cloudinary'

const PLACEHOLDER = '/placeholder.svg'

function readLocalMdxDir(dirPath: string) {
  try {
    const abs = path.join(process.cwd(), dirPath)
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
  } catch (err) {
    return []
  }
}

export type JournalArticle = {
  id: string
  slug: string
  title: string
  excerpt: string
  coverImage: string
  category: string
  tags: string[]
  featured: boolean
  pinned: boolean
  publishedDate: string
  lastUpdated: string | null
  author: string
  seoTitle: string | null
  seoDescription: string | null
  content: string
}

export type PortfolioProject = {
  id: string
  slug: string
  title: string
  shortDescription: string
  coverImage: string
  gallery: string[]
  category: string
  technologies: string[]
  status: string
  client: string | null
  role: string | null
  githubUrl: string | null
  liveUrl: string | null
  caseStudyUrl: string | null
  featured: boolean
  completionDate: string | null
  fullDescription: string
}

export type CommunityEntry = {
  id: string
  slug: string
  organization: string
  role: string
  duration: string
  coverImage: string
  gallery: string[]
  achievements: string[]
  impactStats: ImpactStat[]
  featured: boolean
  tags: string[]
  description: string
}

export type JourneyItem = {
  id: string
  title: string
  organization: string
  role?: string
  date: string
  description: string
  type: 'work' | 'volunteer' | 'membership' | 'milestone'
  details?: string[]
  images?: string[]
}

export type ProjectItem = {
  id?: string
  title: string
  category?: string
  description: string
  technologies: string[]
  role?: string
  image?: string
  status?: string
  links: { demo?: string; caseStudy?: string; github?: string }
  slug?: string
}

export type PortfolioStat = {
  value: string
  label: string
  description?: string
}

export type ServiceItem = {
  id: string
  title: string
  description: string
  iconName: string
  ctaText: string
  ctaHref: string
}

export type SkillGroup = {
  category: string
  skills: { name: string; experienceLevel?: string; years?: string }[]
}

export type CertificationItem = {
  id: string
  title: string
  provider: string
  date: string
  credentialUrl?: string
}

export type SiteSettings = {
  siteName: string
  authorName: string
  tagline: string
  heroTitle: string
  heroSubtitle: string
  contactEmail: string
  location: string
  availabilityStatus: string
  socialLinks: {
    github: string
    linkedin: string
    twitter: string
    behance: string
    whatsapp: string
  }
  analytics: { googleAnalyticsId: string }
}

const defaultSettings: SiteSettings = {
  siteName: 'Nestor Cyber',
  authorName: 'Nestor Anyanwu',
  tagline: 'Tech Advocate, Designer & Community Leader',
  heroTitle: 'BUILDING DIGITAL FUTURE WITH PURPOSE',
  heroSubtitle:
    'Director of ICT at NACOS FUTO, Data Privacy Ambassador, Software Engineer, and Community Leader.',
  contactEmail: 'nestoranyanwu@gmail.com',
  location: 'Owerri, Imo State, Nigeria',
  availabilityStatus: 'Available for Work',
  socialLinks: {
    github: 'https://github.com/nestorcyber',
    linkedin: 'https://linkedin.com/in/nestoranyanwu',
    twitter: 'https://twitter.com/nestorcyber',
    behance: 'https://behance.net/nestorcyber',
    whatsapp: 'https://wa.me/message/GJIXLHQQPYDIE1',
  },
  analytics: { googleAnalyticsId: '' },
}

function mapJournal(row: Tables<'journal_articles'>): JournalArticle {
  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    excerpt: row.excerpt,
    coverImage: getOptimizedImageUrl(row.cover_image || PLACEHOLDER, { width: 1200 }),
    category: row.category,
    tags: row.tags ?? [],
    featured: row.featured,
    pinned: row.pinned,
    publishedDate: row.published_date || new Date().toISOString().split('T')[0],
    lastUpdated: row.last_updated,
    author: row.author,
    seoTitle: row.seo_title,
    seoDescription: row.seo_description,
    content: row.content,
  }
}

function mapPortfolio(row: Tables<'portfolio_projects'>): PortfolioProject {
  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    shortDescription: row.short_description,
    coverImage: getOptimizedImageUrl(row.cover_image || PLACEHOLDER, { width: 1200 }),
    gallery: (row.gallery ?? [])
      .filter(Boolean)
      .map((url) => getOptimizedImageUrl(url, { width: 1200 })),
    category: row.category,
    technologies: row.technologies ?? [],
    status: row.status,
    client: row.client,
    role: row.role,
    githubUrl: row.github_url,
    liveUrl: row.live_url,
    caseStudyUrl: row.case_study_url,
    featured: row.featured,
    completionDate: row.completion_date,
    fullDescription: row.full_description,
  }
}

function mapCommunity(row: Tables<'community_entries'>): CommunityEntry {
  return {
    id: row.id,
    slug: row.slug,
    organization: row.organization,
    role: row.role,
    duration: row.duration,
    coverImage: getOptimizedImageUrl(row.cover_image || PLACEHOLDER, { width: 1200 }),
    gallery: (row.gallery ?? [])
      .filter(Boolean)
      .map((url) => getOptimizedImageUrl(url, { width: 1200 })),
    achievements: row.achievements ?? [],
    impactStats: (row.impact_stats as ImpactStat[]) ?? [],
    featured: row.featured,
    tags: row.tags ?? [],
    description: row.description,
  }
}

function db() {
  return createPublicClient()
}

export async function getJournalArticles(): Promise<JournalArticle[]> {
  const localFiles = readLocalMdxDir('content/journal')
  const localArticles: JournalArticle[] = localFiles
    .map(({ slug, data, content }) => ({
      id: slug,
      slug,
      title: data.title ?? slug,
      excerpt: data.excerpt ?? '',
      coverImage: data.coverImage || PLACEHOLDER,
      category: data.category ?? 'Technology',
      tags: data.tags ?? [],
      featured: !!data.featured,
      pinned: !!data.pinned,
      publishedDate: data.publishedDate ? String(data.publishedDate) : '2026-01-15',
      lastUpdated: data.lastUpdated ? String(data.lastUpdated) : null,
      author: data.author ?? 'Nestor Anyanwu',
      seoTitle: data.seoTitle ?? null,
      seoDescription: data.seoDescription ?? null,
      content,
    }))

  const supabase = db()
  let dbArticles: JournalArticle[] = []
  if (supabase) {
    const { data, error } = await supabase
      .from('journal_articles')
      .select('*')
      .order('pinned', { ascending: false })
      .order('published_date', { ascending: false })

    if (!error && data) {
      dbArticles = data.map(mapJournal)
    }
  }

  const dbSlugs = new Set(dbArticles.map((a) => a.slug))
  const combined = [
    ...dbArticles,
    ...localArticles.filter((a) => !dbSlugs.has(a.slug)),
  ]

  return combined.sort((a, b) => {
    if (a.pinned !== b.pinned) return a.pinned ? -1 : 1
    return new Date(b.publishedDate).getTime() - new Date(a.publishedDate).getTime()
  })
}

export async function getJournalArticleBySlug(slug: string): Promise<JournalArticle | null> {
  const articles = await getJournalArticles()
  return articles.find((a) => a.slug === slug) || null
}

export async function getPortfolioProjects(): Promise<PortfolioProject[]> {
  const supabase = db()
  if (supabase) {
    const { data, error } = await supabase
      .from('portfolio_projects')
      .select('*')
      .eq('draft', false)
      .order('sort_order', { ascending: true })
      .order('created_at', { ascending: false })

    if (!error && data && data.length > 0) {
      return data.map(mapPortfolio)
    }
  }

  // Fallback to local MDX files
  const localFiles = readLocalMdxDir('content/portfolio')
  if (localFiles.length > 0) {
    return localFiles
      .filter(({ data }) => !data.draft)
      .map(({ slug, data, content }) => ({
        id: slug,
        slug,
        title: data.title ?? slug,
        shortDescription: data.shortDescription ?? '',
        coverImage: data.coverImage || PLACEHOLDER,
        gallery: data.gallery ?? [],
        category: data.category ?? 'Software',
        technologies: data.technologies ?? [],
        status: data.status ?? 'Completed',
        client: data.client ?? null,
        role: data.role ?? null,
        githubUrl: data.githubUrl ?? null,
        liveUrl: data.liveUrl ?? null,
        caseStudyUrl: data.caseStudyUrl ?? `/portfolio/${slug}`,
        featured: !!data.featured,
        completionDate: data.completionDate ? String(data.completionDate) : null,
        fullDescription: content,
      }))
  }

  // Fallback to data.ts projects
  return fallbackProjects.map((p) => ({
    id: p.title.toLowerCase().replace(/\s+/g, '-'),
    slug: p.title.toLowerCase().replace(/\s+/g, '-'),
    title: p.title,
    shortDescription: p.description,
    coverImage: p.image || PLACEHOLDER,
    gallery: [],
    category: p.category || 'Software',
    technologies: p.technologies,
    status: p.status || 'Completed',
    client: null,
    role: p.role || null,
    githubUrl: p.links.github || null,
    liveUrl: p.links.demo || null,
    caseStudyUrl: p.links.caseStudy || null,
    featured: true,
    completionDate: null,
    fullDescription: p.description,
  }))
}

export async function getPortfolioProjectBySlug(slug: string): Promise<PortfolioProject | null> {
  const projects = await getPortfolioProjects()
  return projects.find((p) => p.slug === slug) || null
}

export async function getProjectItems(): Promise<ProjectItem[]> {
  const projects = await getPortfolioProjects()
  return projects.map((p) => ({
    id: p.slug,
    slug: p.slug,
    title: p.title,
    category: p.category,
    description: p.shortDescription,
    technologies: p.technologies,
    role: p.role || undefined,
    image: p.coverImage,
    status: p.status,
    links: {
      demo: p.liveUrl || undefined,
      caseStudy: p.caseStudyUrl || `/portfolio/${p.slug}`,
      github: p.githubUrl || undefined,
    },
  }))
}

export async function getCommunityEntries(): Promise<CommunityEntry[]> {
  const supabase = db()
  if (supabase) {
    const { data, error } = await supabase
      .from('community_entries')
      .select('*')
      .eq('draft', false)
      .order('sort_order', { ascending: true })
      .order('created_at', { ascending: false })

    if (!error && data && data.length > 0) {
      return data.map(mapCommunity)
    }
  }

  // Fallback to local MDX
  const localFiles = readLocalMdxDir('content/community')
  return localFiles
    .filter(({ data }) => !data.draft)
    .map(({ slug, data, content }) => ({
      id: slug,
      slug,
      organization: data.organization ?? slug,
      role: data.role ?? '',
      duration: data.duration ?? '',
      coverImage: data.coverImage || PLACEHOLDER,
      gallery: data.gallery ?? [],
      achievements: data.achievements ?? [],
      impactStats: data.impactStats ?? [],
      featured: !!data.featured,
      tags: data.tags ?? [],
      description: content || data.description || '',
    }))
}

export async function getCommunityEntryBySlug(slug: string): Promise<CommunityEntry | null> {
  const entries = await getCommunityEntries()
  return entries.find((e) => e.slug === slug) || null
}

export async function getJourneyItems(): Promise<JourneyItem[]> {
  const supabase = db()
  if (supabase) {
    const { data, error } = await supabase
      .from('journey_items')
      .select('*')
      .order('sort_order', { ascending: true })
      .order('created_at', { ascending: false })

    if (!error && data && data.length > 0) {
      return data.map((row) => ({
        id: row.id,
        title: row.title,
        organization: row.organization,
        role: row.role || undefined,
        date: row.date_label,
        description: row.description,
        type: row.type,
        details: row.details ?? [],
        images: row.images ?? [],
      }))
    }
  }

  // Fallback to lib/data.ts journeyTimeline
  return journeyTimeline.map((item) => ({
    id: String(item.id),
    title: item.title,
    organization: item.organization,
    role: item.role,
    date: item.date,
    description: item.description,
    type: item.type,
    details: item.details,
    images: item.images,
  }))
}

export async function getPortfolioStats(): Promise<PortfolioStat[]> {
  const supabase = db()
  if (supabase) {
    const { data, error } = await supabase
      .from('portfolio_stats')
      .select('*')
      .order('sort_order', { ascending: true })

    if (!error && data && data.length > 0) {
      return data.map((row) => ({
        value: row.value,
        label: row.label,
        description: row.description || undefined,
      }))
    }
  }

  return fallbackPortfolioStats
}

export async function getServices(): Promise<ServiceItem[]> {
  const supabase = db()
  if (supabase) {
    const { data, error } = await supabase
      .from('services')
      .select('*')
      .order('sort_order', { ascending: true })

    if (!error && data && data.length > 0) {
      return data.map((row) => ({
        id: row.slug,
        title: row.title,
        description: row.description,
        iconName: row.icon_name,
        ctaText: row.cta_text,
        ctaHref: row.cta_href,
      }))
    }
  }

  return fallbackServicesList
}

export async function getSkillGroups(): Promise<SkillGroup[]> {
  const supabase = db()
  if (supabase) {
    const { data: groups, error } = await supabase
      .from('skill_groups')
      .select('*')
      .order('sort_order', { ascending: true })

    if (!error && groups && groups.length > 0) {
      const { data: skills } = await supabase
        .from('skills')
        .select('*')
        .order('sort_order', { ascending: true })

      return groups.map((group) => ({
        category: group.category,
        skills: (skills ?? [])
          .filter((s) => s.group_id === group.id)
          .map((s) => ({
            name: s.name,
            experienceLevel: s.experience_level || undefined,
            years: s.years || undefined,
          })),
      }))
    }
  }

  return fallbackSkillGroups
}

export async function getCertifications(): Promise<CertificationItem[]> {
  const supabase = db()
  if (supabase) {
    const { data, error } = await supabase
      .from('certifications')
      .select('*')
      .order('sort_order', { ascending: true })

    if (!error && data && data.length > 0) {
      return data.map((row) => ({
        id: row.slug,
        title: row.title,
        provider: row.provider,
        date: row.date_label,
        credentialUrl: row.credential_url || undefined,
      }))
    }
  }

  return fallbackCertificationsList
}

export async function getStandaloneGalleryImages(): Promise<
  { id: string; url: string; title?: string; alt?: string }[]
> {
  const supabase = db()
  if (!supabase) return []
  const { data } = await supabase
    .from('gallery_images')
    .select('*')
    .order('sort_order', { ascending: true })

  return (data ?? []).map((row) => ({
    id: row.id,
    url: row.image_url,
    title: row.title || undefined,
    alt: row.alt || undefined,
  }))
}

export async function getGalleryImages(): Promise<{ id: string; url: string; title?: string; alt?: string }[]> {
  const supabase = db()
  if (!supabase) return []
  const [standalone, journeyItems] = await Promise.all([
    getStandaloneGalleryImages(),
    getJourneyItems(),
  ])

  const fromJourney = journeyItems.flatMap((item) =>
    (item.images ?? [])
      .filter((url) => url && !url.includes('placeholder'))
      .map((url, i) => ({
        id: `${item.id}-${i}`,
        url,
        title: item.title,
        alt: item.title,
      }))
  )

  return [...standalone, ...fromJourney]
}

export async function getSiteSettings(): Promise<SiteSettings> {
  const supabase = db()
  if (!supabase) return defaultSettings
  const { data, error } = await supabase.from('site_settings').select('*').limit(1).maybeSingle()

  if (error || !data) return defaultSettings

  return {
    siteName: data.site_name,
    authorName: data.author_name,
    tagline: data.tagline,
    heroTitle: data.hero_title,
    heroSubtitle: data.hero_subtitle,
    contactEmail: data.contact_email,
    location: data.location,
    availabilityStatus: data.availability_status,
    socialLinks: {
      github: data.social_github,
      linkedin: data.social_linkedin,
      twitter: data.social_twitter,
      behance: data.social_behance,
      whatsapp: data.social_whatsapp,
    },
    analytics: { googleAnalyticsId: data.google_analytics_id },
  }
}
