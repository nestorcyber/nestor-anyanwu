import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import { PageHeader } from '@/components/admin/field'

async function count(table: string) {
  const supabase = await createClient()
  const { count } = await supabase.from(table as 'journal_articles').select('*', { count: 'exact', head: true })
  return count ?? 0
}

export default async function AdminOverviewPage() {
  const [journal, portfolio, community, journey, gallery, services, certifications] =
    await Promise.all([
      count('journal_articles'),
      count('portfolio_projects'),
      count('community_entries'),
      count('journey_items'),
      count('gallery_images'),
      count('services'),
      count('certifications'),
    ])

  const cards = [
    { label: 'Journal', count: journal, href: '/admin/journal' },
    { label: 'Portfolio', count: portfolio, href: '/admin/portfolio' },
    { label: 'Community', count: community, href: '/admin/community' },
    { label: 'Journey', count: journey, href: '/admin/journey' },
    { label: 'Gallery', count: gallery, href: '/admin/gallery' },
    { label: 'Services', count: services, href: '/admin/services' },
    { label: 'Certifications', count: certifications, href: '/admin/certifications' },
  ]

  return (
    <div>
      <PageHeader title="Overview" />
      <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3">
        {cards.map((card) => (
          <Link
            key={card.href}
            href={card.href}
            className="border border-neutral-800 bg-neutral-900 p-4 sm:p-5 hover:border-neutral-600 transition-colors"
          >
            <p className="text-xs sm:text-sm text-neutral-400">{card.label}</p>
            <p className="mt-2 text-2xl sm:text-3xl font-semibold">{card.count}</p>
          </Link>
        ))}
      </div>
    </div>
  )
}
