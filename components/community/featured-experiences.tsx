import React from "react"
import Image from "next/image"
import Link from "next/link"
import { MapPin, Calendar, ArrowRight, ExternalLink, CheckCircle2, Sparkles } from "lucide-react"

export interface FeaturedExperienceItem {
  id: string
  title: string
  organization: string
  role: string
  date: string
  location?: string
  coverImage: string
  description: string
  contributions: string[]
  skills: string[]
  externalUrl?: string
  slug?: string
}

interface FeaturedExperiencesProps {
  experiences?: FeaturedExperienceItem[]
}

const DEFAULT_EXPERIENCES: FeaturedExperienceItem[] = [
  {
    id: "devfest-2025",
    title: "DevFest Owerri 2025",
    organization: "Google Developer Groups (GDG) Owerri",
    role: "Major Designer & Events Support",
    date: "Oct 2025 - Nov 2025",
    location: "Owerri, Imo State",
    coverImage: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/dev-nnewBVnGcwatonVCQKc9zTtMdshDoM.jpg",
    description:
      "Directed end-to-end technical visual systems, stage production graphics, and marketing collateral for South-East Nigeria's premier developer gathering, serving 1,500+ attendees.",
    contributions: [
      "Crafted full event identity, stage screen graphics, speaker cards, and badge systems.",
      "Coordinated with media and technical teams during live panel discussions and keynotes.",
      "Engaged with 15+ student tech chapters to drive community registration and participation.",
    ],
    skills: ["Visual Design", "Event Production", "Brand Identity", "Developer Relations"],
    externalUrl: "https://gdg.community.dev/gdg-owerri/",
  },
  {
    id: "nacos-futo",
    title: "Computing Infrastructure & Digital Strategy",
    organization: "NACOS Federal University of Technology Owerri",
    role: "Director of ICT",
    date: "Dec 2025 - Present",
    location: "FUTO, Owerri",
    coverImage: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/vol-ehxuFInSlnE81JZZijj6Bgoz9s2kcW.jpeg",
    description:
      "Spearheading digital modernization, portal architecture, and technical workshops for computing students, creating direct pathways to software engineering mentorship.",
    contributions: [
      "Architected modern digital platforms to streamline student registration and departmental resources.",
      "Facilitated technical bootcamps in web engineering, Git workflows, and open-source collaboration.",
      "Coordinated executive communications and digital infrastructure across academic levels.",
    ],
    skills: ["ICT Strategy", "Community Mentorship", "Web Architecture", "Technical Leadership"],
  },
  {
    id: "fle-summit",
    title: "FLE Global Leadership Summit",
    organization: "FLE Global",
    role: "Event Operations & Setup Lead",
    date: "Nov 2025",
    location: "Owerri, Nigeria",
    coverImage: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/fle3%280%29-CFKUWQDj8dfMZ5zkDTF9IEEXC6zDID.jpg",
    description:
      "Managed setup logistics and ground coordination for a high-profile gathering of entrepreneurs, industry executives, and emerging leaders.",
    contributions: [
      "Orchestrated venue setup, audiovisual checks, and speaker hospitality flow.",
      "Managed crisis resolution and real-time schedule alignment across multi-track sessions.",
    ],
    skills: ["Event Operations", "Logistics", "Stage Management", "Cross-Functional Coordination"],
  },
  {
    id: "futo-homecoming",
    title: "FUTO Alumni Homecoming 2025",
    organization: "FUTO Alumni Association",
    role: "Media and Technical Documentation",
    date: "Aug 2025",
    location: "FUTO Engineering Complex",
    coverImage: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/f4%280%29-e7Yahcsw3qQbcQLNweaiCS5rzoAVvv.jpg",
    description:
      "Led digital documentation, photography, and session recording for distinguished alumni reunions, networking panels, and university development sessions.",
    contributions: [
      "Captured high-resolution media coverage for keynotes, award presentations, and alumni roundtables.",
      "Coordinated with institutional media teams for live distribution and post-event archives.",
    ],
    skills: ["Media Production", "Photography", "Documentation", "Stakeholder Relations"],
  },
]

export default function FeaturedExperiences({ experiences = DEFAULT_EXPERIENCES }: FeaturedExperiencesProps) {
  const displayItems = experiences && experiences.length > 0 ? experiences : DEFAULT_EXPERIENCES
  const [leadItem, ...supportingItems] = displayItems

  return (
    <section id="experiences" className="w-full min-h-[calc(100svh-4rem)] md:min-h-[640px] h-auto py-16 md:py-24 border-b border-border/70 bg-white dark:bg-background flex flex-col justify-center">
      <div className="site-container space-y-12">
        
        {/* Centered Section Header */}
        <div className="text-center flex flex-col items-center justify-center space-y-3 mx-auto max-w-3xl pb-2">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-foreground tracking-tight font-heading">
            Latest <span className="text-[#0075ff]">Community Activity</span>
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground font-normal leading-relaxed text-center max-w-2xl">
            In-depth highlights of recent conferences, technical leadership initiatives, community programs, and verified deliverables.
          </p>
          <div className="w-14 h-1 bg-[#0075ff] rounded-full mt-2" />
        </div>

        {/* 1. Large Asymmetric Lead Case Study Card */}
        {leadItem && (
          <article className="group rounded-3xl bg-slate-50 dark:bg-card border border-border/80 hover:border-[#0075ff] p-6 sm:p-8 lg:p-10 shadow-sm hover:shadow-xl transition-all duration-300">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              
              {/* Lead Image Container */}
              <div className="lg:col-span-6 relative aspect-[16/10] sm:aspect-[16/9] rounded-2xl overflow-hidden bg-slate-900 border border-border/60">
                <Image
                  src={leadItem.coverImage}
                  alt={leadItem.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 1024px) 100vw, 600px"
                />
                <div className="absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-mono font-bold bg-[#0075ff] text-white shadow-md">
                  FEATURED ENGAGEMENT
                </div>
              </div>

              {/* Lead Content */}
              <div className="lg:col-span-6 space-y-5">
                <div className="space-y-2">
                  <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-slate-500 dark:text-slate-400">
                    <span className="inline-flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-[#0075ff]" />
                      {leadItem.date}
                    </span>
                    {leadItem.location && (
                      <span className="inline-flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-[#0075ff]" />
                        {leadItem.location}
                      </span>
                    )}
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-foreground font-heading tracking-tight leading-tight group-hover:text-[#0075ff] transition-colors">
                    {leadItem.title}
                  </h3>

                  <p className="text-sm sm:text-base font-bold text-[#0075ff]">
                    {leadItem.role} &bull; {leadItem.organization}
                  </p>
                </div>

                <p className="text-sm sm:text-base text-slate-600 dark:text-muted-foreground leading-relaxed font-normal">
                  {leadItem.description}
                </p>

                {/* Key Contributions */}
                <div className="space-y-2 pt-2 border-t border-slate-200 dark:border-slate-800">
                  <span className="text-xs font-mono font-bold text-slate-900 dark:text-slate-200 uppercase tracking-wider">
                    Key Deliverables:
                  </span>
                  <ul className="space-y-1.5">
                    {leadItem.contributions.map((bullet, bIdx) => (
                      <li key={bIdx} className="flex items-start gap-2 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                        <CheckCircle2 className="w-4 h-4 text-[#0075ff] shrink-0 mt-0.5" />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Skills Pills & External Link */}
                <div className="flex flex-wrap items-center justify-between gap-4 pt-3">
                  <div className="flex flex-wrap items-center gap-1.5">
                    {leadItem.skills.map((skill, sIdx) => (
                      <span key={sIdx} className="px-2.5 py-1 rounded-md bg-[#0075ff]/10 text-[#0075ff] text-xs font-semibold">
                        {skill}
                      </span>
                    ))}
                  </div>

                  {leadItem.externalUrl && (
                    <a
                      href={leadItem.externalUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0075ff] hover:underline"
                    >
                      <span>Learn More</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>

              </div>
            </div>
          </article>
        )}

        {/* 2. Supporting Case Study Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {supportingItems.map((item) => (
            <article
              key={item.id}
              className="group rounded-3xl bg-slate-50 dark:bg-card border border-border/80 hover:border-[#0075ff] p-6 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
            >
              <div className="space-y-4">
                {/* Image */}
                <div className="relative aspect-[16/10] rounded-2xl overflow-hidden bg-slate-900 border border-border/60">
                  <Image
                    src={item.coverImage}
                    alt={item.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 400px"
                  />
                </div>

                <div className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs font-mono text-slate-500 dark:text-slate-400">
                    <span>{item.date}</span>
                    {item.location && <span>{item.location}</span>}
                  </div>

                  <h4 className="text-xl font-bold text-slate-900 dark:text-foreground font-heading tracking-tight group-hover:text-[#0075ff] transition-colors">
                    {item.title}
                  </h4>

                  <p className="text-xs font-semibold text-[#0075ff]">
                    {item.role} &bull; {item.organization}
                  </p>
                </div>

                <p className="text-xs sm:text-sm text-slate-600 dark:text-muted-foreground leading-relaxed font-normal">
                  {item.description}
                </p>

                {/* Bullets */}
                <div className="space-y-1 pt-2 border-t border-slate-200 dark:border-slate-800">
                  {item.contributions.slice(0, 2).map((c, cIdx) => (
                    <div key={cIdx} className="flex items-start gap-1.5 text-xs text-slate-600 dark:text-slate-300">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#0075ff] shrink-0 mt-0.5" />
                      <span>{c}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Skills */}
              <div className="flex flex-wrap items-center gap-1.5 pt-4 border-t border-slate-200 dark:border-slate-800">
                {item.skills.map((s, sIdx) => (
                  <span key={sIdx} className="px-2 py-0.5 rounded-md bg-[#0075ff]/10 text-[#0075ff] text-[11px] font-semibold">
                    {s}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>

      </div>
    </section>
  )
}
