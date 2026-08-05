import { notFound } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { PageHeader } from '@/components/admin/field'
import JourneyForm from '@/components/admin/journey-form'

export default async function EditJourneyPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const supabase = await createClient()
  const { data } = await supabase.from('journey_items').select('*').eq('id', id).maybeSingle()
  if (!data) notFound()
  return (
    <div>
      <PageHeader title="Edit journey item" />
      <JourneyForm initial={data} />
    </div>
  )
}
