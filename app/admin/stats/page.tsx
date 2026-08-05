import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import { PageHeader, PrimaryButton } from '@/components/admin/field'

export default async function AdminStatsPage() {
  const supabase = await createClient()
  const { data } = await supabase.from('portfolio_stats').select('*').order('sort_order')

  return (
    <div>
      <PageHeader
        title="Portfolio stats"
        action={
          <Link href="/admin/stats/new">
            <PrimaryButton type="button">New stat</PrimaryButton>
          </Link>
        }
      />
      <div className="border border-neutral-800 divide-y divide-neutral-800">
        {(data ?? []).map((row) => (
          <Link key={row.id} href={`/admin/stats/${row.id}`} className="block px-4 py-3 hover:bg-neutral-900">
            <p className="font-medium">
              {row.value} — {row.label}
            </p>
          </Link>
        ))}
        {!data?.length ? <p className="px-4 py-8 text-sm text-neutral-500">No stats yet.</p> : null}
      </div>
    </div>
  )
}
