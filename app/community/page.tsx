import type { Metadata } from "next"
import CommunityPage from "./community-client"

export const metadata: Metadata = {
  title: "Community & Volunteering | Impact",
  description: "Learn about Nestor Anyanwu's community building, tech advocacy, and volunteering efforts with NACOS, IEEE, and Google Developer Groups.",
  alternates: {
    canonical: "/community",
  },
  openGraph: {
    title: "Community & Volunteering | Impact",
    description: "Learn about Nestor Anyanwu's community building, tech advocacy, and volunteering efforts with NACOS, IEEE, and Google Developer Groups.",
    url: "/community",
  },
  twitter: {
    title: "Community & Volunteering | Impact",
    description: "Learn about Nestor Anyanwu's community building, tech advocacy, and volunteering efforts with NACOS, IEEE, and Google Developer Groups.",
  },
}

export default function Page() {
  return <CommunityPage />
}
