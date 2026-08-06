import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import { PageHeader, PrimaryButton } from '@/components/admin/field'
import { getJourneyItems } from '@/lib/content'

export default async function AdminJourneyPage() {
  const supabase = await createClient()
  const { data: dbData } = await supabase
    .from('journey_items')
    .select('id, title, organization, date_label, type')
    .order('sort_order', { ascending: true })

  const fallbackJourney = await getJourneyItems()
  const dbTitles = new Set((dbData ?? []).map((row) => row.title))
  const items = [
    ...(dbData ?? []),
    ...fallbackJourney
      .filter((j) => !dbTitles.has(j.title))
      .map((j) => ({
        id: j.id,
        title: j.title,
        organization: j.organization,
        date_label: j.date,
        type: j.type,
      })),
  ]

  return (
    <div>
      <PageHeader
        title="Journey"
        action={
          <Link href="/admin/journey/new">
            <PrimaryButton type="button">New item</PrimaryButton>
          </Link>
        }
      />
      <div className="border border-border divide-y divide-border">
        {items.map((row) => (
          <Link
            key={row.id}
            href={`/admin/journey/${row.id}`}
            className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between sm:gap-4 px-3 sm:px-4 py-3 hover:bg-muted/50"
          >
            <div>
              <p className="font-medium">{row.title}</p>
              <p className="text-xs text-muted-foreground">
                {row.organization} · {row.date_label}
              </p>
            </div>
            <span className="text-xs text-muted-foreground">{row.type}</span>
          </Link>
        ))}
        {!items.length ? <p className="px-4 py-8 text-sm text-muted-foreground">No journey items yet.</p> : null}
      </div>
    </div>
  )
}
