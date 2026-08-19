"use client"

import React, { useState, FormEvent } from "react"
import Link from "next/link"
import Footer from "@/components/footer"
import TrustedBrands from "@/components/home/trusted-brands"
import {
  Mail,
  Linkedin,
  Github,
  MapPin,
  Clock,
  CheckCircle2,
  ArrowUpRight,
  Phone,
  Sparkles,
  Layers,
  ShieldCheck,
  Handshake,
  Code2,
  CloudUpload,
  Zap,
} from "lucide-react"
import type { BrandPartner } from "@/lib/content"
import { trackContact } from "@/lib/analytics"

// ─── Social icon SVGs ─────────────────────────────────────────────────────────
const WhatsappIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.456L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.413 9.864-9.83 0-2.623-1.01-5.09-2.846-6.93C16.655 1.993 14.202 1.01 11.66 1.01c-5.442 0-9.866 4.415-9.87 9.83-.001 1.702.463 3.361 1.34 4.8l-.996 3.633 3.725-.976z" />
  </svg>
)

const BehanceIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M8.228 15.011c.523 0 .977-.107 1.354-.316.38-.21.68-.5.903-.865.223-.366.333-.79.333-1.272 0-.44-.092-.816-.277-1.127a2.215 2.215 0 0 0-.742-.782c.4-.244.714-.582.946-1.01.23-.43.346-.948.346-1.554 0-.48-.096-.902-.288-1.264a2.41 2.41 0 0 0-.806-.884c-.4-.26-.879-.452-1.439-.57-.557-.123-1.173-.183-1.846-.183H2v13.682h5.728c.167 0 .5-.015 1-.044a7.35 7.35 0 0 0 1.5-.23zm-3.376-7.8h2.646c.71 0 1.25.132 1.62.39.37.26.55.66.55 1.2a1.37 1.37 0 0 1-.22.8c-.14.24-.35.43-.63.56a3.86 3.86 0 0 1-1.02.32c-.41.07-.88.11-1.42.11H4.852zm0 4.619h2.868c.83 0 1.45.16 1.84.48.39.32.58.78.58 1.39a1.64 1.64 0 0 1-.25.93c-.17.27-.42.48-.75.63a4.01 4.01 0 0 1-1.16.36c-.47.07-1 .1-1.58.1H4.852zm14.16-5.834c-1.39 0-2.48.43-3.25 1.29-.77.86-1.16 2.05-1.16 3.58 0 1.52.38 2.7 1.14 3.56.76.85 1.84 1.28 3.23 1.28 1.26 0 2.22-.32 2.87-.97a4.13 4.13 0 0 0 1.05-2.27h-2.12c-.11.41-.31.73-.6.96-.28.23-.69.34-1.22.34-.63 0-1.12-.22-1.46-.66-.34-.44-.52-1.1-.53-1.99h6.05c.02-.13.03-.35.03-.66 0-1.48-.36-2.61-1.07-3.4-.72-.78-1.7-1.18-2.95-1.18zm-1.45 3.819c.07-.63.26-1.11.57-1.43.32-.32.76-.48 1.33-.48.54 0 .97.16 1.27.47.3.31.47.79.52 1.44zM16.642 7.026h4.8v1.091h-4.8z" />
  </svg>
)

const TwitterXIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
)

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
    serviceInterest: "Software Development",
    phone: "",
    country: "",
    subject: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle")

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

    try {
      const endpoint = process.env.NEXT_PUBLIC_FORMSPREE_ID
        ? `https://formspree.io/f/${process.env.NEXT_PUBLIC_FORMSPREE_ID}`
        : null

      if (endpoint) {
        const res = await fetch(endpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify({
            name: `${formData.firstName} ${formData.lastName}`.trim(),
            email: formData.email,
            organization: formData.organization,
            serviceInterest: formData.serviceInterest,
            phone: formData.phone,
            country: formData.country,
            subject: formData.subject,
            message: formData.message,
          }),
        })
        if (!res.ok) throw new Error("Submission failed")
      } else {
        await new Promise((r) => setTimeout(r, 800))
      }

      trackContact(formData.serviceInterest)
      setSubmitStatus("success")
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        organization: "",
        serviceInterest: "Software Development",
        phone: "",
        country: "",
        subject: "",
        message: "",
      })
      setTimeout(() => setSubmitStatus("idle"), 6000)
    } catch {
      setSubmitStatus("error")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <>
      <main className="min-h-screen bg-background font-sans pt-20 md:pt-24 pb-16" id="main-content">
        <div className="site-container">
          
          {/* Main 2-Column Responsive Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            
            {/* ─── 1. HEADLINE & INTRO DESCRIPTION ─── */}
            <div className="order-1 lg:order-1 lg:col-span-5 space-y-6 pt-2">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-foreground tracking-tight font-heading leading-[1.12]">
                Talk to Nestor about your next project or engineering initiative
              </h1>
              <p className="text-sm sm:text-base text-muted-foreground font-normal leading-relaxed">
                Whether you are looking to build scalable software, integrate AI workflows, direct product strategy, consult on IT infrastructure, or collaborate on developer relations and community initiatives — let's connect.
              </p>
            </div>

            {/* ─── 2. CONTACT FORM ─── */}
            <div className="order-2 lg:order-2 lg:col-span-7">
              <div className="bg-card border border-border/80 rounded-3xl p-6 sm:p-8 md:p-10 shadow-lg space-y-6">
                
                <div className="space-y-1 pb-2">
                  <h2 className="text-xl sm:text-2xl font-extrabold text-foreground font-heading">
                    Send a Message
                  </h2>
                  <p className="text-xs sm:text-sm text-muted-foreground">
                    Fill out the form below to start a conversation about your project or initiative.
                  </p>
                </div>

                {submitStatus === "success" && (
                  <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 flex items-center gap-3 text-sm font-medium">
                    <CheckCircle2 className="w-5 h-5 shrink-0" />
                    <span>Thank you! Your message has been received. Nestor will get back to you shortly.</span>
                  </div>
                )}

                {submitStatus === "error" && (
                  <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-600 dark:text-red-400 text-sm font-medium">
                    Something went wrong sending your message. Please reach out directly to{" "}
                    <a href="mailto:nestoranyanwu@gmail.com" className="underline font-bold">
                      nestoranyanwu@gmail.com
                    </a>.
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-5">
                  
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
                        placeholder="Enter your first name"
                        className="w-full px-4 py-3 rounded-xl bg-background border border-border/80 text-foreground text-sm placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-[#0075ff] focus:border-transparent transition-all"
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
                        placeholder="Enter your last name"
                        className="w-full px-4 py-3 rounded-xl bg-background border border-border/80 text-foreground text-sm placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-[#0075ff] focus:border-transparent transition-all"
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
                        placeholder="name@company.com"
                        className="w-full px-4 py-3 rounded-xl bg-background border border-border/80 text-foreground text-sm placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-[#0075ff] focus:border-transparent transition-all"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-bold text-foreground block">
                        Company / Organization
                      </label>
                      <input
                        type="text"
                        name="organization"
                        value={formData.organization}
                        onChange={handleChange}
                        placeholder="Organization or company name"
                        className="w-full px-4 py-3 rounded-xl bg-background border border-border/80 text-foreground text-sm placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-[#0075ff] focus:border-transparent transition-all"
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
                        className="w-full px-4 py-3 rounded-xl bg-background border border-border/80 text-foreground text-sm placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-[#0075ff] focus:border-transparent transition-all"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-bold text-foreground block">
                        Country / Location
                      </label>
                      <input
                        type="text"
                        name="country"
                        value={formData.country}
                        onChange={handleChange}
                        placeholder="e.g. Nigeria, United States, Remote"
                        className="w-full px-4 py-3 rounded-xl bg-background border border-border/80 text-foreground text-sm placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-[#0075ff] focus:border-transparent transition-all"
                      />
                    </div>
                  </div>

                  {/* Inquiry Type Dropdown */}
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-foreground block">
                      How can I support you? <span className="text-red-500">*</span>
                    </label>
                    <select
                      name="serviceInterest"
                      required
                      value={formData.serviceInterest}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl bg-background border border-border/80 text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-[#0075ff] focus:border-transparent transition-all"
                    >
                      <option value="Software Engineering & Web Development">Software Engineering & Web Development</option>
                      <option value="Artificial Intelligence & Emerging Tech">Artificial Intelligence & Emerging Tech</option>
                      <option value="Developer Relations (DevRel) & Community">Developer Relations (DevRel) & Community</option>
                      <option value="Product Strategy & IT Consulting">Product Strategy & IT Consulting</option>
                      <option value="Ingenious Design & Brand Systems">Ingenious Design & Brand Systems</option>
                      <option value="Tech Leadership & Volunteering">Tech Leadership & Volunteering</option>
                      <option value="Speaking Engagement / Tech Event">Speaking Engagement / Tech Event</option>
                      <option value="Other Inquiry / Collaboration">Other Inquiry / Collaboration</option>
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
                      placeholder="Brief summary of your project or inquiry"
                      className="w-full px-4 py-3 rounded-xl bg-background border border-border/80 text-foreground text-sm placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-[#0075ff] focus:border-transparent transition-all"
                    />
                  </div>

                  {/* Message Field */}
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-foreground block">
                      Project Details / Message <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      name="message"
                      required
                      rows={5}
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Describe your project, timeline, deliverables, or collaboration goals..."
                      className="w-full px-4 py-3 rounded-xl bg-background border border-border/80 text-foreground text-sm placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-[#0075ff] focus:border-transparent transition-all resize-y"
                    />
                  </div>

                  {/* Submit Button */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-4 px-8 rounded-xl bg-[#0075ff] hover:bg-blue-600 text-white font-extrabold text-xs tracking-wider flex items-center justify-center gap-2 transition-all duration-300 shadow-md hover:shadow-lg disabled:opacity-50 cursor-pointer"
                    >
                      {isSubmitting ? (
                        <span>Sending Message...</span>
                      ) : (
                        <>
                          <span>Submit Inquiry</span>
                          <ArrowUpRight className="w-4.5 h-4.5" />
                        </>
                      )}
                    </button>
                  </div>

                  {/* Bottom Privacy & Help Note */}
                  <p className="text-[11px] text-muted-foreground text-center pt-2">
                    By submitting this form, you agree to direct communication regarding your inquiry.
                  </p>

                </form>

              </div>
            </div>

          </div>

        </div>

        {/* ─── Trusted Brand Partners Infinite Marquee Carousel ─── */}
        <div className="mt-16 md:mt-20">
          <TrustedBrands brands={displayBrands} />
        </div>

        {/* ─── Webflow-Style "Why Choose Nestor Anyanwu?" 6-Feature Grid Section ─── */}
        <section className="w-full mt-16 md:mt-24 pt-16 md:pt-20 pb-8 border-t border-border/70 bg-slate-50/60 dark:bg-slate-900/30">
          <div className="container-webflow space-y-12">
            
            {/* Section Heading */}
            <div className="space-y-4 max-w-3xl">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-foreground tracking-tight font-heading leading-tight">
                Why Collaborate With Nestor?
              </h2>
              <p className="text-sm sm:text-base text-muted-foreground font-normal leading-relaxed">
                A multidisciplinary approach that unites robust software engineering, strategic design systems, and dedicated technical leadership.
              </p>
            </div>

            {/* 6-Item Feature Grid (3x2) */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-12">
              
              {/* Feature 1 */}
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-full border border-blue-200 dark:border-blue-800/80 bg-blue-50/80 dark:bg-blue-950/50 flex items-center justify-center text-[#0075ff] dark:text-sky-400 shadow-2xs">
                  <Layers className="w-5 h-5" />
                </div>
                <h3 className="text-base sm:text-lg font-bold text-foreground font-heading tracking-tight leading-snug">
                  Break down silos between design, code, and strategy
                </h3>
                <p className="text-xs sm:text-sm text-muted-foreground font-normal leading-relaxed">
                  Combining software engineering precision with strong visual identity design to build digital solutions that look exceptional and perform reliably.
                </p>
              </div>

              {/* Feature 2 */}
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-full border border-blue-200 dark:border-blue-800/80 bg-blue-50/80 dark:bg-blue-950/50 flex items-center justify-center text-[#0075ff] dark:text-sky-400 shadow-2xs">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <h3 className="text-base sm:text-lg font-bold text-foreground font-heading tracking-tight leading-snug">
                  Backed by enterprise-grade reliability & clean code
                </h3>
                <p className="text-xs sm:text-sm text-muted-foreground font-normal leading-relaxed">
                  Engineered with modern frameworks, rigorous typing, and clean component architecture built for long-term scalability and security.
                </p>
              </div>

              {/* Feature 3 */}
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-full border border-blue-200 dark:border-blue-800/80 bg-blue-50/80 dark:bg-blue-950/50 flex items-center justify-center text-[#0075ff] dark:text-sky-400 shadow-2xs">
                  <Handshake className="w-5 h-5" />
                </div>
                <h3 className="text-base sm:text-lg font-bold text-foreground font-heading tracking-tight leading-snug">
                  Dedicated partnership & transparent delivery
                </h3>
                <p className="text-xs sm:text-sm text-muted-foreground font-normal leading-relaxed">
                  Direct collaboration with clear communication, milestone-driven sprints, and technical advisory from discovery to deployment.
                </p>
              </div>

              {/* Feature 4 */}
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-full border border-blue-200 dark:border-blue-800/80 bg-blue-50/80 dark:bg-blue-950/50 flex items-center justify-center text-[#0075ff] dark:text-sky-400 shadow-2xs">
                  <Code2 className="w-5 h-5" />
                </div>
                <h3 className="text-base sm:text-lg font-bold text-foreground font-heading tracking-tight leading-snug">
                  Modern full-stack engineering & APIs
                </h3>
                <p className="text-xs sm:text-sm text-muted-foreground font-normal leading-relaxed">
                  Shipping responsive Next.js web applications, performant backend integrations, and custom software systems tailored to real-world demands.
                </p>
              </div>

              {/* Feature 5 */}
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-full border border-blue-200 dark:border-blue-800/80 bg-blue-50/80 dark:bg-blue-950/50 flex items-center justify-center text-[#0075ff] dark:text-sky-400 shadow-2xs">
                  <CloudUpload className="w-5 h-5" />
                </div>
                <h3 className="text-base sm:text-lg font-bold text-foreground font-heading tracking-tight leading-snug">
                  Seamless cloud architecture & deployment
                </h3>
                <p className="text-xs sm:text-sm text-muted-foreground font-normal leading-relaxed">
                  Deploying scalable digital infrastructure with automated CI/CD pipelines, modern databases, and serverless hosting.
                </p>
              </div>

              {/* Feature 6 */}
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-full border border-blue-200 dark:border-blue-800/80 bg-blue-50/80 dark:bg-blue-950/50 flex items-center justify-center text-[#0075ff] dark:text-sky-400 shadow-2xs">
                  <Zap className="w-5 h-5" />
                </div>
                <h3 className="text-base sm:text-lg font-bold text-foreground font-heading tracking-tight leading-snug">
                  Obsessive performance & user experience
                </h3>
                <p className="text-xs sm:text-sm text-muted-foreground font-normal leading-relaxed">
                  Fast page load times, accessible interfaces, and fluid micro-interactions designed to elevate user engagement and brand credibility.
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
