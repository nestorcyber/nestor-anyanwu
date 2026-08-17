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
  id?: string
  slug?: string
  title: string
  category?: "Software" | "Web" | "Design" | "Branding" | "Automation" | "Open Source"
  description: string
  technologies: string[]
  role?: string
  image?: string
  status?: string
  links: {
    demo?: string
    caseStudy?: string
    github?: string
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

export interface ProjectItem {
  id?: string
  title: string
  category?: "Software" | "Web" | "Design" | "Branding" | "Automation" | "Open Source"
  description: string
  technologies: string[]
  role?: string
  image?: string
  status?: string
  links: {
    demo?: string
    caseStudy?: string
    github?: string
  }
}

export interface PortfolioStat {
  value: string
  label: string
  description?: string
}

export interface ServiceItem {
  id: string
  title: string
  description: string
  iconName: string
  ctaText: string
  ctaHref: string
}

export interface SkillItem {
  name: string
  experienceLevel?: string
  years?: string
  icon?: string
  iconProvider?: string
  iconName?: string
}

export interface SkillGroup {
  category: string
  skills: SkillItem[]
}

export interface CertificationItem {
  id: string
  title: string
  provider: string
  date: string
  credentialUrl?: string
}

export interface BrandPartnerItem {
  id: string
  name: string
  logoUrl: string
  websiteUrl?: string
}

export const fallbackBrandPartners: BrandPartnerItem[] = [
  {
    id: "nacos-futo",
    name: "NACOS FUTO",
    logoUrl: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/vol-ehxuFInSlnE81JZZijj6Bgoz9s2kcW.jpeg",
    websiteUrl: "https://nacos.org.ng",
  },
  {
    id: "gdg-owerri",
    name: "GDG Owerri",
    logoUrl: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/dev-nnewBVnGcwatonVCQKc9zTtMdshDoM.jpg",
    websiteUrl: "https://gdg.community.dev",
  },
  {
    id: "ieee-futo",
    name: "IEEE FUTO SB",
    logoUrl: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/about-ItCmRGacGKzMpQbnPfGLfUfLEwWn3i.jpg",
    websiteUrl: "https://ieee.org",
  },
  {
    id: "build-with-ai",
    name: "Build With AI",
    logoUrl: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/about-ItCmRGacGKzMpQbnPfGLfUfLEwWn3i.jpg",
  },
  {
    id: "devfest-owerri",
    name: "DevFest Owerri",
    logoUrl: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/dev-nnewBVnGcwatonVCQKc9zTtMdshDoM.jpg",
  },
]

export const portfolioStats: PortfolioStat[] = [
  {
    value: "2000+",
    label: "People Reached",
    description: "Computing students, developers, and tech leaders empowered through workshops, events, and digital platforms.",
  },
  {
    value: "25+",
    label: "Projects Completed",
    description: "Production software, web apps, brand design systems, and engineering deliverables.",
  },
  {
    value: "12+",
    label: "Organizations & Communities",
    description: "National bodies, student chapters, tech startups, and developer communities served and supported.",
  },
]

export const projects: ProjectItem[] = [
  {
    id: "devfest-owerri-2025-branding",
    slug: "devfest-owerri-2025-branding",
    title: "DevFest Owerri 2025 Branding",
    category: "Design",
    description: "Major design contributor for South-East Nigeria's largest developer festival. Supported visual branding, event creative assets, and logistical design systems.",
    technologies: ["Visual Design", "Brand Identity", "Event Systems", "Figma"],
    role: "Lead Graphic Designer",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/dev-nnewBVnGcwatonVCQKc9zTtMdshDoM.jpg",
    status: "Completed",
    links: {
      demo: "https://www.behance.net/nestorcyber",
      caseStudy: "/portfolio/devfest-owerri-2025-branding",
    },
  },
  {
    id: "build-with-ai-2025-branding",
    slug: "build-with-ai-2025-branding",
    title: "Build With AI 2025 Branding",
    category: "Design",
    description: "Empowering developers and creators with AI-driven workflows and resources. Engineered platform design and community tools for rapid AI integration.",
    technologies: ["Next.js", "AI Integration", "Tailwind CSS", "Developer Experience"],
    role: "Software Developer & Designer",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/about-ItCmRGacGKzMpQbnPfGLfUfLEwWn3i.jpg",
    status: "Active",
    links: {
      demo: "https://github.com/nestorcyber",
      github: "https://github.com/nestorcyber",
      caseStudy: "/portfolio/build-with-ai-2025-branding",
    },
  },
  {
    id: "nacos-futo-website-development",
    slug: "nacos-futo-website-development",
    title: "NACOS FUTO Website Development",
    category: "Web",
    description: "Centralized ICT digital infrastructure and student engagement portal for the Nigeria Association of Computing Students across higher institutions.",
    technologies: ["React", "TypeScript", "Node.js", "ICT Strategy"],
    role: "Director of ICT",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/vol-ehxuFInSlnE81JZZijj6Bgoz9s2kcW.jpeg",
    status: "Production",
    links: {
      demo: "https://nacos.org.ng",
      caseStudy: "/portfolio/nacos-futo-website-development",
    },
  },
]

export const servicesList: ServiceItem[] = [
  {
    id: "graphic-design",
    title: "Graphic Design & Branding",
    description: "Creating brand identities, conference graphics, marketing collateral, and visual communication systems.",
    iconName: "Palette",
    ctaText: "Brand Strategy ↗",
    ctaHref: "/contact",
  },
  {
    id: "web-dev",
    title: "Website Development",
    description: "Crafting modern, responsive, SEO-optimized web platforms using modern frameworks like Next.js, React, and Tailwind CSS.",
    iconName: "Globe",
    ctaText: "Build A Website ↗",
    ctaHref: "/contact",
  },
  {
    id: "software-dev",
    title: "Software Development",
    description: "Building production-grade web applications, robust APIs, and custom software systems tailored for performance and scale.",
    iconName: "Code",
    ctaText: "Start Software Project ↗",
    ctaHref: "/contact",
  },
  {
    id: "tech-consulting",
    title: "Technical Consulting",
    description: "Providing strategic IT advisory, technology architecture reviews, and community digital strategy consulting.",
    iconName: "Shield",
    ctaText: "Book Advisory ↗",
    ctaHref: "/contact",
  },
  {
    id: "automation",
    title: "Business Automation",
    description: "Automating repetitive operational workflows using modern script integrations, AI workflows, and cloud tools.",
    iconName: "Zap",
    ctaText: "Automate Process ↗",
    ctaHref: "/contact",
  },
]

export const skillGroups: SkillGroup[] = [
  {
    category: "Software Engineering & Web",
    skills: [
      { name: "React & Next.js", experienceLevel: "Advanced", years: "3+ yrs", iconProvider: "simple", iconName: "simple-react", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg" },
      { name: "TypeScript & JavaScript", experienceLevel: "Advanced", years: "3+ yrs", iconProvider: "simple", iconName: "simple-typescript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" },
      { name: "Tailwind CSS & Web UI", experienceLevel: "Advanced", years: "3+ yrs", iconProvider: "simple", iconName: "simple-tailwindcss", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg" },
      { name: "Technical Writing & Docs", experienceLevel: "Advanced", years: "3+ yrs", iconProvider: "lucide", iconName: "FileText" },
      { name: "REST APIs & Webhooks", experienceLevel: "Intermediate", years: "2+ yrs", iconProvider: "lucide", iconName: "Globe" },
    ],
  },
  {
    category: "Artificial Intelligence & Cloud",
    skills: [
      { name: "Prompt Engineering", experienceLevel: "Advanced", years: "2+ yrs", iconProvider: "lucide", iconName: "Bot" },
      { name: "AI Ethics & Governance", experienceLevel: "Intermediate", years: "2+ yrs", iconProvider: "lucide", iconName: "Shield" },
      { name: "Google AI Studio", experienceLevel: "Advanced", years: "2+ yrs", iconProvider: "simple", iconName: "simple-google", icon: "https://cdn.simpleicons.org/google" },
      { name: "Generative AI Workflows", experienceLevel: "Advanced", years: "2+ yrs", iconProvider: "lucide", iconName: "Sparkles" },
    ],
  },
  {
    category: "Graphic Design & Branding",
    skills: [
      { name: "Graphic Design & Branding", experienceLevel: "Advanced", years: "4+ yrs", iconProvider: "lucide", iconName: "Palette" },
      { name: "Identity & Event Design", experienceLevel: "Advanced", years: "4+ yrs", iconProvider: "lucide", iconName: "PenTool" },
      { name: "Figma & CorelDraw", experienceLevel: "Advanced", years: "4+ yrs", iconProvider: "simple", iconName: "simple-figma", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg" },
      { name: "Photoshop & Illustrator", experienceLevel: "Intermediate", years: "3+ yrs", iconProvider: "simple", iconName: "simple-adobephotoshop", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/photoshop/photoshop-original.svg" },
      { name: "Presentation & Print Design", experienceLevel: "Advanced", years: "3+ yrs", iconProvider: "lucide", iconName: "Layout" },
    ],
  },
  {
    category: "Tools & Technical Operations",
    skills: [
      { name: "Git & GitHub", experienceLevel: "Advanced", years: "3+ yrs", iconProvider: "simple", iconName: "simple-github", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg" },
      { name: "Google Workspace & Office 365", experienceLevel: "Advanced", years: "4+ yrs", iconProvider: "simple", iconName: "simple-googleworkspace", icon: "https://cdn.simpleicons.org/googleworkspace" },
      { name: "Database & File Organization", experienceLevel: "Advanced", years: "3+ yrs", iconProvider: "lucide", iconName: "Database" },
      { name: "Project Coordination", experienceLevel: "Intermediate", years: "2+ yrs", iconProvider: "lucide", iconName: "ListChecks" },
    ],
  },
]

export const certificationsList: CertificationItem[] = [
  {
    id: "ndpc-privacy",
    title: "Data Privacy Ambassador",
    provider: "Nigeria Data Protection Commission (NDPC)",
    date: "April 2025",
    credentialUrl: "https://ndpc.gov.ng",
  },
  {
    id: "aws-cloud",
    title: "AWS Cloud Community Practitioner",
    provider: "AWS Cloud Club FUTO",
    date: "September 2025",
  },
  {
    id: "ieee-member",
    title: "IEEE Engineering Leadership Certification",
    provider: "IEEE FUTO Student Branch",
    date: "May 2026",
  },
  {
    id: "gotni-leader",
    title: "Emerging Leaders Credential",
    provider: "Guardians of the Nation International (GOTNI)",
    date: "December 2025",
  },
]

