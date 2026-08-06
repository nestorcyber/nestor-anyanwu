import { notFound } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { PageHeader } from '@/components/admin/field'
import PortfolioForm from '@/components/admin/portfolio-form'
import { getPortfolioProjects } from '@/lib/content'

export default async function EditPortfolioPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const supabase = await createClient()

  let data = null
  const { data: byId } = await supabase.from('portfolio_projects').select('*').eq('id', id).maybeSingle()
  data = byId

  if (!data) {
    const { data: bySlug } = await supabase.from('portfolio_projects').select('*').eq('slug', id).maybeSingle()
    data = bySlug
  }

  if (!data) {
    const all = await getPortfolioProjects()
    const fb = all.find((p) => p.id === id || p.slug === id)
    if (fb) {
      data = {
        id: fb.id,
        slug: fb.slug,
        title: fb.title,
        short_description: fb.shortDescription,
        full_description: fb.fullDescription,
        cover_image: fb.coverImage,
        gallery: fb.gallery,
        category: fb.category,
        technologies: fb.technologies,
        status: fb.status,
        client: fb.client,
        role: fb.role,
        github_url: fb.githubUrl,
        live_url: fb.liveUrl,
        case_study_url: fb.caseStudyUrl,
        featured: fb.featured,
        completion_date: fb.completionDate,
        draft: false,
        sort_order: 0,
      } as any
    }
  }

  if (!data) notFound()
  return (
    <div>
      <PageHeader title="Edit portfolio project" />
      <PortfolioForm initial={data} />
    </div>
  )
}
