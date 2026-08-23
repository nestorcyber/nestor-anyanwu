import type { Metadata } from "next"
import GalleryPageClient from "./gallery-client"
import { getGalleryImages } from "@/lib/content"

export const revalidate = 3600

export const metadata: Metadata = {
  title: "Gallery | Nestor Anyanwu (Nestor Cyber)",
  description: "Moments, people, projects, and experiences from my journey.",
  alternates: {
    canonical: "/gallery",
  },
  openGraph: {
    title: "Gallery | Nestor Anyanwu (Nestor Cyber)",
    description: "Moments, people, projects, and experiences from my journey.",
    url: "/gallery",
  },
  twitter: {
    title: "Gallery | Nestor Anyanwu (Nestor Cyber)",
    description: "Moments, people, projects, and experiences from my journey.",
  },
}

export default async function Page() {
  const images = await getGalleryImages()
  return <GalleryPageClient initialImages={images} />
}
