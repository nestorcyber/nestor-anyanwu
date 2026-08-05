import { createPublicClient } from '@/lib/supabase/public'
import type { ImpactStat, Tables } from '@/lib/supabase/types'

const PLACEHOLDER = '/placeholder.svg'

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
    coverImage: row.cover_image || PLACEHOLDER,
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
    coverImage: row.cover_image || PLACEHOLDER,
    gallery: (row.gallery ?? []).filter(Boolean),
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
    coverImage: row.cover_image || PLACEHOLDER,
    gallery: (row.gallery ?? []).filter(Boolean),
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
  const supabase = db()
  if (!supabase) return []
  const { data, error } = await supabase
    .from('journal_articles')
    .select('*')
    .eq('draft', false)
    .order('pinned', { ascending: false })
    .order('published_date', { ascending: false })

  if (error || !data) return []
  return data.map(mapJournal)
}

export async function getJournalArticleBySlug(slug: string): Promise<JournalArticle | null> {
  const supabase = db()
  if (!supabase) return null
  const { data, error } = await supabase
    .from('journal_articles')
    .select('*')
    .eq('slug', slug)
    .eq('draft', false)
    .maybeSingle()

  if (error || !data) return null
  return mapJournal(data)
}

export async function getPortfolioProjects(): Promise<PortfolioProject[]> {
  const supabase = db()
  if (!supabase) return []
  const { data, error } = await supabase
    .from('portfolio_projects')
    .select('*')
    .eq('draft', false)
    .order('sort_order', { ascending: true })
    .order('created_at', { ascending: false })

  if (error || !data) return []
  return data.map(mapPortfolio)
}

export async function getPortfolioProjectBySlug(slug: string): Promise<PortfolioProject | null> {
  const supabase = db()
  if (!supabase) return null
  const { data, error } = await supabase
    .from('portfolio_projects')
    .select('*')
    .eq('slug', slug)
    .eq('draft', false)
    .maybeSingle()

  if (error || !data) return null
  return mapPortfolio(data)
}

/** Card-shaped projects for library/showcase/projects page */
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
  if (!supabase) return []
  const { data, error } = await supabase
    .from('community_entries')
    .select('*')
    .eq('draft', false)
    .order('sort_order', { ascending: true })
    .order('created_at', { ascending: false })

  if (error || !data) return []
  return data.map(mapCommunity)
}

export async function getCommunityEntryBySlug(slug: string): Promise<CommunityEntry | null> {
  const supabase = db()
  if (!supabase) return null
  const { data, error } = await supabase
    .from('community_entries')
    .select('*')
    .eq('slug', slug)
    .eq('draft', false)
    .maybeSingle()

  if (error || !data) return null
  return mapCommunity(data)
}

export async function getJourneyItems(): Promise<JourneyItem[]> {
  const supabase = db()
  if (!supabase) return []
  const { data, error } = await supabase
    .from('journey_items')
    .select('*')
    .order('sort_order', { ascending: true })
    .order('created_at', { ascending: false })

  if (error || !data) return []
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

export async function getPortfolioStats(): Promise<PortfolioStat[]> {
  const supabase = db()
  if (!supabase) return []
  const { data, error } = await supabase
    .from('portfolio_stats')
    .select('*')
    .order('sort_order', { ascending: true })

  if (error || !data) return []
  return data.map((row) => ({
    value: row.value,
    label: row.label,
    description: row.description || undefined,
  }))
}

export async function getServices(): Promise<ServiceItem[]> {
  const supabase = db()
  if (!supabase) return []
  const { data, error } = await supabase
    .from('services')
    .select('*')
    .order('sort_order', { ascending: true })

  if (error || !data) return []
  return data.map((row) => ({
    id: row.slug,
    title: row.title,
    description: row.description,
    iconName: row.icon_name,
    ctaText: row.cta_text,
    ctaHref: row.cta_href,
  }))
}

export async function getSkillGroups(): Promise<SkillGroup[]> {
  const supabase = db()
  if (!supabase) return []
  const { data: groups, error } = await supabase
    .from('skill_groups')
    .select('*')
    .order('sort_order', { ascending: true })

  if (error || !groups) return []

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

export async function getCertifications(): Promise<CertificationItem[]> {
  const supabase = db()
  if (!supabase) return []
  const { data, error } = await supabase
    .from('certifications')
    .select('*')
    .order('sort_order', { ascending: true })

  if (error || !data) return []
  return data.map((row) => ({
    id: row.slug,
    title: row.title,
    provider: row.provider,
    date: row.date_label,
    credentialUrl: row.credential_url || undefined,
  }))
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
