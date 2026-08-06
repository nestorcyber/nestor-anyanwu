import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import { PageHeader, PrimaryButton } from '@/components/admin/field'
import { servicesList as fallbackServices } from '@/lib/data'

export default async function AdminServicesPage() {
  const supabase = await createClient()
  const { data: dbData } = await supabase.from('services').select('id, title, slug').order('sort_order')

  const items = [
    ...(dbData ?? []),
    ...fallbackServices
      .filter((s) => !new Set((dbData ?? []).map((row) => row.title)).has(s.title))
      .map((s) => ({
        id: s.id,
        title: s.title,
        slug: s.id,
      })),
  ]

  return (
    <div>
      <PageHeader
        title="Services"
        action={
          <Link href="/admin/services/new">
            <PrimaryButton type="button">New service</PrimaryButton>
          </Link>
        }
      />
      <div className="border border-border divide-y divide-border">
        {items.map((row) => (
          <Link key={row.id} href={`/admin/services/${row.id}`} className="block px-4 py-3 hover:bg-muted/50">
            <p className="font-medium">{row.title}</p>
            <p className="text-xs text-muted-foreground">{row.slug}</p>
          </Link>
        ))}
        {!items.length ? <p className="px-4 py-8 text-sm text-muted-foreground">No services yet.</p> : null}
      </div>
    </div>
  )
}
