// Central universal search index — dynamically indexes all site content & data sources
import { projects, journeyTimeline, skillGroups, servicesList, certificationsList } from "@/lib/data"

export interface SearchResult {
  id: string
  title: string
  description: string
  category: "Page" | "Project" | "Service" | "Skill" | "Journal" | "Community" | "Experience" | "Certification"
  href: string
  keywords?: string[]
}

// ─── Pages ───────────────────────────────────────────────────────────────────
const pageEntries: SearchResult[] = [
  {
    id: "page-home",
    title: "Home Page",
    description: "Nestor Anyanwu's portfolio home page — software engineer, tech leader, and community builder.",
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
    keywords: ["portfolio", "projects", "work", "engineering", "design", "deliverables", "showcase", "library"],
  },
  {
    id: "page-community",
    title: "Community & Leadership",
    description: "ICT leadership at NACOS, IEEE, GDG Owerri, Cowrywise, and developer community impact.",
    category: "Page",
    href: "/community",
    keywords: ["community", "nacos", "ieee", "gdg", "leadership", "volunteer", "owerri", "impact", "advocacy"],
  },
  {
    id: "page-journal",
    title: "Journal & Technical Essays",
    description: "Technical essays, thought leadership, AI ethics, and insights on technology and design.",
    category: "Page",
    href: "/journal",
    keywords: ["journal", "articles", "blog", "essays", "writing", "tech writing", "thoughts", "publications"],
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
    id: "page-journey",
    title: "Career Journey & Timeline",
    description: "Interactive timeline of milestones, positions, organizations, and career achievements.",
    category: "Page",
    href: "/journey",
    keywords: ["journey", "career", "timeline", "milestones", "history", "experience", "resume", "cv"],
  },
  {
    id: "page-contact",
    title: "Contact & Collaboration",
    description: "Start a project, business inquiry, speaking invitation, or community partnership.",
    category: "Page",
    href: "/contact",
    keywords: ["contact", "collaborate", "hire", "email", "project", "speaking", "work together", "whatsapp"],
  },
]

// ─── Dynamic Projects Indexing ───────────────────────────────────────────────
const projectEntries: SearchResult[] = projects.map((p) => ({
  id: `project-${p.id || p.title.toLowerCase().replace(/\s+/g, "-")}`,
  title: p.title,
  description: `${p.description} (Role: ${p.role || "Developer"}, Technologies: ${p.technologies.join(", ")})`,
  category: "Project",
  href: p.id ? `/portfolio/${p.id}` : "/portfolio",
  keywords: [p.title.toLowerCase(), ...(p.technologies || []).map((t) => t.toLowerCase()), p.category?.toLowerCase() || "portfolio"],
}))

// ─── Dynamic Services Indexing ───────────────────────────────────────────────
const serviceEntries: SearchResult[] = servicesList.map((s) => ({
  id: `service-${s.id}`,
  title: s.title,
  description: s.description,
  category: "Service",
  href: s.ctaHref || "/contact",
  keywords: [s.title.toLowerCase(), "service", "consulting", "offer", "freelance"],
}))

// ─── Dynamic Skills Indexing ──────────────────────────────────────────────────
const skillEntries: SearchResult[] = skillGroups.flatMap((group) =>
  group.skills.map((skill) => ({
    id: `skill-${skill.name.toLowerCase().replace(/\s+/g, "-")}`,
    title: skill.name,
    description: `${group.category} — ${skill.experienceLevel || "Proficient"} (${skill.years || "Active"})`,
    category: "Skill",
    href: "/portfolio",
    keywords: [skill.name.toLowerCase(), group.category.toLowerCase(), "stack", "tool", "expertise"],
  }))
)

// ─── Dynamic Journey & Experience Indexing ───────────────────────────────────
const journeyEntries: SearchResult[] = journeyTimeline.map((j) => ({
  id: `journey-${j.id}`,
  title: `${j.title} — ${j.organization}`,
  description: `${j.description} (${j.date})`,
  category: "Experience",
  href: "/journey",
  keywords: [j.title.toLowerCase(), j.organization.toLowerCase(), ...(j.details || []).map((d) => d.toLowerCase()), j.type],
}))

// ─── Dynamic Certifications Indexing ────────────────────────────────────────
const certEntries: SearchResult[] = certificationsList.map((c) => ({
  id: `cert-${c.id}`,
  title: c.title,
  description: `Issued by ${c.provider} (${c.date})`,
  category: "Certification",
  href: "/about",
  keywords: [c.title.toLowerCase(), c.provider.toLowerCase(), "certification", "credential"],
}))

// ─── Master Universal Search Index ────────────────────────────────────────────
export const searchIndex: SearchResult[] = [
  ...pageEntries,
  ...projectEntries,
  ...serviceEntries,
  ...skillEntries,
  ...journeyEntries,
  ...certEntries,
]

// Search function — returns results sorted by universal relevance
export function searchContent(query: string): SearchResult[] {
  if (!query.trim()) return []
  const q = query.toLowerCase().trim()

  return searchIndex
    .filter((item) => {
      const titleMatch = item.title.toLowerCase().includes(q)
      const descMatch = item.description.toLowerCase().includes(q)
      const keywordMatch = item.keywords?.some((kw) => kw.includes(q)) ?? false
      const categoryMatch = item.category.toLowerCase().includes(q)
      return titleMatch || descMatch || keywordMatch || categoryMatch
    })
    .sort((a, b) => {
      const aTitleExact = a.title.toLowerCase().startsWith(q) ? 4 : 0
      const bTitleExact = b.title.toLowerCase().startsWith(q) ? 4 : 0
      const aTitleMatch = a.title.toLowerCase().includes(q) ? 2 : 0
      const bTitleMatch = b.title.toLowerCase().includes(q) ? 2 : 0
      const aKeywordMatch = a.keywords?.some((kw) => kw.startsWith(q)) ? 1 : 0
      const bKeywordMatch = b.keywords?.some((kw) => kw.startsWith(q)) ? 1 : 0
      return bTitleExact + bTitleMatch + bKeywordMatch - (aTitleExact + aTitleMatch + aKeywordMatch)
    })
}
