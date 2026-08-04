// Central search index — statically built from all site content
// Future CMS compatibility: replace static imports with API calls

export interface SearchResult {
  id: string
  title: string
  description: string
  category: "Page" | "Project" | "Service" | "Skill" | "Journal" | "Community"
  href: string
  keywords?: string[]
}

export const searchIndex: SearchResult[] = [
  // ─── Pages ───────────────────────────────────────────────────────────────────
  {
    id: "page-home",
    title: "Home",
    description: "Nestor Anyanwu's personal website — software engineer, tech leader, and community builder.",
    category: "Page",
    href: "/",
    keywords: ["nestor", "cyber", "home", "nestor cyber", "nestor anyanwu"],
  },
  {
    id: "page-about",
    title: "About Nestor",
    description: "Profile, vision, academic background, and engineering journey of Nestor Anyanwu.",
    category: "Page",
    href: "/about",
    keywords: ["about", "profile", "bio", "futo", "computer science", "background"],
  },
  {
    id: "page-portfolio",
    title: "Portfolio & Projects",
    description: "Featured software projects, web apps, brand design systems, and engineering deliverables.",
    category: "Page",
    href: "/portfolio",
    keywords: ["portfolio", "projects", "work", "engineering", "design", "deliverables"],
  },
  {
    id: "page-community",
    title: "Community & Leadership",
    description: "ICT leadership at NACOS, IEEE, GDG Owerri, and other developer community roles.",
    category: "Page",
    href: "/community",
    keywords: ["community", "nacos", "ieee", "gdg", "leadership", "volunteer", "owerri"],
  },
  {
    id: "page-journal",
    title: "Journal & Articles",
    description: "Technical essays, thought leadership, and insights on technology and community advocacy.",
    category: "Page",
    href: "/journal",
    keywords: ["journal", "articles", "blog", "essays", "writing", "tech writing"],
  },
  {
    id: "page-gallery",
    title: "Photo Gallery",
    description: "Visual moments from tech summits, DevFest, hackathons, and community events.",
    category: "Page",
    href: "/gallery",
    keywords: ["gallery", "photos", "events", "devfest", "summit", "pictures"],
  },
  {
    id: "page-journey",
    title: "Career Journey",
    description: "Professional timeline — milestones, roles, organizations, and engineering achievements.",
    category: "Page",
    href: "/journey",
    keywords: ["journey", "career", "timeline", "milestones", "history", "experience"],
  },
  {
    id: "page-contact",
    title: "Contact & Collaboration",
    description: "Start a project, business inquiry, speaking invitation, or partnership discussion.",
    category: "Page",
    href: "/contact",
    keywords: ["contact", "collaborate", "hire", "email", "project", "speaking", "work together"],
  },

  // ─── Services ─────────────────────────────────────────────────────────────────
  {
    id: "service-software-dev",
    title: "Software Development",
    description: "Building production-grade web applications, robust APIs, and custom software systems.",
    category: "Service",
    href: "/contact",
    keywords: ["software", "development", "web app", "api", "backend", "frontend"],
  },
  {
    id: "service-web-dev",
    title: "Website Development",
    description: "Modern, responsive, SEO-optimized web platforms using Next.js, React, and Tailwind CSS.",
    category: "Service",
    href: "/contact",
    keywords: ["website", "nextjs", "react", "web design", "seo", "tailwind"],
  },
  {
    id: "service-graphic-design",
    title: "Graphic Design & Branding",
    description: "Brand identities, conference graphics, marketing collateral, and visual systems.",
    category: "Service",
    href: "/contact",
    keywords: ["design", "branding", "logo", "identity", "graphics", "visual", "coreldraw", "figma"],
  },
  {
    id: "service-business-registration",
    title: "Business Registration & Digital Support",
    description: "Guiding startups through formal registration and digital setup workflows.",
    category: "Service",
    href: "/contact",
    keywords: ["business", "registration", "startup", "digital", "cac", "setup"],
  },
  {
    id: "service-automation",
    title: "Business Automation",
    description: "Automating repetitive workflows using AI integrations and cloud tools.",
    category: "Service",
    href: "/contact",
    keywords: ["automation", "workflow", "ai", "scripts", "process", "efficiency"],
  },
  {
    id: "service-consulting",
    title: "Technical Consulting",
    description: "Strategic IT advisory, technology architecture reviews, and digital strategy.",
    category: "Service",
    href: "/contact",
    keywords: ["consulting", "advisory", "it", "strategy", "architecture", "review"],
  },

  // ─── Skills ───────────────────────────────────────────────────────────────────
  {
    id: "skill-react-nextjs",
    title: "React & Next.js",
    description: "Advanced proficiency in React and Next.js for production web applications.",
    category: "Skill",
    href: "/portfolio",
    keywords: ["react", "nextjs", "javascript", "frontend", "framework"],
  },
  {
    id: "skill-typescript",
    title: "TypeScript & JavaScript",
    description: "Advanced full-stack TypeScript and JavaScript development.",
    category: "Skill",
    href: "/portfolio",
    keywords: ["typescript", "javascript", "ts", "js", "programming"],
  },
  {
    id: "skill-prompt-engineering",
    title: "Prompt Engineering & AI",
    description: "Advanced prompt engineering and generative AI workflow development.",
    category: "Skill",
    href: "/portfolio",
    keywords: ["prompt", "ai", "llm", "generative", "chatgpt", "google ai"],
  },
  {
    id: "skill-graphic-design",
    title: "Graphic Design & Branding",
    description: "Advanced brand identity, visual communication, and design system creation.",
    category: "Skill",
    href: "/portfolio",
    keywords: ["design", "figma", "coreldraw", "photoshop", "illustrator", "canva", "branding"],
  },
  {
    id: "skill-data-privacy",
    title: "Data Privacy & Ethics",
    description: "NDPC-certified Data Privacy Ambassador and AI ethics governance.",
    category: "Skill",
    href: "/about",
    keywords: ["data", "privacy", "ndpc", "ethics", "compliance", "gdpr"],
  },

  // ─── Community ────────────────────────────────────────────────────────────────
  {
    id: "community-nacos",
    title: "NACOS — Director of ICT",
    description: "Leading digital strategy for Nigeria Association of Computing Students at FUTO and nationally.",
    category: "Community",
    href: "/community",
    keywords: ["nacos", "ict", "director", "computing", "futo", "national"],
  },
  {
    id: "community-gdg",
    title: "Google Developer Group Owerri",
    description: "Graphic designer and event logistics for GDG Owerri developer conferences.",
    category: "Community",
    href: "/community",
    keywords: ["gdg", "google", "developer", "group", "owerri", "devfest"],
  },
  {
    id: "community-ieee",
    title: "IEEE FUTO Student Branch",
    description: "Event logistics and engineering leadership support for IEEE FUTO Student Branch.",
    category: "Community",
    href: "/community",
    keywords: ["ieee", "engineering", "student", "branch", "futo"],
  },
  {
    id: "community-cowrywise",
    title: "Cowrywise Campus Ambassador",
    description: "Promoting financial literacy and investment habits among university students.",
    category: "Community",
    href: "/community",
    keywords: ["cowrywise", "fintech", "ambassador", "finance", "investment", "students"],
  },

  // ─── Journal ──────────────────────────────────────────────────────────────────
  {
    id: "journal-tech-leadership",
    title: "Technology Leadership in Nigeria",
    description: "Thoughts on driving meaningful tech leadership in Nigeria's emerging digital ecosystem.",
    category: "Journal",
    href: "/journal",
    keywords: ["leadership", "nigeria", "tech", "digital", "ecosystem"],
  },
  {
    id: "journal-community-building",
    title: "Building Developer Communities",
    description: "How grassroots developer communities create lasting impact and inclusion in Africa.",
    category: "Journal",
    href: "/journal",
    keywords: ["community", "developer", "africa", "inclusion", "open source"],
  },
  {
    id: "journal-ai-ethics",
    title: "AI Ethics & Data Privacy in Africa",
    description: "The case for responsible AI adoption and data protection frameworks across Africa.",
    category: "Journal",
    href: "/journal",
    keywords: ["ai", "ethics", "data privacy", "africa", "regulation", "ndpc"],
  },
]

// Popular pages for quick navigation (shown when search is empty)
export const popularPages: SearchResult[] = [
  searchIndex.find((r) => r.id === "page-portfolio")!,
  searchIndex.find((r) => r.id === "page-about")!,
  searchIndex.find((r) => r.id === "page-community")!,
  searchIndex.find((r) => r.id === "page-contact")!,
  searchIndex.find((r) => r.id === "page-journal")!,
  searchIndex.find((r) => r.id === "page-gallery")!,
]

// Search function — returns results sorted by relevance
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
      // Title matches rank higher than description matches
      const aTitleMatch = a.title.toLowerCase().includes(q) ? 2 : 0
      const bTitleMatch = b.title.toLowerCase().includes(q) ? 2 : 0
      const aKeywordMatch = a.keywords?.some((kw) => kw.startsWith(q)) ? 1 : 0
      const bKeywordMatch = b.keywords?.some((kw) => kw.startsWith(q)) ? 1 : 0
      return bTitleMatch + bKeywordMatch - (aTitleMatch + aKeywordMatch)
    })
}

// Group results by category
export function groupResults(results: SearchResult[]): Record<string, SearchResult[]> {
  return results.reduce(
    (acc, result) => {
      if (!acc[result.category]) acc[result.category] = []
      acc[result.category].push(result)
      return acc
    },
    {} as Record<string, SearchResult[]>,
  )
}
