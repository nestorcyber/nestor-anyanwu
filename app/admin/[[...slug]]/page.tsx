import Link from 'next/link'
import { notFound } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { PageHeader, PrimaryButton } from '@/components/admin/field'
import JournalForm from '@/components/admin/journal-form'
import PortfolioForm from '@/components/admin/portfolio-form'
import CommunityForm from '@/components/admin/community-form'
import JourneyForm from '@/components/admin/journey-form'
import SkillsManager from '@/components/admin/skills-manager'
import {
  CertificationForm,
  GalleryForm,
  ServiceForm,
  SettingsForm,
  StatForm,
} from '@/components/admin/simple-crud-forms'
import {
  getCertifications,
  getCommunityEntries,
  getGalleryImages,
  getJournalArticles,
  getJourneyItems,
  getPortfolioProjects,
  getPortfolioStats,
  getSkillGroups,
} from '@/lib/content'
import { servicesList as fallbackServices } from '@/lib/data'

export const dynamic = 'force-dynamic'

interface Props {
  params: Promise<{ slug?: string[] }>
}

export default async function AdminCatchAllPage({ params }: Props) {
  const { slug = [] } = await params
  const supabase = await createClient()

  // 1. Root /admin Overview
  if (slug.length === 0) {
    const count = async (table: string) => {
      const { count } = await supabase.from(table as any).select('*', { count: 'exact', head: true })
      return count ?? 0
    }
    const [journal, portfolio, community, journey, gallery, services, certifications, statsCount] = await Promise.all([
      count('journal_articles'),
      count('portfolio_projects'),
      count('community_entries'),
      count('journey_items'),
      count('gallery_images'),
      count('services'),
      count('certifications'),
      count('portfolio_stats'),
    ])
    const { data: recentLogs } = await supabase
      .from('admin_activity_logs')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(6)

    const cards = [
      { label: 'Journal Articles', count: journal, href: '/admin/journal' },
      { label: 'Portfolio Projects', count: portfolio, href: '/admin/portfolio' },
      { label: 'Community Entries', count: community, href: '/admin/community' },
      { label: 'Career Milestones', count: journey, href: '/admin/journey' },
      { label: 'Media Assets (Gallery)', count: gallery, href: '/admin/gallery' },
      { label: 'Services', count: services, href: '/admin/services' },
      { label: 'Certifications', count: certifications, href: '/admin/certifications' },
      { label: 'Home Impact Stats', count: statsCount, href: '/admin/stats' },
    ]

    return (
      <div className="space-y-8">
        <PageHeader title="CMS Overview" />

        {/* Quick Actions Banners */}
        <div className="border border-border bg-card p-4 sm:p-5 rounded-sm space-y-3">
          <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-muted-foreground">Quick Actions</h3>
          <div className="flex flex-wrap gap-2.5">
            <Link
              href="/admin/journal/new"
              className="px-3.5 py-2 text-xs font-semibold bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
            >
              + New Journal Post
            </Link>
            <Link
              href="/admin/portfolio/new"
              className="px-3.5 py-2 text-xs font-semibold border border-border bg-secondary hover:bg-secondary/80 text-foreground transition-colors"
            >
              + New Project
            </Link>
            <Link
              href="/admin/gallery"
              className="px-3.5 py-2 text-xs font-semibold border border-border bg-secondary hover:bg-secondary/80 text-foreground transition-colors"
            >
              + Upload Media
            </Link>
            <Link
              href="/admin/settings"
              className="px-3.5 py-2 text-xs font-semibold border border-border bg-secondary hover:bg-secondary/80 text-foreground transition-colors"
            >
              Manage Site Settings
            </Link>
          </div>
        </div>

        {/* Content Stats Cards */}
        <div>
          <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-muted-foreground mb-3">Content Metrics</h3>
          <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
            {cards.map((card) => (
              <Link
                key={card.href}
                href={card.href}
                className="border border-border bg-card p-4 hover:border-foreground/30 transition-colors"
              >
                <p className="text-xs text-muted-foreground">{card.label}</p>
                <p className="mt-2 text-2xl sm:text-3xl font-semibold">{card.count}</p>
              </Link>
            ))}
          </div>
        </div>

        {/* Recent Activity Log Feed */}
        <div className="border border-border bg-card p-4 sm:p-5 rounded-sm space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-muted-foreground">Recent Admin Activity</h3>
            <Link href="/admin/activity" className="text-xs text-accent hover:underline">
              View All Logs →
            </Link>
          </div>
          {recentLogs && recentLogs.length > 0 ? (
            <div className="border border-border divide-y divide-border">
              {recentLogs.map((log: any) => (
                <div key={log.id} className="p-3 text-xs flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
                  <div>
                    <span className="font-semibold text-foreground">{log.action}</span>
                    <span className="text-muted-foreground ml-2">({log.resource})</span>
                    {log.details ? <p className="text-muted-foreground mt-0.5">{log.details}</p> : null}
                  </div>
                  <span className="text-[11px] text-muted-foreground font-mono shrink-0">
                    {new Date(log.created_at).toLocaleString()}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-xs text-muted-foreground">No recent administrative actions recorded yet.</p>
          )}
        </div>
      </div>
    )
  }

  const section = slug[0]
  const actionOrId = slug[1]

  // 2. Journal
  if (section === 'journal') {
    if (!actionOrId) {
      const { data: dbData } = await supabase
        .from('journal_articles')
        .select('id, title, slug, draft, featured, published_date')
        .order('published_date', { ascending: false })
      const fallbackArticles = await getJournalArticles()
      const dbSlugs = new Set((dbData ?? []).map((row) => row.slug))
      const items = [
        ...(dbData ?? []),
        ...fallbackArticles
          .filter((a) => !dbSlugs.has(a.slug))
          .map((a) => ({
            id: a.slug,
            title: a.title,
            slug: a.slug,
            draft: false,
            featured: a.featured,
            published_date: a.publishedDate,
          })),
      ]
      return (
        <div>
          <PageHeader
            title="Journal"
            action={
              <Link href="/admin/journal/new">
                <PrimaryButton type="button">New article</PrimaryButton>
              </Link>
            }
          />
          <div className="border border-border divide-y divide-border">
            {items.map((row) => (
              <Link
                key={row.id}
                href={`/admin/journal/${row.id}`}
                className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between sm:gap-4 px-3 sm:px-4 py-3 hover:bg-muted/50"
              >
                <div>
                  <p className="font-medium">{row.title}</p>
                  <p className="text-xs text-muted-foreground">/{row.slug}</p>
                </div>
                <div className="flex gap-2 text-xs">
                  {row.draft ? <span className="text-amber-400">Draft</span> : <span className="text-emerald-400">Live</span>}
                  {row.featured ? <span className="text-sky-400">Featured</span> : null}
                </div>
              </Link>
            ))}
            {!items.length ? <p className="px-4 py-8 text-sm text-muted-foreground">No articles yet.</p> : null}
          </div>
        </div>
      )
    }
    if (actionOrId === 'new') {
      return (
        <div>
          <PageHeader title="New journal article" />
          <JournalForm />
        </div>
      )
    }
    let data = null
    const { data: byId } = await supabase.from('journal_articles').select('*').eq('id', actionOrId).maybeSingle()
    data = byId
    if (!data) {
      const { data: bySlug } = await supabase.from('journal_articles').select('*').eq('slug', actionOrId).maybeSingle()
      data = bySlug
    }
    if (!data) {
      const all = await getJournalArticles()
      const fb = all.find((a) => a.id === actionOrId || a.slug === actionOrId)
      if (fb) {
        data = {
          id: undefined,
          slug: fb.slug,
          title: fb.title,
          excerpt: fb.excerpt,
          cover_image: fb.coverImage,
          category: fb.category,
          tags: fb.tags,
          featured: fb.featured,
          pinned: fb.pinned,
          published_date: fb.publishedDate,
          last_updated: fb.lastUpdated,
          author: fb.author,
          seo_title: fb.seoTitle,
          seo_description: fb.seoDescription,
          content: fb.content,
          draft: false,
        } as any
      }
    }
    if (!data) notFound()
    return (
      <div>
        <PageHeader title="Edit journal article" />
        <JournalForm initial={data} />
      </div>
    )
  }

  // 3. Portfolio
  if (section === 'portfolio') {
    if (!actionOrId) {
      const { data: dbData } = await supabase
        .from('portfolio_projects')
        .select('id, title, slug, draft, featured, category')
        .order('sort_order', { ascending: true })
      const fallbackProjects = await getPortfolioProjects()
      const dbSlugs = new Set((dbData ?? []).map((row) => row.slug))
      const items = [
        ...(dbData ?? []),
        ...fallbackProjects
          .filter((p) => !dbSlugs.has(p.slug))
          .map((p) => ({
            id: p.slug,
            title: p.title,
            slug: p.slug,
            category: p.category,
            draft: false,
            featured: p.featured,
          })),
      ]
      return (
        <div>
          <PageHeader
            title="Portfolio"
            action={
              <Link href="/admin/portfolio/new">
                <PrimaryButton type="button">New project</PrimaryButton>
              </Link>
            }
          />
          <div className="border border-border divide-y divide-border">
            {items.map((row) => (
              <Link
                key={row.id}
                href={`/admin/portfolio/${row.id}`}
                className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between sm:gap-4 px-3 sm:px-4 py-3 hover:bg-muted/50"
              >
                <div>
                  <p className="font-medium">{row.title}</p>
                  <p className="text-xs text-muted-foreground">{row.category} · /{row.slug}</p>
                </div>
                <div className="flex gap-2 text-xs">
                  {row.draft ? <span className="text-amber-400">Draft</span> : <span className="text-emerald-400">Live</span>}
                  {row.featured ? <span className="text-sky-400">Featured</span> : null}
                </div>
              </Link>
            ))}
            {!items.length ? <p className="px-4 py-8 text-sm text-muted-foreground">No projects yet.</p> : null}
          </div>
        </div>
      )
    }
    if (actionOrId === 'new') {
      return (
        <div>
          <PageHeader title="New portfolio project" />
          <PortfolioForm />
        </div>
      )
    }
    let data = null
    const { data: byId } = await supabase.from('portfolio_projects').select('*').eq('id', actionOrId).maybeSingle()
    data = byId
    if (!data) {
      const { data: bySlug } = await supabase.from('portfolio_projects').select('*').eq('slug', actionOrId).maybeSingle()
      data = bySlug
    }
    if (!data) {
      const all = await getPortfolioProjects()
      const fb = all.find((p) => p.id === actionOrId || p.slug === actionOrId)
      if (fb) {
        data = {
          id: undefined,
          slug: fb.slug,
          title: fb.title,
          short_description: fb.shortDescription,
          full_description: fb.fullDescription,
          cover_image: fb.coverImage,
          gallery: fb.gallery,
          category: fb.category,
          technologies: fb.technologies,
          status: fb.status,
          client: fb.client,
          role: fb.role,
          github_url: fb.githubUrl,
          live_url: fb.liveUrl,
          case_study_url: fb.caseStudyUrl,
          featured: fb.featured,
          completion_date: fb.completionDate,
          draft: false,
          sort_order: 0,
        } as any
      }
    }
    if (!data) notFound()
    return (
      <div>
        <PageHeader title="Edit portfolio project" />
        <PortfolioForm initial={data} />
      </div>
    )
  }

  // 4. Community
  if (section === 'community') {
    if (!actionOrId) {
      const { data: dbData } = await supabase
        .from('community_entries')
        .select('id, organization, slug, draft, featured')
        .order('sort_order', { ascending: true })
      const fallbackEntries = await getCommunityEntries()
      const dbSlugs = new Set((dbData ?? []).map((row) => row.slug))
      const items = [
        ...(dbData ?? []),
        ...fallbackEntries
          .filter((e) => !dbSlugs.has(e.slug))
          .map((e) => ({
            id: e.slug,
            organization: e.organization,
            slug: e.slug,
            draft: false,
            featured: e.featured,
          })),
      ]
      return (
        <div>
          <PageHeader
            title="Community"
            action={
              <Link href="/admin/community/new">
                <PrimaryButton type="button">New entry</PrimaryButton>
              </Link>
            }
          />
          <div className="border border-border divide-y divide-border">
            {items.map((row) => (
              <Link
                key={row.id}
                href={`/admin/community/${row.id}`}
                className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between sm:gap-4 px-3 sm:px-4 py-3 hover:bg-muted/50"
              >
                <div>
                  <p className="font-medium">{row.organization}</p>
                  <p className="text-xs text-muted-foreground">/{row.slug}</p>
                </div>
                <div className="flex gap-2 text-xs">
                  {row.draft ? <span className="text-amber-400">Draft</span> : <span className="text-emerald-400">Live</span>}
                  {row.featured ? <span className="text-sky-400">Featured</span> : null}
                </div>
              </Link>
            ))}
            {!items.length ? <p className="px-4 py-8 text-sm text-muted-foreground">No entries yet.</p> : null}
          </div>
        </div>
      )
    }
    if (actionOrId === 'new') {
      return (
        <div>
          <PageHeader title="New community entry" />
          <CommunityForm />
        </div>
      )
    }
    let data = null
    const { data: byId } = await supabase.from('community_entries').select('*').eq('id', actionOrId).maybeSingle()
    data = byId
    if (!data) {
      const { data: bySlug } = await supabase.from('community_entries').select('*').eq('slug', actionOrId).maybeSingle()
      data = bySlug
    }
    if (!data) {
      const all = await getCommunityEntries()
      const fb = all.find((e) => e.id === actionOrId || e.slug === actionOrId)
      if (fb) {
        data = {
          id: undefined,
          slug: fb.slug,
          organization: fb.organization,
          role: fb.role,
          duration: fb.duration,
          cover_image: fb.coverImage,
          gallery: fb.gallery,
          achievements: fb.achievements,
          impact_stats: fb.impactStats,
          featured: fb.featured,
          tags: fb.tags,
          description: fb.description,
          draft: false,
          sort_order: 0,
        } as any
      }
    }
    if (!data) notFound()
    return (
      <div>
        <PageHeader title="Edit community entry" />
        <CommunityForm initial={data} />
      </div>
    )
  }

  // 5. Journey
  if (section === 'journey') {
    if (!actionOrId) {
      const { data: dbData } = await supabase
        .from('journey_items')
        .select('id, title, organization, date_label, type')
        .order('sort_order', { ascending: true })
      const fallbackJourney = await getJourneyItems()
      const dbTitles = new Set((dbData ?? []).map((row) => row.title))
      const items = [
        ...(dbData ?? []),
        ...fallbackJourney
          .filter((j) => !dbTitles.has(j.title))
          .map((j) => ({
            id: j.id,
            title: j.title,
            organization: j.organization,
            date_label: j.date,
            type: j.type,
          })),
      ]
      return (
        <div>
          <PageHeader
            title="Career Milestones"
            action={
              <Link href="/admin/journey/new">
                <PrimaryButton type="button">New milestone</PrimaryButton>
              </Link>
            }
          />
          <div className="border border-border divide-y divide-border">
            {items.map((row) => (
              <Link
                key={row.id}
                href={`/admin/journey/${row.id}`}
                className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between sm:gap-4 px-3 sm:px-4 py-3 hover:bg-muted/50"
              >
                <div>
                  <p className="font-medium">{row.title}</p>
                  <p className="text-xs text-muted-foreground">{row.organization} · {row.date_label}</p>
                </div>
                <span className="text-xs text-muted-foreground">{row.type}</span>
              </Link>
            ))}
            {!items.length ? <p className="px-4 py-8 text-sm text-muted-foreground">No journey items yet.</p> : null}
          </div>
        </div>
      )
    }
    if (actionOrId === 'new') {
      return (
        <div>
          <PageHeader title="New journey item" />
          <JourneyForm />
        </div>
      )
    }
    let data = null
    const { data: byId } = await supabase.from('journey_items').select('*').eq('id', actionOrId).maybeSingle()
    data = byId
    if (!data) {
      const all = await getJourneyItems()
      const fb = all.find((j) => String(j.id) === String(actionOrId))
      if (fb) {
        data = {
          id: undefined,
          title: fb.title,
          organization: fb.organization,
          role: fb.role,
          date_label: fb.date,
          description: fb.description,
          type: fb.type,
          details: fb.details,
          images: fb.images,
          sort_order: 0,
        } as any
      }
    }
    if (!data) notFound()
    return (
      <div>
        <PageHeader title="Edit journey item" />
        <JourneyForm initial={data} />
      </div>
    )
  }

  // 6. Gallery
  if (section === 'gallery') {
    if (!actionOrId) {
      const { data: dbData } = await supabase
        .from('gallery_images')
        .select('id, title, image_url')
        .order('sort_order', { ascending: true })
      const fallbackImages = await getGalleryImages()
      const dbUrls = new Set((dbData ?? []).map((row) => row.image_url))
      const items = [
        ...(dbData ?? []),
        ...fallbackImages
          .filter((img) => !dbUrls.has(img.url))
          .map((img, i) => ({
            id: `img-${i}`,
            title: img.title || 'Gallery Photo',
            image_url: img.url,
          })),
      ]
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
            {items.map((row) => (
              <Link key={row.id} href={`/admin/gallery/${row.id}`} className="border border-border p-2 hover:border-foreground/30">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={row.image_url} alt={row.title || ''} className="h-40 w-full object-cover" />
                <p className="mt-2 text-sm px-1">{row.title || 'Untitled'}</p>
              </Link>
            ))}
          </div>
          {!items.length ? <p className="text-sm text-muted-foreground">No gallery images yet.</p> : null}
        </div>
      )
    }
    if (actionOrId === 'new') {
      return (
        <div>
          <PageHeader title="Add gallery image" />
          <GalleryForm />
        </div>
      )
    }
    let data = null
    const { data: dbData } = await supabase.from('gallery_images').select('*').eq('id', actionOrId).maybeSingle()
    data = dbData
    if (!data) {
      const fallbackImages = await getGalleryImages()
      const index = parseInt(actionOrId.replace('img-', ''), 10)
      const fb = fallbackImages[index] || fallbackImages.find((img) => img.id === actionOrId)
      if (fb) {
        data = {
          id: undefined,
          title: fb.title || 'Gallery Photo',
          image_url: fb.url,
          alt: fb.alt || fb.title || '',
          sort_order: index >= 0 ? index : 0,
        } as any
      }
    }
    if (!data) notFound()
    return (
      <div>
        <PageHeader title="Edit gallery image" />
        <GalleryForm initial={data} />
      </div>
    )
  }

  // 7. Services
  if (section === 'services') {
    if (!actionOrId) {
      const { data: dbData } = await supabase.from('services').select('id, title, slug').order('sort_order')
      const items = [
        ...(dbData ?? []),
        ...fallbackServices
          .filter((s) => !new Set((dbData ?? []).map((row) => row.title)).has(s.title))
          .map((s) => ({ id: s.id, title: s.title, slug: s.id })),
      ]
      return (
        <div>
          <PageHeader
            title="Services"
            action={
              <Link href="/admin/services/new">
                <PrimaryButton type="button">New service</PrimaryButton>
              </Link>
            }
          />
          <div className="border border-border divide-y divide-border">
            {items.map((row) => (
              <Link key={row.id} href={`/admin/services/${row.id}`} className="block px-4 py-3 hover:bg-muted/50">
                <p className="font-medium">{row.title}</p>
                <p className="text-xs text-muted-foreground">{row.slug}</p>
              </Link>
            ))}
            {!items.length ? <p className="px-4 py-8 text-sm text-muted-foreground">No services yet.</p> : null}
          </div>
        </div>
      )
    }
    if (actionOrId === 'new') {
      return (
        <div>
          <PageHeader title="New service" />
          <ServiceForm />
        </div>
      )
    }
    let data = null
    const { data: dbData } = await supabase.from('services').select('*').eq('id', actionOrId).maybeSingle()
    data = dbData
    if (!data) {
      const fb = fallbackServices.find((s) => s.id === actionOrId || s.title === actionOrId)
      if (fb) {
        data = {
          id: undefined,
          title: fb.title,
          slug: fb.id,
          description: fb.description,
          icon: fb.icon,
          deliverables: fb.deliverables,
          sort_order: 0,
        } as any
      }
    }
    if (!data) notFound()
    return (
      <div>
        <PageHeader title="Edit service" />
        <ServiceForm initial={data} />
      </div>
    )
  }

  // 8. Stats
  if (section === 'stats') {
    if (!actionOrId) {
      const { data: dbData } = await supabase.from('portfolio_stats').select('*').order('sort_order')
      const fallbackStats = await getPortfolioStats()
      const dbLabels = new Set((dbData ?? []).map((row) => row.label))
      const items = [
        ...(dbData ?? []),
        ...fallbackStats
          .filter((s) => !dbLabels.has(s.label))
          .map((s, i) => ({ id: `stat-${i}`, value: s.value, label: s.label })),
      ]
      return (
        <div>
          <PageHeader
            title="Home Impact & Portfolio Stats"
            action={
              <Link href="/admin/stats/new">
                <PrimaryButton type="button">New stat</PrimaryButton>
              </Link>
            }
          />
          <div className="border border-border divide-y divide-border">
            {items.map((row) => (
              <Link key={row.id} href={`/admin/stats/${row.id}`} className="block px-4 py-3 hover:bg-muted/50">
                <p className="font-medium">{row.value} — {row.label}</p>
              </Link>
            ))}
            {!items.length ? <p className="px-4 py-8 text-sm text-muted-foreground">No stats yet.</p> : null}
          </div>
        </div>
      )
    }
    if (actionOrId === 'new') {
      return (
        <div>
          <PageHeader title="New portfolio stat" />
          <StatForm />
        </div>
      )
    }
    let data = null
    const { data: dbData } = await supabase.from('portfolio_stats').select('*').eq('id', actionOrId).maybeSingle()
    data = dbData
    if (!data) {
      const fallbackStats = await getPortfolioStats()
      const index = parseInt(actionOrId.replace('stat-', ''), 10)
      const fb = fallbackStats[index] || fallbackStats.find((s) => s.label === actionOrId)
      if (fb) {
        data = {
          id: undefined,
          value: fb.value,
          label: fb.label,
          description: fb.description || '',
          sort_order: !isNaN(index) ? index : 0,
        } as any
      }
    }
    if (!data) notFound()
    return (
      <div>
        <PageHeader title="Edit portfolio stat" />
        <StatForm initial={data} />
      </div>
    )
  }

  // 9. Certifications
  if (section === 'certifications') {
    if (!actionOrId) {
      const { data: dbData } = await supabase.from('certifications').select('id, title, provider').order('sort_order')
      const fallbackCertifications = await getCertifications()
      const dbTitles = new Set((dbData ?? []).map((row) => row.title))
      const items = [
        ...(dbData ?? []),
        ...fallbackCertifications
          .filter((c) => !dbTitles.has(c.title))
          .map((c, i) => ({ id: `cert-${i}`, title: c.title, provider: c.provider })),
      ]
      return (
        <div>
          <PageHeader
            title="Certifications"
            action={
              <Link href="/admin/certifications/new">
                <PrimaryButton type="button">New certification</PrimaryButton>
              </Link>
            }
          />
          <div className="border border-border divide-y divide-border">
            {items.map((row) => (
              <Link key={row.id} href={`/admin/certifications/${row.id}`} className="block px-4 py-3 hover:bg-muted/50">
                <p className="font-medium">{row.title}</p>
                <p className="text-xs text-muted-foreground">{row.provider}</p>
              </Link>
            ))}
            {!items.length ? <p className="px-4 py-8 text-sm text-muted-foreground">No certifications yet.</p> : null}
          </div>
        </div>
      )
    }
    if (actionOrId === 'new') {
      return (
        <div>
          <PageHeader title="New certification" />
          <CertificationForm />
        </div>
      )
    }
    let data = null
    const { data: dbData } = await supabase.from('certifications').select('*').eq('id', actionOrId).maybeSingle()
    data = dbData
    if (!data) {
      const fallbackCertifications = await getCertifications()
      const index = parseInt(actionOrId.replace('cert-', ''), 10)
      const fb = fallbackCertifications[index] || fallbackCertifications.find((c) => c.title === actionOrId)
      if (fb) {
        data = {
          id: undefined,
          title: fb.title,
          provider: fb.provider,
          issue_date: fb.date || null,
          credential_url: fb.credentialUrl || null,
          sort_order: !isNaN(index) ? index : 0,
        } as any
      }
    }
    if (!data) notFound()
    return (
      <div>
        <PageHeader title="Edit certification" />
        <CertificationForm initial={data} />
      </div>
    )
  }

  // 10. Skills
  if (section === 'skills') {
    const { data: groups } = await supabase.from('skill_groups').select('*').order('sort_order')
    const { data: skills } = await supabase.from('skills').select('*').order('sort_order')
    let initialGroups = (groups ?? []).map((g) => ({
      ...g,
      skills: (skills ?? []).filter((s) => s.group_id === g.id),
    }))
    if (initialGroups.length === 0) {
      const fallback = await getSkillGroups()
      initialGroups = fallback.map((g, i) => ({
        id: `group-${i}`,
        category: g.category,
        sort_order: i,
        created_at: new Date().toISOString(),
        skills: g.skills.map((s, j) => ({
          id: `skill-${i}-${j}`,
          group_id: `group-${i}`,
          name: s.name,
          experience_level: s.experienceLevel || null,
          years: s.years || null,
          sort_order: j,
          created_at: new Date().toISOString(),
        })),
      })) as any
    }
    return (
      <div>
        <PageHeader title="Skills" />
        <SkillsManager initialGroups={initialGroups} />
      </div>
    )
  }

  // 11. Activity Logs
  if (section === 'activity') {
    const { data: logs } = await supabase
      .from('admin_activity_logs')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(100)

    return (
      <div className="space-y-4">
        <PageHeader title="Activity Logs" />
        <div className="border border-border bg-card rounded-sm overflow-hidden">
          {logs && logs.length > 0 ? (
            <div className="divide-y divide-border">
              {logs.map((log: any) => (
                <div key={log.id} className="p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-sm text-foreground">{log.action}</span>
                      <span className="text-xs px-2 py-0.5 rounded border border-border bg-secondary/50 font-mono text-muted-foreground">
                        {log.resource}
                      </span>
                    </div>
                    {log.details ? <p className="text-xs text-muted-foreground">{log.details}</p> : null}
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-xs font-mono text-muted-foreground">{new Date(log.created_at).toLocaleString()}</p>
                    <p className="text-[11px] text-muted-foreground/70">{log.admin_email}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="p-8 text-center text-sm text-muted-foreground">No admin activity recorded yet.</p>
          )}
        </div>
      </div>
    )
  }

  // 12. Settings
  if (section === 'settings') {
    let { data } = await supabase.from('site_settings').select('*').limit(1).maybeSingle()
    if (!data) {
      const inserted = await supabase.from('site_settings').insert({ site_name: 'Nestor Cyber' }).select('*').single()
      data = inserted.data
    }
    if (!data) {
      return <p className="text-red-400">Could not load site settings. Check Supabase connection.</p>
    }
    return (
      <div>
        <PageHeader title="Site settings" />
        <SettingsForm initial={data} />
      </div>
    )
  }

  notFound()
}
