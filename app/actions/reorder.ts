'use server'

import { createClient as createSupabaseClient } from '@supabase/supabase-js'
import { requireAdmin } from '@/lib/supabase/admin'
import { revalidatePortfolio, revalidateCommunity, revalidateGallery } from '@/app/actions/revalidate'

const REORDERABLE_TABLES = new Set([
  'portfolio_projects',
  'community_entries',
  'journey_items',
  'brand_partners',
  'services',
  'portfolio_stats',
  'certifications',
  'gallery_images',
  'journal_articles',
  'skill_groups',
  'skills',
])

export async function updateItemsSortOrder(
  table: string,
  orderedItems: { id: string; sort_order: number }[]
) {
  try {
    const auth = await requireAdmin()
    if (!auth.ok) {
      return { success: false, error: 'Unauthorized: Admin authentication required.' }
    }

    if (!REORDERABLE_TABLES.has(table)) {
      return { success: false, error: 'Invalid table specified for reordering.' }
    }

    if (
      !Array.isArray(orderedItems) ||
      orderedItems.length === 0 ||
      orderedItems.length > 500 ||
      orderedItems.some(
        (item) =>
          !item ||
          typeof item.id !== 'string' ||
          !item.id.trim() ||
          typeof item.sort_order !== 'number' ||
          !Number.isInteger(item.sort_order) ||
          item.sort_order < 0
      )
    ) {
      return { success: false, error: 'Invalid sort order payload.' }
    }

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    if (!supabaseUrl) {
      return { success: false, error: 'NEXT_PUBLIC_SUPABASE_URL is not configured.' }
    }

    const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY
    const supabase = serviceKey
      ? createSupabaseClient(supabaseUrl, serviceKey)
      : auth.supabase

    const updatePromises = orderedItems.map((item) =>
      (supabase as any).from(table).update({ sort_order: item.sort_order }).eq('id', item.id)
    )
    const results = await Promise.all(updatePromises)
    const firstFailure = results.find((res: { error?: { message: string } | null }) => res?.error)
    if (firstFailure?.error) {
      return { success: false, error: firstFailure.error.message || 'Sort order update failed.' }
    }

    await revalidatePortfolio()
    await revalidateCommunity()
    await revalidateGallery()

    return { success: true }
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Update failed'
    console.error(`Failed to update sort order in ${table}:`, error)
    return { success: false, error: message }
  }
}
