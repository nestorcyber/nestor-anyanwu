import { PageHeader } from '@/components/admin/field'
import JourneyForm from '@/components/admin/journey-form'

export default function NewJourneyPage() {
  return (
    <div>
      <PageHeader title="New journey item" />
      <JourneyForm />
    </div>
  )
}
