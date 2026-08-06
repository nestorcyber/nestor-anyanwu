import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import { PageHeader, PrimaryButton } from '@/components/admin/field'
import { getPortfolioStats } from '@/lib/content'

export default async function AdminStatsPage() {
  const supabase = await createClient()
  const { data: dbData } = await supabase.from('portfolio_stats').select('*').order('sort_order')

  const fallbackStats = await getPortfolioStats()
  const dbLabels = new Set((dbData ?? []).map((row) => row.label))
  const items = [
    ...(dbData ?? []),
    ...fallbackStats
      .filter((s) => !dbLabels.has(s.label))
      .map((s, i) => ({
        id: `stat-${i}`,
        value: s.value,
        label: s.label,
      })),
  ]

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
      <div className="border border-border divide-y divide-border">
        {items.map((row) => (
          <Link key={row.id} href={`/admin/stats/${row.id}`} className="block px-4 py-3 hover:bg-muted/50">
            <p className="font-medium">
              {row.value} — {row.label}
            </p>
          </Link>
        ))}
        {!items.length ? <p className="px-4 py-8 text-sm text-muted-foreground">No stats yet.</p> : null}
      </div>
    </div>
  )
}
