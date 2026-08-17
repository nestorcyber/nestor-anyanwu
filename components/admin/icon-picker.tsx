'use client'

import React, { useState } from 'react'
import {
  Code,
  Globe,
  Layout,
  Palette,
  Briefcase,
  Zap,
  Shield,
  FileText,
  Sparkles,
  Brain,
  Layers,
  Wrench,
  Database,
  ListChecks,
  Bot,
  Folder,
  Award,
  Users,
  MessageSquare,
  Cpu,
  Workflow,
  PenTool,
  CheckCircle,
} from 'lucide-react'

export type IconOption = {
  provider: string
  name: string
  title: string
  svgUrl?: string
}

const COLOR_COLLECTIONS = ['logos', 'devicon', 'skill-icons', 'vscode-icons', 'thesvg-color', 'logos-color']

// Direct brand & technology logo URL resolution (Prioritizing full-color original SVGs)
export function getCanonicalTechLogoUrl(name: string): string | null {
  const clean = name.toLowerCase().trim()

  const staticMap: Record<string, string> = {
    'react & next.js': 'https://api.iconify.design/logos/react.svg',
    'react': 'https://api.iconify.design/logos/react.svg',
    'next.js': 'https://api.iconify.design/logos/nextjs-icon.svg',
    'nextdotjs': 'https://api.iconify.design/logos/nextjs-icon.svg',
    'typescript & javascript': 'https://api.iconify.design/logos/typescript-icon.svg',
    'typescript': 'https://api.iconify.design/logos/typescript-icon.svg',
    'javascript': 'https://api.iconify.design/logos/javascript.svg',
    'tailwind css & web ui': 'https://api.iconify.design/logos/tailwindcss-icon.svg',
    'tailwind css': 'https://api.iconify.design/logos/tailwindcss-icon.svg',
    'tailwindcss': 'https://api.iconify.design/logos/tailwindcss-icon.svg',
    'git & github': 'https://api.iconify.design/logos/github-icon.svg',
    'github': 'https://api.iconify.design/logos/github-icon.svg',
    'git': 'https://api.iconify.design/logos/git-icon.svg',
    'figma & coreldraw': 'https://api.iconify.design/logos/figma.svg',
    'figma': 'https://api.iconify.design/logos/figma.svg',
    'coreldraw': 'https://api.iconify.design/devicon/coreldraw.svg',
    'photoshop & illustrator': 'https://api.iconify.design/logos/adobe-photoshop.svg',
    'photoshop': 'https://api.iconify.design/logos/adobe-photoshop.svg',
    'illustrator': 'https://api.iconify.design/logos/adobe-illustrator.svg',
    'python': 'https://api.iconify.design/logos/python.svg',
    'node.js': 'https://api.iconify.design/logos/nodejs-icon.svg',
    'nodedotjs': 'https://api.iconify.design/logos/nodejs-icon.svg',
    'supabase': 'https://api.iconify.design/logos/supabase-icon.svg',
    'docker': 'https://api.iconify.design/logos/docker-icon.svg',
    'vscode': 'https://api.iconify.design/logos/visual-studio-code.svg',
    'google ai studio': 'https://api.iconify.design/logos/google-icon.svg',
    'google workspace & office 365': 'https://api.iconify.design/logos/google-gmail.svg',
    'google workspace': 'https://api.iconify.design/logos/google-gmail.svg',
    'googleworkspace': 'https://api.iconify.design/logos/google-gmail.svg',
    'google': 'https://api.iconify.design/logos/google-icon.svg',
    'hubspot': 'https://api.iconify.design/logos/hubspot.svg',
    'replit': 'https://api.iconify.design/logos/replit-icon.svg',
    'vercel': 'https://api.iconify.design/logos/vercel-icon.svg',
    'notion': 'https://api.iconify.design/logos/notion-icon.svg',
    'linear': 'https://api.iconify.design/logos/linear-icon.svg',
    'jira': 'https://api.iconify.design/logos/jira.svg',
    'confluence': 'https://api.iconify.design/logos/confluence.svg',
  }

  if (staticMap[clean]) return staticMap[clean]

  const slug = clean.replace(/[^a-z0-9]/g, '')
  if (staticMap[slug]) return staticMap[slug]

  if (slug.length > 2) {
    return `https://api.iconify.design/logos/${slug}.svg`
  }

  return null
}

const LUCIDE_ICON_MAP: Record<string, React.ElementType> = {
  Code,
  Globe,
  Layout,
  Palette,
  Briefcase,
  Zap,
  Shield,
  FileText,
  Sparkles,
  Brain,
  Layers,
  Wrench,
  Database,
  ListChecks,
  Bot,
  Folder,
  Award,
  Users,
  MessageSquare,
  Cpu,
  Workflow,
  PenTool,
  CheckCircle,
}

// Fallback Lucide selector based on text keywords
export function getLucideFallback(name?: string): React.ElementType {
  if (!name) return Code
  const n = name.toLowerCase()

  if (n.includes('doc') || n.includes('write') || n.includes('text')) return FileText
  if (n.includes('api') || n.includes('rest') || n.includes('webhook')) return Globe
  if (n.includes('prompt') || n.includes('ai') || n.includes('generative') || n.includes('bot')) return Bot
  if (n.includes('ethics') || n.includes('governance') || n.includes('privacy') || n.includes('security')) return Shield
  if (n.includes('design') || n.includes('branding') || n.includes('identity') || n.includes('presentation')) return Palette
  if (n.includes('database') || n.includes('file') || n.includes('storage')) return Database
  if (n.includes('project') || n.includes('coordination') || n.includes('manage')) return ListChecks
  if (n.includes('team') || n.includes('leader') || n.includes('user')) return Users
  if (n.includes('speed') || n.includes('automation')) return Zap

  return Code
}

export function resolveIconUrl(provider?: string, name?: string, rawUrl?: string): string | null {
  if (rawUrl && (rawUrl.startsWith('http://') || rawUrl.startsWith('https://') || rawUrl.startsWith('/') || rawUrl.startsWith('data:'))) {
    // If rawUrl is simpleicons monochrome CDN without specific hex color, upgrade to color logos API
    if (rawUrl.includes('cdn.simpleicons.org/')) {
      const slug = rawUrl.split('cdn.simpleicons.org/')[1]?.split('/')[0]?.split('?')[0]
      if (slug) return `https://api.iconify.design/logos/${slug}.svg`
    }
    return rawUrl
  }
  if (!name) return null

  if (provider === 'iconify' && name.includes(':')) {
    const parts = name.split(':')
    return `https://api.iconify.design/${parts[0]}/${parts[1]}.svg`
  }

  // Check IconStack or simple-icons canonical mapping
  return getCanonicalTechLogoUrl(name)
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

  // 1. Check if provider is explicitly lucide or custom Lucide icon name
  if (provider === 'lucide' || (name && LUCIDE_ICON_MAP[name])) {
    const IconComp = (name && LUCIDE_ICON_MAP[name]) || getLucideFallback(name)
    return <IconComp className={className ? `${className} text-accent shrink-0` : "w-5 h-5 text-accent shrink-0"} />
  }

  // 2. Resolve image / SVG URL
  const url = resolveIconUrl(provider, name, rawUrl)

  // 3. Fallback to Lucide icon instead of plain text letter if image fails to load
  if (error || !url) {
    const FallbackIcon = getLucideFallback(name)
    return <FallbackIcon className={className ? `${className} text-accent shrink-0` : "w-5 h-5 text-accent shrink-0"} />
  }

  return (
    <img
      src={url}
      alt={name || 'Skill Icon'}
      className={className}
      onError={() => setError(true)}
      loading="lazy"
    />
  )
}

// Unified Iconify API + IconStack.io + Simple Icons Search integration
export async function searchIcons(query: string): Promise<IconOption[]> {
  const cleanQuery = query.trim().toLowerCase()
  if (!cleanQuery) return []

  const results: IconOption[] = []
  const seenUrls = new Set<string>()

  // 1. Search Iconify API (Prioritize Full Color collections: logos, devicon, skill-icons, vscode-icons)
  try {
    const iconifyRes = await fetch(
      `https://api.iconify.design/search?query=${encodeURIComponent(cleanQuery)}&limit=24`
    )
    if (iconifyRes.ok) {
      const data = await iconifyRes.json()
      if (data?.icons && Array.isArray(data.icons)) {
        // Sort results so full-color icon collections appear first!
        data.icons.sort((a: string, b: string) => {
          const aPrefix = a.split(':')[0] || ''
          const bPrefix = b.split(':')[0] || ''
          const aIsColor = COLOR_COLLECTIONS.includes(aPrefix) ? 1 : 0
          const bIsColor = COLOR_COLLECTIONS.includes(bPrefix) ? 1 : 0
          return bIsColor - aIsColor
        })

        data.icons.forEach((iconKey: string) => {
          const parts = iconKey.split(':')
          const collection = parts[0] || 'iconify'
          const iconName = parts[1] || iconKey
          const svgUrl = `https://api.iconify.design/${collection}/${iconName}.svg`

          if (!seenUrls.has(svgUrl)) {
            seenUrls.add(svgUrl)
            results.push({
              provider: 'iconify',
              name: iconKey,
              title: `${iconName} (${collection})`,
              svgUrl,
            })
          }
        })
      }
    }
  } catch (err) {
    console.warn('Iconify search error:', err)
  }

  // 2. Search IconStack.io public API
  try {
    const res = await fetch(
      `https://sglpxftkuzsqdpdhftwv.supabase.co/functions/v1/icon-search?q=${encodeURIComponent(cleanQuery)}&limit=10`
    )
    if (res.ok) {
      const data = await res.json()
      if (data?.results && Array.isArray(data.results)) {
        data.results.forEach((item: any) => {
          let svgUrl = `https://sglpxftkuzsqdpdhftwv.supabase.co/functions/v1/icon-svg?library=${item.library}&id=${item.id}`
          if (item.library === 'simple') {
            const slug = (item.id || '').replace(/^simple-/, '')
            svgUrl = `https://api.iconify.design/logos/${slug}.svg`
          }

          if (!seenUrls.has(svgUrl)) {
            seenUrls.add(svgUrl)
            results.push({
              provider: item.library || 'iconstack',
              name: item.id || item.name,
              title: `${item.name} (${item.libraryName || item.library || 'IconStack'})`,
              svgUrl,
            })
          }
        })
      }
    }
  } catch (err) {
    console.warn('IconStack search fallback:', err)
  }

  // 3. Fallback to Simple Icons CDN direct slug match
  const slug = cleanQuery.replace(/[^a-z0-9]/g, '')
  if (slug.length >= 2) {
    const simpleUrl = `https://api.iconify.design/logos/${slug}.svg`
    if (!seenUrls.has(simpleUrl)) {
      seenUrls.add(simpleUrl)
      results.push({
        provider: 'iconify',
        name: slug,
        title: `${cleanQuery} (Full-Color Logo)`,
        svgUrl: simpleUrl,
      })
    }
  }

  // 4. Complement with Lucide vector icons
  Object.keys(LUCIDE_ICON_MAP).forEach((lucideName) => {
    if (lucideName.toLowerCase().includes(cleanQuery)) {
      results.push({
        provider: 'lucide',
        name: lucideName,
        title: `${lucideName} (Lucide Icon)`,
      })
    }
  })

  return results.slice(0, 24)
}

