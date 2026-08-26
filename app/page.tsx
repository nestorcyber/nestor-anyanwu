import { Metadata } from "next"
import HomeHero from "@/components/home-hero"
import DribbbleCarousel, { CarouselItem } from "@/components/dribbble-carousel"
import PersonalPhilosophy from "@/components/home/personal-philosophy"
import ExpandingEndeavors from "@/components/home/expanding-endeavors"
import FeaturedPortfolio from "@/components/home/featured-portfolio"
import ImpactSection from "@/components/impact-section"
import FeaturedCommunity from "@/components/home/featured-community"
import LatestJournal from "@/components/home/latest-journal"
import TestimonialsSection from "@/components/home/testimonials-section"
import TrustedBrands from "@/components/home/trusted-brands"
import HomeCTA from "@/components/home/home-cta"
import Footer from "@/components/footer"
import { getPortfolioStats, getBrandPartners } from "@/lib/content"

export const revalidate = 3600

export const metadata: Metadata = {
  title: "Nestor Anyanwu | Software Engineering, AI, DevRel, Leadership, Product & Design",
  description: "Official portfolio of Nestor Anyanwu (Nestor Cyber). Software Engineer, AI Enthusiast, and Tech Leader with expertise spanning Developer Relations, Product Management, IT Consulting, and Design, dedicated to building impactful digital solutions and an inclusive, collaborative tech ecosystem where everyone can thrive.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Nestor Anyanwu | Software Engineering, AI, DevRel, Leadership, Product & Design",
    description: "Official portfolio of Nestor Anyanwu (Nestor Cyber). Software Engineer, AI Enthusiast, and Tech Leader with expertise spanning Developer Relations, Product Management, IT Consulting, and Design, dedicated to building impactful digital solutions and an inclusive, collaborative tech ecosystem where everyone can thrive.",
    url: "/",
    siteName: "Nestor Anyanwu",
  },
  twitter: {
    title: "Nestor Anyanwu | Software Engineering, AI, DevRel, Leadership, Product & Design",
    description: "Official portfolio of Nestor Anyanwu (Nestor Cyber). Software Engineer, AI Enthusiast, and Tech Leader with expertise spanning Developer Relations, Product Management, IT Consulting, and Design, dedicated to building impactful digital solutions and an inclusive, collaborative tech ecosystem where everyone can thrive.",
  },
}

export default async function Home() {
  const [dbStats, brandPartners] = await Promise.all([
    getPortfolioStats(),
    getBrandPartners(),
  ])

  const carouselItems: CarouselItem[] = [
    {
      id: "portfolio",
      title: "Featured Projects & Portfolio",
      subtitle: "Production software, web apps, brand design systems, and engineering evidence, all in one place.",
      image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/dev-nnewBVnGcwatonVCQKc9zTtMdshDoM.jpg",
      link: "/portfolio",
      accentColor: "#0ea5e9",
      badge: "Portfolio"
    },
    {
      id: "about",
      title: "Profile & Vision",
      subtitle: "A chronicle of professional milestones, leadership roles, university positions, and engineering growth.",
      image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/about-ItCmRGacGKzMpQbnPfGLfUfLEwWn3i.jpg",
      link: "/about",
      accentColor: "#d97706",
      badge: "About"
    },
    {
      id: "community",
      title: "Community & Leadership",
      subtitle: "ICT strategy, developer event logistics, tech bootcamps, and grassroots community leadership.",
      image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/vol-ehxuFInSlnE81JZZijj6Bgoz9s2kcW.jpeg",
      link: "/community",
      accentColor: "#7c3aed",
      badge: "Community"
    },
    {
      id: "journal",
      title: "Articles & Technical Essays",
      subtitle: "Thoughts on technology leadership, software engineering, digital inclusion, and community building.",
      image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Hero-jwNXILOOhWA26ePzvza9GudcffKa9R.jpg",
      link: "/journal",
      accentColor: "#e11d48",
      badge: "Journal"
    },
    {
      id: "gallery",
      title: "Visual Gallery Highlights",
      subtitle: "Visual moments captured from tech summits, hackathons, leadership conferences, and community events.",
      image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/eden2-sUzI0wvGmZMjB5UUP911IAB6WvBM5c.jpg",
      link: "/gallery",
      accentColor: "#059669",
      badge: "Gallery"
    },
    {
      id: "contact",
      title: "Start a Collaboration",
      subtitle: "Looking to build a digital product, partner on community tech programs, or invite Nestor for a speaking engagement.",
      image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/about-ItCmRGacGKzMpQbnPfGLfUfLEwWn3i.jpg",
      link: "/contact",
      accentColor: "#f59e0b",
      badge: "Contact"
    }
  ]

  // Default fallback stats if none in DB
  const defaultImpactStats = [
    {
      value: "2000+",
      label: "People Reached",
      description: "Computing students, developers, and tech leaders empowered through workshops, events, and digital platforms.",
    },
    {
      value: "25+",
      label: "Projects Completed",
      description: "Production software, web apps, brand design systems, and engineering deliverables.",
    },
    {
      value: "12+",
      label: "Organizations & Communities",
      description: "National bodies, student chapters, tech startups, and developer communities served and supported.",
    },
  ]

  const formattedStats = dbStats.length > 0
    ? dbStats.map((s) => ({
        value: s.value,
        label: s.label,
        description: s.description || "",
      }))
    : defaultImpactStats

  return (
    <main className="min-h-screen bg-background">
      {/* 1. Hero */}
      <HomeHero />

      {/* 2. Trusted Brand Logos Carousel */}
      <TrustedBrands brands={brandPartners} />

      {/* 3. Personal Philosophy ("Why I Build") */}
      <PersonalPhilosophy />

      {/* 4. Impact & Reach */}
      <ImpactSection
        category="GET TO KNOW"
        title="Engineering Progress, Strategic Leadership & Ecosystem Impact"
        description="From architecting scalable software and AI workflows to tech leadership, developer relations, product consulting, and volunteering: every role I take on is driven by one conviction: creating real impact and an inclusive, collaborative tech ecosystem where everyone can thrive."
        ctaText="Discover More"
        ctaLink="/about"
        pillars={[
          "Architecting scalable software, modern web apps & intelligent AI workflows",
          "Directing national ICT strategy, student computing & builder governance",
          "Cultivating developer ecosystems, tech summits, bootcamps & hackathons",
          "Delivering enterprise product strategy, tech audits & IT consulting",
          "Championing voluntary outreach, mentorship & inclusive tech growth",
        ]}
        stats={formattedStats}
      />

      {/* 5. Core Focus */}
      <ExpandingEndeavors />

      {/* 6. Selected Work & Engineering */}
      {/* @ts-expect-error Async Server Component */}
      <FeaturedPortfolio />

      {/* 7. Featured Community Work */}
      {/* @ts-expect-error Async Server Component */}
      <FeaturedCommunity />

      {/* 8. Latest Journal Articles & Essays */}
      {/* @ts-expect-error Async Server Component */}
      <LatestJournal />

      {/* 9. Social Proof & Testimonials */}
      <TestimonialsSection />

      {/* 10. Featured Highlights Carousel (Moved down immediately before HomeCTA) */}
      <section className="w-full border-b border-border/60 bg-background py-8 md:py-10">
        <div className="site-container text-center mb-8 space-y-3">
          <h2 className="text-3xl md:text-5xl font-extrabold text-foreground tracking-tight">
            Featured Highlights
          </h2>
          <p className="text-sm md:text-base text-muted-foreground font-light max-w-2xl mx-auto leading-relaxed">
            Featured software and visual designs.
          </p>
          <div className="h-1 w-16 bg-accent mx-auto mt-3" />
        </div>
        <DribbbleCarousel items={carouselItems} />
      </section>

      {/* 11. Call To Action */}
      <HomeCTA />

      {/* 12. Footer */}
      <Footer />
    </main>
  )
}
