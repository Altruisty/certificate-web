import { NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

export const runtime = 'nodejs'

export async function POST(req) {
  try {
    const data = await req.formData()
    const file = data.get('pdf')
    const candidateEmail = data.get('candidateEmail')
    const candidateName = data.get('candidateName') || 'Candidate'

    if (!file || !candidateEmail) {
      return NextResponse.json(
        { success: false, message: 'Missing PDF or email' },
        { status: 400 }
      )
    }

    const buffer = Buffer.from(await file.arrayBuffer())

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT || 587),
      secure: process.env.SMTP_SECURE === 'true',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    })

    const fromName = process.env.SMTP_FROM_NAME || 'Altruisty Innovation'
    const fromEmail = process.env.SMTP_FROM_EMAIL || process.env.SMTP_USER

    await transporter.sendMail({
      from: `"${fromName}" <${fromEmail}>`,
      replyTo: fromEmail,
      to: candidateEmail,
      subject: `Internship Offer Letter — Altruisty Innovation | ${candidateName}`,
      text: `Dear ${candidateName},

We are pleased to offer you an internship position at Altruisty Innovation Pvt. Ltd.

Your official offer letter outlining the terms, duration, and responsibilities of your internship is attached to this email. Please review the details carefully, sign the acceptance copy, and return it by replying to this thread.

If you have any questions regarding the onboarding process or the offer terms, feel free to contact us.

We look forward to having you on our team.

Sincerely,
People Operations Team
Altruisty Innovation Pvt. Ltd.
Website: https://altruistyinnovation.com
      `,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
        </head>
        <body style="margin: 0; padding: 24px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f8fafc; color: #1e293b;">
          <div style="max-width: 580px; margin: 0 auto; background: #ffffff; border: 1px solid #e2e8f0; border-radius: 8px; overflow: hidden;">
            
            <div style="background-color: #0f172a; padding: 24px 32px;">
              <h1 style="margin: 0; font-size: 20px; font-weight: 600; color: #ffffff; letter-spacing: -0.01em;">
                Altruisty Innovation
              </h1>
            </div>

            <div style="padding: 32px; line-height: 1.6; font-size: 15px;">
              <p style="margin-top: 0;">Dear <strong>${candidateName}</strong>,</p>

              <p>
                We are pleased to offer you an exciting internship opportunity at <strong>Altruisty Innovation Pvt. Ltd.</strong> Following our evaluation, we were impressed by your background and believe your skill set will be a great addition to our team.
              </p>

              <p>
                Please find your formal <strong>Internship Offer Letter</strong> attached to this email. It outlines the scope of work, stipend details, duration, and conditions of your engagement.
              </p>

              <p>
                If you have any questions or require clarifications prior to signing, reply directly to this email.
              </p>

              <p style="margin-bottom: 0;">
                We look forward to working with you.
              </p>

              <div style="margin-top: 32px; padding-top: 20px; border-top: 1px solid #e2e8f0; font-size: 14px; color: #64748b;">
                <strong style="color: #0f172a;">Human Resources & Talent Acquisition</strong><br>
                Altruisty Innovation Pvt. Ltd.<br>
                <a href="https://altruistyinnovation.com" style="color: #2563eb; text-decoration: none;">www.altruistyinnovation.com</a>
              </div>
            </div>

          </div>
        </body>
        </html>
      `,
      attachments: [
        {
          filename: `Altruisty-Offer-Letter-${candidateName.replace(/\s+/g, '_')}.pdf`,
          content: buffer,
          contentType: 'application/pdf',
        },
      ],
    })

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('SMTP error:', err)
    return NextResponse.json(
      { success: false, message: err.message || 'Email sending failed' },
      { status: 500 }
    )
  }
}