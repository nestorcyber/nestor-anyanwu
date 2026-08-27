import {
  getCertifications,
  getCommunityEntries,
  getJournalArticles,
  getJourneyItems,
  getProjectItems,
  getServices,
  getSkillGroups,
} from "@/lib/content"

export interface SearchResult {
  id: string
  title: string
  description: string
  category: "Page" | "Project" | "Service" | "Skill" | "Journal" | "Community" | "Experience" | "Certification" | "Membership"
  href: string
  keywords?: string[]
}

const pageEntries: SearchResult[] = [
  {
    id: "page-home",
    title: "Home Page",
    description: "Nestor Anyanwu's portfolio home page: software engineer, tech leader, and community builder.",
    category: "Page",
    href: "/",
    keywords: ["nestor", "cyber", "home", "nestor cyber", "nestor anyanwu", "main", "hero"],
  },
  {
    id: "page-about",
    title: "About Nestor",
    description: "Profile, vision, background, philosophy, and engineering journey of Nestor Anyanwu.",
    category: "Page",
    href: "/about",
    keywords: ["about", "profile", "bio", "futo", "computer science", "background", "philosophy", "story"],
  },
  {
    id: "page-portfolio",
    title: "Portfolio & Projects",
    description: "Full directory of software projects, web apps, brand design systems, and engineering deliverables.",
    category: "Page",
    href: "/portfolio",
    keywords: ["projects", "portfolio", "work", "apps", "code", "design", "case studies", "engineering"],
  },
  {
    id: "page-certifications",
    title: "Licenses & Certifications",
    description: "Verified licenses, engineering accreditations, and technical credentials earned by Nestor Anyanwu.",
    category: "Page",
    href: "/certifications",
    keywords: ["certifications", "licenses", "credentials", "aws", "ieee", "gotni", "ndpc", "data privacy"],
  },
  {
    id: "page-memberships",
    title: "Memberships & Affiliations",
    description: "Accredited professional memberships, industry councils, and associations contributing to technology policy and governance.",
    category: "Page",
    href: "/memberships",
    keywords: ["memberships", "affiliations", "ncs", "aaai", "isoc", "fintechngr", "nira", "ndpc", "councils", "associations"],
  },
  {
    id: "page-community",
    title: "Community & Impact",
    description: "Volunteering, developer relations, student leadership, and tech community empowerment.",
    category: "Page",
    href: "/community",
    keywords: ["community", "volunteering", "devrel", "gdg", "nacos", "ieee", "leadership", "impact"],
  },
  {
    id: "page-journal",
    title: "Journal & Essays",
    description: "Technical writing, engineering reflections, tech policy, and leadership thoughts.",
    category: "Page",
    href: "/journal",
    keywords: ["journal", "blog", "articles", "writing", "essays", "thoughts"],
  },
  {
    id: "page-gallery",
    title: "Photo Gallery",
    description: "Visual documentation of tech summits, DevFest, hackathons, and community moments.",
    category: "Page",
    href: "/gallery",
    keywords: ["gallery", "photos", "events", "devfest", "summit", "pictures", "moments", "photography"],
  },
  {
    id: "page-contact",
    title: "Contact & Collaboration",
    description: "Get in touch with Nestor Anyanwu for projects, consulting, speaking, or collaborations.",
    category: "Page",
    href: "/contact",
    keywords: ["contact", "hire", "collaborate", "email", "reach", "message", "consulting"],
  },
]

import { unstable_cache } from 'next/cache'

export async function getSearchIndex(): Promise<SearchResult[]> {
  const [projects, services, skillGroups, journeyTimeline, certifications, articles, communityEntriesList] =
    await Promise.all([
      getProjectItems(),
      getServices(),
      getSkillGroups(),
      getJourneyItems(),
      getCertifications(),
      getJournalArticles(),
      getCommunityEntries(),
    ])

  const projectEntries: SearchResult[] = projects.map((p) => ({
    id: `project-${p.id || p.slug}`,
    title: p.title,
    description: p.description,
    category: "Project",
    href: `/portfolio/${p.slug}`,
    keywords: [
      p.title.toLowerCase(),
      p.category ? p.category.toLowerCase() : "",
      ...(p.technologies || []).map((t) => t.toLowerCase()),
      p.role ? p.role.toLowerCase() : "",
    ].filter(Boolean),
  }))

  const serviceEntries: SearchResult[] = services.map((s) => ({
    id: `service-${s.id || s.title.toLowerCase().replace(/\s+/g, "-")}`,
    title: s.title,
    description: s.description,
    category: "Service",
    href: s.ctaHref || "/contact",
    keywords: [s.title.toLowerCase(), "service", "consulting", "offer", "freelance"],
  }))

  const skillEntries: SearchResult[] = skillGroups.flatMap((group) =>
    group.skills.map((skill) => ({
      id: `skill-${skill.name.toLowerCase().replace(/\s+/g, "-")}`,
      title: skill.name,
      description: `${group.category} | ${skill.experienceLevel || "Proficient"} (${skill.years || "Active"})`,
      category: "Skill",
      href: "/portfolio",
      keywords: [skill.name.toLowerCase(), group.category.toLowerCase(), "stack", "tool", "expertise"],
    }))
  )

  const journeyEntries: SearchResult[] = journeyTimeline.map((j) => {
    const isMembership = j.type === "membership"
    return {
      id: `journey-${j.id}`,
      title: `${j.title} | ${j.organization}`,
      description: `${j.description} (${j.date})`,
      category: isMembership ? "Membership" : "Experience",
      href: isMembership ? "/memberships" : "/experience",
      keywords: [
        j.title.toLowerCase(),
        j.organization.toLowerCase(),
        ...(j.details || []).map((d) => d.toLowerCase()),
        j.type,
      ],
    }
  })

  const certEntries: SearchResult[] = certifications.map((c) => ({
    id: `cert-${c.id}`,
    title: c.title,
    description: `Issued by ${c.provider} (${c.date})`,
    category: "Certification",
    href: "/certifications",
    keywords: [c.title.toLowerCase(), c.provider.toLowerCase(), "certification", "credential"],
  }))

  const journalEntries: SearchResult[] = articles.map((a) => ({
    id: `journal-${a.slug}`,
    title: a.title,
    description: a.excerpt,
    category: "Journal" as const,
    href: `/journal/${a.slug}`,
    keywords: [a.title.toLowerCase(), a.category.toLowerCase(), ...(a.tags || []).map((t) => t.toLowerCase())],
  }))

  const communityEntries: SearchResult[] = communityEntriesList.map((c) => ({
    id: `community-${c.slug}`,
    title: `${c.organization} | ${c.role}`,
    description: c.description || `${c.organization} community impact and leadership role.`,
    category: "Community" as const,
    href: `/community/${c.slug}`,
    keywords: [c.organization.toLowerCase(), c.role.toLowerCase(), ...(c.tags || []).map((t) => t.toLowerCase())],
  }))

  return [
    ...pageEntries,
    ...projectEntries,
    ...serviceEntries,
    ...skillEntries,
    ...journeyEntries,
    ...certEntries,
    ...journalEntries,
    ...communityEntries,
  ]
}

export const buildSearchIndex = unstable_cache(
  async () => getSearchIndex(),
  ['full-search-index'],
  {
    revalidate: 3600,
    tags: ['search-index'],
  }
)

export function searchInIndex(index: SearchResult[], query: string): SearchResult[] {
  if (!query.trim()) return []
  const rawQ = query.toLowerCase().trim()
  const tokens = rawQ.split(/\s+/).filter(Boolean)

  return index
    .map((item) => {
      const titleLower = item.title.toLowerCase()
      const descLower = item.description.toLowerCase()
      const catLower = item.category.toLowerCase()
      const keywords = (item.keywords || []).map((k) => k.toLowerCase())

      let score = 0
      // Exact full query match bonus
      if (titleLower.includes(rawQ)) score += 10
      if (descLower.includes(rawQ)) score += 5
      if (catLower.includes(rawQ)) score += 4

      // Token matches
      for (const token of tokens) {
        if (titleLower.includes(token)) score += 4
        if (descLower.includes(token)) score += 2
        if (catLower.includes(token)) score += 2
        if (keywords.some((kw) => kw.includes(token))) score += 3
      }

      return { item, score }
    })
    .filter((entry) => entry.score > 0)
    .sort((a, b) => b.score - a.score)
    .map((entry) => entry.item)
}

export const searchIndex: SearchResult[] = pageEntries

export function searchContent(query: string): SearchResult[] {
  return searchInIndex(searchIndex, query)
}

export const popularPages: SearchResult[] = pageEntries.slice(0, 5)

export function groupResults(results: SearchResult[]): Record<string, SearchResult[]> {
  const groups: Record<string, SearchResult[]> = {}
  for (const item of results) {
    const cat = item.category
    if (!groups[cat]) groups[cat] = []
    groups[cat].push(item)
  }
  return groups
}
