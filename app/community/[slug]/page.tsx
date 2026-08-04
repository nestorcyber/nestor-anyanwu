import Link from 'next/link'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { getCommunityEntryBySlug, getCommunityEntries } from '@/lib/keystatic'
import Footer from '@/components/footer'
import SectionContainer from '@/components/shared/section-container'
import { ArrowLeft, Users, Calendar, Award, CheckCircle2 } from 'lucide-react'
import type { Metadata } from 'next'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const entries = await getCommunityEntries()
  return entries.map((entry) => ({
    slug: entry.slug,
  }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const entry = await getCommunityEntryBySlug(slug)
  if (!entry) return { title: 'Community Entry Not Found' }

  return {
    title: `${entry.organization} | Nestor Cyber Community`,
    description: `${entry.role} — ${entry.duration}`,
    openGraph: {
      title: entry.organization,
      description: `${entry.role} — ${entry.duration}`,
      images: [entry.coverImage],
    },
  }
}

export default async function CommunityDetailPage({ params }: Props) {
  const { slug } = await params
  const entry = await getCommunityEntryBySlug(slug)

  if (!entry) {
    notFound()
  }

  return (
    <main className="min-h-screen bg-background text-foreground pt-8 pb-20">
      <SectionContainer>
        {/* Back Link */}
        <Link
          href="/community"
          className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-muted-foreground hover:text-accent mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Community</span>
        </Link>

        {/* Header */}
        <div className="space-y-4 max-w-4xl mb-12">
          <div className="flex flex-wrap items-center gap-3">
            <span className="text-xs font-bold uppercase tracking-widest px-3 py-1 bg-indigo-500/15 text-indigo-600 dark:text-indigo-400 border border-indigo-500/30">
              Community Leadership
            </span>
            <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-accent" />
              {entry.duration}
            </span>
          </div>
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-foreground">
            {entry.organization}
          </h1>
          <p className="text-base md:text-xl text-accent font-semibold">
            {entry.role}
          </p>
        </div>

        {/* Cover */}
        <div className="relative w-full h-[320px] md:h-[480px] mb-12 overflow-hidden border border-border">
          <Image
            src={entry.coverImage}
            alt={entry.organization}
            fill
            className="object-cover"
            priority
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Main Description */}
          <div className="lg:col-span-8 space-y-6">
            <h2 className="text-xl font-bold uppercase tracking-wide text-foreground border-b border-border/40 pb-3">
              Overview & Leadership Story
            </h2>
            <div className="prose dark:prose-invert max-w-none text-muted-foreground space-y-4 text-base">
              {entry.description}
            </div>

            {/* Achievements */}
            {entry.achievements.length > 0 && (
              <div className="pt-6 space-y-4">
                <h3 className="text-sm font-bold uppercase tracking-widest text-foreground flex items-center gap-2">
                  <Award className="w-4 h-4 text-accent" />
                  Key Achievements & Impact
                </h3>
                <div className="space-y-2.5">
                  {entry.achievements.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-3 p-3 border border-border/40 bg-card/30">
                      <CheckCircle2 className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-foreground font-medium">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Stats Sidebar */}
          {entry.impactStats.length > 0 && (
            <aside className="lg:col-span-4 space-y-6 p-6 border border-border bg-card/40">
              <h3 className="text-xs font-bold uppercase tracking-widest text-foreground border-b border-border/40 pb-3 flex items-center gap-2">
                <Users className="w-4 h-4 text-accent" />
                Impact Metrics
              </h3>
              <div className="space-y-4">
                {entry.impactStats.map((stat, idx) => (
                  <div key={idx} className="space-y-1">
                    <div className="text-3xl font-black text-accent">{stat.value}</div>
                    <div className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </aside>
          )}
        </div>
      </SectionContainer>
      <Footer />
    </main>
  )
}
