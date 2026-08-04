// Modular analytics abstraction layer
// All call sites use these functions — swap provider implementations without changing pages

type Properties = Record<string, string | number | boolean | undefined>

// ─── Core track function ───────────────────────────────────────────────────────
// Currently dispatches to Vercel Analytics (already installed)
// Add GA4 / Plausible / Clarity calls here when IDs are configured
export function track(event: string, properties?: Properties): void {
  try {
    // Vercel Analytics — available globally via <Analytics /> in layout
    if (typeof window !== "undefined" && (window as any).va) {
      ;(window as any).va("event", { name: event, ...properties })
    }

    // Google Analytics 4 — activates when NEXT_PUBLIC_GA_ID is set
    if (typeof window !== "undefined" && (window as any).gtag) {
      ;(window as any).gtag("event", event, properties)
    }

    // Development logging
    if (process.env.NODE_ENV === "development") {
      console.log(`[Analytics] ${event}`, properties)
    }
  } catch {
    // Silently fail — analytics must never break UX
  }
}

// ─── Typed event helpers ───────────────────────────────────────────────────────

export function trackPageView(url: string): void {
  track("page_view", { url })
}

export function trackSearch(query: string, resultsCount: number): void {
  track("search", { query, results_count: resultsCount })
}

export function trackContact(inquiryType: string): void {
  track("contact_submission", { inquiry_type: inquiryType })
}

export function trackDownload(filename: string): void {
  track("file_download", { filename })
}

export function trackOutbound(url: string, label?: string): void {
  track("outbound_link_click", { url, label })
}

export function trackNavigation(from: string, to: string): void {
  track("navigation", { from, to })
}

export function trackSearchOpen(): void {
  track("search_modal_open")
}

export function trackScrollDepth(percentage: number, page: string): void {
  track("scroll_depth", { percentage, page })
}

export function trackButtonClick(label: string, location?: string): void {
  track("button_click", { label, location })
}
