// my-website/pages/api/quiz/admin-list.js
import { supabaseAdmin } from "../../../lib/supabase-admin";
import { normalizeEmail } from "../../../lib/email";
import { isAdminEmail } from "../../../lib/admins";

export const config = { runtime: "nodejs" };

function isAuthorized(req) {
  const email = normalizeEmail(req.headers["x-user-email"] || "");
  if (!email) return false;
  return isAdminEmail(email);
}

export default async function handler(req, res) {
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  if (!isAuthorized(req)) return res.status(401).json({ message: "Unauthorized" });
  if (req.method !== "GET") return res.status(405).json({ message: "Method not allowed" });

  try {
    const { status = "قيد المراجعة", limit = "100" } = req.query;

    const rawStatus = String(status || "").trim();
    const lower = rawStatus.toLowerCase();
    const noFilter =
      rawStatus === "" ||
      rawStatus === "الكل" ||
      lower === "all" ||
      lower === "any" ||
      rawStatus === "*";

    let query = supabaseAdmin
      .from("quiz_submissions")
      .select(
        "id, user_email, user_name, service_key, answers, feedback, status, supervisor_number, supervisor_name, created_at"
      )
      .order("created_at", { ascending: false })
      .limit(parseInt(limit, 10));

    if (!noFilter) {
      query = query.eq("status", rawStatus);
    }

    const { data, error } = await query;
    if (error) {
      console.error("admin-list error:", error);
      return res.status(500).json({ message: "Supabase select failed", details: error.message });
    }

    return res.status(200).json({ ok: true, items: data || [] });
  } catch (e) {
    console.error("admin-list route error:", e);
    return res.status(500).json({ message: "خطأ داخلي في الخادم", details: String(e.message || e) });
  }
}
