// my-website/pages/api/quiz/admin-list.js
// my-website/pages/api/quiz/admin-list.js
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
  if (req.method !== "GET") return res.status(405).json({ message: "Method not allowed" });

  try {
    const { status = "قيد المراجعة", limit = "100" } = req.query;

    let query = supabaseAdmin
      .from("quiz_submissions")
      .select("id, user_email, user_name, service_key, answers, feedback, status, supervisor_number, supervisor_name, created_at")
      .order("created_at", { ascending: false })
      .limit(parseInt(limit, 10));

    if (status && status !== "all") {
      query = query.eq("status", status);
    }

    const { data, error } = await query;

    if (error) {
      console.error("admin-list error:", error);
      return res.status(500).json({
        message: "Supabase select failed",
        details: error.message,
      });
    }

    return res.status(200).json({ ok: true, items: data || [] });
  } catch (e) {
    console.error("admin-list route error:", e);
    return res.status(500).json({ message: "خطأ داخلي في الخادم", details: String(e.message || e) });
  }
}

