import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import { PageHeader, PrimaryButton } from '@/components/admin/field'

export default async function AdminPortfolioPage() {
  const supabase = await createClient()
  const { data } = await supabase
    .from('portfolio_projects')
    .select('id, title, slug, draft, featured, category')
    .order('sort_order', { ascending: true })

  return (
    <div>
      <PageHeader
        title="Portfolio"
        action={
          <Link href="/admin/portfolio/new">
            <PrimaryButton type="button">New project</PrimaryButton>
          </Link>
        }
      />
      <div className="border border-neutral-800 divide-y divide-neutral-800">
        {(data ?? []).map((row) => (
          <Link
            key={row.id}
            href={`/admin/portfolio/${row.id}`}
            className="flex items-center justify-between gap-4 px-4 py-3 hover:bg-neutral-900"
          >
            <div>
              <p className="font-medium">{row.title}</p>
              <p className="text-xs text-neutral-500">
                {row.category} · /{row.slug}
              </p>
            </div>
            <div className="flex gap-2 text-xs">
              {row.draft ? <span className="text-amber-400">Draft</span> : <span className="text-emerald-400">Live</span>}
              {row.featured ? <span className="text-sky-400">Featured</span> : null}
            </div>
          </Link>
        ))}
        {!data?.length ? <p className="px-4 py-8 text-sm text-neutral-500">No projects yet.</p> : null}
      </div>
    </div>
  )
}
