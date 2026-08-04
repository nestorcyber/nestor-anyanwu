import Link from 'next/link'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { getJournalArticleBySlug, getJournalArticles } from '@/lib/keystatic'
import Footer from '@/components/footer'
import SectionContainer from '@/components/shared/section-container'
import { ArrowLeft, Calendar, User, Tag, Clock } from 'lucide-react'
import type { Metadata } from 'next'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const articles = await getJournalArticles()
  return articles.map((article) => ({
    slug: article.slug,
  }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const article = await getJournalArticleBySlug(slug)
  if (!article) return { title: 'Article Not Found' }

  return {
    title: `${article.seoTitle || article.title} | Nestor Cyber Journal`,
    description: article.seoDescription || article.excerpt,
    openGraph: {
      title: article.title,
      description: article.excerpt,
      images: [article.coverImage],
    },
  }
}

export default async function JournalDetailPage({ params }: Props) {
  const { slug } = await params
  const article = await getJournalArticleBySlug(slug)

  if (!article) {
    notFound()
  }

  return (
    <main className="min-h-screen bg-background text-foreground pt-8 pb-20">
      <SectionContainer>
        {/* Back Link */}
        <Link
          href="/journal"
          className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-muted-foreground hover:text-accent mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Journal</span>
        </Link>

        {/* Header */}
        <div className="space-y-4 max-w-3xl mb-10">
          <span className="text-xs font-bold uppercase tracking-widest px-3 py-1 bg-accent/15 text-accent border border-accent/30 inline-block">
            {article.category}
          </span>
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-foreground leading-tight">
            {article.title}
          </h1>
          <p className="text-base md:text-lg text-muted-foreground font-light leading-relaxed">
            {article.excerpt}
          </p>

          <div className="flex flex-wrap items-center gap-6 pt-2 text-xs text-muted-foreground font-mono">
            <span className="flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-accent" />
              {article.author}
            </span>
            <span className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-accent" />
              {article.publishedDate}
            </span>
          </div>
        </div>

        {/* Cover Image */}
        <div className="relative w-full h-[320px] md:h-[450px] mb-12 overflow-hidden border border-border">
          <Image
            src={article.coverImage}
            alt={article.title}
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Article Body */}
        <div className="max-w-3xl mx-auto space-y-8">
          <article className="prose dark:prose-invert max-w-none text-foreground/90 space-y-4 text-base md:text-lg leading-relaxed font-light">
            {article.content}
          </article>

          {/* Tags */}
          {article.tags.length > 0 && (
            <div className="pt-8 border-t border-border/40 flex flex-wrap items-center gap-2">
              <Tag className="w-3.5 h-3.5 text-muted-foreground" />
              {article.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs font-mono px-2.5 py-1 border border-border bg-card text-muted-foreground"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </SectionContainer>
      <Footer />
    </main>
  )
}
