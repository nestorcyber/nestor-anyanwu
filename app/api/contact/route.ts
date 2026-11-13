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

    // 1. Anti-spam honeypot verification
    if (typeof body.hp_field === 'string' && body.hp_field.trim() !== '') {
      return NextResponse.json({ success: true, message: 'Your message has been sent successfully.' })
    }

    // 2. Per-IP sliding-window rate limiting
    const ip = getClientIp(req)
    const rate = checkRateLimit(`contact:${ip}`, 5, 15 * 60 * 1000)
    if (!rate.allowed) {
      return NextResponse.json(
        { error: 'Too many requests. Please wait a few minutes before sending another message.' },
        { status: 429, headers: { 'Retry-After': String(rate.retryAfterSeconds) } }
      )
    }

    // 3. Extract and sanitize fields (strip CRLF from all single-line/header fields)
    const firstName =
      typeof body.firstName === 'string'
        ? stripHeaderControlChars(body.firstName).replace(/"/g, '')
        : ''
    const lastName =
      typeof body.lastName === 'string'
        ? stripHeaderControlChars(body.lastName).replace(/"/g, '')
        : ''
    const email = typeof body.email === 'string' ? stripHeaderControlChars(body.email) : ''
    const serviceInterest =
      typeof body.serviceInterest === 'string'
        ? stripHeaderControlChars(body.serviceInterest)
        : ''
    const subject =
      typeof body.subject === 'string' ? stripHeaderControlChars(body.subject) : ''
    const message = typeof body.message === 'string' ? body.message.trim() : ''

    const organization =
      typeof body.organization === 'string'
        ? stripHeaderControlChars(body.organization)
        : ''
    const phone =
      typeof body.phone === 'string' ? stripHeaderControlChars(body.phone) : ''
    const country =
      typeof body.country === 'string' ? stripHeaderControlChars(body.country) : ''

    // 4. Validation & bounded lengths
    if (!firstName || firstName.length > 80) {
      return NextResponse.json({ error: 'A valid first name (1-80 chars) is required.' }, { status: 400 })
    }
    if (!lastName || lastName.length > 80) {
      return NextResponse.json({ error: 'A valid last name (1-80 chars) is required.' }, { status: 400 })
    }
    if (!email || email.length > 254 || !EMAIL_REGEX.test(email)) {
      return NextResponse.json({ error: 'A valid email address is required.' }, { status: 400 })
    }
    if (!serviceInterest || serviceInterest.length > 120) {
      return NextResponse.json({ error: 'Please select a valid discussion topic.' }, { status: 400 })
    }
    if (!subject || subject.length > 200) {
      return NextResponse.json({ error: 'A valid subject (1-200 chars) is required.' }, { status: 400 })
    }
    if (!message || message.length > 10000) {
      return NextResponse.json({ error: 'Message details (1-10,000 chars) are required.' }, { status: 400 })
    }
    if (organization.length > 150 || phone.length > 40 || country.length > 100) {
      return NextResponse.json({ error: 'One or more optional fields exceed maximum length.' }, { status: 400 })
    }

    // 5. Check SMTP Credentials
    const smtpUser = process.env.SMTP_USER
    const smtpPassword = process.env.SMTP_PASSWORD
    const smtpFrom = process.env.SMTP_FROM || 'contact@nestor.name.ng'
    const contactReceiver = process.env.CONTACT_RECEIVER || 'contact@nestor.name.ng'

    if (!smtpUser || !smtpPassword) {
      console.error('[Contact API] Brevo SMTP credentials (SMTP_USER / SMTP_PASSWORD) are not set in environment variables.')
      return NextResponse.json(
        { error: 'Email service is temporarily not configured. Please reach out directly to contact@nestor.name.ng.' },
        { status: 500 }
      )
    }

    // 6. Construct Plain Text Email Body
    let textBody = `NEW CONTACT FORM SUBMISSION\n\n`
    textBody += `CONTACT INFORMATION\n`
    textBody += `----------------------------------------\n`
    textBody += `First Name: ${firstName}\n`
    textBody += `Last Name: ${lastName}\n`
    textBody += `Email Address: ${email}\n`
    if (phone) textBody += `Phone Number: ${phone}\n`
    if (country) textBody += `Location / Country: ${country}\n`

    textBody += `\nPROJECT INFORMATION\n`
    textBody += `----------------------------------------\n`
    if (organization) textBody += `Project / Brand / Community: ${organization}\n`
    textBody += `What would you like to discuss?: ${serviceInterest}\n`
    textBody += `Subject: ${subject}\n`

    textBody += `\nMESSAGE\n`
    textBody += `----------------------------------------\n`
    textBody += `${message}\n`

    // 7. Construct Professional HTML Email Body
    const htmlBody = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>New Contact Form Submission</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; line-height: 1.6; color: #1e293b; background-color: #f8fafc; margin: 0; padding: 20px; }
    .container { max-width: 600px; margin: 0 auto; background-color: #ffffff; border: 1px solid #e2e8f0; border-radius: 5px; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05); }
    .header { background: #0B1C2C; color: #ffffff; padding: 24px 30px; border-bottom: 3px solid #0056D2; }
    .header h1 { margin: 0; font-size: 20px; font-weight: 800; letter-spacing: -0.02em; color: #ffffff; }
    .header p { margin: 4px 0 0 0; font-size: 13px; color: #94a3b8; }
    .content { padding: 30px; }
    .section-title { font-size: 12px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.05em; color: #0056D2; margin-top: 24px; margin-bottom: 12px; border-bottom: 1px solid #f1f5f9; padding-bottom: 6px; }
    .section-title:first-child { margin-top: 0; }
    .field-row { margin-bottom: 10px; display: flex; font-size: 14px; }
    .field-label { font-weight: 700; color: #475569; width: 180px; flex-shrink: 0; }
    .field-value { color: #0f172a; flex: 1; word-break: break-word; }
    .message-box { background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 5px; padding: 16px; margin-top: 10px; font-size: 14px; color: #1e293b; white-space: pre-wrap; word-break: break-word; }
    .footer { background-color: #f8fafc; padding: 16px 30px; border-top: 1px solid #e2e8f0; font-size: 12px; color: #64748b; text-align: center; }
    .reply-badge { display: inline-block; background-color: #eff6ff; color: #0056D2; border: 1px solid #bfdbfe; font-size: 11px; font-weight: 700; padding: 4px 10px; border-radius: 5px; margin-top: 6px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>New Contact Form Submission</h1>
      <p>Received from nestor.name.ng contact form</p>
    </div>
    <div class="content">
      <div class="section-title">Contact Information</div>
      <div class="field-row">
        <span class="field-label">Full Name:</span>
        <span class="field-value">${escapeHtml(firstName)} ${escapeHtml(lastName)}</span>
      </div>
      <div class="field-row">
        <span class="field-label">Email Address:</span>
        <span class="field-value"><a href="mailto:${escapeHtml(email)}" style="color: #0056D2; text-decoration: none; font-weight: 600;">${escapeHtml(email)}</a></span>
      </div>
      ${phone ? `
      <div class="field-row">
        <span class="field-label">Phone Number:</span>
        <span class="field-value">${escapeHtml(phone)}</span>
      </div>` : ''}
      ${country ? `
      <div class="field-row">
        <span class="field-label">Location / Country:</span>
        <span class="field-value">${escapeHtml(country)}</span>
      </div>` : ''}

      <div class="section-title">Project Information</div>
      ${organization ? `
      <div class="field-row">
        <span class="field-label">Project / Brand:</span>
        <span class="field-value">${escapeHtml(organization)}</span>
      </div>` : ''}
      <div class="field-row">
        <span class="field-label">Topic:</span>
        <span class="field-value">${escapeHtml(serviceInterest)}</span>
      </div>
      <div class="field-row">
        <span class="field-label">Subject:</span>
        <span class="field-value"><strong>${escapeHtml(subject)}</strong></span>
      </div>

      <div class="section-title">Message Details</div>
      <div class="message-box">${escapeHtml(message)}</div>

      <div style="margin-top: 20px;">
        <span class="reply-badge">Direct Reply Enabled: Clicking Reply in your email client will reply directly to ${escapeHtml(email)}</span>
      </div>
    </div>
    <div class="footer">
      This message was sent via the official website contact form on nestor.name.ng
    </div>
  </div>
</body>
</html>
    `.trim()

    // 8. Dispatch Email via Brevo SMTP
    const transporter = getEmailTransporter()
    const info = await transporter.sendMail({
      from: `"${firstName} ${lastName} via Nestor Anyanwu" <${smtpFrom}>`,
      to: contactReceiver,
      replyTo: email,
      subject: `[Contact Form] ${subject} - ${firstName} ${lastName}`,
      text: textBody,
      html: htmlBody,
    })

    console.log('[Contact API] Email successfully dispatched via Brevo SMTP. Message ID:', info.messageId)

    return NextResponse.json({
      success: true,
      message: 'Your message has been sent successfully.',
    })
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : String(error)
    console.error('[Contact API] Error sending contact form email:', message)
    return NextResponse.json(
      { error: 'Something went wrong while sending your message. Please try again.' },
      { status: 500 }
    )
  }
}
