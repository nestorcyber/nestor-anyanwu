import React from "react"
import Link from "next/link"
import Image from "next/image"
import { ArrowRight, BookOpen, Calendar, Sparkles } from "lucide-react"

export interface CommunityStoryItem {
  id: string
  title: string
  excerpt: string
  coverImage: string
  date: string
  organization?: string
  journalSlug?: string
  readTime?: string
}

interface CommunityStoriesProps {
  stories?: CommunityStoryItem[]
}

const DEFAULT_STORIES: CommunityStoryItem[] = [
  {
    id: "story-1",
    title: "Behind the Scenes of DevFest Owerri: Building Stage Identity for 1,500+ Attendees",
    excerpt:
      "A deep dive into the design systems, stage LED screen resolutions, and visual branding challenges solved while volunteering as Lead Brand Designer for South-East Nigeria's largest tech gathering.",
    coverImage: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/dev-nnewBVnGcwatonVCQKc9zTtMdshDoM.jpg",
    date: "Dec 2025",
    organization: "GDG Owerri",
    journalSlug: "devfest-owerri-2025-branding-case-study",
    readTime: "5 min read",
  },
  {
    id: "story-2",
    title: "Scaling University Tech Communities: Lessons from Directing ICT at NACOS FUTO",
    excerpt:
      "How open-source bootcamps, structured student mentorship, and modern web portals can bridge the gap between academic theory and industry software engineering standards.",
    coverImage: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/vol-ehxuFInSlnE81JZZijj6Bgoz9s2kcW.jpeg",
    date: "Jan 2026",
    organization: "NACOS FUTO",
    journalSlug: "building-digital-infrastructure-for-computing-students",
    readTime: "4 min read",
  },
  {
    id: "story-3",
    title: "Grassroots Operations: Logistics and Crisis Resolution at Multi-Track Conferences",
    excerpt:
      "Real-world takeaways from coordinating ground logistics, audiovisual equipment, and speaker flows across hospitality and leadership summits.",
    coverImage: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/fle3%280%29-CFKUWQDj8dfMZ5zkDTF9IEEXC6zDID.jpg",
    date: "Nov 2025",
    organization: "FLE Global",
    journalSlug: "event-logistics-leadership-summit-takeaways",
    readTime: "3 min read",
  },
]

export default function CommunityStories({ stories = DEFAULT_STORIES }: CommunityStoriesProps) {
  const displayStories = stories && stories.length > 0 ? stories : DEFAULT_STORIES

  return (
    <section id="stories" className="w-full min-h-[calc(100svh-4rem)] md:min-h-[640px] h-auto py-16 md:py-24 border-b border-border/70 bg-white dark:bg-background flex flex-col justify-center">
      <div className="site-container space-y-12">
        
        {/* Centered Section Header */}
        <div className="text-center flex flex-col items-center justify-center space-y-3 mx-auto max-w-3xl pb-2">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-foreground tracking-tight font-heading">
            Community <span className="text-[#0075ff]">Stories</span> &amp; Reflections
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground font-normal leading-relaxed text-center max-w-2xl">
            First-hand reflections, operational breakdowns, and technical case studies written during my volunteer journey.
          </p>
          <div className="w-14 h-1 bg-[#0075ff] rounded-full mt-2" />
        </div>

        {/* Stories Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {displayStories.map((story) => {
            const destination = story.journalSlug ? `/journal/${story.journalSlug}` : "/journal"
            return (
              <article
                key={story.id}
                className="group rounded-3xl bg-slate-50 dark:bg-card border border-border/80 hover:border-[#0075ff] overflow-hidden flex flex-col justify-between shadow-xs hover:shadow-xl transition-all duration-300"
              >
                <div>
                  {/* Fixed Aspect Ratio Image Container */}
                  <div className="relative aspect-[16/10] overflow-hidden bg-slate-900 border-b border-border/60">
                    <Image
                      src={story.coverImage}
                      alt={story.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 400px"
                    />
                    {story.organization && (
                      <div className="absolute top-3 left-3 px-2.5 py-1 rounded-md text-[11px] font-mono font-bold bg-[#0075ff] text-white shadow-xs">
                        {story.organization}
                      </div>
                    )}
                  </div>

                  {/* Body Content */}
                  <div className="p-6 space-y-3">
                    <div className="flex items-center justify-between text-xs font-mono text-slate-500 dark:text-slate-400">
                      <span className="inline-flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5 text-[#0075ff]" />
                        {story.date}
                      </span>
                      {story.readTime && <span>{story.readTime}</span>}
                    </div>

                    <h3 className="text-lg font-bold text-slate-900 dark:text-foreground font-heading tracking-tight leading-snug group-hover:text-[#0075ff] transition-colors line-clamp-2">
                      {story.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-slate-600 dark:text-muted-foreground leading-relaxed font-normal line-clamp-3">
                      {story.excerpt}
                    </p>
                  </div>
                </div>

                {/* Footer Read Action */}
                <div className="p-6 pt-0">
                  <Link
                    href={destination}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0075ff] hover:text-[#005cd9] transition-colors group-hover:translate-x-0.5 transition-transform"
                  >
                    <span>Read Full Story</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </article>
            )
          })}
        </div>

      </div>
    </section>
  )
}
