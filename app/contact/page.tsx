import type { Metadata } from "next"
import ContactPage from "./contact-client"

export const metadata: Metadata = {
  title: "Contact & Collaboration",
  description: "Get in touch with Nestor Anyanwu for speaking opportunities, software engineering projects, or community leadership collaborations.",
  alternates: {
    canonical: "/contact",
  },
  openGraph: {
    title: "Contact & Collaboration",
    description: "Get in touch with Nestor Anyanwu for speaking opportunities, software engineering projects, or community leadership collaborations.",
    url: "/contact",
  },
  twitter: {
    title: "Contact & Collaboration",
    description: "Get in touch with Nestor Anyanwu for speaking opportunities, software engineering projects, or community leadership collaborations.",
  },
}

export default function Page() {
  return <ContactPage />
}
