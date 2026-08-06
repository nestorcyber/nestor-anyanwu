import { notFound } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { PageHeader } from '@/components/admin/field'
import JourneyForm from '@/components/admin/journey-form'
import { getJourneyItems } from '@/lib/content'

export default async function EditJourneyPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const supabase = await createClient()

  let data = null
  const { data: byId } = await supabase.from('journey_items').select('*').eq('id', id).maybeSingle()
  data = byId

  if (!data) {
    const all = await getJourneyItems()
    const fb = all.find((j) => String(j.id) === String(id))
    if (fb) {
      data = {
        id: fb.id,
        title: fb.title,
        organization: fb.organization,
        role: fb.role,
        date_label: fb.date,
        description: fb.description,
        type: fb.type,
        details: fb.details,
        images: fb.images,
        sort_order: 0,
      } as any
    }
  }

  if (!data) notFound()
  return (
    <div>
      <PageHeader title="Edit journey item" />
      <JourneyForm initial={data} />
    </div>
  )
}
