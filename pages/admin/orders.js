// pages/api/admin/orders.js
import { supabaseAdmin } from "../../../lib/supabase-admin";
import { isAdminEmail } from "../../../lib/admins";
import { normalizeEmail } from "../../../lib/email";

export default async function handler(req, res) {
  if (req.method !== "GET")
    return res.status(405).json({ message: "Method not allowed" });

  const email = normalizeEmail(req.headers["x-admin-email"] || "");
  if (!email) return res.status(401).json({ message: "Missing x-admin-email" });
  if (!isAdminEmail(email)) {
    return res.status(401).json({ message: `Unauthorized: ${email} not admin` });
  }

  const status = req.query.status || "pending";
  const TABLE = "orders";

  try {
    const { data, error } = await supabaseAdmin
      .from(TABLE)
      .select("*")
      .eq("status", status)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("[admin/orders] DB error:", error);
      return res.status(500).json({ message: "DB error", details: error.message });
    }
    return res.status(200).json({ orders: data });
  } catch (e) {
    console.error("[admin/orders] fatal:", e);
    return res.status(500).json({ message: "Internal error" });
  }
}

