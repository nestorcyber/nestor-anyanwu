import Link from 'next/link'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { getPortfolioProjectBySlug, getPortfolioProjects } from '@/lib/keystatic'
import Footer from '@/components/footer'
import SectionContainer from '@/components/shared/section-container'
import { ArrowLeft, ExternalLink, Github, Calendar, Tag, CheckCircle2 } from 'lucide-react'
import type { Metadata } from 'next'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const projects = await getPortfolioProjects()
  return projects.map((project) => ({
    slug: project.slug,
  }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const project = await getPortfolioProjectBySlug(slug)
  if (!project) return { title: 'Project Not Found' }

  return {
    title: `${project.title} | Nestor Cyber Portfolio`,
    description: project.shortDescription,
    openGraph: {
      title: project.title,
      description: project.shortDescription,
      images: [project.coverImage],
    },
  }
}

export default async function PortfolioDetailPage({ params }: Props) {
  const { slug } = await params
  const project = await getPortfolioProjectBySlug(slug)

  if (!project) {
    notFound()
  }

  return (
    <main className="min-h-screen bg-background text-foreground pt-8 pb-20">
      <SectionContainer>
        {/* Back Link */}
        <Link
          href="/portfolio"
          className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-muted-foreground hover:text-accent mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Portfolio</span>
        </Link>

        {/* Header */}
        <div className="space-y-4 max-w-4xl mb-12">
          <div className="flex flex-wrap items-center gap-3">
            <span className="text-xs font-bold uppercase tracking-widest px-3 py-1 bg-accent/15 text-accent border border-accent/30">
              {project.category}
            </span>
            <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-green-500" />
              {project.status}
            </span>
          </div>
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-foreground">
            {project.title}
          </h1>
          <p className="text-base md:text-lg text-muted-foreground font-light leading-relaxed">
            {project.shortDescription}
          </p>
        </div>

        {/* Project Cover */}
        <div className="relative w-full h-[320px] md:h-[500px] mb-12 overflow-hidden border border-border">
          <Image
            src={project.coverImage}
            alt={project.title}
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Details Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-8 space-y-6 text-foreground leading-relaxed font-light">
            <h2 className="text-xl font-bold uppercase tracking-wide text-foreground border-b border-border/40 pb-3">
              Case Study & Overview
            </h2>
            <div className="prose dark:prose-invert max-w-none text-muted-foreground space-y-4 text-base">
              {project.fullDescription}
            </div>
          </div>

          {/* Sidebar Meta */}
          <aside className="lg:col-span-4 space-y-6 p-6 border border-border bg-card/40">
            <h3 className="text-xs font-bold uppercase tracking-widest text-foreground border-b border-border/40 pb-3">
              Project Information
            </h3>

            {project.client && (
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground block mb-1">
                  Client / Organization
                </span>
                <span className="text-sm font-semibold text-foreground">{project.client}</span>
              </div>
            )}

            {project.role && (
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground block mb-1">
                  My Role
                </span>
                <span className="text-sm font-semibold text-foreground">{project.role}</span>
              </div>
            )}

            {project.completionDate && (
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground block mb-1">
                  Completion Date
                </span>
                <span className="text-sm font-semibold text-foreground flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-accent" />
                  {project.completionDate}
                </span>
              </div>
            )}

            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground block mb-2">
                Tech Stack
              </span>
              <div className="flex flex-wrap gap-1.5">
                {project.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="text-[11px] font-mono px-2 py-0.5 border border-border/60 bg-muted/30 text-foreground"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Links */}
            <div className="pt-4 border-t border-border/40 space-y-2">
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-widest bg-accent text-white py-3 hover:bg-accent/90 transition-colors"
                >
                  <span>View Live Demo</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              )}
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-widest border border-foreground/40 text-foreground py-3 hover:border-accent hover:text-accent transition-colors"
                >
                  <Github className="w-3.5 h-3.5" />
                  <span>GitHub Repository</span>
                </a>
              )}
            </div>
          </aside>
        </div>
      </SectionContainer>
      <Footer />
    </main>
  )
}
