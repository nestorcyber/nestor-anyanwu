"use client"

import Footer from "@/components/footer"
import Image from "next/image"
import { Award, Cpu, PenTool, Users } from "lucide-react"

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
      <main className="min-h-screen bg-background pt-16 md:pt-20 overflow-x-hidden">
        {/* 1. Header Profile Intro */}
        <section className="relative py-20 px-6 md:px-12 lg:px-24 bg-secondary border-b border-border flex items-center">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center w-full">
            <div className="lg:col-span-7 space-y-6">
              <span className="inline-block px-3 py-1 bg-accent/10 text-accent text-xs font-bold uppercase tracking-wider rounded-full">
                Executive Biography
              </span>
              <h1 className="text-4xl md:text-6xl font-extrabold text-foreground tracking-tight leading-none">
                Nestor Anyanwu
              </h1>
              <p className="text-lg md:text-xl font-bold text-accent">
                Tech Leader • Software Engineer • Designer
              </p>
              <p className="text-base md:text-lg text-foreground/80 leading-relaxed max-w-2xl font-medium">
                Known professionally as <strong>"Nestor Cyber"</strong>, Nestor is an emerging technology professional, digital innovator, and community builder. His work spans software engineering, artificial intelligence advocacy, design, and technical education.
              </p>
            </div>
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative w-72 h-72 md:w-80 md:h-80 rounded-2xl overflow-hidden shadow-xl border border-border/80">
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/about-ItCmRGacGKzMpQbnPfGLfUfLEwWn3i.jpg"
                  alt="Nestor Anyanwu speaking"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>
          </div>
        </section>

        {/* 2. Core Philosophy Quote */}
        <section className="py-16 px-6 md:px-12 lg:px-24 max-w-7xl mx-auto">
          <div className="bg-card border border-border p-8 md:p-12 rounded-2xl shadow-sm relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-accent/5 rounded-full blur-3xl pointer-events-none"></div>
            <div className="max-w-4xl space-y-6">
              <span className="text-accent text-4xl font-serif">“</span>
              <blockquote className="text-lg md:text-2xl font-semibold text-foreground/90 italic leading-relaxed">
                Technology is not merely a profession. It is a platform for impact, a catalyst for growth, and a tool for shaping a better future. My core goal is creating an inclusive and collaborative tech ecosystem where everyone has the opportunity to thrive.
              </blockquote>
              <div className="flex items-center gap-3">
                <span className="h-0.5 w-8 bg-accent"></span>
                <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  Nestor Anyanwu, Vision Statement
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* 3. Alternating Scrolling Pillars Section (Forbes/Elumelu style) */}
        <section className="py-20 px-6 md:px-12 lg:px-24 bg-secondary/30 border-y border-border">
          <div className="max-w-7xl mx-auto">
            <div className="text-center max-w-3xl mx-auto mb-24 space-y-3">
              <p className="text-accent text-xs font-bold tracking-widest uppercase">
                AREAS OF IMPACT
              </p>
              <h2 className="text-3xl md:text-5xl font-extrabold text-foreground tracking-tight">
                Pillars of Leadership & Service
              </h2>
              <p className="text-sm md:text-base text-muted-foreground font-medium">
                A narrative walk through the key dimensions of Nestor's work and community footprint.
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
                      <div className="relative bg-card border border-border p-10 rounded-2xl shadow-sm overflow-hidden flex flex-col justify-between aspect-video lg:aspect-square max-w-md mx-auto w-full">
                        <div className="absolute -top-10 -right-6 text-[150px] font-black text-primary/5 select-none leading-none">
                          {p.num}
                        </div>
                        <div className="p-3 bg-primary/5 rounded-xl w-fit mb-6">
                          {p.icon}
                        </div>
                        <div className="space-y-2 z-10">
                          <h4 className="text-accent text-xs font-bold tracking-widest uppercase">
                            PILLAR {p.num}
                          </h4>
                          <h3 className="text-2xl font-extrabold text-primary">
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
        <section className="py-20 px-6 md:px-12 lg:px-24 max-w-7xl mx-auto space-y-12">
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
      </main>
      <Footer />
    </>
  )
}
