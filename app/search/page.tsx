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
  Page: "bg-blue-500/15 text-blue-600 dark:text-blue-400 border-blue-500/30",
  Project: "bg-purple-500/15 text-purple-600 dark:text-purple-400 border-purple-500/30",
  Service: "bg-amber-500/15 text-amber-600 dark:text-amber-400 border-amber-500/30",
  Skill: "bg-green-500/15 text-green-600 dark:text-green-400 border-green-500/30",
  Journal: "bg-rose-500/15 text-rose-600 dark:text-rose-400 border-rose-500/30",
  Community: "bg-indigo-500/15 text-indigo-600 dark:text-indigo-400 border-indigo-500/30",
  Experience: "bg-cyan-500/15 text-cyan-600 dark:text-cyan-400 border-cyan-500/30",
  Certification: "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border-emerald-500/30",
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
            <div className="space-y-3 border-b-2 border-slate-900/20 dark:border-slate-800 pb-6">
              <div className="inline-flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-widest text-accent px-3 py-1 border border-accent/40 bg-accent/10">
                <Search className="w-3.5 h-3.5" />
                <span>LIVE SEARCH RESULTS</span>
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-foreground tracking-tight font-heading">
                {query ? `Results for "${query}"` : "Search Site"}
              </h1>
              <p className="text-sm text-muted-foreground font-mono">
                Found {results.length} matching {results.length === 1 ? "entry" : "entries"} across portfolio, journal, skills & community.
              </p>
            </div>

            {/* Live Results Grid */}
            {results.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {results.map((item) => (
                  <Link
                    key={item.id}
                    href={item.href}
                    className="group border-2 border-slate-900/20 dark:border-slate-800 bg-card rounded-lg p-5 flex flex-col justify-between space-y-4 transition-all shadow-[3px_3px_0px_0px_rgba(15,23,42,0.85)] dark:shadow-[3px_3px_0px_0px_rgba(0,0,0,0.8)] hover:border-accent hover:-translate-y-1 cursor-pointer"
                  >
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span
                          className={`inline-flex items-center gap-1.5 text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-1 rounded-md border ${
                            categoryColors[item.category] || "bg-muted text-muted-foreground"
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
              <div className="py-20 border-2 border-dashed border-slate-900/20 dark:border-slate-800 text-center space-y-4 bg-card rounded-lg max-w-xl mx-auto p-8">
                <Search className="w-10 h-10 text-muted-foreground/30 mx-auto" />
                <h2 className="text-xl font-bold text-foreground">No matches found</h2>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  We couldn&apos;t find any content matching &quot;<span className="text-accent font-medium">{query}</span>&quot;. Try searching for terms like &quot;Portfolio&quot;, &quot;Next.js&quot;, &quot;GDG&quot;, &quot;Design&quot;, or &quot;Journal&quot;.
                </p>
                <div className="pt-2">
                  <Link
                    href="/"
                    className="inline-block text-xs font-mono font-bold uppercase tracking-widest bg-slate-900 text-white dark:bg-white dark:text-slate-950 px-5 py-2.5 rounded-md hover:bg-accent transition-colors"
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
