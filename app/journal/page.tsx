import { Metadata } from "next"
import Footer from "@/components/footer"
import { getJournalArticles } from "@/lib/content"
import JournalClient, { JournalArticleItem } from "@/components/journal/journal-client"

export const dynamic = "force-dynamic"
export const revalidate = 0

export const metadata: Metadata = {
  title: "Journal & Writing | Nestor Anyanwu (Nestor Cyber)",
  description:
    "Read articles, thoughts, case studies, and technical notes by Nestor Anyanwu on software engineering, technology leadership, design systems, and community development.",
  alternates: {
    canonical: "/journal",
  },
  openGraph: {
    title: "Journal & Writing | Nestor Anyanwu (Nestor Cyber)",
    description:
      "Read articles, thoughts, case studies, and technical notes by Nestor Anyanwu on software engineering, technology leadership, design systems, and community development.",
    url: "/journal",
  },
}

export default async function JournalPage() {
  const articlesData = await getJournalArticles()

  // Format articles for client component
  const articles: JournalArticleItem[] = articlesData.map((a) => ({
    slug: a.slug,
    title: a.title,
    excerpt: a.excerpt,
    coverImage: a.coverImage || "",
    category: a.category || "Technology",
    tags: a.tags || [],
    featured: a.featured || false,
    pinned: a.pinned || false,
    publishedDate: a.publishedDate || "2026-01-15",
    author: a.author || "Nestor Anyanwu",
  }))

  return (
    <>
      <main className="min-h-screen bg-background pb-16 bg-grid-pattern">
        <JournalClient articles={articles} />
      </main>
      <Footer />
    </>
  )
}
