"use client"

import Footer from "@/components/footer"
import {
  Mail, Linkedin, Github, Send, Rocket, Briefcase, Mic, Users, MessageSquare, Handshake,
  MapPin, Clock, CheckCircle2, ArrowUpRight, Phone,
} from "lucide-react"
import { FormEvent, useState } from "react"
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

// ─── Inquiry types ────────────────────────────────────────────────────────────
const inquiryTypes = [
  {
    id: "project",
    label: "Start a Project",
    icon: Rocket,
    color: "#0ea5e9",
    placeholder: "Tell me about the project — scope, goals, timeline, and any technical details.",
    subjectPlaceholder: "e.g. Web App Development for XYZ",
    showOrg: true,
  },
  {
    id: "business",
    label: "Business Inquiry",
    icon: Briefcase,
    color: "#7c3aed",
    placeholder: "Share your business context, what you need, and how you'd like to proceed.",
    subjectPlaceholder: "e.g. Business Partnership Proposal",
    showOrg: true,
  },
  {
    id: "speaking",
    label: "Speaking Invitation",
    icon: Mic,
    color: "#e11d48",
    placeholder: "Describe the event, topic, audience, date, and any speaker requirements.",
    subjectPlaceholder: "e.g. DevFest Talk on AI Ethics",
    showOrg: true,
  },
  {
    id: "partnership",
    label: "Partnership",
    icon: Handshake,
    color: "#059669",
    placeholder: "Outline the partnership opportunity, mutual benefits, and what you're envisioning.",
    subjectPlaceholder: "e.g. Community Tech Partnership",
    showOrg: true,
  },
  {
    id: "volunteer",
    label: "Volunteer / Community",
    icon: Users,
    color: "#d97706",
    placeholder: "Share details about the community initiative, cause, or volunteer opportunity.",
    subjectPlaceholder: "e.g. GDG Owerri Volunteer Support",
    showOrg: false,
  },
  {
    id: "general",
    label: "General Message",
    icon: MessageSquare,
    color: "#6b7280",
    placeholder: "Write your message here — feel free to keep it casual.",
    subjectPlaceholder: "e.g. Quick Question",
    showOrg: false,
  },
]

// ─── Social links ─────────────────────────────────────────────────────────────
const socialLinks = [
  { label: "LinkedIn", href: "https://linkedin.com/in/nestoranyanwu", icon: <Linkedin className="w-5 h-5" /> },
  { label: "GitHub", href: "https://github.com/nestorcyber", icon: <Github className="w-5 h-5" /> },
  { label: "Twitter / X", href: "https://twitter.com/nestorcyber", icon: <TwitterXIcon /> },
  { label: "Behance", href: "https://behance.net/nestorcyber", icon: <BehanceIcon /> },
  { label: "WhatsApp", href: "https://wa.me/message/GJIXLHQQPYDIE1", icon: <WhatsappIcon /> },
]

export default function ContactPage() {
  const [activeType, setActiveType] = useState(inquiryTypes[0])
  const [formData, setFormData] = useState({ name: "", email: "", organization: "", subject: "", message: "" })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle")

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleTypeChange = (type: typeof inquiryTypes[0]) => {
    setActiveType(type)
    setSubmitStatus("idle")
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus("idle")

    try {
      // Formspree-compatible submission (activate by setting NEXT_PUBLIC_FORMSPREE_ID in .env.local)
      const endpoint = process.env.NEXT_PUBLIC_FORMSPREE_ID
        ? `https://formspree.io/f/${process.env.NEXT_PUBLIC_FORMSPREE_ID}`
        : null

      if (endpoint) {
        const res = await fetch(endpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify({ ...formData, inquiryType: activeType.label }),
        })
        if (!res.ok) throw new Error("Submission failed")
      } else {
        // Simulate for demo — replace with real endpoint
        await new Promise((r) => setTimeout(r, 800))
      }

      trackContact(activeType.id)
      setSubmitStatus("success")
      setFormData({ name: "", email: "", organization: "", subject: "", message: "" })
      setTimeout(() => setSubmitStatus("idle"), 5000)
    } catch {
      setSubmitStatus("error")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <>
      <main className="min-h-screen bg-background" id="main-content">
        {/* Hero header */}
        <div className="w-full border-b border-border/60 py-14 md:py-20 bg-[#0B1C2C] text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none" />
          <div className="max-w-5xl mx-auto px-6 md:px-10 relative z-10">
            <span className="text-xs font-bold tracking-widest uppercase text-accent block mb-3">GET IN TOUCH</span>
            <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight leading-tight mb-4">
              Let's Build Something<br />That Matters
            </h1>
            <p className="text-primary-foreground/75 text-base md:text-lg font-light max-w-xl leading-relaxed">
              Whether it's a software project, speaking engagement, community collaboration, or just a conversation — I'm here.
            </p>
          </div>
        </div>

        <div className="max-w-5xl mx-auto px-6 md:px-10 py-14 md:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16">
            {/* ── Left: Info panel ── */}
            <aside className="lg:col-span-2 space-y-8">
              {/* Contact details */}
              <div className="space-y-4">
                <h2 className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Contact Details</h2>
                <a
                  href="mailto:nestoranyanwu@gmail.com"
                  className="flex items-center gap-3 group text-sm text-foreground hover:text-accent transition-colors"
                >
                  <div className="w-9 h-9 border border-border flex items-center justify-center group-hover:border-accent transition-colors">
                    <Mail className="w-4 h-4" />
                  </div>
                  <span>nestoranyanwu@gmail.com</span>
                </a>
                <a
                  href="https://wa.me/message/GJIXLHQQPYDIE1"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 group text-sm text-foreground hover:text-accent transition-colors"
                >
                  <div className="w-9 h-9 border border-border flex items-center justify-center group-hover:border-accent transition-colors">
                    <Phone className="w-4 h-4" />
                  </div>
                  <span>WhatsApp / Chat</span>
                </a>
                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                  <div className="w-9 h-9 border border-border/50 flex items-center justify-center">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <span>Owerri, Imo State, Nigeria</span>
                </div>
              </div>

              {/* Availability */}
              {/* Availability badge */}
              <div className="bg-card border-2 border-slate-900/20 dark:border-slate-800 p-4 space-y-3 shadow-[3px_3px_0px_0px_rgba(15,23,42,0.85)] dark:shadow-[3px_3px_0px_0px_rgba(0,0,0,0.8)]">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-xs font-mono font-bold uppercase tracking-widest text-emerald-600 dark:text-emerald-400">Available for Work</span>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed font-light">
                  Open to freelance projects, consulting engagements, speaking invitations, and community collaborations.
                </p>
                <div className="flex items-center gap-2 text-xs text-muted-foreground font-mono">
                  <Clock className="w-3.5 h-3.5 text-accent" />
                  <span>Typically responds within 24–48 hours</span>
                </div>
              </div>

              {/* Social links */}
              <div className="space-y-3">
                <h2 className="text-xs font-mono font-bold uppercase tracking-widest text-muted-foreground">Connect Online</h2>
                <div className="grid grid-cols-1 gap-2">
                  {socialLinks.map((link) => (
                    <a
                      key={link.label}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 p-3 bg-card border-2 border-slate-900/20 dark:border-slate-800 hover:border-accent hover:text-accent text-sm text-foreground transition-all shadow-xs hover:-translate-y-0.5 group"
                    >
                      <span className="text-muted-foreground group-hover:text-accent transition-colors">{link.icon}</span>
                      <span className="font-bold text-xs uppercase tracking-wider">{link.label}</span>
                      <ArrowUpRight className="w-3.5 h-3.5 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
                    </a>
                  ))}
                </div>
              </div>

              {/* Calendar stub */}
              <div className="bg-card border-2 border-dashed border-slate-900/20 dark:border-slate-800 p-4 space-y-2">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-accent" />
                  <span className="text-xs font-mono font-bold uppercase tracking-widest text-foreground">Book a Call</span>
                </div>
                <p className="text-xs text-muted-foreground font-light">Calendar scheduling coming soon. For now, reach out via email or WhatsApp to arrange a call.</p>
              </div>
            </aside>

            {/* ── Right: Form panel ── */}
            <div className="lg:col-span-3 space-y-6">
              <div>
                <h2 className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-4">What's this about?</h2>
                {/* Inquiry type tabs */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {inquiryTypes.map((type) => {
                    const Icon = type.icon
                    const isActive = activeType.id === type.id
                    return (
                      <button
                        key={type.id}
                        onClick={() => handleTypeChange(type)}
                        className={`flex items-center gap-2 px-3 py-2.5 text-xs font-bold uppercase tracking-wider border transition-all cursor-pointer text-left ${
                          isActive
                            ? "border-current text-white"
                            : "border-border text-foreground/70 hover:border-foreground/50"
                        }`}
                        style={isActive ? { backgroundColor: type.color, borderColor: type.color } : {}}
                        aria-pressed={isActive}
                      >
                        <Icon className="w-3.5 h-3.5 flex-shrink-0" />
                        <span className="leading-tight">{type.label}</span>
                      </button>
                    )
                  })}
                </div>
              </div>

              {/* Form */}
              {submitStatus === "success" ? (
                <div className="border border-green-500/30 bg-green-500/5 p-8 text-center space-y-3">
                  <CheckCircle2 className="w-10 h-10 text-green-500 mx-auto" />
                  <h3 className="text-lg font-bold text-foreground">Message Received!</h3>
                  <p className="text-sm text-muted-foreground">
                    Thanks for reaching out. I'll get back to you within 24–48 hours.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label htmlFor="name" className="block text-xs font-bold uppercase tracking-wider text-foreground mb-1.5">
                        Full Name <span className="text-accent">*</span>
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        aria-required="true"
                        placeholder="Your name"
                        className="w-full px-4 py-3 border border-border bg-card text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all placeholder:text-muted-foreground/50 rounded-none"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-xs font-bold uppercase tracking-wider text-foreground mb-1.5">
                        Email Address <span className="text-accent">*</span>
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        aria-required="true"
                        placeholder="you@example.com"
                        className="w-full px-4 py-3 border border-border bg-card text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all placeholder:text-muted-foreground/50 rounded-none"
                      />
                    </div>
                  </div>

                  {activeType.showOrg && (
                    <div>
                      <label htmlFor="organization" className="block text-xs font-bold uppercase tracking-wider text-foreground mb-1.5">
                        Organization / Company
                      </label>
                      <input
                        type="text"
                        id="organization"
                        name="organization"
                        value={formData.organization}
                        onChange={handleChange}
                        placeholder="Where are you from?"
                        className="w-full px-4 py-3 border border-border bg-card text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all placeholder:text-muted-foreground/50 rounded-none"
                      />
                    </div>
                  )}

                  <div>
                    <label htmlFor="subject" className="block text-xs font-bold uppercase tracking-wider text-foreground mb-1.5">
                      Subject <span className="text-accent">*</span>
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      aria-required="true"
                      placeholder={activeType.subjectPlaceholder}
                      className="w-full px-4 py-3 border border-border bg-card text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all placeholder:text-muted-foreground/50 rounded-none"
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-xs font-bold uppercase tracking-wider text-foreground mb-1.5">
                      Message <span className="text-accent">*</span>
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      aria-required="true"
                      rows={6}
                      placeholder={activeType.placeholder}
                      className="w-full px-4 py-3 border border-border bg-card text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all resize-none placeholder:text-muted-foreground/50 rounded-none"
                    />
                  </div>

                  {submitStatus === "error" && (
                    <div className="p-3 bg-red-500/10 border border-red-500/30 text-red-600 dark:text-red-400 text-sm">
                      Something went wrong. Please try emailing directly at nestoranyanwu@gmail.com
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full flex items-center justify-center gap-2 py-3.5 text-xs font-bold uppercase tracking-widest text-white transition-all disabled:opacity-60 cursor-pointer"
                    style={{ backgroundColor: activeType.color }}
                    aria-busy={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Sending…
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        Send {activeType.label}
                      </>
                    )}
                  </button>

                  <p className="text-[11px] text-muted-foreground text-center">
                    Your information is handled with care and never shared with third parties.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
