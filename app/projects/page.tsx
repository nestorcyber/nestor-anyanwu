import Footer from "@/components/footer"
import { Metadata } from "next"
import { ExternalLink } from "lucide-react"
import { projects } from "@/lib/data"

export const metadata: Metadata = {
  title: "Projects - Featured Work & Design Portfolio",
  description: "Explore Nestor Anyanwu's featured projects showcasing design, development, and community initiatives.",
  alternates: {
    canonical: "/projects",
  },
  openGraph: {
    title: "Projects - Featured Work & Design Portfolio",
    description: "Explore Nestor Anyanwu's featured projects showcasing design, development, and community initiatives.",
    url: "/projects",
  },
  twitter: {
    title: "Projects - Featured Work & Design Portfolio",
    description: "Explore Nestor Anyanwu's featured projects showcasing design, development, and community initiatives.",
  },
}

export default function ProjectsPage() {
  return (
    <>
      <main className="min-h-screen bg-background pt-8 pb-20">
        <div className="max-w-5xl mx-auto px-4 md:px-8">
          {/* Header */}
          <div className="mb-16 text-center md:text-left">
            <p className="text-accent text-xs md:text-sm font-bold tracking-widest mb-3 uppercase">
              CREATIVE & TECHNICAL OUTPUT
            </p>
            <h1 className="text-3xl md:text-6xl font-serif font-black text-primary mb-6">
              Projects & Portfolios
            </h1>
            <p className="text-sm md:text-lg text-foreground/80 font-medium max-w-2xl leading-relaxed">
              A selection of key projects that showcase design, development, and community building across technology and entrepreneurship.
            </p>
          </div>

          {/* Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            {projects.map((project, idx) => (
              <div
                key={idx}
                className="p-8 border border-border hover:border-accent transition-all duration-300 flex flex-col bg-card rounded-xl shadow-sm hover:shadow-md"
              >
                <h3 className="text-2xl font-serif font-bold text-primary mb-3">{project.title}</h3>
                <p className="text-sm text-foreground/80 leading-relaxed mb-6 flex-grow font-medium">{project.description}</p>

                {/* Technologies */}
                <div className="flex flex-wrap gap-1.5 mb-6">
                  {project.technologies.map((tech, i) => (
                    <span
                      key={i}
                      className="inline-block px-3 py-1 bg-primary/5 text-primary text-xs rounded-full font-semibold border border-primary/10"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Links */}
                <div className="flex gap-3 pt-4 border-t border-border">
                  {project.links.demo && project.links.demo !== "#" && (
                    <a
                      href={project.links.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 bg-primary hover:bg-accent text-secondary hover:text-primary rounded-lg font-bold text-sm transition-colors cursor-pointer"
                    >
                      <span>Learn More</span>
                      <ExternalLink size={16} />
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Design Portfolio Card */}
          <div className="p-8 md:p-12 border border-accent/30 hover:border-accent bg-secondary transition-all duration-300 flex flex-col items-center justify-center rounded-xl text-center">
            <h3 className="text-2xl md:text-3xl font-serif font-bold text-primary mb-3">Explore Design Work</h3>
            <p className="text-sm md:text-base text-foreground/80 leading-relaxed mb-6 font-medium max-w-xl mx-auto">
              View my comprehensive design portfolio showcasing branding, digital design, visual identity, and creative projects.
            </p>
            <a
              href="https://www.behance.net/nestorcyber"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-primary hover:bg-accent text-secondary hover:text-primary rounded-lg font-bold text-sm transition-all cursor-pointer shadow-md hover:shadow-lg"
            >
              <span>View My Behance Portfolio</span>
              <ExternalLink size={18} />
            </a>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
