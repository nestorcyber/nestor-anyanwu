import type { NextRequest } from 'next/server'

/** Strip CR/LF and null bytes to prevent SMTP and HTTP header injection. */
export function stripHeaderControlChars(value: string): string {
  return value.replace(/[\r\n\0]+/g, ' ').trim()
}

/** Escape HTML special characters for safe interpolation inside HTML templates or XML. */
export function escapeHtml(str: string): string {
  if (!str) return ''
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
}

/** Escape XML special characters cleanly. */
export function escapeXml(str: string): string {
  return escapeHtml(str)
}

/** Escape CDATA closing markers so untrusted text cannot terminate a CDATA section early. */
export function escapeCdata(str: string): string {
  return (str || '').replace(/]]>/g, ']]]]><![CDATA[>')
}

/** Serialize data safely for embedding inside <script type="application/ld+json">. */
export function safeJsonLd(data: unknown): string {
  return JSON.stringify(data)
    .replace(/</g, '\\u003c')
    .replace(/>/g, '\\u003e')
    .replace(/&/g, '\\u0026')
    .replace(/\u2028/g, '\\u2028')
    .replace(/\u2029/g, '\\u2029')
}

type RateLimitBucket = {
  count: number
  resetAt: number
}

const rateLimitStore = new Map<string, RateLimitBucket>()
const MAX_BUCKET_ENTRIES = 2000

/** Extract the client IP address from reverse-proxy headers for rate limiting. */
export function getClientIp(req: Request | NextRequest): string {
  const forwarded = req.headers.get('x-forwarded-for')
  if (forwarded) {
    const first = forwarded.split(',')[0]?.trim()
    if (first) return first
  }
  const realIp = req.headers.get('x-real-ip')?.trim()
  return realIp || 'anonymous'
}

/** Fixed-window in-memory rate limiter for public POST endpoints. */
export function checkRateLimit(
  key: string,
  limit = 5,
  windowMs = 15 * 60 * 1000
): { allowed: boolean; retryAfterSeconds: number } {
  const now = Date.now()

  if (rateLimitStore.size > MAX_BUCKET_ENTRIES) {
    for (const [entryKey, bucket] of rateLimitStore.entries()) {
      if (bucket.resetAt <= now) {
        rateLimitStore.delete(entryKey)
      }
    }
  }

  const existing = rateLimitStore.get(key)
  if (!existing || existing.resetAt <= now) {
    rateLimitStore.set(key, { count: 1, resetAt: now + windowMs })
    return { allowed: true, retryAfterSeconds: 0 }
  }

  if (existing.count >= limit) {
    return {
      allowed: false,
      retryAfterSeconds: Math.max(1, Math.ceil((existing.resetAt - now) / 1000)),
    }
  }

  existing.count += 1
  return { allowed: true, retryAfterSeconds: 0 }
}
