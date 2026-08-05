import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import { PageHeader, PrimaryButton } from '@/components/admin/field'

export default async function AdminJourneyPage() {
  const supabase = await createClient()
  const { data } = await supabase
    .from('journey_items')
    .select('id, title, organization, date_label, type')
    .order('sort_order', { ascending: true })

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
        {(data ?? []).map((row) => (
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
        {!data?.length ? <p className="px-4 py-8 text-sm text-muted-foreground">No journey items yet.</p> : null}
      </div>
    </div>
  )
}
