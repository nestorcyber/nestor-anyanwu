import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import { PageHeader, PrimaryButton } from '@/components/admin/field'

export default async function AdminCertificationsPage() {
  const supabase = await createClient()
  const { data } = await supabase.from('certifications').select('id, title, provider').order('sort_order')

  return (
    <div>
      <PageHeader
        title="Certifications"
        action={
          <Link href="/admin/certifications/new">
            <PrimaryButton type="button">New certification</PrimaryButton>
          </Link>
        }
      />
      <div className="border border-border divide-y divide-border">
        {(data ?? []).map((row) => (
          <Link key={row.id} href={`/admin/certifications/${row.id}`} className="block px-4 py-3 hover:bg-muted/50">
            <p className="font-medium">{row.title}</p>
            <p className="text-xs text-muted-foreground">{row.provider}</p>
          </Link>
        ))}
        {!data?.length ? <p className="px-4 py-8 text-sm text-muted-foreground">No certifications yet.</p> : null}
      </div>
    </div>
  )
}
