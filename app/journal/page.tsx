import Footer from "@/components/footer"
import { Metadata } from "next"
import { ArrowUpRight } from "lucide-react"

export const metadata: Metadata = {
  title: "Journal & Writing | Nestor Anyanwu (Nestor Cyber)",
  description: "Read articles, thoughts, and technical notes by Nestor Anyanwu on software engineering, technology leadership, and community development.",
  alternates: {
    canonical: "/journal",
  },
  openGraph: {
    title: "Journal & Writing | Nestor Anyanwu (Nestor Cyber)",
    description: "Read articles, thoughts, and technical notes by Nestor Anyanwu on software engineering, technology leadership, and community development.",
    url: "/journal",
  },
}

export const sampleArticles = [
  {
    id: 1,
    title: "Building Resilient Tech Communities in Higher Institutions",
    category: "COMMUNITY LEADERSHIP",
    readTime: "5 MIN READ",
    date: "JAN 2026",
    summary: "Key lessons from leading NACOS FUTO and NACOS National ICT initiatives in empowering thousands of computing students across Nigeria.",
  },
  {
    id: 2,
    title: "The Intersection of Financial Literacy & Software Development",
    category: "FINTECH & TECH",
    readTime: "4 MIN READ",
    date: "DEC 2025",
    summary: "How campus advocacy with Cowrywise highlights the importance of combining modern software products with practical financial education.",
  },
  {
    id: 3,
    title: "Designing for DevFest: Visual Systems for Major Developer Events",
    category: "VISUAL DESIGN",
    readTime: "6 MIN READ",
    date: "NOV 2025",
    summary: "A deep dive into creating cohesive branding, visual assets, and event logistics for South-East Nigeria's largest developer conference.",
  },
]

export default function JournalPage() {
  return (
    <>
      <main className="min-h-screen bg-background pt-24 pb-20 bg-grid-pattern">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          {/* Header */}
          <div className="mb-16 border-b border-border/60 pb-8">
            <p className="text-accent text-xs md:text-sm font-bold tracking-widest mb-3 uppercase">
              INSIGHTS & ESSAYS
            </p>
            <h1 className="text-4xl md:text-6xl font-extrabold text-foreground tracking-tight mb-6 uppercase">
              Journal & Notes
            </h1>
            <p className="text-base md:text-lg text-muted-foreground font-light max-w-2xl leading-relaxed">
              Perspectives, case studies, and essays on technology leadership, software engineering, and ecosystem building.
            </p>
          </div>

          {/* Articles List */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {sampleArticles.map((article) => (
              <article
                key={article.id}
                className="p-8 border border-border/60 hover:border-accent bg-card/60 rounded grid-cell-card flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between border-b border-border/30 pb-3">
                    <span className="text-[10px] font-mono text-accent uppercase tracking-wider">
                      {article.category}
                    </span>
                    <span className="text-[10px] font-mono text-muted-foreground uppercase">
                      {article.readTime}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-foreground tracking-tight leading-snug uppercase">
                    {article.title}
                  </h3>

                  <p className="text-xs text-muted-foreground leading-relaxed font-light">
                    {article.summary}
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-border/40 flex items-center justify-between">
                  <span className="text-[10px] font-mono text-muted-foreground uppercase">
                    {article.date}
                  </span>
                  <span className="inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-foreground hover:text-accent transition-colors cursor-pointer">
                    Read Article <ArrowUpRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
