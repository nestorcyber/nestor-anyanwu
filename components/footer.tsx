"use client"

import React, { useState } from "react"
import Link from "next/link"
import { ArrowRight, Loader2 } from "lucide-react"

interface SocialLink {
  label: string
  href: string
  path: string
}

// Official brand SVG paths (Simple Icons, 24x24 viewBox)
const FOOTER_SOCIAL_LINKS: SocialLink[] = [
  {
    label: "Twitter X",
    href: "https://twitter.com/nestorcyber",
    path: "M14.234 10.162 22.977 0h-2.072l-7.591 8.824L7.251 0H.258l9.168 13.343L.258 24H2.33l8.016-9.318L16.749 24h6.993zm-2.837 3.299-.929-1.329L3.076 1.56h3.182l5.965 8.532.929 1.329 7.754 11.09h-3.182z",
  },
  {
    label: "LinkedIn",
    href: "https://linkedin.com/in/nestoranyanwu",
    path: "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z",
  },
  {
    label: "GitHub",
    href: "https://github.com/nestorcyber",
    path: "M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12",
  },
  {
    label: "Behance",
    href: "https://behance.net/nestorcyber",
    path: "M16.969 16.927a2.561 2.561 0 0 0 1.901.677 2.501 2.501 0 0 0 1.531-.475c.362-.235.636-.584.779-.99h2.585a5.091 5.091 0 0 1-1.9 2.896 5.292 5.292 0 0 1-3.091.88 5.839 5.839 0 0 1-2.284-.433 4.871 4.871 0 0 1-1.723-1.211 5.657 5.657 0 0 1-1.08-1.874 7.057 7.057 0 0 1-.383-2.393c-.005-.8.129-1.595.396-2.349a5.313 5.313 0 0 1 5.088-3.604 4.87 4.87 0 0 1 2.376.563c.661.362 1.231.87 1.668 1.485a6.2 6.2 0 0 1 .943 2.133c.194.821.263 1.666.205 2.508h-7.699c-.063.79.184 1.574.688 2.187ZM6.947 4.084a8.065 8.065 0 0 1 1.928.198 4.29 4.29 0 0 1 1.49.638c.418.303.748.711.958 1.182.241.579.357 1.203.341 1.83a3.506 3.506 0 0 1-.506 1.961 3.726 3.726 0 0 1-1.503 1.287 3.588 3.588 0 0 1 2.027 1.437c.464.747.697 1.615.67 2.494a4.593 4.593 0 0 1-.423 2.032 3.945 3.945 0 0 1-1.163 1.413 5.114 5.114 0 0 1-1.683.807 7.135 7.135 0 0 1-1.928.259H0V4.084h6.947Zm-.235 12.9c.308.004.616-.029.916-.099a2.18 2.18 0 0 0 .766-.332c.228-.158.411-.371.534-.619.142-.317.208-.663.191-1.009a2.08 2.08 0 0 0-.642-1.715 2.618 2.618 0 0 0-1.696-.505h-3.54v4.279h3.471Zm13.635-5.967a2.13 2.13 0 0 0-1.654-.619 2.336 2.336 0 0 0-1.163.259 2.474 2.474 0 0 0-.738.62 2.359 2.359 0 0 0-.396.792c-.074.239-.12.485-.137.734h4.769a3.239 3.239 0 0 0-.679-1.785l-.002-.001Zm-13.813-.648a2.254 2.254 0 0 0 1.423-.433c.399-.355.607-.88.56-1.413a1.916 1.916 0 0 0-.178-.891 1.298 1.298 0 0 0-.495-.533 1.851 1.851 0 0 0-.711-.274 3.966 3.966 0 0 0-.835-.073H3.241v3.631h3.293v-.014ZM21.62 5.122h-5.976v1.527h5.976V5.122Z",
  },
  {
    label: "WhatsApp",
    href: "https://wa.me/message/GJIXLHQQPYDIE1",
    path: "M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z",
  },
]

export default function Footer() {
  const [email, setEmail] = useState("")
  const [honeypot, setHoneypot] = useState("")
  const [submitting, setSubmitting] = useState(false)
  const [subscribed, setSubscribed] = useState(false)
  const [errorMsg, setErrorMsg] = useState("")

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email.trim() || submitting) return

    setSubmitting(true)
    setErrorMsg("")
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim(), hp_field: honeypot }),
      })
      const data = await res.json().catch(() => ({}))
      if (!res.ok) {
        setErrorMsg(data.error || "Unable to subscribe right now. Please try again.")
        return
      }
      setSubscribed(true)
      setEmail("")
      setTimeout(() => setSubscribed(false), 5000)
    } catch {
      setErrorMsg("Network error. Please try again shortly.")
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <footer className="w-full bg-[#020617] text-[#F1F5F9] border-t border-[#1E293B] py-16 sm:py-20 font-sans">
      <div className="site-container space-y-16">
        {/* Top Section: Headline & Newsletter Form (Left) + Nav Links (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column (Col 1-7) */}
          <div className="lg:col-span-7 space-y-6">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#F1F5F9] tracking-tight leading-tight max-w-xl font-heading">
              Subscribe to get tips and tactics to grow the way you want.
            </h2>

            {subscribed ? (
              <div className="p-4 bg-[#0F172A] border border-[#0056D2] text-[#F1F5F9] font-bold text-xs uppercase tracking-wider rounded-2xl max-w-md">
                ✓ You&apos;re subscribed! Thank you for joining.
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-2 max-w-md">
                <input
                  type="text"
                  name="hp_field"
                  value={honeypot}
                  onChange={(e) => setHoneypot(e.target.value)}
                  tabIndex={-1}
                  autoComplete="off"
                  className="hidden"
                  aria-hidden="true"
                />
                <div className="flex items-center gap-2">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Your email address"
                    required
                    disabled={submitting}
                    className="flex-1 h-11 sm:h-12 bg-[#0F172A] text-[#F1F5F9] border border-[#1E293B] px-4 text-sm placeholder:text-[#CBD5E1]/60 rounded-2xl focus:outline-none focus:border-[#0056D2] transition-colors"
                  />
                  <button
                    type="submit"
                    aria-label="Subscribe"
                    disabled={submitting}
                    className="h-11 sm:h-12 bg-[#0056D2] hover:bg-[#0044a8] text-white font-extrabold px-5 border border-[#1E293B] rounded-2xl transition-all shadow-md disabled:opacity-60 flex items-center justify-center cursor-pointer shrink-0"
                  >
                    {submitting ? (
                      <Loader2 className="w-5 h-5 text-white animate-spin" />
                    ) : (
                      <ArrowRight className="w-5 h-5 text-white" />
                    )}
                  </button>
                </div>
                {errorMsg && (
                  <p className="text-xs text-[#CBD5E1] font-medium pt-1">{errorMsg}</p>
                )}
              </form>
            )}
          </div>

          {/* Right Columns (Col 8-12): 2 Column Nav Links */}
          <div className="lg:col-span-5 grid grid-cols-2 gap-8 text-sm pt-2">
            {/* Nav Column 1 */}
            <div className="space-y-3">
              <h3 className="text-xs font-mono font-bold uppercase tracking-widest text-[#CBD5E1]">
                Discover
              </h3>
              <ul className="space-y-2.5 font-medium text-[#F1F5F9]">
                <li>
                  <Link href="/portfolio" className="hover:text-[#0056D2] transition-colors">
                    Portfolio
                  </Link>
                </li>
                <li>
                  <Link href="/certifications" className="hover:text-[#0056D2] transition-colors">
                    Certifications
                  </Link>
                </li>
                <li>
                  <Link href="/memberships" className="hover:text-[#0056D2] transition-colors">
                    Memberships
                  </Link>
                </li>
                <li>
                  <Link href="/journal" className="hover:text-[#0056D2] transition-colors">
                    Journal
                  </Link>
                </li>
                <li>
                  <Link href="/community" className="hover:text-[#0056D2] transition-colors">
                    Community
                  </Link>
                </li>
                <li>
                  <Link href="/about" className="hover:text-[#0056D2] transition-colors">
                    About
                  </Link>
                </li>
                <li>
                  <Link href="/gallery" className="hover:text-[#0056D2] transition-colors">
                    Gallery
                  </Link>
                </li>
              </ul>
            </div>

            {/* Nav Column 2 */}
            <div className="space-y-3">
              <h3 className="text-xs font-mono font-bold uppercase tracking-widest text-[#CBD5E1]">
                Connect
              </h3>
              <ul className="space-y-2.5 font-medium text-[#F1F5F9]">
                <li>
                  <Link href="/contact" className="hover:text-[#0056D2] transition-colors">
                    Contact Me
                  </Link>
                </li>
                <li>
                  <a href="https://linkedin.com/in/nestoranyanwu" target="_blank" rel="noopener noreferrer" className="hover:text-[#0056D2] transition-colors">
                    LinkedIn
                  </a>
                </li>
                <li>
                  <a href="https://github.com/nestorcyber" target="_blank" rel="noopener noreferrer" className="hover:text-[#0056D2] transition-colors">
                    GitHub
                  </a>
                </li>
                <li>
                  <a href="https://twitter.com/nestorcyber" target="_blank" rel="noopener noreferrer" className="hover:text-[#0056D2] transition-colors">
                    Twitter / X
                  </a>
                </li>
                <li>
                  <a href="https://wa.me/message/GJIXLHQQPYDIE1" target="_blank" rel="noopener noreferrer" className="hover:text-[#0056D2] transition-colors">
                    WhatsApp
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright (Left) & Social Icons (Right) */}
        <div className="pt-8 border-t border-[#1E293B] flex flex-col sm:flex-row items-center justify-between gap-6 text-xs text-[#CBD5E1]">
          <div className="flex items-center">
            <span className="font-medium text-[#F1F5F9]">
              © {new Date().getFullYear()} Nestor Anyanwu
            </span>
          </div>

          <div className="flex items-center gap-6 text-[#CBD5E1]">
            {FOOTER_SOCIAL_LINKS.map((item) => (
              <a
                key={item.label}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#0056D2] transition-colors"
                aria-label={item.label}
              >
                <svg
                  className="w-4.5 h-4.5"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d={item.path} />
                </svg>
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
