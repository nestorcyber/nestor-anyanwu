import { createClient } from '@/lib/supabase/client'

export async function logAdminActivity(
  action: string,
  resource: string,
  resourceId?: string,
  details?: string
) {
  try {
    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()
    const adminEmail = user?.email || 'neorxpro@gmail.com'

    await supabase.from('admin_activity_logs').insert({
      action,
      resource,
      resource_id: resourceId || null,
      details: details || null,
      admin_email: adminEmail,
    })
  } catch (err) {
    console.error('Failed to log admin activity:', err)
  }
}
