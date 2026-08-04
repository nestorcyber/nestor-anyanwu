import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Page Not Found | Nestor Cyber",
  description: "The page you are looking for does not exist. Return to the Nestor Anyanwu portfolio.",
  robots: { index: false },
}

export default function NotFound() {
  return (
    <main className="min-h-screen bg-background flex flex-col items-center justify-center px-6 text-center">
      <div className="space-y-6 max-w-lg">
        {/* Large 404 */}
        <div className="text-[120px] md:text-[180px] font-black text-foreground/5 leading-none select-none">
          404
        </div>
        <div className="-mt-8 space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-accent block">Page Not Found</span>
          <h1 className="text-2xl md:text-4xl font-extrabold text-foreground tracking-tight">
            This page doesn't exist
          </h1>
          <p className="text-sm text-muted-foreground leading-relaxed max-w-sm mx-auto">
            The link you followed may be broken, or the page may have been removed. Let's get you back on track.
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <Link href="/">
            <button className="text-xs font-bold uppercase tracking-widest bg-accent text-white px-8 py-3.5 transition-all hover:bg-accent/90 cursor-pointer">
              Go Home
            </button>
          </Link>
          <Link href="/portfolio">
            <button className="text-xs font-bold uppercase tracking-widest border border-foreground/40 hover:border-accent hover:text-accent px-8 py-3.5 transition-all cursor-pointer text-foreground">
              View Portfolio
            </button>
          </Link>
        </div>

        <div className="pt-4 text-xs text-muted-foreground">
          Or use{" "}
          <kbd className="border border-border px-1.5 py-0.5 font-mono text-[10px]">⌘K</kbd>{" "}
          to search the site
        </div>
      </div>
    </main>
  )
}
