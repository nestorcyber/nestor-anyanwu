import { Metadata } from "next"
import Footer from "@/components/footer"
import Image from "next/image"
import PortfolioCTA from "@/components/portfolio/portfolio-cta"
import { Award, Cpu, Users, Briefcase, HeartHandshake } from "lucide-react"

export const metadata: Metadata = {
  title: "About Nestor Anyanwu | Profile, Leadership & Impact",
  description:
    "Biography of Nestor Anyanwu (Nestor Cyber). Software Engineer, AI Enthusiast, Tech Leader, and Community Advocate dedicated to creating an inclusive and collaborative tech ecosystem where everyone can thrive.",
  alternates: {
    canonical: "/about",
  },
  openGraph: {
    title: "About Nestor Anyanwu | Profile, Leadership & Impact",
    description:
      "Biography of Nestor Anyanwu (Nestor Cyber). Software Engineer, AI Enthusiast, Tech Leader, and Community Advocate dedicated to creating an inclusive and collaborative tech ecosystem where everyone can thrive.",
    url: "/about",
  },
  twitter: {
    title: "About Nestor Anyanwu | Profile, Leadership & Impact",
    description:
      "Biography of Nestor Anyanwu (Nestor Cyber). Software Engineer, AI Enthusiast, Tech Leader, and Community Advocate dedicated to creating an inclusive and collaborative tech ecosystem where everyone can thrive.",
  },
}

export default function AboutPage() {
  const pillars = [
    {
      id: "leadership",
      num: "01",
      title: "Technology & Leadership",
      icon: <Award className="w-6 h-6 text-accent" />,
      tagline: "STRATEGIC TECH DIRECTION, ADVOCACY & ECOSYSTEM GOVERNANCE",
      description:
        "Serving as the Director of ICT for NACOS National and FUTO chapters, Nestor directs digital strategy, student computing infrastructure, and institutional technology transformation to empower thousands of aspiring engineers.",
      points: [
        "Directing national ICT strategy, student computing ecosystems, and developer governance.",
        "Advocating for digital literacy, youth technology careers, and data privacy awareness.",
        "Facilitating executive tech summits, institutional partnerships, and digital transformation.",
      ],
    },
    {
      id: "ai-engineering",
      num: "02",
      title: "AI, Design & Software Engineering",
      icon: <Cpu className="w-6 h-6 text-accent" />,
      tagline: "FULL-STACK ARCHITECTURE, GENERATIVE AI & VISUAL SYSTEMS",
      description:
        "Uniting robust software engineering with machine learning workflows and human-centered design principles. Nestor builds high-performance web applications, integrates generative AI systems, and crafts brand identities that command credibility.",
      points: [
        "Engineering scalable, production-grade web applications, robust APIs, and modern frontends.",
        "Integrating generative AI models, machine learning APIs, and intelligent workflow automation.",
        "Designing human-centered user experiences, event collateral, and corporate brand systems.",
      ],
    },
    {
      id: "community-devrel",
      num: "03",
      title: "Community & Developer Relations",
      icon: <Users className="w-6 h-6 text-accent" />,
      tagline: "TECHNICAL ADVOCACY, HACKATHONS & BUILDER NETWORKS",
      description:
        "Actively cultivating developer ecosystems across GDG Owerri, IEEE, and NACOS. Nestor champions developer advocacy, organizes regional hackathons, and facilitates hands-on bootcamps to empower emerging builders.",
      points: [
        "Fostering developer relations, open-source engagement, and technical advocacy.",
        "Coordinating tech conferences, developer hackathons, and hands-on code bootcamps.",
        "Authoring technical guides, essays, and resources to accelerate builder growth.",
      ],
    },
    {
      id: "product-consulting",
      num: "04",
      title: "Product & IT Consulting",
      icon: <Briefcase className="w-6 h-6 text-accent" />,
      tagline: "PRODUCT ROADMAPS, SYSTEM AUDITS & ENTERPRISE ARCHITECTURE",
      description:
        "Translating complex business vision into executable technical roadmaps and scalable digital systems. Nestor consults for startups, student bodies, and growing enterprises on architecture audits and product strategy.",
      points: [
        "Leading end-to-end product lifecycles from user research to production deployment.",
        "Delivering enterprise IT consulting, tech audits, and scalable cloud architecture advisory.",
        "Aligning commercial business objectives with sustainable technical execution.",
      ],
    },
    {
      id: "volunteering-impact",
      num: "05",
      title: "Volunteering & Impact",
      icon: <HeartHandshake className="w-6 h-6 text-accent" />,
      tagline: "INCLUSIVE PROGRESS, MENTORSHIP & ACCESSIBLE PATHWAYS",
      description:
        "At the core of every endeavor is a deep commitment to voluntary service and human impact. Nestor mentors aspiring developers and leads capacity-building initiatives to ensure everyone can thrive in the digital economy.",
      points: [
        "Mentoring student builders and bridging educational gaps across South-East Nigeria.",
        "Leading voluntary outreach, digital safety workshops, and community education programs.",
        "Championing an inclusive and collaborative tech ecosystem where anyone can build and thrive.",
      ],
    },
  ]

  return (
    <>
      <main className="min-h-screen bg-background pt-0 overflow-x-hidden">
        
        {/* 1. About Hero Section */}
        <section className="relative h-[62svh] min-h-[380px] sm:h-[75svh] md:h-[calc(100svh-4rem)] md:min-h-[640px] flex flex-col justify-end overflow-hidden bg-slate-950">
          <Image
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/about-ItCmRGacGKzMpQbnPfGLfUfLEwWn3i.jpg"
            alt="Nestor Anyanwu speaking"
            fill
            sizes="100vw"
            priority
            fetchPriority="high"
            className="object-cover object-[50%_20%] sm:object-[75%_20%] md:object-center"
          />
          {/* Overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent sm:from-black/85 sm:via-black/35 sm:to-transparent" />
          
          {/* Content in Lower Third with Center-Left Alignment */}
          <div className="relative z-10 w-full site-container pb-8 sm:pb-14 md:pb-20 lg:pb-24">
            <div className="max-w-3xl text-left">
              <h1 className="font-sans text-2xl sm:text-4xl md:text-6xl lg:text-7xl font-extrabold text-white mb-0 leading-[1.1] tracking-tight [text-shadow:_0_2px_12px_rgba(0,0,0,0.85)]">
                Nestor Anyanwu
              </h1>
            </div>
          </div>
        </section>

        {/* 2. Core Philosophy Quote */}
        <section className="py-16 site-container">
          <div className="bg-card border-2 border-slate-900/20 dark:border-slate-800 p-8 md:p-12 rounded-none shadow-[3px_3px_0px_0px_rgba(15,23,42,0.85)] dark:shadow-[3px_3px_0px_0px_rgba(0,0,0,0.8)] relative overflow-hidden">
            <div className="max-w-4xl space-y-6">
              <span className="text-accent text-4xl font-sans font-bold">“</span>
              <blockquote className="text-lg md:text-2xl font-semibold text-foreground/90 italic leading-relaxed font-heading">
                Technology, AI, design, and strategic leadership are catalysts for progress. My mission is to build software that creates real-world impact while cultivating an inclusive, collaborative ecosystem where builders everywhere can thrive.
              </blockquote>
              <div className="flex items-center gap-3">
                <span className="h-0.5 w-8 bg-accent"></span>
                <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground font-mono">
                  Nestor Anyanwu | Mission & Vision Statement
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* 3. Five Pillars Detailed Grid */}
        <section className="py-20 bg-background border-y-2 border-slate-900/20 dark:border-slate-800">
          <div className="site-container">
            <div className="text-center max-w-3xl mx-auto mb-20 space-y-3">
              <p className="text-accent text-xs font-bold tracking-widest uppercase font-mono">
                AREAS OF IMPACT
              </p>
              <h2 className="text-3xl md:text-5xl font-extrabold text-foreground tracking-tight font-heading uppercase">
                Pillars of Leadership & Service
              </h2>
              <p className="text-sm md:text-base text-muted-foreground font-light">
                A narrative walkthrough of Nestor's core disciplines, community footprint, and dedication to impact.
              </p>
            </div>

            {/* Alternating layout list */}
            <div className="space-y-24">
              {pillars.map((p, index) => {
                const isEven = index % 2 === 0
                return (
                  <div
                    key={p.id}
                    className={`grid grid-cols-1 lg:grid-cols-12 gap-12 items-center ${
                      isEven ? "" : "lg:flex-row-reverse"
                    }`}
                  >
                    {/* Visual Number Card */}
                    <div
                      className={`lg:col-span-5 flex flex-col justify-center ${
                        isEven ? "lg:order-1" : "lg:order-2"
                      }`}
                    >
                      <div className="relative bg-card border-2 border-slate-900/20 dark:border-slate-800 p-8 rounded-none shadow-[3px_3px_0px_0px_rgba(15,23,42,0.85)] dark:shadow-[3px_3px_0px_0px_rgba(0,0,0,0.8)] overflow-hidden flex flex-col justify-between aspect-video lg:aspect-square max-w-md mx-auto w-full">
                        <div className="absolute -top-10 -right-6 text-[150px] font-black text-foreground/5 select-none leading-none font-heading">
                          {p.num}
                        </div>
                        <div className="p-3 bg-secondary rounded-none border border-border w-fit mb-6">
                          {p.icon}
                        </div>
                        <div className="space-y-2 z-10">
                          <h4 className="text-accent text-xs font-bold tracking-widest uppercase font-mono">
                            PILLAR {p.num}
                          </h4>
                          <h3 className="text-2xl font-extrabold text-foreground font-heading">
                            {p.title}
                          </h3>
                        </div>
                      </div>
                    </div>

                    {/* Description & Points Column */}
                    <div
                      className={`lg:col-span-7 space-y-6 ${
                        isEven ? "lg:order-2" : "lg:order-1"
                      }`}
                    >
                      <span className="text-accent text-xs font-bold tracking-wider uppercase block">
                        {p.tagline}
                      </span>
                      <p className="text-base md:text-lg text-foreground/80 leading-relaxed font-medium">
                        {p.description}
                      </p>
                      <div className="space-y-3 pt-2">
                        <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                          Key Initiatives & Competencies
                        </h4>
                        <ul className="space-y-3">
                          {p.points.map((pt, i) => (
                            <li key={i} className="flex items-start gap-3 text-sm font-medium text-foreground/75">
                              <span className="mt-2 h-1.5 w-1.5 rounded-full bg-accent shrink-0"></span>
                              <span>{pt}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* 4. Service & Future Commitment */}
        <section className="py-20 site-container space-y-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            <div className="space-y-6">
              <h3 className="text-2xl md:text-4xl font-extrabold text-foreground tracking-tight font-heading">
                A Commitment to Voluntary Service & Inclusive Impact
              </h3>
              <p className="text-sm md:text-base text-foreground/80 leading-relaxed font-medium">
                Nestor actively contributes to volunteer-driven initiatives promoting technical education, mentorship, and network development. He serves in key leadership programs, helping bridge educational resources with aspiring technology professionals in Nigeria.
              </p>
              <p className="text-sm md:text-base text-foreground/80 leading-relaxed font-medium">
                By maintaining an active presence in student-led organizations, developer chapters, and professional networks like GOTNI (Guardians of the Nation International), IEEE, and NACOS, he helps secure growth pathways for computing talents.
              </p>
            </div>
            <div className="relative aspect-video rounded-xl overflow-hidden shadow-lg border border-border/80">
              <Image
                src="https://res.cloudinary.com/z3wgqisj/image/upload/v1787837125/nestor/gallery/futo-1.jpg"
                alt="Nestor Anyanwu volunteering"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </section>

        {/* 5. About Page Tailored CTA */}
        <PortfolioCTA
          title="Let's Create Meaningful Impact Together"
          description="Whether you are interested in technical advisory, speaking engagements, or building inclusive tech communities, I'd love to connect."
          buttonText="Start A Conversation"
          buttonHref="/contact"
        />

      </main>
      <Footer />
    </>
  )
}
