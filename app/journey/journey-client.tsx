"use client"

import { useState } from "react"
import { journeyTimeline, JourneyItem } from "@/lib/data"
import Footer from "@/components/footer"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar, Briefcase, Award, GraduationCap, ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"
import Image from "next/image"

export default function JourneyPage() {
  const [activeFilter, setActiveFilter] = useState<"all" | "work" | "membership">("all")

  const filteredTimeline = journeyTimeline.filter(
    (item) => activeFilter === "all"
      ? item.type !== "volunteer"
      : item.type === activeFilter
  )

  return (
    <>
      <main className="min-h-screen bg-background pt-8 pb-20">
        <div className="max-w-6xl mx-auto px-4 md:px-8">
          {/* Header */}
          <div className="mb-16 text-center md:text-left">
            <p className="text-accent text-xs md:text-sm font-bold tracking-widest mb-3 uppercase">
              THE CHRONICLES OF IMPACT
            </p>
            <h1 className="text-3xl md:text-6xl font-sans font-black text-primary mb-6 uppercase tracking-tight">
              Nestor's Journey & Legacy
            </h1>
            <p className="text-sm md:text-lg text-foreground/80 font-medium max-w-3xl leading-relaxed">
              A comprehensive timeline of leadership roles, professional milestones, community contributions, and academic engagements that define Nestor's path.
            </p>
          </div>

          {/* Filter Tabs */}
          <div className="flex flex-wrap gap-2 mb-12 justify-center md:justify-start border-b border-border pb-6">
            <Button
              variant={activeFilter === "all" ? "default" : "outline"}
              onClick={() => setActiveFilter("all")}
              className="rounded-full text-xs md:text-sm"
            >
              All
            </Button>
            <Button
              variant={activeFilter === "work" ? "default" : "outline"}
              onClick={() => setActiveFilter("work")}
              className="rounded-full text-xs md:text-sm"
            >
              Professional Roles
            </Button>
            <Button
              variant={activeFilter === "membership" ? "default" : "outline"}
              onClick={() => setActiveFilter("membership")}
              className="rounded-full text-xs md:text-sm"
            >
              Affiliations & Memberships
            </Button>
          </div>

          {/* Timeline Layout */}
          <div className="relative border-l-2 border-primary/20 ml-4 md:ml-6 space-y-12">
            {filteredTimeline.map((item, idx) => (
              <TimelineCard key={item.id} item={item} idx={idx} />
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}

function TimelineCard({ item, idx }: { item: JourneyItem; idx: number }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  const handlePrevImage = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (item.images && item.images.length > 0) {
      setCurrentImageIndex((prev) => (prev - 1 + item.images!.length) % item.images!.length)
    }
  }

  const handleNextImage = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (item.images && item.images.length > 0) {
      setCurrentImageIndex((prev) => (prev + 1) % item.images!.length)
    }
  }

  const getIcon = () => {
    switch (item.type) {
      case "work":
        return <Briefcase className="w-5 h-5 text-white" />
      case "volunteer":
        return <Award className="w-5 h-5 text-white" />
      case "membership":
        return <GraduationCap className="w-5 h-5 text-white" />
      default:
        return <Calendar className="w-5 h-5 text-white" />
    }
  }

  const getTypeBadge = () => {
    switch (item.type) {
      case "work":
        return "Professional Role"
      case "volunteer":
        return "Volunteering & Leadership"
      case "membership":
        return "Professional Membership"
      default:
        return "Milestone"
    }
  }

  return (
    <div className="relative pl-8 md:pl-12 group">
      {/* Icon node on timeline */}
      <span className="absolute -left-[17px] top-1.5 flex h-8 w-8 items-center justify-center rounded-full bg-primary ring-4 ring-background transition-transform duration-300 group-hover:scale-110">
        {getIcon()}
      </span>

      {/* Main card */}
      <Card className="overflow-hidden border border-border hover:border-accent transition-all duration-300 bg-secondary flex flex-col md:flex-row gap-6 p-6">
        {/* Carousel if images exist */}
        {item.images && item.images.length > 0 && (
          <div className="relative w-full md:w-80 h-52 md:h-auto rounded-lg overflow-hidden shrink-0 group/carousel">
            <Image
              src={item.images[currentImageIndex]}
              alt={item.title}
              fill
              className="object-cover"
            />
            {item.images.length > 1 && (
              <>
                <button
                  onClick={handlePrevImage}
                  className="absolute left-2 top-1/2 -translate-y-1/2 p-1.5 rounded-full bg-black/40 text-white hover:bg-black/60 transition-colors"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={handleNextImage}
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 rounded-full bg-black/40 text-white hover:bg-black/60 transition-colors"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
                <div className="absolute bottom-2 right-2 px-2 py-0.5 bg-black/60 text-[10px] text-white rounded font-bold">
                  {currentImageIndex + 1} / {item.images.length}
                </div>
              </>
            )}
          </div>
        )}

        {/* Content Section */}
        <div className="flex-1 flex flex-col justify-between">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className="text-[10px] font-sans font-bold tracking-wider uppercase text-accent bg-accent/10 px-2.5 py-0.5 rounded-full">
                {getTypeBadge()}
              </span>
              <span className="text-xs font-semibold text-muted-foreground flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5" />
                {item.date}
              </span>
            </div>

            <h3 className="text-xl md:text-2xl font-serif font-bold text-primary mb-1">
              {item.title}
            </h3>
            <p className="text-md text-foreground font-semibold mb-4">
              {item.organization}
            </p>
            <p className="text-sm text-foreground/80 leading-relaxed mb-4">
              {item.description}
            </p>
          </div>

          {/* Details / tags */}
          {item.details && item.details.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mt-auto pt-2">
              {item.details.map((detail, idx) => (
                <span
                  key={idx}
                  className="inline-block text-[11px] px-2.5 py-1 bg-primary/5 text-primary border border-primary/10 rounded-full font-medium"
                >
                  {detail}
                </span>
              ))}
            </div>
          )}
        </div>
      </Card>
    </div>
  )
}
