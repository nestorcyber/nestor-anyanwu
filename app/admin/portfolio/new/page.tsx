import { PageHeader } from '@/components/admin/field'
import PortfolioForm from '@/components/admin/portfolio-form'

export default function NewPortfolioPage() {
  return (
    <div>
      <PageHeader title="New portfolio project" />
      <PortfolioForm />
    </div>
  )
}
