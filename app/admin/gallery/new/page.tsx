import { PageHeader } from '@/components/admin/field'
import { GalleryForm } from '@/components/admin/simple-crud-forms'

export default function NewGalleryPage() {
  return (
    <div>
      <PageHeader title="Add gallery image" />
      <GalleryForm />
    </div>
  )
}
