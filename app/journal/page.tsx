import { Metadata } from "next"
import Footer from "@/components/footer"
import PortfolioCTA from "@/components/portfolio/portfolio-cta"
import { getJournalArticles } from "@/lib/content"
import JournalClient, { JournalArticleItem } from "@/components/journal/journal-client"

export const revalidate = 3600

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
      <main className="min-h-screen bg-background bg-grid-pattern">
        <JournalClient articles={articles} />
      </main>
      <PortfolioCTA
        title="Have a Technical Topic or Case Study to Discuss?"
        description="Interested in collaborating on technical writing, technology policy essays, or engineering thought leadership? Let's connect."
        buttonText="Reach Out"
        buttonHref="/contact"
      />
      <Footer />
    </>
  )
}
