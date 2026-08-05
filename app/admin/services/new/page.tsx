import { PageHeader } from '@/components/admin/field'
import { ServiceForm } from '@/components/admin/simple-crud-forms'

export default function NewServicePage() {
  return (
    <div>
      <PageHeader title="New service" />
      <ServiceForm />
    </div>
  )
}
