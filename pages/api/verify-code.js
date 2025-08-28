// pages/api/verify-code.js
import { supabase } from "../../lib/supabase";
import { isValidEmail, normalizeEmail } from "../../lib/email";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    // نقرأ الجسم مباشرة (Next يتكفل بالـ JSON parsing في الديف والإنتاج)
    let { email, code } = req.body || {};
    email = normalizeEmail(email);

    // فحوصات سريعة
    if (!isValidEmail(email)) {
      return res.status(400).json({ message: "صيغة البريد الإلكتروني غير صحيحة" });
    }
    if (!code) {
      return res.status(400).json({ message: "الرمز مطلوب" });
    }

    // لوج تشخيص (يظهر في التيرمنال)
    console.log("[verify-code] input:", { email, code });

    // نتحقق من المستخدم + الرمز
    const { data: user, error: selErr } = await supabase
      .from("users")
      .select("id,email,name,temp_code")
      .eq("email", email)
      .eq("temp_code", code)
      .maybeSingle();

    if (selErr) {
      console.error("[verify-code] Supabase select error:", selErr);
      return res.status(500).json({ message: "خطأ في التحقق من البيانات" });
    }

    if (!user) {
      // إما الرمز خطأ أو المستخدم غير موجود
      return res.status(400).json({ message: "الرمز غير صحيح" });
    }

    // (اختياري) تصفير الرمز بعد الاستخدام
    const { error: clearErr } = await supabase
      .from("users")
      .update({ temp_code: null })
      .eq("id", user.id);

    if (clearErr) {
      console.warn("[verify-code] Failed to clear temp_code:", clearErr);
      // نكمل تسجيل الدخول حتى لو فشل التصفير
    }

    console.log("[verify-code] success for:", email);

    return res.status(200).json({
      message: "تم تسجيلك بنجاح",
      name: user.name || "صاحب الحساب",
    });
  } catch (e) {
    console.error("[verify-code] fatal error:", e);
    // نضمن دومًا JSON
    return res.status(500).json({ message: "حدث خطأ داخلي غير متوقع" });
  }
}
