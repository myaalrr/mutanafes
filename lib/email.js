// lib/email.js
export function normalizeEmail(email = "") {
  return String(email).trim().toLowerCase();
}

export function isValidEmail(email = "") {
  const trimmed = normalizeEmail(email);
  const basic = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!basic.test(trimmed)) return false;
  if (/\s/.test(trimmed)) return false;
  return true;
}
