import type { Metadata } from "next"
import CommunityPage, { type CommunityEvent } from "./community-client"
import { getCommunityEntries, getJourneyItems } from "@/lib/content"

export const revalidate = 10

export const metadata: Metadata = {
  title: "Community & Volunteering | Nestor Anyanwu (Nestor Cyber)",
  description: "Learn about Nestor Anyanwu's (Nestor Cyber) community building, tech advocacy, and volunteering efforts with NACOS, IEEE, and Google Developer Groups.",
  alternates: {
    canonical: "/community",
  },
  openGraph: {
    title: "Community & Volunteering | Nestor Anyanwu (Nestor Cyber)",
    description: "Learn about Nestor Anyanwu's (Nestor Cyber) community building, tech advocacy, and volunteering efforts with NACOS, IEEE, and Google Developer Groups.",
    url: "/community",
  },
  twitter: {
    title: "Community & Volunteering | Nestor Anyanwu (Nestor Cyber)",
    description: "Learn about Nestor Anyanwu's (Nestor Cyber) community building, tech advocacy, and volunteering efforts with NACOS, IEEE, and Google Developer Groups.",
  },
}

const ACCENTS = [
  "#2563eb",
  "#7c3aed",
  "#0891b2",
  "#d97706",
  "#059669",
  "#4f46e5",
  "#b45309",
  "#0284c7",
  "#f59e0b",
  "#10b981",
  "#6366f1",
  "#ec4899",
  "#0ea5e9",
]

export default async function Page() {
  const [entries, journey] = await Promise.all([getCommunityEntries(), getJourneyItems()])

  const fromEntries: CommunityEvent[] = entries.map((entry, i) => ({
    id: entry.id,
    title: entry.organization,
    role: entry.role,
    date: entry.duration,
    category: entry.tags[0] || "Community",
    description: entry.achievements[0] || entry.organization,
    tags: entry.tags,
    images: [entry.coverImage, ...entry.gallery].filter(
      (url) => url && !url.includes("placeholder")
    ),
    accent: ACCENTS[i % ACCENTS.length],
    href: `/community/${entry.slug}`,
  }))

  const fromJourney: CommunityEvent[] = journey
    .filter((item) => item.type === "volunteer")
    .map((item, i) => ({
      id: item.id,
      title: item.organization || item.title,
      role: item.role || item.title,
      date: item.date,
      category: item.details?.[0] || "Volunteer",
      description: item.description,
      tags: item.details || [],
      images: (item.images || []).filter((url) => url && !url.includes("placeholder")),
      accent: ACCENTS[(fromEntries.length + i) % ACCENTS.length],
    }))

  const events = fromEntries.length ? [...fromEntries, ...fromJourney] : fromJourney

  return <CommunityPage events={events} />
}
