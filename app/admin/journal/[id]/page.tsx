import { notFound } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { PageHeader } from '@/components/admin/field'
import JournalForm from '@/components/admin/journal-form'
import { getJournalArticles } from '@/lib/content'

export default async function EditJournalPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const supabase = await createClient()
  
  // Try querying by ID first, then by slug
  let data = null
  const { data: byId } = await supabase.from('journal_articles').select('*').eq('id', id).maybeSingle()
  data = byId

  if (!data) {
    const { data: bySlug } = await supabase.from('journal_articles').select('*').eq('slug', id).maybeSingle()
    data = bySlug
  }

  // If still not in DB, load from local fallback content
  if (!data) {
    const all = await getJournalArticles()
    const fb = all.find((a) => a.id === id || a.slug === id)
    if (fb) {
      data = {
        id: fb.id,
        slug: fb.slug,
        title: fb.title,
        excerpt: fb.excerpt,
        cover_image: fb.coverImage,
        category: fb.category,
        tags: fb.tags,
        featured: fb.featured,
        pinned: fb.pinned,
        published_date: fb.publishedDate,
        last_updated: fb.lastUpdated,
        author: fb.author,
        seo_title: fb.seoTitle,
        seo_description: fb.seoDescription,
        content: fb.content,
        draft: false,
      } as any
    }
  }

  if (!data) notFound()

  return (
    <div>
      <PageHeader title="Edit journal article" />
      <JournalForm initial={data} />
    </div>
  )
}
