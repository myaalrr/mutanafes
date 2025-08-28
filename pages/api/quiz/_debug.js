// my-website/pages/api/quiz/_debug.js
import { supabaseAdmin } from "../../../lib/supabase-admin";

export const config = { runtime: "nodejs" };

export default async function handler(req, res) {
  try {
    const urlOk = !!process.env.SUPABASE_URL;
    const keyOk = !!process.env.SUPABASE_SERVICE_ROLE;
    if (!urlOk || !keyOk) {
      return res.status(500).json({
        ok: false,
        message: "Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE",
        urlOk,
        keyOk,
      });
    }

    const { data, error } = await supabaseAdmin
      .from("quiz_submissions")
      .select("id")
      .limit(1);

    if (error) {
      return res.status(500).json({
        ok: false,
        message: "Supabase select failed",
        details: error.message,
      });
    }

    return res.status(200).json({ ok: true, rows: data?.length ?? 0 });
  } catch (e) {
    return res.status(500).json({ ok: false, message: String(e?.message || e) });
  }
}

