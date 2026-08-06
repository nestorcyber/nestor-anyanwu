import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import { PageHeader, PrimaryButton } from '@/components/admin/field'
import { getPortfolioProjects } from '@/lib/content'

export default async function AdminPortfolioPage() {
  const supabase = await createClient()
  const { data: dbData } = await supabase
    .from('portfolio_projects')
    .select('id, title, slug, draft, featured, category')
    .order('sort_order', { ascending: true })

  const fallbackProjects = await getPortfolioProjects()

  const dbSlugs = new Set((dbData ?? []).map((row) => row.slug))
  const items = [
    ...(dbData ?? []),
    ...fallbackProjects
      .filter((p) => !dbSlugs.has(p.slug))
      .map((p) => ({
        id: p.slug,
        title: p.title,
        slug: p.slug,
        category: p.category,
        draft: false,
        featured: p.featured,
      })),
  ]

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
      <div className="border border-border divide-y divide-border">
        {items.map((row) => (
          <Link
            key={row.id}
            href={`/admin/portfolio/${row.id}`}
            className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between sm:gap-4 px-3 sm:px-4 py-3 hover:bg-muted/50"
          >
            <div>
              <p className="font-medium">{row.title}</p>
              <p className="text-xs text-muted-foreground">
                {row.category} · /{row.slug}
              </p>
            </div>
            <div className="flex gap-2 text-xs">
              {row.draft ? <span className="text-amber-400">Draft</span> : <span className="text-emerald-400">Live</span>}
              {row.featured ? <span className="text-sky-400">Featured</span> : null}
            </div>
          </Link>
        ))}
        {!items.length ? <p className="px-4 py-8 text-sm text-muted-foreground">No projects yet.</p> : null}
      </div>
    </div>
  )
}
