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

// Direct brand & technology logo URL resolution
export function getCanonicalTechLogoUrl(name: string): string | null {
  const clean = name.toLowerCase().trim()

  const staticMap: Record<string, string> = {
    'react & next.js': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg',
    'next.js': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg',
    'nextdotjs': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg',
    'react': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg',
    'typescript & javascript': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg',
    'typescript': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg',
    'javascript': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg',
    'tailwind css & web ui': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg',
    'tailwind css': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg',
    'tailwindcss': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg',
    'git & github': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg',
    'github': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg',
    'git': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg',
    'figma & coreldraw': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg',
    'figma': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg',
    'photoshop & illustrator': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/photoshop/photoshop-original.svg',
    'photoshop': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/photoshop/photoshop-original.svg',
    'illustrator': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/illustrator/illustrator-line.svg',
    'python': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg',
    'node.js': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg',
    'nodedotjs': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg',
    'supabase': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/supabase/supabase-original.svg',
    'docker': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg',
    'vscode': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg',
    'google ai studio': 'https://cdn.simpleicons.org/google',
    'google workspace & office 365': 'https://cdn.simpleicons.org/googleworkspace',
    'google workspace': 'https://cdn.simpleicons.org/googleworkspace',
    'googleworkspace': 'https://cdn.simpleicons.org/googleworkspace',
    'google': 'https://cdn.simpleicons.org/google',
    'hubspot': 'https://cdn.simpleicons.org/hubspot',
    'replit': 'https://cdn.simpleicons.org/replit',
    'vercel': 'https://cdn.simpleicons.org/vercel',
  }

  if (staticMap[clean]) return staticMap[clean]

  // Clean slug fallback
  const slug = clean.replace(/[^a-z0-9]/g, '')
  if (staticMap[slug]) return staticMap[slug]

  if (slug.length > 2) {
    return `https://cdn.simpleicons.org/${slug}`
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
    return rawUrl
  }
  if (!name) return null

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
    return <IconComp className="w-5 h-5 text-accent shrink-0" />
  }

  // 2. Resolve image / SVG URL
  const url = resolveIconUrl(provider, name, rawUrl)

  // 3. Fallback to Lucide icon instead of plain text letter if image fails to load
  if (error || !url) {
    const FallbackIcon = getLucideFallback(name)
    return <FallbackIcon className="w-5 h-5 text-accent shrink-0" />
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

// IconStack.io Search API integration
export async function searchIcons(query: string): Promise<IconOption[]> {
  const cleanQuery = query.trim().toLowerCase()
  if (!cleanQuery) return []

  const results: IconOption[] = []

  try {
    // Search IconStack.io public API
    const res = await fetch(
      `https://sglpxftkuzsqdpdhftwv.supabase.co/functions/v1/icon-search?q=${encodeURIComponent(cleanQuery)}&limit=12`
    )
    if (res.ok) {
      const data = await res.json()
      if (data?.results && Array.isArray(data.results)) {
        data.results.forEach((item: any) => {
          let svgUrl = `https://sglpxftkuzsqdpdhftwv.supabase.co/functions/v1/icon-svg?library=${item.library}&id=${item.id}`
          if (item.library === 'simple') {
            const slug = (item.id || '').replace(/^simple-/, '')
            svgUrl = `https://cdn.simpleicons.org/${slug}`
          }

          results.push({
            provider: item.library || 'iconstack',
            name: item.id || item.name,
            title: `${item.name} (${item.libraryName || item.library || 'IconStack'})`,
            svgUrl,
          })
        })
      }
    }
  } catch (err) {
    console.warn('IconStack search fallback:', err)
  }

  // Fallback / complement with local Lucide options if results are sparse
  if (results.length < 4) {
    Object.keys(LUCIDE_ICON_MAP).forEach((lucideName) => {
      if (lucideName.toLowerCase().includes(cleanQuery)) {
        results.push({
          provider: 'lucide',
          name: lucideName,
          title: `${lucideName} (Lucide Icon)`,
        })
      }
    })
  }

  return results.slice(0, 12)
}

