import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import { PageHeader, PrimaryButton } from '@/components/admin/field'

export default async function AdminJournalPage() {
  const supabase = await createClient()
  const { data } = await supabase
    .from('journal_articles')
    .select('id, title, slug, draft, featured, published_date')
    .order('published_date', { ascending: false })

  return (
    <div>
      <PageHeader
        title="Journal"
        action={
          <Link href="/admin/journal/new">
            <PrimaryButton type="button">New article</PrimaryButton>
          </Link>
        }
      />
      <div className="border border-neutral-800 divide-y divide-neutral-800">
        {(data ?? []).map((row) => (
          <Link
            key={row.id}
            href={`/admin/journal/${row.id}`}
            className="flex items-center justify-between gap-4 px-4 py-3 hover:bg-neutral-900"
          >
            <div>
              <p className="font-medium">{row.title}</p>
              <p className="text-xs text-neutral-500">/{row.slug}</p>
            </div>
            <div className="flex gap-2 text-xs">
              {row.draft ? <span className="text-amber-400">Draft</span> : <span className="text-emerald-400">Live</span>}
              {row.featured ? <span className="text-sky-400">Featured</span> : null}
            </div>
          </Link>
        ))}
        {!data?.length ? <p className="px-4 py-8 text-sm text-neutral-500">No articles yet.</p> : null}
      </div>
    </div>
  )
}
