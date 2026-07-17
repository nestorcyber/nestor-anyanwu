import type { Metadata } from "next"
import JourneyPage from "./journey-client"

export const metadata: Metadata = {
  title: "My Journey | Career & Milestones",
  description: "Explore Nestor Anyanwu's professional journey, including key career milestones, software development achievements, and volunteer roles.",
  alternates: {
    canonical: "/journey",
  },
  openGraph: {
    title: "My Journey | Career & Milestones",
    description: "Explore Nestor Anyanwu's professional journey, including key career milestones, software development achievements, and volunteer roles.",
    url: "/journey",
  },
  twitter: {
    title: "My Journey | Career & Milestones",
    description: "Explore Nestor Anyanwu's professional journey, including key career milestones, software development achievements, and volunteer roles.",
  },
}

export default function Page() {
  return <JourneyPage />
}
