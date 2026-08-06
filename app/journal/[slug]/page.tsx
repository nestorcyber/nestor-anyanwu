import Link from 'next/link'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { getJournalArticleBySlug, getJournalArticles } from '@/lib/content'
import { Markdown } from '@/lib/content/markdown'
import Footer from '@/components/footer'
import SectionContainer from '@/components/shared/section-container'
import { ArrowLeft, Calendar, User, Clock, ArrowUpRight, Share2 } from 'lucide-react'
import type { Metadata } from 'next'

interface Props {
  params: Promise<{ slug: string }>
}

export const dynamic = "force-dynamic"
export const revalidate = 0

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

  const baseUrl = 'https://nestor.name.ng'
  const articleUrl = `${baseUrl}/journal/${article.slug}`

  return {
    title: `${article.seoTitle || article.title} | Nestor Cyber Journal`,
    description: article.seoDescription || article.excerpt,
    alternates: {
      canonical: articleUrl,
    },
    openGraph: {
      title: article.title,
      description: article.excerpt,
      url: articleUrl,
      type: 'article',
      publishedTime: article.publishedDate,
      authors: [article.author || 'Nestor Anyanwu'],
      images: article.coverImage ? [{ url: article.coverImage }] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title: article.title,
      description: article.excerpt,
      images: article.coverImage ? [article.coverImage] : [],
    },
  }
}

export default async function JournalDetailPage({ params }: Props) {
  const { slug } = await params
  const article = await getJournalArticleBySlug(slug)
  const allArticles = await getJournalArticles()

  if (!article) {
    notFound()
  }

  // Calculate article index for next / previous pagination
  const currentIndex = allArticles.findIndex((a) => a.slug === slug)
  const prevArticle = currentIndex > 0 ? allArticles[currentIndex - 1] : null
  const nextArticle = currentIndex < allArticles.length - 1 ? allArticles[currentIndex + 1] : null

  // Calculate related articles matching category or tags
  const relatedArticles = allArticles
    .filter((a) => a.slug !== slug && (a.category === article.category || a.tags.some((t) => article.tags.includes(t))))
    .slice(0, 3)

  const articleUrl = `https://nestor.name.ng/journal/${article.slug}`

  // JSON-LD Structured Data for Article
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: article.title,
    description: article.excerpt,
    image: article.coverImage || 'https://nestor.name.ng/og-image.png',
    datePublished: article.publishedDate,
    author: {
      '@type': 'Person',
      name: article.author || 'Nestor Anyanwu',
      url: 'https://nestor.name.ng',
    },
    publisher: {
      '@type': 'Person',
      name: 'Nestor Anyanwu',
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': articleUrl,
    },
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main className="min-h-screen bg-background text-foreground pt-24 pb-20">
        <SectionContainer>
          {/* Back Navigation Link */}
          <Link
            href="/journal"
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-muted-foreground hover:text-accent mb-8 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Journal</span>
          </Link>

          {/* Article Header */}
          <header className="space-y-6 max-w-3xl mb-10">
            <div className="flex flex-wrap items-center gap-3">
              {article.featured && (
                <span className="text-[10px] font-mono text-accent uppercase tracking-wider px-2 py-0.5 border border-accent/40">
                  FEATURED
                </span>
              )}
            </div>

            <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-foreground leading-tight uppercase">
              {article.title}
            </h1>

            <p className="text-base md:text-xl text-muted-foreground font-light leading-relaxed">
              {article.excerpt}
            </p>

            <div className="flex flex-wrap items-center gap-6 pt-4 border-t border-border/40 text-xs text-muted-foreground font-mono">
              <span className="flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-accent" />
                {article.author || 'Nestor Anyanwu'}
              </span>
              <span className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-accent" />
                {new Date(article.publishedDate).toLocaleDateString('en-US', {
                  month: 'long',
                  day: 'numeric',
                  year: 'numeric',
                })}
              </span>
            </div>
          </header>

          {/* Hero Cover Image */}
          {article.coverImage && (
            <div className="relative w-full h-[320px] md:h-[500px] mb-12 overflow-hidden border border-border/60 rounded">
              <Image
                src={article.coverImage}
                alt={article.title}
                fill
                className="object-cover"
                priority
              />
            </div>
          )}

          {/* Article Body Content */}
          <div className="max-w-3xl mx-auto space-y-12">
            <article className="text-foreground/90 text-base md:text-lg leading-relaxed font-light">
              <Markdown content={article.content} />
            </article>

            {/* Previous / Next Article Navigation */}
            <div className="pt-8 border-t border-border/60 grid grid-cols-1 md:grid-cols-2 gap-4">
              {prevArticle ? (
                <Link
                  href={`/journal/${prevArticle.slug}`}
                  className="p-4 border border-border/60 hover:border-accent bg-card/40 rounded transition-all space-y-1 group"
                >
                  <span className="text-[10px] font-mono text-muted-foreground uppercase flex items-center gap-1">
                    <ArrowLeft className="w-3 h-3" /> PREVIOUS ARTICLE
                  </span>
                  <p className="text-sm font-bold text-foreground group-hover:text-accent transition-colors line-clamp-1">
                    {prevArticle.title}
                  </p>
                </Link>
              ) : (
                <div />
              )}

              {nextArticle && (
                <Link
                  href={`/journal/${nextArticle.slug}`}
                  className="p-4 border border-border/60 hover:border-accent bg-card/40 rounded transition-all space-y-1 text-right group"
                >
                  <span className="text-[10px] font-mono text-muted-foreground uppercase flex items-center justify-end gap-1">
                    NEXT ARTICLE <ArrowUpRight className="w-3 h-3" />
                  </span>
                  <p className="text-sm font-bold text-foreground group-hover:text-accent transition-colors line-clamp-1">
                    {nextArticle.title}
                  </p>
                </Link>
              )}
            </div>

            {/* Related Articles */}
            {relatedArticles.length > 0 && (
              <div className="pt-12 border-t border-border/60 space-y-6">
                <h3 className="text-xs font-bold uppercase tracking-widest text-foreground">
                  Related Articles
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {relatedArticles.map((rel) => (
                    <Link
                      key={rel.slug}
                      href={`/journal/${rel.slug}`}
                      className="p-5 border border-border/60 hover:border-accent bg-card/40 rounded space-y-2 group transition-all"
                    >
                      <span className="text-[9px] font-mono text-accent uppercase">
                        {rel.category}
                      </span>
                      <h4 className="text-sm font-bold text-foreground group-hover:text-accent transition-colors line-clamp-2">
                        {rel.title}
                      </h4>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </SectionContainer>
        <Footer />
      </main>
    </>
  )
}
