import { supabase } from "../../lib/supabase";
import nodemailer from "nodemailer";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).send("Method not allowed");

  const { email } = req.body;
  if (!email) return res.status(400).json({ message: "أدخل البريد الإلكتروني" });

  try {
    // توليد رمز مؤقت 6 أرقام
    const tempCode = Math.floor(100000 + Math.random() * 900000);

    // إنشاء ترانسبورتر لإرسال الإيميل
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // إرسال الإيميل
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "رمز تسجيل الدخول",
      text: `رمزك لتسجيل الدخول هو: ${tempCode}`,
    });

    // حفظ الرمز في Supabase (إذا مستخدم جديد)
    const { error } = await supabase
      .from("users")
      .upsert({ email, temp_code: tempCode }, { onConflict: ["email"] });

    if (error) throw error;

    res.status(200).json({ message: "تم إرسال الرمز بنجاح" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "حدث خطأ أثناء إرسال الرمز" });
  }
}
