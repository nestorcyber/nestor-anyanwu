'use server'

import { createClient as createServerClient } from '@/lib/supabase/server'
import { createClient as createSupabaseClient } from '@supabase/supabase-js'
import { revalidatePortfolio, revalidateCommunity, revalidateGallery } from '@/app/actions/revalidate'
import { ADMIN_EMAIL } from '@/lib/constants'

export async function updateItemsSortOrder(
  table: string,
  orderedItems: { id: string; sort_order: number }[]
) {
  try {
    const serverSupabase = await createServerClient()
    const {
      data: { user },
    } = await serverSupabase.auth.getUser()

    if (!user || user.email?.toLowerCase() !== ADMIN_EMAIL.toLowerCase()) {
      return { success: false, error: 'Unauthorized: Admin authentication required.' }
    }

    const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://fomxnjfnzouidhvmvncn.supabase.co'

    // Use service role client if configured in environment, otherwise use authenticated server client
    const supabase = serviceKey
      ? createSupabaseClient(supabaseUrl, serviceKey)
      : serverSupabase
    
    // Perform parallel batch updates for each item's new sort_order
    const updatePromises = orderedItems.map((item) =>
      (supabase as any).from(table).update({ sort_order: item.sort_order }).eq('id', item.id)
    )
    await Promise.all(updatePromises)

    await revalidatePortfolio()
    await revalidateCommunity()
    await revalidateGallery()

    return { success: true }
  } catch (error: any) {
    console.error(`Failed to update sort order in ${table}:`, error)
    return { success: false, error: error?.message || 'Update failed' }
  }
}
