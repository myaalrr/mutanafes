// pages/api/send-login-code.js
import { supabase } from "../../lib/supabase";
import nodemailer from "nodemailer";
import { isValidEmail, normalizeEmail } from "../../lib/email";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS },
  pool: true,
  maxConnections: 2,
  maxMessages: 50,
  connectionTimeout: 10000,
  socketTimeout: 15000,
});

async function sendEmailSafe(opts) {
  const timeout = new Promise((_, rej) =>
    setTimeout(() => rej(new Error("EmailTimeout")), 12000)
  );
  return Promise.race([transporter.sendMail(opts), timeout]);
}

export default async function handler(req, res) {
  if (req.method !== "POST")
    return res.status(405).json({ message: "Method not allowed" });

  try {
    let { email } = req.body || {};
    email = normalizeEmail(email);

    if (!isValidEmail(email)) {
      return res.status(400).json({ message: "صيغة البريد الإلكتروني غير صحيحة" });
    }

    const { data: user, error: fetchErr } = await supabase
      .from("users")
      .select("id,email,name")
      .eq("email", email)
      .maybeSingle();

    if (fetchErr) {
      console.error("[send-login-code] select error:", fetchErr);
      return res.status(500).json({ message: "خطأ في التحقق من المستخدم" });
    }
    if (!user) {
      return res.status(404).json({ notFound: true, message: "الحساب غير موجود." });
    }

    const tempCode = Math.floor(100000 + Math.random() * 900000).toString();

    const { error: updErr } = await supabase
      .from("users")
      .update({ temp_code: tempCode })
      .eq("id", user.id);

    if (updErr) {
      console.error("[send-login-code] update error:", updErr);
      return res.status(500).json({ message: "خطأ في حفظ الرمز" });
    }

    try {
      await sendEmailSafe({
        from: `متنافس <${process.env.EMAIL_USER}>`,
        to: email,
        subject: "رمز تسجيل الدخول",
        text: `رمز الدخول الخاص بك هو: ${tempCode}`,
      });
      return res.status(200).json({ message: "تم إرسال الرمز" });
    } catch (mailErr) {
      console.warn("[send-login-code] email fallback:", mailErr.message);
      return res.status(200).json({
        message:
          "تم إنشاء الرمز، ولكن تأخّر إرسال الإيميل. تحقق بعد دقيقة أو راجع مجلد الرسائل غير المرغوب فيها.",
      });
    }
  } catch (e) {
    console.error("[send-login-code] fatal:", e);
    return res.status(500).json({ message: "حدث خطأ أثناء إرسال الرمز" });
  }
}

