import type { Metadata } from "next"
import { getCommunityEntries } from "@/lib/content"
import RoadmapClient from "./roadmap-client"

export const revalidate = 3600

export const metadata: Metadata = {
  title: "Community & Volunteering Roadmap | Nestor Anyanwu (Nestor Cyber)",
  description:
    "A comprehensive chronological roadmap documenting Nestor Anyanwu's grassroots tech leadership, student engineering chapters, developer conferences, and community advocacy initiatives.",
  alternates: {
    canonical: "/community/roadmap",
  },
  openGraph: {
    title: "Community & Volunteering Roadmap | Nestor Anyanwu (Nestor Cyber)",
    description:
      "A comprehensive chronological roadmap documenting Nestor Anyanwu's grassroots tech leadership, student engineering chapters, developer conferences, and community advocacy initiatives.",
    url: "/community/roadmap",
  },
  twitter: {
    title: "Community & Volunteering Roadmap | Nestor Anyanwu (Nestor Cyber)",
    description:
      "A comprehensive chronological roadmap documenting Nestor Anyanwu's grassroots tech leadership, student engineering chapters, developer conferences, and community advocacy initiatives.",
  },
}

export default async function CommunityRoadmapPage() {
  // Source directly from the Community & Advocacy Initiatives database / CMS section
  const communityEntries = await getCommunityEntries()

  return <RoadmapClient entries={communityEntries} />
}
