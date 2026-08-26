import type { Metadata } from "next"
import GalleryPageClient from "./gallery-client"
import { getGalleryImages } from "@/lib/content"

export const revalidate = 3600

export const metadata: Metadata = {
  title: "Visual Gallery | Nestor Anyanwu (Nestor Cyber)",
  description: "A visual archive documenting moments, speaking engagements, technical conferences, hackathons, engineering sessions, community gatherings, and hands-on workshops.",
  alternates: {
    canonical: "/gallery",
  },
  openGraph: {
    title: "Visual Gallery | Nestor Anyanwu (Nestor Cyber)",
    description: "A visual archive documenting moments, speaking engagements, technical conferences, hackathons, engineering sessions, community gatherings, and hands-on workshops.",
    url: "/gallery",
  },
  twitter: {
    title: "Visual Gallery | Nestor Anyanwu (Nestor Cyber)",
    description: "A visual archive documenting moments, speaking engagements, technical conferences, hackathons, engineering sessions, community gatherings, and hands-on workshops.",
  },
}

export default async function Page() {
  const images = await getGalleryImages()
  return <GalleryPageClient initialImages={images} />
}
