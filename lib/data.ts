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
  // Work Experience
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
    id: 4,
    title: "Information Technology Consultant",
    organization: "Nobelton Consults",
    date: "May 2024 - Present",
    description: "Providing strategic IT consulting services, helping businesses navigate technology challenges and implement effective technological solutions.",
    type: "work",
    details: ["IT Strategy", "System Implementation", "Technical Advisory"]
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
    id: 6,
    title: "Progress Tracking Lead",
    organization: "The Investment Society FUTO",
    date: "Feb 2026 - Present",
    description: "Leading progress tracking initiatives for The Investment Society at FUTO, helping students understand and engage with investment opportunities.",
    type: "work",
    details: ["Progress Management", "Student Engagement", "Financial Education"]
  },
  {
    id: 7,
    title: "Graphic Designer",
    organization: "Nobelton Consults",
    date: "Jan 2023 - Feb 2024",
    description: "Designed visual content and branding materials, creating compelling graphics for marketing and communications.",
    type: "work",
    details: ["Graphic Design", "Visual Content", "Brand Development"]
  },

  // Volunteering & Events
  {
    id: 8,
    title: "Emerging Leaders Conference",
    organization: "Guardians of the Nation International (GOTNI)",
    role: "Media Team",
    date: "Dec 2025",
    description: "Served on the Media Team for the Emerging Leaders Conference, capturing impactful moments and supporting the digital documentation of this transformative leadership event.",
    type: "volunteer",
    images: [
      "/placeholder.svg?height=600&width=800"
    ]
  },
  {
    id: 9,
    title: "Edensprime Hospitality Summit",
    organization: "FLE Global",
    role: "Event Setup",
    date: "Nov 2025",
    description: "Contributed to the success of the Edensprime Hospitality Summit through dedicated event setup and coordination, ensuring a welcoming and professional atmosphere for all attendees.",
    type: "volunteer",
    images: [
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/eden2-sUzI0wvGmZMjB5UUP911IAB6WvBM5c.jpg",
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/eden3%280%29-Md3eT61Brp60MhmfTcGcfxvEaFIHqs.jpg",
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/eden5-LDykBdjx1JiJvGYDIdliITuBi0V8Ke.jpg",
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/eden1-iePEIbrkoW7wba4cbBoCLfkFEsqQTU.jpg"
    ]
  },
  {
    id: 10,
    title: "FUTO Alumni Homecoming 2025",
    organization: "FUTO Alumni Association",
    role: "Media and Photography",
    date: "Aug 2025",
    description: "Captured the memorable moments from FUTO Alumni Homecoming 2025 through professional media and photography. Documented the celebration, networking, and community bonding of alumni.",
    type: "volunteer",
    images: [
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/f4%280%29-e7Yahcsw3qQbcQLNweaiCS5rzoAVvv.jpg",
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/f3%280%29-0OUNedcByaDnTaTWc7tAWWQQ2E60ff.jpg",
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/f2%280%29-pBS7ttoTwcS5IQq7BxPQga9W14pDXS.jpg",
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/f1%280%29-wdxseBoOzK6wN6TpiXjYnUVh67MS1C.jpg"
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
    description: "Served on both the Media and Welfare teams, capturing key moments of the conference while ensuring the comfort and well-being of guests and speakers.",
    type: "volunteer"
  },
  {
    id: 14,
    title: "Tech Nexus FUTO",
    organization: "Google Developer Group on Campus FUTO",
    role: "Design, Event Setup and Photography",
    date: "Aug 2025",
    description: "Participated in Tech Nexus, a dynamic tech community event at FUTO, contributing to event design, setup, and photography.",
    type: "volunteer"
  },

  // Memberships
  {
    id: 15,
    title: "Student Member",
    organization: "AAAI, Nigeria Chapter (Association for the Advancement of Artificial Intelligence)",
    date: "Feb 2026 - Present",
    description: "Active member of Africa's largest AI advocacy organization, contributing to AI advancement and research.",
    type: "membership"
  },
  {
    id: 16,
    title: "Member",
    organization: "Internet Society Nigeria Chapter",
    date: "Feb 2026 - Present",
    description: "Supporting internet accessibility, digital rights, and technological infrastructure development in Nigeria.",
    type: "membership"
  },
  {
    id: 17,
    title: "Student Member",
    organization: "Fintech Association Of Nigeria",
    date: "Feb 2026 - Present",
    description: "Engaged in fintech innovation and digital financial services development.",
    type: "membership"
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
