import type { Metadata } from "next"
import JourneyPage from "./journey-client"
import { getJourneyItems } from "@/lib/content"

export const metadata: Metadata = {
  title: "Nestor's Journey & Timeline | Nestor Anyanwu (Nestor Cyber)",
  description: "Explore Nestor Anyanwu's (Nestor Cyber) professional journey, including key career milestones, software development achievements, and volunteer roles.",
  alternates: {
    canonical: "/journey",
  },
  openGraph: {
    title: "Nestor's Journey & Timeline | Nestor Anyanwu (Nestor Cyber)",
    description: "Explore Nestor Anyanwu's (Nestor Cyber) professional journey, including key career milestones, software development achievements, and volunteer roles.",
    url: "/journey",
  },
  twitter: {
    title: "Nestor's Journey & Timeline | Nestor Anyanwu (Nestor Cyber)",
    description: "Explore Nestor Anyanwu's (Nestor Cyber) professional journey, including key career milestones, software development achievements, and volunteer roles.",
  },
}

export default async function Page() {
  const journeyTimeline = await getJourneyItems()
  return <JourneyPage journeyTimeline={journeyTimeline} />
}
