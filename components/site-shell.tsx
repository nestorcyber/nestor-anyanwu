"use client"

import { usePathname } from "next/navigation"
import Navigation from "@/components/navigation"

export default function SiteShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  if (pathname?.startsWith("/admin")) {
    return <>{children}</>
  }

  return (
    <>
      <Navigation />
      <div className="pt-14 md:pt-16">{children}</div>
    </>
  )
}
