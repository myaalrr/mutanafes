// pages/api/reguest-login.js
import { supabase } from "../../lib/supabase";
import nodemailer from "nodemailer";
import { normalizeEmail, isValidEmail } from "../../lib/email";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).send("Method not allowed");

  let { email } = req.body || {};
  email = normalizeEmail(email);
  if (!isValidEmail(email)) {
    return res.status(400).json({ message: "أدخل بريد إلكتروني صحيح" });
  }

  try {
    const tempCode = Math.floor(100000 + Math.random() * 900000).toString();

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: `متنافس <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "رمز تسجيل الدخول",
      text: `رمزك لتسجيل الدخول هو: ${tempCode}`,
    });

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

