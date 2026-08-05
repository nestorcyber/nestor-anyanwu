import { PageHeader } from '@/components/admin/field'
import CommunityForm from '@/components/admin/community-form'

export default function NewCommunityPage() {
  return (
    <div>
      <PageHeader title="New community entry" />
      <CommunityForm />
    </div>
  )
}
