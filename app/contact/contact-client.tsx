"use client"

import Footer from "@/components/footer"
import { Mail, Linkedin, Github, Send } from "lucide-react"
import { FormEvent, useState } from "react"

const BehanceIcon = ({ className = "w-8 h-8" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M8.228 15.011c.523 0 .977-.107 1.354-.316.38-.21.68-.5.903-.865.223-.366.333-.79.333-1.272 0-.44-.092-.816-.277-1.127a2.215 2.215 0 0 0-.742-.782c.4-.244.714-.582.946-1.01.23-.43.346-.948.346-1.554 0-.48-.096-.902-.288-1.264a2.41 2.41 0 0 0-.806-.884c-.4-.26-.879-.452-1.439-.57-.557-.123-1.173-.183-1.846-.183H2v13.682h5.728c.167 0 .5-.015 1-.044a7.35 7.35 0 0 0 1.5-.23zm-3.376-7.8h2.646c.71 0 1.25.132 1.62.39.37.26.55.66.55 1.2a1.37 1.37 0 0 1-.22.8c-.14.24-.35.43-.63.56a3.86 3.86 0 0 1-1.02.32c-.41.07-.88.11-1.42.11H4.852zm0 4.619h2.868c.83 0 1.45.16 1.84.48.39.32.58.78.58 1.39a1.64 1.64 0 0 1-.25.93c-.17.27-.42.48-.75.63a4.01 4.01 0 0 1-1.16.36c-.47.07-1 .1-1.58.1H4.852zm14.16-5.834c-1.39 0-2.48.43-3.25 1.29-.77.86-1.16 2.05-1.16 3.58 0 1.52.38 2.7 1.14 3.56.76.85 1.84 1.28 3.23 1.28 1.26 0 2.22-.32 2.87-.97a4.13 4.13 0 0 0 1.05-2.27h-2.12c-.11.41-.31.73-.6.96-.28.23-.69.34-1.22.34-.63 0-1.12-.22-1.46-.66-.34-.44-.52-1.1-.53-1.99h6.05c.02-.13.03-.35.03-.66 0-1.48-.36-2.61-1.07-3.4-.72-.78-1.7-1.18-2.95-1.18zm-1.45 3.819c.07-.63.26-1.11.57-1.43.32-.32.76-.48 1.33-.48.54 0 .97.16 1.27.47.3.31.47.79.52 1.44zM16.642 7.026h4.8v1.091h-4.8z" />
  </svg>
)

const WhatsappIcon = ({ className = "w-8 h-8" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.456L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.413 9.864-9.83 0-2.623-1.01-5.09-2.846-6.93C16.655 1.993 14.202 1.01 11.66 1.01c-5.442 0-9.866 4.415-9.87 9.83-.001 1.702.463 3.361 1.34 4.8l-.996 3.633 3.725-.976zm11.453-7.512c-.3-.15-1.772-.875-2.046-.975-.276-.1-.476-.15-.676.15-.2.3-.775.975-.95 1.175-.175.2-.35.225-.65.075-.3-.15-1.265-.467-2.41-1.485-.89-.794-1.49-1.775-1.665-2.075-.175-.3-.019-.462.13-.611.135-.134.3-.35.45-.525.15-.175.2-.3.3-.5.1-.2.05-.375-.025-.525-.075-.15-.676-1.625-.926-2.225-.244-.589-.513-.509-.676-.517-.15-.008-.325-.008-.5-.008-.175 0-.46.06-.7.325-.24.265-.915.894-.915 2.178 0 1.285.935 2.527 1.065 2.7 1.25 1.65 2.875 2.5 4.375 2.925.3.085.6.1.825.067.25-.037.775-.317.885-.625.11-.308.11-.57.078-.625-.033-.055-.125-.085-.425-.235z" />
  </svg>
)

const FacebookIcon = ({ className = "w-8 h-8" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
  </svg>
)

const TwitterXIcon = ({ className = "w-8 h-8" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
)

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle")

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus("idle")

    try {
      // In a real application, you would send this to a backend API
      console.log("Form submitted:", formData)
      
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 500))
      
      setSubmitStatus("success")
      setFormData({ name: "", email: "", message: "" })
      
      // Reset success message after 3 seconds
      setTimeout(() => setSubmitStatus("idle"), 3000)
    } catch (error) {
      console.error("Error submitting form:", error)
      setSubmitStatus("error")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <>
      <main className="min-h-screen bg-background pt-8 pb-20">
        <div className="max-w-5xl mx-auto px-4 md:px-8">
          {/* Header */}
          <div className="mb-16">
            <h1 className="text-2xl md:text-3xl font-sans font-bold text-primary mb-6 uppercase tracking-wide">
              Get In Touch
            </h1>
            <p className="text-sm md:text-base text-foreground font-medium max-w-2xl">
              Interested in connecting or collaborating? Reach out through your preferred channel below.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Contact Methods - Icon Only */}
            <div>
              <h2 className="text-lg font-sans font-bold text-primary mb-8 uppercase tracking-wide">Connect With Nestor</h2>
              
              <div className="flex flex-wrap gap-6">
                {/* Email */}
                <a
                  href="mailto:nestoranyanwu@gmail.com"
                  className="p-4 bg-primary/10 rounded-lg hover:bg-primary/20 transition-colors group"
                  title="Send an email"
                >
                  <Mail size={32} className="text-primary group-hover:scale-110 transition-transform" />
                </a>

                {/* WhatsApp */}
                <a
                  href="https://wa.me/message/GJIXLHQQPYDIE1"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-4 bg-primary/10 rounded-lg hover:bg-primary/20 transition-colors group"
                  title="Message on WhatsApp"
                >
                  <WhatsappIcon className="w-8 h-8 text-primary group-hover:scale-110 transition-transform" />
                </a>

                {/* LinkedIn */}
                <a
                  href="https://linkedin.com/in/nestoranyanwu"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-4 bg-primary/10 rounded-lg hover:bg-primary/20 transition-colors group"
                  title="Connect on LinkedIn"
                >
                  <Linkedin size={32} className="text-primary group-hover:scale-110 transition-transform" />
                </a>

                {/* Twitter */}
                <a
                  href="https://twitter.com/nestorcyber"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-4 bg-primary/10 rounded-lg hover:bg-primary/20 transition-colors group"
                  title="Follow on X/Twitter"
                >
                  <TwitterXIcon className="w-8 h-8 text-primary group-hover:scale-110 transition-transform" />
                </a>

                {/* GitHub */}
                <a
                  href="https://github.com/nestorcyber"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-4 bg-primary/10 rounded-lg hover:bg-primary/20 transition-colors group"
                  title="View GitHub profile"
                >
                  <Github size={32} className="text-primary group-hover:scale-110 transition-transform" />
                </a>

                {/* Facebook */}
                <a
                  href="https://facebook.com/nestorcyber"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-4 bg-primary/10 rounded-lg hover:bg-primary/20 transition-colors group"
                  title="Connect on Facebook"
                >
                  <FacebookIcon className="w-8 h-8 text-primary group-hover:scale-110 transition-transform" />
                </a>

                {/* Behance */}
                <a
                  href="https://behance.net/nestorcyber"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-4 bg-primary/10 rounded-lg hover:bg-primary/20 transition-colors group"
                  title="View Behance portfolio"
                >
                  <BehanceIcon className="w-8 h-8 text-primary group-hover:scale-110 transition-transform" />
                </a>
              </div>
            </div>

            {/* Contact Form */}
            <div>
              <h2 className="text-lg font-sans font-bold text-primary mb-8 uppercase tracking-wide">Send a Message</h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-semibold text-foreground mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg border border-border bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                    placeholder="Your name"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-semibold text-foreground mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg border border-border bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                    placeholder="your.email@example.com"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-semibold text-foreground mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full px-4 py-3 rounded-lg border border-border bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all resize-none"
                    placeholder="Share details about the project or inquiry..."
                  />
                </div>

                {submitStatus === "success" && (
                  <div className="p-4 bg-primary/10 border border-primary rounded-lg">
                    <p className="text-primary font-semibold">Message sent successfully! Nestor will get back to you soon.</p>
                  </div>
                )}

                {submitStatus === "error" && (
                  <div className="p-4 bg-red-100/50 border border-red-300 rounded-lg">
                    <p className="text-red-900 font-semibold">There was an error sending your message. Please try again.</p>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-primary hover:bg-primary/90 text-secondary font-bold py-3 rounded-lg flex items-center justify-center gap-2 transition-all disabled:opacity-50"
                >
                  {isSubmitting ? "Sending..." : "Send Message"}
                  {!isSubmitting && <Send size={18} />}
                </button>
              </form>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
