import { createClient } from '@/lib/supabase/server'
import { ADMIN_EMAIL } from '@/lib/constants'

/**
 * Verifies that the current server request carries a valid Supabase session
 * belonging to the configured admin user.
 */
export async function requireAdmin() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user || user.email?.toLowerCase() !== ADMIN_EMAIL.toLowerCase()) {
    return { ok: false as const, supabase, user: null }
  }

  return { ok: true as const, supabase, user }
}
