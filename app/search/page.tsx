import { Metadata } from "next"
import Link from "next/link"
import Footer from "@/components/footer"
import SectionContainer from "@/components/shared/section-container"
import { ArrowUpRight, Search, FileText, Briefcase, Zap, Star, BookOpen, Users, History, Award } from "lucide-react"
import { buildSearchIndex, searchInIndex } from "@/lib/search-index"

export const revalidate = 3600

export const metadata: Metadata = {
  title: "Search Results | Nestor Anyanwu (Nestor Cyber)",
  description: "Live search results for articles, projects, skills, services, and community work by Nestor Anyanwu.",
  robots: {
    index: false,
    follow: true,
  },
  alternates: {
    canonical: "/search",
  },
}

const categoryIcons: Record<string, React.ReactNode> = {
  Page: <FileText className="w-4 h-4" />,
  Project: <Briefcase className="w-4 h-4" />,
  Service: <Zap className="w-4 h-4" />,
  Skill: <Star className="w-4 h-4" />,
  Journal: <BookOpen className="w-4 h-4" />,
  Community: <Users className="w-4 h-4" />,
  Experience: <History className="w-4 h-4" />,
  Certification: <Award className="w-4 h-4" />,
}

const categoryColors: Record<string, string> = {
  Page: "bg-[#0056D2]/10 text-[#0056D2] dark:bg-[#0056D2]/25 dark:text-[#F1F5F9] border-[#0056D2]/30",
  Project: "bg-[#0056D2]/10 text-[#0056D2] dark:bg-[#0056D2]/25 dark:text-[#F1F5F9] border-[#0056D2]/30",
  Service: "bg-[#0056D2]/10 text-[#0056D2] dark:bg-[#0056D2]/25 dark:text-[#F1F5F9] border-[#0056D2]/30",
  Skill: "bg-[#0056D2]/10 text-[#0056D2] dark:bg-[#0056D2]/25 dark:text-[#F1F5F9] border-[#0056D2]/30",
  Journal: "bg-[#0056D2]/10 text-[#0056D2] dark:bg-[#0056D2]/25 dark:text-[#F1F5F9] border-[#0056D2]/30",
  Community: "bg-[#0056D2]/10 text-[#0056D2] dark:bg-[#0056D2]/25 dark:text-[#F1F5F9] border-[#0056D2]/30",
  Experience: "bg-[#0056D2]/10 text-[#0056D2] dark:bg-[#0056D2]/25 dark:text-[#F1F5F9] border-[#0056D2]/30",
  Certification: "bg-[#0056D2]/10 text-[#0056D2] dark:bg-[#0056D2]/25 dark:text-[#F1F5F9] border-[#0056D2]/30",
}

interface Props {
  searchParams: Promise<{ q?: string }>
}

export default async function SearchPage({ searchParams }: Props) {
  const { q = "" } = await searchParams
  const query = q.trim()
  const fullIndex = await buildSearchIndex()
  const results = query ? searchInIndex(fullIndex, query) : []

  return (
    <>
      <main className="min-h-screen bg-background text-foreground pt-28 pb-20 bg-grid-pattern">
        <SectionContainer>
          <div className="space-y-8 max-w-5xl mx-auto">
            
            {/* Header */}
            <div className="space-y-3 border-b border-border pb-6">
              <div className="inline-flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-widest text-[#0056D2] dark:text-[#F1F5F9] px-3 py-1 rounded-2xl border border-[#0056D2]/40 bg-[#0056D2]/10 dark:bg-[#0056D2]/25">
                <Search className="w-3.5 h-3.5" />
                <span>LIVE SEARCH RESULTS</span>
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-foreground tracking-tight font-heading">
                {query ? `Results for "${query}"` : "Search Site"}
              </h1>
              <p className="text-sm text-muted-foreground font-mono">
                Found {results.length} matching {results.length === 1 ? "entry" : "entries"} across portfolio, journal, skills &amp; community.
              </p>
            </div>

            {/* Live Results Grid */}
            {results.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {results.map((item) => (
                  <Link
                    key={item.id}
                    href={item.href}
                    className="group border border-border bg-card rounded-2xl p-5 flex flex-col justify-between space-y-4 transition-all shadow-sm hover:shadow-lg hover:border-[#0056D2] hover:-translate-y-1 cursor-pointer"
                  >
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span
                          className={`inline-flex items-center gap-1.5 text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-1 rounded-2xl border ${
                            categoryColors[item.category] || "bg-secondary text-muted-foreground border-border"
                          }`}
                        >
                          {categoryIcons[item.category]}
                          <span>{item.category}</span>
                        </span>
                      </div>

                      <h2 className="text-lg font-extrabold text-foreground group-hover:text-accent transition-colors leading-snug font-heading">
                        {item.title}
                      </h2>

                      <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed font-light line-clamp-2">
                        {item.description}
                      </p>
                    </div>

                    <div className="pt-2 border-t border-border/40 flex items-center justify-between text-xs font-bold uppercase tracking-wider text-foreground group-hover:text-accent transition-colors">
                      <span>View Details</span>
                      <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="py-20 border-2 border-dashed border-border text-center space-y-4 bg-card rounded-2xl max-w-xl mx-auto p-8">
                <Search className="w-10 h-10 text-muted-foreground/40 mx-auto" />
                <h2 className="text-xl font-bold text-foreground">No matches found</h2>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  We couldn&apos;t find any content matching &quot;<span className="text-[#0056D2] font-medium">{query}</span>&quot;. Try searching for terms like &quot;Portfolio&quot;, &quot;Next.js&quot;, &quot;GDG&quot;, &quot;Design&quot;, or &quot;Journal&quot;.
                </p>
                <div className="pt-2">
                  <Link
                    href="/"
                    className="inline-block text-xs font-mono font-bold uppercase tracking-widest bg-[#0056D2] text-white px-5 py-2.5 rounded-2xl hover:bg-[#0044a8] transition-colors"
                  >
                    Back to Home
                  </Link>
                </div>
              </div>
            )}

          </div>
        </SectionContainer>
      </main>
      <Footer />
    </>
  )
}
