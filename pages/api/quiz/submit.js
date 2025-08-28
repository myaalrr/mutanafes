// my-website/pages/api/quiz/submit.js
import { supabaseAdmin } from "../../../lib/supabase-admin";

export default async function handler(req, res) {
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  if (req.method !== "POST") return res.status(405).json({ message: "Method not allowed" });

  try {
    const { user_email, user_name, service_key, answers } = req.body || {};
    if (!user_email || !service_key) {
      return res.status(400).json({ message: "user_email و service_key مطلوبة" });
    }

    const allowedKeys = ["photo", "linkedin", "cv", "partners", "interview", "coop"];
    if (!allowedKeys.includes(service_key)) {
      return res.status(400).json({ message: "service_key غير صالح" });
    }

    const payload = {
      user_email,
      user_name: user_name || null,
      service_key,
      answers: answers && typeof answers === "object" ? answers : null, // jsonb
      status: "قيد المراجعة", // ✅ مهم
    };

    const { data, error } = await supabaseAdmin
      .from("quiz_submissions")
      .insert(payload)
      .select("id")
      .single();

    if (error) {
      console.error("submit supabase error:", error);
      return res.status(500).json({ message: "Supabase insert failed", details: error.message });
    }

    return res.status(200).json({ ok: true, id: data?.id });
  } catch (e) {
    console.error("submit route error:", e);
    return res.status(500).json({ message: "خطأ داخلي في الخادم", details: String(e.message || e) });
  }
}

