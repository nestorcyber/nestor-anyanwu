"use client"

import Link from "next/link"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <main className="min-h-screen bg-background flex flex-col items-center justify-center px-6 text-center">
      <div className="space-y-6 max-w-lg">
        <div className="text-[120px] md:text-[160px] font-black text-foreground/5 leading-none select-none">500</div>
        <div className="-mt-6 space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-red-500 block">Something Went Wrong</span>
          <h1 className="text-2xl md:text-3xl font-extrabold text-foreground tracking-tight">
            Unexpected error occurred
          </h1>
          <p className="text-sm text-muted-foreground leading-relaxed max-w-sm mx-auto">
            An error occurred while loading this page. This has been noted. Try refreshing or return home.
          </p>
          {process.env.NODE_ENV === "development" && error?.message && (
            <pre className="text-left text-xs bg-card border border-border p-3 mt-4 overflow-auto text-red-500 max-h-32">
              {error.message}
            </pre>
          )}
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <button
            onClick={reset}
            className="text-xs font-bold uppercase tracking-widest bg-accent text-white px-8 py-3.5 transition-all hover:bg-accent/90 cursor-pointer"
          >
            Try Again
          </button>
          <Link href="/">
            <button className="text-xs font-bold uppercase tracking-widest border border-foreground/40 hover:border-accent hover:text-accent px-8 py-3.5 transition-all cursor-pointer text-foreground">
              Go Home
            </button>
          </Link>
        </div>
      </div>
    </main>
  )
}
