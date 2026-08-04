import { createReader } from '@keystatic/core/reader'
import config from '@/keystatic.config'

export const reader = createReader(process.cwd(), config)

// ─── JOURNAL READER ─────────────────────────────────────────────────────────
export async function getJournalArticles() {
  const slugs = await reader.collections.journal.list()
  const articles = await Promise.all(
    slugs.map(async (slug) => {
      const article = await reader.collections.journal.read(slug)
      if (!article) return null
      const content = await article.content()
      return {
        slug,
        title: article.title,
        excerpt: article.excerpt,
        coverImage: article.coverImage || '/placeholder.svg',
        category: article.category,
        tags: article.tags,
        featured: article.featured,
        pinned: article.pinned,
        publishedDate: article.publishedDate,
        lastUpdated: article.lastUpdated,
        author: article.author,
        seoTitle: article.seoTitle,
        seoDescription: article.seoDescription,
        draft: article.draft,
        content,
      }
    })
  )
  return articles
    .filter((a): a is NonNullable<typeof a> => a !== null && !a.draft)
    .sort((a, b) => new Date(b.publishedDate).getTime() - new Date(a.publishedDate).getTime())
}

export async function getJournalArticleBySlug(slug: string) {
  const article = await reader.collections.journal.read(slug)
  if (!article || article.draft) return null
  const content = await article.content()
  return {
    slug,
    title: article.title,
    excerpt: article.excerpt,
    coverImage: article.coverImage || '/placeholder.svg',
    category: article.category,
    tags: article.tags,
    featured: article.featured,
    pinned: article.pinned,
    publishedDate: article.publishedDate,
    lastUpdated: article.lastUpdated,
    author: article.author,
    seoTitle: article.seoTitle,
    seoDescription: article.seoDescription,
    content,
  }
}

// ─── PORTFOLIO READER ────────────────────────────────────────────────────────
export async function getPortfolioProjects() {
  const slugs = await reader.collections.portfolio.list()
  const projects = await Promise.all(
    slugs.map(async (slug) => {
      const project = await reader.collections.portfolio.read(slug)
      if (!project) return null
      const fullDescription = await project.fullDescription()
      return {
        slug,
        title: project.title,
        shortDescription: project.shortDescription,
        coverImage: project.coverImage || '/placeholder.svg',
        gallery: project.gallery,
        category: project.category,
        technologies: project.technologies,
        status: project.status,
        client: project.client,
        role: project.role,
        githubUrl: project.githubUrl,
        liveUrl: project.liveUrl,
        featured: project.featured,
        completionDate: project.completionDate,
        fullDescription,
      }
    })
  )
  return projects.filter((p): p is NonNullable<typeof p> => p !== null)
}

export async function getPortfolioProjectBySlug(slug: string) {
  const project = await reader.collections.portfolio.read(slug)
  if (!project) return null
  const fullDescription = await project.fullDescription()
  return {
    slug,
    title: project.title,
    shortDescription: project.shortDescription,
    coverImage: project.coverImage || '/placeholder.svg',
    gallery: project.gallery,
    category: project.category,
    technologies: project.technologies,
    status: project.status,
    client: project.client,
    role: project.role,
    githubUrl: project.githubUrl,
    liveUrl: project.liveUrl,
    featured: project.featured,
    completionDate: project.completionDate,
    fullDescription,
  }
}

// ─── COMMUNITY READER ────────────────────────────────────────────────────────
export async function getCommunityEntries() {
  const slugs = await reader.collections.community.list()
  const entries = await Promise.all(
    slugs.map(async (slug) => {
      const entry = await reader.collections.community.read(slug)
      if (!entry) return null
      const description = await entry.description()
      return {
        slug,
        organization: entry.organization,
        role: entry.role,
        duration: entry.duration,
        coverImage: entry.coverImage || '/placeholder.svg',
        gallery: entry.gallery,
        achievements: entry.achievements,
        impactStats: entry.impactStats,
        featured: entry.featured,
        tags: entry.tags,
        description,
      }
    })
  )
  return entries.filter((e): e is NonNullable<typeof e> => e !== null)
}

export async function getCommunityEntryBySlug(slug: string) {
  const entry = await reader.collections.community.read(slug)
  if (!entry) return null
  const description = await entry.description()
  return {
    slug,
    organization: entry.organization,
    role: entry.role,
    duration: entry.duration,
    coverImage: entry.coverImage || '/placeholder.svg',
    gallery: entry.gallery,
    achievements: entry.achievements,
    impactStats: entry.impactStats,
    featured: entry.featured,
    tags: entry.tags,
    description,
  }
}

// ─── SITE SETTINGS READER ───────────────────────────────────────────────────
export async function getSiteSettings() {
  const settings = await reader.singletons.siteSettings.read()
  return settings || {
    siteName: 'Nestor Cyber',
    authorName: 'Nestor Anyanwu',
    tagline: 'Tech Advocate, Designer & Community Leader',
    heroTitle: 'BUILDING DIGITAL FUTURE WITH PURPOSE',
    heroSubtitle: 'Director of ICT at NACOS FUTO, Data Privacy Ambassador, Software Engineer, and Community Leader.',
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
    analytics: {
      googleAnalyticsId: '',
    },
  }
}
