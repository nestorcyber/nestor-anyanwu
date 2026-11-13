import { NextRequest, NextResponse } from 'next/server'
import { getEmailTransporter } from '@/lib/email'
import {
  checkRateLimit,
  escapeHtml,
  getClientIp,
  stripHeaderControlChars,
} from '@/lib/security'

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export async function POST(req: NextRequest) {
  try {
    let body: Record<string, unknown>
    try {
      body = await req.json()
    } catch {
      return NextResponse.json({ error: 'Invalid JSON request payload.' }, { status: 400 })
    }

    if (!body || typeof body !== 'object' || Array.isArray(body)) {
      return NextResponse.json({ error: 'Invalid request payload.' }, { status: 400 })
    }

    if (typeof body.hp_field === 'string' && body.hp_field.trim() !== '') {
      return NextResponse.json({ success: true, message: "You're subscribed! Thank you for joining." })
    }

    const ip = getClientIp(req)
    const rate = checkRateLimit(`subscribe:${ip}`, 5, 15 * 60 * 1000)
    if (!rate.allowed) {
      return NextResponse.json(
        { error: 'Too many requests. Please wait before trying again.' },
        { status: 429, headers: { 'Retry-After': String(rate.retryAfterSeconds) } }
      )
    }

    const email = typeof body.email === 'string' ? stripHeaderControlChars(body.email) : ''
    if (!email || email.length > 254 || !EMAIL_REGEX.test(email)) {
      return NextResponse.json({ error: 'Please enter a valid email address.' }, { status: 400 })
    }

    const smtpUser = process.env.SMTP_USER
    const smtpPassword = process.env.SMTP_PASSWORD
    const smtpFrom = process.env.SMTP_FROM || 'contact@nestor.name.ng'
    const contactReceiver = process.env.CONTACT_RECEIVER || 'contact@nestor.name.ng'

    if (!smtpUser || !smtpPassword) {
      console.error('[Subscribe API] SMTP credentials are not configured.')
      return NextResponse.json(
        { error: 'Newsletter signup is temporarily unavailable. Please reach out via the contact page.' },
        { status: 503 }
      )
    }

    const transporter = getEmailTransporter()
    await transporter.sendMail({
      from: `"Nestor Anyanwu Newsletter" <${smtpFrom}>`,
      to: contactReceiver,
      replyTo: email,
      subject: `[Newsletter Signup] New subscriber: ${email}`,
      text: `New footer newsletter subscription request from: ${email}\nSubmitted at: ${new Date().toISOString()}\n`,
      html: `<p>New newsletter subscription request from <strong>${escapeHtml(email)}</strong>.</p>`,
    })

    return NextResponse.json({
      success: true,
      message: "You're subscribed! Thank you for joining.",
    })
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : String(error)
    console.error('[Subscribe API] Subscription failed:', message)
    return NextResponse.json(
      { error: 'Unable to subscribe right now. Please try again shortly.' },
      { status: 500 }
    )
  }
}
