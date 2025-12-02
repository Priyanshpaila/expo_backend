// services/whatsapp.js
import axios from 'axios';
import { env } from '../config/env.js';

export function toE164(phone) {
  const digits = String(phone || '').replace(/\D/g, '');
  if (!digits) return '';
  if (digits.startsWith('91')) return `+${digits}`;
  if (digits.length === 10) return `+91${digits}`;
  return `+${digits}`;
}

export async function sendWhatsAppTemplate({ toPhoneE164 }) {
  try {
    const { PHONE_NUMBER_ID, ACCESS_TOKEN, TEMPLATE_NAME, TEMPLATE_LANG, HEADER_IMAGE } = env.WA || {};
    if (!PHONE_NUMBER_ID || !ACCESS_TOKEN) {
      return { ok: false, error: 'WhatsApp credentials not configured' };
    }

    const url = `https://graph.facebook.com/v18.0/${PHONE_NUMBER_ID}/messages`;
    const headers = {
      Authorization: `Bearer ${ACCESS_TOKEN}`,
      'Content-Type': 'application/json'
    };

    // Header image ONLY (because the URL button is static – no parameters)
    const template = {
      name: TEMPLATE_NAME, // e.g., "expo_rr"
      language: { code: TEMPLATE_LANG || 'en_US' },
      components: HEADER_IMAGE ? [{
        type: 'header',
        parameters: [{ type: 'image', image: { link: HEADER_IMAGE } }]
      }] : undefined
    };

    const data = {
      messaging_product: 'whatsapp',
      to: toPhoneE164,
      type: 'template',
      template
    };

    const resp = await axios.post(url, data, { headers });
    console.log('WA SEND OK:', resp.status, JSON.stringify(resp.data));
    return { ok: true, data: resp.data };
  } catch (error) {
    console.error('WA SEND ERROR:', error?.response?.status, JSON.stringify(error?.response?.data || error?.message || error));
    return { ok: false, error: error?.response?.data || error?.message || error };
  }
}
