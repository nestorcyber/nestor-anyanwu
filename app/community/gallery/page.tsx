import type { Metadata } from "next"
import GalleryPageClient from "@/app/gallery/gallery-client"
import { getVolunteeringImages } from "@/lib/content"

export const revalidate = 3600

export const metadata: Metadata = {
  title: "Volunteering & Community Gallery | Nestor Anyanwu (Nestor Cyber)",
  description:
    "Explore community group moments, student leadership summits, technical workshops, and volunteering impact by Nestor Anyanwu.",
  alternates: {
    canonical: "/community/gallery",
  },
  openGraph: {
    title: "Volunteering & Community Gallery | Nestor Anyanwu (Nestor Cyber)",
    description:
      "Explore community group moments, student leadership summits, technical workshops, and volunteering impact by Nestor Anyanwu.",
    url: "/community/gallery",
  },
  twitter: {
    title: "Volunteering & Community Gallery | Nestor Anyanwu (Nestor Cyber)",
    description:
      "Explore community group moments, student leadership summits, technical workshops, and volunteering impact by Nestor Anyanwu.",
  },
}

export default async function VolunteeringGalleryPage() {
  const images = await getVolunteeringImages()

  return (
    <GalleryPageClient
      initialImages={images}
      title="Volunteering Gallery"
      description="A visual archive documenting community group moments, event operations, technical workshops, hackathons, and on-ground volunteer impact."
      backLink="/community"
      backLabel="Back to Community"
    />
  )
}
