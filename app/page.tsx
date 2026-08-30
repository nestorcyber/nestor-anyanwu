import { Metadata } from "next"
import HomeHero from "@/components/home-hero"
import DribbbleCarousel, { CarouselItem } from "@/components/dribbble-carousel"
import PersonalPhilosophy from "@/components/home/personal-philosophy"
import ExpandingEndeavors from "@/components/home/expanding-endeavors"
import FeaturedPortfolio from "@/components/home/featured-portfolio"
import ImpactSection from "@/components/impact-section"
import QuoteSection from "@/components/home/quote-section"
import FeaturedCommunity from "@/components/home/featured-community"
import LatestJournal from "@/components/home/latest-journal"
import TestimonialsSection from "@/components/home/testimonials-section"
import TrustedBrands from "@/components/home/trusted-brands"
import HomeCTA from "@/components/home/home-cta"
import Footer from "@/components/footer"
import { getBrandPartners } from "@/lib/content"

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
  const brandPartners = await getBrandPartners()

  const carouselItems: CarouselItem[] = [
    {
      id: "about",
      title: "Profile, Leadership & Vision",
      subtitle: "A chronicle of professional milestones, university leadership positions, and engineering growth.",
      image: "https://res.cloudinary.com/z3wgqisj/image/upload/v1785966488/nestor/about/about_fm7rwu.jpg",
      link: "/about",
      accentColor: "#f59e0b",
      badge: "About",
    },
    {
      id: "portfolio",
      title: "Featured Projects & Case Studies",
      subtitle: "Production software systems, web applications, enterprise design architectures, and technical delivery.",
      image: "https://res.cloudinary.com/z3wgqisj/image/upload/v1785966495/nestor/gallery/techadv1_dyclrm.jpg",
      link: "/portfolio",
      accentColor: "#0075ff",
      badge: "Portfolio",
    },
    {
      id: "community",
      title: "Volunteering & Community Impact",
      subtitle: "Developer relations, hackathons, technical advocacy, and grassroots initiatives empowering builders.",
      image: "https://res.cloudinary.com/z3wgqisj/image/upload/v1787285712/nestor/gallery/IMG_0452_a2kkcl.jpg",
      link: "/community",
      accentColor: "#7c3aed",
      badge: "Community",
    },
    {
      id: "journal",
      title: "Articles, Insights & Perspectives",
      subtitle: "In-depth thoughts on software engineering, AI workflows, digital inclusion, and tech leadership.",
      image: "https://res.cloudinary.com/z3wgqisj/image/upload/v1787837171/nestor/gallery/tech-nexus-me.jpg",
      link: "/journal",
      accentColor: "#e11d48",
      badge: "Journal",
    },
    {
      id: "gallery",
      title: "Visual Moments & Event Highlights",
      subtitle: "A visual archive documenting developer conferences, tech summits, workshops, and milestones.",
      image: "https://res.cloudinary.com/z3wgqisj/image/upload/v1787837144/nestor/gallery/gida-large-group.jpg",
      link: "/gallery",
      accentColor: "#059669",
      badge: "Gallery",
    },
    {
      id: "memberships",
      title: "Professional Memberships & Affiliations",
      subtitle: "Accredited memberships, industry councils, and professional associations shaping tech policy & AI.",
      image: "https://res.cloudinary.com/z3wgqisj/image/upload/v1787837125/nestor/gallery/futo-1.jpg",
      link: "/memberships",
      accentColor: "#8b5cf6",
      badge: "Memberships",
    },
    {
      id: "certifications",
      title: "Licenses & Certifications",
      subtitle: "Verified credentials, technical certifications, and specialized proficiencies in AI and software engineering.",
      image: "https://res.cloudinary.com/z3wgqisj/image/upload/v1787837061/nestor/certificates/ieee-cert.jpg",
      link: "/certifications",
      accentColor: "#0284c7",
      badge: "Certifications",
    },
  ]

  return (
    <main className="min-h-screen bg-background">
      {/* 1. Hero */}
      <HomeHero />

      {/* 2. Trusted Brand Logos Carousel */}
      <TrustedBrands brands={brandPartners} />

      {/* 3. Personal Philosophy ("Why I Build") */}
      <PersonalPhilosophy />

      {/* 4. Get To Know & Profile Overview */}
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
      />

      {/* 4b. Featured Quote */}
      <QuoteSection
        quote="Part of my dream is to build a tech ecosystem that is truly accessible, Inclusive, and Collaborative where anyone can Thrive."
        authorName="Nestor Anyanwu"
      />

      {/* 5. Core Focus */}
      <ExpandingEndeavors />

      {/* 7. Selected Work & Engineering */}
      {/* @ts-expect-error Async Server Component */}
      <FeaturedPortfolio />

      {/* 8. Featured Community Work */}
      <FeaturedCommunity />

      {/* 9. Latest Journal Articles & Essays */}
      {/* @ts-expect-error Async Server Component */}
      <LatestJournal />

      {/* 10. Social Proof & Testimonials */}
      <TestimonialsSection />

      {/* 11. Featured Highlights Carousel (Moved down immediately before HomeCTA) */}
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

      {/* 12. Call To Action */}
      <HomeCTA />

      {/* 13. Footer */}
      <Footer />
    </main>
  )
}
