import { notFound } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { PageHeader } from '@/components/admin/field'
import CommunityForm from '@/components/admin/community-form'
import { getCommunityEntries } from '@/lib/content'

export default async function EditCommunityPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const supabase = await createClient()

  let data = null
  const { data: byId } = await supabase.from('community_entries').select('*').eq('id', id).maybeSingle()
  data = byId

  if (!data) {
    const { data: bySlug } = await supabase.from('community_entries').select('*').eq('slug', id).maybeSingle()
    data = bySlug
  }

  if (!data) {
    const all = await getCommunityEntries()
    const fb = all.find((e) => e.id === id || e.slug === id)
    if (fb) {
      data = {
        id: fb.id,
        slug: fb.slug,
        organization: fb.organization,
        role: fb.role,
        duration: fb.duration,
        cover_image: fb.coverImage,
        gallery: fb.gallery,
        achievements: fb.achievements,
        impact_stats: fb.impactStats,
        featured: fb.featured,
        tags: fb.tags,
        description: fb.description,
        draft: false,
        sort_order: 0,
      } as any
    }
  }

  if (!data) notFound()
  return (
    <div>
      <PageHeader title="Edit community entry" />
      <CommunityForm initial={data} />
    </div>
  )
}
