import type { Metadata } from "next"
import CommunityHero from "@/components/community/community-hero"
import ImpactSnapshot from "@/components/community/impact-snapshot"
import FeaturedExperiences, { type FeaturedExperienceItem } from "@/components/community/featured-experiences"
import CommunityTimeline from "@/components/community/community-timeline"
import OrganizationsGrid from "@/components/community/organizations-grid"
import ContributionPillars from "@/components/community/contribution-pillars"
import CommunityStories, { type CommunityStoryItem } from "@/components/community/community-stories"
import VolunteeringGallery, { type GalleryPhoto } from "@/components/community/volunteering-gallery"
import CommunitySkills from "@/components/community/community-skills"
import CommunityCTA from "@/components/community/community-cta"
import Footer from "@/components/footer"
import {
  getCommunityEntries,
  getJourneyItems,
  getGalleryImages,
  getJournalArticles,
} from "@/lib/content"

export const revalidate = 3600

export const metadata: Metadata = {
  title: "Volunteering & Community Impact Portfolio | Nestor Anyanwu (Nestor Cyber)",
  description:
    "Explore Nestor Anyanwu's (Nestor Cyber) volunteering journey, grassroots leadership, developer relations, event operations, and community impact.",
  alternates: {
    canonical: "/community",
  },
  openGraph: {
    title: "Volunteering & Community Impact Portfolio | Nestor Anyanwu (Nestor Cyber)",
    description:
      "Explore Nestor Anyanwu's (Nestor Cyber) volunteering journey, grassroots leadership, developer relations, event operations, and community impact.",
    url: "/community",
  },
  twitter: {
    title: "Volunteering & Community Impact Portfolio | Nestor Anyanwu (Nestor Cyber)",
    description:
      "Explore Nestor Anyanwu's (Nestor Cyber) volunteering journey, grassroots leadership, developer relations, event operations, and community impact.",
  },
}

export default async function CommunityPage() {
  const [entries, journey, galleryImages, journalArticles] = await Promise.all([
    getCommunityEntries(),
    getJourneyItems(),
    getGalleryImages(),
    getJournalArticles(),
  ])

  // Filter volunteer items for the timeline
  const volunteerJourney = journey.filter((item) => item.type === "volunteer")

  // Map featured experiences from database entries or fallback to rich curated list
  const mappedExperiences: FeaturedExperienceItem[] = entries.map((e) => ({
    id: e.id,
    title: e.organization,
    organization: e.organization,
    role: e.role,
    date: e.duration,
    coverImage: e.coverImage,
    description: e.description || (e.achievements?.[0] ?? ""),
    contributions: e.achievements && e.achievements.length > 0 ? e.achievements : [e.description],
    skills: e.tags && e.tags.length > 0 ? e.tags : ["Community", "Leadership", "Volunteering"],
    slug: e.slug,
  }))

  // Map gallery photos from gallery table
  const mappedPhotos: GalleryPhoto[] = galleryImages.map((g) => ({
    id: g.id,
    imageUrl: g.imageUrl,
    title: g.title || "Community Event",
    caption: g.caption || undefined,
    category: g.category || undefined,
    location: g.location || undefined,
    date: g.eventDate || undefined,
  }))

  // Map community stories from relevant journal posts
  const mappedStories: CommunityStoryItem[] = journalArticles
    .filter(
      (a) =>
        a.category.toLowerCase().includes("community") ||
        a.category.toLowerCase().includes("leadership") ||
        a.category.toLowerCase().includes("event") ||
        a.tags.some((t) => t.toLowerCase().includes("community") || t.toLowerCase().includes("gdg"))
    )
    .slice(0, 3)
    .map((a) => ({
      id: a.id,
      title: a.title,
      excerpt: a.excerpt,
      coverImage: a.coverImage,
      date: a.publishedDate,
      organization: a.category,
      journalSlug: a.slug,
      readTime: "4 min read",
    }))

  return (
    <div className="min-h-screen bg-background flex flex-col w-full">
      {/* Main Full-Width Content Column */}
      <main className="flex-1 w-full min-w-0 flex flex-col justify-between overflow-x-hidden">
        <div className="w-full">
          {/* 1. Hero */}
          <CommunityHero />

          {/* 2. Impact Snapshot */}
          <ImpactSnapshot
            organizationCount={8}
            eventCount={15}
            volunteerCount={volunteerJourney.length > 0 ? volunteerJourney.length : 12}
            peopleReached="3,500+"
          />

          {/* 3. Featured Experiences */}
          <FeaturedExperiences experiences={mappedExperiences.length > 0 ? mappedExperiences : undefined} />

          {/* 4. Volunteering Timeline */}
          <CommunityTimeline timeline={volunteerJourney.length > 0 ? volunteerJourney : undefined} />

          {/* 5. Organizations & Communities */}
          <OrganizationsGrid />

          {/* 6. How I Contribute */}
          <ContributionPillars />

          {/* 7. Community Stories & Reflections */}
          <CommunityStories stories={mappedStories.length > 0 ? mappedStories : undefined} />

          {/* 8. Volunteering Gallery with Lightbox */}
          <VolunteeringGallery photos={mappedPhotos.length > 0 ? mappedPhotos : undefined} />

          {/* 9. Skills Gained Through Volunteering */}
          <CommunitySkills />

          {/* 10. Call to Action */}
          <CommunityCTA />
        </div>

        {/* Global Footer */}
        <Footer />
      </main>
    </div>
  )
}
