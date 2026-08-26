import { NextRequest, NextResponse } from "next/server"
import { getEmailTransporter } from "@/lib/email"

// HTML escape helper to prevent injection in email clients
function escapeHtml(str: string): string {
  if (!str) return ""
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;")
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()

    // 1. Anti-spam honeypot verification
    // If a bot fills out the hidden honeypot field, silently accept without sending email
    if (body.hp_field && typeof body.hp_field === "string" && body.hp_field.trim() !== "") {
      return NextResponse.json({ success: true, message: "Your message has been sent successfully." })
    }

    // 2. Extract and sanitize fields
    const firstName = typeof body.firstName === "string" ? body.firstName.trim() : ""
    const lastName = typeof body.lastName === "string" ? body.lastName.trim() : ""
    const email = typeof body.email === "string" ? body.email.trim() : ""
    const serviceInterest = typeof body.serviceInterest === "string" ? body.serviceInterest.trim() : ""
    const subject = typeof body.subject === "string" ? body.subject.trim() : ""
    const message = typeof body.message === "string" ? body.message.trim() : ""
    
    // Optional fields
    const organization = typeof body.organization === "string" ? body.organization.trim() : ""
    const phone = typeof body.phone === "string" ? body.phone.trim() : ""
    const country = typeof body.country === "string" ? body.country.trim() : ""

    // 3. Validation
    if (!firstName) {
      return NextResponse.json({ error: "First name is required." }, { status: 400 })
    }
    if (!lastName) {
      return NextResponse.json({ error: "Last name is required." }, { status: 400 })
    }
    if (!email || !EMAIL_REGEX.test(email)) {
      return NextResponse.json({ error: "A valid email address is required." }, { status: 400 })
    }
    if (!serviceInterest) {
      return NextResponse.json({ error: "Please select a discussion topic." }, { status: 400 })
    }
    if (!subject) {
      return NextResponse.json({ error: "Subject is required." }, { status: 400 })
    }
    if (!message) {
      return NextResponse.json({ error: "Message details are required." }, { status: 400 })
    }

    // 4. Check SMTP Credentials
    const smtpUser = process.env.SMTP_USER
    const smtpPassword = process.env.SMTP_PASSWORD
    const smtpFrom = process.env.SMTP_FROM || "contact@nestor.name.ng"
    const contactReceiver = process.env.CONTACT_RECEIVER || "contact@nestor.name.ng"

    if (!smtpUser || !smtpPassword) {
      console.error("[Contact API] Brevo SMTP credentials (SMTP_USER / SMTP_PASSWORD) are not set in environment variables.")
      return NextResponse.json(
        { error: "Email service is temporarily not configured. Please reach out directly to contact@nestor.name.ng." },
        { status: 500 }
      )
    }

    // 5. Construct Plain Text Email Body
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

    // 6. Construct Professional HTML Email Body
    const htmlBody = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>New Contact Form Submission</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; line-height: 1.6; color: #1e293b; background-color: #f8fafc; margin: 0; padding: 20px; }
    .container { max-width: 600px; margin: 0 auto; background-color: #ffffff; border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05); }
    .header { background: #0B1C2C; color: #ffffff; padding: 24px 30px; border-bottom: 3px solid #0075ff; }
    .header h1 { margin: 0; font-size: 20px; font-weight: 800; letter-spacing: -0.02em; color: #ffffff; }
    .header p { margin: 4px 0 0 0; font-size: 13px; color: #94a3b8; }
    .content { padding: 30px; }
    .section-title { font-size: 12px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.05em; color: #0075ff; margin-top: 24px; margin-bottom: 12px; border-bottom: 1px solid #f1f5f9; padding-bottom: 6px; }
    .section-title:first-child { margin-top: 0; }
    .field-row { margin-bottom: 10px; display: flex; font-size: 14px; }
    .field-label { font-weight: 700; color: #475569; width: 180px; flex-shrink: 0; }
    .field-value { color: #0f172a; flex: 1; word-break: break-word; }
    .message-box { background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 16px; margin-top: 10px; font-size: 14px; color: #1e293b; white-space: pre-wrap; word-break: break-word; }
    .footer { background-color: #f8fafc; padding: 16px 30px; border-top: 1px solid #e2e8f0; font-size: 12px; color: #64748b; text-align: center; }
    .reply-badge { display: inline-block; background-color: #eff6ff; color: #0075ff; border: 1px solid #bfdbfe; font-size: 11px; font-weight: 700; padding: 4px 10px; border-radius: 6px; margin-top: 6px; }
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
        <span class="field-value"><a href="mailto:${escapeHtml(email)}" style="color: #0075ff; text-decoration: none; font-weight: 600;">${escapeHtml(email)}</a></span>
      </div>
      ${phone ? `
      <div class="field-row">
        <span class="field-label">Phone Number:</span>
        <span class="field-value">${escapeHtml(phone)}</span>
      </div>` : ""}
      ${country ? `
      <div class="field-row">
        <span class="field-label">Location / Country:</span>
        <span class="field-value">${escapeHtml(country)}</span>
      </div>` : ""}

      <div class="section-title">Project Information</div>
      ${organization ? `
      <div class="field-row">
        <span class="field-label">Project / Brand:</span>
        <span class="field-value">${escapeHtml(organization)}</span>
      </div>` : ""}
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

    // 7. Dispatch Email via Brevo SMTP
    const transporter = getEmailTransporter()

    const mailOptions = {
      from: `"${firstName} ${lastName} via Nestor Anyanwu" <${smtpFrom}>`,
      to: contactReceiver,
      replyTo: email,
      subject: `[Contact Form] ${subject} - ${firstName} ${lastName}`,
      text: textBody,
      html: htmlBody,
    }

    const info = await transporter.sendMail(mailOptions)
    console.log("[Contact API] Email successfully dispatched via Brevo SMTP. Message ID:", info.messageId)

    return NextResponse.json({
      success: true,
      message: "Your message has been sent successfully.",
    })
  } catch (error: any) {
    // Safe error logging - never log passwords or credentials
    console.error("[Contact API] Error sending contact form email:", error?.message || error)
    return NextResponse.json(
      { error: "Something went wrong while sending your message. Please try again." },
      { status: 500 }
    )
  }
}
