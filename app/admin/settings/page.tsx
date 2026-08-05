import { createClient } from '@/lib/supabase/server'
import { PageHeader } from '@/components/admin/field'
import { SettingsForm } from '@/components/admin/simple-crud-forms'

export default async function AdminSettingsPage() {
  const supabase = await createClient()
  let { data } = await supabase.from('site_settings').select('*').limit(1).maybeSingle()

  if (!data) {
    const inserted = await supabase
      .from('site_settings')
      .insert({ site_name: 'Nestor Cyber' })
      .select('*')
      .single()
    data = inserted.data
  }

  if (!data) {
    return <p className="text-red-400">Could not load site settings. Check Supabase connection.</p>
  }

  return (
    <div>
      <PageHeader title="Site settings" />
      <SettingsForm initial={data} />
    </div>
  )
}
