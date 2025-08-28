// my-website/pages/api/quiz/my-results.js
import { supabaseAdmin } from "../../../lib/supabase-admin";

export default async function handler(req, res) {
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  if (req.method !== "POST") return res.status(405).json({ message: "Method not allowed" });

  try {
    const { user_email } = req.body || {};
    if (!user_email) return res.status(400).json({ message: "user_email مطلوب" });

    const { data, error } = await supabaseAdmin
      .from("quiz_submissions")
      .select("id, service_key, score, feedback, status, supervisor_name, supervisor_number, created_at, published_at")
      .eq("user_email", user_email)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("my-results supabase error:", error);
      return res.status(500).json({ message: "Supabase select failed", details: error.message });
    }

    return res.status(200).json({ ok: true, results: data || [] });
  } catch (e) {
    console.error("my-results route error:", e);
    return res.status(500).json({ message: "خطأ داخلي في الخادم", details: String(e.message || e) });
  }
}

