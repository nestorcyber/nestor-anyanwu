import type { Metadata } from "next"
import GalleryPageClient from "./gallery-client"
import { getJourneyItems, getStandaloneGalleryImages } from "@/lib/content"

export const metadata: Metadata = {
  title: "Gallery & Photos | Nestor Anyanwu (Nestor Cyber)",
  description: "Visual collection of moments and events from Nestor Anyanwu's (Nestor Cyber) journey, community roles, and projects.",
  alternates: {
    canonical: "/gallery",
  },
  openGraph: {
    title: "Gallery & Photos | Nestor Anyanwu (Nestor Cyber)",
    description: "Visual collection of moments and events from Nestor Anyanwu's (Nestor Cyber) journey, community roles, and projects.",
    url: "/gallery",
  },
  twitter: {
    title: "Gallery & Photos | Nestor Anyanwu (Nestor Cyber)",
    description: "Visual collection of moments and events from Nestor Anyanwu's (Nestor Cyber) journey, community roles, and projects.",
  },
}

export default async function Page() {
  const [journeyTimeline, extraImages] = await Promise.all([
    getJourneyItems(),
    getStandaloneGalleryImages(),
  ])

  return <GalleryPageClient journeyTimeline={journeyTimeline} extraImages={extraImages} />
}
