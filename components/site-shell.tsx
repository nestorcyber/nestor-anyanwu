"use client"

import { usePathname } from "next/navigation"
import Navigation from "@/components/navigation"

export default function SiteShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  if (pathname?.startsWith("/admin")) {
    return <>{children}</>
  }

  const fullBleedRoutes = [
    "/",
    "/about",
    "/portfolio",
    "/community",
    "/journal",
    "/contact",
    "/gallery",
    "/community/gallery",
  ]
  const isFullBleed = fullBleedRoutes.includes(pathname || "")

  return (
    <>
      <Navigation />
      <div className={isFullBleed ? "pt-0" : "pt-20 sm:pt-24"}>{children}</div>
    </>
  )
}
