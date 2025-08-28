// my-website/pages/api/quiz/admin-update.js
// my-website/pages/api/quiz/admin-update.js
import { supabaseAdmin } from "../../../lib/supabase-admin";

export const config = { runtime: "nodejs" };

// التحقق: هل الإيميل من ضمن قائمة الأدمن؟
function isAuthorized(req) {
  const email = (req.headers["x-user-email"] || "").toString().trim().toLowerCase();
  if (!email) return false;

  const admins = (process.env.NEXT_PUBLIC_ADMIN_EMAILS || "")
    .split(",")
    .map((s) => s.trim().toLowerCase())
    .filter(Boolean);

  return admins.includes(email);
}

export default async function handler(req, res) {
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  if (!isAuthorized(req)) return res.status(401).json({ message: "Unauthorized" });
  if (req.method !== "POST") return res.status(405).json({ message: "Method not allowed" });

  try {
    const { id, status, supervisor_number, supervisor_name, feedback } = req.body || {};
    if (!id || !status) {
      return res.status(400).json({ message: "id و status مطلوبة" });
    }

    const allowed = ["قيد المراجعة", "مقبول"];
    if (!allowed.includes(status)) {
      return res.status(400).json({ message: "status غير صالح" });
    }

    const patch = {
      status,
      supervisor_number: supervisor_number || null,
      supervisor_name: supervisor_name || null,
      feedback: typeof feedback === "string" ? feedback : null,
      // published_at: status === "مقبول" ? new Date().toISOString() : null,
    };

    const { data, error } = await supabaseAdmin
      .from("quiz_submissions")
      .update(patch)
      .eq("id", id)
      .select("id, status, supervisor_number, supervisor_name, feedback")
      .single();

    if (error) {
      console.error("admin-update error:", error);
      return res.status(500).json({
        message: "Supabase update failed",
        details: error.message,
      });
    }

    return res.status(200).json({ ok: true, item: data });
  } catch (e) {
    console.error("admin-update route error:", e);
    return res.status(500).json({ message: "خطأ داخلي في الخادم", details: String(e.message || e) });
  }
}



