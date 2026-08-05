import { notFound } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { PageHeader } from '@/components/admin/field'
import { CertificationForm } from '@/components/admin/simple-crud-forms'

export default async function EditCertificationPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const supabase = await createClient()
  const { data } = await supabase.from('certifications').select('*').eq('id', id).maybeSingle()
  if (!data) notFound()
  return (
    <div>
      <PageHeader title="Edit certification" />
      <CertificationForm initial={data} />
    </div>
  )
}
