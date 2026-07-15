export interface JourneyItem {
  id: number
  title: string
  organization: string
  role?: string
  date: string
  description: string
  type: "work" | "volunteer" | "membership" | "milestone"
  details?: string[]
  images?: string[]
}

export interface ProjectItem {
  title: string
  description: string
  technologies: string[]
  links: {
    demo?: string
  }
}

export const journeyTimeline: JourneyItem[] = [

  // ── May 2026 ──
  {
    id: 26,
    title: "Event Logistics",
    organization: "IEEE FUTO Student Branch",
    role: "Event Logistics",
    date: "May 2026 - Present",
    description: "Supporting IEEE FUTO Student Branch events through logistics coordination and on-ground event management.",
    type: "volunteer",
    details: ["Event Logistics", "IEEE", "Engineering Community"]
  },

  // ── Feb 2026 ──
  {
    id: 6,
    title: "Progress Tracking Lead",
    organization: "The Investment Society FUTO",
    date: "Feb 2026 - Present",
    description: "Leading progress tracking initiatives for The Investment Society at FUTO, helping students understand and engage with investment opportunities.",
    type: "work",
    details: ["Progress Management", "Student Engagement", "Financial Education"]
  },

  // ── Dec 2025 ──
  {
    id: 1,
    title: "Director Of Information Communication Technology",
    organization: "NACOS Federal University of Technology Owerri",
    date: "Dec 2025 - Present",
    description: "Leading digital strategy and technological infrastructure for the Nigeria Association of Computing Students chapter at FUTO, overseeing digital initiatives and community engagement.",
    type: "work",
    details: ["ICT Strategy & Management", "Community Engagement", "Digital Infrastructure"],
    images: ["https://hebbkx1anhila5yf.public.blob.vercel-storage.com/vol-ehxuFInSlnE81JZZijj6Bgoz9s2kcW.jpeg"]
  },
  {
    id: 2,
    title: "Director Of Information Communication Technology",
    organization: "Nigeria Association of Computing Students (NACOS National)",
    date: "Dec 2025 - Present",
    description: "Directing information communication technology initiatives for NACOS National, supporting thousands of computing students across Nigeria.",
    type: "work",
    details: ["National ICT Strategy", "Technology Leadership", "Community Support"]
  },
  {
    id: 5,
    title: "Campus Ambassador",
    organization: "Cowrywise",
    date: "Dec 2025 - Present",
    description: "Promoting financial technology and investment literacy among students, helping young Nigerians develop better financial habits through Cowrywise platform.",
    type: "work",
    details: ["Financial Literacy", "Community Outreach", "Brand Advocacy"]
  },
  {
    id: 25,
    title: "Media Team",
    organization: "Federal University of Technology Owerri (FUTO)",
    role: "Media Team",
    date: "Dec 2025 - Present",
    description: "Contributing to FUTO's official media team, supporting documentation, photography, and visual communications for university events.",
    type: "volunteer",
    details: ["Photography", "Media", "Documentation"]
  },
  {
    id: 8,
    title: "Emerging Leaders Conference",
    organization: "Guardians of the Nation International (GOTNI)",
    role: "Media Team",
    date: "Dec 2025",
    description: "Served on the Media Team for the Emerging Leaders Conference, capturing impactful moments and supporting the digital documentation of this leadership event.",
    type: "volunteer",
    images: ["/placeholder.svg?height=600&width=800"]
  },

  // ── Nov 2025 ──
  {
    id: 9,
    title: "Edensprime Hospitality Summit",
    organization: "FLE Global",
    role: "Event Setup",
    date: "Nov 2025",
    description: "Contributed to the success of the Edensprime Hospitality Summit through dedicated event setup and coordination.",
    type: "volunteer",
    images: [
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/eden2-sUzI0wvGmZMjB5UUP911IAB6WvBM5c.jpg",
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/eden3%280%29-Md3eT61Brp60MhmfTcGcfxvEaFIHqs.jpg",
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/eden5-LDykBdjx1JiJvGYDIdliITuBi0V8Ke.jpg",
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/eden1-iePEIbrkoW7wba4cbBoCLfkFEsqQTU.jpg"
    ]
  },
  {
    id: 11,
    title: "Faith life, Leadership & Entrepreneurship (FLE) Conference",
    organization: "FLE Global",
    role: "Event Setup",
    date: "Nov 2025",
    description: "Supported the FLE Conference by managing event setup logistics. Worked behind the scenes to create a seamless environment for leadership and entrepreneurship discussions.",
    type: "volunteer",
    images: [
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/fle3%280%29-CFKUWQDj8dfMZ5zkDTF9IEEXC6zDID.jpg",
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/fle2%280%29-FfRbgx2cSla1HuEuvaPzlOe8rKfEcm.jpg",
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/fle4-n7IdoFLGvctWYMK2ZspbSaqYEJz6n7.jpg",
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/fle1%280%29-RFztiDFA8wlZ5TUikrNKon6EVYY0te.jpg"
    ]
  },
  {
    id: 12,
    title: "DevFest Owerri 2025",
    organization: "Google Developer Groups Owerri",
    role: "Major Designer & Events Support",
    date: "Nov 2025",
    description: "Supported the largest developer festival in South-East Nigeria through major design contributions and event logistics. Collaborated with the team to craft visual assets and manage event organization.",
    type: "volunteer",
    images: ["https://hebbkx1anhila5yf.public.blob.vercel-storage.com/dev-nnewBVnGcwatonVCQKc9zTtMdshDoM.jpg"]
  },
  {
    id: 13,
    title: "Gold In Real Estate Conference",
    organization: "Gold In Real Estate",
    role: "Media Team & Welfare Team",
    date: "Nov 2025",
    description: "Served on both the Media and Welfare teams, capturing key moments of the conference while ensuring the comfort of guests and speakers.",
    type: "volunteer"
  },

  // ── Aug–Sep 2025 ──
  {
    id: 10,
    title: "FUTO Alumni Homecoming 2025",
    organization: "FUTO Alumni Association",
    role: "Media and Photography",
    date: "Aug 2025",
    description: "Captured the memorable moments from FUTO Alumni Homecoming 2025 through professional media and photography, documenting networking panels and reunions.",
    type: "volunteer",
    images: [
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/f4%280%29-e7Yahcsw3qQbcQLNweaiCS5rzoAVvv.jpg",
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/f3%280%29-0OUNedcByaDnTaTWc7tAWWQQ2E60ff.jpg",
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/f2%280%29-pBS7ttoTwcS5IQq7BxPQga9W14pDXS.jpg",
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/f1%280%29-wdxseBoOzK6wN6TpiXjYnUVh67MS1C.jpg"
    ]
  },
  {
    id: 14,
    title: "Tech Nexus FUTO",
    organization: "Google Developer Group on Campus FUTO",
    role: "Design, Event Setup and Photography",
    date: "Aug 2025",
    description: "Participated in Tech Nexus, a tech community event at FUTO, contributing to event design, setup, and photography.",
    type: "volunteer"
  },
  {
    id: 24,
    title: "Front Desk",
    organization: "AWS Cloud Club, FUTO",
    role: "Front Desk",
    date: "Aug 2025 - Sep 2025",
    description: "Served at the front desk for AWS Cloud Club FUTO events, managing attendee registration and providing on-site coordination support.",
    type: "volunteer",
    details: ["Event Coordination", "Cloud Community", "AWS"]
  },

  // ── Jul 2025 ──
  {
    id: 23,
    title: "Graphic Designer",
    organization: "GDG on Campus – Federal University of Technology, Owerri",
    role: "Graphic Designer",
    date: "Jul 2025 - Present",
    description: "Designing visual content and brand communications for GDG on Campus FUTO, supporting student developer community events.",
    type: "volunteer",
    details: ["Visual Design", "Campus Community", "GDG"]
  },

  // ── Jun 2025 ──
  {
    id: 28,
    title: "Graphic Designer",
    organization: "Hack4Futo",
    role: "Graphic Designer",
    date: "Jun 2025 - Present",
    description: "Creating design assets and visual branding for Hack4Futo, a student-driven hackathon and innovation community at FUTO.",
    type: "volunteer",
    details: ["Hackathon Design", "Branding", "Student Innovation"]
  },

  // ── May 2024 ──
  {
    id: 4,
    title: "Information Technology Consultant",
    organization: "Nobelton Consults",
    date: "May 2024 - Present",
    description: "Providing strategic IT consulting services, helping businesses navigate technology challenges and implement effective technological solutions.",
    type: "work",
    details: ["IT Strategy", "System Implementation", "Technical Advisory"]
  },

  // ── Dec 2024 ──
  {
    id: 27,
    title: "Graphic Designer",
    organization: "CMX",
    role: "Graphic Designer",
    date: "Dec 2024 - Present",
    description: "Designing visual content and community assets for CMX, a global community management network.",
    type: "volunteer",
    details: ["Graphic Design", "Community Management", "CMX"]
  },

  // ── Sep 2024 ──
  {
    id: 3,
    title: "Graphic Designer",
    organization: "GDG Owerri (Google Developer Group)",
    date: "Sep 2024 - Present",
    description: "Creating compelling visual designs and brand assets for Google Developer Group initiatives, helping shape the visual identity of community events and communications.",
    type: "work",
    details: ["Visual Design", "Brand Identity", "Event Graphics"],
    images: ["https://hebbkx1anhila5yf.public.blob.vercel-storage.com/dev-nnewBVnGcwatonVCQKc9zTtMdshDoM.jpg"]
  },
  {
    id: 22,
    title: "Graphic Designer",
    organization: "GDG Owerri (Volunteering)",
    role: "Graphic Designer",
    date: "Sep 2024 - Present",
    description: "Creating visual assets, branding materials, and design support for Google Developer Group Owerri events and community initiatives.",
    type: "volunteer",
    details: ["Graphic Design", "Branding", "Event Graphics"]
  },

  // ── Jan 2023 ──
  {
    id: 7,
    title: "Graphic Designer",
    organization: "Nobelton Consults",
    date: "Jan 2023 - Feb 2024",
    description: "Designed visual content and branding materials, creating compelling graphics for marketing and communications.",
    type: "work",
    details: ["Graphic Design", "Visual Content", "Brand Development"]
  },

  // Memberships
  {
    id: 15,
    title: "Student Member",
    organization: "AAAI, Nigeria Chapter (Association for the Advancement of Artificial Intelligence)",
    date: "Nov 2024 - Present",
    description: "Active member of Africa's largest AI advocacy organization, contributing to AI advancement and research.",
    type: "membership",
    details: ["AI Research", "Technology Advancement", "Community"]
  },
  {
    id: 16,
    title: "Member",
    organization: "Internet Society, Nigeria Chapter",
    date: "Feb 2025 - Present",
    description: "Supporting internet accessibility, digital rights, and technological infrastructure development across Nigeria.",
    type: "membership",
    details: ["Internet Governance", "Digital Rights", "Accessibility"]
  },
  {
    id: 17,
    title: "Student Member",
    organization: "Fintech Association of Nigeria",
    date: "Nov 2024 - Present",
    description: "Engaged in fintech innovation, digital financial services, and the growth of financial technology in Nigeria.",
    type: "membership",
    details: ["Fintech Innovation", "Digital Finance", "Networking"]
  },
  {
    id: 18,
    title: "Member",
    organization: "Nigeria Computer Society (NCS)",
    date: "Jan 2025 - Present",
    description: "Active member of Nigeria's foremost ICT professional body, contributing to the advancement of computing in Nigeria.",
    type: "membership",
    details: ["ICT Professionalism", "Technology Policy", "Community Engagement"]
  },
  {
    id: 19,
    title: "Member",
    organization: "Nigeria Internet Registration Association (NIRA)",
    date: "Mar 2025 - Present",
    description: "Contributing to the governance, management, and development of Nigeria's internet domain infrastructure.",
    type: "membership",
    details: ["Domain Governance", "Internet Infrastructure", "Policy"]
  },
  {
    id: 20,
    title: "Member",
    organization: "Nigeria Association of Computing Students (NACOS) National",
    date: "Feb 2025 - Present",
    description: "Active national member of NACOS, supporting computing students across Nigeria through advocacy, capacity building, and innovation.",
    type: "membership",
    details: ["Student Advocacy", "Computing Community", "National Network"]
  },
  {
    id: 21,
    title: "Data Privacy Ambassador",
    organization: "Nigeria Data Protection Commission (NDPC)",
    date: "Apr 2025 - Present",
    description: "Advocating for data privacy awareness, digital rights, and NDPC compliance within tech communities and student groups.",
    type: "membership",
    details: ["Data Privacy", "Compliance Advocacy", "Digital Rights"]
  }
]

export const projects: ProjectItem[] = [
  {
    title: "DevFest Owerri 2025",
    description: "Major design contributor for Nigeria's largest developer festival in South-East. Supported design initiatives, managed creative assets, and contributed to event logistics and community coordination.",
    technologies: ["Graphic Design", "Community Building", "Branding", "Event Support"],
    links: { demo: "https://www.behance.net/nestorcyber" },
  },
  {
    title: "Build with AI",
    description: "Innovative platform designed to empower developers and creators with AI-driven tools and resources. Contributed to strategic design and community-focused features for seamless integration of AI capabilities.",
    technologies: ["AI Integration", "Platform Design", "Developer Experience", "Innovation"],
    links: {},
  },
  {
    title: "Tech Nexus FUTO",
    description: "Designed and coordinated event setup for Tech Nexus at FUTO, bringing together developers for knowledge sharing and networking. Managed photography and visual documentation.",
    technologies: ["Event Design", "Photography", "Branding", "Coordination"],
    links: {},
  },
]
