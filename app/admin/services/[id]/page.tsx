import { notFound } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { PageHeader } from '@/components/admin/field'
import { ServiceForm } from '@/components/admin/simple-crud-forms'

export default async function EditServicePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const supabase = await createClient()
  const { data } = await supabase.from('services').select('*').eq('id', id).maybeSingle()
  if (!data) notFound()
  return (
    <div>
      <PageHeader title="Edit service" />
      <ServiceForm initial={data} />
    </div>
  )
}
