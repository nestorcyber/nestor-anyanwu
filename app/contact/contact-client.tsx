"use client"

import React, { useState, FormEvent } from "react"
import Footer from "@/components/footer"
import TrustedBrands from "@/components/home/trusted-brands"
import {
  Clock,
  CheckCircle2,
  ArrowUpRight,
  Layers,
  ShieldCheck,
  Handshake,
  Code2,
  Zap,
} from "lucide-react"
import type { BrandPartner } from "@/lib/content"
import { trackContact } from "@/lib/analytics"

const defaultBrandLogos: BrandPartner[] = [
  {
    id: "gdg",
    name: "GDG Owerri",
    logoUrl: "https://res.cloudinary.com/z3wgqisj/image/upload/f_auto,q_auto,w_400,c_limit/nestor/brands/mk1vyobppwlmmvyw894f.png",
    websiteUrl: "https://gdg.community.dev/gdg-owerri/",
    sortOrder: 1,
  },
  {
    id: "futo",
    name: "Federal University of Technology Owerri",
    logoUrl: "https://res.cloudinary.com/z3wgqisj/image/upload/f_auto,q_auto,w_400,c_limit/nestor/brands/mk1vyobppwlmmvyw894f.png",
    websiteUrl: "https://futo.edu.ng",
    sortOrder: 2,
  },
  {
    id: "nacos",
    name: "NACOS FUTO Chapter",
    logoUrl: "https://res.cloudinary.com/z3wgqisj/image/upload/f_auto,q_auto,w_400,c_limit/nestor/brands/mk1vyobppwlmmvyw894f.png",
    websiteUrl: "https://nacosfuto.org",
    sortOrder: 3,
  },
  {
    id: "ieee",
    name: "IEEE FUTO SB",
    logoUrl: "https://res.cloudinary.com/z3wgqisj/image/upload/f_auto,q_auto,w_400,c_limit/nestor/brands/mk1vyobppwlmmvyw894f.png",
    websiteUrl: "https://ieee.org",
    sortOrder: 4,
  },
  {
    id: "ieee-pes",
    name: "IEEE Power Electronics Society",
    logoUrl: "https://res.cloudinary.com/z3wgqisj/image/upload/f_auto,q_auto,w_400,c_limit/nestor/brands/mk1vyobppwlmmvyw894f.png",
    websiteUrl: "https://pels.ieee.org",
    sortOrder: 5,
  },
]

export default function ContactPage({ brands = [] }: { brands?: BrandPartner[] }) {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    organization: "",
    serviceInterest: "Software & Web App Development",
    phone: "",
    country: "",
    subject: "",
    message: "",
    hp_field: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle")
  const [errorMessage, setErrorMessage] = useState<string>("")

  const displayBrands = brands && brands.length > 0 ? brands : defaultBrandLogos

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus("idle")
    setErrorMessage("")

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(formData),
      })

      const data = await res.json()

      if (!res.ok || !data.success) {
        throw new Error(data.error || "Something went wrong while sending your message. Please try again.")
      }

      trackContact(formData.serviceInterest)
      setSubmitStatus("success")
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        organization: "",
        serviceInterest: "Software & Web App Development",
        phone: "",
        country: "",
        subject: "",
        message: "",
        hp_field: "",
      })
      setTimeout(() => setSubmitStatus("idle"), 6000)
    } catch (err: any) {
      setErrorMessage(err?.message || "Something went wrong while sending your message. Please try again.")
      setSubmitStatus("error")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <>
      <main className="min-h-screen bg-background font-sans pt-0 pb-16" id="main-content">
        <section className="w-full min-h-screen min-h-[100dvh] flex flex-col justify-center pt-24 sm:pt-28 md:pt-32 pb-12 sm:pb-16 relative overflow-hidden bg-gradient-to-b from-[#0056D2]/[0.05] via-background to-background dark:from-[#0056D2]/10 dark:via-background dark:to-background border-b border-border/40">
          <div className="site-container relative z-10">
          
            {/* Main 2-Column Responsive Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            
              {/* ─── 1. HEADLINE & INTRO DESCRIPTION ─── */}
              <div className="order-1 lg:order-1 lg:col-span-5 space-y-8 pt-2">
                <div className="space-y-4">
                  <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-foreground tracking-tight font-heading leading-[1.12]">
                    Let&apos;s build something great and create real impact together.
                  </h1>
                  <p className="text-sm sm:text-base text-muted-foreground font-normal leading-relaxed">
                    I work directly with founders, creators, developers, student groups, and community organizers. Whether you want to build a web application, design a brand identity, get IT advice, invite me to speak, or partner on a community event, I&apos;d love to hear from you.
                  </p>
                </div>

              </div>

              {/* ─── 2. CONTACT FORM ─── */}
              <div className="order-2 lg:order-2 lg:col-span-7">
                <div className="bg-card border border-border/80 rounded-2xl p-6 sm:p-8 md:p-10 shadow-lg space-y-6">
                  
                  <div className="space-y-1 pb-2">
                    <h2 className="text-xl sm:text-2xl font-extrabold text-foreground font-heading">
                      Send Me a Message
                    </h2>
                    <p className="text-xs sm:text-sm text-muted-foreground">
                      Tell me about what you&apos;re working on, what you need help with, or your collaboration ideas.
                    </p>
                  </div>

                  {submitStatus === "success" && (
                    <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 flex items-center gap-3 text-sm font-medium">
                      <CheckCircle2 className="w-5 h-5 shrink-0" />
                      <span>Your message has been sent successfully. I&apos;ll reply to you as soon as possible.</span>
                    </div>
                  )}

                  {submitStatus === "error" && (
                    <div className="p-4 rounded-2xl bg-red-500/10 border border-red-500/30 text-red-600 dark:text-red-400 text-sm font-medium">
                      {errorMessage || "Something went wrong while sending your message. Please try again."}
                    </div>
                  )}

                  <form onSubmit={handleSubmit} className="space-y-5">
                    {/* Honeypot hidden input for spam bots */}
                    <input
                      type="text"
                      name="hp_field"
                      value={formData.hp_field}
                      onChange={handleChange}
                      tabIndex={-1}
                      autoComplete="off"
                      aria-hidden="true"
                      style={{
                        display: "none",
                        opacity: 0,
                        position: "absolute",
                        top: 0,
                        left: 0,
                        height: 0,
                        width: 0,
                        zIndex: -1,
                        pointerEvents: "none",
                      }}
                    />
                    
                    {/* Name Fields (2 cols) */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-foreground block">
                          First Name <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          name="firstName"
                          required
                          value={formData.firstName}
                          onChange={handleChange}
                          placeholder="e.g. Alex"
                          className="w-full px-4 py-3 rounded-2xl bg-background border border-border/80 text-foreground text-sm placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-[#0056D2] focus:border-transparent transition-all"
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="text-xs font-bold text-foreground block">
                          Last Name <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          name="lastName"
                          required
                          value={formData.lastName}
                          onChange={handleChange}
                          placeholder="e.g. Smith"
                          className="w-full px-4 py-3 rounded-2xl bg-background border border-border/80 text-foreground text-sm placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-[#0056D2] focus:border-transparent transition-all"
                        />
                      </div>
                    </div>

                    {/* Email & Organization (2 cols) */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-foreground block">
                          Email Address <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="email"
                          name="email"
                          required
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="your.email@example.com"
                          className="w-full px-4 py-3 rounded-2xl bg-background border border-border/80 text-foreground text-sm placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-[#0056D2] focus:border-transparent transition-all"
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="text-xs font-bold text-foreground block">
                          Project / Brand / Community (Optional)
                        </label>
                        <input
                          type="text"
                          name="organization"
                          value={formData.organization}
                          onChange={handleChange}
                          placeholder="e.g. Personal Project, Startup, or Community"
                          className="w-full px-4 py-3 rounded-2xl bg-background border border-border/80 text-foreground text-sm placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-[#0056D2] focus:border-transparent transition-all"
                        />
                      </div>
                    </div>

                    {/* Phone & Country (2 cols) */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-foreground block">
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          placeholder="+234 800 000 0000"
                          className="w-full px-4 py-3 rounded-2xl bg-background border border-border/80 text-foreground text-sm placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-[#0056D2] focus:border-transparent transition-all"
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="text-xs font-bold text-foreground block">
                          Location / Country
                        </label>
                        <input
                          type="text"
                          name="country"
                          value={formData.country}
                          onChange={handleChange}
                          placeholder="e.g. Nigeria, US, UK, Remote"
                          className="w-full px-4 py-3 rounded-2xl bg-background border border-border/80 text-foreground text-sm placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-[#0056D2] focus:border-transparent transition-all"
                        />
                      </div>
                    </div>

                    {/* Inquiry Type Dropdown */}
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-foreground block">
                        What would you like to discuss? <span className="text-red-500">*</span>
                      </label>
                      <select
                        name="serviceInterest"
                        required
                        value={formData.serviceInterest}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-2xl bg-background border border-border/80 text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-[#0056D2] focus:border-transparent transition-all cursor-pointer"
                      >
                        <option value="Software Development & Web Apps">Software &amp; Web App Development</option>
                        <option value="UI/UX Design & Brand Identity">UI/UX Design &amp; Brand Systems</option>
                        <option value="IT Consulting & Technical Strategy">IT Advisory &amp; Technical Consulting</option>
                        <option value="AI Workflows & Automation">AI Workflows &amp; Process Automation</option>
                        <option value="Speaking Engagement / Workshop">Speaking Engagement &amp; Technical Workshop</option>
                        <option value="Developer Relations & Hackathons">Developer Relations &amp; Hackathons</option>
                        <option value="Community Mentorship & Volunteering">Community Mentorship &amp; Volunteering</option>
                        <option value="Freelance / Contract Gig">Freelance / Full-Stack Contract Gig</option>
                        <option value="Other Project / Collaboration">Other Project / Partnership</option>
                      </select>
                    </div>

                    {/* Subject Line */}
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-foreground block">
                        Subject <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="subject"
                        required
                        value={formData.subject}
                        onChange={handleChange}
                        placeholder="Brief summary of your project, idea, or request"
                        className="w-full px-4 py-3 rounded-2xl bg-background border border-border/80 text-foreground text-sm placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-[#0056D2] focus:border-transparent transition-all"
                      />
                    </div>

                    {/* Message Field */}
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-foreground block">
                        Details &amp; Message <span className="text-red-500">*</span>
                      </label>
                      <textarea
                        name="message"
                        required
                        rows={5}
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Tell me about what you are building, your ideas, timeline, or how I can help..."
                        className="w-full px-4 py-3 rounded-2xl bg-background border border-border/80 text-foreground text-sm placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-[#0056D2] focus:border-transparent transition-all resize-y"
                      />
                    </div>

                    {/* Submit Button */}
                    <div className="pt-2">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full h-11 sm:h-12 px-8 rounded-2xl bg-[#0056D2] hover:bg-[#0044a8] text-white font-extrabold text-xs sm:text-sm tracking-wider flex items-center justify-center gap-2 transition-all duration-300 shadow-md hover:shadow-lg disabled:opacity-50 cursor-pointer"
                      >
                        {isSubmitting ? (
                          <span>Sending Message...</span>
                        ) : (
                          <>
                            <span>Send Message</span>
                            <ArrowUpRight className="w-4.5 h-4.5" />
                          </>
                        )}
                      </button>
                    </div>

                    {/* Bottom Privacy & Help Note */}
                    <p className="text-[11px] text-muted-foreground text-center pt-2">
                      Your information is private and will only be used to reply directly to you.
                    </p>

                  </form>

                </div>
              </div>

            </div>

          </div>
        </section>

          {/* ─── Trusted Brand Partners Infinite Marquee Carousel ─── */}
          <div className="mt-16 md:mt-20">
            <TrustedBrands brands={displayBrands} />
          </div>

          {/* ─── 6-Pillar Skill & Execution Grid Section ─── */}
          <section className="w-full mt-16 md:mt-24 pt-16 md:pt-20 pb-16 md:pb-24 border-t border-border/70 bg-background">
            <div className="site-container">
              
              {/* Section Header */}
              <div className="text-center flex flex-col items-center justify-center space-y-3 mx-auto max-w-3xl mb-14">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-foreground tracking-tight font-heading">
                  What I Bring to Every Project &amp; Initiative
                </h2>
                <p className="text-sm sm:text-base text-muted-foreground font-normal leading-relaxed text-center max-w-2xl">
                  A hands-on, multi-disciplinary skillset combining modern software engineering, clean design, practical tech strategy, and passionate community leadership.
                </p>
                <div className="w-14 h-1 bg-[#0056D2] rounded-2xl mt-1" />
              </div>

              {/* 6-Item Feature Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 lg:gap-x-16 gap-y-12 lg:gap-y-16">
                
                {/* Feature 1: Software & Web Development */}
                <div className="space-y-4">
                  <div className="w-14 h-14 rounded-2xl border border-border bg-card flex items-center justify-center p-2.5 shadow-2xs">
                    <div className="w-full h-full rounded-2xl border border-border/80 flex items-center justify-center text-[#0056D2]">
                      <Code2 className="w-6 h-6 stroke-[1.75]" />
                    </div>
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-foreground font-heading tracking-tight leading-snug">
                    Full-Stack Software &amp; Web Development
                  </h3>
                  <p className="text-sm text-muted-foreground font-normal leading-relaxed">
                    I build fast, responsive web applications and reliable backends using Next.js, React, TypeScript, Python, and modern APIs with clean code and high performance.
                  </p>
                </div>

                {/* Feature 2: UI/UX & Brand Design */}
                <div className="space-y-4">
                  <div className="w-14 h-14 rounded-2xl border border-border bg-card flex items-center justify-center p-2.5 shadow-2xs">
                    <div className="w-full h-full rounded-2xl border border-border/80 flex items-center justify-center text-[#0056D2]">
                      <Layers className="w-6 h-6 stroke-[1.75]" />
                    </div>
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-foreground font-heading tracking-tight leading-snug">
                    UI/UX Design &amp; Visual Identity
                  </h3>
                  <p className="text-sm text-muted-foreground font-normal leading-relaxed">
                    I design intuitive interfaces and user experiences in Figma, alongside cohesive brand graphics, typography, and visual assets that make projects look polished and modern.
                  </p>
                </div>

                {/* Feature 3: IT Advisory & Technical Strategy */}
                <div className="space-y-4">
                  <div className="w-14 h-14 rounded-2xl border border-border bg-card flex items-center justify-center p-2.5 shadow-2xs">
                    <div className="w-full h-full rounded-2xl border border-border/80 flex items-center justify-center text-[#0056D2]">
                      <ShieldCheck className="w-6 h-6 stroke-[1.75]" />
                    </div>
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-foreground font-heading tracking-tight leading-snug">
                    IT Consulting &amp; Technical Advisory
                  </h3>
                  <p className="text-sm text-muted-foreground font-normal leading-relaxed">
                    I provide actionable technology consulting, system architecture guidance, and ICT leadership to help you make well-informed tech decisions without unnecessary complexity.
                  </p>
                </div>

                {/* Feature 4: AI Workflows & Automation */}
                <div className="space-y-4">
                  <div className="w-14 h-14 rounded-2xl border border-border bg-card flex items-center justify-center p-2.5 shadow-2xs">
                    <div className="w-full h-full rounded-2xl border border-border/80 flex items-center justify-center text-[#0056D2]">
                      <Zap className="w-6 h-6 stroke-[1.75]" />
                    </div>
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-foreground font-heading tracking-tight leading-snug">
                    AI Integration &amp; Workflow Automation
                  </h3>
                  <p className="text-sm text-muted-foreground font-normal leading-relaxed">
                    I set up practical AI-driven tools, automated data flows, and productivity workflows to help you build faster and streamline daily operations.
                  </p>
                </div>

                {/* Feature 5: DevRel, Speaking & Workshops */}
                <div className="space-y-4">
                  <div className="w-14 h-14 rounded-2xl border border-border bg-card flex items-center justify-center p-2.5 shadow-2xs">
                    <div className="w-full h-full rounded-2xl border border-border/80 flex items-center justify-center text-[#0056D2]">
                      <Handshake className="w-6 h-6 stroke-[1.75]" />
                    </div>
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-foreground font-heading tracking-tight leading-snug">
                    Speaking, Workshops &amp; DevRel
                  </h3>
                  <p className="text-sm text-muted-foreground font-normal leading-relaxed">
                    I speak at tech events, run hands-on coding workshops, advocate for developer tools, and teach practical concepts to students and budding engineers.
                  </p>
                </div>

                {/* Feature 6: Community Leadership & Impact */}
                <div className="space-y-4">
                  <div className="w-14 h-14 rounded-2xl border border-border bg-card flex items-center justify-center p-2.5 shadow-2xs">
                    <div className="w-full h-full rounded-2xl border border-border/80 flex items-center justify-center text-[#0056D2]">
                      <Clock className="w-6 h-6 stroke-[1.75]" />
                    </div>
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-foreground font-heading tracking-tight leading-snug">
                    Community Leadership &amp; Volunteering
                  </h3>
                  <p className="text-sm text-muted-foreground font-normal leading-relaxed">
                    I actively lead and volunteer with tech communities (NACOS, GDG, IEEE, Cowrywise), coordinate large tech conferences, and mentor the next generation of builders.
                  </p>
                </div>

              </div>

            </div>
          </section>
        </main>

        <Footer />
      </>
    )
}
