// lib/email.js
export function normalizeEmail(email = "") {
  return String(email).trim().toLowerCase();
}

export function isValidEmail(email = "") {
  const trimmed = normalizeEmail(email);
  // صيغة RFC بسيطة + نسمح بنطاقات الجامعات وغيرها
  const basic = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!basic.test(trimmed)) return false;
  // نمنع أي مسافات/أحرف غير مناسبة
  if (/\s/.test(trimmed)) return false;
  return true;
}
