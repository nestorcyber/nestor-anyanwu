import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import { PageHeader, PrimaryButton } from '@/components/admin/field'

export default async function AdminCommunityPage() {
  const supabase = await createClient()
  const { data } = await supabase
    .from('community_entries')
    .select('id, organization, slug, draft, featured')
    .order('sort_order', { ascending: true })

  return (
    <div>
      <PageHeader
        title="Community"
        action={
          <Link href="/admin/community/new">
            <PrimaryButton type="button">New entry</PrimaryButton>
          </Link>
        }
      />
      <div className="border border-neutral-800 divide-y divide-neutral-800">
        {(data ?? []).map((row) => (
          <Link
            key={row.id}
            href={`/admin/community/${row.id}`}
            className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between sm:gap-4 px-3 sm:px-4 py-3 hover:bg-neutral-900"
          >
            <div>
              <p className="font-medium">{row.organization}</p>
              <p className="text-xs text-neutral-500">/{row.slug}</p>
            </div>
            <div className="flex gap-2 text-xs">
              {row.draft ? <span className="text-amber-400">Draft</span> : <span className="text-emerald-400">Live</span>}
              {row.featured ? <span className="text-sky-400">Featured</span> : null}
            </div>
          </Link>
        ))}
        {!data?.length ? <p className="px-4 py-8 text-sm text-neutral-500">No entries yet.</p> : null}
      </div>
    </div>
  )
}
