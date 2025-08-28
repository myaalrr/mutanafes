// lib/admins.js
export function normalizeEmail(email = "") {
  return String(email).trim().toLowerCase();
}

// ⚠️ Fallback ثابت — عشان ما تعلقين لو الـ ENV ناقص.
// تقدرِين تغيّرينه لاحقًا أو تشيلينه لو ضبطتِ ADMIN_EMAILS.
const FALLBACK_ADMIN_EMAILS = ["mysmabdullah@gmail.com"];

const envAdmins = (process.env.ADMIN_EMAILS || process.env.NEXT_PUBLIC_ADMIN_EMAILS || "")
  .split(",")
  .map((e) => normalizeEmail(e))
  .filter(Boolean);

const ADMIN_SET = new Set([...FALLBACK_ADMIN_EMAILS.map(normalizeEmail), ...envAdmins]);

export function isAdminEmail(email = "") {
  return ADMIN_SET.has(normalizeEmail(email));
}
