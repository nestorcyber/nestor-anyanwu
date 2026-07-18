import type { Metadata } from "next"
import GalleryPageClient from "./gallery-client"

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

export default function Page() {
  return <GalleryPageClient />
}
