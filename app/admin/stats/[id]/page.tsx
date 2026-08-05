import { notFound } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { PageHeader } from '@/components/admin/field'
import { StatForm } from '@/components/admin/simple-crud-forms'

export default async function EditStatPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const supabase = await createClient()
  const { data } = await supabase.from('portfolio_stats').select('*').eq('id', id).maybeSingle()
  if (!data) notFound()
  return (
    <div>
      <PageHeader title="Edit stat" />
      <StatForm initial={data} />
    </div>
  )
}
