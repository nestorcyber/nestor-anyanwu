import { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import HomeHero from "@/components/home-hero"
import Footer from "@/components/footer"
import DribbbleCarousel, { CarouselItem } from "@/components/dribbble-carousel"
import { journeyTimeline, projects } from "@/lib/data"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar, Briefcase, Award, GraduationCap, ArrowRight, ExternalLink } from "lucide-react"

export const metadata: Metadata = {
  title: "Nestor Cyber – Tech Advocate, Designer & Community Leader",
  description: "Portfolio of Nestor Anyanwu (Nestor Cyber). Tech Leader, Software Developer, and Community Advocate driving digital innovation, capacity building, and impactful tech ecosystems.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Nestor Cyber – Tech Advocate, Designer & Community Leader",
    description: "Portfolio of Nestor Anyanwu (Nestor Cyber). Tech Leader, Software Developer, and Community Advocate driving digital innovation, capacity building, and impactful tech ecosystems.",
    url: "/",
  },
  twitter: {
    title: "Nestor Cyber – Tech Advocate, Designer & Community Leader",
    description: "Portfolio of Nestor Anyanwu (Nestor Cyber). Tech Leader, Software Developer, and Community Advocate driving digital innovation, capacity building, and impactful tech ecosystems.",
  },
}

export default function Home() {
  const carouselItems: CarouselItem[] = [
    {
      id: "projects",
      title: "Featured Projects & Designs",
      subtitle: "Explore professional software engineering, custom user interfaces, brand design, and technical portfolios.",
      image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/dev-nnewBVnGcwatonVCQKc9zTtMdshDoM.jpg",
      link: "/projects",
      accentColor: "#0ea5e9",
      badge: "Projects"
    },
    {
      id: "journey",
      title: "Career Timeline & Legacy",
      subtitle: "A chronicle of professional milestones, leadership roles, university positions, and engineering growth.",
      image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/about-ItCmRGacGKzMpQbnPfGLfUfLEwWn3i.jpg",
      link: "/journey",
      accentColor: "#d97706",
      badge: "Journey"
    },
    {
      id: "community",
      title: "Community & Volunteering",
      subtitle: "ICT strategy, developer event logistics, and technical community leadership for NACOS, IEEE, and GDG.",
      image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/vol-ehxuFInSlnE81JZZijj6Bgoz9s2kcW.jpeg",
      link: "/community",
      accentColor: "#7c3aed",
      badge: "Volunteering"
    },
    {
      id: "gallery",
      title: "Visual Gallery Highlights",
      subtitle: "Visual moments captured from tech summits, hackathons, and corporate setup initiatives.",
      image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/eden2-sUzI0wvGmZMjB5UUP911IAB6WvBM5c.jpg",
      link: "/gallery",
      accentColor: "#059669",
      badge: "Gallery"
    }
  ]

  // Grab the latest 3 items from the journey timeline for the preview
  const recentJourney = journeyTimeline.slice(0, 3)

  const getJourneyIcon = (type: string) => {
    switch (type) {
      case "work":
        return <Briefcase className="w-4 h-4 text-white" />
      case "volunteer":
        return <Award className="w-4 h-4 text-white" />
      case "membership":
        return <GraduationCap className="w-4 h-4 text-white" />
      default:
        return <Calendar className="w-4 h-4 text-white" />
    }
  }

  return (
    <main className="min-h-screen bg-background">
      {/* 1. Hero Section */}
      <HomeHero />

      {/* Highlights Deck Section */}
      <section className="w-full border-b border-border bg-background">
        <div className="max-w-7xl mx-auto pt-20 px-6 text-center">
          <h2 className="text-3xl md:text-5xl font-extrabold text-foreground tracking-tight">
            Explore Nestor's Chronicles
          </h2>
        </div>
        <DribbbleCarousel items={carouselItems} />
      </section>

      {/* 2. Editorial About Section */}
      <section className="py-24 px-6 md:px-12 lg:px-24 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-7 space-y-6 animate-fade-in-up">
          <p className="text-accent text-xs md:text-sm font-bold tracking-widest uppercase">
            INTRODUCTION & VISION
          </p>
          <h2 className="text-3xl md:text-5xl font-extrabold text-foreground tracking-tight leading-tight">
            Driving Digital Innovation & Community Growth
          </h2>
          <p className="text-base md:text-lg text-foreground/80 leading-relaxed font-medium">
            Nestor Anyanwu (Nestor Cyber) is a tech leader, software engineer, and designer committed to building inclusive ecosystems. Whether coordinating major tech conferences or building digital products, his mission centers on empowering individuals and organizations through technological advancement.
          </p>
          <div className="pt-2">
            <Link href="/about">
              <Button className="font-bold flex items-center gap-2 group transition-all">
                Read Full Biography
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>
        </div>

        <div className="lg:col-span-5 relative w-full aspect-square rounded-2xl overflow-hidden shadow-xl border border-border/50 animate-fade-in-up">
          <Image
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/about-ItCmRGacGKzMpQbnPfGLfUfLEwWn3i.jpg"
            alt="Nestor Anyanwu speaking"
            fill
            className="object-cover"
          />
        </div>
      </section>

      {/* 3. Journey Highlights Section */}
      <section className="bg-secondary py-24 px-6 md:px-12 lg:px-24 border-y border-border">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div className="space-y-3">
              <p className="text-accent text-xs md:text-sm font-bold tracking-widest uppercase">
                THE CHRONICLES
              </p>
              <h2 className="text-3xl md:text-5xl font-extrabold text-foreground tracking-tight">
                Latest Milestones
              </h2>
            </div>
            <Link href="/journey">
              <Button variant="outline" className="font-bold flex items-center gap-2 group rounded-full">
                View Full Timeline
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>

          {/* Mini Timeline Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {recentJourney.map((item, idx) => (
              <Card
                key={item.id}
                className="overflow-hidden border border-border bg-card shadow-sm hover:shadow-md hover:border-accent transition-all duration-300 flex flex-col justify-between p-6 animate-fade-in-up"
                style={{ animationDelay: `${idx * 150}ms` }}
              >
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
                      {getJourneyIcon(item.type)}
                    </span>
                    <span className="text-xs font-semibold text-muted-foreground">
                      {item.date}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-lg font-bold text-primary leading-snug">
                      {item.title}
                    </h3>
                    <p className="text-sm font-medium text-foreground/70 mb-2">
                      {item.organization}
                    </p>
                    <p className="text-xs text-muted-foreground leading-relaxed line-clamp-3">
                      {item.description}
                    </p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Featured Projects Section */}
      <section className="py-24 px-6 md:px-12 lg:px-24">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div className="space-y-3">
              <p className="text-accent text-xs md:text-sm font-bold tracking-widest uppercase">
                PORTFOLIO SHOWCASE
              </p>
              <h2 className="text-3xl md:text-5xl font-extrabold text-foreground tracking-tight">
                Featured Projects
              </h2>
            </div>
            <Link href="/projects">
              <Button variant="outline" className="font-bold flex items-center gap-2 group rounded-full">
                All Projects
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>

          {/* Projects Deck */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {projects.map((project, idx) => (
              <div
                key={idx}
                className="p-8 border border-border bg-card rounded-xl shadow-sm hover:shadow-md hover:border-accent hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <h3 className="text-xl font-bold text-primary mb-3">
                    {project.title}
                  </h3>
                  <p className="text-sm text-foreground/80 leading-relaxed mb-6 font-medium">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {project.technologies.slice(0, 3).map((tech, i) => (
                      <span
                        key={i}
                        className="inline-block px-2.5 py-0.5 bg-primary/5 text-primary text-[11px] rounded-full font-semibold border border-primary/10"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex gap-3 pt-4 border-t border-border mt-auto">
                  {project.links.demo && (
                    <a
                      href={project.links.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 text-xs font-bold text-accent hover:underline"
                    >
                      <span>Explore</span>
                      <ExternalLink size={12} />
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Clean CTA Section */}
      <section className="bg-primary text-secondary py-20 px-6 md:px-12 lg:px-24 text-center">
        <div className="max-w-3xl mx-auto space-y-6">
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight">
            Let's Collaborate On Your Next Project
          </h2>
          <p className="text-sm md:text-base text-secondary/80 max-w-lg mx-auto font-medium">
            Available for speaking engagements, design consulting, technology advisory, and community partnerships.
          </p>
          <div className="pt-4">
            <Link href="/contact">
              <Button size="lg" className="bg-accent hover:bg-accent/90 text-white font-bold rounded-full">
                Get In Touch
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </main>
  )
}
