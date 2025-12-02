import { validationResult } from 'express-validator';
import { Lead } from '../models/Lead.js';
import { sendWhatsAppTemplate, toE164 } from '../services/whatsapp.js';
import { env } from '../config/env.js';
import { sendLeadEmail } from "../services/email.js";

export async function createLead(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ ok: false, errors: errors.array() });
  }

  try {
    const lead = await Lead.create(req.body);

    // WhatsApp
    const e164 = toE164(lead.customerPhone);
    const wa = e164
      ? await sendWhatsAppTemplate({ toPhoneE164: e164 })
      : { ok: false, error: "Invalid phone number" };

    // Email
    const emailResult = lead.email
      ? await sendLeadEmail({ to: lead.email, lead })
      : { ok: false, error: "Invalid email" };

    return res.status(201).json({
      ok: true,
      data: lead,
      whatsapp: wa,
      email: emailResult,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ ok: false, message: "Server error" });
  }
}

export async function getAllLeads(req, res) {
  try {
    // Optional: add pagination or sorting (by latest created)
    const leads = await Lead.find().sort({ createdAt: -1 });

    return res.status(200).json({
      ok: true,
      count: leads.length,
      data: leads
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ ok: false, message: 'Failed to fetch leads' });
  }
}
