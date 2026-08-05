import { createClient } from '@supabase/supabase-js'
import type { Database } from '@/lib/supabase/types'

/** Cookie-less anon client for public reads and generateStaticParams. */
export function createPublicClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  if (!url || !key) return null
  return createClient<Database>(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
  })
}
