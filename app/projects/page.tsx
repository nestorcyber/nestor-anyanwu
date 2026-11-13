import { Metadata } from "next"
import ProjectLibrary from "@/components/portfolio/project-library"
import Footer from "@/components/footer"
import PortfolioCTA from "@/components/portfolio/portfolio-cta"
import { getProjectItems } from "@/lib/content"

export const revalidate = 3600

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
          {/* Top Page Banner */}
          <div className="w-full bg-card/40 border-b border-border/70 py-10 md:py-14">
            <div className="site-container space-y-3">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-foreground tracking-tight font-heading leading-[1.15]">
                All Projects &amp; Deliverables
              </h1>
              <p className="text-sm sm:text-base text-muted-foreground font-normal leading-relaxed max-w-3xl">
                Complete production index of web apps, software infrastructure, brand systems, and engineering deliverables.
              </p>
            </div>
          </div>

          {/* Project Library Filterable Grid */}
          <div className="site-container py-8">
            <ProjectLibrary projects={projects} />
          </div>

          <PortfolioCTA
            title="Need Production-Ready Software or Web Development?"
            description="From architecture design and full-stack development to deployment, let's build scalable digital solutions that deliver measurable value."
            buttonText="Discuss Your Project"
            buttonHref="/contact"
          />
        </div>

        {/* Global Footer */}
        <Footer />
      </main>
    </div>
  )
}
