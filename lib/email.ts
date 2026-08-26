import nodemailer from "nodemailer"

/**
 * Creates and returns a Nodemailer transporter configured for Brevo SMTP.
 * 
 * Uses standard port 587 with STARTTLS.
 * Host: smtp-relay.brevo.com
 */
export function getEmailTransporter() {
  const host = process.env.SMTP_HOST || "smtp-relay.brevo.com"
  const port = Number(process.env.SMTP_PORT || 587)
  const user = process.env.SMTP_USER
  const pass = process.env.SMTP_PASSWORD

  if (!user || !pass) {
    console.warn(
      "[Brevo SMTP] Missing SMTP_USER or SMTP_PASSWORD environment variables. Email sending will fail until configured."
    )
  }

  const isSecure = port === 465

  return nodemailer.createTransport({
    host,
    port,
    secure: isSecure, // true for 465 (SSL/TLS), false for 587/2525 (STARTTLS)
    auth: {
      user,
      pass,
    },
    tls: {
      rejectUnauthorized: true,
    },
  })
}
