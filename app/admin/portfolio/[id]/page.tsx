import { notFound } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { PageHeader } from '@/components/admin/field'
import PortfolioForm from '@/components/admin/portfolio-form'

export default async function EditPortfolioPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const supabase = await createClient()
  const { data } = await supabase.from('portfolio_projects').select('*').eq('id', id).maybeSingle()
  if (!data) notFound()
  return (
    <div>
      <PageHeader title="Edit portfolio project" />
      <PortfolioForm initial={data} />
    </div>
  )
}
