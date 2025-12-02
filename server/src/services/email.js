// server/src/services/email.js
import nodemailer from "nodemailer";
import { env } from "../config/env.js";

/** Create & reuse the transporter */
let transporter;
function getTransporter() {
  if (transporter) return transporter;
  transporter = nodemailer.createTransport({
    host: env.SMTP.HOST,
    port: Number(env.SMTP.PORT || 465),
    secure: String(env.SMTP.SECURE || "true") === "true",
    auth: { user: env.SMTP.USER, pass: env.SMTP.PASS },
    // Optional hardening:
    tls: { rejectUnauthorized: false }, // keep true in production if your CA is valid
    pool: true,
  });
  return transporter;
}

/** ---- Email HTML (brand styled, responsive, no-reply notice) ---- */
function leadEmailHtml({ lead, headerImage, ctaUrl }) {
  const safe = (v) => (v ?? "").toString();

  // Text from your screenshot/template
  const paragraphs = [
    "Dear Customer,",
    "Thank you for sharing your details and product segment information with RR Ispat (A Unit of GPIL). We truly appreciate your interest in our products and services. Our team will review your submission and connect with you shortly to understand your requirements better.",
    "We value your trust and look forward to building a long-lasting business relationship.",
    "Warm regards,<br/>Team RR Ispat (A Unit of GPIL)",
  ];

  // Simple preheader for better inbox preview
  const preheader =
    "Thank you for sharing your details with RR Ispat. We’ll contact you shortly.";

  return `<!doctype html>
<html>
<head>
  <meta name="viewport" content="width=device-width"/>
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
  <title>RR Ispat – Thank you</title>
  <style>
    /* Base */
    body { margin:0; padding:0; background:#f6f8fb; color:#0f172a; font-family: Inter, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Arial, sans-serif; }
    .wrapper { width:100%; padding:24px; }
    .container { max-width:680px; margin:0 auto; background:#ffffff; border:1px solid #e5e7eb; border-radius:16px; overflow:hidden; box-shadow:0 10px 30px rgba(15,23,42,0.05); }
    .brandbar { height:4px; background:#0ea5e9; }
    .header img { width:100%; height:auto; display:block; }
    .content { padding:24px; }
    h1 { margin:0 0 12px; font-size:20px; }
    p { margin:0 0 14px; line-height:1.65; }
    .meta { margin-top:12px; background:#f8fafc; border:1px solid #e5e7eb; border-radius:12px; padding:14px; }
    .meta-row { display:flex; gap:8px; margin:4px 0; font-size:14px; }
    .meta-label { min-width:120px; color:#475569; font-weight:600; }
    .cta { display:inline-block; margin-top:14px; padding:10px 14px; background:#0ea5e9; color:#fff !important; text-decoration:none; border-radius:10px; font-weight:600; }
    .footer { padding:16px 24px; background:#ffffff; border-top:1px solid #e5e7eb; color:#64748b; font-size:12px; }
    .muted { color:#64748b; font-size:12px; }
    .preheader { display:none; opacity:0; color:transparent; height:0; width:0; overflow:hidden; }
    @media (max-width: 480px) {
      .content { padding:18px; }
      .meta-label { min-width:96px; }
    }
  </style>
</head>
<body>
  <span class="preheader">${preheader}</span>
  <div class="wrapper">
    <div class="container">
      <div class="brandbar"></div>
      ${headerImage ? `<div class="header"><img src="${headerImage}" alt="RR Ispat" /></div>` : ""}

      <div class="content">
        <h1>Thank you for contacting RR Ispat</h1>

        <p>${paragraphs[0]}</p>
        <p>${paragraphs[1]}</p>
        <p>${paragraphs[2]}</p>
        <p>${paragraphs[3]}</p>

        <!-- Lead summary -->
        <div class="meta">
          <div class="meta-row"><div class="meta-label">Name</div><div>${safe(lead.customerName)}</div></div>
          <div class="meta-row"><div class="meta-label">Phone</div><div>${safe(lead.customerPhone)}</div></div>
          <div class="meta-row"><div class="meta-label">Email</div><div>${safe(lead.email)}</div></div>
          <div class="meta-row"><div class="meta-label">Division</div><div>${safe(lead.division)}</div></div>
          <div class="meta-row"><div class="meta-label">Product</div><div>${safe(lead.productCategory)} › ${safe(lead.product)}</div></div>
          <div class="meta-row"><div class="meta-label">Location</div><div>${safe(lead.location)}</div></div>
        </div>

        ${ctaUrl ? `<a href="${ctaUrl}" target="_blank" rel="noopener" class="cta">Visit website</a>` : ""}

        <p class="muted" style="margin-top:16px;">
          This is an automated no-reply email. Please do not reply to this message.
        </p>
      </div>

      <div class="footer">
        © ${new Date().getFullYear()} RR Ispat. All rights reserved.
      </div>
    </div>
  </div>
</body>
</html>`;
}

/** Send lead confirmation email (no-reply) */
export async function sendLeadEmail({ to, lead }) {
  try {
    const t = getTransporter();

    // Reuse your WA header image and public site if available
    const headerImage = env.WA?.HEADER_IMAGE || "";
    const ctaUrl = env.APP_PUBLIC_URL || "";

    const info = await t.sendMail({
      from: env.SMTP.FROM || env.SMTP.USER, // e.g., "RR Ispat (No Reply) <noreply@...>"
      to,
      // No Reply-To on purpose (no-reply flow). If you want replies, set replyTo here.
      subject: "Thank you for your submission — RR Ispat",
      html: leadEmailHtml({ lead, headerImage, ctaUrl }),
    });

    return { ok: true, messageId: info.messageId };
  } catch (error) {
    console.error("EMAIL SEND ERROR:", error?.response || error?.message || error);
    return { ok: false, error: error?.response || error?.message || error };
  }
}
