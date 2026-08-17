import { Metadata } from "next"
import Link from "next/link"
import ProjectLibrary from "@/components/portfolio/project-library"
import Footer from "@/components/footer"
import PortfolioCTA from "@/components/portfolio/portfolio-cta"
import { getProjectItems } from "@/lib/content"
import { ArrowLeft, FolderKanban } from "lucide-react"

export const revalidate = 60

export const metadata: Metadata = {
  title: "Projects & Deliverables | Nestor Anyanwu (Nestor Cyber)",
  description: "Explore all production software projects, web applications, engineering deliverables, and design systems built by Nestor Anyanwu.",
  alternates: {
    canonical: "/projects",
  },
  openGraph: {
    title: "Projects & Deliverables | Nestor Anyanwu (Nestor Cyber)",
    description: "Explore all production software projects, web applications, engineering deliverables, and design systems built by Nestor Anyanwu.",
    url: "/projects",
  },
  twitter: {
    title: "Projects & Deliverables | Nestor Anyanwu (Nestor Cyber)",
    description: "Explore all production software projects, web applications, engineering deliverables, and design systems built by Nestor Anyanwu.",
  },
}

export default async function ProjectsPage() {
  const projects = await getProjectItems()

  return (
    <div className="min-h-screen bg-background flex flex-col w-full">
      {/* Main Full-Width Content Column */}
      <main className="flex-1 w-full min-w-0 flex flex-col justify-between overflow-x-hidden">
        <div>
          {/* Top Breadcrumb & Page Banner */}
          <div className="w-full bg-card/60 border-b border-border/70 py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto space-y-4">
              <Link
                href="/portfolio"
                className="inline-flex items-center gap-2 text-xs font-mono font-bold text-accent hover:underline uppercase tracking-wider"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back to Main Portfolio</span>
              </Link>

              <div className="flex items-center gap-3 pt-2">
                <div className="w-10 h-10 rounded-2xl bg-accent/10 text-accent flex items-center justify-center font-bold">
                  <FolderKanban className="w-5 h-5" />
                </div>
                <div>
                  <h1 className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight font-heading">
                    All Projects & Deliverables
                  </h1>
                  <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">
                    Complete production index of web apps, software infrastructure, brand systems, and engineering deliverables.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Project Library Filterable Grid */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <ProjectLibrary projects={projects} />
          </div>

          <PortfolioCTA />
        </div>

        {/* Global Footer */}
        <Footer />
      </main>
    </div>
  )
}
