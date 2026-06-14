import HomeHero from "@/components/home-hero"
import HomeAboutPreview from "@/components/home-about-preview"
import HomeVolunteeringPreview from "@/components/home-volunteering-preview"
import HomeExperiencePreview from "@/components/home-experience-preview"
import HomeProjectsPreview from "@/components/home-projects-preview"
import HomeContactCTA from "@/components/home-contact-cta"
import Footer from "@/components/footer"

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <HomeHero />
      {/* Divider line */}
      <div className="w-full h-1 bg-primary"></div>
      <HomeAboutPreview />
      <HomeVolunteeringPreview />
      <HomeExperiencePreview />
      <HomeProjectsPreview />
      <HomeContactCTA />
      <Footer />
    </main>
  )
}
