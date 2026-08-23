import { createClient } from '@supabase/supabase-js'
import type { Database } from '@/lib/supabase/types'

let cachedPublicClient: ReturnType<typeof createClient<Database>> | null = null

export function createPublicClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  if (!url || !key) return null
  if (!cachedPublicClient) {
    cachedPublicClient = createClient<Database>(url, key, {
      auth: { persistSession: false, autoRefreshToken: false },
    })
  }
  return cachedPublicClient
}
