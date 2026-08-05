import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import { PageHeader, PrimaryButton } from '@/components/admin/field'

export default async function AdminGalleryPage() {
  const supabase = await createClient()
  const { data } = await supabase
    .from('gallery_images')
    .select('id, title, image_url')
    .order('sort_order', { ascending: true })

  return (
    <div>
      <PageHeader
        title="Gallery"
        action={
          <Link href="/admin/gallery/new">
            <PrimaryButton type="button">Add image</PrimaryButton>
          </Link>
        }
      />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {(data ?? []).map((row) => (
          <Link key={row.id} href={`/admin/gallery/${row.id}`} className="border border-border p-2 hover:border-foreground/30">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={row.image_url} alt={row.title || ''} className="h-40 w-full object-cover" />
            <p className="mt-2 text-sm px-1">{row.title || 'Untitled'}</p>
          </Link>
        ))}
      </div>
      {!data?.length ? <p className="text-sm text-muted-foreground">No gallery images yet.</p> : null}
    </div>
  )
}
