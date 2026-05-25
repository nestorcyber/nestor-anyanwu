import Footer from "@/components/footer"
import { Metadata } from "next"
import { ExternalLink } from "lucide-react"

export const metadata: Metadata = {
  title: "Projects",
  description: "Explore Nestor's key projects showcasing design, development, and community initiatives.",
}

const projects = [
  {
    title: "DevFest Owerri 2025",
    description: "Major design contributor for Nigeria's largest developer festival in South-East. Supported design initiatives, managed creative assets, and contributed to event logistics and community coordination.",
    technologies: ["Graphic Design", "Community Building", "Branding", "Event Support"],
    links: {},
  },
  {
    title: "Build with AI",
    description: "Innovative platform designed to empower developers and creators with AI-driven tools and resources. Contributed to strategic design and community-focused features for seamless integration of AI capabilities.",
    technologies: ["AI Integration", "Platform Design", "Developer Experience", "Innovation"],
    links: {},
  },
  {
    title: "Tech Nexus FUTO",
    description: "Designed and coordinated event setup for Tech Nexus at FUTO, bringing together developers for knowledge sharing and networking. Managed photography and visual documentation.",
    technologies: ["Event Design", "Photography", "Branding", "Coordination"],
    links: {},
  },
]

export default function ProjectsPage() {
  return (
    <>
      <main className="min-h-screen bg-background pt-32 pb-20">
        <div className="max-w-5xl mx-auto px-4 md:px-8">
          {/* Header */}
          <div className="mb-10">
            <h1 className="text-lg md:text-xl font-sans font-bold text-primary mb-3 uppercase tracking-wide">
              Featured Projects
            </h1>
            <p className="text-sm md:text-base text-foreground font-medium max-w-2xl">
              A selection of key projects that showcase design, development, and community building across technology and entrepreneurship.
            </p>
          </div>

          {/* Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
            {projects.map((project, idx) => (
              <div
                key={idx}
                className="p-6 md:p-8 border border-border hover:border-accent transition-colors duration-300 flex flex-col bg-background rounded-lg"
              >
                <h3 className="text-base font-sans font-bold text-primary mb-2 uppercase tracking-wide">{project.title}</h3>
                <p className="text-sm text-foreground leading-relaxed mb-6 flex-grow font-medium">{project.description}</p>

                {/* Technologies */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.technologies.map((tech, i) => (
                    <span
                      key={i}
                      className="inline-block px-3 py-1 bg-primary/10 text-primary text-sm rounded-full font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Links */}
                <div className="flex gap-3 pt-6 border-t border-border">
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
          <div className="p-8 md:p-10 border-2 border-primary hover:border-accent transition-colors duration-300 flex flex-col bg-background rounded-lg text-center">
            <h3 className="text-base font-sans font-bold text-primary mb-3 uppercase tracking-wide">Explore Design Work</h3>
            <p className="text-sm text-foreground leading-relaxed mb-6 font-medium max-w-xl mx-auto">
              View my comprehensive design portfolio showcasing branding, digital design, visual identity, and creative projects.
            </p>
            <a
              href="https://www.behance.net/nestorcyber"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-primary hover:bg-accent text-secondary hover:text-primary rounded-lg font-bold text-sm transition-colors cursor-pointer"
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
