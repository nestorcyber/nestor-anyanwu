"use client"

import Footer from "@/components/footer"
import { Mail, MessageCircle, Linkedin, Twitter, Github, Send } from "lucide-react"
import { FormEvent, useState } from "react"

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
                  <MessageCircle size={32} className="text-primary group-hover:scale-110 transition-transform" />
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
                  <Twitter size={32} className="text-primary group-hover:scale-110 transition-transform" />
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
                    placeholder="Tell me about your project or inquiry..."
                  />
                </div>

                {submitStatus === "success" && (
                  <div className="p-4 bg-primary/10 border border-primary rounded-lg">
                    <p className="text-primary font-semibold">Message sent successfully! I&apos;ll get back to you soon.</p>
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
