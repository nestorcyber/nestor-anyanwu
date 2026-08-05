import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import { PageHeader, PrimaryButton } from '@/components/admin/field'

export default async function AdminServicesPage() {
  const supabase = await createClient()
  const { data } = await supabase.from('services').select('id, title, slug').order('sort_order')

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
      <div className="border border-neutral-800 divide-y divide-neutral-800">
        {(data ?? []).map((row) => (
          <Link key={row.id} href={`/admin/services/${row.id}`} className="block px-4 py-3 hover:bg-neutral-900">
            <p className="font-medium">{row.title}</p>
            <p className="text-xs text-neutral-500">{row.slug}</p>
          </Link>
        ))}
        {!data?.length ? <p className="px-4 py-8 text-sm text-neutral-500">No services yet.</p> : null}
      </div>
    </div>
  )
}
