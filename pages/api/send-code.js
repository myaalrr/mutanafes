// pages/api/send-code.js
import { supabase } from "../../lib/supabase";
import nodemailer from "nodemailer";
import { isValidEmail, normalizeEmail } from "../../lib/email";

// استخدام pool لتسريع الإرسال
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS },
  pool: true,
  maxConnections: 2,
  maxMessages: 50,
  connectionTimeout: 10000, // 10s
  socketTimeout: 15000,     // 15s
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
    let { email, name } = req.body || {};
    email = normalizeEmail(email);

    if (!isValidEmail(email)) {
      return res.status(400).json({ message: "صيغة البريد الإلكتروني غير صحيحة" });
    }

    // هل الإيميل موجود؟
    const { data: existing, error: existErr } = await supabase
      .from("users")
      .select("id")
      .eq("email", email)
      .maybeSingle();

    if (existErr) {
      console.error("Supabase check error:", existErr);
      return res.status(500).json({ message: "خطأ في التحقق من المستخدم" });
    }
    if (existing) {
      // الإيميل موجود مسبقًا → رجّع exists:true عشان الواجهة تعرض رابط تسجيل الدخول
      return res.status(200).json({ exists: true });
    }

    // توليد الرمز
    const tempCode = Math.floor(100000 + Math.random() * 900000).toString();

    // حفظ الرمز
    const { error: insertErr } = await supabase
      .from("users")
      .insert([{ email, name: name || null, temp_code: tempCode }]);

    if (insertErr) {
      console.error("Supabase insert error:", insertErr);
      return res.status(500).json({ message: "خطأ في حفظ الرمز" });
    }

    // إرسال الإيميل مع مهلة قصوى
    try {
      await sendEmailSafe({
        from: `متنافس <${process.env.EMAIL_USER}>`,
        to: email,
        subject: "رمز إنشاء الحساب",
        text: `رمز التحقق الخاص بك هو: ${tempCode}`,
      });
      return res.status(200).json({ message: "تم إرسال الرمز" });
    } catch (mailErr) {
      console.warn("Email send fallback:", mailErr.message);
      return res.status(200).json({
        message:
          "تم إنشاء الرمز، ولكن تأخّر إرسال الإيميل. تحقق بعد دقيقة أو راجع مجلد الرسائل غير المرغوب فيها.",
      });
    }
  } catch (e) {
    console.error("send-code fatal:", e);
    return res.status(500).json({ message: "حدث خطأ أثناء إرسال الرمز" });
  }
}
