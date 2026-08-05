import { PageHeader } from '@/components/admin/field'
import { CertificationForm } from '@/components/admin/simple-crud-forms'

export default function NewCertificationPage() {
  return (
    <div>
      <PageHeader title="New certification" />
      <CertificationForm />
    </div>
  )
}
