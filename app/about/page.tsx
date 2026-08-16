import { Metadata } from "next"
import Footer from "@/components/footer"
import Image from "next/image"
import { Award, Cpu, PenTool, Users } from "lucide-react"
import AboutSidebarNav from "@/components/about/about-sidebar-nav"

export const metadata: Metadata = {
  title: "About Nestor Anyanwu | Profile & Vision",
  description: "Biography of Nestor Anyanwu (Nestor Cyber), Tech Leader and Software Engineer. Read about his core pillars in technology advocacy, design, and AI.",
  alternates: {
    canonical: "/about",
  },
  openGraph: {
    title: "About Nestor Anyanwu | Profile & Vision",
    description: "Biography of Nestor Anyanwu (Nestor Cyber), Tech Leader and Software Engineer. Read about his core pillars in technology advocacy, design, and AI.",
    url: "/about",
  },
  twitter: {
    title: "About Nestor Anyanwu | Profile & Vision",
    description: "Biography of Nestor Anyanwu (Nestor Cyber), Tech Leader and Software Engineer. Read about his core pillars in technology advocacy, design, and AI.",
  },
}

export default function AboutPage() {
  const pillars = [
    {
      id: "advocate",
      num: "01",
      title: "Tech Advocate",
      icon: <Award className="w-6 h-6 text-accent" />,
      tagline: "SHAPING ADOPTING BEHAVIORS & DIGITAL INCLUSION",
      description: "Nestor is a strong advocate for technology adoption, digital literacy, and innovation-driven development. He believes that technology should not be reserved for a select few but should be accessible, understandable, and impactful for everyone.",
      points: [
        "Promoting cybersecurity and digital ethics awareness.",
        "Advocating for digital literacy and technology careers among youth.",
        "Facilitating public workshops and online engagement for emerging tech."
      ]
    },
    {
      id: "ai",
      num: "02",
      title: "AI Enthusiast",
      icon: <Cpu className="w-6 h-6 text-accent" />,
      tagline: "UNLOCKING PRODUCTIVITY THROUGH INTELLIGENT SYSTEMS",
      description: "As an Artificial Intelligence enthusiast, Nestor actively explores the applications of machine learning, automation, and generative platforms. He is passionate about helping others discover how these tools enhance creativity and problem-solving.",
      points: [
        "Exploring machine learning and generative workflows.",
        "Advocating for ethical AI adoption in daily professional workflows.",
        "Sharing productivity-focused artificial intelligence resources."
      ]
    },
    {
      id: "designer",
      num: "03",
      title: "Ingenious Designer",
      icon: <PenTool className="w-6 h-6 text-accent" />,
      tagline: "BRIDGING HUMAN-CENTERED AESTHETICS WITH CLEAN CODE",
      description: "Creativity remains a defining aspect of Nestor's identity. As a designer, he combines visual storytelling, user experience principles, and strategic thinking to shape functional and beautiful digital interfaces.",
      points: [
        "Designing intuitive user experiences and product interfaces.",
        "Creating corporate branding assets and campaign resources.",
        "Aligning visual communication with strategic development objectives."
      ]
    },
    {
      id: "leader",
      num: "04",
      title: "Community Leader",
      icon: <Users className="w-6 h-6 text-accent" />,
      tagline: "EMPOWERING TECH TALENT AND COLLECTIVE PROGRESS",
      description: "Serving as the Director of ICT for both NACOS National and FUTO chapters, Nestor drives digital strategy, technical infrastructure, and developer community coordination to support thousands of computing students.",
      points: [
        "Leading ICT strategy for student computing ecosystems.",
        "Coordinating tech conferences, bootcamps, and networking summits.",
        "Promoting volunteer-led digital mentorship networks."
      ]
    }
  ]

  return (
    <>
      {/* Full screen dashboard-style wrapper (Fixed left sidebar navigation + Scrollable main content panel) */}
      <div className="min-h-screen bg-background flex flex-col lg:flex-row w-full">
        
        {/* Full-Height Left Navigation Sidebar (Deskop Only - SlothUI layout) */}
        <AboutSidebarNav />

        {/* Main Content Feed Area with Footer inside */}
        <main className="flex-1 min-w-0 flex flex-col justify-between overflow-x-hidden">
          <div className="space-y-0 pb-12">
            
            {/* 1. About Hero Section */}
            <section id="hero" className="relative h-[55vh] md:h-[65vh] flex flex-col items-end justify-end md:items-center md:justify-start overflow-hidden">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/about-ItCmRGacGKzMpQbnPfGLfUfLEwWn3i.jpg"
                alt="Nestor Anyanwu speaking"
                fill
                className="object-cover object-[75%_20%]"
                priority
              />
              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/50 to-transparent md:bg-gradient-to-t md:from-black/85 md:via-black/45 md:to-transparent"></div>
              
              {/* Content */}
              <div className="relative z-10 w-full px-6 md:px-16 lg:px-20 pb-12 md:pb-0 md:pt-28 md:flex md:items-center md:justify-start md:h-full">
                <div className="max-w-3xl">
                  <p className="text-accent text-xs md:text-sm font-bold tracking-widest mb-3 uppercase [text-shadow:_0_1px_2px_rgba(0,0,0,0.4)] font-mono">
                    EXECUTIVE PROFILE
                  </p>
                  <h1 className="font-sans text-3xl md:text-6xl lg:text-7xl font-bold text-white mb-2 leading-none tracking-tight [text-shadow:_0_2px_8px_rgba(0,0,0,0.8)]">
                    Nestor Anyanwu
                  </h1>
                  <p className="text-white/80 text-sm md:text-xl font-medium tracking-wide [text-shadow:_0_2px_4px_rgba(0,0,0,0.6)]">
                    Tech Leader • Software Engineer • Designer
                  </p>
                </div>
              </div>
            </section>

            {/* 2. Core Philosophy Quote */}
            <section id="journey" className="py-12 md:py-16 px-6 md:px-12 lg:px-16 max-w-6xl mx-auto">
              <div className="bg-card border-2 border-slate-900/20 dark:border-slate-800 p-8 md:p-12 rounded-2xl shadow-sm relative overflow-hidden">
                <div className="max-w-4xl space-y-6">
                  <span className="text-accent text-4xl font-sans font-bold">“</span>
                  <blockquote className="text-lg md:text-2xl font-semibold text-foreground/90 italic leading-relaxed font-heading">
                    Technology is not merely a profession. It is a platform for impact, a catalyst for growth, and a tool for shaping a better future. His core goal is creating an inclusive and collaborative tech ecosystem where everyone has the opportunity to thrive.
                  </blockquote>
                  <div className="flex items-center gap-3">
                    <span className="h-0.5 w-8 bg-accent"></span>
                    <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground font-mono">
                      Nestor Anyanwu, Vision Statement
                    </span>
                  </div>
                </div>
              </div>
            </section>

            {/* 3. Alternating Scrolling Pillars Section */}
            <section className="py-16 px-6 md:px-12 lg:px-16 bg-background border-y border-border/70">
              <div className="max-w-6xl mx-auto">
                <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
                  <p className="text-accent text-xs font-bold tracking-widest uppercase font-mono">
                    AREAS OF IMPACT
                  </p>
                  <h2 className="text-3xl md:text-5xl font-extrabold text-foreground tracking-tight font-heading uppercase">
                    Pillars of Leadership & Service
                  </h2>
                  <p className="text-sm md:text-base text-muted-foreground font-light">
                    A narrative walk through the key dimensions of Nestor's work and community footprint.
                  </p>
                </div>

                {/* Alternating layout list */}
                <div className="space-y-20">
                  {pillars.map((p, index) => {
                    const isEven = index % 2 === 0
                    return (
                      <div
                        key={p.id}
                        id={p.id}
                        className={`grid grid-cols-1 lg:grid-cols-12 gap-10 items-center scroll-mt-24 ${
                          isEven ? "" : "lg:flex-row-reverse"
                        }`}
                      >
                        {/* Visual Number Card */}
                        <div
                          className={`lg:col-span-5 flex flex-col justify-center ${
                            isEven ? "lg:order-1" : "lg:order-2"
                          }`}
                        >
                          <div className="relative bg-card border border-border/80 p-8 rounded-2xl shadow-sm overflow-hidden flex flex-col justify-between aspect-video lg:aspect-square max-w-md mx-auto w-full">
                            <div className="absolute -top-10 -right-6 text-[140px] font-black text-foreground/5 select-none leading-none font-heading">
                              {p.num}
                            </div>
                            <div className="p-3 bg-secondary rounded-xl border border-border w-fit mb-6">
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
                          <span className="text-accent text-xs font-bold tracking-wider uppercase block font-mono">
                            {p.tagline}
                          </span>
                          <p className="text-base md:text-lg text-foreground/80 leading-relaxed font-medium">
                            {p.description}
                          </p>
                          <div className="space-y-3 pt-2">
                            <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground font-mono">
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
            <section id="service" className="py-16 px-6 md:px-12 lg:px-16 max-w-6xl mx-auto space-y-12">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
                <div className="space-y-6">
                  <h3 className="text-2xl md:text-4xl font-extrabold text-foreground tracking-tight">
                    A Commitment to Voluntary Service & Growth
                  </h3>
                  <p className="text-sm md:text-base text-foreground/80 leading-relaxed font-medium">
                    Nestor actively contributes to volunteer-driven initiatives promoting technical education, mentorship, and network development. He serves in key leadership programs, helping bridge educational resources with aspiring technology professionals in Nigeria.
                  </p>
                  <p className="text-sm md:text-base text-foreground/80 leading-relaxed font-medium">
                    By maintaining a presence in student-led organizations, developer chapters, and professional networks like GOTNI (Guardians of the Nation International), IEEE, and NACOS, he helps secure growth pathways for computing talents.
                  </p>
                </div>
                <div className="relative aspect-video rounded-xl overflow-hidden shadow-lg border border-border/80">
                  <Image
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/vol-ehxuFInSlnE81JZZijj6Bgoz9s2kcW.jpeg"
                    alt="Nestor Anyanwu volunteering"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </section>

          </div>

          {/* Footer dynamically contained in the main feed area so it adjusts with the sidebar */}
          <Footer />
        </main>
      </div>
    </>
  )
}
