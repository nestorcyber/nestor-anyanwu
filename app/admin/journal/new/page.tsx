import { PageHeader } from '@/components/admin/field'
import JournalForm from '@/components/admin/journal-form'

export default function NewJournalPage() {
  return (
    <div>
      <PageHeader title="New journal article" />
      <JournalForm />
    </div>
  )
}
