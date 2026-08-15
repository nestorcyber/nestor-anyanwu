'use client'

import React, { useState } from 'react'

export type IconOption = {
  provider: 'simple-icons' | 'lucide'
  name: string
  title: string
  svgUrl?: string
}

// Popular curated tech/brand icons for instant matching
const SIMPLE_ICONS_POPULAR: { name: string; title: string }[] = [
  { name: 'react', title: 'React' },
  { name: 'nextdotjs', title: 'Next.js' },
  { name: 'typescript', title: 'TypeScript' },
  { name: 'javascript', title: 'JavaScript' },
  { name: 'tailwindcss', title: 'Tailwind CSS' },
  { name: 'python', title: 'Python' },
  { name: 'figma', title: 'Figma' },
  { name: 'github', title: 'GitHub' },
  { name: 'supabase', title: 'Supabase' },
  { name: 'docker', title: 'Docker' },
  { name: 'vercel', title: 'Vercel' },
  { name: 'nodedotjs', title: 'Node.js' },
  { name: 'html5', title: 'HTML5' },
  { name: 'css3', title: 'CSS3' },
  { name: 'git', title: 'Git' },
  { name: 'googlecloud', title: 'Google Cloud' },
  { name: 'amazonaws', title: 'Amazon Web Services' },
  { name: 'postman', title: 'Postman' },
  { name: 'graphql', title: 'GraphQL' },
  { name: 'mongodb', title: 'MongoDB' },
  { name: 'postgresql', title: 'PostgreSQL text' },
  { name: 'redis', title: 'Redis' },
  { name: 'adobephotoshop', title: 'Adobe Photoshop' },
  { name: 'adobeillustrator', title: 'Adobe Illustrator' },
  { name: 'hubspot', title: 'HubSpot' },
  { name: 'replit', title: 'Replit' },
  { name: 'intellijidea', title: 'IntelliJ IDEA' },
  { name: 'googleworkspace', title: 'Google Workspace' },
  { name: 'google', title: 'Google' },
  { name: 'openai', title: 'OpenAI' },
]

// Curated Lucide icons for generic/soft skills
const LUCIDE_GENERIC_ICONS: { name: string; title: string }[] = [
  { name: 'Users', title: 'Leadership / Users' },
  { name: 'MessageSquare', title: 'Communication / Messaging' },
  { name: 'Brain', title: 'Problem Solving / AI' },
  { name: 'Sparkles', title: 'Creativity / Innovation' },
  { name: 'Shield', title: 'Security / Governance' },
  { name: 'Wrench', title: 'Tools / Operations' },
  { name: 'Folder', title: 'Organization / Files' },
  { name: 'Briefcase', title: 'Management / Business' },
  { name: 'Award', title: 'Excellence / Quality' },
  { name: 'Zap', title: 'Automation / Speed' },
  { name: 'Globe', title: 'Web / Global' },
  { name: 'Cpu', title: 'Hardware / Computing' },
]

export function resolveIconUrl(provider?: string, name?: string, rawUrl?: string): string | null {
  if (rawUrl && (rawUrl.startsWith('http://') || rawUrl.startsWith('https://') || rawUrl.startsWith('/'))) {
    return rawUrl
  }
  if (!name) return null

  if (provider === 'simple-icons' || !provider) {
    const slug = name.toLowerCase().replace(/[^a-z0-9]/g, '')
    return `https://cdn.simpleicons.org/${slug}`
  }

  return null
}

export function SkillIcon({
  provider,
  name,
  rawUrl,
  className = 'w-5 h-5 object-contain',
  fallbackText = '⚡',
}: {
  provider?: string
  name?: string
  rawUrl?: string
  className?: string
  fallbackText?: string
}) {
  const [error, setError] = useState(false)
  const url = resolveIconUrl(provider, name, rawUrl)

  if (error || !url) {
    return <span className="text-xs font-mono font-extrabold text-accent">{fallbackText}</span>
  }

  return (
    <img
      src={url}
      alt={name || 'Skill Icon'}
      className={className}
      onError={() => setError(true)}
    />
  )
}

export async function searchIcons(query: string): Promise<IconOption[]> {
  const cleanQuery = query.trim().toLowerCase()
  if (!cleanQuery) return []

  const results: IconOption[] = []
  const slugQuery = cleanQuery.replace(/[^a-z0-9]/g, '')

  // 1. Check brand/tech matches from Simple Icons CDN
  const exactBrandMatch = SIMPLE_ICONS_POPULAR.filter(
    (item) =>
      item.title.toLowerCase().includes(cleanQuery) ||
      item.name.includes(slugQuery) ||
      cleanQuery.includes(item.name)
  )

  exactBrandMatch.forEach((item) => {
    results.push({
      provider: 'simple-icons',
      name: item.name,
      title: item.title,
      svgUrl: `https://cdn.simpleicons.org/${item.name}`,
    })
  })

  // Dynamic fallback attempt for any tech term
  if (slugQuery.length >= 2 && !results.some((r) => r.name === slugQuery)) {
    results.push({
      provider: 'simple-icons',
      name: slugQuery,
      title: query,
      svgUrl: `https://cdn.simpleicons.org/${slugQuery}`,
    })
  }

  // 2. Add generic Lucide icons for soft skills or general topics
  LUCIDE_GENERIC_ICONS.forEach((item) => {
    if (
      item.title.toLowerCase().includes(cleanQuery) ||
      item.name.toLowerCase().includes(cleanQuery) ||
      cleanQuery.includes('leadership') ||
      cleanQuery.includes('manage') ||
      cleanQuery.includes('communication')
    ) {
      results.push({
        provider: 'lucide',
        name: item.name,
        title: item.title,
      })
    }
  })

  return results.slice(0, 12)
}
