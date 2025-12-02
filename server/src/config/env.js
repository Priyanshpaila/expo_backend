import dotenv from 'dotenv';
dotenv.config();

export const env = {
  NODE_ENV: process.env.NODE_ENV || 'development',
  PORT: Number(process.env.PORT || 4000),
  MONGODB_URI: process.env.MONGODB_URI,
  CORS_ORIGIN: process.env.CORS_ORIGIN || '*',
  WA: {
    PHONE_NUMBER_ID: process.env.WHATSAPP_PHONE_NUMBER_ID,
    ACCESS_TOKEN: process.env.WHATSAPP_ACCESS_TOKEN,
    TEMPLATE_NAME: process.env.WHATSAPP_TEMPLATE_NAME || 'expo_rr',
    TEMPLATE_LANG: process.env.WHATSAPP_TEMPLATE_LANG || 'en_US',
    HEADER_IMAGE: process.env.WHATSAPP_HEADER_IMAGE || ''
  },
    SMTP: {
    HOST: process.env.SMTP_HOST,
    PORT: Number(process.env.SMTP_PORT || 465),
    SECURE: String(process.env.SMTP_SECURE || 'true') === 'true',
    USER: process.env.SMTP_USER,
    PASS: process.env.SMTP_PASS,
    FROM: process.env.SMTP_FROM, // optional
  },
  APP_PUBLIC_URL: process.env.APP_PUBLIC_URL,
};


export function assertEnv() {
  const missing = [];
  if (!env.SMTP.HOST) missing.push('SMTP_HOST');
  if (!env.SMTP.USER) missing.push('SMTP_USER');
  if (!env.SMTP.PASS) missing.push('SMTP_PASS');
  if (!env.SMTP.FROM) missing.push('SMTP_FROM');
  if (missing.length) {
    console.warn('⚠️ Missing env vars:', missing.join(', '));
  }
}