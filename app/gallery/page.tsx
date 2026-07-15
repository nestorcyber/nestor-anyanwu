import Image from "next/image"
import Footer from "@/components/footer"
import { journeyTimeline } from "@/lib/data"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Gallery - Journey & Community",
  description: "Visual collection of moments from my personal journey, events, and projects.",
}

export default function GalleryPage() {
  // Get all images from all journey items
  const allImages = journeyTimeline.flatMap((item) =>
    (item.images || []).map((img) => ({
      src: img,
      title: item.title,
      date: item.date,
    }))
  )

  return (
    <>
      <main className="min-h-screen bg-background pt-32 pb-20">
        <div className="max-w-6xl mx-auto px-4 md:px-8">
          {/* Header */}
          <div className="mb-16">
            <h1 className="text-2xl md:text-3xl font-sans font-bold text-primary mb-6 uppercase tracking-wide">Gallery</h1>
            <p className="text-sm md:text-base text-foreground max-w-3xl leading-relaxed">
              A visual collection of moments from volunteering experiences, community events, and meaningful projects that shaped my journey.
            </p>
          </div>

          {/* Gallery Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {allImages.map((image, idx) => (
              <div key={idx} className="group relative overflow-hidden rounded-lg bg-muted h-64">
                <Image
                  src={image.src}
                  alt={image.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-primary/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                  <h3 className="text-secondary font-bold text-sm">{image.title}</h3>
                  <p className="text-secondary/80 text-xs">{image.date}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
