import React from "react"
import Image from "next/image"
import type { JourneyItem } from "@/lib/content"
import { Calendar, HeartHandshake, MapPin, Play, Sparkles } from "lucide-react"

interface CommunityTimelineProps {
  timeline?: JourneyItem[]
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
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#0075ff]/5 dark:bg-[#0075ff]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="site-container relative z-10 space-y-12">
        
        {/* Centered Section Header */}
        <div className="text-center flex flex-col items-center justify-center space-y-3 mx-auto max-w-3xl pb-2">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-foreground tracking-tight font-heading">
            Community &amp; Volunteering <span className="text-[#0075ff]">Milestones</span>
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground font-normal leading-relaxed text-center max-w-2xl">
            A chronological roadmap of community service, technical volunteer engagements, and grassroots advocacy.
          </p>
          <div className="w-14 h-1 bg-[#0075ff] rounded-full mt-2" />
        </div>

        {/* Timeline Track Container */}
        <div className="relative max-w-5xl mx-auto pt-4 pb-2">
          
          {/* Central Spine Line (Desktop) */}
          <div className="absolute left-6 md:left-1/2 top-4 bottom-8 w-[2px] -translate-x-1/2 bg-gradient-to-b from-[#0075ff] via-[#0075ff]/50 to-transparent pointer-events-none hidden md:block" />

          {/* Left-Aligned Spine Line (Mobile) */}
          <div className="absolute left-6 top-4 bottom-8 w-[2px] bg-gradient-to-b from-[#0075ff] via-[#0075ff]/50 to-transparent pointer-events-none md:hidden" />

          {/* Items */}
          <div className="space-y-10 md:space-y-14">
            {displayItems.map((item, idx) => {
              const isEven = idx % 2 === 0
              const hasImage = item.images && item.images.length > 0 && item.images[0] && !item.images[0].includes("placeholder")

              return (
                <div
                  key={item.id || idx}
                  className={`relative flex flex-col md:flex-row items-start md:items-center gap-6 md:gap-14 ${
                    isEven ? "md:flex-row" : "md:flex-row-reverse"
                  }`}
                >
                  {/* Card Block */}
                  <div className="w-full md:w-[calc(50%-2.5rem)] pl-14 sm:pl-16 md:pl-0">
                    <article className="group relative bg-white dark:bg-card border border-slate-200/90 dark:border-slate-800 hover:border-[#0075ff] rounded-2xl sm:rounded-3xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 space-y-4">
                      
                      {/* Notch (Desktop) */}
                      {isEven ? (
                        <div className="hidden md:block absolute -right-2.5 top-1/2 -translate-y-1/2 w-0 h-0 border-y-[9px] border-y-transparent border-l-[10px] border-l-white dark:border-l-card" />
                      ) : (
                        <div className="hidden md:block absolute -left-2.5 top-1/2 -translate-y-1/2 w-0 h-0 border-y-[9px] border-y-transparent border-r-[10px] border-r-white dark:border-r-card" />
                      )}

                      {/* Header */}
                      <div>
                        <span className="text-[11px] font-mono font-bold text-[#0075ff] uppercase tracking-wider">
                          {item.organization}
                        </span>
                        <h3 className="text-xl font-bold text-slate-900 dark:text-foreground font-heading tracking-tight group-hover:text-[#0075ff] transition-colors mt-0.5">
                          {item.title}
                        </h3>
                        {item.role && item.role !== item.title && (
                          <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 mt-0.5">
                            Role: {item.role}
                          </p>
                        )}
                      </div>

                      {/* Photo if available */}
                      {hasImage && (
                        <div className="relative aspect-[16/9] rounded-xl overflow-hidden bg-slate-900 border border-slate-200 dark:border-slate-800">
                          <Image
                            src={item.images![0]}
                            alt={item.title}
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                            sizes="(max-width: 768px) 100vw, 380px"
                          />
                        </div>
                      )}

                      {/* Description */}
                      <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
                        {item.description}
                      </p>

                      {/* Details / Skills Tag Chips */}
                      {item.details && item.details.length > 0 && (
                        <div className="flex flex-wrap items-center gap-1.5 pt-3 border-t border-slate-100 dark:border-slate-800">
                          {item.details.map((tag, tIdx) => (
                            <span
                              key={tIdx}
                              className="px-2.5 py-0.5 rounded-md bg-[#0075ff]/10 text-[#0075ff] text-[11px] font-medium"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}

                    </article>
                  </div>

                  {/* Central Node Badge */}
                  <div className="absolute left-6 md:left-1/2 top-0 md:top-1/2 -translate-x-1/2 -translate-y-0 md:-translate-y-1/2 z-20">
                    <div className="w-12 h-12 rounded-full bg-[#0B1C2C] text-[#0075ff] flex items-center justify-center shadow-[0_0_16px_rgba(0,117,255,0.3)] border-2 border-[#0075ff]/60 transition-transform duration-300 hover:scale-110">
                      <HeartHandshake className="w-5 h-5" />
                    </div>
                  </div>

                  {/* Opposite Side Date Badge (Desktop) */}
                  <div
                    className={`hidden md:flex w-[calc(50%-2.5rem)] items-center ${
                      isEven ? "justify-start pl-6" : "justify-end pr-6 text-right"
                    }`}
                  >
                    <span className="text-xs font-bold font-mono text-[#0075ff] tracking-wide px-3 py-1 rounded-md bg-[#0075ff]/10 border border-[#0075ff]/20">
                      {item.date}
                    </span>
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
