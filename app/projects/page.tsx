import { Metadata } from 'next'
import Link from 'next/link'
import Footer from '@/components/footer'
import SectionContainer from '@/components/shared/section-container'
import { ExternalLink, ArrowRight, FolderKanban, Code2, Sparkles } from 'lucide-react'
import { getPortfolioProjects } from '@/lib/content'

export const revalidate = 60

export const metadata: Metadata = {
  title: 'Projects & Deliverables | Nestor Anyanwu (Nestor Cyber)',
  description:
    'Explore featured technical projects, production software deliverables, design systems, and open-source initiatives by Nestor Anyanwu.',
  alternates: {
    canonical: '/projects',
  },
  openGraph: {
    title: 'Projects & Deliverables | Nestor Anyanwu (Nestor Cyber)',
    description:
      'Explore featured technical projects, production software deliverables, design systems, and open-source initiatives by Nestor Anyanwu.',
    url: '/projects',
  },
}

export default async function ProjectsPage() {
  const projects = await getPortfolioProjects()

  return (
    <main className="min-h-screen bg-background text-foreground pt-8 pb-20">
      <SectionContainer>
        {/* Header Title Section */}
        <div className="max-w-3xl mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#0070f3]/10 text-[#0070f3] border border-[#0070f3]/30 text-xs font-bold uppercase tracking-widest rounded-full">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Engineering & Design Deliverables</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-foreground">
            Featured Projects & Case Studies
          </h1>
          <p className="text-base sm:text-lg text-muted-foreground font-light leading-relaxed">
            A comprehensive showcase of production software, user interfaces, scalable platforms, and technical architecture built by Nestor Anyanwu.
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {projects.map((project) => (
            <div
              key={project.id}
              className="group flex flex-col justify-between p-6 sm:p-8 rounded-2xl border border-border/80 bg-card hover:border-[#0070f3]/50 transition-all duration-300 shadow-2xs hover:shadow-md"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between gap-3">
                  <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#0070f3] px-2.5 py-0.5 rounded border border-[#0070f3]/20 bg-[#0070f3]/10">
                    {project.category}
                  </span>
                  <span className="text-xs font-medium text-muted-foreground">
                    {project.status}
                  </span>
                </div>

                <h3 className="text-xl sm:text-2xl font-bold text-foreground group-hover:text-[#0070f3] transition-colors">
                  {project.title}
                </h3>

                <p className="text-sm text-muted-foreground font-light leading-relaxed line-clamp-3">
                  {project.shortDescription}
                </p>

                {/* Tech Stack Pills */}
                <div className="flex flex-wrap gap-1.5 pt-2">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="text-[11px] font-mono px-2.5 py-1 rounded bg-secondary text-foreground/80 border border-border/60"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-6 mt-6 border-t border-border/60">
                <Link
                  href={`/portfolio/${project.slug}`}
                  className="inline-flex items-center gap-2 px-4 py-2 text-xs font-bold uppercase tracking-wider bg-[#0070f3] hover:bg-blue-600 text-white rounded-lg transition-colors cursor-pointer shadow-2xs"
                >
                  <span>View Case Study</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>

                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold rounded-lg border border-border bg-secondary/80 hover:bg-secondary text-foreground transition-colors cursor-pointer"
                  >
                    <span>Live Demo</span>
                    <ExternalLink className="w-3.5 h-3.5 text-muted-foreground" />
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Design Work Banner */}
        <div className="p-8 sm:p-10 border border-[#0070f3]/30 bg-gradient-to-br from-card via-card to-[#0070f3]/5 rounded-2xl text-center sm:text-left flex flex-col sm:flex-row sm:items-center justify-between gap-6 shadow-sm">
          <div className="space-y-2 max-w-xl">
            <h3 className="text-xl sm:text-2xl font-bold text-foreground">
              Looking for Visual & Brand Design Work?
            </h3>
            <p className="text-sm text-muted-foreground font-light leading-relaxed">
              Explore Nestor’s creative design portfolio on Behance featuring visual identities, brand systems, UI components, and graphics.
            </p>
          </div>
          <a
            href="https://www.behance.net/nestorcyber"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#0070f3] hover:bg-blue-600 text-white text-xs font-bold uppercase tracking-widest rounded-xl transition-colors cursor-pointer shadow-sm shrink-0"
          >
            <span>Behance Portfolio</span>
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </SectionContainer>
      <Footer />
    </main>
  )
}
