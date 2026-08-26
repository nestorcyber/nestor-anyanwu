import React from "react"
import Image from "next/image"
import type { JourneyItem } from "@/lib/content"
import {
  Calendar,
  HeartHandshake,
  MapPin,
  Camera,
  Palette,
  Code2,
  Users2,
  CalendarCheck2,
} from "lucide-react"

interface CommunityTimelineProps {
  timeline?: JourneyItem[]
}

function getMilestoneIcon(item: JourneyItem) {
  const text = `${item.title} ${item.role || ""} ${item.organization || ""} ${item.details?.join(" ") || ""}`.toLowerCase()
  if (text.includes("media") || text.includes("photo") || text.includes("camera") || text.includes("video")) {
    return Camera
  }
  if (text.includes("design") || text.includes("brand") || text.includes("visual") || text.includes("graphic")) {
    return Palette
  }
  if (text.includes("ict") || text.includes("tech") || text.includes("code") || text.includes("developer") || text.includes("web") || text.includes("software") || text.includes("cloud")) {
    return Code2
  }
  if (text.includes("logistics") || text.includes("setup") || text.includes("event") || text.includes("summit") || text.includes("conference") || text.includes("stage") || text.includes("front desk")) {
    return CalendarCheck2
  }
  if (text.includes("lead") || text.includes("community") || text.includes("director") || text.includes("chapter") || text.includes("ambassador")) {
    return Users2
  }
  return HeartHandshake
}

const DEFAULT_TIMELINE: JourneyItem[] = [
  {
    id: "26",
    title: "IEEE FUTO Student Branch",
    organization: "IEEE FUTO",
    role: "Event Logistics & Technical Coordination",
    date: "May 2026 - Present",
    description:
      "Supporting IEEE FUTO Student Branch through logistics coordination, technical setup, and on-ground event management for student engineering symposiums.",
    type: "volunteer",
    details: ["Event Logistics", "Technical Support", "Engineering Community"],
  },
  {
    id: "1",
    title: "Director Of Information Communication Technology",
    organization: "NACOS Federal University of Technology Owerri",
    role: "Director of ICT",
    date: "Dec 2025 - Present",
    description:
      "Leading technological modernization, digital portals, and developer workshops for the student computing body.",
    type: "volunteer",
    details: ["ICT Strategy", "Web Systems", "Community Leadership"],
    images: ["https://hebbkx1anhila5yf.public.blob.vercel-storage.com/vol-ehxuFInSlnE81JZZijj6Bgoz9s2kcW.jpeg"],
  },
  {
    id: "8",
    title: "Emerging Leaders Conference (GOTNI)",
    organization: "Guardians of the Nation International",
    role: "Media & Digital Documentation",
    date: "Dec 2025",
    description:
      "Served on the media team capturing high-impact keynote sessions and managing digital distribution for executive leadership delegates.",
    type: "volunteer",
    details: ["Media Production", "Photography", "Leadership"],
  },
  {
    id: "9",
    title: "Edensprime Hospitality Summit",
    organization: "FLE Global",
    role: "Event Setup & Operations",
    date: "Nov 2025",
    description:
      "Contributed to event venue setup, audio visual flow, and delegate coordination for hospitality leaders.",
    type: "volunteer",
    details: ["Event Setup", "Logistics", "Operations"],
    images: ["https://hebbkx1anhila5yf.public.blob.vercel-storage.com/eden2-sUzI0wvGmZMjB5UUP911IAB6WvBM5c.jpg"],
  },
  {
    id: "11",
    title: "FLE Global Leadership & Entrepreneurship Conference",
    organization: "FLE Global",
    role: "Logistics & Stage Management",
    date: "Nov 2025",
    description:
      "Managed setup logistics and stage management, ensuring seamless execution across multi-speaker panels.",
    type: "volunteer",
    details: ["Stage Operations", "Speaker Relations", "Logistics"],
    images: ["https://hebbkx1anhila5yf.public.blob.vercel-storage.com/fle3%280%29-CFKUWQDj8dfMZ5zkDTF9IEEXC6zDID.jpg"],
  },
  {
    id: "12",
    title: "DevFest Owerri 2025",
    organization: "Google Developer Groups (GDG) Owerri",
    role: "Major Designer & Events Support",
    date: "Oct 2025 - Nov 2025",
    description:
      "Engineered comprehensive event visual identity, keynote slides, and promotional assets for 1,500+ attendees.",
    type: "volunteer",
    details: ["Visual Design", "Developer Relations", "Event Staging"],
    images: ["https://hebbkx1anhila5yf.public.blob.vercel-storage.com/dev-nnewBVnGcwatonVCQKc9zTtMdshDoM.jpg"],
  },
  {
    id: "10",
    title: "FUTO Alumni Homecoming 2025",
    organization: "FUTO Alumni Association",
    role: "Media & Photography",
    date: "Aug 2025",
    description:
      "Captured milestone moments, networking roundtables, and leadership honors for global alumni delegations.",
    type: "volunteer",
    details: ["Photography", "Media Coverage", "Alumni Relations"],
    images: ["https://hebbkx1anhila5yf.public.blob.vercel-storage.com/f4%280%29-e7Yahcsw3qQbcQLNweaiCS5rzoAVvv.jpg"],
  },
  {
    id: "24",
    title: "AWS Cloud Club FUTO",
    organization: "AWS Cloud Club",
    role: "Front Desk & Attendee Coordination",
    date: "Aug 2025 - Sep 2025",
    description:
      "Managed attendee check-in, workshop logistics, and cloud practitioners community engagement.",
    type: "volunteer",
    details: ["Event Coordination", "Cloud Community", "AWS"],
  },
  {
    id: "28",
    title: "Hack4Futo Hackathon",
    organization: "Hack4Futo Innovation Community",
    role: "Graphic Designer & Brand Lead",
    date: "Jun 2025 - Present",
    description:
      "Creating promotional graphics, track banners, and hacker visual guides for university student builders.",
    type: "volunteer",
    details: ["Hackathon Branding", "Visual Design", "Student Builders"],
  },
]

export default function CommunityTimeline({ timeline = DEFAULT_TIMELINE }: CommunityTimelineProps) {
  const displayItems = timeline && timeline.length > 0 ? timeline : DEFAULT_TIMELINE

  return (
    <section id="timeline" className="w-full min-h-[calc(100svh-4rem)] md:min-h-[640px] h-auto py-16 md:py-24 border-b border-border/70 bg-slate-50/60 dark:bg-slate-900/30 flex flex-col justify-center relative overflow-hidden">
      {/* Background ambient light */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[600px] h-[600px] bg-[#0075ff]/5 dark:bg-[#0075ff]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="site-container relative z-10 space-y-12">
        {/* Centered Section Header */}
        <div className="text-center flex flex-col items-center justify-center space-y-3 mx-auto max-w-3xl pb-2">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-foreground tracking-tight font-heading">
            Community &amp; Volunteering <span className="text-[#0075ff]">Roadmap</span>
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground font-normal leading-relaxed text-center max-w-2xl">
            A continuous chronological roadmap tracking grassroots leadership, technical volunteer engagements, and on-ground impact.
          </p>
          <div className="w-14 h-1 bg-[#0075ff] rounded-full mt-2" />
        </div>

        {/* Road Timeline Container */}
        <div className="relative max-w-4xl mx-auto pt-4 pb-2">
          {/* Vertical Highway Road Track (Left Side) */}
          <div className="absolute left-5 sm:left-7 md:left-9 top-4 bottom-8 w-6 sm:w-7 md:w-8 -translate-x-1/2 bg-slate-900 dark:bg-slate-950 border-x-2 border-slate-700/80 dark:border-slate-800 rounded-full shadow-inner flex items-center justify-center pointer-events-none overflow-hidden z-0">
            {/* Road Center Dashed Lane Divider */}
            <div className="w-[2px] h-full bg-[repeating-linear-gradient(to_bottom,#0075ff_0,#0075ff_14px,transparent_14px,transparent_28px)] opacity-80" />
          </div>

          {/* Road Milestones Items */}
          <div className="space-y-10 sm:space-y-12 relative z-10">
            {displayItems.map((item, idx) => {
              const hasImage = item.images && item.images.length > 0 && item.images[0] && !item.images[0].includes("placeholder")
              const MilestoneIcon = getMilestoneIcon(item)

              return (
                <div
                  key={item.id || idx}
                  className="relative flex items-start group"
                >
                  {/* Road Milestone Waypoint Node (Centered on Left Road Track) */}
                  <div className="absolute left-5 sm:left-7 md:left-9 -translate-x-1/2 top-4 z-20">
                    <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-[#0B1C2C] text-[#0075ff] flex items-center justify-center shadow-[0_0_18px_rgba(0,117,255,0.45)] border-2 border-[#0075ff] transition-transform duration-300 group-hover:scale-110 group-hover:bg-[#0075ff] group-hover:text-white">
                      <MilestoneIcon className="w-5 h-5 stroke-[2]" />
                    </div>
                  </div>

                  {/* Horizontal Connector Branch (from road to card) */}
                  <div className="absolute left-5 sm:left-7 md:left-9 top-9 w-8 sm:w-10 md:w-12 h-[2px] bg-gradient-to-r from-[#0075ff] to-[#0075ff]/40 pointer-events-none z-10" />

                  {/* Milestone Card Container (Aligned on the Right of Road) */}
                  <div className="w-full pl-14 sm:pl-18 md:pl-22">
                    <article className="bg-white dark:bg-card border border-slate-200/90 dark:border-slate-800/90 hover:border-[#0075ff] rounded-2xl p-5 sm:p-6 shadow-xs hover:shadow-xl transition-all duration-300 space-y-4 relative">
                      {/* Left pointer notch pointing to the road */}
                      <div className="hidden sm:block absolute -left-2 top-4 w-0 h-0 border-y-[6px] border-y-transparent border-r-[8px] border-r-slate-200 dark:border-r-slate-800" />

                      {/* Header Row: Organization, Role, Date */}
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 pb-1 border-b border-slate-100 dark:border-slate-800/80">
                        <div className="space-y-0.5">
                          <span className="text-[11px] font-mono font-bold text-[#0075ff] uppercase tracking-wider block">
                            {item.organization}
                          </span>
                          <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-foreground font-heading tracking-tight group-hover:text-[#0075ff] transition-colors">
                            {item.title}
                          </h3>
                        </div>

                        <div className="flex items-center gap-2 self-start sm:self-center shrink-0">
                          <span className="inline-flex items-center gap-1 text-[11px] font-mono font-bold text-[#0075ff] px-2.5 py-1 rounded-md bg-[#0075ff]/10 border border-[#0075ff]/20 whitespace-nowrap">
                            <Calendar className="w-3 h-3" />
                            <span>{item.date}</span>
                          </span>
                        </div>
                      </div>

                      {/* Role if distinct from Title */}
                      {item.role && item.role !== item.title && (
                        <p className="text-xs font-semibold text-slate-600 dark:text-slate-300">
                          Role: <span className="text-foreground">{item.role}</span>
                        </p>
                      )}

                      {/* Photo if available */}
                      {hasImage && (
                        <div className="relative aspect-[16/9] max-h-[300px] rounded-xl overflow-hidden bg-slate-900 border border-slate-200 dark:border-slate-800">
                          <Image
                            src={item.images![0]}
                            alt={item.title}
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                            sizes="(max-width: 768px) 100vw, 650px"
                          />
                        </div>
                      )}

                      {/* Description */}
                      <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
                        {item.description}
                      </p>

                      {/* Details / Skills Tag Chips */}
                      {item.details && item.details.length > 0 && (
                        <div className="flex flex-wrap items-center gap-1.5 pt-2 border-t border-slate-100 dark:border-slate-800/80">
                          {item.details.map((tag, tIdx) => (
                            <span
                              key={tIdx}
                              className="px-2.5 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800/90 text-slate-600 dark:text-slate-300 text-[11px] font-medium"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </article>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
