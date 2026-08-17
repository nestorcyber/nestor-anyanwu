import Link from 'next/link'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { getJournalArticleBySlug, getJournalArticles } from '@/lib/content'
import { Markdown } from '@/lib/content/markdown'
import Footer from '@/components/footer'
import { Calendar, User, ArrowUpRight } from 'lucide-react'
import type { Metadata } from 'next'

interface Props {
  params: Promise<{ slug: string }>
}

export const revalidate = 60

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
      <main className="min-h-screen bg-background text-foreground pt-14 md:pt-16 pb-16 md:pb-24">
        <div className="max-w-7xl mx-auto px-4 md:px-8 pt-2 sm:pt-4">
          {/* Article Header (Full Width) */}
          <header className="space-y-4 w-full mb-8 sm:mb-10">
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-foreground leading-tight">
              {article.title}
            </h1>

            <p className="text-base md:text-xl text-muted-foreground font-light leading-relaxed max-w-5xl">
              {article.excerpt}
            </p>

            <div className="flex flex-wrap items-center gap-6 pt-4 border-t border-border/40 text-xs text-muted-foreground font-mono">
              <span className="flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-[#0075ff]" />
                {article.author || 'Nestor Anyanwu'}
              </span>
              <span className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-[#0075ff]" />
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
            <div className="relative w-full h-[320px] md:h-[500px] mb-12 sm:mb-16 overflow-hidden border-2 border-slate-900/30 dark:border-slate-800 rounded-2xl shadow-[4px_4px_0px_0px_rgba(15,23,42,0.9)] dark:shadow-[4px_4px_0px_0px_rgba(0,0,0,0.95)]">
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
          <div className="max-w-3xl mx-auto mb-16 md:mb-24">
            <article className="text-foreground/90 text-base md:text-lg leading-relaxed font-light space-y-6">
              <Markdown content={article.content} />
            </article>
          </div>

          {/* Related Articles (Full-Width Responsive Grid with Balanced Padding) */}
          {relatedArticles.length > 0 && (
            <div className="w-full pt-10 border-t-2 border-slate-900/20 dark:border-slate-800 space-y-6 mb-12 md:mb-20">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-extrabold text-foreground font-heading">
                  Related Articles
                </h3>
                <Link
                  href="/journal"
                  className="text-xs font-mono font-bold text-[#0075ff] hover:underline uppercase tracking-wider flex items-center gap-1"
                >
                  <span>All Articles</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
                {relatedArticles.map((rel) => (
                  <Link
                    key={rel.slug}
                    href={`/journal/${rel.slug}`}
                    className="group relative w-full h-[190px] sm:h-[210px] rounded-2xl overflow-hidden border-2 border-slate-900/30 dark:border-slate-800 bg-slate-900 shadow-[4px_4px_0px_0px_rgba(15,23,42,0.9)] dark:shadow-[4px_4px_0px_0px_rgba(0,0,0,0.95)] hover:border-[#0075ff] flex flex-col justify-end p-5 transition-all cursor-pointer"
                  >
                    {rel.coverImage ? (
                      <Image
                        src={rel.coverImage}
                        alt={rel.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500 brightness-90"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-indigo-600 to-sky-500 flex items-center justify-center" />
                    )}

                    <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/60 to-transparent z-0" />

                    <div className="relative z-10 flex items-end justify-between gap-3">
                      <div className="space-y-1 flex-1 min-w-0">
                        <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-300 block">
                          {rel.publishedDate}
                        </span>
                        <h4 className="text-sm sm:text-base font-extrabold text-white leading-snug group-hover:text-[#0075ff] transition-colors line-clamp-2 font-heading">
                          {rel.title}
                        </h4>
                      </div>

                      <div className="w-8 h-8 rounded-xl bg-white/20 backdrop-blur-md border-2 border-white/40 flex items-center justify-center text-white group-hover:bg-[#0075ff] transition-all shrink-0">
                        <ArrowUpRight className="w-4 h-4" />
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
        <Footer />
      </main>
    </>
  )
}
