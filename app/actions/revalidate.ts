'use server'

import { revalidatePath, revalidateTag } from 'next/cache'
import { requireAdmin } from '@/lib/supabase/admin'

async function revalidateWithAdminAuth(
  paths: string[],
  tags: string[] = []
): Promise<{ success: boolean; error?: string }> {
  try {
    const auth = await requireAdmin()
    if (!auth.ok) {
      return { success: false, error: 'Unauthorized: Admin authentication required.' }
    }

    for (const tag of tags) {
      revalidateTag(tag)
    }
    for (const path of paths) {
      revalidatePath(path)
    }
    return { success: true }
  } catch (err) {
    console.error('Error during authenticated cache revalidation:', err)
    return { success: false, error: 'Failed to revalidate cache.' }
  }
}

export async function revalidateJournal(slug?: string) {
  const paths = ['/', '/journal', '/admin/journal', '/feed.xml']
  if (slug) {
    paths.push(`/journal/${slug}`)
  }
  return revalidateWithAdminAuth(paths, ['search-index'])
}

export async function revalidatePortfolio(slug?: string) {
  const paths = [
    '/',
    '/portfolio',
    '/projects',
    '/certifications',
    '/experience',
    '/memberships',
    '/community',
    '/admin/portfolio',
    '/admin/certifications',
    '/admin/journey',
    '/admin/memberships',
    '/admin/services',
    '/admin/stats',
    '/admin/skills',
    '/admin/brands',
  ]
  if (slug) {
    paths.push(`/portfolio/${slug}`)
  }
  return revalidateWithAdminAuth(paths, ['search-index'])
}

export async function revalidateCommunity(slug?: string) {
  const paths = [
    '/',
    '/community',
    '/community/roadmap',
    '/community/gallery',
    '/admin/community',
    '/admin/journey',
  ]
  if (slug) {
    paths.push(`/community/${slug}`)
  }
  return revalidateWithAdminAuth(paths, ['search-index'])
}

export async function revalidateGallery() {
  return revalidateWithAdminAuth([
    '/',
    '/gallery',
    '/community',
    '/community/gallery',
    '/admin/gallery',
  ])
}

export async function revalidateSiteSettings() {
  return revalidateWithAdminAuth(
    ['/', '/about', '/contact', '/portfolio', '/community', '/journal', '/admin/settings'],
    ['search-index']
  )
}
