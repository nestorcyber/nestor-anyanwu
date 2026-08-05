import { notFound } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { PageHeader } from '@/components/admin/field'
import JournalForm from '@/components/admin/journal-form'

export default async function EditJournalPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const supabase = await createClient()
  const { data } = await supabase.from('journal_articles').select('*').eq('id', id).maybeSingle()
  if (!data) notFound()

  return (
    <div>
      <PageHeader title="Edit journal article" />
      <JournalForm initial={data} />
    </div>
  )
}
