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

export const revalidate = 60

export const metadata: Metadata = {
  title: "Nestor Anyanwu (Nestor Cyber) | Software Engineer & Tech Leader",
  description: "Official website of Nestor Anyanwu (Nestor Cyber). Tech Leader, Software Developer, and Community Advocate driving digital innovation, capacity building, and impactful tech ecosystems.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Nestor Anyanwu (Nestor Cyber) | Software Engineer & Tech Leader",
    description: "Official website of Nestor Anyanwu (Nestor Cyber). Tech Leader, Software Developer, and Community Advocate driving digital innovation, capacity building, and impactful tech ecosystems.",
    url: "/",
  },
  twitter: {
    title: "Nestor Anyanwu (Nestor Cyber) | Software Engineer & Tech Leader",
    description: "Official website of Nestor Anyanwu (Nestor Cyber). Tech Leader, Software Developer, and Community Advocate driving digital innovation, capacity building, and impactful tech ecosystems.",
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
      subtitle: "Production software, web apps, brand design systems, and engineering evidence — all in one place.",
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
      subtitle: "ICT strategy, developer event logistics, and technical community leadership for NACOS, IEEE, and GDG.",
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

      {/* 4. Community Impact ("Impact & Reach") */}
      <ImpactSection
        category="Impact & Reach"
        title="Engineering Progress, Building Communities"
        description="From directing national computing initiatives to shipping production software and designing developer conference identities — every role I take on is rooted in one conviction: technology is most powerful when it serves people, not the other way around."
        ctaText="LET'S COLLABORATE"
        ctaLink="/contact"
        pillarsTitle="How I show up:"
        pillars={[
          "Software Development & Delivery",
          "National ICT Strategy & Direction",
          "Developer Community Activation",
          "Graphic Design & Visual Systems",
          "Data Privacy Advocacy",
          "Technical Mentorship & Education",
          "IT Consulting & Digital Support",
        ]}
        stats={formattedStats}
        heroImage="https://res.cloudinary.com/z3wgqisj/image/upload/v1785966495/techadv1_dyclrm.jpg"
        heroImageAlt="Nestor Anyanwu at community event"
      />

      {/* 5. Core Focus */}
      <ExpandingEndeavors />

      {/* 6. Selected Work & Engineering */}
      {/* @ts-expect-error Async Server Component */}
      <FeaturedPortfolio />

      {/* 7. Featured Community Work */}
      {/* @ts-expect-error Async Server Component */}
      <FeaturedCommunity />

      {/* 8. Latest Journal */}
      {/* @ts-expect-error Async Server Component */}
      <LatestJournal />

      {/* 9. Testimonials */}
      <TestimonialsSection />

      {/* 10. Featured Highlights Carousel (Moved down immediately before HomeCTA) */}
      <section className="w-full border-b border-border/60 bg-background py-12">
        <div className="max-w-7xl mx-auto px-6 text-center mb-8 space-y-3">
          <h2 className="text-3xl md:text-5xl font-extrabold text-foreground tracking-tight">
            Featured Highlights
          </h2>
          <p className="text-sm md:text-base text-muted-foreground font-light max-w-2xl mx-auto leading-relaxed">
            Explore professional software engineering, custom user interfaces, brand design, and technical deliverables.
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
