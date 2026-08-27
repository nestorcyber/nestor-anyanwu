import Link from 'next/link'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { Share2, MessageSquare, BarChart2, Sparkles, ExternalLink } from 'lucide-react'
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
  BrandForm,
} from '@/components/admin/simple-crud-forms'
import {
  getCertifications,
  getCommunityEntries,
  getGalleryImages,
  getAllMediaImages,
  getVolunteeringImages,
  isImageInCategory,
  getJournalArticles,
  getJourneyItems,
  getPortfolioProjects,
  getPortfolioStats,
  getSkillGroups,
  getBrandPartners,
} from '@/lib/content'
import { servicesList as fallbackServices } from '@/lib/data'

export const dynamic = 'force-dynamic'

function formatDate(dateStr?: string): string {
  if (!dateStr) return 'Aug 13'
  try {
    const d = new Date(dateStr)
    if (isNaN(d.getTime())) return String(dateStr)
    return d.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: d.getFullYear() === 2026 ? undefined : 'numeric',
    })
  } catch {
    return String(dateStr)
  }
}

interface Props {
  params: Promise<{ slug?: string[] }>
}

export default async function AdminCatchAllPage({ params }: Props) {
  const { slug = [] } = await params
  const supabase = await createClient()

  // 1. Root /admin Overview
  if (slug.length === 0) {
    const count = async (table: string, filter?: object) => {
      let query = supabase.from(table as any).select('*', { count: 'exact', head: true })
      if (filter) {
        Object.entries(filter).forEach(([k, v]) => {
          query = query.eq(k, v)
        })
      }
      const { count } = await query
      return count ?? 0
    }

    const [journalTotal, portfolioTotal, communityTotal, galleryTotal] = await Promise.all([
      count('journal_articles'),
      count('portfolio_projects'),
      count('community_entries'),
      count('gallery_images'),
    ])

    const { data: recentJournal } = await supabase
      .from('journal_articles')
      .select('id, title, slug, draft, category, published_date, updated_at')
      .order('updated_at', { ascending: false })
      .limit(5)

    const { data: recentLogs } = await supabase
      .from('admin_activity_logs')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(5)

    const statCards = [
      {
        label: 'Portfolio Page (Projects)',
        count: portfolioTotal,
        actionLabel: 'Manage Portfolio →',
        href: '/admin/portfolio',
      },
      {
        label: 'Journal Page (Articles)',
        count: journalTotal,
        actionLabel: 'Manage Journal →',
        href: '/admin/journal',
      },
      {
        label: 'Home/About (Advocacy)',
        count: communityTotal,
        actionLabel: 'Manage Community →',
        href: '/admin/community',
      },
      {
        label: 'Gallery & Media Page',
        count: galleryTotal,
        actionLabel: 'Manage Media →',
        href: '/admin/gallery',
      },
    ]

    return (
      <div className="space-y-8">
        {/* Header Title Section */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">Dashboard</h1>
            <p className="text-xs sm:text-sm text-muted-foreground mt-1">
              Manage your website content, media, and publishing from one place.
            </p>
          </div>
          <Link
            href="/"
            target="_blank"
            className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-lg bg-accent text-accent-foreground hover:bg-accent/90 transition-colors shrink-0 shadow-xs"
          >
            <span>Preview Website</span>
          </Link>
        </div>

        {/* Real Content Statistics Cards (Reference Inspired) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {statCards.map((card) => (
            <div
              key={card.label}
              className="bg-card border border-border/80 rounded-xl p-5 shadow-2xs space-y-4 flex flex-col justify-between"
            >
              <div>
                <p className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight">{card.count}</p>
                <p className="text-xs font-medium text-muted-foreground mt-1">{card.label}</p>
              </div>
              <Link
                href={card.href}
                className="text-xs font-semibold text-accent hover:underline inline-flex items-center gap-1"
              >
                {card.actionLabel}
              </Link>
            </div>
          ))}
        </div>

        {/* Quick Action Bar */}
        <div className="bg-card border border-border/80 rounded-xl p-4 sm:p-5 shadow-2xs space-y-3">
          <p className="text-xs font-mono font-bold uppercase tracking-wider text-muted-foreground">
            Quick Actions
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/admin/journal/new"
              className="px-4 py-2 text-xs font-semibold rounded-lg bg-accent text-accent-foreground hover:bg-accent/90 transition-colors shadow-2xs"
            >
              + New Journal Post
            </Link>
            <Link
              href="/admin/portfolio/new"
              className="px-4 py-2 text-xs font-semibold rounded-lg border border-border bg-secondary hover:bg-secondary/80 text-foreground transition-colors"
            >
              + New Project
            </Link>
            <Link
              href="/admin/gallery"
              className="px-4 py-2 text-xs font-semibold rounded-lg border border-border bg-secondary hover:bg-secondary/80 text-foreground transition-colors"
            >
              + Upload Media
            </Link>
            <Link
              href="/admin/settings"
              className="px-4 py-2 text-xs font-semibold rounded-lg border border-border bg-secondary hover:bg-secondary/80 text-foreground transition-colors"
            >
              Manage Site Settings
            </Link>
          </div>
        </div>

        {/* Content Activity Grid: Recent Journal Posts & Admin Activity Log */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column (Col 1-7): Recent Journal Posts Table */}
          <div className="lg:col-span-7 bg-card border border-border/80 rounded-xl p-5 shadow-2xs space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-foreground">Recent Journal Posts</h3>
                <p className="text-xs text-muted-foreground mt-0.5">Manage your latest journal entries.</p>
              </div>
              <Link href="/admin/journal" className="text-xs font-semibold text-accent hover:underline">
                View all →
              </Link>
            </div>

            <div className="border border-border/70 rounded-lg overflow-hidden">
              <table className="w-full text-left text-xs">
                <thead className="bg-secondary/60 text-muted-foreground font-semibold uppercase tracking-wider text-[10px] border-b border-border/70">
                  <tr>
                    <th className="p-3">Title</th>
                    <th className="p-3">Status</th>
                    <th className="p-3">Category</th>
                    <th className="p-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/60">
                  {recentJournal && recentJournal.length > 0 ? (
                    recentJournal.map((item: any) => (
                      <tr key={item.id} className="hover:bg-secondary/40 transition-colors">
                        <td className="p-3 font-medium text-foreground max-w-[180px] truncate">{item.title}</td>
                        <td className="p-3">
                          {item.draft ? (
                            <span className="px-2 py-0.5 text-[10px] font-semibold rounded border bg-amber-500/10 text-amber-500 border-amber-500/20">
                              Draft
                            </span>
                          ) : (
                            <span className="px-2 py-0.5 text-[10px] font-semibold rounded border bg-emerald-500/10 text-emerald-500 border-emerald-500/20">
                              Published
                            </span>
                          )}
                        </td>
                        <td className="p-3 text-muted-foreground">{item.category}</td>
                        <td className="p-3 text-right">
                          <Link
                            href={`/admin/journal/${item.id}`}
                            className="text-xs font-semibold text-accent hover:underline"
                          >
                            Edit
                          </Link>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={4} className="p-4 text-center text-muted-foreground">
                        No posts yet.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Right Column (Col 8-12): Recent Admin Activity Feed */}
          <div className="lg:col-span-5 bg-card border border-border/80 rounded-xl p-5 shadow-2xs space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-foreground">Recent Activity</h3>
                <p className="text-xs text-muted-foreground mt-0.5">Administrative actions log.</p>
              </div>
              <Link href="/admin/activity" className="text-xs font-semibold text-accent hover:underline">
                View logs →
              </Link>
            </div>

            {recentLogs && recentLogs.length > 0 ? (
              <div className="border border-border/70 rounded-lg divide-y divide-border/60">
                {recentLogs.map((log: any) => (
                  <div key={log.id} className="p-3 text-xs space-y-1">
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-semibold text-foreground">{log.action}</span>
                      <span className="text-[10px] font-mono text-muted-foreground">
                        {new Date(log.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                    {log.details ? <p className="text-[11px] text-muted-foreground truncate">{log.details}</p> : null}
                  </div>
                ))}
              </div>
            ) : (
              <p className="p-6 text-center text-xs text-muted-foreground border border-dashed border-border/70 rounded-lg">
                No recent activity recorded.
              </p>
            )}
          </div>
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
        .select('id, title, slug, draft, featured, cover_image, category, tags, published_date, author, updated_at')
        .order('published_date', { ascending: false })
      const fallbackArticles = await getJournalArticles()
      const dbSlugs = new Set((dbData ?? []).map((row) => row.slug))
      const items = [
        ...(dbData ?? []).map((a: any) => ({
          id: a.id,
          title: a.title,
          slug: a.slug,
          draft: a.draft ?? false,
          featured: a.featured ?? false,
          coverImage: a.cover_image,
          category: a.category || 'Technology',
          tags: a.tags || (a.category ? [a.category] : ['Technology']),
          publishedDate: a.published_date || a.updated_at,
          author: a.author || 'Nestor Cyber',
          views: a.views || 0,
        })),
        ...fallbackArticles
          .filter((a) => !dbSlugs.has(a.slug))
          .map((a) => ({
            id: a.slug,
            title: a.title,
            slug: a.slug,
            draft: false,
            featured: a.featured,
            coverImage: a.coverImage,
            category: a.category || 'Technology',
            tags: a.tags || (a.category ? [a.category] : ['Technology']),
            publishedDate: a.publishedDate,
            author: a.author || 'Nestor Cyber',
            views: 3,
          })),
      ]
      return (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">Journal Articles</h1>
              <p className="text-xs sm:text-sm text-muted-foreground mt-1">
                Manage, edit, and publish your journal posts.
              </p>
            </div>
            <Link href="/admin/journal/new">
              <button className="px-4 py-2 text-xs font-extrabold rounded-xl bg-[#0070f3] text-white hover:bg-blue-600 transition-colors shadow-xs">
                + New Article
              </button>
            </Link>
          </div>

          {/* Admin Posts List Cards matching UI screenshot */}
          <div className="space-y-3.5">
            {items.map((row: any) => {
              const isDraft = row.draft
              const title = row.title || '(Untitled)'
              const initial = title.replace(/[^a-zA-Z0-9]/g, '')[0]?.toUpperCase() || 'U'
              const formattedDate = row.publishedDate ? formatDate(row.publishedDate) : 'Aug 13'
              const authorName = row.author || 'Nestor Cyber'
              const tagList = Array.isArray(row.tags) && row.tags.length > 0 ? row.tags : [row.category || 'Technology']

              return (
                <div
                  key={row.id}
                  className="group bg-white dark:bg-card border border-slate-200 dark:border-border/80 rounded-xl p-4 sm:p-5 shadow-2xs hover:shadow-md transition-all duration-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                >
                  {/* Left Side: Thumbnail / Initial Avatar + Title & Meta & Tags */}
                  <div className="flex items-center gap-4 min-w-0">
                    {/* Thumbnail Image or Large Initial Square Box */}
                    {row.coverImage ? (
                      <div className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-xl overflow-hidden bg-slate-100 dark:bg-slate-800 shrink-0 border border-slate-200/80 dark:border-slate-700">
                        <Image src={row.coverImage} alt={title} fill className="object-cover" />
                      </div>
                    ) : (
                      <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl bg-slate-50 dark:bg-slate-800/80 text-slate-400 dark:text-slate-500 font-serif text-3xl font-normal flex items-center justify-center shrink-0 border border-slate-200/80 dark:border-slate-700">
                        {initial}
                      </div>
                    )}

                    {/* Title & Meta Subline (Draft/Published, Date, Tag Pills) */}
                    <div className="min-w-0 space-y-1.5">
                      <Link
                        href={`/admin/journal/${row.id}`}
                        className="text-base sm:text-lg font-bold text-slate-800 dark:text-foreground hover:text-[#0070f3] dark:hover:text-[#0070f3] transition-colors truncate block font-heading"
                      >
                        {title}
                      </Link>

                      <div className="flex flex-wrap items-center gap-2 text-xs">
                        {isDraft ? (
                          <span className="font-bold text-amber-600 dark:text-amber-500">Draft</span>
                        ) : (
                          <span className="font-semibold text-slate-500 dark:text-slate-400">Published</span>
                        )}
                        <span className="text-slate-300 dark:text-slate-600">•</span>
                        <span className="text-slate-500 dark:text-slate-400 font-medium">{formattedDate}</span>

                        {/* Tag Pills */}
                        {tagList.length > 0 && (
                          <div className="flex flex-wrap items-center gap-1.5 ml-1">
                            {tagList.map((tag: string, i: number) => (
                              <span
                                key={i}
                                className="px-2.5 py-0.5 text-[11px] font-medium rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Right Side: Author Avatar & Name + Stat Icons + Edit Button */}
                  <div className="flex items-center justify-between sm:justify-end gap-5 shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-100 dark:border-slate-800">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">{authorName}</span>
                      <div className="w-5 h-5 rounded-full bg-[#0070f3] text-white text-[10px] font-bold flex items-center justify-center shadow-2xs">
                        {authorName[0]?.toUpperCase() || 'N'}
                      </div>
                    </div>

                    <div className="flex items-center gap-3 text-slate-400 dark:text-slate-500 text-xs">
                      <button title="Share" className="hover:text-slate-700 dark:hover:text-slate-200 transition-colors">
                        <Share2 className="w-4 h-4" />
                      </button>
                      <span className="flex items-center gap-1" title="Comments">
                        <MessageSquare className="w-4 h-4" />
                        <span>0</span>
                      </span>
                      <span className="flex items-center gap-1" title="Views">
                        <BarChart2 className="w-4 h-4" />
                        <span>{row.views || 0}</span>
                      </span>
                    </div>

                    <Link
                      href={`/admin/journal/${row.id}`}
                      className="px-3.5 py-1.5 text-xs font-extrabold rounded-lg bg-[#0070f3] text-white hover:bg-blue-600 transition-colors shadow-2xs"
                    >
                      Edit
                    </Link>
                  </div>
                </div>
              )
            })}

            {!items.length ? (
              <div className="p-8 text-center text-xs text-muted-foreground bg-card border border-border/80 rounded-xl">
                No articles published yet.
              </div>
            ) : null}
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
        .select('id, title, slug, draft, featured, cover_image, category, technologies, client')
        .order('sort_order', { ascending: true })
      const fallbackProjects = await getPortfolioProjects()
      const dbSlugs = new Set((dbData ?? []).map((row) => row.slug))
      const items = [
        ...(dbData ?? []).map((p: any) => ({
          id: p.id,
          title: p.title,
          slug: p.slug,
          draft: p.draft ?? false,
          featured: p.featured ?? false,
          coverImage: p.cover_image,
          category: p.category || 'Portfolio',
          tags: p.technologies || (p.category ? [p.category] : ['Project']),
          client: p.client || 'Nestor Cyber',
        })),
        ...fallbackProjects
          .filter((p) => !dbSlugs.has(p.slug))
          .map((p) => ({
            id: p.slug,
            title: p.title,
            slug: p.slug,
            draft: false,
            featured: p.featured,
            coverImage: p.coverImage,
            category: p.category || 'Portfolio',
            tags: p.technologies || (p.category ? [p.category] : ['Project']),
            client: p.client || 'Nestor Cyber',
          })),
      ]
      return (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">Projects & Portfolio</h1>
              <p className="text-xs sm:text-sm text-muted-foreground mt-1">
                Manage, edit, and organize your portfolio deliverables and case studies.
              </p>
            </div>
            <Link href="/admin/portfolio/new">
              <button className="px-4 py-2 text-xs font-extrabold rounded-xl bg-[#0070f3] text-white hover:bg-blue-600 transition-colors shadow-xs">
                + New Project
              </button>
            </Link>
          </div>

          <div className="space-y-3.5">
            {items.map((row: any) => {
              const title = row.title || '(Untitled)'
              const initial = title.replace(/[^a-zA-Z0-9]/g, '')[0]?.toUpperCase() || 'P'
              const tagList = Array.isArray(row.tags) && row.tags.length > 0 ? row.tags : [row.category]

              return (
                <div
                  key={row.id}
                  className="group bg-white dark:bg-card border border-slate-200 dark:border-border/80 rounded-xl p-4 sm:p-5 shadow-2xs hover:shadow-md transition-all duration-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                >
                  <div className="flex items-center gap-4 min-w-0">
                    {row.coverImage ? (
                      <div className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-xl overflow-hidden bg-slate-100 dark:bg-slate-800 shrink-0 border border-slate-200/80 dark:border-slate-700">
                        <Image src={row.coverImage} alt={title} fill className="object-cover" />
                      </div>
                    ) : (
                      <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl bg-slate-50 dark:bg-slate-800/80 text-slate-400 dark:text-slate-500 font-serif text-3xl font-normal flex items-center justify-center shrink-0 border border-slate-200/80 dark:border-slate-700">
                        {initial}
                      </div>
                    )}

                    <div className="min-w-0 space-y-1.5">
                      <Link
                        href={`/admin/portfolio/${row.id}`}
                        className="text-base sm:text-lg font-bold text-slate-800 dark:text-foreground hover:text-[#0070f3] dark:hover:text-[#0070f3] transition-colors truncate block font-heading"
                      >
                        {title}
                      </Link>

                      <div className="flex flex-wrap items-center gap-2 text-xs">
                        {row.draft ? (
                          <span className="font-bold text-amber-600 dark:text-amber-500">Draft</span>
                        ) : (
                          <span className="font-semibold text-slate-500 dark:text-slate-400">Published</span>
                        )}
                        <span className="text-slate-300 dark:text-slate-600">•</span>
                        <span className="text-slate-500 dark:text-slate-400 font-medium font-mono">/{row.slug}</span>

                        {tagList.length > 0 && (
                          <div className="flex flex-wrap items-center gap-1.5 ml-1">
                            {tagList.map((tag: string, i: number) => (
                              <span
                                key={i}
                                className="px-2.5 py-0.5 text-[11px] font-medium rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between sm:justify-end gap-5 shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-100 dark:border-slate-800">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">{row.client}</span>
                      <div className="w-5 h-5 rounded-full bg-[#0070f3] text-white text-[10px] font-bold flex items-center justify-center shadow-2xs">
                        {row.client[0]?.toUpperCase() || 'N'}
                      </div>
                    </div>

                    <Link
                      href={`/admin/portfolio/${row.id}`}
                      className="px-3.5 py-1.5 text-xs font-extrabold rounded-lg bg-[#0070f3] text-white hover:bg-blue-600 transition-colors shadow-2xs"
                    >
                      Edit
                    </Link>
                  </div>
                </div>
              )
            })}

            {!items.length ? (
              <div className="p-8 text-center text-xs text-muted-foreground bg-card border border-border/80 rounded-xl">
                No projects added yet.
              </div>
            ) : null}
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
        .select('id, organization, role, slug, draft, featured, cover_image, tags')
        .order('sort_order', { ascending: true })
      const fallbackEntries = await getCommunityEntries()
      const dbSlugs = new Set((dbData ?? []).map((row) => row.slug))
      const items = [
        ...(dbData ?? []).map((e: any) => ({
          id: e.id,
          title: e.organization,
          subTitle: e.role || 'Community Leader',
          slug: e.slug,
          draft: e.draft ?? false,
          featured: e.featured ?? false,
          coverImage: e.cover_image,
          tags: e.tags || ['Community'],
        })),
        ...fallbackEntries
          .filter((e) => !dbSlugs.has(e.slug))
          .map((e) => ({
            id: e.slug,
            title: e.organization,
            subTitle: e.role || 'Community Leader',
            slug: e.slug,
            draft: false,
            featured: e.featured,
            coverImage: e.coverImage,
            tags: e.tags || ['Community'],
          })),
      ]
      return (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">Community & Advocacy Initiatives</h1>
              <p className="text-xs sm:text-sm text-muted-foreground mt-1">
                Manage, edit, and organize community leadership initiatives, advocacy case studies, and volunteer programs.
              </p>
            </div>
            <Link href="/admin/community/new">
              <button className="px-4 py-2 text-xs font-extrabold rounded-xl bg-[#0070f3] text-white hover:bg-blue-600 transition-colors shadow-xs">
                + New Community Entry
              </button>
            </Link>
          </div>

          <div className="space-y-3.5">
            {items.map((row: any) => {
              const title = row.title || '(Untitled)'
              const initial = title.replace(/[^a-zA-Z0-9]/g, '')[0]?.toUpperCase() || 'C'
              const tagList = Array.isArray(row.tags) && row.tags.length > 0 ? row.tags : ['Community']

              return (
                <div
                  key={row.id}
                  className="group bg-white dark:bg-card border border-slate-200 dark:border-border/80 rounded-xl p-4 sm:p-5 shadow-2xs hover:shadow-md transition-all duration-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                >
                  <div className="flex items-center gap-4 min-w-0">
                    {row.coverImage ? (
                      <div className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-xl overflow-hidden bg-slate-100 dark:bg-slate-800 shrink-0 border border-slate-200/80 dark:border-slate-700">
                        <Image src={row.coverImage} alt={title} fill className="object-cover" />
                      </div>
                    ) : (
                      <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl bg-slate-50 dark:bg-slate-800/80 text-slate-400 dark:text-slate-500 font-serif text-3xl font-normal flex items-center justify-center shrink-0 border border-slate-200/80 dark:border-slate-700">
                        {initial}
                      </div>
                    )}

                    <div className="min-w-0 space-y-1.5">
                      <Link
                        href={`/admin/community/${row.id}`}
                        className="text-base sm:text-lg font-bold text-slate-800 dark:text-foreground hover:text-[#0070f3] dark:hover:text-[#0070f3] transition-colors truncate block font-heading"
                      >
                        {title}
                      </Link>

                      <div className="flex flex-wrap items-center gap-2 text-xs">
                        {row.draft ? (
                          <span className="font-bold text-amber-600 dark:text-amber-500">Draft</span>
                        ) : (
                          <span className="font-semibold text-slate-500 dark:text-slate-400">Published</span>
                        )}
                        <span className="text-slate-300 dark:text-slate-600">•</span>
                        <span className="text-slate-500 dark:text-slate-400 font-medium font-mono">/{row.slug}</span>

                        {tagList.length > 0 && (
                          <div className="flex flex-wrap items-center gap-1.5 ml-1">
                            {tagList.map((tag: string, i: number) => (
                              <span
                                key={i}
                                className="px-2.5 py-0.5 text-[11px] font-medium rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between sm:justify-end gap-5 shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-100 dark:border-slate-800">
                    <span className="text-xs font-medium text-muted-foreground">{row.subTitle}</span>

                    <Link
                      href={`/admin/community/${row.id}`}
                      className="px-3.5 py-1.5 text-xs font-extrabold rounded-lg bg-[#0070f3] text-white hover:bg-blue-600 transition-colors shadow-2xs"
                    >
                      Edit
                    </Link>
                  </div>
                </div>
              )
            })}

            {!items.length ? (
              <div className="p-8 text-center text-xs text-muted-foreground bg-card border border-border/80 rounded-xl">
                No community entries added yet.
              </div>
            ) : null}
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

  // 5. Journey / Career Milestones (Work & Career Roadmap Only)
  if (section === 'journey') {
    if (!actionOrId) {
      const { data: dbData } = await supabase
        .from('journey_items')
        .select('id, title, organization, role, date_label, type')
        .order('sort_order', { ascending: true })
      const fallbackJourney = await getJourneyItems()
      const dbTitles = new Set((dbData ?? []).map((row) => row.title))
      const allItems = [
        ...(dbData ?? []).map((j: any) => ({
          id: j.id,
          title: j.title,
          organization: j.organization,
          dateLabel: j.date_label || '2026',
          type: j.type || 'milestone',
          tags: [j.organization, j.type],
        })),
        ...fallbackJourney
          .filter((j) => !dbTitles.has(j.title))
          .map((j) => ({
            id: j.id,
            title: j.title,
            organization: j.organization,
            dateLabel: j.date,
            type: j.type || 'milestone',
            tags: [j.organization, j.type],
          })),
      ]

      // Strictly Career & Work Roadmap Milestones (excluding volunteer & membership)
      const items = allItems.filter((j) => j.type === 'work' || j.type === 'milestone')

      return (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">Career &amp; Professional Milestones</h1>
              <p className="text-xs sm:text-sm text-muted-foreground mt-1">
                Manage career roadmap entries, engineering positions, and professional milestones.
              </p>
            </div>
            <Link href="/admin/journey/new">
              <button className="px-4 py-2 text-xs font-extrabold rounded-xl bg-[#0070f3] text-white hover:bg-blue-600 transition-colors shadow-xs">
                + New Career Milestone
              </button>
            </Link>
          </div>

          <div className="space-y-3.5">
            {items.map((row: any) => {
              const title = row.title || '(Untitled)'
              const initial = title.replace(/[^a-zA-Z0-9]/g, '')[0]?.toUpperCase() || 'M'
              const rowType = (row.type || 'milestone').toLowerCase()

              return (
                <div
                  key={row.id}
                  className="group bg-white dark:bg-card border border-slate-200 dark:border-border/80 rounded-xl p-4 sm:p-5 shadow-2xs hover:shadow-md transition-all duration-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                >
                  <div className="flex items-center gap-4 min-w-0">
                    <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl bg-slate-50 dark:bg-slate-800/80 text-slate-400 dark:text-slate-500 font-serif text-3xl font-normal flex items-center justify-center shrink-0 border border-slate-200/80 dark:border-slate-700">
                      {initial}
                    </div>

                    <div className="min-w-0 space-y-1.5">
                      <Link
                        href={`/admin/journey/${row.id}`}
                        className="text-base sm:text-lg font-bold text-slate-800 dark:text-foreground hover:text-[#0070f3] dark:hover:text-[#0070f3] transition-colors truncate block font-heading"
                      >
                        {title}
                      </Link>

                      <div className="flex flex-wrap items-center gap-2 text-xs">
                        <span className="font-semibold text-slate-500 dark:text-slate-400">{row.organization}</span>
                        <span className="text-slate-300 dark:text-slate-600">•</span>
                        <span className="text-slate-500 dark:text-slate-400 font-medium">{row.dateLabel}</span>

                        <div className="flex items-center ml-1">
                          {rowType === 'work' && (
                            <span className="px-2.5 py-0.5 text-[11px] font-bold rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20">
                              Professional Work
                            </span>
                          )}
                          {rowType === 'milestone' && (
                            <span className="px-2.5 py-0.5 text-[11px] font-bold rounded-full bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-500/20">
                              Key Milestone
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between sm:justify-end gap-5 shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-100 dark:border-slate-800">
                    <span className="text-xs font-mono uppercase tracking-wider text-muted-foreground">{row.type}</span>

                    <Link
                      href={`/admin/journey/${row.id}`}
                      className="px-3.5 py-1.5 text-xs font-extrabold rounded-lg bg-[#0070f3] text-white hover:bg-blue-600 transition-colors shadow-2xs"
                    >
                      Edit
                    </Link>
                  </div>
                </div>
              )
            })}

            {!items.length ? (
              <div className="p-8 text-center text-xs text-muted-foreground bg-card border border-border/80 rounded-xl">
                No career milestones added yet.
              </div>
            ) : null}
          </div>
        </div>
      )
    }
    if (actionOrId === 'new') {
      return (
        <div>
          <PageHeader title="New Career Milestone" />
          <JourneyForm initial={{ type: 'work' } as any} />
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
        <PageHeader title="Edit Career Milestone" />
        <JourneyForm initial={data} />
      </div>
    )
  }

  // 5b. Professional Memberships & Affiliations
  if (section === 'memberships') {
    if (!actionOrId) {
      const { data: dbData } = await supabase
        .from('journey_items')
        .select('id, title, organization, role, date_label, type, details')
        .eq('type', 'membership')
        .order('sort_order', { ascending: true })
      const fallbackJourney = await getJourneyItems()
      const dbTitles = new Set((dbData ?? []).map((row) => row.title))
      const items = [
        ...(dbData ?? []).map((j: any) => ({
          id: j.id,
          title: j.title,
          organization: j.organization,
          role: j.role || j.title || 'Member',
          dateLabel: j.date_label || '2025 - Present',
          type: 'membership',
          details: j.details || ['Professional Council'],
        })),
        ...fallbackJourney
          .filter((j) => j.type === 'membership' && !dbTitles.has(j.title))
          .map((j) => ({
            id: j.id,
            title: j.title,
            organization: j.organization,
            role: j.role || j.title || 'Member',
            dateLabel: j.date,
            type: 'membership',
            details: j.details || ['Professional Council'],
          })),
      ]

      return (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">Professional Memberships &amp; Affiliations</h1>
              <p className="text-xs sm:text-sm text-muted-foreground mt-1">
                Manage accredited memberships, industry councils, and professional associations contributing to national technology policy and governance.
              </p>
            </div>
            <Link href="/admin/memberships/new">
              <button className="px-4 py-2 text-xs font-extrabold rounded-xl bg-[#0070f3] text-white hover:bg-blue-600 transition-colors shadow-xs">
                + New Membership
              </button>
            </Link>
          </div>

          <div className="space-y-3.5">
            {items.map((row: any) => {
              const orgName = row.organization || row.title || '(Untitled)'
              const initial = orgName.replace(/[^a-zA-Z0-9]/g, '')[0]?.toUpperCase() || 'M'

              return (
                <div
                  key={row.id}
                  className="group bg-white dark:bg-card border border-slate-200 dark:border-border/80 rounded-xl p-4 sm:p-5 shadow-2xs hover:shadow-md transition-all duration-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                >
                  <div className="flex items-center gap-4 min-w-0">
                    <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl bg-[#0B1C2C] text-[#0075ff] font-serif text-2xl font-bold flex items-center justify-center shrink-0 border border-[#0075ff]/30 shadow-xs">
                      {initial}
                    </div>

                    <div className="min-w-0 space-y-1.5">
                      <Link
                        href={`/admin/memberships/${row.id}`}
                        className="text-base sm:text-lg font-bold text-slate-800 dark:text-foreground hover:text-[#0070f3] dark:hover:text-[#0070f3] transition-colors truncate block font-heading"
                      >
                        {orgName}
                      </Link>

                      <div className="flex flex-wrap items-center gap-2 text-xs">
                        <span className="font-semibold text-slate-600 dark:text-slate-300">{row.role}</span>
                        <span className="text-slate-300 dark:text-slate-600">•</span>
                        <span className="text-slate-500 dark:text-slate-400 font-mono">{row.dateLabel}</span>

                        <span className="px-2.5 py-0.5 text-[11px] font-bold rounded-full bg-[#0075ff]/10 text-[#0075ff] border border-[#0075ff]/20 ml-1">
                          Accredited Membership
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between sm:justify-end gap-5 shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-100 dark:border-slate-800">
                    <Link
                      href={`/admin/memberships/${row.id}`}
                      className="px-3.5 py-1.5 text-xs font-extrabold rounded-lg bg-[#0070f3] text-white hover:bg-blue-600 transition-colors shadow-2xs"
                    >
                      Edit
                    </Link>
                  </div>
                </div>
              )
            })}

            {!items.length ? (
              <div className="p-8 text-center text-xs text-muted-foreground bg-card border border-border/80 rounded-xl">
                No memberships added yet.
              </div>
            ) : null}
          </div>
        </div>
      )
    }
    if (actionOrId === 'new') {
      return (
        <div>
          <PageHeader title="New Professional Membership &amp; Affiliation" />
          <JourneyForm initial={{ type: 'membership' } as any} returnTo="/admin/memberships" />
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
          type: 'membership',
          details: fb.details,
          images: fb.images,
          sort_order: 0,
        } as any
      }
    }
    if (!data) notFound()
    return (
      <div>
        <PageHeader title="Edit Professional Membership" />
        <JourneyForm initial={data} returnTo="/admin/memberships" />
      </div>
    )
  }

  // 6. Brand Partners
  if (section === 'brands') {
    if (!actionOrId) {
      const { data: dbData } = await supabase
        .from('brand_partners')
        .select('*')
        .order('sort_order', { ascending: true })
      const fallbackBrands = await getBrandPartners()
      const dbNames = new Set((dbData ?? []).map((row) => row.name))
      const items = [
        ...(dbData ?? []),
        ...fallbackBrands
          .filter((b) => !dbNames.has(b.name))
          .map((b) => ({
            id: b.id,
            name: b.name,
            logo_url: b.logoUrl,
            website_url: b.websiteUrl,
          })),
      ]
      return (
        <div>
          <PageHeader
            title="Brand Partners"
            action={
              <Link href="/admin/brands/new">
                <PrimaryButton type="button">Add brand</PrimaryButton>
              </Link>
            }
          />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((row) => (
              <Link key={row.id} href={`/admin/brands/${row.id}`} className="group border border-border p-4 rounded-lg hover:border-foreground/40 bg-card transition-all flex flex-col justify-between">
                <div className="relative aspect-video w-full overflow-hidden rounded bg-slate-950/80 mb-3 flex items-center justify-center p-4 border border-border/40">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={row.logo_url} alt={row.name} className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform" />
                </div>
                <div className="flex items-center justify-between gap-2">
                  <p className="text-xs font-semibold truncate text-foreground">{row.name}</p>
                  <span className="text-[10px] font-mono text-muted-foreground">Edit</span>
                </div>
              </Link>
            ))}
          </div>
          {!items.length ? <p className="text-sm text-muted-foreground">No brand partners added yet.</p> : null}
        </div>
      )
    }
    if (actionOrId === 'new') {
      return (
        <div>
          <PageHeader title="Add brand partner" />
          <BrandForm />
        </div>
      )
    }
    let data = null
    const { data: dbData } = await supabase.from('brand_partners').select('*').eq('id', actionOrId).maybeSingle()
    data = dbData
    if (!data) {
      const fallbackBrands = await getBrandPartners()
      const fb = fallbackBrands.find((b) => b.id === actionOrId)
      if (fb) {
        data = {
          id: undefined,
          name: fb.name,
          logo_url: fb.logoUrl,
          website_url: fb.websiteUrl,
          sort_order: fb.sortOrder || 0,
        } as any
      }
    }
    if (!data) notFound()
    return (
      <div>
        <PageHeader title="Edit brand partner" />
        <BrandForm initial={data} />
      </div>
    )
  }

  // 6.5 Gallery & Media
  if (section === 'gallery') {
    if (!actionOrId) {
      const items = await getAllMediaImages()

      return (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">Media Library & Photos</h1>
              <p className="text-xs sm:text-sm text-muted-foreground mt-1">
                Centralized photo and video management. Select categories to control where each image appears across the website.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Link
                href="/gallery"
                target="_blank"
                className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded-xl bg-card border border-border/80 text-foreground hover:bg-secondary/60 transition-colors shadow-2xs"
              >
                <span>View Live Gallery</span>
                <ExternalLink className="w-3.5 h-3.5 text-muted-foreground" />
              </Link>
              <Link href="/admin/gallery/new">
                <button className="px-4 py-2 text-xs font-extrabold rounded-xl bg-[#0070f3] text-white hover:bg-blue-600 transition-colors shadow-xs cursor-pointer">
                  + Upload New Photo / Video
                </button>
              </Link>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-4 p-4 rounded-xl bg-card border border-border text-xs text-muted-foreground">
            <div>
              <span className="font-bold text-foreground">{items.length}</span> total moments
            </div>
            <span className="text-border">•</span>
            <div>
              <span className="font-bold text-foreground">{items.filter((i) => isImageInCategory(i.category, 'gallery')).length}</span> in Gallery
            </div>
            <span className="text-border">•</span>
            <div>
              <span className="font-bold text-foreground">{items.filter((i) => isImageInCategory(i.category, 'volunteering')).length}</span> in Volunteering
            </div>
            <span className="text-border">•</span>
            <div>
              <span className="font-bold text-foreground">{items.filter((i) => i.featured).length}</span> featured
            </div>
            <span className="text-border">•</span>
            <span className="text-[11px] text-muted-foreground/80">
              Assigned categories determine where each image appears automatically on the site.
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {items.map((row: any) => {
              const title = row.title || '(Untitled Moment)'
              const hasGallery = isImageInCategory(row.category, 'gallery')
              const hasVolunteering = isImageInCategory(row.category, 'volunteering')

              return (
                <div
                  key={row.id}
                  className="group bg-white dark:bg-card border border-slate-200 dark:border-border/80 rounded-xl overflow-hidden shadow-2xs hover:shadow-md transition-all duration-200 flex flex-col justify-between"
                >
                  <div className="relative aspect-video w-full bg-slate-100 dark:bg-slate-800 overflow-hidden flex items-center justify-center">
                    {row.imageUrl ? (
                      /* eslint-disable-next-line @next/next/no-img-element */
                      <img
                        src={row.imageUrl}
                        alt={title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-slate-400 text-xs">
                        No image
                      </div>
                    )}

                    {row.videoDuration && (
                      <div className="absolute top-2 left-2 z-10 px-2 py-0.5 rounded-full bg-black/70 backdrop-blur-md border border-white/20 text-[10px] font-mono text-white font-semibold flex items-center gap-1">
                        <span>▶</span>
                        <span>{row.videoDuration}</span>
                      </div>
                    )}

                    {row.featured && (
                      <div className="absolute top-2 right-2 z-10 px-2 py-0.5 rounded-full bg-amber-500/90 backdrop-blur-md text-[10px] text-white font-bold uppercase tracking-wider">
                        Featured
                      </div>
                    )}

                    <div className="absolute bottom-2 left-2 z-10 flex flex-wrap gap-1">
                      {hasGallery && (
                        <span className="px-1.5 py-0.5 rounded bg-blue-600/90 backdrop-blur-sm text-[9px] font-mono font-bold text-white shadow-xs">
                          Gallery
                        </span>
                      )}
                      {hasVolunteering && (
                        <span className="px-1.5 py-0.5 rounded bg-emerald-600/90 backdrop-blur-sm text-[9px] font-mono font-bold text-white shadow-xs">
                          Volunteering
                        </span>
                      )}
                      {!hasGallery && !hasVolunteering && row.category && (
                        <span className="px-1.5 py-0.5 rounded bg-black/60 backdrop-blur-sm text-[9px] font-mono font-medium text-white/90">
                          {row.category}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="p-4 space-y-2 flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="font-bold text-sm text-foreground line-clamp-1 group-hover:text-[#0070f3] transition-colors">
                        {title}
                      </h3>
                      {row.caption && (
                        <p className="text-xs text-muted-foreground line-clamp-2 mt-1 font-light">
                          {row.caption}
                        </p>
                      )}
                    </div>

                    <div className="pt-3 border-t border-border/50 flex items-center justify-between text-[11px] text-muted-foreground">
                      <span>{row.location || row.eventDate || 'Gallery moment'}</span>
                      <Link
                        href={`/admin/gallery/${row.id}`}
                        className="px-2.5 py-1 text-xs font-semibold rounded bg-secondary hover:bg-secondary/80 text-foreground transition-colors"
                      >
                        Edit
                      </Link>
                    </div>
                  </div>
                </div>
              )
            })}

            {!items.length ? (
              <div className="col-span-full p-8 text-center text-xs text-muted-foreground bg-card border border-border/80 rounded-xl">
                No gallery moments added yet.
              </div>
            ) : null}
          </div>
        </div>
      )
    }

    if (actionOrId === 'new') {
      return (
        <div>
          <PageHeader title="New gallery moment" />
          <GalleryForm />
        </div>
      )
    }

    let data = null
    const isUuid = Boolean(
      actionOrId &&
      /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/.test(actionOrId)
    )
    if (isUuid) {
      const { data: byId } = await supabase.from('gallery_images').select('*').eq('id', actionOrId).maybeSingle()
      data = byId
    }
    if (!data) {
      const fallbackImages = await getGalleryImages()
      const fb = fallbackImages.find((img) => img.id === actionOrId)
      if (fb) {
        const { data: byUrl } = await supabase.from('gallery_images').select('*').eq('image_url', fb.imageUrl).maybeSingle()
        if (byUrl) {
          data = byUrl
        } else {
          data = {
            id: fb.id,
            title: fb.title,
            caption: fb.caption,
            image_url: fb.imageUrl,
            alt: fb.altText,
            category: fb.category,
            location: fb.location,
            event_date: fb.eventDate,
            external_link: fb.externalLink,
            video_url: fb.videoUrl,
            video_duration: fb.videoDuration,
            width: fb.width,
            height: fb.height,
            featured: fb.featured,
            sort_order: fb.sortOrder,
          } as any
        }
      }
    }

    if (!data) notFound()

    return (
      <div>
        <PageHeader title="Edit gallery moment" />
        <GalleryForm initial={data} />
      </div>
    )
  }

  // 7. Services
  if (section === 'services') {
    if (!actionOrId) {
      const { data: dbData } = await supabase.from('services').select('id, title, slug, description').order('sort_order')
      const items = [
        ...(dbData ?? []).map((s: any) => ({
          id: s.id,
          title: s.title,
          description: s.description || 'Service Offering',
          slug: s.slug || s.id,
        })),
        ...fallbackServices
          .filter((s) => !new Set((dbData ?? []).map((row) => row.title)).has(s.title))
          .map((s) => ({
            id: s.id,
            title: s.title,
            description: s.description || 'Service Offering',
            slug: s.id,
          })),
      ]
      return (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">Services & Offerings</h1>
              <p className="text-xs sm:text-sm text-muted-foreground mt-1">
                Manage, edit, and publish your professional engineering and design services.
              </p>
            </div>
            <Link href="/admin/services/new">
              <button className="px-4 py-2 text-xs font-extrabold rounded-xl bg-[#0070f3] text-white hover:bg-blue-600 transition-colors shadow-xs">
                + New Service
              </button>
            </Link>
          </div>

          <div className="space-y-3.5">
            {items.map((row: any) => {
              const title = row.title || '(Untitled Service)'
              const initial = title.replace(/[^a-zA-Z0-9]/g, '')[0]?.toUpperCase() || 'S'

              return (
                <div
                  key={row.id}
                  className="group bg-white dark:bg-card border border-slate-200 dark:border-border/80 rounded-xl p-4 sm:p-5 shadow-2xs hover:shadow-md transition-all duration-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                >
                  <div className="flex items-center gap-4 min-w-0">
                    <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl bg-slate-50 dark:bg-slate-800/80 text-slate-400 dark:text-slate-500 font-serif text-3xl font-normal flex items-center justify-center shrink-0 border border-slate-200/80 dark:border-slate-700">
                      {initial}
                    </div>

                    <div className="min-w-0 space-y-1">
                      <Link
                        href={`/admin/services/${row.id}`}
                        className="text-base sm:text-lg font-bold text-slate-800 dark:text-foreground hover:text-[#0070f3] dark:hover:text-[#0070f3] transition-colors truncate block font-heading"
                      >
                        {title}
                      </Link>
                      <p className="text-xs text-muted-foreground line-clamp-1">{row.description}</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between sm:justify-end gap-5 shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-100 dark:border-slate-800">
                    <span className="text-xs font-mono text-muted-foreground">/{row.slug}</span>

                    <Link
                      href={`/admin/services/${row.id}`}
                      className="px-3.5 py-1.5 text-xs font-extrabold rounded-lg bg-[#0070f3] text-white hover:bg-blue-600 transition-colors shadow-2xs"
                    >
                      Edit
                    </Link>
                  </div>
                </div>
              )
            })}

            {!items.length ? (
              <div className="p-8 text-center text-xs text-muted-foreground bg-card border border-border/80 rounded-xl">
                No services added yet.
              </div>
            ) : null}
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
    const { data: byId } = await supabase.from('services').select('*').eq('id', actionOrId).maybeSingle()
    data = byId
    if (!data) {
      const { data: bySlug } = await supabase.from('services').select('*').eq('slug', actionOrId).maybeSingle()
      data = bySlug
    }
    if (!data) {
      const fb = fallbackServices.find((s) => s.id === actionOrId || s.title.toLowerCase() === actionOrId.toLowerCase())
      if (fb) {
        data = {
          id: undefined,
          title: fb.title,
          slug: fb.id,
          description: fb.description,
          icon_name: fb.iconName,
          cta_text: fb.ctaText,
          cta_href: fb.ctaHref,
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
        ...(dbData ?? []).map((s: any) => ({
          id: s.id,
          value: s.value,
          label: s.label,
          description: s.description || '',
        })),
        ...fallbackStats
          .filter((s) => !dbLabels.has(s.label))
          .map((s, i) => ({
            id: `stat-${i}`,
            value: s.value,
            label: s.label,
            description: s.description || '',
          })),
      ]
      return (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">Impact & Portfolio Metrics</h1>
              <p className="text-xs sm:text-sm text-muted-foreground mt-1">
                Manage, edit, and display home page impact statistics.
              </p>
            </div>
            <Link href="/admin/stats/new">
              <button className="px-4 py-2 text-xs font-extrabold rounded-xl bg-[#0070f3] text-white hover:bg-blue-600 transition-colors shadow-xs">
                + New Metric
              </button>
            </Link>
          </div>

          <div className="space-y-3.5">
            {items.map((row: any) => {
              const label = row.label || '(Untitled Stat)'
              const initial = row.value || '#'

              return (
                <div
                  key={row.id}
                  className="group bg-white dark:bg-card border border-slate-200 dark:border-border/80 rounded-xl p-4 sm:p-5 shadow-2xs hover:shadow-md transition-all duration-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                >
                  <div className="flex items-center gap-4 min-w-0">
                    <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl bg-slate-50 dark:bg-slate-800/80 text-[#0070f3] font-bold text-xl sm:text-2xl flex items-center justify-center shrink-0 border border-slate-200/80 dark:border-slate-700 font-mono">
                      {initial}
                    </div>

                    <div className="min-w-0 space-y-1">
                      <Link
                        href={`/admin/stats/${row.id}`}
                        className="text-base sm:text-lg font-bold text-slate-800 dark:text-foreground hover:text-[#0070f3] dark:hover:text-[#0070f3] transition-colors truncate block font-heading"
                      >
                        {label}
                      </Link>
                      {row.description ? <p className="text-xs text-muted-foreground line-clamp-1">{row.description}</p> : null}
                    </div>
                  </div>

                  <div className="flex items-center justify-between sm:justify-end gap-5 shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-100 dark:border-slate-800">
                    <span className="text-xs font-mono font-bold text-[#0070f3]">{row.value}</span>

                    <Link
                      href={`/admin/stats/${row.id}`}
                      className="px-3.5 py-1.5 text-xs font-extrabold rounded-lg bg-[#0070f3] text-white hover:bg-blue-600 transition-colors shadow-2xs"
                    >
                      Edit
                    </Link>
                  </div>
                </div>
              )
            })}

            {!items.length ? (
              <div className="p-8 text-center text-xs text-muted-foreground bg-card border border-border/80 rounded-xl">
                No impact stats added yet.
              </div>
            ) : null}
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
      const { data: dbData } = await supabase.from('certifications').select('*').order('sort_order')
      const fallbackCertifications = await getCertifications()
      const dbTitles = new Set((dbData ?? []).map((row) => row.title))
      const items = [
        ...(dbData ?? []).map((c: any) => ({
          id: c.id,
          title: c.title,
          provider: c.provider,
          date: c.date_label || '2026',
          image: c.image_url || c.image || null,
        })),
        ...fallbackCertifications
          .filter((c) => !dbTitles.has(c.title))
          .map((c, i) => ({
            id: `cert-${i}`,
            title: c.title,
            provider: c.provider,
            date: c.date || '2026',
            image: c.image || null,
          })),
      ]
      return (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">Certifications &amp; Diplomas</h1>
              <p className="text-xs sm:text-sm text-muted-foreground mt-1">
                Manage, edit, and display professional credentials and achievements.
              </p>
            </div>
            <Link
              href="/admin/certifications/new"
              className="px-4 py-2 text-xs font-extrabold rounded-xl bg-[#0070f3] text-white hover:bg-blue-600 transition-colors shadow-xs inline-flex items-center"
            >
              + New Certification
            </Link>
          </div>

          <div className="space-y-3.5">
            {items.map((row: any) => {
              const title = row.title || '(Untitled Certification)'
              const initial = title.replace(/[^a-zA-Z0-9]/g, '')[0]?.toUpperCase() || 'C'

              return (
                <div
                  key={row.id}
                  className="group bg-white dark:bg-card border border-slate-200 dark:border-border/80 rounded-xl p-4 sm:p-5 shadow-2xs hover:shadow-md transition-all duration-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                >
                  <div className="flex items-center gap-4 min-w-0">
                    {row.image ? (
                      <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl overflow-hidden shrink-0 border border-slate-200/80 dark:border-slate-700 bg-slate-100 dark:bg-slate-850 relative">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={row.image}
                          alt={title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ) : (
                      <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl bg-slate-50 dark:bg-slate-800/80 text-slate-400 dark:text-slate-500 font-serif text-3xl font-normal flex items-center justify-center shrink-0 border border-slate-200/80 dark:border-slate-700">
                        {initial}
                      </div>
                    )}

                    <div className="min-w-0 space-y-1">
                      <Link
                        href={`/admin/certifications/${row.id}`}
                        className="text-base sm:text-lg font-bold text-slate-800 dark:text-foreground hover:text-[#0070f3] dark:hover:text-[#0070f3] transition-colors truncate block font-heading"
                      >
                        {title}
                      </Link>
                      <p className="text-xs text-muted-foreground">{row.provider} • {row.date}</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between sm:justify-end gap-5 shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-100 dark:border-slate-800">
                    <span className="text-xs font-medium text-slate-600 dark:text-slate-400">{row.provider}</span>

                    <Link
                      href={`/admin/certifications/${row.id}`}
                      className="px-3.5 py-1.5 text-xs font-extrabold rounded-lg bg-[#0070f3] text-white hover:bg-blue-600 transition-colors shadow-2xs inline-flex items-center"
                    >
                      Edit
                    </Link>
                  </div>
                </div>
              )
            })}

            {!items.length ? (
              <div className="p-8 text-center text-xs text-muted-foreground bg-card border border-border/80 rounded-xl">
                No certifications added yet.
              </div>
            ) : null}
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
    const isRealUuid = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/.test(actionOrId)
    if (isRealUuid) {
      const { data: dbData } = await supabase.from('certifications').select('*').eq('id', actionOrId).maybeSingle()
      data = dbData
    } else {
      const { data: dbData } = await supabase.from('certifications').select('*').eq('slug', actionOrId).maybeSingle()
      data = dbData
    }

    if (!data) {
      const fallbackCertifications = await getCertifications()
      const index = parseInt(actionOrId.replace('cert-', ''), 10)
      const fb = fallbackCertifications[index] || fallbackCertifications.find((c) => c.title === actionOrId || c.id === actionOrId)
      if (fb) {
        data = {
          id: undefined,
          title: fb.title,
          provider: fb.provider,
          description: fb.description || '',
          image_url: fb.image || null,
          date_label: fb.date || '',
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
