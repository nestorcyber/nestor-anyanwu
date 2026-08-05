import { PageHeader } from '@/components/admin/field'
import { StatForm } from '@/components/admin/simple-crud-forms'

export default function NewStatPage() {
  return (
    <div>
      <PageHeader title="New stat" />
      <StatForm />
    </div>
  )
}
