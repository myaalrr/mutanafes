// pages/api/verify-login-code.js
import { supabase } from "../../lib/supabase";
import { isValidEmail, normalizeEmail } from "../../lib/email";
import { isAdminEmail } from "../../lib/admins";

export default async function handler(req, res) {
  if (req.method !== "POST")
    return res.status(405).json({ message: "Method not allowed" });

  try {
    let { email, code } = req.body || {};
    email = normalizeEmail(email);

    if (!isValidEmail(email)) {
      return res.status(400).json({ message: "صيغة البريد الإلكتروني غير صحيحة" });
    }
    if (!code) {
      return res.status(400).json({ message: "الرمز مطلوب" });
    }

    const { data: user, error: selErr } = await supabase
      .from("users")
      .select("id,email,name,temp_code")
      .eq("email", email)
      .eq("temp_code", code)
      .maybeSingle();

    if (selErr) {
      console.error("Supabase select error:", selErr);
      return res.status(500).json({ message: "خطأ في التحقق من البيانات" });
    }
    if (!user) {
      return res.status(400).json({ message: "الرمز غير صحيح" });
    }

    const { error: clearErr } = await supabase
      .from("users")
      .update({ temp_code: null })
      .eq("id", user.id);
    if (clearErr) console.warn("Warning: failed to clear temp_code:", clearErr);

    const isAdmin = isAdminEmail(user.email);
    // Debug خفيف لو احتجناه في اللوق
    console.log("[verify-login-code] user:", user.email, "isAdmin:", isAdmin);

    return res.status(200).json({
      message: "تم تسجيل الدخول",
      name: user.name || "صاحب الحساب",
      email: user.email,
      isAdmin,
    });
  } catch (e) {
    console.error("verify-login-code fatal error:", e);
    return res.status(500).json({ message: "حدث خطأ داخلي غير متوقع" });
  }
}

